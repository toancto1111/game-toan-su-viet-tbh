import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, RefreshCcw, Save } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { saveCustomQuestions } from './firebaseService';
import { Question } from './types';

export const AdminUploadDoc: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [subject, setSubject] = useState('khtn');
  const [grade, setGrade] = useState(6);
  const [chapter, setChapter] = useState(1);
  const [lesson, setLesson] = useState(1);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'generating' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [previewQuestions, setPreviewQuestions] = useState<Question[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!file) {
      alert('Vui lòng chọn file PDF');
      return;
    }

    try {
      setStatus('uploading');
      setMessage('Đang trích xuất văn bản từ tài liệu...');

      let text = '';
      
      const fileExt = file.name.split('.').pop()?.toLowerCase();
      
      if (['txt', 'md', 'json'].includes(fileExt || '')) {
        // Đọc trực tiếp text trên client
        const reader = new FileReader();
        reader.onload = async (e) => {
          text = (e.target?.result as string) || '';
          if (!text) {
            setStatus('error');
            setMessage('Không trích xuất được văn bản nào từ file.');
            return;
          }
          await generateQuestionsFromText(text);
        };
        reader.readAsText(file);
      } else {
        // Gửi PDF lên serverless API
        const reader = new FileReader();
        reader.onload = async (e) => {
          const base64Data = (e.target?.result as string).split(',')[1];
          
          try {
            const res = await fetch('/api/parse-pdf', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ base64Data })
            });
            
            if (!res.ok) {
              throw new Error('Lỗi khi phân tích PDF. Đảm bảo bạn đã deploy lên Vercel.');
            }

            const data = await res.json();
            text = data.text;
            
            if (!text) {
              throw new Error('Không trích xuất được văn bản nào từ PDF.');
            }

            await generateQuestionsFromText(text);
          } catch (err: any) {
            console.error(err);
            setStatus('error');
            setMessage(err.message || 'Lỗi khi gọi API phân tích PDF');
          }
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setMessage(err.message || 'Có lỗi xảy ra');
    }
  };

  const generateQuestionsFromText = async (text: string) => {
    try {
      setStatus('generating');
      setMessage('Đang dùng AI sinh câu hỏi từ văn bản...');

      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
      const MODELS = ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-flash-latest'];
        
      let parsedData = null;
      let lastError = null;

      for (const modelName of MODELS) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const prompt = `Bạn là một chuyên gia phân tích dữ liệu giáo dục. Từ nội dung tài liệu sau đây, hãy TRÍCH XUẤT (hoặc tự sinh dựa trên nội dung trọng tâm nếu là văn bản lý thuyết) TOÀN BỘ các câu hỏi có trong đó (bao gồm tất cả các câu hỏi trắc nghiệm 4 lựa chọn, câu hỏi đúng sai, câu hỏi điền khuyết). Nếu file có 60 câu, bắt buộc phải trả về đủ 60 câu, tuyệt đối không được bỏ sót!

Yêu cầu trả về CHỈ BẰNG một chuỗi JSON hợp lệ (không chứa markdown \`\`\`json, KHÔNG bọc trong markdown) là một mảng các object.
Mỗi object có định dạng:
{
  "id": "chuỗi_ID_duy_nhất_ngẫu_nhiên",
  "type": "multiple_choice_1" hoặc "true_false" hoặc "short_answer",
  "question": "Nội dung câu hỏi",
  "options": ["A", "B", "C", "D"] (nếu type là multiple_choice_1, hoặc ["Đúng", "Sai"] nếu type là true_false. Điền rỗng [] nếu type là short_answer),
  "correctAnswer": 0 (là số nguyên chỉ định index đáp án đúng trong mảng options với multiple_choice và true_false. NẾU type là short_answer, hãy điền CÂU TRẢ LỜI NGẮN vào đây ở dạng chuỗi string),
  "explanation": "Giải thích vì sao chọn đáp án đó (nếu có hoặc tự sinh ngắn gọn)",
  "level": 1 // độ khó từ 1-3
}

Tuyệt đối KHÔNG cắt bớt dữ liệu, tôi cần TẤT CẢ câu hỏi có trong văn bản!

Nội dung:
${text}
`;

          const result = await model.generateContent(prompt);
          let responseText = result.response.text();
          responseText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
          
          parsedData = JSON.parse(responseText);
          break; // Thành công, thoát vòng lặp
        } catch (err: any) {
          console.warn(`Lỗi với model ${modelName}:`, err.message);
          lastError = err;
          // Nếu lỗi do người dùng/cú pháp thì dừng luôn, nếu 503 hoặc overload thì thử model tiếp theo
          if (err.message && (err.message.includes('403') || err.message.includes('400'))) {
            throw err;
          }
        }
      }

      if (!parsedData) {
        throw new Error(lastError?.message || 'Tất cả các AI model đều đang quá tải hoặc gặp lỗi. Vui lòng thử lại sau.');
      }

      const questions: Question[] = parsedData.map((q: any) => ({
        ...q,
          grade,
          chapter
        }));

      setPreviewQuestions(questions);
      setStatus('success');
      setMessage(`Đã sinh thành công ${questions.length} câu hỏi! Vui lòng kiểm tra lại trước khi lưu.`);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setMessage('Lỗi khi sinh câu hỏi: ' + (err.message || 'Lỗi không xác định'));
    }
  };

  const handleSaveToFirebase = async () => {
    if (previewQuestions.length === 0) return;
    setStatus('uploading');
    setMessage('Đang lưu vào Thí luyện đường...');
    try {
      await saveCustomQuestions(subject, grade, chapter, lesson, previewQuestions);
      setStatus('success');
      setMessage(`Đã tải lên thành công ${previewQuestions.length} câu cho bài ${lesson} chương ${chapter} môn ${subject}.`);
      setPreviewQuestions([]);
      setFile(null);
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setMessage('Lỗi khi lưu vào Firebase: ' + err.message);
    }
  };

  return (
    <div className="bg-stone-900/50 rounded-xl p-6 border border-stone-800">
      <h3 className="text-xl font-bold text-emerald-400 mb-6 flex items-center gap-2">
        <Upload size={24} /> Tải Lên & Sinh Câu Hỏi (AI)
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-stone-400 text-sm mb-2">Chọn file tài liệu (PDF, TXT, MD, JSON)</label>
          <input 
            type="file" 
            accept=".pdf,.txt,.md,.json" 
            onChange={handleFileChange}
            className="w-full text-white bg-stone-800 rounded-lg p-2 border border-stone-700"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-stone-400 text-sm mb-2">Môn học (Subject ID)</label>
            <input 
              type="text" 
              value={subject} 
              onChange={e => setSubject(e.target.value)}
              className="w-full bg-stone-800 border border-stone-700 p-2 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-stone-400 text-sm mb-2">Khối lớp</label>
            <select 
              value={grade} 
              onChange={e => setGrade(Number(e.target.value))}
              className="w-full bg-stone-800 border border-stone-700 p-2 rounded-lg text-white"
            >
              {[6,7,8,9,10,11,12].map(g => <option key={g} value={g}>Lớp {g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-stone-400 text-sm mb-2">Chương</label>
            <input 
              type="number" 
              value={chapter} 
              onChange={e => setChapter(Number(e.target.value))}
              className="w-full bg-stone-800 border border-stone-700 p-2 rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-stone-400 text-sm mb-2">Bài</label>
            <input 
              type="number" 
              value={lesson} 
              onChange={e => setLesson(Number(e.target.value))}
              className="w-full bg-stone-800 border border-stone-700 p-2 rounded-lg text-white"
            />
          </div>
        </div>
      </div>
      
      <div className="flex gap-4 mb-6">
        <button 
          onClick={handleProcess}
          disabled={!file || status === 'uploading' || status === 'generating'}
          className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-xl flex items-center gap-2"
        >
          {status === 'generating' ? <RefreshCcw className="animate-spin" size={18} /> : <FileText size={18} />}
          1. Xử lý & Sinh AI
        </button>
        
        <button 
          onClick={handleSaveToFirebase}
          disabled={previewQuestions.length === 0 || status === 'uploading'}
          className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold py-2 px-6 rounded-xl flex items-center gap-2"
        >
          {status === 'uploading' && previewQuestions.length > 0 ? <RefreshCcw className="animate-spin" size={18} /> : <Save size={18} />}
          2. Lưu vào Thí luyện đường
        </button>
      </div>
      
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${status === 'error' ? 'bg-red-900/30 text-red-400' : 'bg-blue-900/30 text-blue-400'}`}>
          {message}
        </div>
      )}
      
      {previewQuestions.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-bold text-lg text-amber-400">Xem trước câu hỏi ({previewQuestions.length}):</h4>
          <div className="max-h-[400px] overflow-y-auto space-y-3">
            {previewQuestions.map((q, i) => (
              <div key={i} className="bg-stone-800 p-4 rounded-lg">
                <div className="font-bold text-white mb-2">Câu {i + 1}: {q.question}</div>
                {q.type === 'short_answer' ? (
                  <div className="text-sm p-3 bg-emerald-900/50 text-emerald-400 border border-emerald-500/30 rounded-lg">
                    <span className="font-bold">Đáp án:</span> {q.correctAnswer}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 text-sm text-stone-300">
                    {q.options?.map((opt, idx) => (
                      <div key={idx} className={`p-2 rounded ${q.correctAnswer === idx ? 'bg-emerald-900/50 text-emerald-400 border border-emerald-500/30' : 'bg-stone-900'}`}>
                        {q.type === 'true_false' ? (idx === 0 ? 'Đúng' : 'Sai') : String.fromCharCode(65 + idx)}. {opt}
                      </div>
                    ))}
                  </div>
                )}
                {q.explanation && (
                  <div className="mt-2 text-sm text-amber-500/80 italic">Giải thích: {q.explanation}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
