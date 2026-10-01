import React, { useState, useEffect } from 'react';
import { ChevronLeft, Download, Database, Plus, Trash2, Gift, Code, ShieldAlert, VolumeX, Volume2, Lock, Unlock, MessageSquare, AlertTriangle, UserX, Check } from 'lucide-react';
import { 
  getAllTrialRecords, 
  getAllChatSessions, 
  ChatSession, 
  fetchCloudGiftCodes, 
  saveCloudGiftCode, 
  deleteCloudGiftCode, 
  fetchAllStudentAnalytics, 
  StudentAnalytics,
  listenToGlobalChat,
  listenToModerationRules,
  banUserFromChat,
  banAccount,
  deleteGlobalChatMessage,
  ChatMessage,
  ModerationRules
} from './firebaseService';
import * as XLSX from 'xlsx';
import { GiftCode, GiftCodeReward } from './types';

const PILLS = [
  { id: 'pill1', name: 'Nhất Tinh Tụ Khí Đan' },
  { id: 'pill2', name: 'Nhị Tinh Tụ Khí Đan' },
  { id: 'pill3', name: 'Tam Tinh Tụ Khí Đan' },
  { id: 'pill4', name: 'Tứ Tinh Tụ Khí Đan' },
  { id: 'pill5', name: 'Tối Thượng Thái Sơ Đan' }
];

const ITEM_OPTIONS = [
  { id: 'gold', name: 'Ngân Lượng' },
  { id: 'jade', name: 'Ngọc Bích' },
  { id: 'normalTickets', name: 'Vé Anh Hào' },
  { id: 'premiumTickets', name: 'Vé Danh Tướng' },
  { id: 'artifactTickets', name: 'Vé Thần Khí' },
  { id: 'legionTickets', name: 'Vé Quân Đoàn' },
  ...PILLS
];

export const AdminView: React.FC<{ setView: (v: string) => void }> = ({ setView }) => {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'thi_luyen' | 'giftcode' | 'analytics' | 'chat-logs' | 'chat-moderation'>('analytics');
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [selectedChatSession, setSelectedChatSession] = useState<ChatSession | null>(null);
  const [giftCodes, setGiftCodes] = useState<GiftCode[]>([]);
  const [newCodeStr, setNewCodeStr] = useState('');
  const [newRewards, setNewRewards] = useState<GiftCodeReward[]>([]);
  const [selectedItemId, setSelectedItemId] = useState('gold');
  const [rewardAmount, setRewardAmount] = useState<number>(1);
  const [expiresAtDate, setExpiresAtDate] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [allowedPlayersText, setAllowedPlayersText] = useState(''); // Mỗi dòng 1 tên tài khoản

  // Moderation state
  const [globalChatMessages, setGlobalChatMessages] = useState<ChatMessage[]>([]);
  const [moderationRules, setModerationRules] = useState<ModerationRules>({ bannedChatUsers: [], bannedAccounts: [] });
  const [manualUsername, setManualUsername] = useState('');
  const [manualBanReason, setManualBanReason] = useState('');
  const [modSuccessMsg, setModSuccessMsg] = useState('');

  // Analytics state
  const [analytics, setAnalytics] = useState<StudentAnalytics[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [analyticsFilter, setAnalyticsFilter] = useState<{ grade: string; className: string }>({ grade: '', className: '' });
  const [analyticsSortBy, setAnalyticsSortBy] = useState<keyof StudentAnalytics>('updatedAt');
  const [analyticsSortDir, setAnalyticsSortDir] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    const fetchCodes = async () => {
      const codes = await fetchCloudGiftCodes();
      setGiftCodes(codes);
    };
    fetchCodes();
  }, []);

  const handleAddReward = () => {
    if (rewardAmount <= 0) return alert('Số lượng phải lớn hơn 0');
    const existingIdx = newRewards.findIndex(r => r.itemId === selectedItemId);
    if (existingIdx >= 0) {
       const updated = [...newRewards];
       updated[existingIdx].amount += rewardAmount;
       setNewRewards(updated);
    } else {
       setNewRewards([...newRewards, { itemId: selectedItemId, amount: rewardAmount }]);
    }
  };

  const handleCreateCode = async () => {
    if (!newCodeStr.trim()) return alert('Vui lòng nhập mã code');
    if (newRewards.length === 0) return alert('Vui lòng thêm ít nhất 1 phần thưởng');
    // Dữ liệu sẽ được build động để tránh undefined fields (Firestore reject)
    
    setLoading(true);
    const newGiftCode: any = {
      code: newCodeStr.trim().toUpperCase(),
      rewards: newRewards,
      usedBy: [],
      isPrivate
    };
    if (expiresAtDate) {
      newGiftCode.expiresAt = new Date(expiresAtDate).getTime();
    }
    if (isPrivate && allowedPlayersText) {
      newGiftCode.allowedPlayers = allowedPlayersText.split('\n').map(s => s.trim()).filter(Boolean);
    }
    
    const success = await saveCloudGiftCode(newGiftCode);
    if (success) {
      const updatedCodes = await fetchCloudGiftCodes();
      setGiftCodes(updatedCodes);
      setNewCodeStr('');
      setNewRewards([]);
      setExpiresAtDate('');
      setIsPrivate(false);
      setAllowedPlayersText('');
      alert('Tạo Giftcode trên Cloud thành công!');
    } else {
      alert('Lỗi tạo Giftcode (Kiểm tra kết nối hoặc Firebase config)');
    }
    setLoading(false);
  };

  const handleDeleteCode = async (code: string) => {
    if (window.confirm('Xóa Giftcode này trên Cloud?')) {
       setLoading(true);
       const success = await deleteCloudGiftCode(code);
       if (success) {
         const updatedCodes = await fetchCloudGiftCodes();
         setGiftCodes(updatedCodes);
       }
       setLoading(false);
    }
  };

  useEffect(() => {
    const fetchRecords = async () => {
      setLoading(true);
      const data = await getAllTrialRecords();
      setRecords(data);
      setLoading(false);
    };
    fetchRecords();
  }, []);

  // Load analytics khi chuyển sang tab analytics
  useEffect(() => {
    if (activeTab !== 'analytics') return;
    const load = async () => {
      setAnalyticsLoading(true);
      const data = await fetchAllStudentAnalytics();
      setAnalytics(data);
      setAnalyticsLoading(false);
    };
    load();
  }, [activeTab]);

  // Load chat sessions khi chuyển sang tab chat-logs
  useEffect(() => {
    if (activeTab !== 'chat-logs') return;
    const loadChats = async () => {
      try {
        const chats = await getAllChatSessions();
        setChatSessions(chats);
      } catch (err) {
        console.error(err);
      }
    };
    loadChats();
  }, [activeTab]);

  // Load Global Chat & Moderation Rules theo thời gian thực khi chuyển sang tab chat-moderation
  useEffect(() => {
    if (activeTab !== 'chat-moderation') return;
    const unsubChat = listenToGlobalChat((msgs) => setGlobalChatMessages(msgs));
    const unsubRules = listenToModerationRules((rules) => setModerationRules(rules));
    return () => {
      unsubChat();
      unsubRules();
    };
  }, [activeTab]);

  const showModSuccess = (msg: string) => {
    setModSuccessMsg(msg);
    setTimeout(() => setModSuccessMsg(''), 4000);
  };

  const handleManualAction = async (actionType: 'mute' | 'ban') => {
    const raw = manualUsername.trim().toLowerCase();
    if (!raw) return alert('Vui lòng nhập tên tài khoản');
    if (raw === 'admin' || raw === 'tmt') return alert('Không thể xử phạt tài khoản Admin!');

    setLoading(true);
    if (actionType === 'mute') {
      const ok = await banUserFromChat(raw, true, manualBanReason);
      if (ok) showModSuccess(`Đã CẤM CHAT thành công tài khoản [${raw}]`);
    } else {
      const ok = await banAccount(raw, true, manualBanReason);
      if (ok) showModSuccess(`Đã KHÓA TÀI KHOẢN thành công tài khoản [${raw}]`);
    }
    setManualUsername('');
    setManualBanReason('');
    setLoading(false);
  };

  const handleExportAnalytics = () => {
    if (analytics.length === 0) return alert('Không có dữ liệu!');
    const rows = analytics.map(s => ({
      'Tên Tài Khoản': s.username,
      'Họ Tên': s.fullName,
      'Lớp': s.className,
      'Khối': s.grade,
      'Số Câu Đã Làm': s.totalQuestionsAnswered,
      'Số Câu Đúng': s.correctAnswers,
      'Tỷ Lệ Đúng (%)': s.accuracy,
      'Chương Cao Nhất': s.topChapter,
      'Điểm Sử Việt': s.knowledgeScore,
      'Số Tướng': s.heroCount,
      'Phiên Học Cuối': new Date(s.lastSessionAt).toLocaleString('vi-VN'),
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Analytics');
    XLSX.writeFile(wb, `BaoCao_HocSinh_${new Date().getTime()}.xlsx`);
  };

  const filteredAnalytics = analytics
    .filter(s => !analyticsFilter.grade || String(s.grade) === analyticsFilter.grade)
    .filter(s => !analyticsFilter.className || s.className.toLowerCase().includes(analyticsFilter.className.toLowerCase()))
    .sort((a, b) => {
      const av = a[analyticsSortBy] as any;
      const bv = b[analyticsSortBy] as any;
      return analyticsSortDir === 'asc' ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
    });

  const handleSortClick = (col: keyof StudentAnalytics) => {
    if (analyticsSortBy === col) setAnalyticsSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setAnalyticsSortBy(col); setAnalyticsSortDir('desc'); }
  };

  const SortIcon = ({ col }: { col: keyof StudentAnalytics }) => (
    <span className="text-[10px] ml-0.5">{analyticsSortBy === col ? (analyticsSortDir === 'asc' ? '▲' : '▼') : '⇅'}</span>
  );

  const handleExport = () => {
    if (records.length === 0) return alert("Không có dữ liệu để xuất!");

    const rows: any[] = [];
    records.forEach(r => {
      const dateStr = new Date(r.timestamp).toLocaleString('vi-VN');
      
      // Each question becomes a row for detailed analysis
      if (r.questions && r.questions.length > 0) {
        r.questions.forEach((q: any, idx: number) => {
          rows.push({
            "Mã Lượt Thi": r.id,
            "Tên Đăng Nhập": r.username,
            "Lớp": r.grade,
            "Thời Gian Nộp Bài": dateStr,
            "Gói Câu Hỏi": r.packageSize,
            "Tổng Số Câu Đúng": r.correctCount,
            "Tổng Thời Gian Làm Bài (giây)": r.totalTimeSeconds,
            "STT Câu Hỏi": idx + 1,
            "Nội Dung Câu Hỏi": q.questionText,
            "Người Chơi Chọn": q.userAnswer ?? "Bỏ trống",
            "Đáp Án Đúng": q.correctAnswer,
            "Kết Quả": q.isCorrect ? "ĐÚNG" : "SAI",
            "Thời Gian Trả Lời (giây)": q.timeTakenSeconds,
            "Phân Tích Chi Tiết": q.explanation
          });
        });
      } else {
        // Fallback if no detailed questions
        rows.push({
            "Mã Lượt Thi": r.id,
            "Tên Đăng Nhập": r.username,
            "Lớp": r.grade,
            "Thời Gian Nộp Bài": dateStr,
            "Gói Câu Hỏi": r.packageSize,
            "Tổng Số Câu Đúng": r.correctCount,
            "Tổng Thời Gian Làm Bài (giây)": r.totalTimeSeconds,
        });
      }
    });

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Lịch Sử Thí Luyện");
    XLSX.writeFile(workbook, `BaoCao_ThiLuyen_Admin_${new Date().getTime()}.xlsx`);
  };

  return (
    <div className="fixed inset-0 bg-stone-900 flex flex-col font-sans z-50">
      <div className="h-16 bg-gradient-to-r from-stone-950 to-stone-900 border-b border-stone-800 flex items-center px-4 shrink-0 shadow-md">
        <button onClick={() => setView('chapter-hub')} className="p-2 hover:bg-white/10 rounded-full text-stone-400 transition-colors">
          <ChevronLeft size={28} />
        </button>
        <h1 className="ml-2 text-2xl font-cinzel text-amber-500 font-black flex items-center gap-2">
          <Database size={24} /> TRUNG TÂM DỮ LIỆU ADMIN
        </h1>
      </div>

      <div className="flex border-b border-stone-800 bg-stone-900/50">
        <button onClick={() => setActiveTab('analytics')} className={`flex-1 py-4 font-bold tracking-wider uppercase transition-colors ${activeTab === 'analytics' ? 'text-emerald-400 border-b-2 border-emerald-400 bg-emerald-500/10' : 'text-stone-400 hover:text-stone-200'}`}>📊 Analytics Học Sinh</button>
        <button onClick={() => setActiveTab('chat-moderation')} className={`flex-1 py-4 font-bold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 ${activeTab === 'chat-moderation' ? 'text-red-400 border-b-2 border-red-400 bg-red-500/10' : 'text-stone-400 hover:text-stone-200'}`}>
          <ShieldAlert size={18} /> Kiểm Duyệt Chat & Xử Phạt
        </button>
        <button onClick={() => setActiveTab('chat-logs')} className={`flex-1 py-4 font-bold tracking-wider uppercase transition-colors ${activeTab === 'chat-logs' ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/10' : 'text-stone-400 hover:text-stone-200'}`}>Giám sát AI Chat</button>
        <button onClick={() => setActiveTab('thi_luyen')} className={`flex-1 py-4 font-bold tracking-wider uppercase transition-colors ${activeTab === 'thi_luyen' ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/10' : 'text-stone-400 hover:text-stone-200'}`}>Dữ Liệu Thí Luyện</button>
        <button onClick={() => setActiveTab('giftcode')} className={`flex-1 py-4 font-bold tracking-wider uppercase transition-colors ${activeTab === 'giftcode' ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/10' : 'text-stone-400 hover:text-stone-200'}`}>Quản Lý Giftcode</button>
      </div>

      <div className="flex-1 p-6 overflow-auto">

        {/* ===== TAB: ANALYTICS HỌC SINH ===== */}
        {/* Tab Chat Logs */}
          {activeTab === 'chat-logs' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-amber-400">Giám sát AI Chat (Gần nhất)</h3>
              
              <div className="flex gap-4">
                {/* Cột danh sách */}
                <div className="w-1/3 bg-black/40 rounded-lg p-2 overflow-y-auto" style={{ maxHeight: '600px' }}>
                  {chatSessions.length === 0 ? <div className="text-gray-400 p-4">Chưa có lịch sử hội thoại nào.</div> : chatSessions.map(session => (
                    <div 
                      key={session.id} 
                      onClick={() => setSelectedChatSession(session)}
                      className={`p-3 mb-2 rounded cursor-pointer transition-colors ${selectedChatSession?.id === session.id ? 'bg-amber-900/40 border border-amber-500/50' : 'bg-white/5 hover:bg-white/10'}`}
                    >
                      <div className="font-bold text-amber-300">{session.playerName}</div>
                      <div className="text-sm text-gray-300 truncate">{session.title}</div>
                      <div className="text-xs text-gray-500 mt-1">{new Date(session.updatedAt).toLocaleString('vi-VN')}</div>
                    </div>
                  ))}
                </div>
                
                {/* Cột chi tiết */}
                <div className="w-2/3 bg-black/40 rounded-lg p-4 flex flex-col" style={{ height: '600px' }}>
                  {!selectedChatSession ? (
                    <div className="flex-1 flex items-center justify-center text-gray-500 italic">Chọn một phiên chat để xem chi tiết...</div>
                  ) : (
                    <>
                      <div className="border-b border-white/10 pb-2 mb-4">
                        <h4 className="font-bold text-lg text-amber-400">{selectedChatSession.playerName}</h4>
                        <div className="text-sm text-gray-400">{selectedChatSession.title}</div>
                      </div>
                      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                        {selectedChatSession.messages.map((msg, idx) => (
                          <div key={msg.id || idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div 
                              className={`max-w-[85%] rounded-lg p-3 ${msg.sender === 'user' ? 'bg-indigo-600/50 text-white rounded-tr-none' : 'bg-amber-900/50 text-amber-50 rounded-tl-none border border-amber-500/30'}`}
                              dangerouslySetInnerHTML={{ __html: msg.html }}
                            />
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
          <div className="max-w-7xl mx-auto">
            {/* Header + Controls */}
            <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-white">📊 Bảng Phân Tích Học Sinh</h2>
                <p className="text-stone-400 text-sm mt-1">Dữ liệu được cập nhật tự động sau mỗi lần học sinh lưu tiến độ (~3 giây).</p>
              </div>
              <div className="flex gap-3 items-center flex-wrap">
                <select value={analyticsFilter.grade} onChange={e => setAnalyticsFilter(f => ({ ...f, grade: e.target.value }))} className="bg-stone-800 border border-stone-600 px-3 py-2 rounded-xl text-white text-sm outline-none focus:border-emerald-500">
                  <option value="">Tất cả khối</option>
                  {[6,7,8,9].map(g => <option key={g} value={g}>Khối {g}</option>)}
                </select>
                <input type="text" placeholder="Tìm theo lớp (VD: 9A1)" value={analyticsFilter.className} onChange={e => setAnalyticsFilter(f => ({ ...f, className: e.target.value }))} className="bg-stone-800 border border-stone-600 px-3 py-2 rounded-xl text-white text-sm outline-none focus:border-emerald-500 w-44" />
                <button onClick={() => { setAnalyticsLoading(true); fetchAllStudentAnalytics().then(d => { setAnalytics(d); setAnalyticsLoading(false); }); }} className="bg-stone-700 hover:bg-stone-600 px-4 py-2 rounded-xl text-white text-sm font-bold flex items-center gap-2">
                  🔄 Tải lại
                </button>
                <button onClick={handleExportAnalytics} disabled={filteredAnalytics.length === 0} className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 px-4 py-2 rounded-xl text-white text-sm font-bold flex items-center gap-2">
                  <Download size={16} /> Xuất Excel ({filteredAnalytics.length})
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { label: 'Tổng học sinh', value: filteredAnalytics.length, color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800' },
                { label: 'TB câu đúng', value: filteredAnalytics.length ? Math.round(filteredAnalytics.reduce((s,x) => s + x.correctAnswers,0) / filteredAnalytics.length) : 0, color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800' },
                { label: 'TB tỷ lệ đúng', value: filteredAnalytics.length ? Math.round(filteredAnalytics.reduce((s,x) => s + x.accuracy,0) / filteredAnalytics.length) + '%' : '—', color: 'text-blue-400', bg: 'bg-blue-950/40 border-blue-800' },
                { label: 'Chương cao nhất', value: filteredAnalytics.length ? Math.max(...filteredAnalytics.map(x => x.topChapter)) : 0, color: 'text-purple-400', bg: 'bg-purple-950/40 border-purple-800' },
              ].map((card, i) => (
                <div key={i} className={`${card.bg} border rounded-2xl p-4`}>
                  <div className="text-xs text-stone-400 uppercase tracking-wider mb-1">{card.label}</div>
                  <div className={`text-3xl font-black ${card.color}`}>{analyticsLoading ? '...' : card.value}</div>
                </div>
              ))}
            </div>

            {/* Table */}
            {analyticsLoading ? (
              <div className="text-center py-20 text-stone-400">⏳ Đang tải dữ liệu từ Cloud...</div>
            ) : filteredAnalytics.length === 0 ? (
              <div className="text-center py-20 text-stone-500 italic">Chưa có dữ liệu analytics. Học sinh cần chơi game và lưu tiến độ để dữ liệu xuất hiện.</div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-stone-700 shadow-xl">
                <table className="w-full text-sm">
                  <thead className="bg-stone-800/80">
                    <tr>
                      {[
                        { label: '#', col: null },
                        { label: 'Tên TK', col: 'username' as keyof StudentAnalytics },
                        { label: 'Họ Tên', col: 'fullName' as keyof StudentAnalytics },
                        { label: 'Lớp', col: 'className' as keyof StudentAnalytics },
                        { label: 'Câu Đúng', col: 'correctAnswers' as keyof StudentAnalytics },
                        { label: 'Tỷ Lệ', col: 'accuracy' as keyof StudentAnalytics },
                        { label: 'Chương', col: 'topChapter' as keyof StudentAnalytics },
                        { label: 'Điểm Sử', col: 'knowledgeScore' as keyof StudentAnalytics },
                        { label: 'Tướng', col: 'heroCount' as keyof StudentAnalytics },
                        { label: 'Phiên Cuối', col: 'updatedAt' as keyof StudentAnalytics },
                      ].map((h, i) => (
                        <th key={i} onClick={() => h.col && handleSortClick(h.col)} className={`text-left px-4 py-3 text-xs font-black uppercase text-stone-400 tracking-wider whitespace-nowrap ${h.col ? 'cursor-pointer hover:text-emerald-400 select-none' : ''}`}>
                          {h.label}{h.col && <SortIcon col={h.col} />}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnalytics.map((s, idx) => (
                      <tr key={s.username} className={`border-t border-stone-800 transition-colors ${idx % 2 === 0 ? 'bg-stone-900/30' : 'bg-stone-900/10'} hover:bg-emerald-950/20`}>
                        <td className="px-4 py-3 text-stone-500 font-mono text-xs">{idx + 1}</td>
                        <td className="px-4 py-3 text-amber-400 font-bold font-mono">{s.username}</td>
                        <td className="px-4 py-3 text-white">{s.fullName}</td>
                        <td className="px-4 py-3">
                          <span className="bg-stone-700 text-amber-300 text-xs font-black px-2 py-0.5 rounded-full">{s.className} • K{s.grade}</span>
                        </td>
                        <td className="px-4 py-3 text-emerald-400 font-bold">{s.correctAnswers}<span className="text-stone-500 text-xs">/{s.totalQuestionsAnswered}</span></td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-16 bg-stone-700 rounded-full h-1.5">
                              <div className="h-1.5 rounded-full" style={{ width: `${s.accuracy}%`, background: s.accuracy >= 80 ? '#34d399' : s.accuracy >= 50 ? '#fbbf24' : '#f87171' }} />
                            </div>
                            <span className={`text-xs font-bold ${s.accuracy >= 80 ? 'text-emerald-400' : s.accuracy >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{s.accuracy}%</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-blue-400 font-bold">{s.topChapter}</td>
                        <td className="px-4 py-3 text-purple-400 font-bold">{(s.knowledgeScore || 0).toLocaleString()}</td>
                        <td className="px-4 py-3 text-stone-300">{s.heroCount}</td>
                        <td className="px-4 py-3 text-stone-400 text-xs whitespace-nowrap">{s.updatedAt ? new Date(s.updatedAt).toLocaleString('vi-VN', { day:'2-digit', month:'2-digit', hour:'2-digit', minute:'2-digit' }) : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'thi_luyen' && (
        <div className="max-w-4xl mx-auto bg-stone-800 border border-stone-700 p-8 rounded-3xl shadow-xl">
          <h2 className="text-2xl font-bold text-white mb-4">Hệ Thống Phân Tích Thí Luyện</h2>
          <p className="text-stone-400 mb-8">
            Dữ liệu được lưu trữ tự động trên Cloud mỗi khi người chơi hoàn thành bài thi.
            Bạn có thể tải toàn bộ dữ liệu hệ thống về dưới dạng Excel để phân tích học sinh nào làm sai những câu nào.
          </p>

          <div className="flex items-center gap-4 bg-stone-900 p-6 rounded-2xl border border-stone-700">
            <div className="flex-1">
              <div className="text-sm font-bold text-stone-500 uppercase">Tổng số lượt làm bài</div>
              <div className="text-4xl font-black text-amber-500">{loading ? "..." : records.length}</div>
            </div>
            
            <button 
              onClick={handleExport}
              disabled={loading || records.length === 0}
              className="bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-3"
            >
              <Download size={24} />
              XUẤT BÁO CÁO EXCEL
            </button>
          </div>
          
          <div className="mt-8 text-sm text-stone-500 bg-stone-900/50 p-4 rounded-xl">
            <strong className="text-amber-500">Lưu ý cấu hình:</strong> Nếu thấy số lượt làm bài = 0 mặc dù đã có người chơi, hãy kiểm tra lại file <code className="bg-black px-1 rounded text-red-400">firebaseService.ts</code> xem đã thay thế <strong>firebaseConfig</strong> đúng với Project trên Firebase của bạn chưa.
          </div>
        </div>
        )}
        
        {activeTab === 'giftcode' && (
          <div className="max-w-6xl mx-auto flex gap-8">
            <div className="flex-1 bg-stone-800 border border-stone-700 p-8 rounded-3xl shadow-xl flex flex-col gap-6">
               <h2 className="text-2xl font-bold text-white flex items-center gap-2"><Gift className="text-amber-500"/> Tạo Giftcode Mới</h2>
               <div className="flex flex-col gap-2">
                 <label className="text-stone-400 text-sm font-bold uppercase">Mã Code (Chữ & số)</label>
                 <div className="flex gap-2">
                   <input type="text" value={newCodeStr} onChange={e => setNewCodeStr(e.target.value)} className="flex-1 bg-stone-900 border border-stone-700 p-3 rounded-xl text-white outline-none focus:border-amber-500 uppercase font-mono" placeholder="VD: TANTHU2025" />
                   <button onClick={() => setNewCodeStr(Math.random().toString(36).substring(2, 10).toUpperCase())} className="bg-stone-700 hover:bg-stone-600 px-4 rounded-xl text-white font-bold">Tạo ngẫu nhiên</button>
                 </div>
               </div>

               <div className="flex flex-col gap-2">
                 <label className="text-stone-400 text-sm font-bold uppercase">Thời hạn sử dụng (Tùy chọn)</label>
                 <input type="datetime-local" value={expiresAtDate} onChange={e => setExpiresAtDate(e.target.value)} className="bg-stone-900 border border-stone-700 p-3 rounded-xl text-white outline-none focus:border-amber-500 font-mono" />
                 <span className="text-[10px] text-stone-500 italic">Bỏ trống nếu mã code vĩnh viễn không hết hạn.</span>
               </div>

               <div className="border border-stone-700 rounded-xl p-4 flex flex-col gap-4">
                 <label className="text-stone-400 text-sm font-bold uppercase">Phần thưởng ({newRewards.length})</label>
                 
                 <div className="flex gap-2">
                   <select className="flex-1 bg-stone-900 border border-stone-700 p-3 rounded-xl text-white outline-none" value={selectedItemId} onChange={e => setSelectedItemId(e.target.value)}>
                     {ITEM_OPTIONS.map(opt => <option key={opt.id} value={opt.id}>{opt.name}</option>)}
                   </select>
                   <input type="number" min="1" value={rewardAmount} onChange={e => setRewardAmount(Number(e.target.value))} className="w-24 bg-stone-900 border border-stone-700 p-3 rounded-xl text-white outline-none text-center" />
                   <button onClick={handleAddReward} className="bg-amber-600 hover:bg-amber-500 px-4 rounded-xl text-white font-bold"><Plus size={20}/></button>
                 </div>

                 {newRewards.length > 0 && (
                   <div className="flex flex-col gap-2 mt-2">
                     {newRewards.map((r, i) => (
                       <div key={i} className="flex justify-between items-center bg-stone-900 p-3 rounded-lg border border-stone-700">
                         <span className="text-amber-400 font-bold">{ITEM_OPTIONS.find(x => x.id === r.itemId)?.name}</span>
                         <div className="flex items-center gap-4">
                            <span className="text-white font-bold">x{r.amount}</span>
                            <button onClick={() => setNewRewards(newRewards.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-300"><Trash2 size={16}/></button>
                         </div>
                       </div>
                     ))}
                   </div>
                 )}
               </div>

               {/* Private Code Toggle */}
               <div className="border border-purple-800/60 rounded-xl p-4 flex flex-col gap-3 bg-purple-950/30">
                 <div className="flex items-center justify-between">
                   <label className="text-purple-300 text-sm font-bold uppercase flex items-center gap-2">
                     🔒 Code Riêng Tư
                   </label>
                   <button
                     onClick={() => setIsPrivate(p => !p)}
                     className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${
                       isPrivate
                         ? 'bg-purple-600 text-white shadow-[0_0_10px_rgba(147,51,234,0.5)]'
                         : 'bg-stone-700 text-stone-400'
                     }`}
                   >
                     {isPrivate ? '✔ BẮt' : 'Tắt'}
                   </button>
                 </div>
                 {isPrivate && (
                   <>
                     <p className="text-purple-400/80 text-xs">⚠️ Nhập <b className="text-yellow-300">Tên Tài Khoản Đăng Nhập</b> (không phải tên Chúa công). Mỗi dòng 1 tên tài khoản.</p>
                     <textarea
                       value={allowedPlayersText}
                       onChange={e => setAllowedPlayersText(e.target.value)}
                       rows={4}
                       className="bg-stone-900 border border-purple-700 p-3 rounded-xl text-white outline-none focus:border-purple-400 font-mono text-sm w-full resize-none"
                       placeholder={"hocsinh123\nnamhung9a\nthanhhuong2025\n\n⚠ Nhập tên đăng nhập, không phải tên ingame"}
                     />
                     <span className="text-xs text-purple-400/60 italic">{allowedPlayersText.split('\n').filter(Boolean).length} tài khoản được chỉ định</span>
                   </>
                 )}
               </div>

               <button onClick={handleCreateCode} disabled={loading} className="mt-4 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-lg uppercase tracking-wider">
                 {loading ? 'Đang lưu...' : 'Lưu Giftcode'}
               </button>
            </div>

            <div className="flex-1 bg-stone-800 border border-stone-700 p-8 rounded-3xl shadow-xl max-h-[80vh] overflow-y-auto">
               <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2"><Code className="text-amber-500"/> Danh sách Giftcode</h2>
               <div className="flex flex-col gap-4">
                 {giftCodes.length === 0 ? <p className="text-stone-500 text-center py-8">Chưa có code nào</p> : giftCodes.map(code => (
                   <div key={code.code} className="bg-stone-900 border border-stone-700 p-4 rounded-xl flex flex-col gap-3 relative">
                     <div className="flex justify-between items-center border-b border-stone-700 pb-2">
                       <span className="text-xl font-black text-amber-500 tracking-wider font-mono">{code.code}</span>
                       <button onClick={() => handleDeleteCode(code.code)} className="text-stone-500 hover:text-red-500 transition-colors"><Trash2 size={20}/></button>
                     </div>
                     <div className="flex flex-wrap gap-2">
                       {code.rewards.map((r, idx) => (
                         <span key={idx} className="bg-stone-800 border border-stone-600 px-2 py-1 rounded text-xs text-stone-300">
                           {ITEM_OPTIONS.find(x => x.id === r.itemId)?.name}: <b className="text-white">x{r.amount}</b>
                         </span>
                       ))}
                     </div>
                      <div className="flex justify-between items-center mt-1">
                         <div className="text-xs text-stone-500">Đã dùng: {code.usedBy.length} người</div>
                         <div className="flex items-center gap-2">
                           {code.isPrivate && (
                             <span className="text-xs bg-purple-900/60 border border-purple-700 text-purple-300 px-2 py-0.5 rounded-full font-bold">
                               🔒 Riêng tư • {code.allowedPlayers?.length || 0} TK
                             </span>
                           )}
                           {code.expiresAt && (
                             <div className={`text-xs ${Date.now() > code.expiresAt ? 'text-red-500' : 'text-green-500'}`}>
                               {Date.now() > code.expiresAt ? 'Hết hạn' : 'HSD'}: {new Date(code.expiresAt).toLocaleString('vi-VN')}
                             </div>
                           )}
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
        {/* ===== TAB: KIỂM DUYỆT CHAT & XỬ PHẠT TÀI KHOẢN ===== */}
        {activeTab === 'chat-moderation' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-800/80 p-5 rounded-2xl border border-red-900/40">
              <div>
                <h2 className="text-xl font-black text-red-400 flex items-center gap-2">
                  <ShieldAlert size={24} /> KIỂM DUYỆT KÊNH THẾ GIỚI & XỬ PHẠT TÀI KHOẢN
                </h2>
                <p className="text-stone-400 text-xs md:text-sm mt-1">
                  Nhận diện danh tính người chat theo <b>Tên đăng nhập (Username)</b> thật. Cấm chat Kênh Thế Giới hoặc Khóa tài khoản vi phạm thuần phong mỹ tục.
                </p>
              </div>
              {modSuccessMsg && (
                <div className="bg-emerald-950 border border-emerald-500 text-emerald-300 px-4 py-2 rounded-xl text-xs md:text-sm flex items-center gap-2 animate-in fade-in">
                  <Check size={16} /> {modSuccessMsg}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* CỘT 1 & 2: TIN NHẮN REALTIME TRÊN KÊNH THẾ GIỚI */}
              <div className="lg:col-span-2 bg-stone-800/90 border border-stone-700 rounded-2xl p-5 flex flex-col shadow-xl" style={{ height: '700px' }}>
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-stone-700">
                  <h3 className="font-bold text-amber-400 flex items-center gap-2 text-base">
                    <MessageSquare size={18} /> Tin Nhắn Kênh Thế Giới Gần Nhất ({globalChatMessages.length} tin)
                  </h3>
                  <span className="text-xs text-stone-400 italic">Tự động cập nhật thời gian thực</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2 scroll-bg">
                  {globalChatMessages.length === 0 ? (
                    <div className="text-center text-stone-500 py-20 italic">Chưa có tin nhắn nào trên Kênh Thế Giới.</div>
                  ) : (
                    [...globalChatMessages].reverse().map((msg) => {
                      const msgUser = (msg.senderId || '').toLowerCase();
                      const isChatBanned = moderationRules.bannedChatUsers?.some(u => u.toLowerCase() === msgUser);
                      const isAccBanned = moderationRules.bannedAccounts?.some(u => u.toLowerCase() === msgUser);

                      return (
                        <div key={msg.id} className="bg-stone-900/90 border border-stone-700/70 p-3.5 rounded-xl hover:border-amber-600/50 transition-colors">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-bold text-amber-500 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-900/50">
                                {msg.senderGrade}
                              </span>
                              <span className="font-bold text-stone-200 text-sm">{msg.senderName}</span>
                              <span className="text-xs font-mono font-bold bg-black/60 text-amber-400 px-2 py-0.5 rounded border border-amber-600/40">
                                TK: {msg.senderId}
                              </span>

                              {isChatBanned && (
                                <span className="text-[10px] font-bold bg-yellow-950 text-yellow-400 border border-yellow-600 px-1.5 py-0.5 rounded">
                                  🔇 Đang cấm chat
                                </span>
                              )}
                              {isAccBanned && (
                                <span className="text-[10px] font-bold bg-red-950 text-red-400 border border-red-600 px-1.5 py-0.5 rounded">
                                  🔒 Đã khóa nick
                                </span>
                              )}
                            </div>

                            <span className="text-[11px] text-stone-500">
                              {new Date(msg.timestamp).toLocaleString('vi-VN')}
                            </span>
                          </div>

                          <div className="bg-stone-950/60 p-2.5 rounded-lg border border-stone-800 text-stone-200 text-sm mb-3 break-words">
                            {msg.text}
                          </div>

                          {/* ACTION BUTTONS */}
                          <div className="flex flex-wrap items-center gap-2 justify-end pt-1 border-t border-stone-800">
                            <button
                              onClick={async () => {
                                if (!confirm(`Xóa tin nhắn này khỏi Kênh Thế Giới?`)) return;
                                await deleteGlobalChatMessage(msg.id);
                                showModSuccess('Đã xóa tin nhắn vi phạm khỏi Kênh Thế Giới');
                              }}
                              className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-red-300 border border-stone-600 flex items-center gap-1.5 transition-colors"
                              title="Xóa tin nhắn này"
                            >
                              <Trash2 size={13} className="text-red-400" /> Xóa tin
                            </button>

                            {msgUser !== 'admin' && msgUser !== 'tmt' && (
                              <>
                                <button
                                  onClick={async () => {
                                    const actionText = isChatBanned ? "MỞ CẤM CHAT" : "CẤM CHAT";
                                    if (!confirm(`Bạn có chắc muốn ${actionText} tài khoản [${msgUser}]?`)) return;
                                    await banUserFromChat(msgUser, !isChatBanned);
                                    showModSuccess(`Đã cập nhật cấm chat cho [${msgUser}]`);
                                  }}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-colors ${
                                    isChatBanned
                                      ? 'bg-emerald-950 hover:bg-emerald-900 border-emerald-600 text-emerald-300'
                                      : 'bg-yellow-950 hover:bg-yellow-900 border-yellow-600 text-yellow-300'
                                  }`}
                                >
                                  {isChatBanned ? <Volume2 size={13} /> : <VolumeX size={13} />}
                                  {isChatBanned ? 'Gỡ Cấm Chat' : 'Cấm Chat'}
                                </button>

                                <button
                                  onClick={async () => {
                                    const actionText = isAccBanned ? "MỞ KHÓA TÀI KHOẢN" : "KHÓA NICK HOÀN TOÀN";
                                    if (!confirm(`CẢNH BÁO: Bạn có chắc muốn ${actionText} [${msgUser}]?`)) return;
                                    await banAccount(msgUser, !isAccBanned);
                                    showModSuccess(`Đã cập nhật trạng thái khóa nick cho [${msgUser}]`);
                                  }}
                                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold border flex items-center gap-1.5 transition-colors ${
                                    isAccBanned
                                      ? 'bg-emerald-950 hover:bg-emerald-900 border-emerald-600 text-emerald-300'
                                      : 'bg-red-950 hover:bg-red-900 border-red-600 text-red-300'
                                  }`}
                                >
                                  {isAccBanned ? <Unlock size={13} /> : <Lock size={13} />}
                                  {isAccBanned ? 'Mở Khóa Nick' : 'Khóa Nick'}
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* CỘT 3: XỬ PHẠT THỦ CÔNG & DANH SÁCH BỊ PHẠT */}
              <div className="space-y-6">
                {/* FORM XỬ PHẠT THỦ CÔNG */}
                <div className="bg-stone-800/90 border border-stone-700 rounded-2xl p-5 shadow-xl">
                  <h3 className="font-bold text-amber-400 flex items-center gap-2 text-base mb-3 pb-2 border-b border-stone-700">
                    <UserX size={18} className="text-red-400" /> Xử Phạt Thủ Công Theo Tên TK
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-stone-300 font-bold block mb-1">Tên tài khoản (Username):</label>
                      <input
                        type="text"
                        value={manualUsername}
                        onChange={(e) => setManualUsername(e.target.value)}
                        placeholder="Nhập username (VD: hocsinh123)..."
                        className="w-full bg-stone-900 border border-stone-600 rounded-xl p-2.5 text-sm text-white font-mono focus:border-amber-500 outline-none"
                      />
                      <span className="text-[10px] text-stone-400 italic">Lưu ý: Nhập tên đăng nhập gốc, không phải tên nhân vật</span>
                    </div>

                    <div>
                      <label className="text-xs text-stone-300 font-bold block mb-1">Lý do vi phạm (tùy chọn):</label>
                      <input
                        type="text"
                        value={manualBanReason}
                        onChange={(e) => setManualBanReason(e.target.value)}
                        placeholder="Spam, lời lẽ thô tục..."
                        className="w-full bg-stone-900 border border-stone-600 rounded-xl p-2.5 text-sm text-white focus:border-amber-500 outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => handleManualAction('mute')}
                        disabled={loading || !manualUsername.trim()}
                        className="bg-yellow-800 hover:bg-yellow-700 disabled:opacity-50 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-yellow-600 transition-colors"
                      >
                        <VolumeX size={14} /> CẤM CHAT
                      </button>
                      <button
                        onClick={() => handleManualAction('ban')}
                        disabled={loading || !manualUsername.trim()}
                        className="bg-red-800 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-red-600 transition-colors"
                      >
                        <Lock size={14} /> KHÓA ACC
                      </button>
                    </div>
                  </div>
                </div>

                {/* DANH SÁCH BỊ CẤM CHAT */}
                <div className="bg-stone-800/90 border border-stone-700 rounded-2xl p-5 shadow-xl">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-stone-700">
                    <h3 className="font-bold text-yellow-400 flex items-center gap-2 text-sm">
                      <VolumeX size={16} /> Đang Bị Cấm Chat ({moderationRules.bannedChatUsers?.length || 0})
                    </h3>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scroll-bg">
                    {!moderationRules.bannedChatUsers || moderationRules.bannedChatUsers.length === 0 ? (
                      <div className="text-xs text-stone-500 italic text-center py-4">Không có tài khoản nào bị cấm chat.</div>
                    ) : (
                      moderationRules.bannedChatUsers.map((u) => (
                        <div key={u} className="flex justify-between items-center bg-stone-900 p-2.5 rounded-xl border border-yellow-900/40">
                          <span className="font-mono text-xs font-bold text-yellow-300">{u}</span>
                          <button
                            onClick={async () => {
                              if (!confirm(`Gỡ cấm chat cho tài khoản [${u}]?`)) return;
                              await banUserFromChat(u, false);
                              showModSuccess(`Đã gỡ cấm chat cho [${u}]`);
                            }}
                            className="bg-stone-800 hover:bg-emerald-900 border border-stone-700 hover:border-emerald-600 text-stone-300 hover:text-emerald-300 px-2 py-1 rounded text-[11px] font-bold transition-colors"
                          >
                            Gỡ cấm
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* DANH SÁCH BỊ KHÓA NICK */}
                <div className="bg-stone-800/90 border border-stone-700 rounded-2xl p-5 shadow-xl">
                  <div className="flex justify-between items-center mb-3 pb-2 border-b border-stone-700">
                    <h3 className="font-bold text-red-400 flex items-center gap-2 text-sm">
                      <Lock size={16} /> Đang Bị Khóa Nick ({moderationRules.bannedAccounts?.length || 0})
                    </h3>
                  </div>

                  <div className="max-h-48 overflow-y-auto space-y-2 pr-1 scroll-bg">
                    {!moderationRules.bannedAccounts || moderationRules.bannedAccounts.length === 0 ? (
                      <div className="text-xs text-stone-500 italic text-center py-4">Không có tài khoản nào bị khóa.</div>
                    ) : (
                      moderationRules.bannedAccounts.map((u) => (
                        <div key={u} className="flex justify-between items-center bg-stone-900 p-2.5 rounded-xl border border-red-900/40">
                          <span className="font-mono text-xs font-bold text-red-300">{u}</span>
                          <button
                            onClick={async () => {
                              if (!confirm(`Mở khóa tài khoản [${u}]?`)) return;
                              await banAccount(u, false);
                              showModSuccess(`Đã mở khóa tài khoản [${u}]`);
                            }}
                            className="bg-stone-800 hover:bg-emerald-900 border border-stone-700 hover:border-emerald-600 text-stone-300 hover:text-emerald-300 px-2 py-1 rounded text-[11px] font-bold transition-colors"
                          >
                            Mở khóa
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
