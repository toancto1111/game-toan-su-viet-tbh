import React, { useState, useRef, useCallback, useEffect } from 'react';
import { PlayerState, Hero } from './types';
import { HERO_TRIAL_STAGES, generateTrialEnemies, HeroTrialStage } from './heroTrialData';
import { ChevronLeft, Swords, Star, Lock, Map as MapIcon, X, Box } from 'lucide-react';
import Hero3DDemo from './Hero3DDemo';

// ─── EnemyCard với hiệu ứng 3D tilt, aura glow, particle ───────────────────
interface EnemyCardProps {
   name: string;
   title: string;
   desc: string;
   isBoss: boolean;
   index: number;
}

const EnemyCard: React.FC<EnemyCardProps> = ({ name, title, desc, isBoss, index }) => {
   const cardRef = useRef<HTMLDivElement>(null);
   const particlesRef = useRef<HTMLDivElement>(null);
   const [isHovered, setIsHovered] = useState(false);

   // Màu aura theo Boss hay lính thường
   const auraColor = isBoss
      ? 'rgba(234,179,8,0.7)'   // vàng boss
      : 'rgba(239,68,68,0.45)'; // đỏ lính
   const auraColorMid = isBoss ? 'rgba(234,179,8,0.2)' : 'rgba(239,68,68,0.12)';

   // 3D tilt theo vị trí chuột
   const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);   // -1 → +1
      const dy = (e.clientY - cy) / (rect.height / 2);  // -1 → +1
      const rotY = dx * 16;   // độ nghiêng trái/phải
      const rotX = -dy * 12;  // độ nghiêng trên/dưới
      // shine layer di chuyển ngược chiều chuột
      const shineX = 50 + dx * 30;
      const shineY = 50 + dy * 30;
      card.style.transform = `perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.06)`;
      card.style.setProperty('--shine-x', `${shineX}%`);
      card.style.setProperty('--shine-y', `${shineY}%`);
   }, []);

   const handleMouseLeave = useCallback(() => {
      const card = cardRef.current;
      if (!card) return;
      setIsHovered(false);
      card.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
   }, []);

   const handleMouseEnter = useCallback(() => setIsHovered(true), []);

   // Particle system cho Boss (interval spawn)
   useEffect(() => {
      if (!isBoss || !particlesRef.current) return;
      const container = particlesRef.current;

      const spawnParticle = () => {
         const p = document.createElement('div');
         const size = 3 + Math.random() * 4;
         const left = 10 + Math.random() * 80;
         const duration = 1.4 + Math.random() * 1.2;
         const delay = Math.random() * 0.3;
         // Boss particles: vàng/cam
         const colors = ['#fbbf24', '#f59e0b', '#fb923c', '#fde68a'];
         const color = colors[Math.floor(Math.random() * colors.length)];

         p.style.cssText = `
        position:absolute; bottom:0; left:${left}%;
        width:${size}px; height:${size}px;
        border-radius:50%; background:${color};
        pointer-events:none; z-index:20;
        opacity:0.85;
        animation: particleFloatUp ${duration}s ease-out ${delay}s forwards;
      `;
         container.appendChild(p);
         setTimeout(() => p.remove(), (duration + delay) * 1000 + 100);
      };

      const interval = setInterval(spawnParticle, 280);
      return () => clearInterval(interval);
   }, [isBoss]);

   const entranceDelay = `${index * 80}ms`;

   return (
      <div
         style={{ animationDelay: entranceDelay }}
         className="animate-cardEntrance"
      >
         <style>{`
        @keyframes particleFloatUp {
          0%   { transform: translateY(0) scale(1);    opacity: 0.85; }
          80%  { opacity: 0.4; }
          100% { transform: translateY(-90px) scale(0); opacity: 0; }
        }
        @keyframes cardEntrance {
          0%   { opacity: 0; transform: translateY(24px) scale(0.93); }
          60%  { opacity: 1; transform: translateY(-4px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes auraBreath {
          0%,100% { opacity: 0.55; transform: scale(1); }
          50%     { opacity: 1;    transform: scale(1.06); }
        }
        @keyframes bossGoldShimmer {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        .animate-cardEntrance {
          animation: cardEntrance 0.5s cubic-bezier(0.22,1,0.36,1) both;
        }
        .enemy-card-3d {
          transition: transform 0.12s ease, box-shadow 0.12s ease;
          transform-style: preserve-3d;
          will-change: transform;
        }
        .enemy-card-shine {
          position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 10;
          background: radial-gradient(circle at var(--shine-x, 50%) var(--shine-y, 50%),
            rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 45%, transparent 70%);
          opacity: 0; transition: opacity 0.2s;
        }
        .enemy-card-3d:hover .enemy-card-shine { opacity: 1; }
      `}</style>

         <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="enemy-card-3d relative cursor-pointer"
            style={{
               borderRadius: '16px',
               background: isBoss
                  ? 'linear-gradient(135deg, #1c1400 0%, #2d1f00 50%, #1a1000 100%)'
                  : 'linear-gradient(135deg, #0f0505 0%, #1a0a0a 100%)',
               border: isBoss ? '1.5px solid rgba(234,179,8,0.6)' : '1px solid rgba(120,40,40,0.5)',
               boxShadow: isHovered
                  ? `0 0 28px ${auraColor}, 0 0 60px ${auraColorMid}, 0 12px 32px rgba(0,0,0,0.7)`
                  : isBoss
                     ? `0 0 16px rgba(234,179,8,0.35), 0 0 40px rgba(234,179,8,0.12), 0 4px 16px rgba(0,0,0,0.6)`
                     : `0 0 10px rgba(239,68,68,0.2), 0 4px 12px rgba(0,0,0,0.5)`,
               padding: '16px',
               overflow: 'visible',
            }}
         >
            {/* Particle container (Boss only) */}
            {isBoss && (
               <div
                  ref={particlesRef}
                  style={{
                     position: 'absolute', inset: 0, overflow: 'hidden',
                     borderRadius: '16px', pointerEvents: 'none', zIndex: 20,
                  }}
               />
            )}

            {/* Shine overlay */}
            <div className="enemy-card-shine" />

            {/* Aura glow halo (luôn hiện, nhấp nháy) */}
            <div style={{
               position: 'absolute', inset: '-4px', borderRadius: '20px',
               background: `radial-gradient(ellipse at center, ${auraColor} 0%, ${auraColorMid} 40%, transparent 75%)`,
               pointerEvents: 'none', zIndex: -1,
               animation: 'auraBreath 2.4s ease-in-out infinite',
               animationDelay: `${index * 300}ms`,
            }} />

            {/* Boss badge */}
            {isBoss && (
               <div style={{
                  position: 'absolute', top: '-10px', right: '-6px',
                  background: 'linear-gradient(90deg, #b45309, #fbbf24, #b45309)',
                  backgroundSize: '200% auto',
                  animation: 'bossGoldShimmer 2.5s linear infinite',
                  color: '#1c1000', fontWeight: 900, fontSize: '9px',
                  letterSpacing: '1px', padding: '3px 8px', borderRadius: '8px',
                  border: '1px solid rgba(234,179,8,0.8)', zIndex: 30,
               }}>
                  ★ BOSS ★
               </div>
            )}

            {/* Index badge (lính thường) */}
            {!isBoss && (
               <div style={{
                  position: 'absolute', top: '-8px', left: '-6px',
                  background: '#1a0505', color: '#6b7280', fontWeight: 900,
                  fontSize: '9px', padding: '2px 7px', borderRadius: '8px',
                  border: '1px solid rgba(75,85,99,0.4)', zIndex: 30,
               }}>
                  #{index + 1}
               </div>
            )}

            {/* Avatar circle */}
            <div style={{
               width: '56px', height: '56px', borderRadius: '50%', flexShrink: 0,
               border: isBoss ? '2px solid rgba(234,179,8,0.7)' : '2px solid rgba(120,40,40,0.6)',
               background: isBoss
                  ? 'radial-gradient(circle, #2d1f00 0%, #0f0a00 100%)'
                  : 'radial-gradient(circle, #1a0808 0%, #0a0202 100%)',
               display: 'flex', alignItems: 'center', justifyContent: 'center',
               boxShadow: isBoss ? '0 0 12px rgba(234,179,8,0.4) inset' : '0 0 8px rgba(120,20,20,0.4) inset',
               fontSize: '20px',
            }}>
               {isBoss ? '👑' : '⚔️'}
            </div>

            {/* Text info */}
            <div style={{ marginTop: '10px' }}>
               <div style={{
                  fontWeight: 800, fontSize: '13px', lineHeight: 1.2, marginBottom: '4px',
                  color: isBoss ? '#fbbf24' : '#fca5a5',
                  ...(isBoss ? {
                     background: 'linear-gradient(90deg, #fbbf24, #fb923c, #fbbf24)',
                     backgroundSize: '200% auto',
                     WebkitBackgroundClip: 'text',
                     WebkitTextFillColor: 'transparent',
                     animation: 'bossGoldShimmer 3s linear infinite',
                  } : {}),
               }}>
                  {name}
               </div>
               <div style={{
                  color: isBoss ? '#d97706' : '#9ca3af',
                  fontSize: '9px', fontWeight: 800, textTransform: 'uppercase',
                  letterSpacing: '0.8px', marginBottom: '5px',
               }}>
                  {title}
               </div>
               <div style={{
                  color: '#6b7280', fontSize: '10px', lineHeight: 1.45,
                  display: '-webkit-box', WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical', overflow: 'hidden',
               }}>
                  {desc}
               </div>
            </div>
         </div>
      </div>
   );
};

// ─────────────────────────────────────────────────────────────────────────────

interface HeroTrialViewProps {
   playerState: PlayerState;
   onBack: () => void;
   onStartCombat: (stageId: number, enemies: Hero[]) => void;
}

export const HeroTrialView: React.FC<HeroTrialViewProps> = ({ playerState, onBack, onStartCombat }) => {
   const [selectedStage, setSelectedStage] = useState<HeroTrialStage | null>(null);
   const [show3D, setShow3D] = useState(false);

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
      <div className="fixed inset-0 bg-stone-900 overflow-hidden flex flex-col font-sans z-50">
         {/* Header */}
         <div className="h-16 bg-gradient-to-r from-amber-950 to-stone-900 border-b border-amber-900/50 flex items-center px-4 shrink-0 shadow-md z-20">
            <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full text-amber-200 transition-colors">
               <ChevronLeft size={28} />
            </button>
            <h1 className="ml-2 text-2xl font-cinzel text-amber-400 font-black tracking-widest drop-shadow-md flex items-center gap-2">
               <Swords className="text-red-500 animate-pulse" /> ANH HÙNG QUÁ ẢI
            </h1>
            <div className="ml-auto flex items-center gap-3">
               {/* <button 
                  onClick={() => setShow3D(true)}
                  className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 px-4 py-1.5 rounded-full border border-amber-400/50 text-white font-bold text-sm shadow-[0_0_10px_rgba(245,158,11,0.3)] transition-all active:scale-95"
               >
                  <Box size={16} /> DEMO 3D
               </button> */}
               <div className="text-amber-200 text-sm font-bold flex items-center gap-2 bg-black/30 px-4 py-1.5 rounded-full border border-amber-700/30 shadow-inner">
                  <MapIcon size={16} className="text-amber-500" /> Tiến độ: Ải {progress}/20
               </div>
            </div>
         </div>

         {/* Global styles cho map node hover */}
         <style>{`
        @keyframes nodeRingPulse {
          0%   { transform: scale(1);    opacity: 0.6; }
          60%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        .map-node-btn { position: relative; }
        .map-node-btn::after {
          content: ''; position: absolute; inset: -6px;
          border-radius: 50%; border: 2px solid currentColor;
          opacity: 0; transform: scale(1);
          transition: opacity 0.15s;
          pointer-events: none;
        }
        .map-node-btn:hover::after {
          animation: nodeRingPulse 0.7s ease-out forwards;
        }
      `}</style>

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
                              className={`map-node-btn w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-300 relative z-10
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
            <div
               className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md"
               style={{
                  background: 'rgba(0,0,0,0.88)',
                  animation: 'modalFadeIn 0.25s ease both',
               }}
            >
               <style>{`
            @keyframes modalFadeIn {
              from { opacity: 0; }
              to   { opacity: 1; }
            }
            @keyframes modalSlideUp {
              from { opacity: 0; transform: translateY(32px) scale(0.97); }
              to   { opacity: 1; transform: translateY(0) scale(1); }
            }
          `}</style>
               <div
                  className="bg-gradient-to-b from-stone-900 to-stone-950 border-2 border-amber-700/60 rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                  style={{ animation: 'modalSlideUp 0.35s cubic-bezier(0.22,1,0.36,1) both' }}
               >
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
                           <EnemyCard
                              key={idx}
                              name={enemy.name}
                              title={enemy.title}
                              desc={enemy.desc}
                              isBoss={idx === 0}
                              index={idx}
                           />
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

         {show3D && <Hero3DDemo onClose={() => setShow3D(false)} />}
      </div>
   );
};
