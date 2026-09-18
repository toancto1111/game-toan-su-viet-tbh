import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, GraduationCap, ChevronDown, BookOpen, Sparkles, Image as ImageIcon, Paperclip } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { CHATBOT_SYSTEM_PROMPT, CHATBOT_WELCOME_MESSAGE } from './chatbotPrompt';
import { INITIAL_HEROES as heroes } from './constants';
import { CHAPTER_NAMES } from './geminiService';
import { Hero } from './types';

// ─── Cấu hình Gemini Multi-Key Pool (Tối ưu hóa tải & chống nghẽn) ──────────
export const HARDCODED_API_KEYS: string[] = [
  'AQ.Ab8RN6Id7fMXnIkeauluGfpGjvOM2AxmDtHXmtGaRb5mYvnBxg',
  'AQ.Ab8RN6ImUQCKlRals7r8TdblMBnpexZV2Q98LRtnjcnqxKAg6w',
  'AQ.Ab8RN6KKK3VZ6bRF1qzi7fROIjarXGBTcY2GFLPuQw6pN1FgEA',
  'AIzaSyBQDzbSaw5oplRCnRhxjnum9SOsVccI29A',
  'AIzaSyC2ERhw8FcrttElBiux8aRLGHCCt_FJtTE',
  'AIzaSyARfGi4iV7_X37leYg1npWyIR38IIhYNUE',
];

/** Lấy danh sách toàn bộ API keys hợp lệ từ cả code lẫn biến môi trường */
const getValidApiKeys = (): string[] => {
  const envKeysRaw =
    (import.meta.env.VITE_GEMINI_API_KEYS as string) ||
    (import.meta.env.VITE_GEMINI_API_KEY as string) ||
    '';

  const envKeys = envKeysRaw
    .split(/[,;\n\r]+/)
    .map(k => k.trim())
    .filter(Boolean);

  const allKeys = [...HARDCODED_API_KEYS, ...envKeys].map(k => k.trim());

  return Array.from(new Set(allKeys)).filter(
    k =>
      k &&
      !k.includes('PASTE_YOUR_') &&
      !k.includes('PLACEHOLDER_') &&
      k.length > 20
  );
};

const API_KEYS_POOL = getValidApiKeys();
let currentKeyCursor = API_KEYS_POOL.length > 0 ? Math.floor(Math.random() * API_KEYS_POOL.length) : 0;

// ─── Lịch sử hội thoại ───────────────────────────────────────────────────────
interface HistoryEntry {
  role: 'user' | 'model';
  parts: { text: string }[];
}
let globalConversationHistory: HistoryEntry[] = [];

// ─── Xử lý & nén ảnh sang Base64 chuẩn cho Gemini ───────────────────────────
interface ImagePayload {
  data: string; // Base64 không có tiền tố data:...
  mimeType: string;
}

const fileToImagePayload = (file: File): Promise<ImagePayload> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        // Tự động thu nhỏ ảnh nếu quá to để upload siêu nhanh và tiết kiệm token
        const canvas = document.createElement('canvas');
        const maxDim = 1280;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
          const base64 = dataUrl.split(',')[1];
          resolve({ data: base64, mimeType: 'image/jpeg' });
        } else {
          const rawBase64 = (e.target?.result as string).split(',')[1];
          resolve({ data: rawBase64, mimeType: file.type || 'image/jpeg' });
        }
      };
      img.onerror = () => {
        const rawBase64 = (e.target?.result as string).split(',')[1];
        resolve({ data: rawBase64, mimeType: file.type || 'image/jpeg' });
      };
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// ─── Bách khoa toàn thư nội bộ: Tra cứu nhanh Hero trong 0.01 giây ──────────
const normalizeVietnamese = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .trim();
};

export const findHeroFromQuery = (query: string): Hero | null => {
  if (!query) return null;
  const normQuery = normalizeVietnamese(query);

  const aliasMap: Record<string, string> = {
    'quang trung': 'Nguyễn Huệ',
    'tran quoc tuan': 'Trần Quốc Tuấn',
    'hung dao vuong': 'Trần Hưng Đạo',
    'tran hung dao': 'Trần Hưng Đạo',
    'la son phu tu': 'Nguyễn Thiếp',
    'thanh giong': 'Thánh Gióng',
    'chua nguyen': 'Nguyễn Hoàng',
    'chua phuc lan': 'Nguyễn Phúc Lan',
    'ba trieu': 'Bà Triệu',
    'hai ba trung': 'Trưng Trắc',
    'dinh tien hoang': 'Đinh Bộ Lĩnh',
    'le dai hanh': 'Lê Hoàn',
    'ly thai to': 'Lý Công Uẩn',
    'quoc tuan': 'Trần Quốc Tuấn',
    'vo dinh tu': 'Võ Đình Tú',
    'thiet con vo dich': 'Võ Đình Tú',
  };

  for (const [alias, heroName] of Object.entries(aliasMap)) {
    if (normQuery.includes(alias)) {
      const match = heroes.find(h => normalizeVietnamese(h.name) === normalizeVietnamese(heroName));
      if (match) return match;
    }
  }

  const sortedHeroes = [...heroes].sort((a, b) => (b.name?.length || 0) - (a.name?.length || 0));
  for (const h of sortedHeroes) {
    if (!h.name) continue;
    const normHeroName = normalizeVietnamese(h.name);
    if (normHeroName.length >= 4 && normQuery.includes(normHeroName)) {
      return h;
    }
  }

  return null;
};

// ─── Gửi tin nhắn Multimodal Streaming với Key Rotation & Fallback ───────────
interface StreamResult {
  text: string;
  isTruncated: boolean;
}

const streamMessageWithKeyRotation = async (
  userPrompt: string,
  imagePayload: ImagePayload | null,
  onChunk: (accumulatedText: string) => void
): Promise<StreamResult> => {
  if (API_KEYS_POOL.length === 0) {
    throw new Error('NO_API_KEY');
  }

  const maxAttempts = API_KEYS_POOL.length;
  let lastError: any = null;
  // Giữ 8 lượt hội thoại gần nhất để giảm tối đa token overhead và tăng tốc độ xử lý
  const truncatedHistory = globalConversationHistory.slice(-8);
  // Ưu tiên model nhanh nhất: gemini-3.5-flash (~1.5s - 2s), fallback sang gemini-3.6-flash
  const CANDIDATE_MODELS = ['gemini-3.5-flash', 'gemini-3.6-flash'];

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const keyIndex = (currentKeyCursor + attempt) % API_KEYS_POOL.length;
    const apiKey = API_KEYS_POOL[keyIndex];

    for (const modelName of CANDIDATE_MODELS) {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: CHATBOT_SYSTEM_PROMPT,
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 8192, // Tăng lên 8192 tokens (gấp hơn 3.2 lần) để giải quyết trọn vẹn 5-8 bài toán dài
          },
        });

        const chat = model.startChat({
          history: truncatedHistory.map(h => ({
            role: h.role,
            parts: h.parts.map(p => ({ text: p.text })),
          })),
        });

        // Chuẩn bị payload gửi: Hỗ trợ cả text lẫn ảnh đính kèm
        const contentParts: any[] = [];
        let textToSend = userPrompt.trim() || 'Em gửi hình ảnh bài toán / câu hỏi này, nhờ thầy cô hướng dẫn giải chi tiết từng bước ạ.';
        if (imagePayload) {
          textToSend += ' (LƯU Ý QUAN TRỌNG: Nếu đây là bài toán hình học, thầy cô BẮT BUỘC PHẢI VẼ HÌNH bằng thẻ <svg> trước khi giải chi tiết. TUYỆT ĐỐI KHÔNG ĐƯỢC BỎ QUA BƯỚC VẼ HÌNH).';
        }
        contentParts.push({ text: textToSend });

        if (imagePayload) {
          contentParts.push({
            inlineData: {
              data: imagePayload.data,
              mimeType: imagePayload.mimeType,
            },
          });
        }

        // Timeout 25s bảo vệ: hỗ trợ các bài giải dài mà không bị ngắt kết nối oan
        const streamPromise = chat.sendMessageStream(contentParts);
        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('TIMEOUT: Quá thời gian chờ phản hồi')), 25000)
        );

        const resultStream = await Promise.race([streamPromise, timeoutPromise]);
        let accumulated = '';
        let isTruncated = false;

        for await (const chunk of resultStream.stream) {
          const chunkText = chunk.text();
          accumulated += chunkText;
          onChunk(accumulated);

          // Phát hiện nếu mô hình bị chạm trần token (finishReason = MAX_TOKENS)
          const candidate = (chunk as any)?.candidates?.[0];
          if (candidate?.finishReason === 'MAX_TOKENS') {
            isTruncated = true;
          }
        }

        if (!accumulated.trim()) {
          throw new Error('EMPTY_RESPONSE');
        }

        // Kiểm tra bổ sung: nếu kết thúc bằng công thức chưa đóng ($$ hoặc $)
        if (!isTruncated) {
          const trimmed = accumulated.trim();
          const doubleDollars = (trimmed.match(/\$\$/g) || []).length;
          if (doubleDollars % 2 !== 0) {
            isTruncated = true;
          }
        }

        // Lưu lịch sử hội thoại dạng văn bản để các câu hỏi sau nhẹ nhàng và nhanh
        globalConversationHistory.push(
          { role: 'user', parts: [{ text: userPrompt ? `${userPrompt} [kèm ảnh]` : '[Hình ảnh câu hỏi bài tập]' }] },
          { role: 'model', parts: [{ text: accumulated }] }
        );

        currentKeyCursor = keyIndex;
        return { text: accumulated, isTruncated };
      } catch (err: any) {
        lastError = err;
        console.warn(`[AI Pool] Key #${keyIndex + 1} (${modelName}) lỗi:`, err?.message || err);
        continue;
      }
    }
  }

  throw lastError || new Error('Tất cả các API key đều đang quá tải hoặc không khả dụng.');
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const sanitizeSvg = (svgStr: string): string => {
  return svgStr
    // Loại bỏ các thẻ script và thuộc tính nguy hiểm
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '')
    .replace(/\son\w+=[^\s>]+/gi, '')
    // Force SVG to be responsive and minimalist
    .replace(/<svg([^>]*)>/i, '<svg$1 style="max-width: 100%; height: auto; display: block; margin: 16px auto; stroke: white; fill: transparent; font-family: monospace;">')
    .replace(/stroke="[^"]*"/gi, 'stroke="white"')
    .replace(/stroke='[^']*'/gi, 'stroke="white"')
    .replace(/fill="none"/gi, 'fill="transparent"')
    .replace(/fill='none'/gi, 'fill="transparent"');
};

const markdownToHtml = (text: string): string => {
  if (!text) return '';

  let sanitizedText = text;
  // Tự động đóng khối display math $$...$$ nếu câu trả lời bị dừng dở dang giữa chừng
  const doubleDollarCount = (sanitizedText.match(/\$\$/g) || []).length;
  if (doubleDollarCount % 2 !== 0) {
    sanitizedText += '\n$$';
  }
  // Tự động đóng khối inline math $...$ nếu bị dừng dở dang
  const withoutDouble = sanitizedText.replace(/\$\$[\s\S]*?\$\$/g, '');
  const singleDollarCount = (withoutDouble.replace(/\\\$/g, '').match(/\$/g) || []).length;
  if (singleDollarCount % 2 !== 0) {
    sanitizedText += '$';
  }

  const mathBlocks: string[] = [];
  const svgBlocks: string[] = [];

  // 0. Trích xuất và bảo vệ các khối SVG trước khi xử lý Markdown
  let protectedText = sanitizedText.replace(/<svg[\s\S]*?<\/svg>/gi, match => {
    const idx = svgBlocks.length;
    svgBlocks.push(sanitizeSvg(match));
    return `@@SVG_BLOCK_${idx}@@`;
  });

  // 1. Tách và bảo vệ các khối công thức toán học display $$...$$ hoặc \[...\]
  protectedText = protectedText.replace(/(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\])/g, match => {
    const idx = mathBlocks.length;
    mathBlocks.push(match);
    return `@@MATH_BLOCK_${idx}@@`;
  });

  // 2. Tách và bảo vệ các khối công thức inline $...$ hoặc \(...\)
  protectedText = protectedText.replace(/(\$(?:\\\$|[^\$\n])+\$|\\\([\s\S]*?\\\))/g, match => {
    const idx = mathBlocks.length;
    mathBlocks.push(match);
    return `@@MATH_BLOCK_${idx}@@`;
  });

  // 3. Format markdown thông thường
  let html = protectedText
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\*)(.*?)(?<!\*)\*(?!\*)/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code style="background:rgba(255,255,255,0.15);padding:1px 5px;border-radius:4px;font-size:0.85em;">$1</code>')
    .replace(/^### (.*?)$/gm, '<strong style="color:#a78bfa;font-size:1em;display:block;margin:6px 0 2px;">$1</strong>')
    .replace(/^## (.*?)$/gm, '<strong style="color:#818cf8;font-size:1.05em;display:block;margin:8px 0 3px;">$1</strong>')
    .replace(/^# (.*?)$/gm, '<strong style="color:#60a5fa;font-size:1.1em;display:block;margin:10px 0 4px;">$1</strong>')
    .replace(/^[*-] (.*?)$/gm, '• $1')
    .replace(/^\d+\. (.*?)$/gm, '• $1')
    .replace(/^---+$/gm, '<hr style="border-color:rgba(255,255,255,0.1);margin:6px 0;">')
    .replace(/\n/g, '<br>');

  // 4. Khôi phục lại các khối công thức toán nguyên vẹn cho MathJax
  mathBlocks.forEach((math, idx) => {
    html = html.replace(`@@MATH_BLOCK_${idx}@@`, math);
  });

  // 5. Khôi phục lại các khối SVG
  svgBlocks.forEach((svg, idx) => {
    html = html.replace(`@@SVG_BLOCK_${idx}@@`, svg);
  });

  return html;
};

/**
 * Component hiển thị tin nhắn và tự động render MathJax cho các công thức toán
 */
const MathJaxBubble = React.memo(({ html, isStreaming }: { html: string; isStreaming?: boolean }) => {
  const containerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = html;

    // Khi đang stream, không gọi MathJax để tránh nhấp nháy hoặc parse lỗi công thức đang dở
    if (isStreaming) return;

    // Khi câu trả lời hoàn tất, kích hoạt MathJax render toàn bộ công thức
    const renderMath = () => {
      const mj = (window as any).MathJax;
      if (mj && mj.typesetPromise && containerRef.current) {
        setTimeout(() => {
          try {
            if (containerRef.current) {
              mj.typesetClear([containerRef.current]);
              mj.typesetPromise([containerRef.current]).catch((err: any) => console.log('MathJax error: ', err));
            }
          } catch (e) {}
        }, 50);
      } else {
        setTimeout(renderMath, 150);
      }
    };

    renderMath();
  }, [html, isStreaming]);

  return <span ref={containerRef} />;
});

// ─── Types ───────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  html: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isStreaming?: boolean;
  isTruncated?: boolean;
  wikiHero?: Hero;
  imageUrl?: string;
}

// ─── Gợi ý nhanh ─────────────────────────────────────────────────────────────
// ─── Gợi ý nhanh (Đã bị loại bỏ theo yêu cầu để tăng diện tích) ──────────

// ─── Component ───────────────────────────────────────────────────────────────
export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      html: markdownToHtml(CHATBOT_WELCOME_MESSAGE),
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<ImagePayload | null>(null);
  const [isProcessingImage, setIsProcessingImage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping, selectedImage]);

  // Xử lý nạp file ảnh từ máy tính hoặc clipboard
  const handleProcessImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chỉ chọn file hình ảnh (PNG, JPG, JPEG, WEBP).');
      return;
    }
    try {
      setIsProcessingImage(true);
      const payload = await fileToImagePayload(file);
      setSelectedImage(payload);
    } catch (err) {
      console.error('Lỗi khi đọc file ảnh:', err);
    } finally {
      setIsProcessingImage(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleProcessImageFile(file);
    }
    if (e.target) e.target.value = '';
  };

  // Hỗ trợ dán ảnh bằng phím tắt Ctrl + V
  const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        const file = item.getAsFile();
        if (file) {
          handleProcessImageFile(file);
        }
        break;
      }
    }
  };

  const handleSend = async (customPrompt?: string | React.MouseEvent) => {
    const text = (typeof customPrompt === 'string' ? customPrompt : inputValue).trim();
    if ((!text && !selectedImage) || isTyping) return;

    const currentImage = selectedImage;
    setSelectedImage(null);

    // ⚡ 1. Tra cứu Wikipedia nội bộ ngay tức thì (0.01 giây)
    const matchedHero = text ? findHeroFromQuery(text) : null;

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      html: text ? text.replace(/\n/g, '<br>') : '<em>[Đã gửi 1 hình ảnh câu hỏi/bài tập]</em>',
      sender: 'user',
      timestamp: new Date(),
      imageUrl: currentImage ? `data:${currentImage.mimeType};base64,${currentImage.data}` : undefined,
    };

    const aiMsgId = `msg-${Date.now() + 1}`;
    const aiInitialMsg: Message = {
      id: aiMsgId,
      html: '',
      sender: 'ai',
      timestamp: new Date(),
      isStreaming: true,
      wikiHero: matchedHero || undefined,
    };

    setMessages(prev => [...prev, userMsg, aiInitialMsg]);
    setInputValue('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';
    setIsTyping(true);
    setApiError(null);

    // ⚡ 2. Nạp ngữ cảnh tướng / game vào câu hỏi nếu có
    let promptWithContext = text;
    if (matchedHero) {
      const chName = CHAPTER_NAMES[matchedHero.chapter] || `Chương ${matchedHero.chapter}`;
      promptWithContext = `[THÔNG TIN BÁCH KHOA TỪ GAME SỬ VIỆT ANH HÙNG TRUYỆN:
- Nhân vật: ${matchedHero.name} (Danh hiệu: ${matchedHero.title})
- Thuộc Chương ${matchedHero.chapter}: ${chName}
- Tóm lược lịch sử trong game: ${matchedHero.description}
- Tuyệt chiêu chiến trận: ${matchedHero.skillName} (${matchedHero.skillDesc})
]
Câu hỏi của học sinh: "${text}"
Hãy giải đáp chuẩn xác theo sách giáo khoa Lịch sử Việt Nam, sinh động, dễ hiểu và truyền cảm hứng tự hào dân tộc cho học sinh.`;
    }

    try {
      if (API_KEYS_POOL.length === 0) {
        const demoText =
          '⚠️ **Chế độ Demo** – Chưa tìm thấy API Key Gemini nào trong hệ thống.\n\n' +
          `Em vừa hỏi: **"${text || 'Hình ảnh'}"**\n\nHãy đảm bảo đã cấu hình API Key để trò chuyện trực tiếp! 🚀`;
        setMessages(prev =>
          prev.map(m => (m.id === aiMsgId ? { ...m, html: markdownToHtml(demoText), isStreaming: false } : m))
        );
      } else {
        // ⚡ 3. Streaming thời gian thực mượt mà (Throttle 45ms để giảm tải DOM)
        let lastRenderTime = 0;
        let pendingText = '';
        let renderTimer: any = null;

        const flushRender = (textToRender: string) => {
          setMessages(prev =>
            prev.map(m =>
              m.id === aiMsgId
                ? {
                    ...m,
                    html: markdownToHtml(textToRender),
                    isStreaming: true,
                  }
                : m
            )
          );
        };

        const streamResult = await streamMessageWithKeyRotation(promptWithContext, currentImage, accumulatedText => {
          pendingText = accumulatedText;
          const now = Date.now();
          if (now - lastRenderTime > 45) {
            lastRenderTime = now;
            flushRender(accumulatedText);
          } else if (!renderTimer) {
            renderTimer = setTimeout(() => {
              renderTimer = null;
              lastRenderTime = Date.now();
              flushRender(pendingText);
            }, 45);
          }
        });

        if (renderTimer) clearTimeout(renderTimer);
        if (pendingText) flushRender(pendingText);

        setMessages(prev =>
          prev.map(m => (m.id === aiMsgId ? { ...m, isStreaming: false, isTruncated: streamResult.isTruncated } : m))
        );
      }
    } catch (err: any) {
      const isQuota =
        err?.message?.includes('quota') ||
        err?.message?.includes('429') ||
        err?.message?.includes('RESOURCE_EXHAUSTED');

      const errorMsg =
        '❌ **Có sự cố khi kết nối AI.**\n\n' +
        (isQuota
          ? 'Tất cả các API key hiện đã đạt hạn ngạch tối đa trong phút này. Em vui lòng chờ 30 giây rồi hỏi lại nhé!'
          : err?.message?.includes('API_KEY_INVALID')
          ? 'API Key không hợp lệ. Vui lòng kiểm tra lại key.'
          : `Chi tiết: ${err?.message || 'Không thể kết nối máy chủ'}`);

      setApiError(errorMsg);
      setMessages(prev =>
        prev.map(m =>
          m.id === aiMsgId
            ? { ...m, html: markdownToHtml(errorMsg), isStreaming: false }
            : m
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  const handleSuggestion = (text: string) => {
    setInputValue(text);
    textareaRef.current?.focus();
  };

  // ── CSS Glassmorphism & Wikipedia Card ─────────────────────────────────────
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    .cb-container {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 9998;
      font-family: 'Inter', system-ui, sans-serif;
    }

    .cb-fab {
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1d4ed8, #7c3aed);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      box-shadow: 0 8px 24px -4px rgba(124, 58, 237, 0.55);
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      border: none;
      outline: none;
      position: relative;
    }
    .cb-fab:hover {
      transform: scale(1.1);
      box-shadow: 0 12px 28px -4px rgba(124, 58, 237, 0.7);
    }
    .cb-fab-pulse {
      position: absolute;
      inset: -3px;
      border-radius: 50%;
      border: 2px solid rgba(124, 58, 237, 0.4);
      animation: cbPulse 2s ease-out infinite;
    }
    @keyframes cbPulse {
      0% { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.4); opacity: 0; }
    }

    .cb-badge {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 14px;
      height: 14px;
      background: #10b981;
      border-radius: 50%;
      border: 2px solid white;
    }

    .cb-window {
      position: absolute;
      bottom: 72px;
      right: 0;
      width: min(700px, 95vw);
      height: min(750px, 85vh);
      max-height: calc(100vh - 85px);
      background: rgba(15, 23, 42, 0.96);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(99, 102, 241, 0.25);
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 25px 60px -10px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(99,102,241,0.1);
      overflow: hidden;
      transform-origin: bottom right;
      transition: all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      opacity: 0;
      transform: scale(0.7) translateY(20px);
      pointer-events: none;
    }
    .cb-window.open {
      opacity: 1;
      transform: scale(1) translateY(0);
      pointer-events: auto;
    }

    /* Header */
    .cb-header {
      padding: 14px 16px;
      background: linear-gradient(135deg, rgba(29,78,216,0.3), rgba(124,58,237,0.3));
      border-bottom: 1px solid rgba(99, 102, 241, 0.2);
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
    }
    .cb-header-info { display: flex; align-items: center; gap: 10px; }
    .cb-avatar {
      width: 38px; height: 38px; border-radius: 10px;
      background: linear-gradient(135deg, #1d4ed8, #7c3aed);
      display: flex; justify-content: center; align-items: center; color: white;
      box-shadow: 0 4px 12px rgba(124,58,237,0.4);
      flex-shrink: 0;
    }
    .cb-header-title { font-size: 0.875rem; font-weight: 700; color: #e2e8f0; line-height: 1.2; }
    .cb-header-sub {
      font-size: 0.7rem; color: #94a3b8;
      display: flex; align-items: center; gap: 4px; margin-top: 1px;
    }
    .cb-status-dot {
      width: 6px; height: 6px;
      background: #10b981; border-radius: 50%;
      box-shadow: 0 0 6px #10b981;
    }
    .cb-close-btn {
      background: transparent; border: none; color: #64748b; cursor: pointer;
      padding: 4px; border-radius: 8px; transition: all 0.2s;
      display: flex; align-items: center;
    }
    .cb-close-btn:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }

    /* Messages */
    .cb-messages {
      flex: 1; padding: 16px; overflow-y: auto;
      display: flex; flex-direction: column; gap: 12px;
    }
    .cb-messages::-webkit-scrollbar { width: 4px; }
    .cb-messages::-webkit-scrollbar-track { background: transparent; }
    .cb-messages::-webkit-scrollbar-thumb { background: rgba(99,102,241,0.3); border-radius: 10px; }

    .cb-msg-wrap {
      display: flex; flex-direction: column; max-width: 90%;
      animation: cbSlideUp 0.3s ease-out forwards;
    }
    .cb-msg-wrap.ai { align-self: flex-start; width: 92%; }
    .cb-msg-wrap.user { align-self: flex-end; align-items: flex-end; }

    .cb-bubble {
      padding: 10px 14px; border-radius: 16px;
      font-size: 0.855rem; line-height: 1.6; color: #f1f5f9;
      word-break: break-word;
    }
    .cb-bubble.ai {
      background: rgba(30, 41, 59, 0.9);
      border: 1px solid rgba(99,102,241,0.2);
      border-bottom-left-radius: 4px;
    }
    .cb-bubble.user {
      background: linear-gradient(135deg, #1d4ed8, #2563eb);
      border-bottom-right-radius: 4px;
      box-shadow: 0 4px 12px rgba(37,99,235,0.35);
    }
    .cb-time { font-size: 0.65rem; color: #475569; margin-top: 4px; padding: 0 4px; }

    /* MathJax CHTML styling in chat */
    .cb-bubble mjx-container {
      color: #f8fafc !important;
      outline: none !important;
    }
    .cb-bubble mjx-container[display="true"] {
      display: block !important;
      margin: 8px 0 !important;
      overflow-x: auto !important;
      overflow-y: hidden !important;
      padding: 6px 12px !important;
      background: rgba(15, 23, 42, 0.75) !important;
      border-radius: 8px !important;
      border: 1px solid rgba(99, 102, 241, 0.25) !important;
      text-align: center !important;
      font-size: 1.05em !important;
    }
    .cb-bubble mjx-container:not([display="true"]) {
      padding: 0 3px !important;
      font-size: 1.05em !important;
      vertical-align: middle !important;
    }

    /* Bubble image sent by user */
    .cb-bubble-img-wrap {
      margin-bottom: 6px;
      border-radius: 12px;
      overflow: hidden;
      max-width: 220px;
      border: 1.5px solid rgba(255,255,255,0.2);
      cursor: pointer;
      transition: transform 0.2s;
    }
    .cb-bubble-img-wrap:hover { transform: scale(1.02); }
    .cb-bubble-img {
      width: 100%; height: auto; max-height: 200px;
      object-fit: cover; display: block;
    }

    /* Streaming cursor */
    .cb-cursor {
      display: inline-block; width: 7px; height: 14px;
      background: #818cf8; margin-left: 2px; vertical-align: middle;
      animation: cbBlink 0.8s infinite;
    }
    @keyframes cbBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }

    /* Wikipedia Mini Card (0.01s Instant Preview) */
    .cb-wiki-card {
      background: linear-gradient(135deg, rgba(30, 27, 75, 0.85), rgba(17, 24, 39, 0.95));
      border: 1px solid rgba(139, 92, 246, 0.35);
      border-radius: 14px;
      padding: 10px 12px;
      margin-bottom: 8px;
      box-shadow: 0 8px 20px -4px rgba(0, 0, 0, 0.5);
    }
    .cb-wiki-badge {
      display: flex; justify-content: space-between; align-items: center;
      font-size: 0.68rem; font-weight: 700; color: #fbbf24;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 6px; margin-bottom: 8px;
      text-transform: uppercase; letter-spacing: 0.5px;
    }
    .cb-wiki-chapter {
      background: rgba(99, 102, 241, 0.2); color: #c7d2fe;
      padding: 1px 6px; border-radius: 6px; font-weight: 600;
    }
    .cb-wiki-body { display: flex; gap: 10px; align-items: flex-start; }
    .cb-wiki-img {
      width: 48px; height: 48px; border-radius: 10px;
      object-fit: cover; border: 1.5px solid rgba(245, 158, 11, 0.5);
      background: #1e1b4b; flex-shrink: 0;
    }
    .cb-wiki-info { flex: 1; min-width: 0; }
    .cb-wiki-title-row {
      display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-bottom: 3px;
    }
    .cb-wiki-name { font-weight: 700; font-size: 0.92rem; color: #fef08a; }
    .cb-wiki-tag {
      font-size: 0.68rem; background: rgba(239, 68, 68, 0.2); color: #fca5a5;
      padding: 1px 6px; border-radius: 4px; font-weight: 600;
    }
    .cb-wiki-desc {
      font-size: 0.74rem; color: #cbd5e1; line-height: 1.45; margin-bottom: 4px;
    }
    .cb-wiki-skill {
      font-size: 0.7rem; color: #93c5fd; background: rgba(59, 130, 246, 0.1);
      padding: 4px 6px; border-radius: 6px; border: 1px solid rgba(59, 130, 246, 0.2);
    }

    /* Typing indicator */
    .cb-typing {
      display: flex; align-items: center; gap: 4px;
      padding: 10px 14px;
      background: rgba(30, 41, 59, 0.9);
      border: 1px solid rgba(99,102,241,0.2);
      border-radius: 16px; border-bottom-left-radius: 4px;
      width: fit-content;
    }
    .cb-dot {
      width: 5px; height: 5px; background: #6366f1; border-radius: 50%;
      animation: cbBounce 1.4s infinite ease-in-out both;
    }
    .cb-dot:nth-child(1) { animation-delay: -0.32s; }
    .cb-dot:nth-child(2) { animation-delay: -0.16s; }

    /* Suggestions Removed */

    /* Image preview bar above input */
    .cb-image-preview-bar {
      padding: 8px 14px;
      background: rgba(30, 41, 59, 0.95);
      border-top: 1px solid rgba(99,102,241,0.25);
      display: flex;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
      animation: cbSlideUp 0.2s ease-out;
    }
    .cb-preview-thumb {
      width: 44px;
      height: 44px;
      border-radius: 8px;
      object-fit: cover;
      border: 1.5px solid #818cf8;
    }
    .cb-preview-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 1px;
    }
    .cb-preview-text {
      font-size: 0.75rem;
      font-weight: 600;
      color: #e2e8f0;
    }
    .cb-preview-sub {
      font-size: 0.65rem;
      color: #94a3b8;
    }
    .cb-preview-remove {
      background: rgba(239, 68, 68, 0.2);
      border: 1px solid rgba(239, 68, 68, 0.4);
      color: #fca5a5;
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .cb-preview-remove:hover {
      background: rgba(239, 68, 68, 0.4);
      transform: scale(1.1);
    }

    /* Input area */
    .cb-input-area {
      padding: 10px 14px 14px;
      background: rgba(8, 15, 30, 0.8);
      border-top: 1px solid rgba(99,102,241,0.15);
      display: flex;
      gap: 8px;
      align-items: flex-end;
      flex-shrink: 0;
    }
    .cb-attach-btn {
      background: rgba(99,102,241,0.12);
      border: 1px solid rgba(99,102,241,0.3);
      width: 40px;
      height: 40px;
      border-radius: 12px;
      color: #a5b4fc;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .cb-attach-btn:hover {
      background: rgba(99,102,241,0.25);
      color: #ffffff;
      border-color: #818cf8;
      transform: scale(1.05);
    }
    .cb-input-wrap {
      flex: 1;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(99,102,241,0.25);
      border-radius: 14px;
      padding: 8px 12px;
      transition: all 0.25s;
    }
    .cb-input-wrap:focus-within {
      border-color: #6366f1;
      box-shadow: 0 0 0 2px rgba(99,102,241,0.2);
    }
    .cb-textarea {
      width: 100%;
      background: transparent;
      border: none;
      color: #f1f5f9;
      font-size: 0.855rem;
      resize: none;
      max-height: 100px;
      min-height: 22px;
      outline: none;
      font-family: inherit;
      padding: 0;
      line-height: 1.5;
    }
    .cb-textarea::placeholder { color: #475569; }

    .cb-send-btn {
      background: linear-gradient(135deg, #1d4ed8, #7c3aed);
      border: none;
      width: 40px;
      height: 40px;
      border-radius: 12px;
      color: white;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.25s;
      flex-shrink: 0;
    }
    .cb-send-btn:disabled { background: rgba(99,102,241,0.15); color: #475569; cursor: not-allowed; }
    .cb-send-btn:not(:disabled):hover { transform: scale(1.05); box-shadow: 0 4px 14px rgba(99,102,241,0.5); }

    /* Nút viết tiếp phần còn lại */
    .cb-continue-btn {
      background: linear-gradient(135deg, #1d4ed8, #7c3aed);
      border: 1px solid rgba(192, 132, 252, 0.4);
      color: white;
      padding: 5px 12px;
      border-radius: 10px;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s;
      box-shadow: 0 2px 8px rgba(124, 58, 237, 0.35);
    }
    .cb-continue-btn:hover {
      background: linear-gradient(135deg, #2563eb, #8b5cf6);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.5);
    }

    /* API key warning banner */
    .cb-api-banner {
      padding: 6px 14px;
      background: rgba(234,179,8,0.08);
      border-bottom: 1px solid rgba(234,179,8,0.2);
      font-size: 0.68rem;
      color: #fbbf24;
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    @keyframes cbSlideUp {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes cbBounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }

    @media (max-width: 480px) {
      .cb-window {
        position: fixed;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
      }
    }
  `;

  const hasRealKeys = API_KEYS_POOL.length > 0;

  return (
    <>
      <style>{styles}</style>
      <div className="cb-container">
        {/* FAB button */}
        {!isOpen && (
          <button className="cb-fab" onClick={() => setIsOpen(true)} title="Mở trợ lý học tập">
            <span className="cb-fab-pulse" />
            <GraduationCap size={26} />
            <span className="cb-badge" />
          </button>
        )}

        {/* Chat window */}
        <div className={`cb-window ${isOpen ? 'open' : ''}`}>
          {/* Header */}
          <div className="cb-header">
            <div className="cb-header-info">
              <div className="cb-avatar">
                <Bot size={20} />
              </div>
              <div>
                <div className="cb-header-title">AI Gia Sư Toán & Lịch Sử</div>
                <div className="cb-header-sub">
                  <span className="cb-status-dot" />
                  {hasRealKeys
                    ? API_KEYS_POOL.length > 1
                      ? `Sẵn sàng (${API_KEYS_POOL.length} API • Hỗ trợ gửi ảnh)`
                      : 'Sẵn sàng hỗ trợ'
                    : 'Chế độ Demo'}
                </div>
              </div>
            </div>
            <button className="cb-close-btn" onClick={() => setIsOpen(false)}>
              <ChevronDown size={20} />
            </button>
          </div>

          {/* API key warning */}
          {!hasRealKeys && (
            <div className="cb-api-banner">
              ⚠️ API Key chưa cấu hình — hãy kiểm tra lại file cấu hình.
            </div>
          )}

          {/* Messages */}
          <div className="cb-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`cb-msg-wrap ${msg.sender}`}>
                {/* Thẻ Wikipedia Tra Cứu Nhanh (0.01s) nếu câu hỏi trúng tướng trong game */}
                {msg.wikiHero && (
                  <div className="cb-wiki-card">
                    <div className="cb-wiki-badge">
                      <span>📖 BÁCH KHOA TOÀN THƯ SỬ VIỆT</span>
                      <span className="cb-wiki-chapter">
                        {CHAPTER_NAMES[msg.wikiHero.chapter] || `Chương ${msg.wikiHero.chapter}`}
                      </span>
                    </div>
                    <div className="cb-wiki-body">
                      {msg.wikiHero.image && (
                        <img
                          src={msg.wikiHero.image}
                          alt={msg.wikiHero.name}
                          className="cb-wiki-img"
                          onError={e => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      )}
                      <div className="cb-wiki-info">
                        <div className="cb-wiki-title-row">
                          <span className="cb-wiki-name">{msg.wikiHero.name}</span>
                          <span className="cb-wiki-tag">{msg.wikiHero.title}</span>
                          <span className="cb-wiki-tag" style={{ background: 'rgba(16,185,129,0.2)', color: '#6ee7b7' }}>
                            {msg.wikiHero.rarity}
                          </span>
                        </div>
                        <div className="cb-wiki-desc">{msg.wikiHero.description}</div>
                        <div className="cb-wiki-skill">
                          ⚔️ <strong>Tuyệt chiêu:</strong> {msg.wikiHero.skillName} — <em>{msg.wikiHero.skillDesc}</em>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Ảnh đính kèm do học sinh gửi */}
                {msg.imageUrl && (
                  <div className="cb-bubble-img-wrap" onClick={() => window.open(msg.imageUrl, '_blank')}>
                    <img src={msg.imageUrl} alt="Ảnh đính kèm" className="cb-bubble-img" />
                  </div>
                )}

                {/* Nội dung tin nhắn & Cursor Streaming */}
                {(msg.html || msg.isStreaming) && (
                  <div className={`cb-bubble ${msg.sender}`}>
                    {msg.isStreaming && !msg.html ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#94a3b8', fontSize: '0.8rem', padding: '2px 0' }}>
                        <div className="cb-dot" />
                        <div className="cb-dot" />
                        <div className="cb-dot" />
                        <span style={{ marginLeft: '4px' }}>AI đang suy nghĩ và soạn bài...</span>
                      </div>
                    ) : (
                      <>
                        <MathJaxBubble html={msg.html} isStreaming={msg.isStreaming} />
                        {msg.isStreaming && <span className="cb-cursor" />}
                      </>
                    )}

                    {/* Nút Viết tiếp nếu câu trả lời bị dừng do dài hoặc hết token */}
                    {msg.isTruncated && !msg.isStreaming && (
                      <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px dashed rgba(99,102,241,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                        <span style={{ fontSize: '0.73rem', color: '#fbbf24' }}>⚠️ Bài giải dài đã đạt giới hạn một lượt trả lời.</span>
                        <button
                          className="cb-continue-btn"
                          onClick={() => handleSend("Thầy/cô viết tiếp các phần hoặc bài tiếp theo đang dở dang giúp em nhé!")}
                        >
                          ✍️ Viết tiếp phần còn lại ➡️
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <span className="cb-time">{formatTime(msg.timestamp)}</span>
              </div>
            ))}

            {isTyping && messages[messages.length - 1]?.sender === 'user' && (
              <div className="cb-msg-wrap ai">
                <div className="cb-typing">
                  <div className="cb-dot" />
                  <div className="cb-dot" />
                  <div className="cb-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions removed to save space */}

          {/* Thanh xem trước ảnh khi học sinh tải ảnh hoặc bấm Ctrl+V */}
          {selectedImage && (
            <div className="cb-image-preview-bar">
              <img
                src={`data:${selectedImage.mimeType};base64,${selectedImage.data}`}
                alt="Preview"
                className="cb-preview-thumb"
              />
              <div className="cb-preview-info">
                <span className="cb-preview-text">📸 Đã đính kèm ảnh bài toán / câu hỏi</span>
                <span className="cb-preview-sub">Nhấn Gửi hoặc Enter để AI phân tích và giải chi tiết</span>
              </div>
              <button className="cb-preview-remove" onClick={() => setSelectedImage(null)} title="Xóa ảnh">
                <X size={15} />
              </button>
            </div>
          )}

          {/* Input area */}
          <div className="cb-input-area">
            {/* Input file ẩn */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />

            {/* Nút đính kèm ảnh */}
            <button
              className="cb-attach-btn"
              onClick={() => fileInputRef.current?.click()}
              title="Tải ảnh bài tập lên (hoặc bấm Ctrl+V để dán trực tiếp ảnh)"
              disabled={isProcessingImage || isTyping}
            >
              <ImageIcon size={19} />
            </button>

            {/* Ô nhập tin nhắn */}
            <div className="cb-input-wrap">
              <textarea
                ref={textareaRef}
                className="cb-textarea"
                value={inputValue}
                onChange={handleInput}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder={selectedImage ? "Nhập câu hỏi kèm ảnh... (hoặc Enter để gửi)" : "Hỏi bài toán, lịch sử hoặc dán ảnh (Ctrl+V)..."}
                rows={1}
              />
            </div>

            {/* Nút gửi */}
            <button
              className="cb-send-btn"
              onClick={handleSend}
              disabled={(!inputValue.trim() && !selectedImage) || isTyping || isProcessingImage}
              title="Gửi câu hỏi"
            >
              <Send size={17} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
