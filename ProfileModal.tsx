import React, { useState, useRef } from 'react';
import { PlayerState, Hero } from './types';
import { redeemCloudGiftCode } from './firebaseService';
import { XCircle, Gift, User, CheckCircle, Upload, Image as ImageIcon, Sparkles, Edit3 } from 'lucide-react';
import { DEFAULT_ALLY_IMG } from './constants';

export const ProfileModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  player: PlayerState;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>;
  availableAvatars: Hero[];
}> = ({ isOpen, onClose, player, setPlayer, availableAvatars }) => {
  const [codeStr, setCodeStr] = useState('');
  const [activeTab, setActiveTab] = useState<'profile' | 'giftcode'>('profile');
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editFullName, setEditFullName] = useState(player.fullName || '');
  const [editClassName, setEditClassName] = useState(player.className || '');
  const [editGrade, setEditGrade] = useState<number>(player.grade || 6);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleRedeem = async () => {
    if (!codeStr.trim()) return alert("Vui lòng nhập mã code");
    
    setIsRedeeming(true);
    const result = await redeemCloudGiftCode(codeStr.trim(), player.playerName);
    setIsRedeeming(false);
    
    if (!result.success || !result.code) {
      return alert(result.message);
    }
    
    // Apply rewards
    setPlayer(p => {
      const newState = { ...p, pills: p.pills ? { ...p.pills } : {} };
      let summary = "Bạn nhận được:\n";
      
      result.code!.rewards.forEach(r => {
        if (r.itemId === 'gold') { newState.gold = (newState.gold || 0) + r.amount; summary += `- ${r.amount} Vàng\n`; }
        else if (r.itemId === 'jade') { newState.jade = (newState.jade || 0) + r.amount; summary += `- ${r.amount} Ngọc Bích\n`; }
        else if (r.itemId === 'normalTickets') { newState.normalTickets = (newState.normalTickets || 0) + r.amount; summary += `- ${r.amount} Vé Anh Hào\n`; }
        else if (r.itemId === 'premiumTickets') { newState.premiumTickets = (newState.premiumTickets || 0) + r.amount; summary += `- ${r.amount} Vé Danh Tướng\n`; }
        else if (r.itemId === 'artifactTickets') { newState.artifactTickets = (newState.artifactTickets || 0) + r.amount; summary += `- ${r.amount} Vé Thần Khí\n`; }
        else if (r.itemId === 'legionTickets') { newState.legionTickets = (newState.legionTickets || 0) + r.amount; summary += `- ${r.amount} Vé Quân Đoàn\n`; }
        else if (r.itemId.startsWith('pill')) {
           newState.pills![r.itemId] = (newState.pills![r.itemId] || 0) + r.amount;
           summary += `- ${r.amount} Đan Dược\n`;
        }
      });
      alert(result.message + "\n\n" + summary);
      return newState;
    });
    
    setCodeStr('');
  };

  const handleSelectAvatar = (heroId: string) => {
    setPlayer(p => ({ ...p, avatarId: heroId, customAvatar: undefined }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return alert("Vui lòng chọn file định dạng hình ảnh (PNG, JPG, JPEG, WEBP)");
    }

    if (file.size > 2.5 * 1024 * 1024) {
      return alert("Ảnh quá lớn! Vui lòng chọn ảnh có dung lượng dưới 2.5MB.");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const base64Data = event.target?.result as string;
      setPlayer(p => ({ ...p, customAvatar: base64Data }));
      alert("Đã cập nhật ảnh đại diện từ máy tính thành công!");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveStudentInfo = () => {
    if (!editFullName.trim()) return alert("Họ và tên học sinh không được để trống.");
    if (!editClassName.trim()) return alert("Lớp học không được để trống.");
    setPlayer(p => ({
      ...p,
      fullName: editFullName.trim(),
      className: editClassName.trim().toUpperCase(),
      grade: editGrade
    }));
    setIsEditingInfo(false);
    alert("Đã cập nhật thông tin học sinh thành công!");
  };

  const currentAvatarHero = availableAvatars.find(h => h.id === player.avatarId);
  const currentAvatarImg = player.customAvatar || (currentAvatarHero ? currentAvatarHero.image : DEFAULT_ALLY_IMG);

  // Deduplicate heroes by name so they don't show multiple times
  const uniqueAvatars = Array.from(new Map(availableAvatars.map(h => [h.name, h])).values());

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-stone-900 border-2 border-amber-500 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative max-h-[92vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
         <button onClick={onClose} className="absolute top-4 right-4 text-amber-500 hover:text-amber-300 transition-colors p-1">
            <XCircle size={28} />
         </button>
         
         <h2 className="text-xl md:text-2xl font-cinzel font-black text-amber-400 text-center mb-4 uppercase tracking-widest">
            Hồ Sơ Hào Kiệt & Học Sinh
         </h2>
         
         <div className="flex border-b border-amber-900/50 mb-6 gap-2">
            <button onClick={() => setActiveTab('profile')} className={`flex-1 py-2.5 rounded-t-xl font-bold text-sm uppercase tracking-wider transition-all ${activeTab === 'profile' ? 'bg-amber-700/40 text-amber-300 border-t-2 border-x-2 border-amber-500' : 'text-stone-400 hover:text-white'}`}>
               👤 Thông Tin & Avatar
            </button>
            <button onClick={() => setActiveTab('giftcode')} className={`flex-1 py-2.5 rounded-t-xl font-bold text-sm uppercase tracking-wider transition-all ${activeTab === 'giftcode' ? 'bg-amber-700/40 text-amber-300 border-t-2 border-x-2 border-amber-500' : 'text-stone-400 hover:text-white'}`}>
               🎁 Nhập Giftcode
            </button>
         </div>

         {activeTab === 'profile' && (
            <div className="flex flex-col gap-5 overflow-y-auto pr-2 custom-scrollbar">
              
              {/* Card thông tin cơ bản của học sinh */}
              <div className="bg-stone-800/90 p-5 rounded-2xl border border-amber-500/30 flex flex-col sm:flex-row items-center gap-5 relative">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-amber-500 overflow-hidden flex-shrink-0 bg-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                    <img src={currentAvatarImg} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  {player.customAvatar && (
                    <span className="absolute bottom-0 right-0 bg-emerald-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full border border-white">
                      Ảnh Máy
                    </span>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1 w-full">
                  <div className="flex items-center justify-center sm:justify-between">
                    <h3 className="text-xl font-black text-white font-cinzel">{player.playerName}</h3>
                    <button 
                      onClick={() => setIsEditingInfo(!isEditingInfo)}
                      className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold bg-amber-950/70 border border-amber-700/60 px-2.5 py-1 rounded-lg transition-all"
                    >
                      <Edit3 size={13} /> {isEditingInfo ? "Hủy sửa" : "Sửa thông tin"}
                    </button>
                  </div>
                  
                  {!isEditingInfo ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs pt-1">
                      <p className="text-stone-300"><span className="text-amber-500 font-bold">Họ & Tên:</span> {player.fullName || "Chưa cập nhật"}</p>
                      <p className="text-stone-300"><span className="text-amber-500 font-bold">Lớp:</span> {player.className || (player.grade ? `Khối ${player.grade}` : "Chưa cập nhật")}</p>
                      <p className="text-stone-300"><span className="text-amber-500 font-bold">Tài khoản:</span> {player.username || "Chưa lưu"}</p>
                      <p className="text-stone-300"><span className="text-amber-500 font-bold">Quân Đoàn:</span> {player.legionName}</p>
                      <p className="text-stone-300 col-span-full"><span className="text-amber-500 font-bold">Khối Thí Luyện:</span> Khối {player.grade || 6}</p>
                    </div>
                  ) : (
                    <div className="space-y-2 pt-2 text-xs">
                      <div>
                        <label className="text-stone-400 block mb-0.5">Họ và tên học sinh:</label>
                        <input 
                          type="text" 
                          value={editFullName} 
                          onChange={e => setEditFullName(e.target.value)} 
                          className="w-full bg-stone-900 border border-amber-600/50 p-1.5 rounded-lg text-white font-bold"
                          placeholder="Nguyễn Văn A..."
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-stone-400 block mb-0.5">Khối:</label>
                          <select 
                            value={editGrade} 
                            onChange={e => setEditGrade(Number(e.target.value))}
                            className="w-full bg-stone-900 border border-amber-600/50 p-1.5 rounded-lg text-white font-bold"
                          >
                            <option value={6}>Khối 6</option>
                            <option value={7}>Khối 7</option>
                            <option value={8}>Khối 8</option>
                            <option value={9}>Khối 9</option>
                          </select>
                        </div>
                        <div>
                          <label className="text-stone-400 block mb-0.5">Tên lớp:</label>
                          <input 
                            type="text" 
                            value={editClassName} 
                            onChange={e => setEditClassName(e.target.value.toUpperCase())} 
                            className="w-full bg-stone-900 border border-amber-600/50 p-1.5 rounded-lg text-white font-bold uppercase"
                            placeholder="VD: 6A1, 9B..."
                          />
                        </div>
                      </div>
                      <button 
                        onClick={handleSaveStudentInfo}
                        className="bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-1.5 rounded-lg transition-all w-full mt-1"
                      >
                        Lưu Thông Tin Học Sinh
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Nút Upload ảnh đại diện từ máy */}
              <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
                    <Upload size={16} className="text-amber-500" /> Tải Ảnh Đại Diện Từ Máy Tính
                  </h4>
                  <p className="text-stone-400 text-xs mt-0.5">Hỗ trợ định dạng PNG, JPG, WEBP (Dưới 2.5MB)</p>
                </div>

                <div className="flex items-center gap-2">
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                    className="hidden" 
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold text-xs uppercase px-4 py-2 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <ImageIcon size={14} /> Chọn Ảnh Từ Máy
                  </button>
                  {player.customAvatar && (
                    <button 
                      onClick={() => setPlayer(p => ({ ...p, customAvatar: undefined }))}
                      className="bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-red-400 text-xs px-2.5 py-2 rounded-xl transition-all border border-stone-700"
                      title="Bỏ ảnh máy, dùng lại ảnh tướng"
                    >
                      Dùng ảnh tướng
                    </button>
                  )}
                </div>
              </div>

              {/* Chọn avatar từ các tướng đã sở hữu */}
              <div>
                <h4 className="text-stone-400 font-bold uppercase mb-3 text-xs flex items-center gap-2">
                  <User size={15}/> Hoặc Chọn Ảnh Từ Tướng Quân Đoàn Sở Hữu
                </h4>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-3 max-h-56 overflow-y-auto p-2 bg-stone-950 rounded-xl border border-stone-800 custom-scrollbar">
                  {uniqueAvatars.map(hero => {
                    const isSelected = !player.customAvatar && currentAvatarHero && currentAvatarHero.name === hero.name;
                    return (
                      <div 
                        key={hero.id} 
                        onClick={() => handleSelectAvatar(hero.id)}
                        className={`relative cursor-pointer rounded-xl overflow-hidden aspect-square border-2 transition-all group ${
                          isSelected 
                            ? 'border-amber-500 scale-105 shadow-[0_0_15px_rgba(245,158,11,0.6)]' 
                            : 'border-stone-700 hover:border-amber-500/60 hover:scale-105'
                        }`}
                      >
                        <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" />
                        <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] text-stone-300 font-bold text-center truncate px-1">
                          {hero.name}
                        </span>
                        {isSelected && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <CheckCircle className="text-amber-400" size={24} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {availableAvatars.length === 0 && (
                    <p className="col-span-full text-stone-500 text-center py-4 text-xs">Chưa có tướng vĩnh viễn nào trong Quân Đoàn</p>
                  )}
                </div>
              </div>
            </div>
         )}

         {activeTab === 'giftcode' && (
            <div className="flex flex-col gap-6">
              <div className="bg-stone-800 p-6 rounded-2xl border border-stone-700 text-center">
                <Gift size={48} className="mx-auto text-amber-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Nhận Quà Giftcode</h3>
                <p className="text-stone-400 mb-6 text-sm">Nhập mã code được phát từ Admin để nhận nhiều phần quà giá trị như Vàng, Ngọc Bích, Vé Quay, Đan Dược...</p>
                
                <div className="flex flex-col gap-3 max-w-sm mx-auto">
                  <input 
                    type="text" 
                    value={codeStr} 
                    onChange={e => setCodeStr(e.target.value.toUpperCase())}
                    className="bg-stone-900 border border-stone-600 p-4 rounded-xl text-white outline-none focus:border-amber-500 uppercase text-center font-mono text-xl tracking-widest shadow-inner" 
                    placeholder="NHẬP MÃ CODE" 
                  />
                  <button 
                    onClick={handleRedeem}
                    className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-black py-4 rounded-xl shadow-lg transition-transform active:scale-95 text-lg uppercase tracking-wider"
                  >
                    Xác Nhận Đổi
                  </button>
                </div>
              </div>
            </div>
         )}
      </div>
    </div>
  );
};
