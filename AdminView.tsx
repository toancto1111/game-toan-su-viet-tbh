import React, { useState, useEffect } from 'react';
import { ChevronLeft, Download, Database } from 'lucide-react';
import { getAllTrialRecords, fetchCloudGiftCodes, saveCloudGiftCode, deleteCloudGiftCode } from './firebaseService';
import * as XLSX from 'xlsx';
import { GiftCode, GiftCodeReward } from './types';
import { Plus, Trash2, Gift, Code } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'thi_luyen' | 'giftcode'>('thi_luyen');
  const [giftCodes, setGiftCodes] = useState<GiftCode[]>([]);
  const [newCodeStr, setNewCodeStr] = useState('');
  const [newRewards, setNewRewards] = useState<GiftCodeReward[]>([]);
  const [selectedItemId, setSelectedItemId] = useState('gold');
  const [rewardAmount, setRewardAmount] = useState<number>(1);
  const [expiresAtDate, setExpiresAtDate] = useState<string>('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [allowedPlayersText, setAllowedPlayersText] = useState(''); // Mỗi dòng 1 tên tài khoản

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
    
    const expiresAt = expiresAtDate ? new Date(expiresAtDate).getTime() : undefined;
    const allowedPlayers = isPrivate
      ? allowedPlayersText.split('\n').map(s => s.trim()).filter(Boolean)
      : undefined;
    
    setLoading(true);
    const success = await saveCloudGiftCode({
      code: newCodeStr.trim().toUpperCase(),
      rewards: newRewards,
      usedBy: [],
      expiresAt,
      isPrivate,
      allowedPlayers
    });
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
        <button onClick={() => setActiveTab('thi_luyen')} className={`flex-1 py-4 font-bold tracking-wider uppercase transition-colors ${activeTab === 'thi_luyen' ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/10' : 'text-stone-400 hover:text-stone-200'}`}>Dữ Liệu Thí Luyện</button>
        <button onClick={() => setActiveTab('giftcode')} className={`flex-1 py-4 font-bold tracking-wider uppercase transition-colors ${activeTab === 'giftcode' ? 'text-amber-500 border-b-2 border-amber-500 bg-amber-500/10' : 'text-stone-400 hover:text-stone-200'}`}>Quản Lý Giftcode</button>
      </div>

      <div className="flex-1 p-8 overflow-auto">
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
                     <p className="text-purple-400/80 text-xs">Chỉ những tài khoản bên dưới mới được dùng code này. Mỗi dòng 1 tên tài khoản.</p>
                     <textarea
                       value={allowedPlayersText}
                       onChange={e => setAllowedPlayersText(e.target.value)}
                       rows={4}
                       className="bg-stone-900 border border-purple-700 p-3 rounded-xl text-white outline-none focus:border-purple-400 font-mono text-sm w-full resize-none"
                       placeholder="NamAnh2025&#10;ThanhHuong9A&#10;MinhTri9B"
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
      </div>
    </div>
  );
};
