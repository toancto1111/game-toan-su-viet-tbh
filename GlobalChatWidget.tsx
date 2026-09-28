import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { listenToGlobalChat, sendGlobalChatMessage, ChatMessage } from './firebaseService';
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

    const success = await sendGlobalChatMessage({
      senderId: player.username || 'unknown',
      senderName: player.playerName || 'Người Chơi',
      senderGrade: player.grade ? `Lớp ${player.grade}` : 'Tân Binh',
      avatar: player.customAvatar || (player.avatarId ? `./avatars/${player.avatarId}.png` : './heroes/h1_0.png'),
      text: filteredText
    });

    if (success) {
      setInputText('');
      setLastSentTime(now);
    }
  };

  if (!player) return null;

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-4 z-50 bg-gradient-to-br from-amber-600 to-amber-800 text-white p-3 rounded-full shadow-[0_0_15px_rgba(217,119,6,0.5)] hover:scale-110 transition-transform flex items-center justify-center border-2 border-amber-400"
        >
          <MessageCircle size={28} />
          {unreadCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full border border-white animate-pulse">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-24 right-4 z-50 w-80 md:w-96 h-[500px] flex flex-col bg-stone-900/90 backdrop-blur-xl border-2 border-amber-900/50 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-5">
          
          <div className="bg-gradient-to-r from-amber-900 to-stone-900 p-3 border-b border-amber-700/50 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={20} className="text-amber-400" />
              <h3 className="font-cinzel font-bold text-amber-200 uppercase text-sm">Kênh Thế Giới</h3>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-bg">
            {messages.length === 0 ? (
              <div className="text-center text-stone-500 text-xs italic mt-10">
                Kênh thế giới đang tĩnh lặng. Hãy là người đầu tiên lên tiếng!
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === player.username;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-end gap-2 max-w-[85%]">
                      {!isMe && (
                         <div className="w-8 h-8 rounded-full border border-amber-900 overflow-hidden shrink-0 bg-stone-800">
                           <img src={msg.avatar || './heroes/h1_0.png'} alt="avatar" className="w-full h-full object-cover" />
                         </div>
                      )}
                      
                      <div className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-1 mb-1 px-1">
                          <span className="text-[10px] font-bold text-amber-500 bg-amber-950/50 px-1.5 py-0.5 rounded uppercase border border-amber-900/50">
                            {msg.senderGrade}
                          </span>
                          <span className="text-xs font-bold text-stone-300">{msg.senderName}</span>
                        </div>
                        
                        <div className={`px-3 py-2 rounded-2xl text-sm ${
                          isMe 
                            ? 'bg-amber-700/80 text-white rounded-tr-sm border border-amber-600/50' 
                            : 'bg-stone-800/80 text-stone-200 rounded-tl-sm border border-stone-700/50'
                        }`}>
                          {msg.text}
                        </div>
                        <span className="text-[9px] text-stone-500 mt-1 px-1">
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

          <form onSubmit={handleSend} className="p-3 bg-stone-950 border-t border-amber-900/30 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Giao lưu với thiên hạ..."
              maxLength={150}
              className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-4 py-2 text-sm text-white placeholder-stone-500 focus:outline-none focus:border-amber-700 transition-colors"
            />
            <button 
              type="submit" 
              disabled={!inputText.trim()}
              className="bg-amber-700 hover:bg-amber-600 disabled:bg-stone-800 disabled:text-stone-600 text-white p-2 rounded-xl transition-colors flex items-center justify-center shrink-0 border border-amber-600 disabled:border-stone-700"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
