import React, { useState } from 'react';
import { PlayerState, Hero } from './types';
import { HERO_TRIAL_STAGES, generateTrialEnemies, HeroTrialStage } from './heroTrialData';
import { ChevronLeft, Swords, Star, Lock, Map as MapIcon, X } from 'lucide-react';

interface HeroTrialViewProps {
  playerState: PlayerState;
  onBack: () => void;
  onStartCombat: (stageId: number, enemies: Hero[]) => void;
}

export const HeroTrialView: React.FC<HeroTrialViewProps> = ({ playerState, onBack, onStartCombat }) => {
  const [selectedStage, setSelectedStage] = useState<HeroTrialStage | null>(null);
  
  const progress = playerState.heroTrialProgress || 0;

  const handleStart = () => {
    if (!selectedStage) return;
    
    // Check if player has permanent lineup configured
    const hasPermHeroes = playerState.permLineup && playerState.permLineup.some(id => id !== null);
    if (!hasPermHeroes) {
      alert("Bệ hạ chưa trang bị Tướng vĩnh viễn nào vào Đội hình Quân đoàn để tham gia Quá Ải! Hãy vào Danh Trại -> Xếp đội hình.");
      return;
    }
    
    const enemies = generateTrialEnemies(selectedStage.id);
    onStartCombat(selectedStage.id, enemies);
  };

  return (
    <div className="absolute inset-0 bg-stone-900 overflow-hidden flex flex-col font-sans">
      {/* Header */}
      <div className="h-16 bg-gradient-to-r from-amber-950 to-stone-900 border-b border-amber-900/50 flex items-center px-4 shrink-0 shadow-md z-20">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full text-amber-200 transition-colors">
          <ChevronLeft size={28} />
        </button>
        <h1 className="ml-2 text-2xl font-cinzel text-amber-400 font-black tracking-widest drop-shadow-md flex items-center gap-2">
          <Swords className="text-red-500 animate-pulse" /> ANH HÙNG QUÁ ẢI
        </h1>
        <div className="ml-auto text-amber-200 text-sm font-bold flex items-center gap-2 bg-black/30 px-4 py-1.5 rounded-full border border-amber-700/30 shadow-inner">
          <MapIcon size={16} className="text-amber-500" /> Tiến độ: Ải {progress}/20
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 overflow-y-auto custom-scrollbar relative p-8 map-bg">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/aged-paper.png')] opacity-10 mix-blend-overlay pointer-events-none"></div>
         
         <div className="max-w-4xl mx-auto relative pb-32 mt-10">
            {/* The Path Line (Background) */}
            <div className="absolute top-0 bottom-0 left-1/2 w-3 bg-gradient-to-b from-amber-900/40 via-red-900/30 to-transparent transform -translate-x-1/2 rounded-full blur-[2px]"></div>
            
            {HERO_TRIAL_STAGES.map((stage, idx) => {
              const isUnlocked = stage.id <= progress + 1;
              const isCompleted = stage.id <= progress;
              
              // Alternating layout for path effect
              const alignment = idx % 2 === 0 ? 'flex-row' : 'flex-row-reverse';
              
              return (
                <div key={stage.id} className={`w-full flex ${alignment} justify-center items-center my-16 relative z-10 group`}>
                   
                   {/* Info side */}
                   <div className={`w-5/12 ${idx % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'} transition-all duration-500 ${isUnlocked ? 'opacity-100 translate-y-0' : 'opacity-40 translate-y-4'}`}>
                      <h3 className={`text-2xl font-cinzel font-black drop-shadow-md ${isUnlocked ? 'text-amber-400 group-hover:text-amber-300' : 'text-stone-500'}`}>{stage.name}</h3>
                      <p className={`text-sm font-bold uppercase tracking-widest mt-1 ${isUnlocked ? 'text-red-400/90' : 'text-stone-600'}`}>{stage.year}</p>
                      
                      {isCompleted && (
                        <div className={`mt-2 text-[10px] uppercase font-black bg-amber-900/40 text-amber-500 inline-block px-2 py-0.5 rounded border border-amber-700/30`}>
                           Đã Vượt Qua
                        </div>
                      )}
                   </div>
                   
                   {/* Node */}
                   <div className="w-2/12 flex justify-center relative">
                      {/* Connecting dots visual */}
                      <div className={`absolute top-1/2 -translate-y-1/2 w-12 h-0.5 ${idx % 2 === 0 ? 'right-full' : 'left-full'} ${isUnlocked ? 'bg-amber-700/50' : 'bg-stone-800/50'}`}></div>

                      <button 
                        onClick={() => isUnlocked && setSelectedStage(stage)}
                        className={`w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-300 relative z-10
                          ${isCompleted ? 'bg-gradient-to-br from-amber-700 to-amber-900 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.5)] hover:scale-110' : 
                            (isUnlocked ? 'bg-gradient-to-br from-red-800 to-red-950 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] animate-pulse hover:scale-110' : 
                                          'bg-stone-800 border-stone-700 opacity-80 cursor-not-allowed')}
                        `}
                      >
                        {isCompleted ? <Star className="text-amber-200 fill-amber-200 drop-shadow-md" size={32} /> : 
                          (isUnlocked ? <Swords className="text-red-100 drop-shadow-md" size={32} /> : <Lock className="text-stone-600" size={32} />)}
                        
                        <div className={`absolute -bottom-3 text-[10px] font-black px-2 py-0.5 rounded border ${isUnlocked ? 'bg-stone-900 text-amber-400 border-amber-700/50' : 'bg-stone-900 text-stone-500 border-stone-800'}`}>
                           Ải {stage.id}
                        </div>
                      </button>
                      
                      {isUnlocked && !isCompleted && (
                         <div className="absolute -top-6 whitespace-nowrap bg-red-600 text-white text-xs font-black px-3 py-1 rounded shadow-[0_0_10px_rgba(220,38,38,0.8)] border border-red-400 animate-bounce">
                           Mới
                         </div>
                      )}
                   </div>
                   
                   {/* Empty side for balance */}
                   <div className="w-5/12"></div>
                </div>
              );
            })}
         </div>
      </div>

      {/* Stage Detail Modal */}
      {selectedStage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4 backdrop-blur-md animate-in fade-in duration-200">
           <div className="bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-700/60 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,0,0,0.8)]">
              <button onClick={() => setSelectedStage(null)} className="absolute top-5 right-5 text-stone-400 hover:text-white transition-colors bg-stone-800/80 hover:bg-red-900/80 rounded-full p-2 border border-stone-700 hover:border-red-500/50">
                 <X size={24} />
              </button>
              
              <div className="text-center mb-8">
                 <div className="inline-block px-4 py-1 rounded-full bg-stone-800 border border-stone-700 text-amber-500 font-black text-sm tracking-widest mb-3">
                    ẢI {selectedStage.id}
                 </div>
                 <h2 className="text-4xl font-cinzel text-amber-400 font-black uppercase mb-2 drop-shadow-md">{selectedStage.name}</h2>
                 <p className="text-red-400 font-bold tracking-widest text-lg">{selectedStage.year}</p>
                 <div className="mt-5 bg-stone-900/80 border border-stone-700 p-5 rounded-2xl text-stone-300 text-base leading-relaxed text-justify italic shadow-inner">
                    "{selectedStage.context}"
                 </div>
              </div>
              
              <div className="mb-8">
                 <div className="flex justify-between items-end mb-5 border-b border-stone-800 pb-3">
                    <h3 className="text-2xl font-cinzel text-red-500 font-black flex items-center gap-3">
                      <Swords size={24} className="text-red-600" /> Tướng Lĩnh Phe Địch
                    </h3>
                    <div className="text-amber-400 font-black text-sm uppercase flex items-center gap-2 bg-amber-950/40 px-4 py-2 rounded-xl border border-amber-700/50 shadow-inner">
                       Lực chiến đề xuất: <span className="text-lg text-amber-300">{selectedStage.recommendedPower.toLocaleString('vi-VN')}</span>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {selectedStage.enemiesRaw.map((enemy, idx) => (
                       <div key={idx} className={`bg-stone-900 border ${idx === 0 ? 'border-yellow-700/50 bg-gradient-to-br from-stone-900 to-yellow-950/20' : 'border-stone-800'} rounded-2xl p-4 flex items-center gap-4 relative overflow-hidden group hover:border-red-900/50 transition-colors shadow-md`}>
                          <div className={`absolute top-0 right-0 w-10 h-10 flex items-center justify-center font-black text-sm opacity-20 ${idx === 0 ? 'text-yellow-500 text-xl opacity-40' : 'text-stone-500'}`}>
                             {idx === 0 ? 'BOSS' : idx + 1}
                          </div>
                          <div className={`w-16 h-16 rounded-full border-2 overflow-hidden shrink-0 shadow-inner flex-shrink-0 ${idx === 0 ? 'border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]' : 'border-stone-600'}`}>
                             <div className="w-full h-full bg-stone-800 flex items-center justify-center text-xs text-stone-500 font-bold uppercase text-center leading-tight">Mặc<br/>Định</div>
                          </div>
                          <div className="z-10 relative">
                             <div className={`font-bold text-base leading-tight mb-1 ${idx === 0 ? 'text-yellow-400' : 'text-red-300'}`}>{enemy.name}</div>
                             <div className="text-amber-600/90 text-[10px] uppercase font-black tracking-wider mb-1.5">{enemy.title}</div>
                             <div className="text-stone-400 text-[11px] leading-tight line-clamp-2">{enemy.desc}</div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
              
              <div className="flex justify-center mt-10">
                 <button 
                   onClick={handleStart}
                   className="bg-gradient-to-r from-red-800 via-red-600 to-red-800 hover:from-red-700 hover:via-red-500 hover:to-red-700 text-white font-cinzel font-black text-2xl px-16 py-5 rounded-2xl shadow-[0_0_30px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_rgba(220,38,38,0.7)] hover:-translate-y-1 transition-all border-2 border-red-400/40 relative overflow-hidden group"
                 >
                   <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                   <span className="relative z-10 flex items-center gap-3">
                      ⚔ KHIÊU CHIẾN ⚔
                   </span>
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
