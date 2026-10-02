import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PlayerState, LeaderboardEntry, Hero } from './types';
import { ChevronLeft, Swords, Trophy, Shield, Star, Users, Zap, Skull, User, Search, Crown } from 'lucide-react';
import { getArenaOpponents, swapArenaRanks, updateArenaDefenseFormation, getTopArenaPlayers } from './firebaseService';
import { calculateHeroStatsWithStar } from './App';

interface ArenaViewProps {
  playerData: PlayerState;
  setPlayerData: (data: PlayerState) => void;
  setView: (view: any) => void;
  saveData: (newData: PlayerState) => void;
  initArenaCombat?: (myLineup: any[], enemyLineup: any[], matchData: any) => void;
}

type ArenaScreen = 'LOBBY' | 'SELECT_DEFENSE' | 'SELECT_ATTACK' | 'COMBAT';

export const ArenaView: React.FC<ArenaViewProps> = ({ playerData, setPlayerData, setView, saveData, initArenaCombat }) => {
  const [screen, setScreen] = useState<ArenaScreen>('LOBBY');
  const [opponents, setOpponents] = useState<LeaderboardEntry[]>([]);
  const [topPlayers, setTopPlayers] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState<LeaderboardEntry | null>(null);
  const [attackFormation, setAttackFormation] = useState<(string | null)[]>([]);
  const [selectedHeroPreview, setSelectedHeroPreview] = useState<any>(null);
  const [inspectTarget, setInspectTarget] = useState<LeaderboardEntry | null>(null);
  
  // Mặc định người mới xếp hạng 10000
  const currentRank = playerData.arenaRank || 10000;
  
  const getRankInfo = (rank: number) => {
    if (rank <= 10) return { name: 'Thách Đấu', color: 'text-red-500', bg: 'bg-red-500/20' };
    if (rank <= 100) return { name: 'Bá Vương', color: 'text-amber-500', bg: 'bg-amber-500/20' };
    if (rank <= 500) return { name: 'Kim Cương', color: 'text-cyan-400', bg: 'bg-cyan-400/20' };
    if (rank <= 1000) return { name: 'Bạch Kim', color: 'text-emerald-400', bg: 'bg-emerald-400/20' };
    if (rank <= 5000) return { name: 'Vàng', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
    if (rank <= 9000) return { name: 'Bạc', color: 'text-slate-300', bg: 'bg-slate-300/20' };
    return { name: 'Đồng', color: 'text-amber-700', bg: 'bg-amber-700/20' };
  };
  const rankInfo = getRankInfo(currentRank);

  useEffect(() => {
    getTopArenaPlayers().then(setTopPlayers);
  }, []);
  const fetchOpponents = async () => {
    setLoading(true);
    const ops = await getArenaOpponents(currentRank, playerData.username || 'guest');
    setOpponents(ops);
    setLoading(false);
  };

  useEffect(() => {
    if (screen === 'LOBBY' && opponents.length === 0) {
      fetchOpponents();
    }
  }, [screen]);

  // Handle Defense Selection
  const handleSaveDefense = (formation: (string | null)[]) => {
    const newData = { ...playerData, arenaDefenseFormation: formation };
    setPlayerData(newData);
    saveData(newData);
    
    // Convert to full hero objects for Firebase Leaderboard sync
    const fullFormation = formation.map(id => {
      if (!id) return null;
      const rawHero = playerData.inventory.find(hero => hero.id === id);
      if (!rawHero) return null;
      const h = calculateHeroStatsWithStar(rawHero, rawHero.star || 1);
      return {
        id: h.id,
        name: h.name,
        image: h.image,
        star: h.star,
        rarity: h.rarity,
        overall: h.overall,
        atk: h.atk,
        def: h.def,
        maxHp: h.maxHp || h.hp || 1,
        hp: h.maxHp || h.hp || 1,
        spd: h.spd,
        skillEffect: h.skillEffect || null
      };
    });
    
    // Sanitize to remove any undefined fields before saving to Firestore
    const sanitizedFormation = JSON.parse(JSON.stringify(fullFormation));
    
    updateArenaDefenseFormation(playerData.username || 'guest', playerData.playerName || playerData.username || 'Khuyết Danh', sanitizedFormation, currentRank);
    
    setScreen('LOBBY');
  };

  if (screen === 'LOBBY') {
    return (
      <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center p-6 overflow-y-auto">
        <div className="w-full max-w-5xl flex justify-between items-center mb-8 mt-4">
          <button 
            onClick={() => setView('chapter-hub')} 
            className="text-slate-400 hover:text-red-400 flex items-center gap-2 transition-colors border border-slate-700 hover:border-red-500/50 px-4 py-2 rounded-lg"
          >
            <ChevronLeft /> Rút lui
          </button>
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-cinzel text-red-500 font-bold uppercase tracking-widest drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] flex items-center justify-center gap-3">
              <Swords /> Đấu Trường <Swords />
            </h1>
            <p className="text-slate-400 text-sm mt-1">So tài đội hình - Tranh đoạt ngôi vương</p>
          </div>
          <div className="w-[100px]"></div>
        </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-8">
        {/* Main Content Area */}
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
          
          {/* Cột Trái (Chính) */}
          <div className="flex-1 flex flex-col w-full">
            {/* Player Stats */}
            <div className="w-full bg-slate-900 border border-slate-700 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 shadow-xl">
              <div className="flex items-center gap-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${rankInfo.bg} border-4 border-slate-800 shrink-0`}>
                  <Trophy size={48} className={rankInfo.color} />
                </div>
                <div>
                  <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Xếp hạng hiện tại</div>
                  <div className={`text-4xl font-black ${rankInfo.color} font-cinzel leading-tight`}>{rankInfo.name}</div>
                  <div className="text-xl font-bold text-white mt-1">Top {currentRank} <span className="text-slate-400 text-base font-normal">Đấu Trường</span></div>
                </div>
              </div>
              
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <button 
                  onClick={() => setScreen('SELECT_DEFENSE')}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2 border border-slate-600 transition-colors"
                >
                  <Shield size={20} className="text-blue-400" />
                  Đội hình Phòng thủ
                </button>
                <button 
                  onClick={() => setScreen('SELECT_ATTACK_LOBBY')}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2 border border-slate-600 transition-colors"
                >
                  <Swords size={20} className="text-red-400" />
                  Đội hình Tấn công
                </button>
                <button 
                  onClick={fetchOpponents}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center justify-center gap-2 border border-slate-600 transition-colors"
                >
                  <Zap size={20} className="text-yellow-400" />
                  Tìm đối thủ mới
                </button>
              </div>
            </div>

            {/* Opponents List */}
            <div className="w-full">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <Users className="text-red-400" /> Danh sách Thách Đấu
              </h2>
              
              {loading ? (
                <div className="text-center text-slate-400 py-12">Đang dò tìm đối thủ...</div>
              ) : opponents.length === 0 ? (
                <div className="text-center text-slate-400 py-12">Không tìm thấy đối thủ phù hợp. Hãy thử lại sau.</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {opponents.map((op, idx) => {
                    const opRankNum = op.arenaRank || 10000;
                    const opRank = getRankInfo(opRankNum);
                    return (
                      <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-red-500/50 transition-colors flex flex-col items-center relative overflow-hidden group">
                        {/* Rank Badge */}
                        <div className="absolute top-2 right-2 bg-slate-800 border border-slate-600 px-2 py-1 rounded text-xs font-bold text-white shadow-lg z-20">
                          Hạng {opRankNum}
                        </div>
                        
                        <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 overflow-hidden mb-3 mt-2 cursor-pointer hover:border-amber-500 transition-colors shadow-md z-20"
                             onClick={() => setInspectTarget(op)}>
                          <img src={op.avatarUrl || "https://i.imgur.com/kS5lW6H.png"} alt="avatar" className="w-full h-full object-cover" />
                        </div>
                        <div className="font-bold text-lg text-white text-center cursor-pointer hover:text-amber-400 transition-colors z-20"
                             onClick={() => setInspectTarget(op)}>
                          {op.playerName || op.uid}
                        </div>
                        <div className={`text-sm font-semibold ${opRank.color} mb-4 z-20`}>{opRank.name}</div>
                        
                        {/* Defense preview */}
                        <div className="flex justify-center gap-1 mb-6 w-full flex-wrap z-20">
                          {op.arenaDefenseFormation?.slice(0, 6).map((hero, i) => (
                            <div key={i} 
                                 className="w-10 h-10 bg-slate-800 rounded border border-slate-700 overflow-hidden flex-shrink-0 cursor-pointer hover:border-amber-500 hover:scale-110 transition-all relative group/hero"
                                 onClick={() => { if (hero) setSelectedHeroPreview(hero); }}>
                              {hero ? (
                                <>
                                  <img src={hero.image} alt="hero" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/hero:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                                    <Search size={14} className="text-white" />
                                  </div>
                                </>
                              ) : (
                                <div className="w-full h-full flex items-center justify-center opacity-30"><User size={20} className="text-slate-400" /></div>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <div className="w-full z-20">
                          <button 
                            onClick={() => setInspectTarget(op)}
                            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-stone-300 rounded-lg font-bold flex justify-center items-center gap-2 border border-slate-700 transition-all text-sm mb-2"
                          >
                            <Search size={16} /> SOI ĐỘI HÌNH
                          </button>
                          <button 
                            onClick={() => { setSelectedOpponent(op); setScreen('SELECT_ATTACK'); }}
                            className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all"
                          >
                            <Swords size={18} /> THÁCH ĐẤU
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Cột Phải (Sidebar) - Bảng Vàng */}
          <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col gap-6">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
              <div className="bg-gradient-to-r from-amber-600 to-amber-800 p-4 border-b border-amber-900">
                <h3 className="text-lg font-cinzel font-black text-white uppercase flex items-center gap-2 drop-shadow-md">
                  <Crown size={20} className="text-yellow-300" /> Bảng Vàng
                </h3>
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1 min-h-[300px]">
                {topPlayers.map((p, i) => (
                  <div key={i} 
                       className="flex items-center gap-3 bg-slate-950/50 p-2 rounded-lg border border-slate-800 hover:border-amber-500/30 transition-colors cursor-pointer"
                       onClick={() => setInspectTarget(p)}>
                    <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 font-black text-amber-500 flex items-center justify-center text-sm shrink-0 shadow-inner">
                      {i + 1}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-amber-600/50 overflow-hidden shrink-0 bg-slate-800">
                      <img src={p.avatarUrl || "https://i.imgur.com/kS5lW6H.png"} alt="avt" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-stone-200 truncate">{p.playerName}</div>
                      <div className="text-[10px] text-amber-400 font-bold">Lực: {(p.combatPower || 0).toLocaleString()}</div>
                    </div>
                  </div>
                ))}
                
                {topPlayers.length === 0 && (
                  <div className="text-center text-slate-500 text-sm py-4 h-full flex items-center justify-center">Đang tải...</div>
                )}
              </div>
              <div className="bg-slate-950 p-4 border-t border-slate-800 text-center">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Thứ Hạng Của Bạn</div>
                <div className="text-xl font-black text-amber-500 font-cinzel">HẠNG {currentRank}</div>
              </div>
            </div>
          </div>

        </div>

          {/* Hero Preview Modal */}
          {selectedHeroPreview && (
            <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedHeroPreview(null)}>
              <div className="bg-slate-900 border-2 border-slate-700 rounded-2xl max-w-sm w-full p-6 relative overflow-hidden animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                <div className="absolute top-0 right-0 p-4 z-10">
                  <button onClick={() => setSelectedHeroPreview(null)} className="text-slate-400 hover:text-white transition-colors bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center">✕</button>
                </div>
                <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full border-2 border-amber-500 overflow-hidden mb-4 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <img src={selectedHeroPreview.image} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-center text-amber-500 font-cinzel mb-1">{selectedHeroPreview.name}</h3>
                <div className="flex items-center justify-center gap-1.5 mb-4 bg-amber-950/40 w-fit mx-auto px-4 py-1.5 rounded-full border border-amber-500/30">
                  <Star size={18} className="text-yellow-400 fill-yellow-400" />
                  <span className="text-amber-400 font-bold">{selectedHeroPreview.star || 1} Sao</span>
                </div>
                
                <div className="space-y-3 bg-slate-950/50 p-4 rounded-xl border border-slate-800/80">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm flex items-center gap-1"><Shield size={14} className="text-green-400"/> Sinh lực</span>
                    <span className="text-green-400 font-bold">{selectedHeroPreview.hp || selectedHeroPreview.maxHp || '???'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm flex items-center gap-1"><Swords size={14} className="text-red-400"/> Tấn công</span>
                    <span className="text-red-400 font-bold">{selectedHeroPreview.atk || '???'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm flex items-center gap-1"><Shield size={14} className="text-blue-400"/> Phòng thủ</span>
                    <span className="text-blue-400 font-bold">{selectedHeroPreview.def || '???'}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400 text-sm flex items-center gap-1"><Zap size={14} className="text-purple-400"/> Tốc độ</span>
                    <span className="text-purple-400 font-bold">{selectedHeroPreview.spd || '???'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Inspect Profile Modal */}
          {inspectTarget && (
            <div 
              className="fixed inset-0 z-[90] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
              onClick={() => setInspectTarget(null)}
            >
              <div 
                className="bg-stone-900 border-2 border-amber-500/80 rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-2xl relative max-h-[90vh] flex flex-col"
                onClick={e => e.stopPropagation()}
              >
                <button 
                  onClick={() => setInspectTarget(null)}
                  className="absolute top-4 right-4 text-stone-400 hover:text-white w-8 h-8 flex items-center justify-center rounded-full bg-stone-800 border border-stone-700"
                >
                  ✕
                </button>

                {/* Header thông tin người chơi */}
                <div className="flex flex-col sm:flex-row items-center gap-4 border-b border-amber-900/50 pb-5 mb-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-amber-400 overflow-hidden bg-stone-950 shrink-0 shadow-[0_0_15px_rgba(251,191,36,0.3)]">
                    <img src={inspectTarget.avatarUrl || "https://i.imgur.com/kS5lW6H.png"} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 mb-1">
                      <h3 className="text-2xl font-cinzel font-black text-amber-300 uppercase drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                        {inspectTarget.playerName}
                      </h3>
                      <span className="bg-amber-950 text-amber-300 text-xs px-2.5 py-0.5 rounded-full border border-amber-600/40">
                        Khối {inspectTarget.grade || 6}
                      </span>
                    </div>
                    <p className="text-stone-400 text-xs mt-0.5">Quân Đoàn: <span className="text-white font-bold">{inspectTarget.playerName}</span></p>
                    <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3 text-xs font-bold bg-stone-950/50 p-2 rounded-lg border border-stone-800">
                      <span className="text-amber-400 flex items-center gap-1">⚔️ Chiến Lực: {(inspectTarget.combatPower || 0).toLocaleString()}</span>
                      <span className="text-sky-400 flex items-center gap-1">📜 Điểm Khoa Cử: {inspectTarget.knowledgeScore}</span>
                      <span className="text-purple-400 flex items-center gap-1">🏛️ Ải Thí Luyện: {inspectTarget.trialStage}</span>
                      <span className="text-emerald-400 flex items-center gap-1">⚡ Đã làm: {inspectTarget.questionsAnswered} câu</span>
                    </div>
                  </div>
                </div>

                {/* Danh sách 6 tướng trong Đội Hình */}
                <div className="flex-1 overflow-y-auto pr-1">
                  <h4 className="text-sm font-cinzel font-bold text-amber-500 uppercase tracking-wider mb-4 flex items-center justify-center gap-2">
                    <Swords size={18} /> Trận Đồ Danh Tướng Xuất Chiến ({inspectTarget.arenaDefenseFormation?.length || 0} Tướng)
                  </h4>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {(inspectTarget.arenaDefenseFormation || []).map((h: any, i: number) => (
                      <div 
                        key={i} 
                        className="bg-stone-950 rounded-xl border border-amber-900/50 p-3 flex flex-col items-center relative overflow-hidden group hover:border-amber-500 transition-colors cursor-pointer"
                        onClick={() => setSelectedHeroPreview(h)}
                      >
                        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden bg-stone-900 mb-3 relative">
                          <img src={h.image} alt={h.name} className="w-full h-full object-cover" />
                          <span className="absolute top-1 right-1 bg-black/80 text-yellow-400 text-[10px] font-black px-1.5 py-0.5 rounded border border-yellow-500/50">
                            {h.star}★
                          </span>
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                            <Search size={24} className="text-white" />
                          </div>
                        </div>
                        <div className="font-bold text-sm text-white text-center truncate w-full">{h.name}</div>
                        <div className="text-xs text-amber-500 font-black mt-1">Lực Chiến: {(h.overall || 1).toLocaleString()}</div>
                      </div>
                    ))}

                    {(!inspectTarget.arenaDefenseFormation || inspectTarget.arenaDefenseFormation.length === 0) && (
                      <p className="col-span-full text-center text-stone-500 text-sm py-12">
                        Người chơi này chưa thiết lập đầy đủ danh sách xuất chiến.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (screen === 'SELECT_DEFENSE' || screen === 'SELECT_ATTACK' || screen === 'SELECT_ATTACK_LOBBY') {
    return <ArenaTeamSelector 
      playerData={playerData}
      mode={screen === 'SELECT_DEFENSE' ? 'SELECT_DEFENSE' : 'SELECT_ATTACK'}
      onCancel={() => setScreen('LOBBY')}
      onConfirm={(formation) => {
        if (screen === 'SELECT_DEFENSE') {
          handleSaveDefense(formation);
        } else if (screen === 'SELECT_ATTACK_LOBBY') {
          const newData = { ...playerData, arenaAttackFormation: formation };
          setPlayerData(newData);
          saveData(newData);
          setScreen('LOBBY');
        } else {
          const newData = { ...playerData, arenaAttackFormation: formation };
          setPlayerData(newData);
          saveData(newData);
          const matchData = {
              opponentRank: selectedOpponent?.arenaRank || 10000,
              opponentUid: selectedOpponent?.uid,
              opponentName: selectedOpponent?.playerName
          };
          // Ưu tiên dùng CombatView chính của App nếu được truyền vào
          if (initArenaCombat) {
              const enemyLineup = selectedOpponent?.arenaDefenseFormation || [];
              const myLineup = formation
                .map(id => {
                  const raw = playerData.inventory.find((h: any) => h.id === id);
                  if (!raw) return null;
                  return calculateHeroStatsWithStar(raw, raw.star || 1);
                })
                .filter(Boolean);
              initArenaCombat(myLineup, enemyLineup, matchData);
          } else {
              // Fallback: dùng ArenaCombat nội bộ
              setAttackFormation(formation);
              setScreen('COMBAT');
          }
        }
      }}
    />
  }

  if (screen === 'COMBAT' && selectedOpponent) {
    return <ArenaCombat 
      playerData={playerData}
      attackFormation={attackFormation}
      opponent={selectedOpponent}
      onFinish={async (isWin) => {
        if (isWin) {
          const myRank = playerData.arenaRank || 10000;
          const opponentRank = selectedOpponent.arenaRank || 10000;
          if (opponentRank < myRank) {
            const newData = { ...playerData, arenaRank: opponentRank };
            setPlayerData(newData);
            saveData(newData);
            await swapArenaRanks(playerData.username || 'guest', myRank, selectedOpponent.uid, opponentRank);
          }
        }
        setScreen('LOBBY');
        // Refresh opponents so we get new ones based on new rank
        fetchOpponents();
      }}
    />
  }

  return null;
};

// ==================== TEAM SELECTOR ====================
// Tái sử dụng logic chọn tướng tương tự HeroTrialView nhưng tối giản hơn
const ArenaTeamSelector: React.FC<{
  playerData: PlayerState;
  mode: 'SELECT_DEFENSE' | 'SELECT_ATTACK';
  onCancel: () => void;
  onConfirm: (formation: (string | null)[]) => void;
}> = ({ playerData, mode, onCancel, onConfirm }) => {
  const [formation, setFormation] = useState<(string | null)[]>(() => {
    if (mode === 'SELECT_DEFENSE') {
      return playerData.arenaDefenseFormation || [null, null, null, null, null, null];
    } else {
      if (playerData.arenaAttackFormation && playerData.arenaAttackFormation.filter(Boolean).length > 0) {
        return playerData.arenaAttackFormation;
      }
      // Lấy danh sách tướng vĩnh viễn
      const permInventory = playerData.inventory.filter((h: any) => h.isPermanent);
      // Tự động sắp 6 tướng mạnh nhất (không trùng tên) nếu chưa lưu
      const uniqueTopHeroesMap = new Map();
      const sortedHeroes = [...permInventory].sort((a: any, b: any) => {
        const powerA = (a.overall || 1);
        const powerB = (b.overall || 1);
        return powerB - powerA;
      });
      sortedHeroes.forEach((h: any) => {
          if (!uniqueTopHeroesMap.has(h.name)) uniqueTopHeroesMap.set(h.name, h);
      });
      const top6Unique = Array.from(uniqueTopHeroesMap.values()).slice(0, 6);
      const newFormation = [null, null, null, null, null, null] as any[];
      top6Unique.forEach((h: any, i: number) => newFormation[i] = h.id);
      return newFormation;
    }
  });
  
  const handleSelectHero = (heroId: string) => {
    // Nếu tướng đã có trong formation, remove nó
    if (formation.includes(heroId)) {
      setFormation(prev => prev.map(id => id === heroId ? null : id));
      return;
    }
    // Ngăn chặn duplicate name
    const heroToSelect = playerData.inventory.find(h => h.id === heroId);
    if (heroToSelect) {
       const hasSameName = formation.some(id => {
          if (!id) return false;
          const h = playerData.inventory.find(x => x.id === id);
          return h && h.name === heroToSelect.name;
       });
       if (hasSameName) {
           alert("Bạn không thể chọn 2 tướng có cùng tên trong một đội hình!");
           return;
       }
    }
    // Nếu chưa có, tìm slot trống đầu tiên
    const emptySlot = formation.findIndex(id => id === null);
    if (emptySlot !== -1) {
      const newFormation = [...formation];
      newFormation[emptySlot] = heroId;
      setFormation(newFormation);
    } else {
      alert("Đội hình đã đầy 6 tướng! Hãy bỏ bớt 1 tướng trước khi thêm.");
    }
  };

  const handleRemoveHero = (index: number) => {
    const newFormation = [...formation];
    newFormation[index] = null;
    setFormation(newFormation);
  };

  const handleQuickLineup = () => {
    const permInventory = playerData.inventory.filter((h: any) => h.isPermanent);
    const uniqueTopHeroesMap = new Map();
    const sortedHeroes = [...permInventory].sort((a, b) => {
      const powerA = (a.overall || 1);
      const powerB = (b.overall || 1);
      return powerB - powerA;
    });
    sortedHeroes.forEach((h: any) => {
        if (!uniqueTopHeroesMap.has(h.name)) uniqueTopHeroesMap.set(h.name, h);
    });
    const top6Unique = Array.from(uniqueTopHeroesMap.values()).slice(0, 6);
    
    const newFormation: (string | null)[] = [null, null, null, null, null, null];
    top6Unique.forEach((h: any, i: number) => newFormation[i] = h.id);
    setFormation(newFormation);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col p-6 overflow-y-auto">
      <div className="max-w-5xl w-full mx-auto flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onCancel} className="px-4 py-2 border border-slate-700 rounded-lg text-slate-400 hover:text-white flex gap-2">
            <ChevronLeft /> Quay lại
          </button>
          <h2 className="text-2xl font-bold text-white uppercase tracking-widest font-cinzel text-center flex-1">
            {mode === 'SELECT_DEFENSE' ? 'Bố trí Đội hình Phòng thủ' : 'Bố trí Đội hình Tấn công'}
          </h2>
          <div className="flex gap-3">
            <button 
              onClick={handleQuickLineup}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold flex items-center gap-2 border border-indigo-400/50 shadow-[0_0_15px_rgba(79,70,229,0.3)] transition-all"
            >
              <Zap size={18} /> Xếp Nhanh
            </button>
            <button 
              onClick={() => onConfirm(formation)} 
              disabled={formation.every(id => id === null)}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 text-white rounded-lg font-bold border border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              Xong
            </button>
          </div>
        </div>

        {/* Selected Slots */}
        <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl mb-8 flex justify-center flex-wrap gap-4">
          {formation.map((heroId, idx) => {
            const hero = heroId ? playerData.inventory.find(h => h.id === heroId) : null;
            return (
              <div 
                key={idx} 
                onClick={() => handleRemoveHero(idx)}
                className={`w-24 h-28 rounded-xl border-2 cursor-pointer flex flex-col items-center justify-center overflow-hidden transition-all
                  ${hero ? 'border-amber-500/50 bg-slate-800 hover:border-red-500' : 'border-slate-700 border-dashed bg-slate-900/50 hover:bg-slate-800'}`}
              >
                {hero ? (
                  <img src={hero.image} alt={hero.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-600 flex flex-col items-center gap-2">
                    <User size={32} />
                    <span className="text-xs">Trống</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Inventory */}
        <div className="flex-1 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 overflow-y-auto">
          <h3 className="text-slate-400 mb-4 text-sm font-bold tracking-widest">DANH SÁCH TƯỚNG ({playerData.inventory.filter((h: any) => h.isPermanent).length})</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {playerData.inventory.filter((h: any) => h.isPermanent).map(hero => {
              const isSelected = formation.includes(hero.id);
              return (
                <div 
                  key={hero.id} 
                  onClick={() => handleSelectHero(hero.id)}
                  className={`relative cursor-pointer transition-all rounded-lg overflow-hidden border-2
                    ${isSelected ? 'border-emerald-500 opacity-60' : 'border-slate-700 hover:border-emerald-500/50 hover:scale-105'}`}
                >
                  <img src={hero.image} className="w-full aspect-square object-cover" />
                  <div className="absolute bottom-0 inset-x-0 bg-black/70 p-1 text-center">
                    <div className="text-white text-xs font-bold truncate">{hero.name}</div>
                    <div className="flex justify-center text-yellow-400">
                      {[...Array(hero.star)].map((_, i) => <Star key={i} size={8} className="fill-yellow-400" />)}
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="bg-emerald-500 text-white text-xs px-2 py-1 rounded">Đã chọn</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==================== COMBAT (AUTO-BATTLE) ====================
const ArenaCombat: React.FC<{
  playerData: PlayerState;
  attackFormation: (string | null)[];
  opponent: LeaderboardEntry;
  onFinish: (isWin: boolean) => void;
}> = ({ playerData, attackFormation, opponent, onFinish }) => {
  const [phase, setPhase] = useState<'VS' | 'FIGHT' | 'RESULT'>('VS');
  const [result, setResult] = useState<'WIN' | 'LOSE' | null>(null);

  // Tính tổng lực chiến thực tế của 2 bên
  const attackerHeroes = attackFormation.map(id => playerData.inventory.find(h => h.id === id)).filter(h => h) as Hero[];
  const myPower = attackerHeroes.reduce((sum, h) => sum + h.overall * h.star, 0) || 10;
  
  const defenderHeroes = opponent.arenaDefenseFormation?.filter(h => h) || [];
  const opPower = defenderHeroes.reduce((sum, h) => sum + (h.overall * h.star), 0) || 10;

  useEffect(() => {
    // Animation flow
    setTimeout(() => setPhase('FIGHT'), 2000); // 2s intro
    setTimeout(() => {
      // Calculate win/lose purely based on power (with some +/- 15% RNG)
      const myRng = myPower * (0.85 + Math.random() * 0.3);
      const opRng = opPower * (0.85 + Math.random() * 0.3);
      
      const isWin = myRng >= opRng;
      setResult(isWin ? 'WIN' : 'LOSE');
      setPhase('RESULT');
    }, 6000); // 4s fighting
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
      
      {/* Nửa trên: Opponent */}
      <div className={`absolute top-0 inset-x-0 h-1/2 flex items-center justify-center transition-transform duration-1000 ${phase === 'VS' ? '-translate-y-20' : 'translate-y-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-b from-red-900/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="text-red-400 font-cinzel text-xl mb-4 tracking-widest">PHÒNG THỦ</div>
          <div className="text-white text-3xl font-bold mb-6">{opponent.playerName || opponent.uid}</div>
          <div className="flex gap-2 flex-wrap justify-center">
            {defenderHeroes.map((hero, idx) => (
              <div key={idx} className="w-14 h-14 md:w-20 md:h-20 rounded border border-red-500 overflow-hidden shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                <img src={hero.image} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-4 text-red-300 font-mono text-sm">Lực Chiến: ???</div>
        </div>
      </div>

      {/* Nửa dưới: Player */}
      <div className={`absolute bottom-0 inset-x-0 h-1/2 flex items-center justify-center transition-transform duration-1000 ${phase === 'VS' ? 'translate-y-20' : 'translate-y-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/40 to-transparent"></div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="mt-4 text-emerald-300 font-mono text-sm mb-4">Lực Chiến: {Math.floor(myPower)}</div>
          <div className="flex gap-2 mb-6 flex-wrap justify-center">
            {attackerHeroes.map((hero, idx) => (
              <div key={idx} className="w-14 h-14 md:w-20 md:h-20 rounded border border-emerald-500 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <img src={hero.image} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="text-white text-3xl font-bold mb-4">{playerData.playerName}</div>
          <div className="text-emerald-400 font-cinzel text-xl tracking-widest">TẤN CÔNG</div>
        </div>
      </div>

      {/* Middle VS or Fight effects */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {phase === 'VS' && (
          <div className="text-9xl font-black font-cinzel text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-yellow-400 to-orange-500 drop-shadow-[0_0_30px_rgba(251,191,36,0.6)] animate-pulse">
            VS
          </div>
        )}
        
        {phase === 'FIGHT' && (
          <div className="relative w-64 h-64">
            <Swords size={64} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white animate-ping" />
            <div className="absolute inset-0 bg-red-500/20 rounded-full animate-pulse blur-xl"></div>
          </div>
        )}

        {phase === 'RESULT' && result && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center pointer-events-auto">
            <div className={`text-6xl md:text-8xl font-black font-cinzel mb-8 ${result === 'WIN' ? 'text-yellow-400' : 'text-slate-500'}`}>
              {result === 'WIN' ? 'CHIẾN THẮNG' : 'THẤT BẠI'}
            </div>
            
            <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl flex flex-col items-center min-w-[300px]">
              <div className="text-slate-400 uppercase tracking-widest mb-2">Xếp Hạng Đấu Trường</div>
              <div className="flex items-center gap-4 text-3xl font-bold text-white mb-6">
                <span>Top {playerData.arenaRank || 10000}</span>
                <ChevronLeft className="rotate-180 text-slate-500" />
                <span className={result === 'WIN' ? 'text-emerald-400' : 'text-slate-500'}>
                  {result === 'WIN' ? `Top ${opponent.arenaRank || 10000}` : 'Giữ nguyên'}
                </span>
              </div>
              
              <button 
                onClick={() => {
                  onFinish(result === 'WIN');
                }}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-white font-bold text-lg"
              >
                Trở về Đấu Trường
              </button>
            </div>
          </div>
        )}
      </div>
      
    </div>
  );
}
