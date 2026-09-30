import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { listenToGlobalChat, sendGlobalChatMessage, ChatMessage, fetchOnlineLeaderboard } from './firebaseService';
import { PlayerState } from './types';

const BANNED_WORDS = ['đmm', 'đm', 'vcl', 'vl', 'cc', 'cặc', 'lồn', 'địt', 'đụ', 'fuck', 'shit', 'bitch'];

interface GlobalChatWidgetProps {
  player: PlayerState | null;
}

export const GlobalChatWidget: React.FC<GlobalChatWidgetProps> = ({ player }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [lastSentTime, setLastSentTime] = useState<number>(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [topRanks, setTopRanks] = useState<Record<string, { title: string, ring: string }>>({});

  useEffect(() => {
    const unsubscribe = listenToGlobalChat((msgs) => {
      setMessages(msgs);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    });
    return () => unsubscribe();
  }, [isOpen]);

  useEffect(() => {
    const loadRanks = async () => {
       const entries = await fetchOnlineLeaderboard('combat'); 
       const rankMap: Record<string, { title: string, ring: string }> = {};
       const getSafeName = (e: any) => (e?.playerName || e?.uid || "").toLowerCase();
       
       // Diligent
       const diliSorted = [...entries].sort((a, b) => (b.questionsAnswered || 0) - (a.questionsAnswered || 0));
       if (diliSorted[2]) rankMap[getSafeName(diliSorted[2])] = { title: "Cần Mẫn Quốc Sĩ", ring: "ring-[2px] ring-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" };
       if (diliSorted[1]) rankMap[getSafeName(diliSorted[1])] = { title: "Văn Xương Đế Quân", ring: "ring-[2px] ring-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" };
       if (diliSorted[0]) rankMap[getSafeName(diliSorted[0])] = { title: "Cần Vương Bảng Nhất", ring: "ring-[2px] ring-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" };

       // Trial
       const trialSorted = [...entries].sort((a, b) => (b.trialStage || 0) - (a.trialStage || 0));
       if (trialSorted[2]) rankMap[getSafeName(trialSorted[2])] = { title: "Đại Tư Mã", ring: "ring-[2px] ring-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" };
       if (trialSorted[1]) rankMap[getSafeName(trialSorted[1])] = { title: "Thượng Tướng Quân", ring: "ring-[2px] ring-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" };
       if (trialSorted[0]) rankMap[getSafeName(trialSorted[0])] = { title: "Đại Đô Đốc", ring: "ring-[2px] ring-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" };

       // Knowledge
       const knowSorted = [...entries].sort((a, b) => (b.knowledgeScore || 0) - (a.knowledgeScore || 0));
       if (knowSorted[2]) rankMap[getSafeName(knowSorted[2])] = { title: "Thám Hoa", ring: "ring-[2px] ring-amber-600 shadow-[0_0_10px_rgba(217,119,6,0.8)]" };
       if (knowSorted[1]) rankMap[getSafeName(knowSorted[1])] = { title: "Bảng Nhãn", ring: "ring-[2px] ring-gray-300 shadow-[0_0_10px_rgba(209,213,219,0.8)]" };
       if (knowSorted[0]) rankMap[getSafeName(knowSorted[0])] = { title: "Trạng Nguyên", ring: "ring-[2px] ring-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" };

       // Combat
       const combatSorted = [...entries].sort((a, b) => (b.combatPower || 0) - (a.combatPower || 0));
       if (combatSorted[2]) rankMap[getSafeName(combatSorted[2])] = { title: "Thừa Tướng", ring: "ring-[2px] ring-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]" };
       if (combatSorted[1]) rankMap[getSafeName(combatSorted[1])] = { title: "Quốc Sư", ring: "ring-[2px] ring-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]" };
       if (combatSorted[0]) rankMap[getSafeName(combatSorted[0])] = { title: "Cửu Ngũ Chí Tôn", ring: "ring-[2px] ring-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" };

       setTopRanks(rankMap);
    };
    if (isOpen) {
       loadRanks();
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const filterProfanity = (text: string) => {
    let filtered = text;
    BANNED_WORDS.forEach(word => {
      const regex = new RegExp(word, 'gi');
      filtered = filtered.replace(regex, '***');
    });
    return filtered;
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!player || !inputText.trim()) return;

    const now = Date.now();
    if (now - lastSentTime < 3000) {
      alert("Chúa công đang thao tác quá nhanh, hãy nghỉ tay 3 giây!");
      return;
    }

    const filteredText = filterProfanity(inputText.trim());

    const currentAvatarHero = (player.inventory || []).find(h => h.id === player.avatarId);
    const avatarToSave = player.customAvatar || (currentAvatarHero ? currentAvatarHero.image : './heroes/default_ally.png');

    const success = await sendGlobalChatMessage({
      senderId: player.username || 'unknown',
      senderName: player.playerName || 'Người Chơi',
      senderGrade: player.grade ? `Lớp ${player.grade}` : 'Tân Binh',
      avatar: avatarToSave,
      text: filteredText
    });

    if (success) {
      setInputText('');
      setLastSentTime(now);
    }
  };

  const handleOpen = () => {
    if (player && player.username?.startsWith('guest_')) {
      alert("Vui lòng tạo tài khoản để có thể hiệu lệnh thiên hạ");
      return;
    }
    setIsOpen(true);
  };

  if (!player) return null;

  return (
    <>
      {!isOpen && (
        <div
          onClick={handleOpen}
          className="fixed top-[180px] left-[24px] z-50 group flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
          title="Kênh Thế Giới"
        >
          <div className="relative bg-gradient-to-br from-amber-600 to-amber-800 text-white w-[68px] h-[68px] rounded-full shadow-[0_0_15px_rgba(217,119,6,0.5)] flex flex-col items-center justify-center border-2 border-amber-400">
            <MessageCircle size={28} />
            {unreadCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-black w-6 h-6 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-[0_0_10px_rgba(220,38,38,0.8)]">
                {unreadCount > 99 ? '99+' : unreadCount}
              </span>
            )}
          </div>
          <span className="mt-1.5 px-2.5 py-0.5 rounded-full bg-stone-900/90 border border-amber-700/50 text-[10px] font-black text-amber-400 uppercase tracking-widest drop-shadow whitespace-nowrap">Thế Giới</span>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 md:inset-auto md:top-[90px] md:left-[100px] z-50 w-full h-full md:w-[400px] md:h-[600px] flex flex-col bg-stone-900/95 backdrop-blur-xl md:border-2 md:border-amber-900/50 md:rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          
          <div className="bg-gradient-to-r from-amber-900 to-stone-900 p-3 md:p-4 border-b border-amber-700/50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle size={24} className="text-amber-400" />
              <h3 className="font-cinzel font-bold text-amber-200 uppercase text-sm md:text-base tracking-wider">Kênh Thế Giới</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="bg-stone-800/80 p-2 rounded-full border border-stone-600 text-stone-300 hover:bg-red-600/80 hover:text-white hover:border-red-400 transition-all shadow-md"
              title="Đóng Chat"
            >
              <X size={20} className="font-bold" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-bg">
            {messages.length === 0 ? (
              <div className="text-center text-stone-500 text-xs md:text-sm italic mt-10">
                Kênh thế giới đang tĩnh lặng. Hãy là người đầu tiên lên tiếng!
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === player.username;
                const senderKey = (msg.senderName || msg.senderId || "").toLowerCase();
                const rankInfo = topRanks[senderKey];
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-end gap-2 max-w-[90%] md:max-w-[85%]">
                      {!isMe && (
                         <div className={`w-10 h-10 rounded-full overflow-hidden shrink-0 bg-stone-800 ${rankInfo ? rankInfo.ring : 'border-2 border-amber-900 shadow-sm'}`}>
                           <img 
                             src={msg.avatar && msg.avatar !== './heroes/h1_0.png' ? msg.avatar : './heroes/default_ally.png'} 
                             onError={(e) => { e.currentTarget.src = './heroes/default_ally.png'; }} 
                             alt="avatar" 
                             className="w-full h-full object-cover" 
                           />
                         </div>
                      )}
                      
                      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-1.5 mb-1 px-1">
                          <span className="text-[10px] md:text-xs font-bold text-amber-500 bg-amber-950/80 px-1.5 py-0.5 rounded uppercase border border-amber-900/50 shadow-sm shrink-0">
                            {msg.senderGrade}
                          </span>
                          {rankInfo && (
                            <span className={`text-[10px] md:text-xs font-bold px-1.5 py-0.5 rounded uppercase border shadow-sm shrink-0 ${
                                rankInfo.title.includes('Tôn') || rankInfo.title.includes('Nguyên') || rankInfo.title.includes('Nhất') || rankInfo.title.includes('Đốc')
                                ? 'bg-yellow-900/80 text-yellow-400 border-yellow-500/50' 
                                : rankInfo.title.includes('Sư') || rankInfo.title.includes('Quân') || rankInfo.title.includes('Nhãn') 
                                ? 'bg-blue-900/80 text-blue-400 border-blue-500/50'
                                : 'bg-green-900/80 text-green-400 border-green-500/50'
                            }`}>
                                {rankInfo.title}
                            </span>
                          )}
                          <span className="text-xs md:text-sm font-bold text-stone-300">{msg.senderName}</span>
                        </div>
                        
                        <div className={`px-4 py-2.5 rounded-2xl text-sm md:text-base shadow-sm ${
                          isMe 
                            ? 'bg-amber-700 text-white rounded-tr-sm border border-amber-500/50' 
                            : 'bg-stone-800 text-stone-100 rounded-tl-sm border border-stone-600/50'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[9px] md:text-[10px] text-stone-500 mt-1 px-1 font-medium">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 md:p-4 bg-stone-950 border-t border-amber-900/40 flex gap-2 shrink-0 pb-safe">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Nhập tin nhắn..."
              maxLength={150}
              className="flex-1 bg-stone-900/80 border border-stone-700 rounded-xl px-4 py-3 text-sm md:text-base text-white placeholder-stone-500 focus:outline-none focus:border-amber-500 transition-colors shadow-inner"
            />
            <button 
              type="submit" 
              disabled={!inputText.trim()}
              className="bg-gradient-to-br from-amber-600 to-amber-800 hover:from-amber-500 hover:to-amber-700 disabled:from-stone-800 disabled:to-stone-900 disabled:text-stone-600 text-white p-3 md:p-4 rounded-xl transition-all flex items-center justify-center shrink-0 border border-amber-500/50 disabled:border-stone-700 shadow-md"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
