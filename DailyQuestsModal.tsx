import React, { useState } from 'react';
import { PlayerState } from './types';
import { DAILY_QUESTS } from './dailyQuestsData';
import { XCircle, CheckCircle, Gift, Target, Coins, Ticket } from 'lucide-react';

interface DailyQuestsModalProps {
  isOpen: boolean;
  onClose: () => void;
  player: PlayerState;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>;
}

export const DailyQuestsModal: React.FC<DailyQuestsModalProps> = ({ isOpen, onClose, player, setPlayer }) => {
  if (!isOpen) return null;

  const progress = player.dailyQuestProgress || {};
  const claimed = player.dailyQuestClaimed || [];

  const handleClaim = (questId: string, rewardType: string, rewardAmount: number) => {
    setPlayer(p => {
      const newState = { ...p };
      newState.dailyQuestClaimed = [...(newState.dailyQuestClaimed || []), questId];

      if (rewardType === 'gold') newState.gold = (newState.gold || 0) + rewardAmount;
      else if (rewardType === 'jade') newState.jade = (newState.jade || 0) + rewardAmount;
      else if (rewardType === 'premiumTickets') newState.premiumTickets = (newState.premiumTickets || 0) + rewardAmount;
      else if (rewardType === 'normalTickets') newState.normalTickets = (newState.normalTickets || 0) + rewardAmount;

      return newState;
    });
  };

  const renderRewardIcon = (type: string) => {
    switch(type) {
      case 'gold': return <Coins size={16} className="text-amber-400" />;
      case 'jade': return <div className="w-4 h-4 rounded-full bg-emerald-400 border border-emerald-200 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />;
      case 'premiumTickets': return <Ticket size={16} className="text-rose-400" />;
      case 'normalTickets': return <Ticket size={16} className="text-blue-400" />;
      default: return <Gift size={16} className="text-amber-500" />;
    }
  };

  const getRewardName = (type: string) => {
    switch(type) {
      case 'gold': return 'Vàng';
      case 'jade': return 'Ngọc Bích';
      case 'premiumTickets': return 'Vé Danh Tướng';
      case 'normalTickets': return 'Vé Anh Hào';
      default: return 'Quà';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in" onClick={onClose}>
      <div className="bg-stone-900 border-2 border-amber-500 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative max-h-[92vh] flex flex-col shadow-2xl overflow-y-auto custom-scrollbar" onClick={e => e.stopPropagation()}>
         <button onClick={onClose} className="absolute top-4 right-4 text-amber-500 hover:text-amber-300 transition-colors p-1">
            <XCircle size={28} />
         </button>
         
         <h2 className="text-2xl md:text-3xl font-cinzel font-black text-amber-400 text-center mb-2 uppercase tracking-widest flex items-center justify-center gap-2">
            <Target className="text-amber-500" size={32} /> Nhiệm Vụ Hàng Ngày
         </h2>
         <p className="text-center text-stone-400 text-sm mb-6">Hoàn thành nhiệm vụ mỗi ngày để nhận vô số phần thưởng hấp dẫn!</p>
         
         <div className="flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
           {DAILY_QUESTS.map(quest => {
             const currentProgress = progress[quest.id] || 0;
             const isCompleted = currentProgress >= quest.target;
             const isClaimed = claimed.includes(quest.id);

             return (
               <div key={quest.id} className={`p-4 rounded-2xl border-2 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all ${isClaimed ? 'bg-stone-950/80 border-stone-800 opacity-60' : isCompleted ? 'bg-amber-950/40 border-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]' : 'bg-stone-800 border-stone-700'}`}>
                 <div className="flex-1 text-center sm:text-left w-full">
                   <h3 className={`font-bold text-lg ${isCompleted && !isClaimed ? 'text-amber-400' : 'text-stone-200'}`}>
                     {quest.desc}
                   </h3>
                   <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                     <div className="flex items-center gap-1.5 bg-stone-900 px-3 py-1 rounded-lg border border-stone-700">
                       <span className="text-stone-400 text-xs font-bold uppercase">Tiến độ:</span>
                       <span className={`text-sm font-black ${isCompleted ? 'text-emerald-400' : 'text-amber-500'}`}>
                         {Math.min(currentProgress, quest.target)} / {quest.target}
                       </span>
                     </div>
                     <div className="flex items-center gap-1.5 bg-stone-900 px-3 py-1 rounded-lg border border-stone-700">
                       <span className="text-stone-400 text-xs font-bold uppercase">Thưởng:</span>
                       <span className="text-sm font-black text-white flex items-center gap-1">
                         {quest.rewardAmount} {renderRewardIcon(quest.rewardType)} {getRewardName(quest.rewardType)}
                       </span>
                     </div>
                   </div>
                 </div>

                 <div className="flex-shrink-0 w-full sm:w-auto">
                   {isClaimed ? (
                     <button disabled className="w-full sm:w-auto bg-stone-800 text-stone-500 font-bold px-6 py-2.5 rounded-xl border border-stone-700 flex items-center justify-center gap-2 cursor-not-allowed">
                       <CheckCircle size={18} /> Đã Nhận
                     </button>
                   ) : isCompleted ? (
                     <button 
                       onClick={() => handleClaim(quest.id, quest.rewardType, quest.rewardAmount)}
                       className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-black px-6 py-2.5 rounded-xl border-2 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center gap-2 transition-transform active:scale-95 animate-pulse"
                     >
                       <Gift size={18} /> Nhận Quà
                     </button>
                   ) : (
                     <button disabled className="w-full sm:w-auto bg-stone-800 text-stone-400 font-bold px-6 py-2.5 rounded-xl border border-stone-600 flex items-center justify-center gap-2 cursor-not-allowed">
                       Chưa Hoàn Thành
                     </button>
                   )}
                 </div>
               </div>
             );
           })}
         </div>
      </div>
    </div>
  );
};
