import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, Send, X, ShieldAlert, Trash2, VolumeX, Volume2, Lock, Unlock, AlertTriangle } from 'lucide-react';
import { 
  listenToGlobalChat, 
  sendGlobalChatMessage, 
  ChatMessage, 
  fetchOnlineLeaderboard,
  listenToModerationRules,
  banUserFromChat,
  banAccount,
  deleteGlobalChatMessage,
  ModerationRules
} from './firebaseService';
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

  // Moderation state
  const [moderation, setModeration] = useState<ModerationRules>({ bannedChatUsers: [], bannedAccounts: [] });
  const [selectedMsgForMod, setSelectedMsgForMod] = useState<ChatMessage | null>(null);
  const [modActionLoading, setModActionLoading] = useState(false);

  // Admin detection
  const safeUser = (player?.username || '').toLowerCase();
  const safePlayerName = (player?.playerName || '').toLowerCase();
  const isAdmin = safeUser === 'admin' || safeUser === 'tmt' || safePlayerName === 'admin' || safePlayerName === 'tmt';

  // Current user chat ban check
  const isChatBanned = !!safeUser && moderation.bannedChatUsers?.some(u => u.toLowerCase() === safeUser);

  useEffect(() => {
    const unsubscribeChat = listenToGlobalChat((msgs) => {
      setMessages(msgs);
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    });

    const unsubscribeRules = listenToModerationRules((rules) => {
      setModeration(rules);
    });

    return () => {
      unsubscribeChat();
      unsubscribeRules();
    };
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

    if (isChatBanned) {
      alert("Tài khoản của bạn đã bị cấm chat trên Kênh Thế Giới do vi phạm tiêu chuẩn cộng đồng.");
      return;
    }

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
    } else {
      alert("Không thể gửi tin nhắn. Có thể tài khoản của bạn đang bị cấm chat hoặc mất kết nối.");
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
        <div className="fixed inset-0 md:inset-auto md:top-[90px] md:left-[100px] z-50 w-full h-full md:w-[420px] md:h-[620px] flex flex-col bg-stone-900/95 backdrop-blur-xl md:border-2 md:border-amber-900/50 md:rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
          
          <div className="bg-gradient-to-r from-amber-900 to-stone-900 p-3 md:p-4 border-b border-amber-700/50 flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <MessageCircle size={24} className="text-amber-400" />
              <div>
                <h3 className="font-cinzel font-bold text-amber-200 uppercase text-sm md:text-base tracking-wider leading-none">Kênh Thế Giới</h3>
                {isAdmin && <span className="text-[10px] text-red-400 font-bold tracking-widest uppercase">Admin Mode (Xem TK)</span>}
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="bg-stone-800/80 p-2 rounded-full border border-stone-600 text-stone-300 hover:bg-red-600/80 hover:text-white hover:border-red-400 transition-all shadow-md"
              title="Đóng Chat"
            >
              <X size={20} className="font-bold" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-bg relative">
            {messages.length === 0 ? (
              <div className="text-center text-stone-500 text-xs md:text-sm italic mt-10">
                Kênh thế giới đang tĩnh lặng. Hãy là người đầu tiên lên tiếng!
              </div>
            ) : (
              messages.map((msg) => {
                const isMe = msg.senderId === player.username;
                const senderKey = (msg.senderName || msg.senderId || "").toLowerCase();
                const rankInfo = topRanks[senderKey];
                const msgSenderUser = (msg.senderId || '').toLowerCase();
                const isUserChatBanned = moderation.bannedChatUsers?.some(u => u.toLowerCase() === msgSenderUser);
                const isUserAccBanned = moderation.bannedAccounts?.some(u => u.toLowerCase() === msgSenderUser);

                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="flex items-end gap-2 max-w-[92%] md:max-w-[88%]">
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
                        <div className="flex items-center flex-wrap gap-1.5 mb-1 px-1">
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

                          {/* DÀNH CHO ADMIN: Hiện tên tài khoản đăng nhập và nút xử lý */}
                          {isAdmin && (
                            <div className="inline-flex items-center gap-1 ml-1">
                              <span 
                                title={`Tài khoản gốc: ${msg.senderId}`}
                                className={`text-[10px] font-mono px-1.5 py-0.2 rounded border font-bold ${
                                  isUserAccBanned
                                    ? 'bg-red-950 text-red-300 border-red-600'
                                    : isUserChatBanned
                                    ? 'bg-yellow-950 text-yellow-300 border-yellow-600'
                                    : 'bg-stone-950 text-amber-400 border-amber-700/60'
                                }`}
                              >
                                TK: {msg.senderId}
                                {isUserChatBanned && ' (🔇)'}
                                {isUserAccBanned && ' (🔒)'}
                              </span>
                              <button
                                onClick={() => setSelectedMsgForMod(msg)}
                                className="text-stone-400 hover:text-red-400 hover:bg-stone-800 p-0.5 rounded transition-colors"
                                title="Kiểm duyệt / Xử phạt người này"
                              >
                                <ShieldAlert size={14} />
                              </button>
                            </div>
                          )}
                        </div>
                        
                        <div className={`px-4 py-2.5 rounded-2xl text-sm md:text-base shadow-sm break-words max-w-full ${
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

          {/* POPUP KIỂM DUYỆT CỦA ADMIN */}
          {isAdmin && selectedMsgForMod && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm z-50 p-4 flex flex-col justify-center items-center animate-in fade-in duration-150">
              <div className="bg-stone-900 border-2 border-amber-600/70 rounded-2xl p-5 max-w-sm w-full shadow-2xl space-y-4">
                <div className="flex justify-between items-center border-b border-stone-700 pb-2">
                  <h4 className="font-bold text-amber-400 text-sm flex items-center gap-2">
                    <ShieldAlert size={18} className="text-red-400" /> KIỂM DUYỆT TIN NHẮN
                  </h4>
                  <button onClick={() => setSelectedMsgForMod(null)} className="text-stone-400 hover:text-white p-1">
                    <X size={18} />
                  </button>
                </div>

                <div className="bg-stone-950/80 p-3 rounded-xl border border-stone-800 space-y-1.5 text-xs">
                  <div><span className="text-stone-400">Tên hiển thị:</span> <b className="text-amber-200">{selectedMsgForMod.senderName}</b> ({selectedMsgForMod.senderGrade})</div>
                  <div><span className="text-stone-400">Tài khoản đăng nhập:</span> <b className="text-white font-mono bg-stone-800 px-1.5 py-0.5 rounded text-amber-300 font-bold">{selectedMsgForMod.senderId}</b></div>
                  <div className="mt-2 text-stone-300 italic bg-stone-900 p-2 rounded border border-stone-800 break-words">
                    "{selectedMsgForMod.text}"
                  </div>
                </div>

                <div className="space-y-2 pt-1">
                  <button
                    disabled={modActionLoading}
                    onClick={async () => {
                      if (!confirm(`Xóa tin nhắn này khỏi Kênh Thế Giới?`)) return;
                      setModActionLoading(true);
                      const ok = await deleteGlobalChatMessage(selectedMsgForMod.id);
                      setModActionLoading(false);
                      if (ok) setSelectedMsgForMod(null);
                    }}
                    className="w-full bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-200 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    <Trash2 size={15} className="text-red-400" /> XÓA TIN NHẮN NÀY
                  </button>

                  {(() => {
                    const targetUser = (selectedMsgForMod.senderId || '').toLowerCase();
                    const isTargetChatBanned = moderation.bannedChatUsers?.some(u => u.toLowerCase() === targetUser);
                    const isTargetAccBanned = moderation.bannedAccounts?.some(u => u.toLowerCase() === targetUser);

                    return (
                      <>
                        <button
                          disabled={modActionLoading || targetUser === 'admin' || targetUser === 'tmt'}
                          onClick={async () => {
                            const actionText = isTargetChatBanned ? "MỞ CẤM CHAT" : "CẤM CHAT KÊNH THẾ GIỚI";
                            if (!confirm(`Bạn có chắc muốn ${actionText} tài khoản [${targetUser}]?`)) return;
                            setModActionLoading(true);
                            await banUserFromChat(targetUser, !isTargetChatBanned);
                            setModActionLoading(false);
                          }}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors border ${
                            isTargetChatBanned
                              ? 'bg-emerald-950/70 hover:bg-emerald-900 border-emerald-600 text-emerald-300'
                              : 'bg-amber-950/70 hover:bg-amber-900 border-amber-600 text-amber-300'
                          }`}
                        >
                          {isTargetChatBanned ? <Volume2 size={15} /> : <VolumeX size={15} />}
                          {isTargetChatBanned ? `GỠ CẤM CHAT (${targetUser})` : `CẤM CHAT KÊNH THẾ GIỚI (${targetUser})`}
                        </button>

                        <button
                          disabled={modActionLoading || targetUser === 'admin' || targetUser === 'tmt'}
                          onClick={async () => {
                            const actionText = isTargetAccBanned ? "MỞ KHÓA TÀI KHOẢN" : "KHÓA TÀI KHOẢN TOÀN BỘ";
                            if (!confirm(`CẢNH BÁO: Bạn có chắc muốn ${actionText} tài khoản [${targetUser}]?`)) return;
                            setModActionLoading(true);
                            await banAccount(targetUser, !isTargetAccBanned);
                            setModActionLoading(false);
                          }}
                          className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors border ${
                            isTargetAccBanned
                              ? 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500 text-emerald-300'
                              : 'bg-red-950/80 hover:bg-red-900 border-red-500 text-red-300'
                          }`}
                        >
                          {isTargetAccBanned ? <Unlock size={15} /> : <Lock size={15} />}
                          {isTargetAccBanned ? `MỞ KHÓA TÀI KHOẢN (${targetUser})` : `KHÓA ACC VĨNH VIỄN (${targetUser})`}
                        </button>
                      </>
                    );
                  })()}
                </div>
              </div>
            </div>
          )}

          {/* Ô NHẬP TIN NHẮN HOẶC THÔNG BÁO BỊ CẤM CHAT */}
          {isChatBanned ? (
            <div className="p-3 md:p-4 bg-red-950/90 border-t border-red-700/60 flex items-center justify-center gap-2 text-red-200 text-xs md:text-sm font-bold text-center shrink-0">
              <AlertTriangle size={18} className="text-red-400 shrink-0 animate-pulse" />
              <span>Tài khoản của bạn đã bị CẤM CHAT Kênh Thế Giới do vi phạm nội quy.</span>
            </div>
          ) : (
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
          )}
        </div>
      )}
    </>
  );
};

