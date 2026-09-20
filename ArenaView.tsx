import React, { useState, useEffect, useMemo, useRef } from 'react';
import { PlayerState, LeaderboardEntry, Hero } from './types';
import { ChevronLeft, Swords, Trophy, Shield, Star, Users, Zap, Skull, User } from 'lucide-react';
import { getArenaOpponents, updateArenaScore, updateArenaDefenseFormation } from './firebaseService';

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
  const [loading, setLoading] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState<LeaderboardEntry | null>(null);
  const [attackFormation, setAttackFormation] = useState<(string | null)[]>([]);
  
  const currentElo = playerData.arenaScore || 1000;
  
  const getRankInfo = (elo: number) => {
    if (elo >= 2000) return { name: 'Bá Vương', color: 'text-red-500', bg: 'bg-red-500/20' };
    if (elo >= 1600) return { name: 'Kim Cương', color: 'text-cyan-400', bg: 'bg-cyan-400/20' };
    if (elo >= 1400) return { name: 'Bạch Kim', color: 'text-emerald-400', bg: 'bg-emerald-400/20' };
    if (elo >= 1200) return { name: 'Vàng', color: 'text-yellow-400', bg: 'bg-yellow-400/20' };
    if (elo >= 1100) return { name: 'Bạc', color: 'text-slate-300', bg: 'bg-slate-300/20' };
    return { name: 'Đồng', color: 'text-amber-600', bg: 'bg-amber-600/20' };
  };

  const rankInfo = getRankInfo(currentElo);

  const fetchOpponents = async () => {
    setLoading(true);
    const ops = await getArenaOpponents(currentElo, playerData.username || 'guest');
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
      const h = playerData.inventory.find(hero => hero.id === id);
      if (!h) return null;
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
    
    updateArenaDefenseFormation(playerData.username || 'guest', playerData.playerName || playerData.username || 'Khuyết Danh', sanitizedFormation, playerData.arenaScore || 1000);
    
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

        {/* Player Stats */}
        <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl p-6 flex items-center justify-between mb-8 shadow-xl">
          <div className="flex items-center gap-6">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center ${rankInfo.bg} border-4 border-slate-800`}>
              <Trophy size={48} className={rankInfo.color} />
            </div>
            <div>
              <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Xếp hạng hiện tại</div>
              <div className={`text-4xl font-black ${rankInfo.color} font-cinzel`}>{rankInfo.name}</div>
              <div className="text-xl font-bold text-white mt-1">{currentElo} <span className="text-slate-400 text-base font-normal">Điểm ELO</span></div>
            </div>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => setScreen('SELECT_DEFENSE')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 border border-slate-600 transition-colors"
            >
              <Shield size={20} className="text-blue-400" />
              Thiết lập Đội hình Phòng thủ
            </button>
            <button 
              onClick={() => setScreen('SELECT_ATTACK_LOBBY')}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 border border-slate-600 transition-colors"
            >
              <Swords size={20} className="text-red-400" />
              Thiết lập Đội hình Tấn công
            </button>
            <button 
              onClick={fetchOpponents}
              className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg flex items-center gap-2 border border-slate-600 transition-colors"
            >
              <Zap size={20} className="text-yellow-400" />
              Tìm đối thủ mới
            </button>
          </div>
        </div>

        {/* Opponents List */}
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Users className="text-red-400" /> Danh sách Thách Đấu
          </h2>
          
          {loading ? (
            <div className="text-center text-slate-400 py-12">Đang dò tìm đối thủ...</div>
          ) : opponents.length === 0 ? (
            <div className="text-center text-slate-400 py-12">Không tìm thấy đối thủ phù hợp. Hãy thử lại sau.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {opponents.map((op, idx) => {
                const opRank = getRankInfo(op.arenaScore || 1000);
                return (
                  <div key={idx} className="bg-slate-900 border border-slate-700 rounded-xl p-5 hover:border-red-500/50 transition-colors flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-600 overflow-hidden mb-3">
                      <img src={op.avatarUrl || "https://i.imgur.com/kS5lW6H.png"} alt="avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="font-bold text-lg text-white text-center">{op.playerName || op.uid}</div>
                    <div className={`text-sm font-semibold ${opRank.color} mb-4`}>{opRank.name} ({op.arenaScore || 1000})</div>
                    
                    {/* Defense preview */}
                    <div className="flex justify-center gap-1 mb-6 w-full flex-wrap">
                      {op.arenaDefenseFormation?.slice(0, 6).map((hero, i) => (
                        <div key={i} className="w-10 h-10 bg-slate-800 rounded border border-slate-700 overflow-hidden flex-shrink-0">
                          {hero ? (
                            <img src={hero.image} alt="hero" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center opacity-30"><User size={20} className="text-slate-400" /></div>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={() => { setSelectedOpponent(op); setScreen('SELECT_ATTACK'); }}
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold flex justify-center items-center gap-2 shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all"
                    >
                      <Swords size={18} /> THÁCH ĐẤU
                    </button>
                  </div>
                );
              })}
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
              opponentScore: selectedOpponent?.arenaScore || 1000,
              opponentUid: selectedOpponent?.uid,
              opponentName: selectedOpponent?.playerName
          };
          // Ưu tiên dùng CombatView chính của App nếu được truyền vào
          if (initArenaCombat) {
              const enemyLineup = selectedOpponent?.arenaDefenseFormation || [];
              const myLineup = formation
                .map(id => playerData.inventory.find((h: any) => h.id === id))
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
      onFinish={(isWin, newElo) => {
        const newData = { ...playerData, arenaScore: newElo };
        setPlayerData(newData);
        saveData(newData);
        // Sync to firebase explicitly because it's an important stat
        updateArenaScore(playerData.username || 'guest', newElo);
        setScreen('LOBBY');
        // Refresh opponents so we get new ones if elo changes a lot
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
      // Tự động sắp 6 tướng mạnh nhất (không trùng tên) nếu chưa lưu
      const uniqueTopHeroesMap = new Map();
      const sortedHeroes = [...playerData.inventory].sort((a: any, b: any) => {
        const powerA = (a.overall || 1) * (a.star || 1);
        const powerB = (b.overall || 1) * (b.star || 1);
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
    const uniqueTopHeroesMap = new Map();
    const sortedHeroes = [...playerData.inventory].sort((a, b) => {
      const powerA = (a.overall || 1) * (a.star || 1);
      const powerB = (b.overall || 1) * (b.star || 1);
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
          <h3 className="text-slate-400 mb-4 text-sm font-bold tracking-widest">DANH SÁCH TƯỚNG ({playerData.inventory.length})</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
            {playerData.inventory.map(hero => {
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
  onFinish: (isWin: boolean, newElo: number) => void;
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
              <div className="text-slate-400 uppercase tracking-widest mb-2">Điểm ELO</div>
              <div className="flex items-center gap-4 text-3xl font-bold text-white mb-6">
                <span>{playerData.arenaScore || 1000}</span>
                <ChevronLeft className="rotate-180 text-slate-500" />
                <span className={result === 'WIN' ? 'text-emerald-400' : 'text-red-400'}>
                  {result === 'WIN' ? '+' : '-'}{result === 'WIN' ? 25 : 15}
                </span>
              </div>
              
              <button 
                onClick={() => {
                  const currentElo = playerData.arenaScore || 1000;
                  const change = result === 'WIN' ? 25 : -15;
                  onFinish(result === 'WIN', Math.max(0, currentElo + change));
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
