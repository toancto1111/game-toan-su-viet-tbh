
import React, { useState, useMemo, useEffect, useRef, Component, ErrorInfo, ReactNode } from 'react';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 20, color: 'white', background: 'red' }}>
          <h2>Something went wrong.</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.toString()}</pre>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.error?.stack}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}

import { PlayerState, Rarity, Question, Hero, Artifact, TrialRecord } from './types';
import { INITIAL_HEROES, ARTIFACTS, ENEMY_HEROES, DEFAULT_ALLY_IMG, DEFAULT_ENEMY_IMG, SYNERGIES, AVAILABLE_VIDEOS } from './constants';
import { CHAPTER_NAMES, MATH_DATA, getMathQuestions, getQuestionsForLesson } from './geminiService';
import { saveTrialRecord, syncPlayerToLeaderboard, savePlayerProgress, loadPlayerDataFromCloud, updateStudentAnalytics, isFirebaseReady, getCloudAccount, saveCloudAccount , updateArenaScore } from './firebaseService';
import { AdminView } from './AdminView';
import { demoTuLuyenData } from './demo_tu_luyen_data';
import * as XLSX from 'xlsx';
import { HeroTrialView } from './HeroTrialView';
import { HERO_TRIAL_STAGES, generateTrialEnemies } from './heroTrialData';
import { TuLuyenMenuView } from './TuLuyenMenuView';
import { TuHaoSuVietView } from './TuHaoSuVietView';
import { LeaderboardView } from './LeaderboardView';
import { ArenaView } from './ArenaView';
import { 
  ChevronLeft, Sparkles, ArrowRight, Book, RotateCcw, 
  Library, UserPlus, Swords, BookMarked, Map as MapIcon, Lock, 
  CheckCircle, Trophy, Coins, Ticket, XCircle, Gift, BookOpen, 
  ShoppingBag, Star, UserCheck, Plus, Minus, School, Tent, Crosshair,
  Lightbulb, Zap, Info, FastForward, Swords as SwordIcon, Users, ScrollText, Scissors, ArrowUpCircle,
  Music, Play, Pause, SkipForward, Volume2, VolumeX, Package, LogOut, Crown, Shield, Moon, Gem, Snowflake, Flag, Disc, X, Database, MountainSnow, Recycle,
  HeartCrack, Skull, Wind, Heart, Frown, Flame, Droplets, ShieldOff, Ban, TrendingDown, Target, ShieldCheck, Syringe, RefreshCw, Link2, ShieldAlert, Hourglass, HeartPulse, User, Maximize, Minimize
} from 'lucide-react';
import { ProfileModal } from './ProfileModal';
import { ChatbotWidget } from './ChatbotWidget';

const HeroStars = ({ starCount, size = 10, className = "" }: { starCount: number, size?: number, className?: string }) => {
   if (!starCount) return null;
   
   const displaySize = size * 2;
   const gapClass = "gap-1"; // Slightly larger gap for bigger icons

   if (starCount <= 5) {
      return (
         <div className={`flex ${gapClass} ${className}`}>
            {[...Array(starCount)].map((_, i) => <Star key={i} size={displaySize} className="text-yellow-500 fill-yellow-500 drop-shadow-md" />)}
         </div>
      );
   } else if (starCount <= 10) {
      const moons = starCount - 5;
      return (
         <div className={`flex ${gapClass} ${className}`}>
            {[...Array(moons)].map((_, i) => <Moon key={i} size={displaySize} className="text-red-500 fill-red-500 drop-shadow-[0_0_5px_rgba(239,68,68,0.8)]" />)}
         </div>
      );
   } else if (starCount <= 15) {
      const gems = starCount - 10;
      return (
         <div className={`flex ${gapClass} ${className}`}>
            {[...Array(gems)].map((_, i) => <Gem key={i} size={displaySize} className="text-purple-500 fill-purple-500 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />)}
         </div>
      );
   } else if (starCount <= 20) {
      const flakes = starCount - 15;
      return (
         <div className={`flex ${gapClass} ${className}`}>
            {[...Array(flakes)].map((_, i) => <Snowflake key={i} size={displaySize} className="text-white fill-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />)}
         </div>
      );
   } else if (starCount <= 25) {
      const crowns = starCount - 20;
      return (
         <div className={`flex ${gapClass} ${className}`}>
            {[...Array(crowns)].map((_, i) => <Crown key={i} size={displaySize} className="text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />)}
         </div>
      );
   } else {
      const flags = Math.min(5, starCount - 25);
      return (
         <div className={`flex ${gapClass} ${className}`}>
            {[...Array(flags)].map((_, i) => <Flag key={i} size={displaySize} className="text-red-500 fill-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.9)]" />)}
         </div>
      );
   }
};

// ========= INNATE PASSIVE SYSTEM =========
export const PASSIVE_POOL = [
  { id: 'extra_turn', name: 'Liên Kích', desc: 'Có xác suất đánh thêm 1 lượt sau khi tấn công.' },
  { id: 'lifesteal', name: 'Huyết Quỷ', desc: 'Hồi phục HP dựa trên lượng sát thương gây ra.' },
  { id: 'stun_chance', name: 'Băng Phong', desc: 'Có xác suất gây choáng kẻ địch khi tấn công.' },
  { id: 'true_damage', name: 'Phá Giáp', desc: 'Gây thêm sát thương chuẩn bỏ qua phòng thủ.' },
  { id: 'revive', name: 'Niết Bàn', desc: 'Cải tử hoàn sinh 1 lần trong trận đấu.' },
  { id: 'reflect', name: 'Phản Đòn', desc: 'Phản lại một phần sát thương nhận vào.' },
  { id: 'speed_boost', name: 'Tiên Phong', desc: 'Tăng vĩnh viễn Tốc độ trong trận sau mỗi lượt.' },
  { id: 'shield', name: 'Hộ Thể', desc: 'Tạo lá chắn hấp thụ sát thương ở đầu mỗi lượt.' },
  { id: 'execute', name: 'Trảm Sát', desc: 'Tăng mạnh sát thương nếu Máu mục tiêu rơi xuống dưới 30%.' },
  { id: 'berserk', name: 'Cuồng Bạo', desc: 'Máu bản thân càng thấp, Tỷ lệ Bạo kích càng được cộng dồn cao.' },
  { id: 'block', name: 'Kiên Tấn', desc: 'Có tỷ lệ đỡ đòn, giảm 50% lượng sát thương nhận vào.' },
  { id: 'endure', name: 'Bất Khuất', desc: '1 lần mỗi trận, khi nhận sát thương chí tử sẽ không chết mà giữ lại 1 HP.' },
  { id: 'dodge', name: 'Né Tránh', desc: 'Tăng tỷ lệ hoàn toàn không nhận sát thương từ các đòn đánh.' },
  { id: 'toughness', name: 'Dẻo Dai', desc: 'Giảm đáng kể lượng sát thương nhận vào nếu đòn đánh của địch là Bạo kích.' },
  { id: 'heal_ally', name: 'Trị Liệu', desc: 'Hồi phục một lượng Máu cho đồng đội có tỷ lệ Máu thấp nhất sau mỗi lượt hành động.' }
];

export const HERO_HISTORICAL_PASSIVES: Record<string, string[]> = {
  'h10_1': ['speed_boost', 'execute'], // Quang Trung
  'h5_2': ['speed_boost', 'block'], // Lý Thường Kiệt
  'h1_6': ['revive', 'block'], // Sơn Tinh
  'h1_2': ['heal_ally'], // Thần Long Nữ
  'h1_4': ['heal_ally'], // Âu Cơ
  'h6_7': ['dodge', 'block'], // Trần Hưng Đạo
  'h2_1': ['berserk', 'extra_turn'], // Trưng Trắc
  'h2_2': ['berserk', 'extra_turn'], // Trưng Nhị
  'h4_2': ['extra_turn', 'execute'], // Đinh Bộ Lĩnh
  'h4_0': ['extra_turn', 'execute'], // Đinh Bộ Lĩnh (legacy)
  'h8_1': ['endure', 'lifesteal'], // Lê Lợi
};

const hashString = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash);
};

export const RARITY_MAX_STARS: Record<string, number> = { UR: 30, SSR: 20, SR: 15, R: 10, C: 5 };
export const RARITY_MAX_PASSIVES: Record<string, number> = { UR: 4, SSR: 3, SR: 2, R: 1, C: 0 };

export const getHeroPassives = (hero: { id: string, rarity: string }) => {
  const maxPassives = RARITY_MAX_PASSIVES[hero.rarity] ?? 4;
  if (maxPassives === 0) return [];
  
  const historicalPassives = HERO_HISTORICAL_PASSIVES[hero.id] || [];
  const passives = [];
  
  for (const pid of historicalPassives) {
    if (passives.length >= maxPassives) break;
    const p = PASSIVE_POOL.find(x => x.id === pid);
    if (p) passives.push(p);
  }
  
  const seed = hashString(hero.id);
  let currentSeed = seed;
  
  const availablePool = PASSIVE_POOL.filter(p => !passives.some(xp => xp.id === p.id));
  
  while (passives.length < maxPassives && availablePool.length > 0) {
    const index = currentSeed % availablePool.length;
    passives.push(availablePool[index]);
    availablePool.splice(index, 1);
    currentSeed = hashString(currentSeed.toString() + "salt");
  }
  return passives;
};

export const getStarBorderClass = (star: number) => {
  if (star >= 26) return 'led-border led-gold';
  if (star >= 21) return 'led-border led-gold';
  if (star >= 16) return 'led-border led-white';
  if (star >= 11) return 'led-border led-purple';
  if (star >= 6) return 'led-border led-red';
  return '';
};

export const BREAKTHROUGH_PILLS = [
  { id: 'pill1', name: 'Sơ Cấp Đột Phá Đan', icon: '💊', img: './items/pill1.png', color: 'text-red-400', reqStar: 6, desc: 'Nâng cấp mốc 6-10 Sao (Trăng Khuyết Red)' },
  { id: 'pill2', name: 'Trung Cấp Phá Cảnh Đan', icon: '🔮', img: './items/pill2.png', color: 'text-purple-400', reqStar: 11, desc: 'Nâng cấp mốc 11-15 Sao (Kim Cương Tím)' },
  { id: 'pill3', name: 'Cao Cấp Thông Thiên Đan', icon: '⚡', img: './items/pill3.png', color: 'text-sky-300', reqStar: 16, desc: 'Nâng cấp mốc 16-20 Sao (Bông Tuyết Trắng)' },
  { id: 'pill4', name: 'Thần Cấp Hóa Thần Đan', icon: '🌌', img: './items/pill4.png', color: 'text-amber-400', reqStar: 21, desc: 'Nâng cấp mốc 21-25 Sao (Vương Miện Vàng)' },
  { id: 'pill5', name: 'Tối Thượng Thái Sơ Đan', icon: '🚩', img: './items/pill5.png', color: 'text-rose-500 font-black', reqStar: 26, desc: 'Nâng cấp mốc 26-30 Sao (Cờ Trận Crimson)' },
];

export const getStarUpgradeReq = (currentStar: number) => {
  const nextStar = currentStar + 1;
  const fragReq = currentStar <= 2 ? 50 : 100;
  const jadeTable: Record<number, number> = {
    3: 20, 4: 30, 5: 40,
    6: 50, 7: 60, 8: 70, 9: 80, 10: 90,
    11: 100, 12: 120, 13: 140, 14: 160, 15: 180,
    16: 200, 17: 240, 18: 280, 19: 320, 20: 360,
    21: 400, 22: 450, 23: 500, 24: 550, 25: 600,
    26: 700, 27: 800, 28: 900, 29: 1000, 30: 1200,
  };
  const jadeReq = jadeTable[currentStar] ?? 0;

  let requiredPill = null;
  let pillQty = 0;

  if (nextStar >= 26) { requiredPill = BREAKTHROUGH_PILLS[4]; pillQty = nextStar - 25; }
  else if (nextStar >= 21) { requiredPill = BREAKTHROUGH_PILLS[3]; pillQty = nextStar - 20; }
  else if (nextStar >= 16) { requiredPill = BREAKTHROUGH_PILLS[2]; pillQty = nextStar - 15; }
  else if (nextStar >= 11) { requiredPill = BREAKTHROUGH_PILLS[1]; pillQty = nextStar - 10; }
  else if (nextStar >= 6) { requiredPill = BREAKTHROUGH_PILLS[0]; pillQty = nextStar - 5; }

  return { fragReq, jadeReq, requiredPill, pillQty, nextStar };
};

export const getStarRoadmap = (hero: Hero) => {
  const passives = getHeroPassives(hero as any);
  const maxStars = RARITY_MAX_STARS[hero.rarity] || 30;
  const roadmap = [];
  const displayStar = Math.min(maxStars, hero.star);

  for (let s = 1; s <= maxStars; s++) {
    let title = "";
    let effect = "";
    let iconName = "";
    let tierColor = "";
    let passiveName = "";
    let passiveDesc = "";
    let passiveColor = "";

    if (s <= 5) {
      title = `${s} Sao Vàng`;
      effect = `+${s * 10}% Chỉ số Tấn Công, Phòng Thủ, Máu`;
      iconName = "⭐";
      tierColor = "text-yellow-400";
    } else if (s <= 10) {
      const moons = s - 5;
      const power = moons * 20;
      title = `${s} Sao (${moons} Trăng Khuyết Red)`;
      passiveName = passives[0].name;
      passiveDesc = passives[0].desc;
      passiveColor = "text-red-400";
      effect = `Thức tỉnh/Tăng [${passiveName}] lên ${power}% (+${s * 10}% Chỉ số, Viền LED Đỏ)`;
      iconName = "🌙";
      tierColor = "text-red-400";
    } else if (s <= 15) {
      const gems = s - 10;
      const power = gems * 20;
      title = `${s} Sao (${gems} Kim Cương Tím)`;
      passiveName = passives[1].name;
      passiveDesc = passives[1].desc;
      passiveColor = "text-purple-400";
      effect = `Thức tỉnh/Tăng [${passiveName}] lên ${power}% (+${s * 10}% Chỉ số, Viền LED Tím)`;
      iconName = "💎";
      tierColor = "text-purple-400";
    } else if (s <= 20) {
      const flakes = s - 15;
      const power = flakes * 20;
      title = `${s} Sao (${flakes} Bông Tuyết Trắng)`;
      passiveName = passives[2].name;
      passiveDesc = passives[2].desc;
      passiveColor = "text-slate-200";
      effect = `Thức tỉnh/Tăng [${passiveName}] lên ${power}% (+${s * 10}% Chỉ số, Viền LED Trắng)`;
      iconName = "❄️";
      tierColor = "text-slate-200";
    } else if (s <= 25) {
      const crowns = s - 20;
      const power = crowns * 20;
      title = `${s} Sao (${crowns} Vương Miện Vàng)`;
      passiveName = passives[3].name;
      passiveDesc = passives[3].desc;
      passiveColor = "text-amber-400";
      effect = `Thức tỉnh/Tăng [${passiveName}] lên ${power}% (+${s * 10}% Chỉ số, Viền LED Vàng Hoàng Gia)`;
      iconName = "👑";
      tierColor = "text-amber-400";
    } else {
      const flags = s - 25;
      title = `${s} Sao (${flags} Cờ Trận Crimson)`;
      effect = `Cảnh Giới Tối Thượng: +${200 + (s - 25) * 20}% Chỉ Số Toàn Năng, Đột Phá Đại Thành!`;
      iconName = "🚩";
      tierColor = "text-rose-500 font-black";
    }

    roadmap.push({ star: s, title, effect, iconName, tierColor, isUnlocked: displayStar >= s, passiveName, passiveDesc, passiveColor });
  }

  return roadmap;
};

export const getHeroCombatPower = (hero: Partial<Hero> & { atk?: number; def?: number; maxHp?: number; spd?: number; star?: number; id?: string; equippedArtifactId?: string }): number => {
  if (!hero) return 0;
  const atk = hero.atk || 100;
  const def = hero.def || 90;
  const maxHp = hero.maxHp || 6000;
  const spd = hero.spd || 100;
  const star = hero.star || 1;

  // 1. Base Stats Power Contribution
  const atkPower = atk * 10;
  const defPower = def * 8;
  const hpPower  = Math.round(maxHp * 0.5);
  const spdPower = spd * 15;

  // 2. Unlocked Passives Contribution (Unlocked at Star 6, 11, 16, 21)
  let passivePower = 0;
  if (hero.id) {
     const passives = getHeroPassives(hero as any);
     passives.forEach((_, idx) => {
        const unlockStar = 6 + idx * 5;
        if (star >= unlockStar) {
           const starsInTier = Math.max(1, Math.min(5, star - unlockStar + 1));
           passivePower += 800 * (idx + 1) + starsInTier * 300;
        }
     });
  }

  // 3. Artifact Power Contribution
  const artifactPower = hero.equippedArtifactId ? 2000 : 0;

  return Math.round(atkPower + defPower + hpPower + spdPower + passivePower + artifactPower);
};

export const calculateHeroStatsWithStar = (hero: Hero, targetStar: number) => {
  const star = Math.min(30, Math.max(1, targetStar));

  // Find base hero template to get clean 1-star base stats and latest text descriptions
  const baseTemplate = INITIAL_HEROES.find(h => h.name === hero.name || h.id === hero.id) || ENEMY_HEROES.find(h => h.name === hero.name || h.id === hero.id);
  const baseAtk = baseTemplate ? baseTemplate.atk : (hero.atk || 100);
  const baseDef = baseTemplate ? baseTemplate.def : (hero.def || 90);
  const baseHp  = baseTemplate ? baseTemplate.maxHp : (hero.maxHp || 6000);
  const baseSpd = baseTemplate ? baseTemplate.spd : (hero.spd || 100);

  // Milestone breakthrough multiplier
  let milestoneMult = 0;
  if (star >= 26) milestoneMult = 1.5;      // 26-30 stars: Cờ Trận Crimson (+150%)
  else if (star >= 21) milestoneMult = 1.0; // 21-25 stars: Vương Miện Vàng (+100%)
  else if (star >= 16) milestoneMult = 0.7; // 16-20 stars: Bông Tuyết Trắng (+70%)
  else if (star >= 11) milestoneMult = 0.4; // 11-15 stars: Kim Cương Tím (+40%)
  else if (star >= 6) milestoneMult = 0.2;  // 6-10 stars: Trăng Khuyết Red (+20%)

  // Total stat scaling multiplier: +15% per star + milestone bonus
  const multiplier = 1 + (star - 1) * 0.15 + milestoneMult;

  const scaledAtk = Math.round(baseAtk * multiplier);
  const scaledDef = Math.round(baseDef * multiplier);
  const scaledMaxHp = Math.round(baseHp * multiplier);
  const scaledSpd = Math.round(baseSpd * (1 + (star - 1) * 0.02 + milestoneMult * 0.1));

  const updatedHero = {
    ...hero,
    image: baseTemplate ? baseTemplate.image : hero.image,
    skillName: baseTemplate ? baseTemplate.skillName : hero.skillName,
    skillDesc: baseTemplate ? baseTemplate.skillDesc : hero.skillDesc,
    title: baseTemplate ? baseTemplate.title : hero.title,
    desc: baseTemplate ? baseTemplate.desc : hero.desc,
    role: baseTemplate ? (baseTemplate.role || hero.role) : hero.role,
    targetScope: baseTemplate ? (baseTemplate.targetScope || hero.targetScope) : hero.targetScope,
    skillEffect: baseTemplate ? (baseTemplate.skillEffect || hero.skillEffect) : hero.skillEffect,
    skillEffectChance: baseTemplate ? (baseTemplate.skillEffectChance ?? hero.skillEffectChance) : hero.skillEffectChance,
    skillDmgMult: baseTemplate ? (baseTemplate.skillDmgMult ?? hero.skillDmgMult) : hero.skillDmgMult,
    skillVideoUrl: baseTemplate ? baseTemplate.skillVideoUrl : hero.skillVideoUrl,
    star,
    atk: scaledAtk,
    def: scaledDef,
    spd: scaledSpd,
    maxHp: scaledMaxHp,
    hp: Math.min(hero.hp || scaledMaxHp, scaledMaxHp),
  };

  const calculatedOverall = getHeroCombatPower(updatedHero);

  return {
    ...updatedHero,
    overall: calculatedOverall
  };
};

export const syncHeroInventoryStats = (inventory: Hero[]) => {
  if (!inventory) return [];
  return inventory.map(h => {
     if (!h) return h;
     const baseTemplate = INITIAL_HEROES.find(b => b.name === h.name || b.id === h.id) || ENEMY_HEROES.find(b => b.name === h.name || b.id === h.id);
     const freshImage = baseTemplate ? baseTemplate.image : h.image;
     const freshSkillVideoUrl = baseTemplate ? baseTemplate.skillVideoUrl : h.skillVideoUrl;
     if (h.isPermanent) {
        const calculated = calculateHeroStatsWithStar(h, h.star);
        return {
           ...calculated,
           image: freshImage || calculated.image,
           skillVideoUrl: freshSkillVideoUrl
        };
     }
     return {
        ...h,
        image: freshImage || h.image,
        skillName: baseTemplate ? baseTemplate.skillName : h.skillName,
        skillDesc: baseTemplate ? baseTemplate.skillDesc : h.skillDesc,
        title: baseTemplate ? baseTemplate.title : h.title,
        desc: baseTemplate ? baseTemplate.desc : h.desc,
        role: baseTemplate ? (baseTemplate.role || h.role) : h.role,
        targetScope: baseTemplate ? (baseTemplate.targetScope || h.targetScope) : h.targetScope,
        skillEffect: baseTemplate ? (baseTemplate.skillEffect || h.skillEffect) : h.skillEffect,
        skillEffectChance: baseTemplate ? (baseTemplate.skillEffectChance ?? h.skillEffectChance) : h.skillEffectChance,
        skillDmgMult: baseTemplate ? (baseTemplate.skillDmgMult ?? h.skillDmgMult) : h.skillDmgMult,
        skillVideoUrl: freshSkillVideoUrl
     };
  });
};

// ========= AUTH / ACCOUNT HELPERS =========
const ACCOUNTS_KEY = 'sv-accounts-v2';
const SESSION_KEY  = 'sv-session-v2';

interface AccountRecord {
  passwordHash: string;
  playerData: PlayerState;
}

/** Hash mật khẩu đơn giản (client-side). Đủ để che mật khẩu trong localStorage. */
const hashPassword = (password: string): string => {
  let hash = 5381;
  for (let i = 0; i < password.length; i++) {
    hash = ((hash << 5) + hash) ^ password.charCodeAt(i);
    hash = hash >>> 0; // convert to unsigned 32-bit
  }
  return hash.toString(16).padStart(8, '0');
};

const getAccounts = (): Record<string, AccountRecord> => {
  try { 
     const accounts = JSON.parse(localStorage.getItem(ACCOUNTS_KEY) || '{}');
     if (!accounts['admin']) {
        accounts['admin'] = {
           passwordHash: hashPassword('Toantrang2011@'),
           playerData: {
              playerName: 'admin',
              legionName: 'Admin',
                              legionTickets: 0,
              permArtifacts: [],
                  inventory: [],
              lineup: [null, null, null, null, null, null],
              permLineup: [null, null, null, null, null, null],
              currentChapter: 1,
              progress: { 1: 1 },
              mathProgress: {},
              seenMathQuestions: []
           }
        };
        localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
     }
     return accounts;
  }
  catch { return {}; }
};

const saveAccounts = (accounts: Record<string, AccountRecord>): void => {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
};

const getSession = (): string | null => localStorage.getItem(SESSION_KEY);
const setSession = (username: string): void => localStorage.setItem(SESSION_KEY, username);
const clearSession = (): void => localStorage.removeItem(SESSION_KEY);
// ==========================================

const SFX_KEYWORDS = ['correct', 'wrong', 'dung', 'sai', 'true', 'false', 'success', 'fail', 'sfx', 'effect', 'sound', 'ding', 'buzz', 'win', 'lose', 'click'];
const allAudioModules = import.meta.glob('/public/audio/*.{mp3,wav,ogg,m4a}');
const audioList = Object.keys(allAudioModules)
  .map(key => key.replace('/public', ''))
  .filter(path => {
    const fileName = path.split('/').pop()?.toLowerCase() || '';
    return !SFX_KEYWORDS.some(kw => fileName.includes(kw));
  });

const BGMPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentSongIndex, setCurrentSongIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioList.length > 0) {
      setCurrentSongIndex(Math.floor(Math.random() * audioList.length));
    }
  }, []);

  useEffect(() => {
    if (audioRef.current && currentSongIndex >= 0) {
      audioRef.current.volume = volume;
      if (isPlaying) {
        audioRef.current.play().catch(e => {
          console.warn("Auto-play blocked by browser:", e);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [currentSongIndex, isPlaying, volume]);

  const handleNext = () => {
    if (audioList.length === 0) return;
    let nextIndex = currentSongIndex;
    if (audioList.length > 1) {
      while (nextIndex === currentSongIndex) {
        nextIndex = Math.floor(Math.random() * audioList.length);
      }
    }
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  if (audioList.length === 0) return null;

  const currentSongName = currentSongIndex >= 0 
    ? audioList[currentSongIndex].split('/').pop()?.replace(/\.[^/.]+$/, "") 
    : "Nhạc nền";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <audio 
        ref={audioRef} 
        src={currentSongIndex >= 0 ? audioList[currentSongIndex] : undefined} 
        onEnded={handleNext}
      />
      
      {/* Popover Bảng Điều Khiển Nhạc Nền */}
      {isOpen && (
        <div className="mb-3 bg-stone-900/95 border-2 border-amber-600/40 rounded-2xl p-3.5 shadow-[0_10px_30px_rgba(0,0,0,0.9)] backdrop-blur-xl flex flex-col gap-3 min-w-[240px] animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between border-b border-amber-900/40 pb-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400">
              <Music size={14} className={isPlaying ? "animate-bounce text-amber-400" : "text-stone-500"} />
              <span className="truncate max-w-[150px]" title={currentSongName}>
                {currentSongName}
              </span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-amber-400 transition-colors p-1">
              <X size={16} />
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 py-1">
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-stone-950 flex items-center justify-center shadow-lg transition-transform active:scale-95 border border-amber-300/40"
              title={isPlaying ? "Tạm dừng" : "Phát nhạc"}
            >
              {isPlaying ? <Pause size={18} fill="black" /> : <Play size={18} fill="black" className="ml-0.5" />}
            </button>

            <button 
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-stone-800 hover:bg-stone-700 text-amber-400 border border-amber-900/40 flex items-center justify-center shadow-md transition-colors active:scale-95"
              title="Đổi bài ngẫu nhiên"
            >
              <SkipForward size={18} />
            </button>
          </div>

          <div className="flex items-center gap-2 bg-stone-950/70 px-3 py-2 rounded-xl border border-amber-900/30">
            {volume === 0 ? <VolumeX size={16} className="text-stone-500" /> : <Volume2 size={16} className="text-amber-500" />}
            <input 
              type="range" 
              min="0" max="1" step="0.01" 
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              title="Âm lượng"
            />
            <span className="text-[10px] text-amber-400 font-mono font-bold w-7 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Nút Đĩa Nhạc Thu Nhỏ Chiêm Ngưỡng */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative group flex items-center gap-2 px-3 py-2.5 rounded-full border-2 shadow-2xl backdrop-blur-md transition-all active:scale-95 ${
          isPlaying 
            ? 'bg-stone-900/90 border-amber-500 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
            : 'bg-stone-950/80 border-stone-700 text-stone-400 hover:border-amber-700 hover:text-amber-300'
        }`}
        title="Bật/Tắt Bảng Nhạc Nền"
      >
        <Disc size={22} className={isPlaying ? "animate-spin text-amber-400 duration-3000" : "text-stone-500"} />
        <span className="text-xs font-bold font-cinzel tracking-wider hidden group-hover:inline transition-all">
          {isPlaying ? "Phát Nhạc" : "Nhạc Nền"}
        </span>
        {isPlaying && (
          <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
          </span>
        )}
      </button>
    </div>
  );
};

const SyncStatusBadge: React.FC<{ status: 'idle' | 'saving' | 'saved' | 'offline' }> = ({ status }) => {
  if (status === 'idle') return null;
  return (
    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border transition-all duration-500"
      style={{
        background: status === 'saving' ? 'rgba(59,130,246,0.12)' : status === 'saved' ? 'rgba(16,185,129,0.12)' : 'rgba(245,158,11,0.12)',
        borderColor: status === 'saving' ? 'rgba(59,130,246,0.4)' : status === 'saved' ? 'rgba(16,185,129,0.4)' : 'rgba(245,158,11,0.4)',
        color: status === 'saving' ? '#60a5fa' : status === 'saved' ? '#34d399' : '#fbbf24'
      }}
    >
      {status === 'saving' && <span className="animate-spin inline-block">↻</span>}
      {status === 'saved' && <span>☁</span>}
      {status === 'offline' && <span>📵</span>}
      <span>{status === 'saving' ? 'Đang lưu...' : status === 'saved' ? 'Đã lưu Cloud' : 'Offline'}</span>
    </div>
  );
};

const Header: React.FC<{ state: PlayerState, setView: any, onLogout?: () => void, onOpenProfile?: () => void, syncStatus?: 'idle' | 'saving' | 'saved' | 'offline' }> = ({ state, setView, onLogout, onOpenProfile, syncStatus = 'idle' }) => {
  const currentAvatarHero = (state.inventory || []).find(h => h.id === state.avatarId);
  const avatarImg = state.customAvatar || (currentAvatarHero ? currentAvatarHero.image : DEFAULT_ALLY_IMG);

  const [isFullscreen, setIsFullscreen] = useState(false);
  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn(`Lỗi Fullscreen: ${err.message}`);
      });
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  return (
    <div className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-amber-900/50 sticky top-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.6)] overflow-hidden">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-800/40 to-transparent pointer-events-none"/>
      <div className="p-3 flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="lantern text-xl">🏮</span>
            <h1 onClick={() => setView('chapter-hub')} className="text-xl font-cinzel text-amber-500 font-bold tracking-widest uppercase cursor-pointer hover:text-amber-400 transition-colors drop-shadow-[0_0_8px_rgba(201,148,26,0.35)]">Sử Việt Anh Hùng</h1>
            <span className="lantern text-xl" style={{animationDelay:'1.5s'}}>🏮</span>
          </div>
          <div className="flex gap-3 text-sm font-medium">
            <span className="bg-stone-800/80 px-3 py-1 rounded-full border border-amber-900/40 flex items-center gap-1.5 text-yellow-500 text-xs font-bold">🪙 {(state.gold || 0).toLocaleString()}</span>
            <span className="bg-stone-800/80 px-3 py-1 rounded-full border border-green-900/40 flex items-center gap-1.5 text-green-400 text-xs font-bold">💎 {(state.jade || 0).toLocaleString()}</span>
            <span className="bg-stone-800/80 px-3 py-1 rounded-full border border-blue-900/40 flex items-center gap-1.5 text-blue-400 text-xs font-bold">🎫 {state.normalTickets || 0}</span>
          </div>
          <button 
            onClick={() => alert("Chào mừng đến với Sử Việt Anh Hùng!\\n\\n1. Doanh Trại: Nơi vượt các ải cốt truyện, chiến đấu với quân thù.\\n2. Quốc Tử Giám: Nơi thu thập kiến thức, tu luyện và trả lời câu hỏi.\\n3. Danh Vọng Đài: Xem bảng xếp hạng anh tài.\\n4. Quân Đoàn: Nơi quản lý tướng lĩnh và đội hình xuất chiến.\\n5. Thí Luyện: Leo tháp thử thách cực hạn.\\n6. Tự Hào Sử Việt: Nhận phần thưởng đặc biệt.\\n7. AI Trạng Nguyên: Sẵn sàng giải đáp mọi thắc mắc của bạn (nút ở góc phải)!")} 
            className="text-amber-400 hover:text-amber-300 transition-colors bg-stone-900 hover:bg-stone-800 p-2 rounded-xl border border-amber-900/40 ml-1 flex items-center gap-1.5"
            title="Hướng dẫn trò chơi"
          >
            <Info size={18} />
            <span className="hidden md:inline text-xs font-bold uppercase whitespace-nowrap">Hướng Dẫn</span>
          </button>
          <button 
            onClick={toggleFullscreen} 
            className="text-stone-400 hover:text-white transition-colors bg-stone-900 hover:bg-stone-800 p-2 rounded-xl border border-stone-700 ml-1"
            title="Toàn Màn Hình"
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>

        {/* Khối Avatar & Thông tin học sinh góc phải */}
        <div className="flex items-center gap-3">
          <div 
            onClick={onOpenProfile} 
            className="flex items-center gap-2.5 bg-stone-900/90 hover:bg-stone-800/90 border border-amber-500/50 hover:border-amber-400 px-3 py-1.5 rounded-2xl cursor-pointer transition-all shadow-md group"
            title="Bấm để mở Hồ sơ & Đổi Avatar"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-stone-950 shadow-[0_0_12px_rgba(245,158,11,0.5)] group-hover:scale-105 transition-transform">
                <img src={avatarImg} alt="Avatar" className="w-full h-full object-cover" />
              </div>
              <span className="absolute -bottom-1 -right-1 bg-amber-500 text-stone-950 font-black text-[9px] px-1 rounded-full border border-stone-900">
                K{state.grade || 6}
              </span>
            </div>

            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-200 font-cinzel font-bold text-xs group-hover:text-amber-300 transition-colors">
                  {state.playerName}
                </span>
                {state.className && (
                  <span className="bg-amber-950 text-amber-300 text-[10px] font-black px-1.5 py-0.2 rounded border border-amber-700/50">
                    {state.className}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-stone-400 truncate max-w-[130px]">
                {state.fullName ? `${state.fullName} • ${state.legionName}` : state.legionName}
              </span>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1">
            <div className="text-amber-600 font-cinzel text-[10px] uppercase tracking-widest bg-stone-800/80 px-2.5 py-0.5 rounded-full border border-amber-700/20 italic">
              Chương {state.currentChapter}
            </div>
            <SyncStatusBadge status={syncStatus} />
            {onLogout && (
              <button onClick={onLogout} title="Đăng xuất" className="text-stone-500 hover:text-red-400 text-[9px] uppercase tracking-widest font-bold transition-colors flex items-center gap-1">
                ⏻ Đăng xuất
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ========= MÀN HÌNH ĐĂNG NHẬP / ĐĂNG KÝ =========
const AuthView: React.FC<{ onLogin: (username: string, playerData: PlayerState) => void }> = ({ onLogin }) => {
  const [tab, setTab] = React.useState<'login' | 'register'>('login');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [fullName, setFullName] = React.useState('');
  const [grade, setGrade] = React.useState<number>(6);
  const [className, setClassName] = React.useState('');
  const [playerName, setPlayerName] = React.useState('');
  const [legionName, setLegionName] = React.useState('');
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = async () => {
    setError('');
    if (!username.trim() || !password) { setError('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu.'); return; }
    const key = username.trim().toLowerCase();
    setLoading(true);
    
    // 1. Lấy dữ liệu từ Local & Cloud
    const localAccounts = getAccounts();
    const localAccount = localAccounts[key];
    const cloudAccount = await getCloudAccount(key);

    if (cloudAccount || localAccount) {
      // Bỏ qua kiểm tra mã băm cho tài khoản admin nếu đúng mật khẩu gốc
      if (key === 'admin' && password === 'Toantrang2011@') {
         // Cho phép đăng nhập
      } else {
        // Validate password if cloud account exists
        if (cloudAccount && cloudAccount.passwordHash !== hashPassword(password)) {
          setError('Mật khẩu không đúng. Vui lòng thử lại.');
          setLoading(false);
          return;
        } else if (!cloudAccount && localAccount && localAccount.passwordHash !== hashPassword(password)) {
          setError('Mật khẩu không đúng. Vui lòng thử lại (Offline mode).');
          setLoading(false);
          return;
        }
      }

      let bestPlayerData = null;
      let needCloudSync = false;

      if (cloudAccount && localAccount) {
        const localTime = localAccount.updatedAt || 0;
        const cloudTime = cloudAccount.updatedAt || 0;
        
        // Nếu Local mới hơn Cloud (VD: do tắt tab đột ngột trước khi kịp sync Cloud)
        if (localTime > cloudTime) {
          console.log("Local data is newer than Cloud! Using Local.");
          bestPlayerData = localAccount.playerData;
          needCloudSync = true;
        } else {
          console.log("Cloud data is newer or equal. Using Cloud.");
          bestPlayerData = cloudAccount.playerData;
        }
      } else if (cloudAccount) {
        bestPlayerData = cloudAccount.playerData;
      } else {
        bestPlayerData = localAccount.playerData;
        needCloudSync = true;
      }

      // Cập nhật lại localStorage
      if (cloudAccount) {
         localAccounts[key] = {
           passwordHash: cloudAccount.passwordHash,
           playerData: bestPlayerData,
           updatedAt: Date.now()
         };
         saveAccounts(localAccounts);
      }

      if (needCloudSync && isFirebaseReady()) {
         savePlayerProgress(key, bestPlayerData).catch(() => {});
      }

      setSession(key);
      onLogin(key, JSON.parse(JSON.stringify(bestPlayerData)));
      setLoading(false);
      return;
    }

    // 2. Fallback: kiểm tra localStorage (tài khoản cũ chưa migrate)
    const accounts = getAccounts();
    const account = accounts[key];
    if (!account) {
      setError('Tài khoản không tồn tại. Hãy đăng ký mới.');
      setLoading(false);
      return;
    }
    if (account.passwordHash !== hashPassword(password)) {
      setError('Mật khẩu không đúng. Vui lòng thử lại.');
      setLoading(false);
      return;
    }
    // Tự động migrate tài khoản cũ lên Cloud
    saveCloudAccount(key, account.passwordHash, account.playerData).catch(() => {});
    setSession(key);
    onLogin(key, JSON.parse(JSON.stringify(account.playerData)));
    setLoading(false);
  };

  const handleRegister = async () => {
    setError('');
    if (!fullName.trim()) { setError('Vui lòng nhập họ và tên học sinh.'); return; }
    if (!className.trim()) { setError('Vui lòng nhập tên lớp học (ví dụ: 6A1, 9B...).'); return; }
    if (!playerName.trim()) { setError('Vui lòng nhập tên Chúa công (Tên ingame).'); return; }
    if (!username.trim() || !password) { setError('Vui lòng nhập đầy đủ tên tài khoản và mật khẩu.'); return; }
    if (username.trim().length < 3) { setError('Tên tài khoản phải có ít nhất 3 ký tự.'); return; }
    if (password.length < 4) { setError('Mật khẩu phải có ít nhất 4 ký tự.'); return; }
    if (password !== confirmPassword) { setError('Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.'); return; }
    const key = username.trim().toLowerCase();
    setLoading(true);

    // Kiểm tra tên đã tồn tại trên Cloud
    const existing = await getCloudAccount(key);
    if (existing) { setError('Tên tài khoản đã tồn tại. Hãy chọn tên khác.'); setLoading(false); return; }
    
    // Kiểm tra cả localStorage
    const accounts = getAccounts();
    if (accounts[key]) { setError('Tên tài khoản đã tồn tại. Hãy chọn tên khác.'); setLoading(false); return; }

    const newPlayerData: PlayerState = {
      fullName: fullName.trim(),
      grade: Number(grade),
      className: className.trim().toUpperCase(),
      username: key,
      playerName: playerName.trim(),
      legionName: legionName.trim() || `Quân Đoàn ${playerName.trim()}`,
      gold: 0,
      normalTickets: 0,
      premiumTickets: 0,
      artifactTickets: 0,
      legionTickets: 0,
      permArtifacts: [],
      jade: 0,
      inventory: [],
      lineup: [null, null, null, null, null, null],
      permLineup: [null, null, null, null, null, null],
      currentChapter: 1,
      progress: { 1: 1 },
      mathProgress: {},
      seenMathQuestions: []
    };
    const pwHash = hashPassword(password);

    // Lưu lên Cloud Firebase (cách như ưu tiên)
    const cloudOk = await saveCloudAccount(key, pwHash, newPlayerData);
    
    // Lưu backup vào localStorage
    accounts[key] = { passwordHash: pwHash, playerData: newPlayerData };
    saveAccounts(accounts);
    
    if (!cloudOk) {
      console.warn('Không lưu được lên Cloud, chỉ lưu local. Học sinh cần chơi trên cùng thiết bị/trình duyệt.');
    }
    setSession(key);
    onLogin(key, newPlayerData);
    setLoading(false);
  };

  const handleGuestLogin = () => {
    const guestKey = `guest_${Date.now()}`;
    const guestData: PlayerState = {
      playerName: `Khách ${Math.floor(Math.random() * 10000)}`,
      legionName: 'Lãng Khách',
      gold: 50000,
      normalTickets: 10,
      premiumTickets: 5,
      jade: 500,
      inventory: [INITIAL_HEROES[0], INITIAL_HEROES[1], INITIAL_HEROES[2], INITIAL_HEROES[3]],
      lineup: [INITIAL_HEROES[0].id, INITIAL_HEROES[1].id, INITIAL_HEROES[2].id, INITIAL_HEROES[3].id, null, null],
      currentChapter: 1,
      progress: { 1: 0 },
      mathProgress: {},
      seenMathQuestions: [],
      isGuest: true,
      permArtifacts: []
    };
    
    // Save to local storage only
    const accounts = getAccounts();
    accounts[guestKey] = {
      username: guestKey,
      passwordHash: '',
      playerData: guestData,
      updatedAt: Date.now()
    };
    localStorage.setItem("sv_accounts", JSON.stringify(accounts));
    setSession(guestKey);
    onLogin(guestKey, guestData);
  };

  return (
    <div className="min-h-screen viet-bg flex items-center justify-center p-6 text-stone-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/vietnam_map.png')` }}></div>
      {/* Cánh hoa sen rơi */}
      {[...Array(14)].map((_, i) => (
        <div key={i} className="petal" style={{
          left: `${4 + i * 7}%`,
          background: ['#e75480','#ffb7c5','#ff9cb4','#ffd1dc','#ff6b9d'][i % 5],
          animationName: i % 2 === 0 ? 'petalFall' : 'petalDrift',
          animationDuration: `${5 + (i * 1.3 % 4)}s`,
          animationDelay: `${i * 0.55}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          width: `${10 + i % 4 * 3}px`,
          height: `${14 + i % 3 * 4}px`,
          borderRadius: i % 2 === 0 ? '50% 0 50% 0' : '0 50% 0 50%',
        }}/>
      ))}
      {/* Đèn lồng trái */}
      <div className="absolute top-0 left-10 lantern opacity-75">
        <svg width="28" height="55" viewBox="0 0 28 55" fill="none"><line x1="14" y1="0" x2="14" y2="7" stroke="#C9941A" strokeWidth="2"/><ellipse cx="14" cy="12" rx="9" ry="5" fill="#B8860B"/><rect x="5" y="12" width="18" height="25" rx="3" fill="#CC1100"/><line x1="5" y1="19" x2="23" y2="19" stroke="#C9941A" strokeWidth="0.8" opacity="0.6"/><line x1="5" y1="26" x2="23" y2="26" stroke="#C9941A" strokeWidth="0.8" opacity="0.6"/><line x1="5" y1="33" x2="23" y2="33" stroke="#C9941A" strokeWidth="0.8" opacity="0.6"/><ellipse cx="14" cy="37" rx="9" ry="5" fill="#B8860B"/><line x1="10" y1="42" x2="8" y2="55" stroke="#C9941A" strokeWidth="1.5"/><line x1="14" y1="42" x2="14" y2="55" stroke="#C9941A" strokeWidth="1.5"/><line x1="18" y1="42" x2="20" y2="55" stroke="#C9941A" strokeWidth="1.5"/><circle cx="14" cy="24" r="5" fill="#FF8C00" opacity="0.4"/></svg>
      </div>
      {/* Đèn lồng phải */}
      <div className="absolute top-0 right-10 opacity-75" style={{display:'inline-block', animation:'lanternSwing 3s ease-in-out infinite', animationDelay:'1.5s', transformOrigin:'top center', filter:'drop-shadow(0 0 8px rgba(255,150,30,0.7))'}}>
        <svg width="28" height="55" viewBox="0 0 28 55" fill="none"><line x1="14" y1="0" x2="14" y2="7" stroke="#C9941A" strokeWidth="2"/><ellipse cx="14" cy="12" rx="9" ry="5" fill="#B8860B"/><rect x="5" y="12" width="18" height="25" rx="3" fill="#CC1100"/><line x1="5" y1="19" x2="23" y2="19" stroke="#C9941A" strokeWidth="0.8" opacity="0.6"/><line x1="5" y1="26" x2="23" y2="26" stroke="#C9941A" strokeWidth="0.8" opacity="0.6"/><line x1="5" y1="33" x2="23" y2="33" stroke="#C9941A" strokeWidth="0.8" opacity="0.6"/><ellipse cx="14" cy="37" rx="9" ry="5" fill="#B8860B"/><line x1="10" y1="42" x2="8" y2="55" stroke="#C9941A" strokeWidth="1.5"/><line x1="14" y1="42" x2="14" y2="55" stroke="#C9941A" strokeWidth="1.5"/><line x1="18" y1="42" x2="20" y2="55" stroke="#C9941A" strokeWidth="1.5"/><circle cx="14" cy="24" r="5" fill="#FF8C00" opacity="0.4"/></svg>
      </div>

      <div className="scroll-bg max-w-lg w-full p-10 rounded-[3.5rem] text-center shadow-2xl relative z-10">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-900/40"/>
          <ScrollText size={60} className="text-amber-900 float-up"/>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-900/40"/>
        </div>
        <h2 className="text-3xl font-cinzel font-black uppercase tracking-widest text-amber-950 mb-1">Sử Việt Anh Hùng</h2>
        <p className="text-[11px] text-amber-900/55 font-bold uppercase tracking-[0.3em] font-cinzel mb-7">⚔ Toán Học Kỳ Thư ⚔</p>

        {/* Tab Đăng Nhập / Đăng Ký */}
        <div className="flex rounded-2xl overflow-hidden border-2 border-amber-900/20 mb-6">
          <button id="auth-login-tab" onClick={() => { setTab('login'); setError(''); }}
            className={`flex-1 py-3 font-black uppercase text-sm transition-all ${
              tab === 'login' ? 'bg-amber-950 text-amber-200' : 'bg-white/40 text-amber-900 hover:bg-white/60'
            }`}>
            🔑 Đăng Nhập
          </button>
          <button id="auth-register-tab" onClick={() => { setTab('register'); setError(''); }}
            className={`flex-1 py-3 font-black uppercase text-sm transition-all ${
              tab === 'register' ? 'bg-amber-950 text-amber-200' : 'bg-white/40 text-amber-900 hover:bg-white/60'
            }`}>
            📜 Đăng Ký
          </button>
        </div>

        {tab === 'login' ? (
          <div className="space-y-4 text-left">
            <div>
              <label className="text-[10px] font-black uppercase text-amber-900/60 mb-1.5 block tracking-widest">Tên tài khoản</label>
              <input id="auth-username" type="text" placeholder="Nhập tên tài khoản..."
                className="w-full bg-white/70 border-2 border-amber-900/30 p-3.5 rounded-xl font-bold outline-none focus:border-amber-900 transition-colors"
                value={username} onChange={e => setUsername(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>
            <div>
              <label className="text-[10px] font-black uppercase text-amber-900/60 mb-1.5 block tracking-widest">Mật khẩu</label>
              <input id="auth-password" type="password" placeholder="Nhập mật khẩu..."
                className="w-full bg-white/70 border-2 border-amber-900/30 p-3.5 rounded-xl font-bold outline-none focus:border-amber-900 transition-colors"
                value={password} onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleLogin()} />
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 font-bold text-sm py-2.5 px-4 rounded-xl">{error}</div>}
            <button id="auth-login-btn" onClick={handleLogin}
              className="gold-shimmer-btn px-10 py-4 rounded-2xl font-black uppercase w-full text-base shadow-xl transition-all active:scale-95 border border-amber-600/30 mt-2">
              ⚔ Vào Đại Nghiệp
            </button>
            <button onClick={handleGuestLogin}
              className="w-full bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold py-3 rounded-2xl border border-stone-600 transition-colors uppercase text-sm mt-2">
              Chơi Ngay Không Cần Đăng Ký
            </button>
          </div>
        ) : (
          <div className="space-y-3.5 text-left">
            <div>
              <label className="text-[10px] font-black uppercase text-amber-900/70 mb-1 block tracking-wider">Họ & Tên học sinh (*)</label>
              <input id="reg-fullname" type="text" placeholder="VD: Nguyễn Văn An..."
                className="w-full bg-white/80 border-2 border-amber-900/30 p-2.5 rounded-xl font-bold text-sm outline-none focus:border-amber-900 transition-colors"
                value={fullName} onChange={e => setFullName(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-black uppercase text-amber-900/70 mb-1 block tracking-wider">Khối Thí Luyện (*)</label>
                <select 
                  value={grade} 
                  onChange={e => {
                    const g = Number(e.target.value);
                    setGrade(g);
                    if (!className || className.match(/^[6-9]/)) {
                      setClassName(`${g}A1`);
                    }
                  }}
                  className="w-full bg-white/80 border-2 border-amber-900/30 p-2.5 rounded-xl font-bold text-sm outline-none focus:border-amber-900 transition-colors"
                >
                  <option value={6}>Khối 6</option>
                  <option value={7}>Khối 7</option>
                  <option value={8}>Khối 8</option>
                  <option value={9}>Khối 9</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-amber-900/70 mb-1 block tracking-wider">Lớp (*)</label>
                <input id="reg-classname" type="text" placeholder="VD: 6A1, 9B..."
                  className="w-full bg-white/80 border-2 border-amber-900/30 p-2.5 rounded-xl font-bold text-sm outline-none focus:border-amber-900 transition-colors uppercase"
                  value={className} onChange={e => setClassName(e.target.value.toUpperCase())} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-black uppercase text-amber-900/70 mb-1 block tracking-wider">Tên Chúa công (In-game) (*)</label>
                <input id="reg-playername" type="text" placeholder="VD: Hưng Đạo..."
                  className="w-full bg-white/80 border-2 border-amber-900/30 p-2.5 rounded-xl font-bold text-sm outline-none focus:border-amber-900 transition-colors"
                  value={playerName} onChange={e => setPlayerName(e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-amber-900/70 mb-1 block tracking-wider">Tên Quân Đoàn (*)</label>
                <input id="reg-legionname" type="text" placeholder="VD: Đông A..."
                  className="w-full bg-white/80 border-2 border-amber-900/30 p-2.5 rounded-xl font-bold text-sm outline-none focus:border-amber-900 transition-colors"
                  value={legionName} onChange={e => setLegionName(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black uppercase text-amber-900/70 mb-1 block tracking-wider">Tên tài khoản (đăng nhập) (*)</label>
              <input id="reg-username" type="text" placeholder="Ít nhất 3 ký tự (viết liền không dấu)..."
                className="w-full bg-white/80 border-2 border-amber-900/30 p-2.5 rounded-xl font-bold text-sm outline-none focus:border-amber-900 transition-colors"
                value={username} onChange={e => setUsername(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] font-black uppercase text-amber-900/70 mb-1 block tracking-wider">Mật khẩu (*)</label>
                <input id="reg-password" type="password" placeholder="Ít nhất 4 ký tự..."
                  className="w-full bg-white/80 border-2 border-amber-900/30 p-2.5 rounded-xl font-bold text-sm outline-none focus:border-amber-900 transition-colors"
                  value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-amber-900/70 mb-1 block tracking-wider">Xác nhận mật khẩu (*)</label>
                <input id="reg-confirm" type="password" placeholder="Nhập lại mật khẩu..."
                  className="w-full bg-white/80 border-2 border-amber-900/30 p-2.5 rounded-xl font-bold text-sm outline-none focus:border-amber-900 transition-colors"
                  value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleRegister()} />
              </div>
            </div>
            {error && <div className="bg-red-50 border border-red-200 text-red-700 font-bold text-sm py-2 px-3 rounded-xl">{error}</div>}
            <button id="reg-register-btn" onClick={handleRegister}
              className="gold-shimmer-btn px-10 py-3.5 rounded-2xl font-black uppercase w-full text-base shadow-xl transition-all active:scale-95 border border-amber-600/30 mt-1">
              📜 Lập Đế Nghiệp Mới
            </button>
          </div>
        )}
        <p className="text-[10px] text-amber-900/35 italic font-cinzel tracking-widest mt-7">「 Nam quốc sơn hà Nam đế cư 」</p>
      </div>
    </div>
  );
};

// ====================================================

const App: React.FC = () => {
  // --- Auth state ---
  const [currentUser, setCurrentUser] = useState<string | null>(() => {
    const sess = getSession();
    if (sess && getAccounts()[sess]) return sess;
    return null;
  });

  const [view, setView] = useState<'auth' | 'chapter-select' | 'chapter-hub' | 'kinh-luan-grade' | 'kinh-luan-topic' | 'kinh-luan-lesson' | 'lesson-summary' | 'quiz-setup' | 'quiz-play' | 'quiz-result' | 'shop' | 'summon' | 'danh-trai' | 'quan-doan' | 'danh-vong-dai' | 'combat-play' | 'quoc-tu-giam' | 'hero-trial' | 'admin' | 'tu-luyen-play' | 'tu-luyen-menu' | 'tu-hao-su-viet'>(() => {
    const sess = getSession();
    if (sess && getAccounts()[sess]) return 'chapter-select';
    return 'auth';
  });
  const [activeChapter, setActiveChapter] = useState<number>(1);
  const [selectedGrade, setSelectedGrade] = useState<number>(() => {
    const sess = getSession();
    if (sess) {
      const accts = getAccounts();
      if (accts[sess]?.playerData?.grade) return accts[sess].playerData.grade;
    }
    return 6;
  });
  const [selectedMathChapterIdx, setSelectedMathChapterIdx] = useState<number>(0);
  const [selectedMathLessonIdx, setSelectedMathLessonIdx] = useState<number>(0);
  const [combatMode, setCombatMode] = useState<'campaign' | 'hero-trial' | 'arena'>('campaign');
  const [arenaMatchData, setArenaMatchData] = useState<any>(null);
  const [activeTrialStage, setActiveTrialStage] = useState<number>(0);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [hubScaleX, setHubScaleX] = useState(1);
  const [hubScaleY, setHubScaleY] = useState(1);
  // isLandscape = true khi màn hình ngang — bao gồm cả điện thoại xoay ngang
  const [isLandscape, setIsLandscape] = useState(() => window.innerWidth > window.innerHeight);

  useEffect(() => {
    const checkOrientation = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', () => setTimeout(checkOrientation, 150));
    return () => {
      window.removeEventListener('resize', checkOrientation);
    };
  }, []);

  useEffect(() => {
    if (view !== 'chapter-hub') return;
    const updateLayout = () => {
      // Dùng viewport container nếu có, fallback sang window dimensions
      const w = viewportRef.current?.clientWidth ?? window.innerWidth;
      const h = viewportRef.current?.clientHeight ?? Math.max(window.innerHeight - 56, 100);
      setHubScaleX(w / 1920);
      setHubScaleY(h / 1080);
    };

    updateLayout();
    window.addEventListener('resize', updateLayout);
    const resizeObserver = new ResizeObserver(updateLayout);
    if (viewportRef.current) resizeObserver.observe(viewportRef.current);
    
    return () => {
      window.removeEventListener('resize', updateLayout);
      resizeObserver.disconnect();
    };
  }, [view, isLandscape]);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  // Toast thông báo khi click chương bị khóa
  const [lockedChapterToast, setLockedChapterToast] = useState<{ chapterNum: number; reason?: string } | null>(null);
  // Lưu lessonId đang học trong Thí Luyện Đường
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  // Tổng số câu gốc của bài đang chơi (dùng để check hoàn thành)
  const [tuLuyenTotalQ, setTuLuyenTotalQ] = useState<number>(0);
  // Đang ở chế độ ôn tập (tất cả câu đã làm) hay chơi thật
  const [tuLuyenIsReview, setTuLuyenIsReview] = useState<boolean>(false);
  
  const [player, setPlayer] = useState<PlayerState>(() => {
    const sess = getSession();
    if (sess) {
      const accts = getAccounts();
      if (accts[sess]) {
        const pd = JSON.parse(JSON.stringify(accts[sess].playerData));
        if (!pd.permLineup) pd.permLineup = [null, null, null, null, null, null];
        if (pd.legionTickets === undefined) pd.legionTickets = 0;
        // Khởi tạo trường tiến trình mở khóa nếu chưa có (tài khoản cũ)
        if (!pd.unlockedChapters) pd.unlockedChapters = [1];
        if (!pd.tuLuyenCorrectIds) pd.tuLuyenCorrectIds = {};
        if (!pd.tuLuyenUnlockedLessons) pd.tuLuyenUnlockedLessons = ['B1'];
        
        // Force sync inventory with latest game data (stats & text descriptions)
        if (pd.inventory) {
          pd.inventory = syncHeroInventoryStats(pd.inventory);
        }
        
        return pd;
      }
    }
    return {
      playerName: '',
      legionName: '',
      gold: 0,
      normalTickets: 0,
      premiumTickets: 0,
      artifactTickets: 0,
      legionTickets: 0,
      permArtifacts: [],
      jade: 0,
      inventory: [], 
      lineup: [null, null, null, null, null, null],
      permLineup: [null, null, null, null, null, null],
      currentChapter: 1,
      progress: { 1: 1 },
      mathProgress: {}, 
      seenMathQuestions: [],
      unlockedChapters: [1],
      tuLuyenCorrectIds: {},
      tuLuyenUnlockedLessons: ['B1'],
    };
  });

  // ========= CLOUD SYNC STATE =========
  const [syncStatus, setSyncStatus] = useState<'idle' | 'saving' | 'saved' | 'offline'>('idle');
  const syncTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hàm lưu tiến độ: localStorage (backup offline) + Firebase Cloud (chính)
  const persistPlayerData = React.useCallback(async (data: PlayerState, user: string, isForced = false) => {
    // 1. Luôn lưu vào localStorage làm backup offline
    try {
      const accts = getAccounts();
      if (accts[user]) {
        accts[user].playerData = data;
        accts[user].updatedAt = Date.now();
        saveAccounts(accts);
      }
    } catch (e) {
      console.warn("Lỗi lưu localStorage:", e);
    }

    // 2. Lưu lên Firebase Cloud
    if (!isFirebaseReady()) {
      setSyncStatus('offline');
      return;
    }
    setSyncStatus('saving');
    try {
      const ok = await savePlayerProgress(user, data);
      if (ok) {
        setSyncStatus('saved');
        // Fire-and-forget analytics (không block)
        updateStudentAnalytics(user, data).catch(() => {});
        // Reset về idle sau 3 giây
        setTimeout(() => setSyncStatus('idle'), 3000);
      } else {
        setSyncStatus('offline');
      }
    } catch (e) {
      setSyncStatus('offline');
    }
  }, []);

  // Auto-save với debounce 3 giây khi player state thay đổi
  useEffect(() => {
    if (!currentUser) return;
    setSyncStatus('saving');
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => {
      persistPlayerData(player, currentUser);
    }, 3000);
    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    };
  }, [player, currentUser, persistPlayerData]);

  // Force-save ngay khi tab bị ẩn (người dùng chuyển tab hoặc đóng trình duyệt)
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && currentUser) {
        if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
        persistPlayerData(player, currentUser, true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [player, currentUser, persistPlayerData]);

  const [combatUnits, setCombatUnits] = useState<{ ally: Hero[], enemy: Hero[] }>({ ally: [], enemy: [] });
  const [battleLogs, setBattleLogs] = useState<string[]>([]);
  const [battleActive, setBattleActive] = useState(false);
  const [combatResult, setCombatResult] = useState<'win' | 'lose' | null>(null);
  const [combatSpeed, setCombatSpeed] = useState(1);
  const [summonResults, setSummonResults] = useState<any[]>([]);
  const [correctTotal, setCorrectTotal] = useState(0);
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, any>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [lastReward, setLastReward] = useState<{ gold: number, ticket?: 'normal' | 'premium', speedLabel?: string } | null>(null);
  const [sessionRewards, setSessionRewards] = useState({ gold: 0, normal: 0, premium: 0, artifact: 0 });
  const [userDurations, setUserDurations] = useState<Record<number, number>>({});
  const [autoNext, setAutoNext] = useState(false);
  const [showCh9FactionModal, setShowCh9FactionModal] = useState(false);
  const questionStartTimeRef = React.useRef<number>(Date.now());

  useEffect(() => {
    questionStartTimeRef.current = Date.now();
  }, [currentIdx, currentQuestions]);

  const resetChapterAssets = (chapterNum: number) => {
    setPlayer(prev => {
      const permInventory = prev.inventory.filter(h => h.isPermanent === true);
      const permLineup = prev.lineup.map(id => {
        const h = permInventory.find(x => x.id === id);
        return h ? id : null;
      });
      return {
        ...prev,
        currentChapter: chapterNum,
        inventory: permInventory, 
        lineup: permLineup,
        artifacts: prev.permArtifacts ? [...prev.permArtifacts] : [],
        ch9Faction: undefined
      };
    });
  };

  /** Đăng xuất: lưu tiến độ ngay lập tức → xóa session → về màn hình auth */
  const handleLogout = async () => {
    if (currentUser) {
      // Hủy debounce đang chờ
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
      // Force-save ngay (không debounce)
      await persistPlayerData(player, currentUser, true);
    }
    clearSession();
    setCurrentUser(null);
    setView('auth');
  };

  const startQuiz = (count: number) => {
    const allQuestions = getQuestionsForLesson(selectedGrade, selectedMathChapterIdx, selectedMathLessonIdx);
    const correctKey = `g${selectedGrade}-c${selectedMathChapterIdx}-l${selectedMathLessonIdx}`;
    const correctIds = player.mathCorrectQuestions?.[correctKey] || [];
    
    // Lọc các câu CHƯA trả lời đúng
    const uncompleted = allQuestions.filter((q: any) => !correctIds.includes(q.id));
    
    // Nếu còn câu chưa hoàn thành thì chỉ lấy các câu chưa làm
    // Nếu đã hoàn thành toàn bộ (ôn tập) thì lấy từ allQuestions
    const pool = uncompleted.length > 0 
      ? uncompleted 
      : (allQuestions.length > 0 ? allQuestions : getMathQuestions(selectedGrade, selectedMathChapterIdx, selectedMathLessonIdx, count, []));
    
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(count, shuffled.length));

    setCurrentQuestions(selected);
    setCurrentIdx(0);
    setUserAnswers({});
    setUserDurations({});
    setShowFeedback(false);
    setCorrectTotal(0);
    setSessionRewards({ gold: 0, normal: 0, premium: 0, artifact: 0 });
    setView('quiz-play');
  };

  const startTuLuyen = () => {
    setView('tu-luyen-menu');
  };

  // Thứ tự mở bài trong Thí Luyện Đường
  const TU_LUYEN_LESSON_ORDER = [
    'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7',
    'B8', 'B9_10', 'B11', 'B12', 'B13',
    'C3_B13', 'C3_B14', 'C3_B15', 'C3_B16', 'C3_B17', 'C4'
  ];

  const startLessonTuLuyen = (lessonId: string, allQuestions: any[]) => {
    setActiveLessonId(lessonId);
    setTuLuyenTotalQ(allQuestions.length);
    // Lọc chỉ các câu chưa trả lời đúng trong bài này
    const correctIds = player.tuLuyenCorrectIds?.[lessonId] || [];
    const remaining = allQuestions.filter((q: any) => !correctIds.includes(q.id));
    // Nếu tất cả câu đã đúng: cho xem lại toàn bộ (review mode)
    const isReview = remaining.length === 0;
    setTuLuyenIsReview(isReview);
    const questionsToPlay = isReview ? allQuestions : remaining;
    setCurrentQuestions(questionsToPlay);
    setCurrentIdx(0);
    setUserAnswers({});
    setUserDurations({});
    setShowFeedback(false);
    setCorrectTotal(0);
    setSessionRewards({ gold: 0, normal: 0, premium: 0, artifact: 0 });
    setView('tu-luyen-play');
  };

  const handleTuLuyenResult = (correctCount: number, total: number) => {
    const percent = (correctCount / total) * 100;
    let gold = 0;
    let normal = 0;
    let premium = 0;
    
    gold += correctCount * 250;
    if (percent === 100) {
       gold += 2000;
       normal += 3;
       premium += 1;
    } else if (percent >= 80) {
       gold += 1000;
       normal += 1;
    }
    
    setSessionRewards({ gold, normal, premium, artifact: 0 });
    
    setPlayer(prev => {
       const newGold = prev.gold + gold;
       
       // Cập nhật danh sách câu đã đúng trong bài này
       let newTuLuyenCorrectIds = { ...(prev.tuLuyenCorrectIds || {}) };
       let newUnlockedLessons = [...(prev.tuLuyenUnlockedLessons || ['B1'])];
       let lessonCompleted = false;
       let nextLessonId: string | null = null;

       if (activeLessonId) {
         const existingCorrect = new Set(newTuLuyenCorrectIds[activeLessonId] || []);
         // Chỉ thêm câu đúng trong phiên này
         currentQuestions.forEach((q: any, idx: number) => {
           const ua = userAnswers[idx];
           const isCorrect = q.type === 'short_answer'
             ? isShortAnswerMatch(ua, q.correctAnswer)
             : (ua !== null && ua !== undefined && ua !== -1 && ua === q.correctAnswer);
           if (isCorrect && q.id) existingCorrect.add(q.id);
         });
         newTuLuyenCorrectIds[activeLessonId] = Array.from(existingCorrect);

         // Chỉ check mở bài khi KHÔNG phải review mode
         // Và phiên này đạt 100% (tất cả câu còn lại đều đúng)
         // Và số câu đúng tích lũy >= tổng số câu bài gốc
         const accumulatedCorrect = newTuLuyenCorrectIds[activeLessonId].length;
         if (!tuLuyenIsReview && percent === 100 && accumulatedCorrect >= tuLuyenTotalQ) {
           const lessonIdx = TU_LUYEN_LESSON_ORDER.indexOf(activeLessonId);
           if (lessonIdx >= 0 && lessonIdx < TU_LUYEN_LESSON_ORDER.length - 1) {
             nextLessonId = TU_LUYEN_LESSON_ORDER[lessonIdx + 1];
             if (!newUnlockedLessons.includes(nextLessonId)) {
               newUnlockedLessons.push(nextLessonId);
               lessonCompleted = true;
             }
           }
         }
       }

       // Thông báo mở bài mới sau khi state set
       if (lessonCompleted && nextLessonId) {
         const nextIdx = TU_LUYEN_LESSON_ORDER.indexOf(nextLessonId);
         setTimeout(() => alert(`🎉 Xuất sắc! Bạn đã hoàn thành ${activeLessonId}!\n✨ Bài ${nextIdx + 1} đã được mở khóa!`), 500);
       }

       return {
         ...prev,
         gold: newGold,
         normalTickets: prev.normalTickets + normal,
         premiumTickets: prev.premiumTickets + premium,
         tuLuyenCorrectIds: newTuLuyenCorrectIds,
         tuLuyenUnlockedLessons: newUnlockedLessons,
       };
    });
    
    setView('quiz-result');
  };

  const isShortAnswerMatch = (userVal: any, correctVal: any) => {
    if (userVal === null || userVal === undefined) return false;
    const u = userVal.toString().toLowerCase().trim().replace(/[{}]/g, '');
    const c = (correctVal ?? '').toString().toLowerCase().trim().replace(/[{}]/g, '');
    if (u === c) return true;
    if (u.replace(/,/g, '.') === c.replace(/,/g, '.')) return true;
    if ((u === '0.5' || u === '0,5' || u === '1/2') && (c === '0.5' || c === '0,5' || c === '1/2')) return true;
    return false;
  };

  const handleQuizResult = (correctCount: number, total: number) => {
    const percent = (correctCount / total) * 100;
    
    const record: any = {
       id: Date.now().toString(),
       username: player.playerName || 'Học sinh',
       timestamp: Date.now(),
       grade: selectedGrade,
       packageSize: currentQuestions.length,
       correctCount: correctCount,
       totalTimeSeconds: Object.values(userDurations).reduce((a, b) => a + b, 0),
       questions: currentQuestions.map((q, i) => ({
          questionText: q.question,
          options: q.options || [],
          userAnswer: userAnswers[i] ?? null,
          correctAnswer: q.correctAnswer,
          isCorrect: q.type === 'short_answer' 
            ? isShortAnswerMatch(userAnswers[i], q.correctAnswer)
            : (userAnswers[i] === q.correctAnswer),
          timeTakenSeconds: userDurations[i] || 0,
          explanation: q.explanation || ""
       }))
    };

    saveTrialRecord(record);

    // Thu thập ID các câu trả lời đúng trong phiên này
    const newlyCorrectIds: string[] = [];
    currentQuestions.forEach((q, i) => {
      const isCorrect = q.type === 'short_answer'
        ? isShortAnswerMatch(userAnswers[i], q.correctAnswer)
        : (userAnswers[i] !== null && userAnswers[i] !== undefined && userAnswers[i] !== -1 && userAnswers[i] === q.correctAnswer);
      if (isCorrect && q.id) {
        newlyCorrectIds.push(q.id);
      }
    });

    const goldEarned = correctCount * 300;
    let normalTicketsEarned = 0;
    let premiumTicketsEarned = 0;
    let justUnlockedNextLesson = false;
    let nextLessonName = '';

    setPlayer(prev => {
       const newHistory = [...(prev.trialHistory || []), record];
       const correctKey = `g${selectedGrade}-c${selectedMathChapterIdx}-l${selectedMathLessonIdx}`;
       const oldCorrectSet = new Set(prev.mathCorrectQuestions?.[correctKey] || []);
       newlyCorrectIds.forEach(id => oldCorrectSet.add(id));
       const updatedCorrectIds = Array.from(oldCorrectSet);

       const newMathCorrect = {
         ...(prev.mathCorrectQuestions || {}),
         [correctKey]: updatedCorrectIds
       };

       const allLessonQuestions = getQuestionsForLesson(selectedGrade, selectedMathChapterIdx, selectedMathLessonIdx);
       const totalLessonQ = allLessonQuestions.length > 0 ? allLessonQuestions.length : 60;
       const isLessonCompleted = updatedCorrectIds.length >= totalLessonQ;

       const progressKey = `g${selectedGrade}-c${selectedMathChapterIdx}`;
       const currentUnlocked = prev.mathProgress?.[progressKey] || 0;
       let newMathProgress = { ...(prev.mathProgress || {}) };

       if (isLessonCompleted && selectedMathLessonIdx >= currentUnlocked) {
          newMathProgress[progressKey] = selectedMathLessonIdx + 1;
          justUnlockedNextLesson = true;
          const chapter = MATH_DATA[selectedGrade]?.[selectedMathChapterIdx];
          const nextLesson = chapter?.lessons?.[selectedMathLessonIdx + 1];
          nextLessonName = nextLesson?.title || `Bài ${selectedMathLessonIdx + 2}`;
          normalTicketsEarned += 2;
          premiumTicketsEarned += 1;
       }

       return {
          ...prev,
          gold: (prev.gold || 0) + goldEarned,
          normalTickets: (prev.normalTickets || 0) + normalTicketsEarned,
          premiumTickets: (prev.premiumTickets || 0) + premiumTicketsEarned,
          mathProgress: newMathProgress,
          mathCorrectQuestions: newMathCorrect,
          trialHistory: newHistory
       };
    });

    setSessionRewards({ gold: goldEarned, normal: normalTicketsEarned, premium: premiumTicketsEarned, artifact: 0 });

    if (justUnlockedNextLesson) {
       setTimeout(() => {
          alert(`🎉 Chúc mừng Chúa công đã xuất sắc vượt qua tất cả câu hỏi!\n✨ Mở khóa: ${nextLessonName}\n🎁 Nhận thưởng vượt ải thành công!`);
       }, 600);
    }

    setView('quiz-result');
  };

  const performSummon = (type: 'normal' | 'premium' | 'artifact' | 'legion', count: number) => {
    let ticketKey = '';
    if (type === 'legion') ticketKey = 'legionTickets';
    else ticketKey = type === 'normal' ? 'normalTickets' : (type === 'premium' ? 'premiumTickets' : 'artifactTickets');
    
    if (((player[ticketKey as keyof PlayerState] as number) || 0) < count) return alert(`Lệnh bài đã hết!`);
    
    const newResults: any[] = [];
    if (type === 'artifact') {
       for (let i = 0; i < count; i++) {
          const a = ARTIFACTS[Math.floor(Math.random() * ARTIFACTS.length)];
          newResults.push({ ...a, rarity: 'SSR', star: 5, overall: 'Thần Khí', isArtifact: true, id: "artifact_" + Date.now() + "_" + i, baseId: a.id });
       }
       setPlayer(prev => ({ ...prev, [ticketKey]: (prev[ticketKey as keyof PlayerState] as number||0) - count, artifacts: [...(prev.artifacts||[]), ...newResults.map(r => r.baseId)] }));
    } else {
        const getRolledRarity = (summonType: string) => {
           const roll = Math.random() * 100;
           if (summonType === 'legion') {
               if (roll < 5) return Rarity.UR;
               if (roll < 15) return Rarity.SSR;
               if (roll < 45) return Rarity.SR;
               if (roll < 85) return Rarity.R;
               return Rarity.C;
           } else if (summonType === 'premium') {
               // UR 5%, SSR 15%, SR 50%, R 30%
               if (roll < 5) return Rarity.UR;
               if (roll < 20) return Rarity.SSR;
               if (roll < 70) return Rarity.SR;
               return Rarity.R;
           } else {
               // UR 1%, SSR 6%, SR 30%, R 43%, C 20%
               if (roll < 1) return Rarity.UR;
               if (roll < 7) return Rarity.SSR;
               if (roll < 37) return Rarity.SR;
               if (roll < 80) return Rarity.R;
               return Rarity.C;
           }
        };

        // Hàm fallback: nếu không có tướng nào ở rarity đó, xuống rarity thấp hơn
        const getHeroFromPool = (pool: any[], rarity: string) => {
           const rarityOrder = ['UR', 'SSR', 'SR', 'R', 'C'];
           let ri = rarityOrder.indexOf(rarity);
           while (ri < rarityOrder.length) {
             const valid = pool.filter(h => h.rarity === rarityOrder[ri]);
             if (valid.length > 0) return valid[Math.floor(Math.random() * valid.length)];
             ri++;
           }
           return pool[Math.floor(Math.random() * pool.length)];
        };

       if (type === 'legion') {
           const newHeroes = [];
           for (let i = 0; i < count; i++) {
              const rarity = getRolledRarity('legion');
              const validHeroes = INITIAL_HEROES.filter(h => h.rarity === rarity);
              const fallbackHeroes = validHeroes.length > 0 ? validHeroes : INITIAL_HEROES; // Fallback just in case
              const h = fallbackHeroes[Math.floor(Math.random() * fallbackHeroes.length)];
              const res = { ...h, id: "hero_" + Date.now() + "_" + i, fragments: 0, isPermanent: true };
              newResults.push(res);
              newHeroes.push(res);
           }
           setPlayer(prev => ({ 
             ...prev, 
             legionTickets: (prev.legionTickets||0) - count, 
             inventory: [...prev.inventory, ...newHeroes]
           }));
       } else {
           const pool = INITIAL_HEROES.filter(h => h.chapter === activeChapter);
           
           if (activeChapter === 9) {
              const factions = ['mac', 'le_trinh', 'nguyen'];
              let rolledFaction = player.ch9Faction;
              if (!rolledFaction) {
                  rolledFaction = factions[Math.floor(Math.random() * factions.length)];
              }
              const ch9Pool = pool.filter(h => h.subFaction === rolledFaction || h.subFaction === 'neutral');
              
              for (let i = 0; i < count; i++) {
                  const rarity = getRolledRarity(type);
                  const validHeroes = ch9Pool.filter(h => h.rarity === rarity);
                  const finalPool = validHeroes.length > 0 ? validHeroes : ch9Pool; // Fallback
                  const h = finalPool[Math.floor(Math.random() * finalPool.length)];
                  newResults.push({ ...h, id: "hero_" + Date.now() + "_" + i, fragments: 0, isPermanent: false });
              }
              setPlayer(prev => ({ ...prev, [ticketKey]: (prev[ticketKey as keyof PlayerState] as number) - count, inventory: [...prev.inventory, ...newResults], ch9Faction: rolledFaction }));
           } else {
              for (let i = 0; i < count; i++) {
                  const rarity = getRolledRarity(type);
                  const validHeroes = pool.filter(h => h.rarity === rarity);
                  const finalPool = validHeroes.length > 0 ? validHeroes : pool; // Fallback
                  const h = finalPool[Math.floor(Math.random() * finalPool.length)];
                  newResults.push({ ...h, id: "hero_" + Date.now() + "_" + i, fragments: 0, isPermanent: false });
              }
              setPlayer(prev => ({ ...prev, [ticketKey]: (prev[ticketKey as keyof PlayerState] as number) - count, inventory: [...prev.inventory, ...newResults] }));
           }
       }
    }
    setSummonResults(newResults);
  };

  const initCombat = () => {
    setCombatMode('campaign');
    if (player.lineup.filter(Boolean).length === 0) return alert("Danh Trại trống không! Chúa công cần vào mục Kinh Luân để kiếm lệnh bài chiêu mộ quân đội.");

    let initialAllies: any[] = player.lineup.map((id, index) => {
        if (!id) return null;
        const raw = player.inventory.find(h => h.id === id);
        if (!raw) return null;
        const a = calculateHeroStatsWithStar(raw, raw.star || 1);
        const base = INITIAL_HEROES.find(h => h.name === a.name || h.id === a.id);
        const heroImg = base ? base.image : a.image;
        let buffedAtk = a.atk;
        let buffedDef = a.def;
        let buffedSpd = a.spd;
        let buffedHp = a.maxHp;
        
        const artId = a.artifactId || (a as any).equippedArtifactId;
        if (artId) {
            const art = ARTIFACTS.find(ar => ar.id === artId);
            if (art && (art.exclusiveTo?.includes(a.id) || art.exclusiveTo?.some(id => a.id.startsWith(id + '_')))) {
               buffedAtk += (art.bonusAtk || 0) + Math.floor(a.atk * ((art.bonusAtkPc || 0) / 100));
               buffedDef += (art.bonusDef || 0) + Math.floor(a.def * ((art.bonusDefPc || 0) / 100));
               buffedSpd += (art.bonusSpd || 0) + Math.floor(a.spd * ((art.bonusSpdPc || 0) / 100));
               buffedHp += (art.bonusHp || 0) + Math.floor(a.maxHp * ((art.bonusHpPc || 0) / 100));
            }
        }
        
        return { ...a, image: heroImg, faction: 'ally', isAlly: true, atk: buffedAtk, def: buffedDef, spd: buffedSpd, maxHp: buffedHp, hp: buffedHp, gridPosition: index };
    }).filter(Boolean);

    let initialEnemies: any[] = [];

    if (activeChapter === 9) {
      // Logic đặc biệt cho Chương 9: Nội chiến Nam Bắc Triều
      const factions = ['mac', 'le_trinh', 'nguyen'];
      const playerFaction = player.ch9Faction || 'mac';
      const availableEnemyFactions = factions.filter(f => f !== playerFaction);
      const enemyFaction = availableEnemyFactions[Math.floor(Math.random() * availableEnemyFactions.length)];

      const ch9Heroes = INITIAL_HEROES.filter(h => h.chapter === 9); 
      const ePool = ch9Heroes.filter(h => h.subFaction === enemyFaction);
      
      const shuffledEPool = [...ePool].sort(() => 0.5 - Math.random());
      const selectedE = shuffledEPool.slice(0, 5);

      const hasNeutral = initialAllies.some(h => h.subFaction === 'neutral');
      if (!hasNeutral) {
         const neutralHero = ch9Heroes.find(h => h.subFaction === 'neutral');
         if (neutralHero) {
            selectedE.push(neutralHero);
         }
      }

      const factionNames: Record<string, string> = {
        'mac': 'Bắc Triều (Nhà Mạc)',
        'le_trinh': 'Nam Triều (Vua Lê - Chúa Trịnh)',
        'nguyen': 'Đàng Trong (Chúa Nguyễn)'
      };

      initialEnemies = selectedE.map((e, idx) => {
         let buffedAtk = e.atk;
         let buffedDef = e.def;
         let buffedSpd = e.spd;
         let buffedHp = e.maxHp;
         return { ...e, faction: 'enemy', atk: buffedAtk, def: buffedDef, spd: buffedSpd, maxHp: buffedHp, hp: buffedHp, id: e.id + '_' + Math.random(), gridPosition: idx };
      });
      
      alert(`CHƯƠNG 9 - NỘI CHIẾN TAM PHÂN: \nPhe bạn: ${factionNames[playerFaction] || playerFaction.toUpperCase()}\nĐối đầu với phe địch: ${factionNames[enemyFaction] || enemyFaction.toUpperCase()}`);

    } else {
      const enemyPool = ENEMY_HEROES.filter(h => h.chapter === activeChapter);
      const shuffledPool = [...enemyPool].sort(() => 0.5 - Math.random());
      const selectedEnemies = shuffledPool.slice(0, 6);
      while (selectedEnemies.length < 6) {
         selectedEnemies.push(enemyPool[Math.floor(Math.random() * enemyPool.length)]);
      }

      initialEnemies = selectedEnemies.map((e, idx) => {
         let buffedAtk = e.atk;
         let buffedDef = e.def;
         let buffedSpd = e.spd;
         let buffedHp = e.maxHp;
         const art = ARTIFACTS.find(ar => ar.exclusiveTo?.includes(e.id) || ar.exclusiveTo?.some(id => e.id.startsWith(id + '_')));
         if (art) {
            buffedAtk += (art.bonusAtk || 0) + Math.floor(e.atk * ((art.bonusAtkPc || 0) / 100));
            buffedDef += (art.bonusDef || 0) + Math.floor(e.def * ((art.bonusDefPc || 0) / 100));
            buffedSpd += (art.bonusSpd || 0) + Math.floor(e.spd * ((art.bonusSpdPc || 0) / 100));
            buffedHp += (art.bonusHp || 0) + Math.floor(e.maxHp * ((art.bonusHpPc || 0) / 100));
         }
         return { ...e, faction: 'enemy', atk: buffedAtk, def: buffedDef, spd: buffedSpd, maxHp: buffedHp, hp: buffedHp, id: e.id + '_' + Math.random(), gridPosition: idx };
      });
    }

    const allUnits = [...initialAllies, ...initialEnemies];
    const newLogs = ["Hai bên giáp trận!"];
    
    SYNERGIES.forEach(syn => {
      const hasAll = syn.heroIds.every(reqId => allUnits.some(u => u.id.startsWith(reqId + '_')));
      if (hasAll) {
         syn.applyEffect(allUnits, (msg) => newLogs.push(msg));
      }
    });

    setCombatUnits({ ally: initialAllies, enemy: initialEnemies });
    setBattleLogs(newLogs); setCombatResult(null); setBattleActive(true); setView('combat-play');
  };

  const advanceChapter = () => {
    const nextChapter = activeChapter + 1;
    
    // Kiểm tra điều kiện Học Toán cho chương tiếp theo
    let isMathDone = true;
    const unlockedLessons = player.tuLuyenUnlockedLessons || ['B1'];
    if (nextChapter === 2) isMathDone = unlockedLessons.includes('B8');
    else if (nextChapter === 3) isMathDone = unlockedLessons.includes('C3_B13');
    else if (nextChapter === 4) isMathDone = unlockedLessons.includes('C4');

    setPlayer(prev => {
      const newState = { ...prev };
      newState.legionTickets = (newState.legionTickets || 0) + 1;
      // Lưu lại tiến trình chinh phạt để biết đã hoàn thành combat chương này
      const already = newState.unlockedChapters || [1];
      if (!already.includes(nextChapter) && nextChapter <= 10) {
        newState.unlockedChapters = [...already, nextChapter];
      }
      if (nextChapter <= 10) {
         newState.progress = { ...(newState.progress || {}), [nextChapter]: 1 };
      }
      return newState;
    });

    if (isMathDone) {
      setTimeout(() => alert(`Chúc mừng Bệ hạ đã bình định thành công! Nhận được: 1 Vé Triệu Hồi Quân Đoàn (Vĩnh viễn)!\nChương ${nextChapter} đã được mở khóa trên Bản Đồ!`), 100);
      if (nextChapter <= 10) {
        setActiveChapter(nextChapter);
        resetChapterAssets(nextChapter);
        setView('chapter-hub');
      } else {
        setView('chapter-select');
      }
    } else {
      setTimeout(() => alert(`Chúc mừng Bệ hạ đã bình định thành công! Nhận được: 1 Vé Triệu Hồi Quân Đoàn (Vĩnh viễn)!\n\n⚠️ Tướng địch đã bị tiêu diệt nhưng Bản Đồ Chương ${nextChapter} vẫn chưa mở.\nChúa công vui lòng hoàn thành "Toán Chương ${nextChapter - 1}" trong Thí Luyện Đường để có thể tiến quân!`), 100);
      setView('chapter-select');
    }
  };

  
  const handleArenaEnd = async (resultStr: 'win' | 'lose') => {
    if (!arenaMatchData) return;
    const isWin = resultStr === 'win';
    
    // ELO logic
    const kFactor = 32;
    const expectedScore = 1 / (1 + Math.pow(10, ((arenaMatchData.opponentScore || 1000) - (player.arenaScore || 1000)) / 400));
    const scoreDiff = Math.round(kFactor * ((isWin ? 1 : 0) - expectedScore));
    const pointChange = isWin ? Math.max(10, scoreDiff) : Math.min(-10, scoreDiff);
    
    const newScore = Math.max(0, (player.arenaScore || 1000) + pointChange);

    // Save to Firebase
    await updateArenaScore(player.username || 'guest', newScore);
    
    // Update local state
    setPlayer(prev => ({
        ...prev,
        arenaScore: newScore
    }));
    
    // Pass info to UI by storing the change in arenaMatchData
    setArenaMatchData(prev => ({
        ...prev,
        pointChange,
        newScore,
        oldScore: player.arenaScore || 1000,
        resultStr
    }));
  };

  const initArenaCombat = (myLineup: any[], enemyLineup: any[], matchData: any) => {
    setCombatMode('arena');
    setArenaMatchData(matchData);
    
    const processHero = (a: any, index: number, isAlly: boolean) => {
        if (!a) return null;
        return {
            id: isAlly ? `ally_${index}` : `enemy_${index}`,
            name: a.name,
            hp: a.maxHp || a.hp || 1,
            maxHp: a.maxHp || a.hp || 1,
            atk: a.atk,
            def: a.def,
            spd: a.spd,
            morale: 0,
            image: a.image,
            isAlly: isAlly,
            faction: isAlly ? 'ally' : 'enemy',
            gridPosition: index,
            skillEffect: a.skillEffect || null,
            skillName: a.skillName,
            skillDmgMult: a.skillDmgMult,
            targetScope: a.targetScope
        };
    };

    const allies = myLineup.map((h, i) => processHero(h, i, true)).filter(Boolean);
    const enemies = enemyLineup.map((h, i) => processHero(h, i, false)).filter(Boolean);

    setCombatUnits({ ally: allies, enemy: enemies });
    setBattleLogs(["[ĐẤU TRƯỜNG BÁ VƯƠNG] Trận chiến bắt đầu!"]);
    setCombatResult(null);
    setBattleActive(true);
    setCombatSpeed(1);
    setView('combat-play');
  };

  const initTrialCombat = (stageId: number, trialEnemies: Hero[]) => {
    setActiveTrialStage(stageId);
    setCombatMode('hero-trial');
    if ((player.permLineup || []).filter(Boolean).length === 0) return alert("Không có Tướng vĩnh viễn nào trong Quân đoàn!");
    
    const initialAllies = (player.permLineup || []).map((id, index) => {
        if (!id) return null;
        const raw = player.inventory.find(h => h.id === id);
        if (!raw) return null;
        const a = calculateHeroStatsWithStar(raw, raw.star || 1);
        const base = INITIAL_HEROES.find(h => h.name === a.name || h.id === a.id);
        const heroImg = base ? base.image : a.image;
        let buffedAtk = a.atk;
        let buffedDef = a.def;
        let buffedSpd = a.spd;
        let buffedHp = a.maxHp;
        
        const artId = a.artifactId || (a as any).equippedArtifactId;
        if (artId) {
           const art = ARTIFACTS.find(ar => ar.id === artId);
           if (art && (art.exclusiveTo?.includes(a.id) || art.exclusiveTo?.some(id => a.id.startsWith(id + '_')))) {
              buffedAtk += (art.bonusAtk || 0) + Math.floor(a.atk * ((art.bonusAtkPc || 0) / 100));
              buffedDef += (art.bonusDef || 0) + Math.floor(a.def * ((art.bonusDefPc || 0) / 100));
              buffedSpd += (art.bonusSpd || 0) + Math.floor(a.spd * ((art.bonusSpdPc || 0) / 100));
              buffedHp += (art.bonusHp || 0) + Math.floor(a.maxHp * ((art.bonusHpPc || 0) / 100));
           }
        }
        
        return { ...a, image: heroImg, faction: 'ally' as const, isAlly: true, atk: buffedAtk, def: buffedDef, spd: buffedSpd, maxHp: buffedHp, hp: buffedHp, gridPosition: index } as Hero;
    }).filter((h): h is Hero => Boolean(h));

    const enemies: Hero[] = trialEnemies.map((e, idx) => {
       let buffedAtk = e.atk;
       let buffedDef = e.def;
       let buffedSpd = e.spd;
       let buffedHp = e.maxHp;
       const art = ARTIFACTS.find(ar => ar.exclusiveTo?.includes(e.id) || ar.exclusiveTo?.some(id => e.id.startsWith(id + '_')));
       if (art) {
          buffedAtk += (art.bonusAtk || 0) + Math.floor(e.atk * ((art.bonusAtkPc || 0) / 100));
          buffedDef += (art.bonusDef || 0) + Math.floor(e.def * ((art.bonusDefPc || 0) / 100));
          buffedSpd += (art.bonusSpd || 0) + Math.floor(e.spd * ((art.bonusSpdPc || 0) / 100));
          buffedHp += (art.bonusHp || 0) + Math.floor(e.maxHp * ((art.bonusHpPc || 0) / 100));
       }
       return { ...e, faction: 'enemy' as const, isAlly: false, atk: buffedAtk, def: buffedDef, spd: buffedSpd, maxHp: buffedHp, hp: buffedHp, id: e.id + '_' + Math.random(), gridPosition: idx } as Hero;
    });

    const initialEnemies = enemies;
    const allUnits = [...initialAllies, ...initialEnemies];
    const newLogs = [`Bắt đầu khiêu chiến Thí Luyện ${stageId}!`];
    
    SYNERGIES.forEach(syn => {
      const hasAll = syn.heroIds.every(reqId => allUnits.some(u => u.id.startsWith(reqId + '_')));
      if (hasAll) {
         syn.applyEffect(allUnits, (msg) => newLogs.push(msg));
      }
    });

    setCombatUnits({ ally: initialAllies, enemy: initialEnemies });
    setBattleLogs(newLogs); setCombatResult(null); setBattleActive(true); setView('combat-play');
  };

  const advanceTrialStage = () => {
    const currentStage = activeTrialStage;
    const nextStageId = currentStage + 1;
    const rewardJade = 50 * currentStage;

    setPlayer(prev => {
       const currProgress = prev.heroTrialProgress || 0;
       const nextProgress = Math.max(currProgress, currentStage);
       return { 
           ...prev, 
           heroTrialProgress: nextProgress,
           jade: (prev.jade || 0) + rewardJade
       };
    });
    
    alert(`Chúc mừng Bệ hạ đã vượt qua Ải ${currentStage}! Thưởng: ${rewardJade} Bảo ngọc.`);
    const maxStage = Math.max(...HERO_TRIAL_STAGES.map((s: any) => s.id));
    if (nextStageId <= maxStage) {
        const nextEnemies = generateTrialEnemies(nextStageId);
        initTrialCombat(nextStageId, nextEnemies);
    } else {
        alert("Bệ hạ đã xuất sắc vượt qua toàn bộ Ải Thử Thách hiện tại!");
        setView('hero-trial');
    }
  };

  const renderView = () => {
    switch (view) {
      case 'auth': return (
        <AuthView onLogin={async (username: string, playerData: PlayerState) => {
          // Khởi tạo các trường mặc định
          if (!playerData.permLineup) playerData.permLineup = [null, null, null, null, null, null];
          if (playerData.legionTickets === undefined) playerData.legionTickets = 0;
          if (!playerData.unlockedChapters) playerData.unlockedChapters = [1];
          if (!playerData.tuLuyenCorrectIds) playerData.tuLuyenCorrectIds = {};
          if (!playerData.tuLuyenUnlockedLessons) playerData.tuLuyenUnlockedLessons = ['B1'];

          // Thử tải dữ liệu mới nhất từ Cloud (Cloud luôn thắng nếu có)
          try {
            const cloudData = await loadPlayerDataFromCloud(username);
            if (cloudData) {
              // Merge: dùng cloud làm gốc nhưng giữ lại các trường mặc định nếu thiếu
              playerData = {
                ...cloudData,
                permLineup: cloudData.permLineup || [null, null, null, null, null, null],
                legionTickets: cloudData.legionTickets ?? 0,
                unlockedChapters: cloudData.unlockedChapters || [1],
                tuLuyenCorrectIds: cloudData.tuLuyenCorrectIds || {},
                tuLuyenUnlockedLessons: cloudData.tuLuyenUnlockedLessons || ['B1'],
              };
            }
          } catch (e) {
            // Không load được cloud — dùng local data (offline fallback)
            console.warn("Không tải được dữ liệu Cloud, dùng local backup:", e);
          }

          // Sync hero stats từ game data mới nhất
          if (playerData.inventory) {
            playerData.inventory = syncHeroInventoryStats(playerData.inventory);
          }
          
          // Bắt buộc set username để ProfileModal có dữ liệu chính xác thay vì fallback về playerName
          playerData.username = username;

          if (playerData.grade) setSelectedGrade(playerData.grade);
          setCurrentUser(username);
          setPlayer(playerData);
          setView('chapter-select');
        }} />
      );
      case 'chapter-select': return (
        <div className="min-h-screen viet-bg flex flex-col p-8 items-center relative overflow-hidden">
          {/* Toast thông báo chương bị khóa */}
          {lockedChapterToast && (
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] pointer-events-none">
              <div className="bg-stone-950/95 border border-amber-700/70 rounded-2xl px-6 py-4 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-md flex items-center gap-4 max-w-md animate-bounce-once">
                <span className="text-3xl">🏯</span>
                <div>
                  <div className="text-amber-400 font-cinzel font-black text-sm uppercase tracking-widest mb-1">Chương {lockedChapterToast.chapterNum} — Chưa mở khóa</div>
                  <div className="text-stone-300 text-sm leading-snug">
                    {lockedChapterToast.reason === 'math' ? (
                      <>Chúa công vui lòng <b>hoàn thành Toán Chương {lockedChapterToast.chapterNum - 1}</b> trong Thí Luyện Đường để mở khóa!</>
                    ) : (
                      <>Chúa công vui lòng <b>chinh phục Bản đồ Chương {lockedChapterToast.chapterNum - 1}</b> để mở khóa!</>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Nút Đăng Xuất góc phải */}
          <button 
            onClick={handleLogout}
            className="absolute top-6 right-6 z-50 flex items-center gap-2 bg-stone-900/50 hover:bg-red-900/50 text-stone-300 hover:text-white px-4 py-2 rounded-xl transition-all border border-stone-700 hover:border-red-500/50"
          >
            <LogOut size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Đăng xuất</span>
          </button>
          
          <button 
            onClick={() => setView('tu-hao-su-viet')}
            className="absolute top-6 right-72 z-50 flex items-center gap-2 bg-gradient-to-r from-red-950 via-amber-950 to-red-950 hover:from-red-900 hover:to-amber-900 text-yellow-300 hover:text-white px-4 py-2 rounded-xl transition-all border border-yellow-500/60 shadow-[0_0_15px_rgba(245,158,11,0.4)] cursor-pointer"
          >
            <ScrollText size={16} className="text-yellow-400" />
            <span className="text-xs font-black uppercase tracking-widest">Tự Hào Sử Việt</span>
          </button>
          
          <button 
            onClick={() => setIsProfileOpen(true)}
            className="absolute top-6 right-40 z-50 flex items-center gap-2 bg-stone-900/50 hover:bg-amber-900/50 text-stone-300 hover:text-white px-4 py-2 rounded-xl transition-all border border-stone-700 hover:border-amber-500/50"
          >
            <User size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Hồ sơ</span>
          </button>
          <div className="absolute inset-0 opacity-5 pointer-events-none" style={{backgroundImage:"repeating-linear-gradient(0deg, rgba(201,148,26,0.3) 0px, rgba(201,148,26,0.3) 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, rgba(201,148,26,0.3) 0px, rgba(201,148,26,0.3) 1px, transparent 1px, transparent 60px)"}}/>
          <div className="text-center mb-10 relative z-10">
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="h-px w-20 bg-gradient-to-r from-transparent to-amber-700/50"/>
              <span className="text-amber-700/50 text-2xl">⚜</span>
              <div className="h-px w-20 bg-gradient-to-l from-transparent to-amber-700/50"/>
            </div>
            <h2 className="text-4xl font-cinzel text-amber-400 font-black uppercase drop-shadow-[0_0_15px_rgba(201,148,26,0.35)] tracking-widest">Bản Đồ Chinh Phạt</h2>
            <p className="text-amber-800/50 text-[10px] uppercase tracking-[0.3em] mt-2 font-bold">Đại Việt · Giang Sơn Một Cõi</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5 max-w-7xl w-full relative z-10">
             {[1,2,3,4,5,6,7,8,9,10].map(c => {
               // Kiểm tra điều kiện Combat cho chương này
               const isCombatDone = (player.unlockedChapters || [1]).includes(c);
               
               // Kiểm tra điều kiện Học Toán cho chương này
               let isMathDone = true;
               const unlockedLessons = player.tuLuyenUnlockedLessons || ['B1'];
               if (c === 2) isMathDone = unlockedLessons.includes('B8');
               else if (c === 3) isMathDone = unlockedLessons.includes('C3_B13');
               else if (c === 4) isMathDone = unlockedLessons.includes('C4');

               const isUnlocked = isCombatDone && isMathDone;

               return (
                 <button key={c}
                   onClick={() => {
                     if (!isUnlocked) {
                       // Hiển toast thông báo, tự ẩn sau 3 giây
                       setLockedChapterToast({ chapterNum: c, reason: !isCombatDone ? 'combat' : 'math' });
                       clearTimeout((window as any).__chapterToastTimer);
                       (window as any).__chapterToastTimer = setTimeout(() => setLockedChapterToast(null), 3200);
                       return;
                     }
                     if (c !== activeChapter) {
                       setActiveChapter(c);
                       if (c > player.currentChapter) resetChapterAssets(c);
                     }
                     setView('chapter-hub');
                   }}
                   className={`p-6 rounded-2xl border-2 transition-all relative overflow-hidden ${
                     isUnlocked
                       ? 'chapter-card-unlocked border-amber-800 shadow-2xl hover:scale-105 hover:border-amber-500 hover:shadow-[0_0_25px_rgba(201,148,26,0.25)] cursor-pointer'
                       : 'bg-stone-950/80 border-stone-800/50 opacity-60 cursor-pointer hover:border-stone-600 hover:opacity-80 transition-opacity'
                   }`}
                 >                     <div 
                        className="absolute inset-0 bg-cover bg-center transition-all duration-300"
                        style={{ 
                          backgroundImage: `url('${import.meta.env.BASE_URL}chapters/chapter_${c}.jpg')`, 
                          opacity: isUnlocked ? 0.35 : 0.1 
                        }} 
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent"></div>

                     <div className="relative z-10 flex flex-col items-center justify-center h-full">
                        <div className="font-cinzel text-3xl font-black mb-2 text-amber-400 drop-shadow-md">{c}</div>
                        <div className="font-bold uppercase text-[9px] text-amber-200/75 tracking-widest h-8 flex items-center justify-center leading-tight text-center drop-shadow-md">{CHAPTER_NAMES[c]}</div>
                        {isUnlocked ? (
                          <div className="mt-3 flex justify-center">
                            <div className="bg-amber-900/40 rounded-full p-1.5 border border-amber-800/50 backdrop-blur-sm">
                              <MapIcon size={18} className="text-amber-500"/>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-3 flex justify-center">
                            <div className="bg-stone-900/50 rounded-full p-1.5 backdrop-blur-sm">
                              <Lock size={18} className="text-stone-700"/>
                            </div>
                          </div>
                        )}
                     </div>
                 </button>
               );
             })}
          </div>
        </div>
      );
      case 'chapter-hub': return (
        <div className="h-screen w-screen bg-black overflow-hidden relative flex">
          
          {/* MOBILE PORTRAIT VIEW – chỉ hiện khi portrait (dọc), ẩn khi landscape */}
          <div className={`${isLandscape ? 'hidden' : 'flex'} w-full h-full bg-stone-900 flex-col items-center justify-start overflow-y-auto relative pb-20`}>
             <div className="w-full relative h-[45vh] shrink-0 bg-[url('/hub-bg.png?v=2')] bg-cover bg-center border-b-4 border-amber-900 shadow-xl overflow-hidden">
                 <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/40 to-black/70"></div>
                 <div className="absolute top-8 left-4 z-30">
                    <h2 className="text-amber-400 font-cinzel font-black text-2xl md:text-3xl uppercase tracking-[0.25em] drop-shadow-[0_0_10px_rgba(201,148,26,0.8)]">Chương {activeChapter}</h2>
                    <p className="text-amber-100 font-cinzel text-sm md:text-base mt-0.5 italic tracking-widest">{CHAPTER_NAMES[activeChapter]}</p>
                 </div>
                 {/* Floating character or icon to make it lively */}
                 <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <span className="text-7xl md:text-8xl drop-shadow-lg filter sepia opacity-80">🏯</span>
                 </div>
             </div>

             <div className="w-full max-w-md mx-auto flex-1 px-5 py-8 flex flex-col gap-4 relative z-10 -mt-12">
                <button onClick={() => setView('chapter-select')} className="bg-stone-800/90 backdrop-blur-sm border-2 border-stone-600 rounded-2xl p-4 flex items-center gap-4 active:scale-95 transition-transform shadow-lg">
                   <div className="w-14 h-14 shrink-0 rounded-xl bg-amber-900/50 flex flex-col items-center justify-center border border-amber-500/50">
                     <span className="text-2xl drop-shadow-md">🏕️</span>
                   </div>
                   <div className="text-left flex-1">
                     <div className="font-cinzel font-black text-amber-400 text-lg uppercase tracking-wider">Doanh Trại</div>
                     <div className="text-xs text-stone-400 font-bold">Vượt Ải Cốt Truyện</div>
                   </div>
                </button>
                <button onClick={() => setView('tu-luyen-menu')} className="bg-stone-800/90 backdrop-blur-sm border-2 border-stone-600 rounded-2xl p-4 flex items-center gap-4 active:scale-95 transition-transform shadow-lg">
                   <div className="w-14 h-14 shrink-0 rounded-xl bg-blue-900/50 flex flex-col items-center justify-center border border-blue-500/50">
                     <span className="text-2xl drop-shadow-md">📚</span>
                   </div>
                   <div className="text-left flex-1">
                     <div className="font-cinzel font-black text-blue-400 text-lg uppercase tracking-wider">Quốc Tử Giám</div>
                     <div className="text-xs text-stone-400 font-bold">Tu Luyện Môn Quy</div>
                   </div>
                </button>
                <button onClick={() => setView('danh-vong-dai')} className="bg-stone-800/90 backdrop-blur-sm border-2 border-stone-600 rounded-2xl p-4 flex items-center gap-4 active:scale-95 transition-transform shadow-lg">
                   <div className="w-14 h-14 shrink-0 rounded-xl bg-purple-900/50 flex flex-col items-center justify-center border border-purple-500/50">
                     <span className="text-2xl drop-shadow-md">🏆</span>
                   </div>
                   <div className="text-left flex-1">
                     <div className="font-cinzel font-black text-purple-400 text-lg uppercase tracking-wider">Danh Vọng Đài</div>
                     <div className="text-xs text-stone-400 font-bold">Bảng Xếp Hạng Đỉnh Cao</div>
                   </div>
                </button>
                <button onClick={() => setView('quan-doan')} className="bg-stone-800/90 backdrop-blur-sm border-2 border-stone-600 rounded-2xl p-4 flex items-center gap-4 active:scale-95 transition-transform shadow-lg">
                   <div className="w-14 h-14 shrink-0 rounded-xl bg-green-900/50 flex flex-col items-center justify-center border border-green-500/50">
                     <span className="text-2xl drop-shadow-md">🎪</span>
                   </div>
                   <div className="text-left flex-1">
                     <div className="font-cinzel font-black text-green-400 text-lg uppercase tracking-wider">Quân Đoàn</div>
                     <div className="text-xs text-stone-400 font-bold">Gia nhập Thế Lực</div>
                   </div>
                </button>
                <button onClick={() => setView('hero-trial')} className="bg-stone-800/90 backdrop-blur-sm border-2 border-stone-600 rounded-2xl p-4 flex items-center gap-4 active:scale-95 transition-transform shadow-lg">
                   <div className="w-14 h-14 shrink-0 rounded-xl bg-red-900/50 flex flex-col items-center justify-center border border-red-500/50">
                     <span className="text-2xl drop-shadow-md">⚔️</span>
                   </div>
                   <div className="text-left flex-1">
                     <div className="font-cinzel font-black text-red-400 text-lg uppercase tracking-wider">Thí Luyện</div>
                     <div className="text-xs text-stone-400 font-bold">Thử thách leo tháp</div>
                   </div>
                </button>
                <button onClick={() => setView('tu-hao-su-viet')} className="bg-stone-800/90 backdrop-blur-sm border-2 border-stone-600 rounded-2xl p-4 flex items-center gap-4 active:scale-95 transition-transform shadow-lg">
                   <div className="w-14 h-14 shrink-0 rounded-xl bg-emerald-900/50 flex flex-col items-center justify-center border border-emerald-500/50">
                     <span className="text-2xl drop-shadow-md">🐉</span>
                   </div>
                   <div className="text-left flex-1">
                     <div className="font-cinzel font-black text-emerald-400 text-lg uppercase tracking-wider">Tự Hào Sử Việt</div>
                     <div className="text-xs text-stone-400 font-bold">Quà tặng đặc biệt</div>
                   </div>
                </button>
                <button onClick={() => setView('arena')} className="bg-stone-800/90 backdrop-blur-sm border-2 border-stone-600 rounded-2xl p-4 flex items-center gap-4 active:scale-95 transition-transform shadow-lg">
                   <div className="w-14 h-14 shrink-0 rounded-xl bg-orange-900/50 flex flex-col items-center justify-center border border-orange-500/50">
                     <span className="text-2xl drop-shadow-md">⚔️</span>
                   </div>
                   <div className="text-left flex-1">
                     <div className="font-cinzel font-black text-orange-400 text-lg uppercase tracking-wider">Đấu Trường PK</div>
                     <div className="text-xs text-stone-400 font-bold">Tranh đoạt Ngôi Vương</div>
                   </div>
                </button>
             </div>
          </div>

          {/* DESKTOP VIEW */}
          <div 
            className={`${isLandscape ? 'flex' : 'hidden'} absolute top-1/2 left-1/2 flex-col bg-black transition-transform duration-300 origin-center`}
            style={{ width: '100vw', height: '100vh', transform: 'translate(-50%, -50%)' }}
          >
            <Header state={player} setView={setView} onLogout={handleLogout} onOpenProfile={() => setIsProfileOpen(true)} syncStatus={syncStatus} />
            <div 
              className="flex-1 relative w-full h-full overflow-hidden bg-stone-950 flex items-center justify-center min-h-0 min-w-0"
              ref={viewportRef}
            >
              {/* Canvas chính chứa game */}
              <div 
                className="relative shrink-0 origin-center overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]" 
                style={{ width: 1920, height: 1080, transform: `scale(${hubScaleX}, ${hubScaleY})` }}
              >
              {/* Ảnh nền Isometric */}
              <div 
                className="absolute inset-0 bg-[length:100%_100%] bg-no-repeat"
                style={{ backgroundImage: `url('${import.meta.env.BASE_URL}hub-bg.png?v=2')` }}
              />
              {/* Lớp mờ (overlay) cho những viền ngoài để làm nổi bật */}
              <div className="absolute inset-0 bg-black/10 pointer-events-none" />


            {/* AMBIENT ANIMATIONS (Hiệu ứng môi trường làm sống động bức tranh) */}
            <style>
              {`
                @keyframes float-cloud {
                  0% { transform: translateX(-10vw); opacity: 0; }
                  10% { opacity: 0.6; }
                  90% { opacity: 0.6; }
                  100% { transform: translateX(110vw); opacity: 0; }
                }
                @keyframes fly-bird {
                  0% { transform: translate(-5vw, 20vh) scale(0.5); opacity: 0; }
                  20% { opacity: 1; }
                  80% { opacity: 1; transform: translate(80vw, 5vh) scale(1.5); }
                  100% { transform: translate(105vw, -5vh) scale(0.5); opacity: 0; }
                }
                @keyframes wander-guard {
                  0% { transform: translateX(0) scaleX(1); }
                  45% { transform: translateX(100px) scaleX(1); }
                  50% { transform: translateX(100px) scaleX(-1); }
                  95% { transform: translateX(0) scaleX(-1); }
                  0% { transform: translate(0, 0) scaleX(1); }
                  25% { transform: translate(30px, -10px) scaleX(1); }
                  26% { transform: translate(30px, -10px) scaleX(-1); }
                  50% { transform: translate(0, 0) scaleX(-1); }
                  75% { transform: translate(-30px, -10px) scaleX(-1); }
                  76% { transform: translate(-30px, -10px) scaleX(1); }
                  100% { transform: translate(0, 0) scaleX(1); }
                }
                @keyframes float-sparkle {
                  0%, 100% { opacity: 0; transform: translateY(0) scale(0.5); }
                  50% { opacity: 0.8; transform: translateY(-20px) scale(1.5); }
                }
                @keyframes wander-chicken {
                  0% { transform: translate(0, 0) scaleX(1); }
                  15% { transform: translate(20px, 5px) scaleX(1); }
                  30% { transform: translate(40px, 0px) scaleX(1); }
                  40% { transform: translate(40px, 0px) scaleX(-1); }
                  60% { transform: translate(20px, -5px) scaleX(-1); }
                  80% { transform: translate(0px, 0px) scaleX(-1); }
                  90% { transform: translate(0px, 0px) scaleX(1); }
                  100% { transform: translate(0, 0) scaleX(1); }
                }
                .anim-cloud-1 { animation: float-cloud 45s linear infinite; }
                .anim-cloud-2 { animation: float-cloud 35s linear infinite 15s; }
                .anim-cloud-3 { animation: float-cloud 55s linear infinite 5s; }
                
                .anim-bird-1 { animation: fly-bird 25s ease-in-out infinite; }
                .anim-bird-2 { animation: fly-bird 22s ease-in-out infinite 8s; }

                .anim-guard { animation: wander-guard 15s ease-in-out infinite; }
                .anim-sparkle { animation: float-sparkle 4s ease-in-out infinite; }
                .anim-chicken { animation: wander-chicken 10s ease-in-out infinite; }
                
                @keyframes idle-breathe {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-4px); }
                }
                .anim-idle { animation: idle-breathe 3s ease-in-out infinite; }
              `}
            </style>
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              {/* Mây trôi */}
              <div className="anim-cloud-1 absolute top-[10%] left-0 w-64 h-24 bg-white/40 rounded-full blur-3xl mix-blend-overlay"></div>
              <div className="anim-cloud-2 absolute top-[40%] left-0 w-96 h-32 bg-white/30 rounded-full blur-3xl mix-blend-overlay"></div>
              <div className="anim-cloud-3 absolute top-[70%] left-0 w-72 h-20 bg-white/35 rounded-full blur-3xl mix-blend-overlay"></div>
              
              {/* Đàn chim bay (chữ V đơn giản) */}
              <div className="anim-bird-1 absolute text-black/70 text-xs font-bold drop-shadow-sm">v v</div>
              <div className="anim-bird-2 absolute text-black/60 text-[10px] font-bold drop-shadow-sm">v v v</div>
              
              {/* Đom đóm / Phép thuật lấp lánh (dưới các tán cây) */}
              <div className="anim-sparkle absolute bottom-[30%] left-[25%] w-1.5 h-1.5 bg-yellow-300 rounded-full" style={{ animationDelay: '0s' }}></div>
              <div className="anim-sparkle absolute bottom-[40%] left-[28%] w-2 h-2 bg-yellow-200 rounded-full" style={{ animationDelay: '1.5s' }}></div>
              <div className="anim-sparkle absolute bottom-[25%] left-[75%] w-1.5 h-1.5 bg-yellow-300 rounded-full" style={{ animationDelay: '0.8s' }}></div>
              <div className="anim-sparkle absolute bottom-[45%] left-[80%] w-2 h-2 bg-yellow-100 rounded-full" style={{ animationDelay: '2.2s' }}></div>
              <div className="anim-sparkle absolute top-[30%] left-[10%] w-2 h-2 bg-yellow-200 rounded-full" style={{ animationDelay: '3s' }}></div>

              {/* Lính gác đi tuần quanh các con đường */}
              {/* Path 1: near the stairs/gate */}
              <div className="anim-guard absolute top-[48%] left-[48%] flex flex-col items-center">
                <span className="text-3xl drop-shadow-md">💂</span>
                <div className="w-4 h-1 bg-black/40 blur-[2px] rounded-full mt-1"></div>
              </div>
              {/* Path 2: near shop */}
              <div className="anim-guard absolute bottom-[15%] left-[25%] flex flex-col items-center" style={{ animationDelay: '-5s', animationDuration: '18s' }}>
                <span className="text-3xl drop-shadow-md">💂</span>
                <div className="w-4 h-1 bg-black/40 blur-[2px] rounded-full mt-1"></div>
              </div>
              {/* Path 3: near bottom right */}
              <div className="anim-guard absolute bottom-[25%] right-[25%] flex flex-col items-center" style={{ animationDelay: '-2s', animationDuration: '12s' }}>
                <span className="text-3xl drop-shadow-md">💂</span>
                <div className="w-4 h-1 bg-black/40 blur-[2px] rounded-full mt-1"></div>
              </div>

              {/* Đàn gà đi quanh bụi cây (bottom left) */}
              <div className="absolute bottom-[15%] left-[12%] flex gap-3 items-end">
                <div className="anim-chicken text-2xl drop-shadow-md" style={{ animationDelay: '0s' }}>🐔</div>
                <div className="anim-chicken text-lg drop-shadow-md" style={{ animationDelay: '0.5s' }}>🐥</div>
                <div className="anim-chicken text-lg drop-shadow-md" style={{ animationDelay: '1.2s' }}>🐥</div>
              </div>
              
              {/* Lính gác cổng đứng yên (với hiệu ứng nhịp thở nhẹ) */}
              <div className="absolute top-[40%] left-[45%] flex flex-col items-center">
                <span className="anim-idle text-3xl drop-shadow-md" style={{ animationDelay: '0s' }}>💂</span>
                <div className="w-4 h-1 bg-black/40 blur-[2px] rounded-full mt-1"></div>
              </div>
              <div className="absolute top-[40%] left-[55%] flex flex-col items-center">
                <span className="anim-idle text-3xl drop-shadow-md" style={{ animationDelay: '1.5s' }}>💂</span>
                <div className="w-4 h-1 bg-black/40 blur-[2px] rounded-full mt-1"></div>
              </div>
            </div>

            {/* Tiêu đề Chương góc trên */}
            <div className="absolute top-6 left-6 z-30 text-left drop-shadow-2xl bg-black/60 px-6 py-3 rounded-2xl border border-amber-900/50 backdrop-blur-sm">
              <h2 className="text-amber-400 font-cinzel font-black text-2xl uppercase tracking-[0.25em] drop-shadow-[0_0_10px_rgba(201,148,26,0.8)]">Chương {activeChapter}</h2>
              <p className="text-amber-100 font-cinzel text-sm mt-0.5 italic tracking-widest">{CHAPTER_NAMES[activeChapter]}</p>
              {activeChapter === 9 && (
                <div className="mt-2.5 flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold text-stone-300">Phe tham chiến:</span>
                  <button
                    onClick={() => setShowCh9FactionModal(true)}
                    className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border transition-all cursor-pointer hover:scale-105 active:scale-95 ${
                      player.ch9Faction === 'mac' ? 'bg-yellow-950 text-yellow-300 border-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.5)]' :
                      player.ch9Faction === 'le_trinh' ? 'bg-red-950 text-red-300 border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' :
                      player.ch9Faction === 'nguyen' ? 'bg-blue-950 text-blue-300 border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]' :
                      'bg-amber-900/80 text-amber-300 border-amber-400 animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.6)]'
                    }`}
                  >
                    {player.ch9Faction === 'mac' ? '👑 Bắc Triều (Nhà Mạc)' :
                     player.ch9Faction === 'le_trinh' ? '🚩 Nam Triều (Lê - Trịnh)' :
                     player.ch9Faction === 'nguyen' ? '🌊 Đàng Trong (Chúa Nguyễn)' : '⚡ Chọn Phe Phái (Chưa Chọn) ⚡'}
                  </button>
                </div>
              )}
            </div>

            
            {/* Center Logo */}
            <div className="absolute top-[8%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center pointer-events-none drop-shadow-2xl">
              <style>
                {`
                  .title-glow {
                    color: white;
                    text-shadow: 
                      0 0 10px rgba(220,38,38,1),
                      0 0 20px rgba(220,38,38,0.8),
                      -2px -2px 0 #7f1d1d,
                      2px -2px 0 #7f1d1d,
                      -2px 2px 0 #7f1d1d,
                      2px 2px 0 #7f1d1d,
                      4px 4px 5px rgba(0,0,0,0.8);
                  }
                  @keyframes rainbow-text {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                  }
                  .rainbow-text-animate {
                    background: linear-gradient(to right, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000);
                    background-size: 200% auto;
                    color: transparent;
                    -webkit-background-clip: text;
                    background-clip: text;
                    animation: rainbow-text 3s linear infinite;
                  }
                `}
              </style>
              
              <h1 className="title-glow text-[80px] font-cinzel font-black tracking-widest uppercase text-center whitespace-nowrap relative z-10 pt-4 pb-0">VIỆT SỬ ANH HÙNG</h1>
              <div className="font-cinzel font-black uppercase text-[20px] tracking-[0.3em] rainbow-text-animate drop-shadow-[0_2px_2px_rgba(0,0,0,0.9)] relative z-20 mt-1">
                Một sản phẩm được phát triển bởi Trần Minh Toàn
              </div>
            </div>

            {/* CÁC ĐIỂM TƯƠNG TÁC (HOTSPOTS) - Bố cục vòng cung theo sơ đồ */}
            
            {/* 1. THÍ LUYỆN ĐƯỜNG - Cạnh trái (trên) -> Tòa nhà thác nước */}
            <button 
              onClick={() => {
                if (player.grade) {
                  setSelectedGrade(player.grade);
                  setSelectedMathChapterIdx(0);
                  setView('kinh-luan-topic');
                } else {
                  setView('kinh-luan-grade');
                }
              }}
              className="absolute top-[38%] left-[12%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-blue-900/85 hover:bg-blue-800 backdrop-blur-md border-2 border-blue-400/60 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)] flex items-center gap-3 hover:shadow-[0_0_30px_rgba(59,130,246,0.8)] transition-shadow">
                <BookOpen className="w-8 h-8 text-blue-300" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[24px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,1)' }}>Thí Luyện Đường</span>
              </div>
            </button>

            {/* 2. DOANH TRẠI - Cạnh trái (dưới) -> Tòa nhà gỗ giữa */}
            <button 
              onClick={() => setView('danh-trai')}
              className="absolute top-[68%] left-[12%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-green-900/85 hover:bg-green-800 backdrop-blur-md border-2 border-green-400/60 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.6)] flex items-center gap-3 hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-shadow">
                <Tent className="w-8 h-8 text-green-300" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[24px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,1)' }}>Doanh Trại</span>
              </div>
            </button>

            {/* 3. QUỐC TỬ GIÁM - Cạnh trên (trái) -> Tòa nhà chái trái cung điện */}
            <button 
              onClick={() => setView('quoc-tu-giam')}
              className="absolute top-[28%] left-[45%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-red-900/85 hover:bg-red-800 backdrop-blur-md border-2 border-red-400/60 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.6)] flex items-center gap-3 hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] transition-shadow">
                <School className="w-8 h-8 text-red-300" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[24px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,1)' }}>Quốc Tử Giám</span>
              </div>
            </button>

            {/* 4. DANH VỌNG ĐÀI - Cạnh trên (phải) -> Tòa cung điện chính */}
            <button 
              onClick={() => setView('danh-vong-dai')}
              className="absolute top-[28%] left-[68%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-indigo-900/85 hover:bg-indigo-800 backdrop-blur-md border-2 border-indigo-400/60 px-6 py-3 rounded-full shadow-[0_0_25px_rgba(99,102,241,0.7)] flex items-center gap-3 hover:shadow-[0_0_35px_rgba(99,102,241,0.9)] transition-shadow">
                <Crown className="w-8 h-8 text-indigo-300" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[24px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,1)' }}>DANH VỌNG ĐÀI</span>
              </div>
            </button>

            {/* 5. QUÂN ĐOÀN - Cạnh phải (trên) -> Tháp phải trên */}
            <button 
              onClick={() => setView('quan-doan')}
              className="absolute top-[60%] left-[88%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-amber-900/85 hover:bg-amber-800 backdrop-blur-md border-2 border-amber-400/60 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(217,119,6,0.6)] flex items-center gap-3 hover:shadow-[0_0_30px_rgba(217,119,6,0.8)] transition-shadow">
                <Shield className="w-8 h-8 text-amber-300" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[24px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,1)' }}>Quân Đoàn</span>
              </div>
            </button>

            {/* 6. ANH HÙNG QUÁ ẢI - Cạnh phải (dưới) -> Tháp phải dưới */}
            <button 
              onClick={() => setView('hero-trial')}
              className="absolute top-[90%] left-[86%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-red-900/85 hover:bg-red-800 backdrop-blur-md border-2 border-red-500/60 px-6 py-3 rounded-full shadow-[0_0_25px_rgba(239,68,68,0.7)] flex items-center gap-3 hover:shadow-[0_0_35px_rgba(239,68,68,0.9)] transition-shadow">
                <Swords className="w-8 h-8 text-red-300" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[24px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,1)' }}>Anh Hùng Quá Ải</span>
              </div>
            </button>

            {/* 7. KỲ TRÂN CÁC - Cạnh dưới (trái) -> Khu nhà dưới trái */}
            <button 
              onClick={() => setView('shop')}
              className="absolute top-[90%] left-[32%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-amber-900/85 hover:bg-amber-800 backdrop-blur-md border-2 border-amber-400/60 px-6 py-3 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.6)] flex items-center gap-3 hover:shadow-[0_0_30px_rgba(251,191,36,0.8)] transition-shadow">
                <ShoppingBag className="w-8 h-8 text-amber-300" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[24px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,1)' }}>Kỳ Trân Các</span>
              </div>
            </button>

            {/* 8. CHIÊU HIỀN ĐÀI - Cạnh dưới (phải) -> Khu nhà gỗ giữa phải */}
            <button 
              onClick={() => setView('summon')}
              className="absolute top-[76%] left-[65%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-purple-900/85 hover:bg-purple-800 backdrop-blur-md border-2 border-purple-400/60 px-6 py-3 rounded-full shadow-[0_0_25px_rgba(168,85,247,0.7)] flex items-center gap-3 hover:shadow-[0_0_35px_rgba(168,85,247,0.9)] transition-shadow">
                <UserPlus className="w-8 h-8 text-purple-300" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[24px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,1)' }}>Chiêu Hiền Đài</span>
              </div>
            </button>

            {/* 9. TỰ HÀO SỬ VIỆT - Vị trí Trung Tâm Hoàng Cung */}
            <button 
              onClick={() => setView('tu-hao-su-viet')}
              className="absolute top-[48%] left-[50%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-gradient-to-r from-red-950/90 via-amber-900/90 to-red-950/90 hover:from-red-800 hover:to-amber-800 backdrop-blur-md border-2 border-amber-400/80 px-8 py-4 rounded-full shadow-[0_0_30px_rgba(245,158,11,0.8)] flex items-center gap-3 hover:shadow-[0_0_45px_rgba(245,158,11,1)] transition-all">
                <ScrollText className="w-10 h-10 text-yellow-300 animate-pulse" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[32px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 12px rgba(255,215,0,0.8), 0 2px 4px rgba(0,0,0,1)' }}>Tự Hào Sử Việt</span>
              </div>
            </button>

            {/* 10. ĐẤU TRƯỜNG PK - Cạnh giữa (trái) */}
            <button 
              onClick={() => setView('arena')}
              className="absolute top-[50%] left-[25%] -translate-x-1/2 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
            >
              <div className="bg-orange-900/85 hover:bg-orange-800 backdrop-blur-md border-2 border-orange-500/60 px-6 py-3 rounded-full shadow-[0_0_25px_rgba(249,115,22,0.7)] flex items-center gap-3 hover:shadow-[0_0_35px_rgba(249,115,22,0.9)] transition-shadow">
                <Swords className="w-8 h-8 text-orange-300" />
                <span className="font-cinzel font-black text-[#FFD700] uppercase tracking-widest text-[24px] whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,1)]" style={{ textShadow: '0 0 10px rgba(255,215,0,0.5), 0 2px 4px rgba(0,0,0,1)' }}>Đấu Trường PK</span>
              </div>
            </button>


            {/* ADMIN BUTTON (Chỉ hiển thị cho tài khoản tên 'Admin') */}
            {(player?.playerName?.toLowerCase() === 'admin' || player?.playerName?.toLowerCase() === 'tmt') && (
              <button 
                onClick={() => setView('admin')}
                className="absolute top-4 right-4 group z-20 flex flex-col items-center hover:scale-110 transition-transform cursor-pointer"
              >
                <div className="bg-stone-900/85 hover:bg-stone-800 backdrop-blur-md border border-stone-500/60 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2">
                  <Database size={16} className="text-stone-300" />
                  <span className="font-black text-stone-100 uppercase text-xs">Admin Data</span>
                </div>
              </button>
            )}



            </div>

            {showCh9FactionModal && (
              <Ch9FactionSelectModal
                currentFaction={player.ch9Faction}
                onSelect={(faction: string) => {
                  setPlayer((prev: PlayerState) => ({ ...prev, ch9Faction: faction }));
                  setShowCh9FactionModal(false);
                }}
                onClose={() => setShowCh9FactionModal(false)}
              />
            )}

            </div>
          </div>
        </div>
      );
      case 'admin': return <AdminView setView={(v: any) => setView(v)} />;
      case 'tu-luyen-menu': return <TuLuyenMenuView setView={(v: any) => setView(v)} startLesson={startLessonTuLuyen} unlockedLessons={player.tuLuyenUnlockedLessons || ['B1']} correctIds={player.tuLuyenCorrectIds || {}} />;
      case 'tu-luyen-play': return <QuizPlayView question={currentQuestions[currentIdx]} idx={currentIdx} total={currentQuestions.length} showFeedback={showFeedback} userAnswers={userAnswers} setUserAnswers={setUserAnswers} onAnswer={handleQuizAnswer} lastReward={lastReward} setView={setView} autoNext={autoNext} onAutoNextChange={setAutoNext} onNext={() => { setShowFeedback(false); if (currentIdx < currentQuestions.length - 1) setCurrentIdx(c => c + 1); else handleTuLuyenResult(correctTotal, currentQuestions.length); }} tuLuyenLessonId={activeLessonId} />;
      case 'kinh-luan-grade': return <GradeView setGrade={setSelectedGrade} setView={setView} />;
      case 'kinh-luan-topic': return <TopicView grade={selectedGrade} setChapterIdx={setSelectedMathChapterIdx} setView={setView} player={player} />;
      case 'kinh-luan-lesson': return <LessonListView grade={selectedGrade} chapterIdx={selectedMathChapterIdx} setLessonIdx={setSelectedMathLessonIdx} setView={setView} progress={player.mathProgress} player={player} startQuiz={startQuiz} />;
      case 'lesson-summary': return <LessonSummaryView grade={selectedGrade} chapterIdx={selectedMathChapterIdx} lessonIdx={selectedMathLessonIdx} setView={setView} />;
      case 'quiz-setup': return <QuizSetupView startQuiz={startQuiz} setView={setView} grade={selectedGrade} chapterIdx={selectedMathChapterIdx} lessonIdx={selectedMathLessonIdx} player={player} />;
      case 'quiz-play': return <QuizPlayView question={currentQuestions[currentIdx]} idx={currentIdx} total={currentQuestions.length} showFeedback={showFeedback} userAnswers={userAnswers} setUserAnswers={setUserAnswers} onAnswer={handleQuizAnswer} lastReward={lastReward} setView={setView} autoNext={autoNext} onAutoNextChange={setAutoNext} onNext={() => { setShowFeedback(false); if (currentIdx < currentQuestions.length - 1) setCurrentIdx(c => c + 1); else handleQuizResult(correctTotal, currentQuestions.length); }} />;
      case 'quiz-result': return <QuizResultView correct={correctTotal} total={currentQuestions.length} rewards={sessionRewards} setView={setView} player={player} />;
      case 'danh-trai': return <DanhTraiView activeChapter={activeChapter} player={player} setPlayer={setPlayer} quickLineup={() => {
          const allHeroes = player.inventory.filter((h: any) => h.chapter === activeChapter && !h.isPermanent);
          const uniqueTopHeroesMap = new Map();
          const sortedHeroes = [...allHeroes].sort((a: any, b: any) => (b.overall || 0) - (a.overall || 0));
          sortedHeroes.forEach((h: any) => {
              if (!uniqueTopHeroesMap.has(h.name)) uniqueTopHeroesMap.set(h.name, h);
          });
          const top6Unique = Array.from(uniqueTopHeroesMap.values()).slice(0, 6);
          
          const newLineup = [null, null, null, null, null, null] as any;
          top6Unique.forEach((h: any, i: number) => newLineup[i] = h.id);
          
          setPlayer((p: any) => ({ ...p, lineup: newLineup }));
        }} setView={setView} onCombat={initCombat} />;
      case 'quan-doan': return <QuanDoanView player={player} setPlayer={setPlayer} quickLineup={() => {
          const allHeroes = player.inventory.filter((h: Hero) => h.isPermanent === true);
          const uniqueTopHeroesMap = new Map();
          const sortedHeroes = [...allHeroes].sort((a: any, b: any) => (b.overall || 0) - (a.overall || 0));
          sortedHeroes.forEach((h: Hero) => {
              if (!uniqueTopHeroesMap.has(h.name)) uniqueTopHeroesMap.set(h.name, h);
          });
          const top6Unique = Array.from(uniqueTopHeroesMap.values()).slice(0, 6);
          
          const newLineup = [null, null, null, null, null, null] as any;
          top6Unique.forEach((h: any, i: number) => newLineup[i] = h.id);
          
          setPlayer((p: any) => ({ ...p, permLineup: newLineup }));
        }} setView={setView} onCombat={() => { setView('chapter-hub'); }} />;
      case 'danh-vong-dai': return <LeaderboardView player={player} setView={setView} selectedGrade={selectedGrade} />;
      case 'summon': return <SummonView player={player} summon={performSummon} results={summonResults} setView={setView} clearResults={() => setSummonResults([])} chapter={activeChapter} />;
      case 'combat-play': return <CombatView units={combatUnits} setUnits={setCombatUnits} logs={battleLogs} setLogs={setBattleLogs} result={combatResult} setResult={setCombatResult} active={battleActive} setActive={setBattleActive} setView={setView} speed={combatSpeed} setSpeed={setCombatSpeed} onWin={combatMode === 'hero-trial' ? advanceTrialStage : advanceChapter} chapter={combatMode === 'hero-trial' ? activeTrialStage : activeChapter} combatMode={combatMode} arenaMatchData={arenaMatchData} onArenaEnd={handleArenaEnd} />;
      case 'shop': return <ShopView player={player} setPlayer={setPlayer} setView={setView} />;
      case 'quoc-tu-giam': return <QuocTuGiamView setView={setView} activeChapter={activeChapter} />;
      case 'hero-trial': return <ErrorBoundary><HeroTrialView playerState={player} onBack={() => setView('chapter-hub')} onStartCombat={initTrialCombat} /></ErrorBoundary>;
      case 'tu-hao-su-viet': return <ErrorBoundary><TuHaoSuVietView playerState={player} setPlayer={setPlayer} onBack={() => setView('chapter-hub')} /></ErrorBoundary>;
      case 'arena': return <ErrorBoundary><ArenaView playerData={player} setPlayerData={setPlayer} setView={setView} saveData={(data) => { savePlayerProgress(currentUser, data); updateStudentAnalytics(currentUser, data, data.combatPower); }} initArenaCombat={initArenaCombat} /></ErrorBoundary>;
      default: return null;
    }
  };

  const handleQuizAnswer = (val: any, timeLeft: number = 15) => {
    if (showFeedback) return;
    const timeTaken = Math.floor((Date.now() - questionStartTimeRef.current) / 1000);
    setUserDurations(prev => ({...prev, [currentIdx]: timeTaken}));
    const question = currentQuestions[currentIdx];
    const isCorrect = question.type === 'short_answer' 
      ? isShortAnswerMatch(val, question.correctAnswer)
      : (val !== null && val !== undefined && val !== -1 && val === question.correctAnswer);
    setUserAnswers(prev => ({...prev, [currentIdx]: val}));
    setShowFeedback(true);
    if (isCorrect) {
      new Audio('./audio/correct.mp3').play().catch(e => console.log('Audio error:', e));
      setCorrectTotal(c => c + 1);
      let gold = 0;
      let t: 'normal' | 'premium' | 'artifact' | undefined = undefined;
      const rand = Math.random();
      const level = question.level ? question.level.toLowerCase() : '';

      // Tính speed bonus dựa trên thời gian còn lại
      let goldMult = 1.0;
      let artifactBonus = 0;
      let premiumBonus = 0;
      let speedLabel: string | undefined = undefined;
      if (timeLeft >= 25) { // trả lời trong ≤5 giây
        goldMult = 2.0; artifactBonus = 0.15; premiumBonus = 0.10; speedLabel = '⚡ Siêu Nhanh x2!';
      } else if (timeLeft >= 15) { // trả lời trong 6–15 giây
        goldMult = 1.5; premiumBonus = 0.05; speedLabel = '🔥 Nhanh x1.5!';
      }

      if (level.includes('nhận biết')) {
        gold = Math.round((Math.floor(Math.random() * 5) + 1) * 100 * goldMult);
        if (rand < 0.05 + artifactBonus) t = 'artifact';
        else if (rand < 0.20 + artifactBonus + premiumBonus) t = 'premium';
        else t = 'normal';
      } else if (level.includes('thông hiểu')) {
        gold = Math.round((Math.floor(Math.random() * 5) + 6) * 100 * goldMult);
        if (rand < 0.10 + artifactBonus) t = 'artifact';
        else if (rand < 0.40 + artifactBonus + premiumBonus) t = 'premium';
        else t = 'normal';
      } else {
        gold = Math.round((Math.floor(Math.random() * 10) + 11) * 100 * goldMult);
        if (rand < 0.20 + artifactBonus) t = 'artifact';
        else if (rand < 0.90 + artifactBonus + premiumBonus) t = 'premium';
        else t = 'normal';
      }
      setLastReward({ gold, ticket: t as any, speedLabel });
      setSessionRewards(prev => ({ ...prev, gold: prev.gold + gold, normal: t === 'normal' ? prev.normal + 1 : prev.normal, premium: t === 'premium' ? prev.premium + 1 : prev.premium, artifact: t === 'artifact' ? (prev.artifact || 0) + 1 : (prev.artifact || 0) }));
      setPlayer(prev => ({ ...prev, gold: prev.gold + gold, normalTickets: t === 'normal' ? prev.normalTickets + 1 : prev.normalTickets, premiumTickets: t === 'premium' ? prev.premiumTickets + 1 : prev.premiumTickets, artifactTickets: t === 'artifact' ? (prev.artifactTickets || 0) + 1 : (prev.artifactTickets || 0) }));
    } else {
      new Audio('./audio/wrong.mp3').play().catch(e => console.log('Audio error:', e));
      setLastReward(null);
    }
  };

  // Chatbot chỉ hiển thị ở các tính năng chính của game,
  // KHÔNG hiển thị khi: đăng nhập, đang làm bài thi (quiz-play, tu-luyen-play), thí luyện đường (hero-trial)
  const showChatbot =
    view !== 'auth' &&
    view !== 'quiz-play' &&
    view !== 'tu-luyen-play' &&
    view !== 'hero-trial' &&
    view !== 'tu-hao-su-viet';

  return (
    <>
      <div className={`relative z-0 ${view !== 'auth' ? 'pb-[72px] md:pb-0' : ''}`}>
        {renderView()}
      </div>

      {view !== 'auth' && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-[200] bg-stone-950 border-t-2 border-stone-800 flex items-center justify-around shadow-[0_-5px_20px_rgba(0,0,0,1)] px-2 py-1 h-[72px]">
          <button onClick={() => setView('chapter-hub')} className={`flex flex-col items-center justify-center p-1 flex-1 ${view === 'chapter-hub' ? 'text-amber-400' : 'text-stone-500'}`}>
            <Tent size={26} className={view === 'chapter-hub' ? 'drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]' : ''}/>
            <span className="text-[10px] font-black uppercase mt-1">Thành Chính</span>
          </button>
          <button onClick={() => setView('quan-doan')} className={`flex flex-col items-center justify-center p-1 flex-1 ${view === 'quan-doan' || view === 'danh-trai' ? 'text-amber-400' : 'text-stone-500'}`}>
            <Users size={26} className={view === 'quan-doan' || view === 'danh-trai' ? 'drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]' : ''}/>
            <span className="text-[10px] font-black uppercase mt-1">Tướng</span>
          </button>
          <button onClick={() => setView('hero-trial')} className={`flex flex-col items-center justify-center p-1 flex-1 ${view === 'hero-trial' || view === 'chapter-select' ? 'text-amber-400' : 'text-stone-500'}`}>
            <Crosshair size={32} className={view === 'hero-trial' || view === 'chapter-select' ? 'drop-shadow-[0_0_5px_rgba(251,191,36,0.8)] animate-pulse' : ''}/>
            <span className="text-[10px] font-black uppercase mt-1">Chinh Chiến</span>
          </button>
          <button onClick={() => setView('shop')} className={`flex flex-col items-center justify-center p-1 flex-1 ${view === 'shop' ? 'text-amber-400' : 'text-stone-500'}`}>
            <ShoppingBag size={26} className={view === 'shop' ? 'drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]' : ''}/>
            <span className="text-[10px] font-black uppercase mt-1">Bồi Dưỡng</span>
          </button>
          <button onClick={() => setIsProfileOpen(true)} className={`flex flex-col items-center justify-center p-1 flex-1 ${isProfileOpen ? 'text-amber-400' : 'text-stone-500'}`}>
            <User size={26} className={isProfileOpen ? 'drop-shadow-[0_0_5px_rgba(251,191,36,0.8)]' : ''}/>
            <span className="text-[10px] font-black uppercase mt-1">Nhân Vật</span>
          </button>
        </div>
      )}
      {view !== 'auth' && <BGMPlayer />}
      {view !== 'auth' && <ProfileModal 
         isOpen={isProfileOpen} 
         onClose={() => setIsProfileOpen(false)} 
         player={player} 
         setPlayer={setPlayer} 
         availableAvatars={player.inventory.filter(h => h.isPermanent === true)} 
      />}
      {showChatbot && <ChatbotWidget />}
    </>
  );
};

const QuickDisassembleModal = ({ isOpen, onClose, inventory, lineup, setPlayer, isPermanentView }: any) => {
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [checkedHeroIds, setCheckedHeroIds] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSelectRarity = (r: string) => {
    setSelectedRarity(r);
    // Find all heroes of this rarity that are not in lineup
    const pool = inventory.filter((h: any) => h.rarity === r && !lineup.includes(h.id));
    setCheckedHeroIds(pool.map((h: any) => h.id));
  };

  const toggleCheck = (id: string) => {
    if (checkedHeroIds.includes(id)) {
      setCheckedHeroIds(checkedHeroIds.filter(x => x !== id));
    } else {
      setCheckedHeroIds([...checkedHeroIds, id]);
    }
  };

  const checkedHeroes = inventory.filter((h: any) => checkedHeroIds.includes(h.id));
  let totalJade = 0;
  let totalGold = 0;
  
  const jadeTable: Record<string, number> = { UR: 30, SSR: 20, SR: 10, R: 5, C: 2 };
  const goldTable: Record<string, number> = { UR: 15000, SSR: 10000, SR: 7500, R: 3000, C: 1000 };

  checkedHeroes.forEach((h: any) => {
     totalJade += jadeTable[h.rarity] || 0;
     totalGold += goldTable[h.rarity] || 0;
  });

  const performDisassemble = (rewardType: 'fragments' | 'jade' | 'gold') => {
     if (checkedHeroIds.length === 0) return alert("Vui lòng chọn ít nhất 1 tướng!");
     
     setPlayer((p: any) => {
        let newInv = [...p.inventory];
        let newJade = p.jade || 0;
        let newGold = p.gold || 0;
        let newHeroFragments = { ...(p.heroFragments || {}) };
        
        if (rewardType === 'jade') newJade += totalJade;
        if (rewardType === 'gold') newGold += totalGold;
        
        if (rewardType === 'fragments') {
           checkedHeroes.forEach((h: any) => {
              newHeroFragments[h.name] = (newHeroFragments[h.name] || 0) + 50;
           });
           
           if (isPermanentView) {
              newInv = newInv.filter((h: any) => !(h.isPermanent === true && checkedHeroIds.includes(h.id)));
           } else {
              newInv = newInv.filter((h: any) => !checkedHeroIds.includes(h.id));
           }
        } else {
           if (isPermanentView) {
              newInv = newInv.filter((h: any) => !(h.isPermanent === true && checkedHeroIds.includes(h.id)));
           } else {
              newInv = newInv.filter((h: any) => !checkedHeroIds.includes(h.id));
           }
        }

        return { ...p, inventory: newInv, jade: newJade, gold: newGold, heroFragments: newHeroFragments };
     });
     
     if (rewardType === 'jade') alert(`Tách tướng thành công! Nhận được ${totalJade} Ngọc Bích.`);
     else if (rewardType === 'gold') alert(`Tách tướng thành công! Nhận được ${totalGold} Vàng.`);
     else alert(`Tách tướng thành công! Nhận được ${checkedHeroes.length * 50} mảnh tướng.`);

     onClose();
  };

  return (
    <div className="fixed inset-0 z-[150] bg-black/90 flex flex-col items-center justify-center p-6 backdrop-blur-md animate-in fade-in duration-300">
       <div className="scroll-bg max-w-4xl w-full p-8 rounded-[3rem] shadow-2xl border-red-900 border-4 flex flex-col max-h-[90vh]">
          <h3 className="text-3xl font-cinzel font-black uppercase mb-4 text-red-500 text-center drop-shadow-md">Tách Tướng Nhanh</h3>
          <p className="text-sm italic mb-6 text-stone-300 font-bold text-center">Chọn phẩm chất để lọc tướng và nhận tài nguyên bồi hoàn</p>
          
          <div className="flex gap-2 justify-center mb-6 flex-wrap">
             {['C', 'R', 'SR', 'SSR', 'UR'].map(r => (
                <button key={r} onClick={() => handleSelectRarity(r)} className={`px-6 py-2 rounded-xl font-black transition-all border-2 ${selectedRarity === r ? 'bg-red-800 text-white border-red-400 scale-105' : 'bg-black/50 text-stone-400 border-stone-700 hover:border-red-600'}`}>
                   {r}
                </button>
             ))}
          </div>

          <div className="flex-1 overflow-y-auto min-h-[200px] border-2 border-stone-800 rounded-2xl p-4 bg-black/40 mb-6 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
             {inventory.filter((h: any) => h.rarity === selectedRarity).map((h: any) => {
                const inLineup = lineup.includes(h.id);
                const isChecked = checkedHeroIds.includes(h.id);
                return (
                   <div key={h.id} onClick={() => !inLineup && toggleCheck(h.id)} className={`relative p-2 rounded-xl border-2 cursor-pointer transition-all ${inLineup ? 'opacity-50 border-stone-800 grayscale' : isChecked ? 'border-green-500 bg-green-900/20 scale-105' : 'border-stone-700 bg-black/60 hover:border-red-500'}`}>
                      <img src={h.image || DEFAULT_ALLY_IMG} alt={h.name} className="w-full h-24 object-cover rounded-lg mb-2" onError={(e) => { e.currentTarget.src = DEFAULT_ALLY_IMG; }} />
                      <div className="text-[10px] font-bold text-center text-white truncate">{h.name}</div>
                      {inLineup && <div className="absolute top-0 right-0 bg-red-600 text-[9px] px-1 rounded-bl-lg font-black text-white">TRÊN TRẬN</div>}
                      {isChecked && <div className="absolute top-1 left-1 bg-green-500 rounded-full p-1"><UserCheck size={12} className="text-white" /></div>}
                   </div>
                );
             })}
             {selectedRarity && inventory.filter((h: any) => h.rarity === selectedRarity).length === 0 && (
                <div className="col-span-full text-center text-stone-500 font-bold italic py-10">Không có tướng nào thuộc phẩm chất này.</div>
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
             <button onClick={() => performDisassemble('fragments')} className="bg-gradient-to-br from-amber-900 to-black p-4 rounded-2xl border-2 border-amber-700 hover:border-amber-400 transition-all flex flex-col items-center justify-center group">
                <UserCheck className="text-amber-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs uppercase font-black text-amber-200">Nhận Mảnh Tướng</span>
                <span className="text-[10px] text-stone-400 mt-1">50 mảnh / 1 tướng</span>
             </button>
             <button onClick={() => performDisassemble('jade')} className="bg-gradient-to-br from-green-900 to-black p-4 rounded-2xl border-2 border-green-700 hover:border-green-400 transition-all flex flex-col items-center justify-center group">
                <Star className="text-green-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs uppercase font-black text-green-200">Nhận {totalJade} Ngọc Bích</span>
                <span className="text-[10px] text-stone-400 mt-1">Dựa trên tỷ lệ quy đổi</span>
             </button>
             <button onClick={() => performDisassemble('gold')} className="bg-gradient-to-br from-yellow-900 to-black p-4 rounded-2xl border-2 border-yellow-700 hover:border-yellow-400 transition-all flex flex-col items-center justify-center group">
                <Coins className="text-yellow-500 mb-2 group-hover:scale-110 transition-transform" size={24} />
                <span className="text-xs uppercase font-black text-yellow-200">Nhận {totalGold} Vàng</span>
                <span className="text-[10px] text-stone-400 mt-1">Dựa trên tỷ lệ quy đổi</span>
             </button>
          </div>

          <button onClick={onClose} className="w-full py-4 text-sm font-black uppercase text-stone-400 hover:text-white transition-colors underline">Thoát</button>
       </div>
    </div>
  );
};

const DanhTraiView = ({ player, setPlayer, quickLineup, setView, onCombat, activeChapter }: any) => {
  const [activeTab, setActiveTab] = useState<'heroes' | 'items'>('heroes');
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDecomposeModal, setShowDecomposeModal] = useState(false);
  const [showEquipModal, setShowEquipModal] = useState(false);
  const [showQuickDecomposeModal, setShowQuickDecomposeModal] = useState(false);

  useEffect(() => {
     if (player && player.inventory) {
        const synced = syncHeroInventoryStats(player.inventory);
        let changed = false;
        for (let i = 0; i < synced.length; i++) {
           if (synced[i].overall !== player.inventory[i]?.overall || synced[i].skillDesc !== player.inventory[i]?.skillDesc) {
              changed = true;
              break;
           }
        }
        if (changed) {
           setPlayer((p: any) => ({ ...p, inventory: synced }));
        }
     }
  }, []);

  const allowedHeroes = player.inventory.filter((h: Hero) => h.chapter === activeChapter && h.isPermanent !== true);
  const selectedHero = player.inventory.find((h: Hero) => h.id === selectedHeroId);
  const currentLineupHeroes = player.lineup.map((id: string) => player.inventory.find((h: Hero) => h.id === id)).filter(Boolean);
  const combatPower = currentLineupHeroes.reduce((acc: number, h: Hero) => acc + h.overall, 0);

  const moveHero = (heroId: string, slotIdx: number) => {
    const newLineup = [...player.lineup];
    const oldIdx = newLineup.indexOf(heroId);
    if (oldIdx !== -1) newLineup[oldIdx] = null;
    newLineup[slotIdx] = heroId;
    setPlayer((p: any) => ({ ...p, lineup: newLineup }));
    setSelectedSlot(null);
    setSelectedHeroId(null);
  };

  const removeHeroFromLineup = (slotIdx: number) => {
    const newLineup = [...player.lineup];
    newLineup[slotIdx] = null;
    setPlayer((p: any) => ({ ...p, lineup: newLineup }));
  };

  const decompose = (rewardType: 'fragments' | 'jade' | 'gold') => {
    if (!selectedHero) return;
    if (player.lineup.includes(selectedHero.id)) return alert("Anh hùng đang tham trận, không thể giải ngũ!");
    if (selectedHero.isPermanent === true) return alert("Đây là Tướng Quân Đoàn vĩnh viễn! Hãy vào Quân Đoàn để giải ngũ.");

    const heroRarity = selectedHero.rarity;
    const heroName = selectedHero.name;
    const heroId = selectedHero.id;

    const jadeTable: Record<string, number> = { UR: 30, SSR: 20, SR: 10, R: 5, C: 2 };
    const goldTable: Record<string, number> = { UR: 15000, SSR: 10000, SR: 7500, R: 3000, C: 1000 };

    const jadeGain  = rewardType === 'jade'  ? (jadeTable[heroRarity]  || 0) : 0;
    const goldGain  = rewardType === 'gold'  ? (goldTable[heroRarity]  || 0) : 0;
    const fragGain  = rewardType === 'fragments' ? 50 : 0;

    setPlayer((p: any) => {
      const newInv = p.inventory.filter((h: Hero) => h.id !== heroId);
      const heroFragments = { ...(p.heroFragments || {}) };

      if (rewardType === 'fragments') {
          heroFragments[heroName] = (heroFragments[heroName] || 0) + 50;
      }

      return {
        ...p,
        inventory: newInv,
        jade: (p.jade || 0) + jadeGain,
        gold: (p.gold || 0) + goldGain,
        heroFragments,
      };
    });

    // Thông báo nhận thưởng
    const rewardMsg = rewardType === 'fragments'
      ? `+50 Mảnh Tướng ${heroName}`
      : rewardType === 'jade'
      ? `+${jadeGain} Ngọc Bích 💎`
      : `+${goldGain} Vàng 🪙`;
    setTimeout(() => alert(`Giải ngũ thành công!\n${rewardMsg}`), 100);

    setSelectedHeroId(null);
    setShowDecomposeModal(false);
  };

  const upgradeStar = () => {
    if (!selectedHero) return;
    const maxStars = RARITY_MAX_STARS[selectedHero.rarity] || 30;
    if (selectedHero.star >= maxStars) return alert(`Hào kiệt phẩm chất ${selectedHero.rarity} đã đạt tới giới hạn tối thượng ${maxStars} Sao!`);

    const req = getStarUpgradeReq(selectedHero.star);

    // Tổng mảnh = mảnh trên người + mảnh rời trong kho + mảnh trên các bản sao khác
    const heroName = selectedHero.name;
    const storedFrags = (player.heroFragments || {})[heroName] || 0;
    
    let otherCopiesFrags = 0;
    player.inventory.forEach((h: Hero) => {
       if (h.name === heroName && h.id !== selectedHero.id) {
           otherCopiesFrags += (h.fragments || 0);
       }
    });
    
    const totalFragments = (selectedHero.fragments || 0) + storedFrags + otherCopiesFrags;

    if (totalFragments < req.fragReq) return alert(`Thiếu mảnh tướng! (Cần ${req.fragReq}, hiện có ${totalFragments})`);
    if (player.jade < req.jadeReq) return alert(`Thiếu Ngọc Bích! (Cần ${req.jadeReq}, hiện có ${player.jade})`);

    if (req.requiredPill) {
       const hasCount = (player.pills && player.pills[req.requiredPill.id]) || 0;
       if (hasCount < req.pillQty!) return alert(`Đột phá mốc ${req.nextStar} Sao cần ${req.pillQty} ${req.requiredPill.name}! (Hiện có ${hasCount}). Hãy dùng Lệnh Bài Chúa Công để lấy đan!`);
    }

    setPlayer((p: any) => {
      const newPills = { ...(p.pills || {}) };
      if (req.requiredPill) {
         newPills[req.requiredPill.id] = Math.max(0, (newPills[req.requiredPill.id] || req.pillQty) - req.pillQty!);
      }
      // Trừ mảnh: dùng mảnh rời trước, nếu còn thiếu thì trừ mảnh trên hero
            // Trừ mảnh: ưu tiên mảnh rời -> mảnh trên bản sao khác -> mảnh trên tướng hiện tại
      const heroFragments = { ...(p.heroFragments || {}) };
      let remaining = req.fragReq;
      
      const fromStored = Math.min(heroFragments[heroName] || 0, remaining);
      remaining -= fromStored;
      heroFragments[heroName] = (heroFragments[heroName] || 0) - fromStored;

      return {
        ...p,
        jade: p.jade - req.jadeReq,
        pills: newPills,
        heroFragments,
        inventory: p.inventory.map((h: Hero) => {
          if (h.id === selectedHero.id) {
             const updated = calculateHeroStatsWithStar(h, h.star + 1);
             let selfFrags = (h.fragments || 0);
             if (remaining > 0) {
                 const fromSelf = Math.min(selfFrags, remaining);
                 remaining -= fromSelf;
                 selfFrags -= fromSelf;
             }
             return { ...updated, fragments: selfFrags };
          } else if (h.name === heroName && remaining > 0) {
             let otherFrags = (h.fragments || 0);
             const fromOther = Math.min(otherFrags, remaining);
             remaining -= fromOther;
             otherFrags -= fromOther;
             return { ...h, fragments: otherFrags };
          }
          return h;
        })
      };
    });
    setShowUpgradeModal(false);
  };

  return (
    <div className="min-h-screen viet-bg flex flex-col h-screen overflow-hidden">
       <div className="p-4 flex justify-between items-center bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-amber-900/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-30">
          <button onClick={() => setView('chapter-hub')} className="text-amber-500 font-bold flex items-center gap-2 hover:text-amber-400 transition-colors"><ChevronLeft/> Trở về</button>
          <div className="flex flex-col items-center">
             <h2 className="text-xl font-cinzel text-amber-400 font-black uppercase tracking-widest drop-shadow-[0_0_8px_rgba(201,148,26,0.3)]">⚔ Danh Trại · Binh Pháp ⚔</h2>
             <div className="text-[10px] md:text-xs font-bold text-amber-500/80 uppercase tracking-widest mt-0.5 bg-black/40 px-3 py-0.5 rounded-full border border-amber-900/30">Lực chiến Thí luyện: <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">{(combatPower || 0).toLocaleString()}</span></div>
              <div className="text-[9px] text-orange-400/70 italic mt-0.5 font-semibold">⚠ Tướng tạm thời — sẽ xóa khi qua chương mới</div>
          </div>
          <div className="flex gap-3">
             <button onClick={quickLineup} className="bg-amber-900/80 text-amber-200 px-5 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 hover:bg-amber-800 shadow-lg transition-all border border-amber-800/40"><Zap size={16}/> Bày trận nhanh</button>
             <button onClick={onCombat} className="bg-gradient-to-r from-red-800 to-red-700 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 hover:from-red-700 hover:to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse transition-all border border-red-600/30"><SwordIcon size={18}/> XUẤT QUÂN</button>
          </div>
       </div>

       <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="w-full h-[55%] md:h-auto md:w-1/3 bg-stone-950/80 border-t-2 md:border-t-0 border-amber-900/50 p-4 md:p-6 overflow-y-auto custom-scrollbar shadow-2xl z-10 flex flex-col order-2 md:order-1">
             
             {/* Tabs */}
             <div className="flex gap-2 mb-6 border-b border-amber-900/30 pb-4">
                <button 
                   onClick={() => setActiveTab('heroes')} 
                   className={`flex-1 py-3 rounded-xl font-black uppercase text-sm transition-all border ${activeTab === 'heroes' ? 'bg-amber-900/80 text-amber-200 border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'bg-stone-900 text-stone-500 border-stone-800 hover:bg-stone-800'}`}
                >
                   <Tent size={18} className="inline-block mb-1 mr-1" /> Anh Hào ({allowedHeroes.length})
                </button>
                <button 
                   onClick={() => setActiveTab('items')} 
                   className={`flex-1 py-3 rounded-xl font-black uppercase text-sm transition-all border ${activeTab === 'items' ? 'bg-amber-900/80 text-amber-200 border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'bg-stone-900 text-stone-500 border-stone-800 hover:bg-stone-800'}`}
                >
                   <Package size={18} className="inline-block mb-1 mr-1" /> Vật Phẩm
                </button>
             </div>
             
             {activeTab === 'heroes' && (
               <>
                <button onClick={() => setShowQuickDecomposeModal(true)} className="w-full mb-4 bg-red-900/40 text-red-400 border border-red-900/50 hover:bg-red-900/60 transition-all p-3 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2">
                   <Recycle size={16}/> Tách Tướng Nhanh
                </button>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
                  {[...allowedHeroes].sort((a: Hero, b: Hero) => {
                    return (b.overall || 0) - (a.overall || 0);
                  }).map((h: Hero) => {
                    const isInLineup = player.lineup.includes(h.id);
                    return (
                      <div key={h.id} className="relative group" draggable onDragStart={(e) => { e.dataTransfer.setData('heroId', h.id); }}>
                        <HeroGalleryCard hero={h} onClick={() => { 
                          if (selectedSlot !== null) {
                              moveHero(h.id, selectedSlot);
                          } else {
                              setSelectedHeroId(h.id);
                          }
                        }} />
                        {isInLineup && <div className="absolute top-1 right-1 bg-amber-900 p-0.5 rounded-full shadow-lg z-10"><CheckCircle size={14} className="text-amber-500"/></div>}
                        {isInLineup && selectedSlot !== null && <div className="absolute inset-0 bg-black/60 rounded-2xl pointer-events-none z-10" />}
                      </div>
                    );
                  })}
               </div>
               </>
             )}

             {activeTab === 'items' && (
               <div className="space-y-4">
                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-4">
                     <div className="w-12 h-12 bg-red-900/30 rounded-xl flex items-center justify-center border border-red-500/30 overflow-hidden relative">
                        <img src="./items/premium_ticket.png" className="w-full h-full object-cover scale-110 drop-shadow-md" alt="Vé Quay Quân Đoàn"/>
                     </div>
                     <div className="flex-1">
                        <div className="text-white font-bold text-sm uppercase">Vé Quay Quân Đoàn</div>
                        <div className="text-stone-400 text-xs">Dùng để chiêu mộ Hào Kiệt vĩnh viễn</div>
                     </div>
                     <div className="text-2xl font-black text-red-400">{player.legionTickets || 0}</div>
                  </div>

                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-4">
                     <div className="w-12 h-12 bg-yellow-900/30 rounded-xl flex items-center justify-center border border-yellow-500/30 overflow-hidden relative">
                        <img src="./items/gold.png" className="w-full h-full object-cover scale-110 drop-shadow-md" alt="Ngân Lượng"/>
                     </div>
                     <div className="flex-1">
                        <div className="text-white font-bold text-sm uppercase">Ngân Lượng (Vàng)</div>
                        <div className="text-stone-400 text-xs">Dùng để mua sắm trong Kỳ Trân Các</div>
                     </div>
                     <div className="text-2xl font-black text-yellow-500">{(player.gold || 0).toLocaleString()}</div>
                  </div>

                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-4">
                     <div className="w-12 h-12 bg-green-900/30 rounded-xl flex items-center justify-center border border-green-500/30 overflow-hidden relative">
                        <img src="./items/jade.png" className="w-full h-full object-cover scale-110 drop-shadow-md" alt="Ngọc Bích"/>
                     </div>
                     <div className="flex-1">
                        <div className="text-white font-bold text-sm uppercase">Ngọc Bích</div>
                        <div className="text-stone-400 text-xs">Dùng để kích hoạt sức mạnh</div>
                     </div>
                     <div className="text-2xl font-black text-green-400">{player.jade}</div>
                  </div>

                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-4">
                     <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center border border-purple-500/30 overflow-hidden relative">
                        <div className="text-3xl drop-shadow-md">💊</div>
                     </div>
                     <div className="flex-1">
                        <div className="text-white font-bold text-sm uppercase">Các Loại Đan</div>
                        <div className="text-stone-400 text-xs">Đột Phá Đan dùng để Nâng sao tướng</div>
                     </div>
                     <div className="text-2xl font-black text-purple-400">{player.upgradePills || 0}</div>
                  </div>
               </div>
             )}
          </div>

          <div className="w-full h-[45%] md:h-auto md:flex-1 p-4 md:p-10 flex flex-col items-center justify-center relative bg-[url('/hub-bg.png')] bg-cover bg-center order-1 md:order-2 overflow-hidden">
             <div className="absolute inset-0 bg-stone-900/70"></div>
             <div className="absolute top-2 md:top-10 text-amber-900/20 font-cinzel font-black uppercase tracking-[0.2em] md:tracking-[0.5em] text-xl md:text-4xl pointer-events-none select-none z-0">TRẬN ĐỒ QUÂN TA</div>
             <div className="grid grid-cols-3 gap-4 md:gap-8 p-6 md:p-12 bg-black/40 rounded-[2rem] md:rounded-[4rem] border-2 md:border-4 border-dashed border-amber-900/40 shadow-inner relative z-10 transform scale-90 md:scale-100">
                {[0, 1, 2, 3, 4, 5].map(idx => {
                   const hId = player.lineup[idx];
                   const hero = player.inventory.find(h => h.id === hId);
                   const isSelected = selectedSlot === idx;
                   const ledClass = hero ? getStarBorderClass(hero.star) : '';

                   return (
                     <div key={idx} className="relative group"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                              e.preventDefault();
                              const heroId = e.dataTransfer.getData('heroId');
                              if (heroId) moveHero(heroId, idx);
                          }}>
                        <button onClick={() => setSelectedSlot(isSelected ? null : idx)} className={`w-36 h-52 rounded-2xl border-4 transition-all flex flex-col items-center justify-center overflow-hidden shadow-2xl relative ${isSelected ? 'border-amber-500 bg-amber-500/20 scale-110 z-20' : 'border-amber-900/30 bg-stone-900 hover:bg-stone-800 hover:border-amber-900/50'}`}>
                           {hero ? (
                             <div className={`w-full h-full relative flex flex-col items-center justify-between p-1 ${ledClass}`}>
                                <div className="relative overflow-hidden rounded-xl w-full h-full z-10 bg-[#1c1917]">
                                   <img src={hero.image} className="w-full h-full object-cover contrast-110" onError={(e) => { (e.target as HTMLImageElement).src = hero.faction === 'enemy' ? DEFAULT_ENEMY_IMG : DEFAULT_ALLY_IMG; }} />
                                   
                                   {/* Sao & Cảnh giới */}
                                   <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 bg-black/80 px-2 py-0.5 rounded-full border border-white/10 shadow-md">
                                      <HeroStars starCount={hero.star} size={8} />
                                   </div>

                                   {/* Tên & Lực chiến */}
                                   <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent py-1.5 px-1 text-center z-20">
                                      <div className="text-[10px] text-amber-300 font-cinzel font-black uppercase truncate">{hero.name}</div>
                                      <div className="text-[8px] text-amber-500 font-bold">CL: {hero.overall ? hero.overall.toLocaleString() : ''}</div>
                                   </div>

                                   {/* Nút Xóa khỏi trận */}
                                   <button onClick={(e) => { e.stopPropagation(); removeHeroFromLineup(idx); }} className="absolute -top-1 -right-1 bg-red-900 text-white p-1 rounded-full shadow-lg hover:bg-red-700 transition-colors z-30 opacity-0 group-hover:opacity-100">
                                      <XCircle size={16}/>
                                   </button>
                                </div>
                             </div>
                           ) : (
                             <div className="text-center space-y-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                <Plus size={32} className="text-amber-900 mx-auto" />
                                <div className="text-[8px] text-amber-900 font-black uppercase">Vị trí {idx+1}</div>
                             </div>
                           )}
                        </button>
                        {isSelected && !hero && <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-amber-500 font-black whitespace-nowrap animate-bounce">CHỌN TƯỚNG BÊN TRÁI</div>}
                     </div>
                   );
                })}
             </div>
          </div>
       </div>

       {showUpgradeModal && selectedHero && (() => {
          const req = getStarUpgradeReq(selectedHero.star);
          const hasPills = req.requiredPill ? ((player.pills && player.pills[req.requiredPill.id]) || 0) : 0;
          const storedFrags = (player.heroFragments || {})[selectedHero.name] || 0;
          let otherCopiesFrags = 0;
          (player.inventory || []).forEach((h: Hero) => {
             if (h.name === selectedHero.name && h.id !== selectedHero.id) {
                 otherCopiesFrags += (h.fragments || 0);
             }
          });
          const totalFrags = (selectedHero.fragments || 0) + storedFrags + otherCopiesFrags;
          return (
           <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="scroll-bg max-w-lg w-full p-10 rounded-[3rem] shadow-2xl border-amber-900 text-center">
                 <h3 className="text-2xl font-cinzel font-black uppercase mb-6">Đột Phá Cảnh Giới</h3>
                 <div className="flex justify-center gap-10 items-center mb-10">
                    <div className="text-center">
                       <HeroStars starCount={selectedHero.star} size={14} className="justify-center mb-2" />
                       <div className="text-xs font-bold uppercase text-stone-600">Hiện tại</div>
                    </div>
                    <ArrowRight size={32} className="text-amber-900" />
                    <div className="text-center">
                       <HeroStars starCount={selectedHero.star + 1} size={14} className="justify-center mb-2 animate-pulse" />
                       <div className="text-xs font-bold uppercase text-amber-900">Sao mới</div>
                    </div>
                 </div>
                 <div className="bg-white/40 p-6 rounded-2xl mb-8 border border-amber-900/10 space-y-3 text-left">
                    <div className="flex justify-between items-center font-bold">
                       <span className="text-xs uppercase">Mảnh tướng {selectedHero.name}:</span>
                        <span className={totalFrags >= req.fragReq ? 'text-green-700 font-black' : 'text-red-700 font-black'}>
                          {totalFrags} / {req.fragReq}
                          {storedFrags > 0 && <span className="text-[10px] text-amber-600 ml-1">(+{storedFrags} kho rời)</span>}
                        </span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                       <span className="text-xs uppercase">Ngọc bích cần thiết:</span>
                       <span className={player.jade >= req.jadeReq ? 'text-green-700 font-black' : 'text-red-700 font-black'}>
                          {player.jade} / {req.jadeReq}
                       </span>
                    </div>
                    {req.requiredPill && (
                       <div className="flex justify-between items-center font-bold pt-2 border-t border-amber-900/10">
                          <span className="text-xs uppercase text-red-900 flex items-center gap-1">
                             <span>{req.requiredPill.icon}</span> {req.requiredPill.name}:
                          </span>
                          <span className={hasPills >= (req.pillQty || 1) ? 'text-green-700 font-black' : 'text-red-700 font-black'}>
                             {hasPills} / {req.pillQty}
                          </span>
                       </div>
                    )}
                   <div className="pt-4 border-t border-amber-900/10 text-xs italic text-amber-900/70 text-center">Tăng điểm tiềm năng, lực chiến và mở khóa cảnh giới mới.</div>
                </div>
                <div className="flex gap-4">
                   <button onClick={() => setShowUpgradeModal(false)} className="flex-1 bg-stone-800 hover:bg-stone-700 py-3 rounded-xl font-bold uppercase transition-colors">Hủy</button>
                   <button onClick={upgradeStar} className="flex-1 py-4 font-black uppercase text-xs bg-amber-950 text-white rounded-xl shadow-lg transition-all active:scale-95">Xác nhận nâng sao</button>
                </div>
             </div>
          </div>
        );
       })()}

       {showDecomposeModal && selectedHero && (
          <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
             <div className="scroll-bg max-w-lg w-full p-10 rounded-[3rem] shadow-2xl border-red-900 text-center">
                <h3 className="text-2xl font-cinzel font-black uppercase mb-6 text-red-900">Giải Ngũ Hào Kiệt</h3>
                <p className="text-sm italic mb-8 text-stone-700 font-bold">Lệnh bài giải ngũ sẽ thu hồi anh hùng, Chúa công muốn nhận bồi hoàn gì?</p>
                <div className="grid grid-cols-1 gap-4 mb-10">
                   <button onClick={() => decompose('fragments')} className="bg-white/60 p-5 rounded-2xl border-2 border-amber-900/20 hover:border-amber-900 transition-all flex justify-between items-center font-black">
                      <span className="text-xs uppercase">50 Mảnh tướng {selectedHero.name}</span>
                      <UserCheck className="text-amber-900" />
                   </button>
                   <button onClick={() => decompose('jade')} className="bg-white/60 p-5 rounded-2xl border-2 border-amber-900/20 hover:border-amber-900 transition-all flex justify-between items-center font-black">
                      <span className="text-xs uppercase">Ngọc Bích ({selectedHero.rarity === 'UR' ? 30 : selectedHero.rarity === 'SSR' ? 20 : selectedHero.rarity === 'SR' ? 10 : selectedHero.rarity === 'R' ? 5 : 2})</span>
                      <Star className="text-green-700" />
                   </button>
                   <button onClick={() => decompose('gold')} className="bg-white/60 p-5 rounded-2xl border-2 border-amber-900/20 hover:border-amber-900 transition-all flex justify-between items-center font-black">
                      <span className="text-xs uppercase">Vàng ({selectedHero.rarity === 'UR' ? 15000 : selectedHero.rarity === 'SSR' ? 10000 : selectedHero.rarity === 'SR' ? 7500 : selectedHero.rarity === 'R' ? 3000 : 1000})</span>
                      <Coins className="text-yellow-600" />
                   </button>
                </div>
                <button onClick={() => setShowDecomposeModal(false)} className="w-full py-4 text-xs font-black uppercase text-stone-500 underline">Quay lại</button>
             </div>
          </div>
       )}

       <QuickDisassembleModal isOpen={showQuickDecomposeModal} onClose={() => setShowQuickDecomposeModal(false)} inventory={allowedHeroes || []} lineup={player.lineup || []} setPlayer={setPlayer} isPermanentView={false} />

       {showEquipModal && selectedHero && (
          <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
             <div className="scroll-bg max-w-2xl w-full p-8 rounded-[3rem] shadow-2xl border-purple-900 text-center max-h-[80vh] flex flex-col">
                <h3 className="text-2xl font-cinzel font-black uppercase mb-2 text-purple-400">Trang Bị Thần Khí</h3>
                <p className="text-sm italic mb-6 text-stone-400 font-bold">Chọn thần khí phù hợp cho {selectedHero.name}</p>
                <div className="flex-1 overflow-y-auto min-h-[300px] grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 pr-2">
                   <button onClick={() => {
                      setPlayer((p: any) => ({
                          ...p, 
                          inventory: p.inventory.map((h: any) => h.id === selectedHero.id ? { ...h, artifactId: undefined } : h)
                      }));
                      setShowEquipModal(false);
                   }} className="bg-red-900/20 p-4 rounded-xl border border-red-500/30 hover:bg-red-900/40 hover:border-red-400 transition-all font-black text-[10px] uppercase text-red-300 flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full border-2 border-red-500/50 flex items-center justify-center bg-red-950/50 text-xl">✖</div>
                      Tháo Trang Bị
                   </button>
                   {player.artifacts && player.artifacts.filter((artId: string) => {
                          const art = ARTIFACTS.find(a => a.id === artId);
                          return art && (art.exclusiveTo?.includes(selectedHero.id) || art.exclusiveTo?.some(id => selectedHero.id.startsWith(id + '_')));
                       }).length > 0 ? (
                       player.artifacts.filter((artId: string) => {
                          const art = ARTIFACTS.find(a => a.id === artId);
                          return art && (art.exclusiveTo?.includes(selectedHero.id) || art.exclusiveTo?.some(id => selectedHero.id.startsWith(id + '_')));
                       }).map((artId: string, i: number) => {
                          const art = ARTIFACTS.find(a => a.id === artId);
                          if (!art) return null;
                          const isEquipped = selectedHero.artifactId === art.id;
                          return (
                             <button key={i} onClick={() => {
                                setPlayer((p: any) => ({
                                    ...p, 
                                    inventory: p.inventory.map((h: any) => h.id === selectedHero.id ? { ...h, artifactId: art.id } : h)
                                }));
                                setShowEquipModal(false);
                             }} className={`bg-purple-900/20 p-3 rounded-xl border ${isEquipped ? 'border-purple-400 bg-purple-900/40 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-purple-500/30'} hover:border-purple-400 transition-all flex flex-col items-center gap-2 relative`}>
                                <img src={art.image} className="w-12 h-12 rounded border border-purple-500/50 object-cover" />
                                <div className="font-bold text-purple-200 text-[10px] uppercase truncate w-full">{art.name}</div>
                                {isEquipped && <div className="absolute top-1 right-1 bg-purple-500 text-white text-[8px] px-1 rounded uppercase font-bold">Đang dùng</div>}
                             </button>
                          );
                       })
                   ) : (
                       <div className="col-span-2 text-stone-500 text-xs italic mt-10">Chúa công chưa có Thần Khí bản mệnh nào phù hợp cho hào kiệt này. Hãy vào Chiêu Hiền Đài để tìm kiếm!</div>
                   )}
                </div>
                <button onClick={() => setShowEquipModal(false)} className="w-full py-4 text-xs font-black uppercase text-stone-500 underline mt-auto">Đóng</button>
             </div>
          </div>
       )}

       {selectedHeroId && !selectedSlot && selectedHero && !showUpgradeModal && !showDecomposeModal && !showEquipModal && (
          <HeroDetailModal 
            hero={selectedHero} 
            onClose={() => setSelectedHeroId(null)}
            actions={
               <div className="flex gap-2 mt-4 w-full">
                  <button onClick={() => setShowUpgradeModal(true)} className="flex-1 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-700 hover:to-green-600 text-white py-3 rounded-xl text-[10px] font-black uppercase flex flex-col items-center justify-center gap-1 shadow-md transition-all border border-green-600/30"><ArrowUpCircle size={14}/> Nâng Sao</button>
                  <button onClick={() => setShowEquipModal(true)} className="flex-1 bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white py-3 rounded-xl text-[10px] font-black uppercase flex flex-col items-center justify-center gap-1 shadow-md transition-all border border-purple-500/30"><ScrollText size={14}/> Thần Khí</button>
                  <button onClick={() => setShowDecomposeModal(true)} className="flex-1 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white py-3 rounded-xl text-[10px] font-black uppercase flex flex-col items-center justify-center gap-1 shadow-md transition-all border border-red-700/30"><Scissors size={14}/> Tách</button>
               </div>
            }
          />
       )}
    </div>
  );
};

// Helper to determine skill effect based on text
const determineSkillEffect = (hero: Hero): string => {
  const text = (hero.skillName + ' ' + hero.skillDesc).toLowerCase();
  if (text.includes('lửa') || text.includes('hỏa') || text.includes('cháy') || text.includes('diệm')) return 'fire';
  if (text.includes('băng') || text.includes('thủy') || text.includes('nước') || text.includes('sóng') || text.includes('hàn')) return 'ice';
  if (text.includes('sấm') || text.includes('sét') || text.includes('lôi') || text.includes('điện')) return 'lightning';
  return 'slash';
};

const CombatView = ({ units, setUnits, logs, setLogs, result, setResult, active, setActive, setView, speed, setSpeed, onWin, chapter, combatMode, arenaMatchData, onArenaEnd }: any) => {
    const [turnQueue, setTurnQueue] = useState<any[]>([]);

    const arenaEndHandled = React.useRef(false);
    React.useEffect(() => {
        if (combatMode === 'arena' && result && onArenaEnd && !arenaEndHandled.current) {
            arenaEndHandled.current = true;
            onArenaEnd(result);
        }
    }, [result, combatMode, onArenaEnd]);
    
    
    const handleFlee = () => {
        if (window.confirm("Nếu rời trận xem như phe ta đã bại. Bạn có chắc chắn muốn rời trận?")) {
            setResult('lose');
            setActive(false);
        }
    };
    const [activeAttacker, setActiveAttacker] = useState<string | null>(null);
    const [activeTargets, setActiveTargets] = useState<string[]>([]);
    const [activeEffect, setActiveEffect] = useState<string | null>(null);
    const [damagePopups, setDamagePopups] = useState<{ id: string; dmg: number; key: number; isCrit?: boolean; type?: string; isHeal?: boolean; isReflect?: boolean; isShield?: boolean }[]>([]);
    const [attackerOffset, setAttackerOffset] = useState<{ tx: number; ty: number }>({ tx: 0, ty: 0 });
    const [activeSkillVideo, setActiveSkillVideo] = useState<string | null>(null);
    const hitCallbackRef = React.useRef<(() => void) | null>(null);
    // unitsRef: luôn giữ bản sao mới nhất của units để tránh stale closure trong async callbacks
    const unitsRef = React.useRef(units);
    React.useEffect(() => { unitsRef.current = units; }, [units]);
    
    const t1 = React.useRef<any>(null);
    const t2 = React.useRef<any>(null);
    const processingRef = React.useRef(false);
    const [roundCount, setRoundCount] = useState(0);

    useEffect(() => {
        setRoundCount(0);
        setTurnQueue([]);
    }, []); // Chỉ chạy 1 lần khi mount CombatView, không reset mỗi khi units thay đổi

    useEffect(() => {
        // Chỉ rebuild queue khi queue đã hết VÀ trận chiến đang active VÀ chưa có kết quả
        if (active && turnQueue.length === 0 && !result) {
            const allAllies = units.ally.filter((u: any) => u.hp > 0).map((u: any) => ({...u, isAlly: true}));
            const allEnemies = units.enemy.filter((u: any) => u.hp > 0).map((u: any) => ({...u, isAlly: false}));
            
            if (allAllies.length === 0) { setResult('lose'); setActive(false); return; }
            if (allEnemies.length === 0) { setResult('win'); setActive(false); return; }

            if (roundCount >= 20) {
                setLogs((prev: any) => [`[Hệ thống] Đã quá 20 hiệp (hiệp ${roundCount})! Quân ta kiệt sức, phải rút lui.`, ...prev].slice(0, 5));
                setTimeout(() => { setResult('lose'); setActive(false); }, 1500);
                return;
            }

            if (roundCount > 0) {
                // Sang hiệp mới
                setLogs((prev: any) => [`[Hệ thống] --- Bắt đầu Hiệp ${roundCount + 1} ---`, ...prev].slice(0, 5));
            } else {
                // Hiệp đầu tiên: Khởi tạo nộ khí ban đầu
                setUnits((prev: any) => ({
                    ally: prev.ally.map((u: any) => ({ ...u, morale: Math.min(100, u.initialMorale || 25) })),
                    enemy: prev.enemy.map((u: any) => ({ ...u, morale: Math.min(100, u.initialMorale || 25) })),
                }));
            }

            const newQueue = [...allAllies, ...allEnemies].sort((a, b) => {
                if (b.spd !== a.spd) return b.spd - a.spd;
                return (a.isAlly === b.isAlly) ? 0 : (a.isAlly ? -1 : 1);
            });
            setTurnQueue(newQueue);
            setRoundCount(prev => prev + 1);
        }
    }, [active, turnQueue.length, result, roundCount]);



    const getTargets = (actor: any, scope: string, isCharmed: boolean, allUnits: any, isSupportSkill: boolean = false) => {
        const isAlly = actor.faction === 'ally';
        // Phe đồng minh thực tế của actor (kể cả khi bị charmed/mê hoặc)
        const friendlyTeam = isAlly ? (isCharmed ? allUnits.enemy : allUnits.ally) : (isCharmed ? allUnits.ally : allUnits.enemy);
        // Phe đối thủ thực tế của actor
        const opponentTeam = isAlly ? (isCharmed ? allUnits.ally : allUnits.enemy) : (isCharmed ? allUnits.enemy : allUnits.ally);

        const friendlyLiving = friendlyTeam.filter((u: any) => u.hp > 0);
        const opponentLiving = opponentTeam.filter((u: any) => u.hp > 0);

        // ══════════════════════════════════════════════════════════════════════════
        // 1. KỸ NĂNG HỖ TRỢ (Buff / Hồi máu / Hồi nộ / Hồi sinh)
        // ══════════════════════════════════════════════════════════════════════════
        if (isSupportSkill) {
            if (scope === 'dead_ally') {
                const deadAllies = friendlyTeam.filter((u: any) => u.hp <= 0);
                return deadAllies.length > 0 ? [deadAllies[0]] : (friendlyLiving.length > 0 ? [friendlyLiving[0]] : []);
            }
            if (friendlyLiving.length === 0) return [];

            if (scope === 'all') {
                return friendlyLiving;
            }
            if (scope === 'lowest_morale') {
                const sortedByMorale = [...friendlyLiving].sort((a, b) => (a.morale || 0) - (b.morale || 0));
                return [sortedByMorale[0]];
            }
            if (scope === 'highest_atk') {
                const sortedByAtk = [...friendlyLiving].sort((a, b) => (b.atk || 0) - (a.atk || 0));
                return sortedByAtk.slice(0, 2);
            }
            if (scope === 'front_row') {
                const front = friendlyLiving.filter((u: any) => u.gridPosition < 3);
                return front.length > 0 ? front : friendlyLiving;
            }
            if (scope === 'back_row') {
                const back = friendlyLiving.filter((u: any) => u.gridPosition >= 3);
                return back.length > 0 ? back : friendlyLiving;
            }
            // Mặc định hỗ trợ: chọn đồng minh có tỷ lệ % máu thấp nhất
            const lowestHpAllies = [...friendlyLiving].sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
            return [lowestHpAllies[0]];
        }

        // ══════════════════════════════════════════════════════════════════════════
        // 2. KỸ NĂNG TẤN CÔNG / GÂY HẠI / ĐÁNH THƯỜNG
        // ══════════════════════════════════════════════════════════════════════════
        if (opponentLiving.length === 0) return [];

        // Kiểm tra Khiêu khích (Taunt)
        if (actor.tauntedBy) {
            const taunter = opponentLiving.find((u: any) => u.id === actor.tauntedBy);
            if (taunter) return [taunter];
        }

        const frontRow = opponentLiving.filter((u: any) => u.gridPosition < 3);
        const backRow = opponentLiving.filter((u: any) => u.gridPosition >= 3);
        const activeFrontRow = frontRow.length > 0 ? frontRow : backRow;
        const actorCol = (actor.gridPosition !== undefined ? actor.gridPosition : 0) % 3; // Cột 0, 1, 2

        switch (scope) {
            case 'all':
                return opponentLiving;

            case 'front_row':
                return activeFrontRow;

            case 'back_row':
                return backRow.length > 0 ? backRow : frontRow;

            case 'column': {
                // Đánh hàng dọc: ưu tiên thẳng hàng với cột người đánh
                const colUnits = opponentLiving.filter((u: any) => (u.gridPosition % 3) === actorCol);
                if (colUnits.length > 0) return colUnits;
                // Nếu cột đối diện trống, tìm cột lân cận (cột 1 trước, sau đó 0, 2)
                for (const col of [1, 0, 2]) {
                    const alt = opponentLiving.filter((u: any) => (u.gridPosition % 3) === col);
                    if (alt.length > 0) return alt;
                }
                return [opponentLiving[0]];
            }

            case 'lowest_hp': {
                // Tướng địch có % HP thấp nhất (kết liễu)
                const sorted = [...opponentLiving].sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
                return [sorted[0]];
            }

            case 'highest_hp': {
                // Tướng địch có HP tuyệt đối cao nhất
                const sorted = [...opponentLiving].sort((a, b) => b.hp - a.hp);
                return [sorted[0]];
            }

            case 'highest_atk': {
                // Tướng địch có Tấn công mạnh nhất
                const sorted = [...opponentLiving].sort((a, b) => b.atk - a.atk);
                return [sorted[0]];
            }

            case 'random2': {
                const shuffled = [...opponentLiving].sort(() => Math.random() - 0.5);
                return shuffled.slice(0, 2);
            }

            case 'random3': {
                const shuffled = [...opponentLiving].sort(() => Math.random() - 0.5);
                return shuffled.slice(0, 3);
            }

            case 'single':
            default: {
                // CHIẾN THUẬT ĐÒN ĐÁNH THƯỜNG / ĐÁNH ĐƠN CHUẨN TOP 0.1% RPG:
                
                // 1. Sát thủ (Assassin): Săn lùng mục tiêu yếu máu nhất ở hàng sau hoặc hàng trước
                if (actor.role === 'Sát thủ') {
                    const backLiving = backRow.length > 0 ? backRow : opponentLiving;
                    const sorted = [...backLiving].sort((a, b) => (a.hp / a.maxHp) - (b.hp / b.maxHp));
                    return [sorted[0]];
                }

                // 2. Cung thủ (Archer): Ưu tiên bắn tỉa mục tiêu đối diện thẳng hàng (cùng cột)
                if (actor.role === 'Cung thủ' || actor.role === 'Xạ thủ') {
                    const directFront = frontRow.find((u: any) => (u.gridPosition % 3) === actorCol);
                    if (directFront) return [directFront];
                    const directBack = backRow.find((u: any) => (u.gridPosition % 3) === actorCol);
                    if (directBack) return [directBack];
                }

                // 3. Quy tắc Đối Diện Trực Tuyến (Direct Lane Facing) cho các hệ còn lại:
                // Tìm địch ở hàng trước cùng cột
                const directFront = frontRow.find((u: any) => (u.gridPosition % 3) === actorCol);
                if (directFront) return [directFront];

                // Nếu slot đối diện hàng trước trống: tìm địch gần nhất ở hàng trước (cột 1 trước, rồi cột 0, 2)
                if (frontRow.length > 0) {
                    const prefOrder = actorCol === 0 ? [1, 2] : (actorCol === 2 ? [1, 0] : [0, 2]);
                    for (const c of prefOrder) {
                        const neighbor = frontRow.find((u: any) => (u.gridPosition % 3) === c);
                        if (neighbor) return [neighbor];
                    }
                    return [frontRow[0]];
                }

                // Khi toàn bộ hàng trước đã chết: đánh vào hàng sau cùng cột
                const directBack = backRow.find((u: any) => (u.gridPosition % 3) === actorCol);
                if (directBack) return [directBack];

                // Nếu không có, đánh địch hàng sau gần nhất
                if (backRow.length > 0) {
                    const prefOrder = actorCol === 0 ? [1, 2] : (actorCol === 2 ? [1, 0] : [0, 2]);
                    for (const c of prefOrder) {
                        const neighbor = backRow.find((u: any) => (u.gridPosition % 3) === c);
                        if (neighbor) return [neighbor];
                    }
                    return [backRow[0]];
                }

                return [opponentLiving[0]];
            }
        }
    };

    useEffect(() => {
        if (!active || result || turnQueue.length === 0 || processingRef.current) return;

        const actor = turnQueue[0];
        // Dùng unitsRef.current để luôn có state mới nhất, tránh stale closure
        const latestUnits = unitsRef.current;
        const currentActorState = actor.isAlly 
          ? latestUnits.ally.find((u: any) => u.id === actor.id)
          : latestUnits.enemy.find((u: any) => u.id === actor.id);
          
        // Tướng đã chết (hp <= 0) hoặc không tồn tại → bỏ lượt, xóa khỏi queue
        if (!currentActorState || currentActorState.hp <= 0) {
            setTurnQueue(prev => prev.filter((u: any) => u.id !== actor.id));
            return;
        }

        // Kiểm tra các CC (crowd control) làm mất lượt
        const ccEffects = [
            { flag: 'isStunned',    name: 'CHOÁNG',     clear: { isStunned: false } },
            { flag: 'isFrozen',     name: 'ĐÓNG BĂNG',  clear: { isFrozen: false } },
            { flag: 'isSilenced',   name: 'CÂM LẶNG',   clear: {}, skipUlt: true }, // chỉ chặn ult, không mất lượt
            { flag: 'isPetrified',  name: 'HÓA ĐÁ',     clear: { isPetrified: false } },
            { flag: 'isKnockedUp',  name: 'HẤT TUNG',   clear: { isKnockedUp: false } },
        ];
        // Silence chỉ chặn ult, không return - handled below
        const silenced = currentActorState.isSilenced;
        const hardCC = currentActorState.isStunned || currentActorState.isFrozen || currentActorState.isPetrified || currentActorState.isKnockedUp;
        if (hardCC) {
            processingRef.current = true;
            const ccEffect = ccEffects.find(e => e.flag !== 'isSilenced' && currentActorState[e.flag]);
            const statusName = ccEffect ? ccEffect.name : 'KHỐNG CHẾ';
            setLogs((prev: any) => [`[Trạng thái] ${currentActorState.name} bị ${statusName}, mất lượt đánh!`, ...prev].slice(0, 5));
            setUnits((prev: any) => {
               const newUnits = { ...prev };
               const processUnit = (u: any) => u.id === actor.id ? { ...u, isStunned: false, isFrozen: false, isPetrified: false, isKnockedUp: false } : u;
               if (actor.isAlly) newUnits.ally = prev.ally.map(processUnit);
               else newUnits.enemy = prev.enemy.map(processUnit);
               return newUnits;
            });
            setTimeout(() => {
                processingRef.current = false;
                setTurnQueue(prev => prev.slice(1));
            }, 1000 / speed);
            return;
        }

        const isUltimate = currentActorState.morale >= 100 && !silenced;
        const targetScope = isUltimate ? (currentActorState.targetScope || 'single') : 'single';
        const isCharmed = currentActorState.isCharmed;

        // Phân định chính xác: Kỹ năng có nhắm vào phe ta (Hỗ trợ / Hồi máu / Hồi nộ) hay nhắm vào phe địch
        const heroSkillEffect = currentActorState.skillEffect;
        const heroSkillChance = currentActorState.skillEffectChance ?? 100;
        const heroSkillDmgMult = currentActorState.skillDmgMult ?? 12;
        const isSupportSkill = isUltimate && (
            currentActorState.role === 'Hỗ trợ' ||
            ['heal', 'shield', 'cleanse', 'energy_regen', 'revive', 'immune_cc', 'undying', 'damage_share'].includes(heroSkillEffect) ||
            ['lowest_morale', 'dead_ally'].includes(targetScope)
        ) && ((currentActorState.skillDmgMult || 0) <= 0);

        const targets = getTargets(currentActorState, targetScope, isCharmed, units, isSupportSkill);
        if (targets.length === 0) {
            setTurnQueue([]);
            return;
        }

        const totalDur = Math.round(5000 / speed);
        const hitAt    = Math.round(totalDur * 0.40);
        const resetAt  = Math.round(totalDur * 0.75);

        processingRef.current = true;

        // Tính toán offset để bay vào giữa màn hình khi tung đòn
        let attackTx = 0, attackTy = 0;
        const el = document.getElementById(`combat-card-${actor.id}`);
        if (el) {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            attackTx = window.innerWidth / 2 - cx;
            attackTy = window.innerHeight / 2 - cy;
        }
        setAttackerOffset({ tx: attackTx, ty: attackTy });

        setActiveAttacker(actor.id);
        setActiveTargets(targets.map((t:any) => t.id));
        setActiveEffect(null);
        setDamagePopups([]);

        // ===== VIDEO CUT-IN: Nếu là Tuyệt chiêu và tướng có video =====
        const hasSkillVideo = isUltimate && currentActorState.skillVideoUrl && speed < 99;
        if (hasSkillVideo) {
            setActiveSkillVideo(currentActorState.skillVideoUrl!);
        }

        // Định nghĩa hàm chạy hit logic (được gọi sau hitAt ms, hoặc ngay khi video kết thúc)
        const runHitLogic = () => {
            const popups: any[] = [];
            let logMsg = `[SPD ${actor.spd}] ${actor.name} ${isCharmed ? '(mê hoặc) ' : ''}${silenced ? '(câm lặng) ' : ''}`;
            
            if (isUltimate) logMsg += `tung tuyệt chiêu ${currentActorState.skillName || 'Sấm Sét'}! `;
            else logMsg += `đánh thường. `;

            // Dùng unitsRef.current để lấy state mới nhất, tránh stale closure
            let nextUnits = { ally: [...unitsRef.current.ally], enemy: [...unitsRef.current.enemy] };
            const selfFactionKey = actor.isAlly ? 'ally' : 'enemy';
            const enemyFactionKey = actor.isAlly ? 'enemy' : 'ally';
            
            if (isUltimate) {
                const processUnit = (u: any) => u.id === actor.id ? { ...u, morale: 0, isSilenced: false } : u;
                if (actor.isAlly) nextUnits.ally = nextUnits.ally.map(processUnit);
                else nextUnits.enemy = nextUnits.enemy.map(processUnit);
            } else if (silenced) {
                const processUnit = (u: any) => u.id === actor.id ? { ...u, isSilenced: false } : u;
                if (actor.isAlly) nextUnits.ally = nextUnits.ally.map(processUnit);
                else nextUnits.enemy = nextUnits.enemy.map(processUnit);
            }

            // ===== CƠ CHẾ KHIÊU KHÍCH CHO TIÊN PHONG CÓ KỸ NĂNG TAUNT =====
            if (isUltimate && heroSkillEffect === 'taunt') {
                nextUnits[enemyFactionKey] = nextUnits[enemyFactionKey].map((u: any) =>
                    u.hp > 0 ? { ...u, tauntedBy: actor.id } : u
                );
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                    u.id === actor.id ? { ...u, isInvincible: true, invincibleTurns: 1 } : u
                );
                logMsg += `Khiêu khích toàn bộ kẻ địch + Vô địch 1 lượt! `;
            }

            const skillEffectRolled = Math.random() * 100 < heroSkillChance;
            let applyStatus: string | null = null;
            if (isUltimate && skillEffectRolled && heroSkillEffect && heroSkillEffect !== 'none') {
                applyStatus = heroSkillEffect;
            } else if (isUltimate && !heroSkillEffect) {
                const role = currentActorState.role;
                const rnd = Math.random();
                if (role === 'Khống chế') {
                    const cc = ['stun','freeze','petrify','knockup','silence'];
                    applyStatus = cc[Math.floor(rnd * cc.length)];
                } else if (role === 'Sát thủ') {
                    applyStatus = rnd > 0.5 ? 'poison' : 'bleed';
                } else if (role === 'Cung thủ') {
                    applyStatus = rnd > 0.6 ? 'slow' : (rnd > 0.3 ? 'armor_break' : 'anti_heal');
                } else if (role === 'Pháp sư') {
                    applyStatus = rnd > 0.5 ? 'burn' : (rnd > 0.25 ? 'silence' : 'atk_down');
                } else if (role === 'Tiên phong') {
                    applyStatus = 'reflect';
                }
            }

            // ===== 1. BUFF TOÀN ĐỘI / BẢN THÂN DỰA THEO KỸ NĂNG =====
            if (isUltimate && (heroSkillEffect === 'atk_up' || currentActorState.skillDesc?.toLowerCase().includes('tăng') && currentActorState.skillDesc?.toLowerCase().includes('tấn công'))) {
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                    u.hp > 0 ? { ...u, hasAtkUp: true, atkUpTurns: 3 } : u
                );
                logMsg += `Tăng 20% Tấn công toàn đội 3 lượt! `;
            }
            if (isUltimate && (heroSkillEffect === 'def_up' || currentActorState.skillDesc?.toLowerCase().includes('tăng') && currentActorState.skillDesc?.toLowerCase().includes('phòng thủ'))) {
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                    u.hp > 0 ? { ...u, hasDefUp: true, defUpTurns: 3 } : u
                );
                logMsg += `Tăng 25% Phòng thủ toàn đội 3 lượt! `;
            }
            if (isUltimate && heroSkillEffect === 'spd_up') {
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                    u.hp > 0 ? { ...u, hasSpdUp: true, slowTurns: 0 } : u
                );
                logMsg += `Tăng tốc toàn đội! `;
            }
            if (isUltimate && heroSkillEffect === 'crit_up') {
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                    u.hp > 0 ? { ...u, hasCritUp: true, critUpTurns: 3 } : u
                );
                logMsg += `Tăng 35% Bạo kích toàn đội! `;
            }
            if (isUltimate && (heroSkillEffect === 'cleanse' || currentActorState.skillDesc?.toLowerCase().includes('thanh tẩy') || currentActorState.skillDesc?.toLowerCase().includes('giải 1 trạng thái'))) {
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                    u.hp > 0 ? {
                        ...u,
                        isStunned: false, isFrozen: false, isPetrified: false, isKnockedUp: false,
                        isSilenced: false, isPoisoned: false, isBurning: false, isBleeding: false,
                        hasSlowDebuff: false, hasArmorBreak: false, hasAntiHeal: false, hasAtkDown: false,
                        tauntedBy: null,
                    } : u
                );
                popups.push({ id: actor.id, dmg: 0, key: Date.now() + 666, isCrit: false, isCleanse: true });
                logMsg += `Thanh tẩy toàn bộ trạng thái bất lợi cho toàn đội! `;
            }
            if (isUltimate && (heroSkillEffect === 'shield' || currentActorState.skillDesc?.toLowerCase().includes('khiên ảo') || currentActorState.skillDesc?.toLowerCase().includes('tạo khiên'))) {
                const shieldAmount = Math.max(Math.floor(currentActorState.maxHp * 0.18), Math.floor(currentActorState.atk * 12));
                const shieldTargets = isSupportSkill ? targets : nextUnits[selfFactionKey].filter((u: any) => u.hp > 0);
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) => {
                    if (shieldTargets.some((st: any) => st.id === u.id)) {
                        popups.push({ id: u.id, dmg: shieldAmount, key: Date.now() + 800 + u.gridPosition, isCrit: false, isShield: true });
                        return { ...u, shield: (u.shield || 0) + shieldAmount };
                    }
                    return u;
                });
                logMsg += `Cấp lớp Khiên ảo ${shieldAmount} cho đồng minh! `;
            }

            // ===== 2. HỒI NỘ (ENERGY REGEN) CHO ĐỒNG MINH =====
            if (isUltimate && (heroSkillEffect === 'energy_regen' || currentActorState.skillDesc?.toLowerCase().includes('hồi 20% thanh nộ') || currentActorState.skillDesc?.toLowerCase().includes('hồi 25% thanh nộ') || currentActorState.skillDesc?.toLowerCase().includes('hồi 15% nộ') || currentActorState.skillDesc?.toLowerCase().includes('hồi nộ'))) {
                const addMorale = 25;
                const moraleTargets = isSupportSkill ? targets : nextUnits[selfFactionKey].filter((u: any) => u.hp > 0);
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) => {
                    if (moraleTargets.some((mt: any) => mt.id === u.id)) {
                        popups.push({ id: u.id, dmg: addMorale, key: Date.now() + 500 + u.gridPosition, isCrit: true, isMorale: true });
                        return { ...u, morale: Math.min(100, (u.morale || 0) + addMorale) };
                    }
                    return u;
                });
                logMsg += `Hồi ${addMorale} Nộ khí cho đồng minh mục tiêu! `;
            }

            // ===== 3. HÚT NỘ (RAGE DRAIN) TỪ KẺ ĐỊCH =====
            if (isUltimate && (heroSkillEffect === 'rage_drain' || currentActorState.skillDesc?.toLowerCase().includes('hút 20% nộ') || currentActorState.skillDesc?.toLowerCase().includes('hút nộ'))) {
                let drainedTotal = 0;
                targets.forEach((t: any) => {
                    const drain = 20;
                    drainedTotal += drain;
                    popups.push({ id: t.id, dmg: drain, key: Date.now() + 700 + t.gridPosition, isCrit: false, isMorale: true, type: 'morale_drain' });
                });
                nextUnits[enemyFactionKey] = nextUnits[enemyFactionKey].map((u: any) => {
                    if (targets.some((t: any) => t.id === u.id)) {
                        return { ...u, morale: Math.max(0, (u.morale || 0) - 20) };
                    }
                    return u;
                });
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                    u.id === actor.id ? { ...u, morale: Math.min(100, (u.morale || 0) + Math.min(60, drainedTotal)) } : u
                );
                logMsg += `Hút Nộ khí của địch và chuyển về bản thân! `;
            }

            // ===== 4. HỒI SINH (REVIVE) =====
            let revivedHeroForQueue: any = null;
            if (isUltimate && (heroSkillEffect === 'revive' || currentActorState.skillDesc?.toLowerCase().includes('hồi sinh'))) {
                const deadAllies = nextUnits[selfFactionKey].filter((u: any) => u.hp <= 0);
                if (deadAllies.length > 0) {
                    const deadHero = deadAllies[0];
                    const reviveHp = Math.floor(deadHero.maxHp * 0.4);
                    nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                        u.id === deadHero.id ? { ...u, hp: reviveHp, morale: 0, isStunned: false, isSilenced: false, isFrozen: false, isPetrified: false, isKnockedUp: false, isPoisoned: false, isBurning: false, isBleeding: false } : u
                    );
                    // Lưu lại để thêm vào queue sau khi revive
                    revivedHeroForQueue = { ...deadHero, hp: reviveHp, morale: 0, isAlly: actor.isAlly };
                    popups.push({ id: deadHero.id, dmg: reviveHp, key: Date.now() + 999, isCrit: true, isRevive: true });
                    logMsg += `✨ HỒI SINH ${deadHero.name} với ${reviveHp} sinh lực! `;
                }
            }

            // ===== 5. THỰC THI TRÊN TỪNG MỤC TIÊU (HEAL HOẶC DAMAGE) =====
            targets.forEach((target: any, idx: number) => {
                const targetFaction = (actor.isAlly ? !isCharmed : isCharmed) ? (isSupportSkill ? 'ally' : 'enemy') : (isSupportSkill ? 'enemy' : 'ally');
                const latestTarget = nextUnits[targetFaction]?.find((u: any) => u.id === target.id) || target;

                if (isSupportSkill) {
                    // HỒI MÁU CHO ĐỒNG MINH
                    if (latestTarget.hasAntiHeal) {
                        logMsg += `${target.name} bị cấm trị liệu! `;
                        return;
                    }
                    const healAmount = Math.max(Math.floor(currentActorState.atk * 8), Math.floor(latestTarget.maxHp * 0.18));
                    popups.push({ id: target.id, dmg: healAmount, key: Date.now() + idx, isCrit: false, isHeal: true });
                    logMsg += `Hồi ${healAmount} máu cho ${target.name}. `;
                    nextUnits[targetFaction] = nextUnits[targetFaction].map((u: any) =>
                        u.id === target.id ? { ...u, hp: Math.min(u.maxHp, u.hp + healAmount) } : u
                    );
                } else {
                    // SÁT THƯƠNG LÊN KẺ ĐỊCH
                    if (latestTarget.isInvincible) {
                        popups.push({ id: target.id, dmg: 0, key: Date.now() + idx, isCrit: false });
                        logMsg += `${target.name} VÔ ĐỊCH - miễn sát thương! `;
                        return;
                    }

                    let atkMultiplier = isUltimate ? (currentActorState.skillDmgMult || 12) : 6.5;
                    const actorLatest = (actor.isAlly ? nextUnits.ally : nextUnits.enemy)?.find((u: any) => u.id === actor.id) || currentActorState;
                    if (actorLatest.hasAtkDown) atkMultiplier *= 0.7;

                    const baseDamage = currentActorState.atk * atkMultiplier;
                    const variance   = Math.floor(Math.random() * (currentActorState.atk * 1.5));
                    let damage     = Math.floor(baseDamage + variance);

                    let critChance = 15;
                    if (actorLatest.hasCritUp) critChance = 50;
                    if (currentActorState.role === 'Sát thủ') critChance += 20;
                    const isCrit = Math.random() * 100 < critChance;
                    if (isCrit) damage = Math.floor(damage * 1.6);

                    // Phá giáp & Tăng thủ
                    const effectiveDef = latestTarget.hasArmorBreak ? (latestTarget.def * 0.35) : latestTarget.def;
                    const targetDefMult = latestTarget.hasDefUp ? 1.5 : 1;
                    const dmgReduction = Math.min(0.85, (effectiveDef * targetDefMult) / ((effectiveDef * targetDefMult) + currentActorState.atk * 2 + 400));
                    damage = Math.floor(damage * (1 - dmgReduction));

                    // Xuyên giáp (Armor Pen): bỏ qua 50% thủ
                    if (heroSkillEffect === 'armor_pen' && isUltimate) {
                        const armorPenReduction = Math.min(0.85, (effectiveDef * 0.3) / ((effectiveDef * 0.3) + currentActorState.atk * 2 + 400));
                        damage = Math.floor(baseDamage * (1 - armorPenReduction) + variance);
                    }
                    // Sát thương chuẩn (True Damage): bỏ qua 100% DEF
                    if (heroSkillEffect === 'true_damage' && isUltimate) {
                        damage = Math.floor(currentActorState.atk * (currentActorState.skillDmgMult ?? 11) + variance);
                    }
                    // Sát thương theo máu tối đa (Max HP Dmg)
                    if (heroSkillEffect === 'max_hp_dmg' && isUltimate) {
                        damage = Math.floor(latestTarget.maxHp * 0.22 + baseDamage * 0.5);
                    }

                    if (latestTarget.isPetrified) {
                        damage = Math.floor(damage * 0.5); // Hóa đá giảm 50% ST nhận
                    }

                    if (damage < 1) damage = 1;

                    // Lớp khiên ảo hấp thụ trước
                    let shieldAbsorb = 0;
                    if (latestTarget.shield && latestTarget.shield > 0) {
                        shieldAbsorb = Math.min(latestTarget.shield, damage);
                        damage -= shieldAbsorb;
                        if (shieldAbsorb > 0) {
                            popups.push({ id: target.id, dmg: shieldAbsorb, key: Date.now() + idx + 1000, isCrit: false, isShield: true });
                            logMsg += `[Khiên] ${target.name} chặn ${shieldAbsorb} ST. `;
                        }
                    }

                    if (damage > 0) {
                        popups.push({ id: target.id, dmg: damage, key: Date.now() + idx, isCrit });
                        logMsg += `Gây ${damage} ST cho ${target.name}${isCrit ? ' (CRIT!)' : ''}. `;
                        // Địch bị đánh trúng: +10 Nộ khí
                        nextUnits[targetFaction] = nextUnits[targetFaction].map((u: any) =>
                            u.id === target.id ? { ...u, morale: Math.min(100, (u.morale || 0) + 10) } : u
                        );
                    }

                    // Hút máu (Lifesteal)
                    if ((actorLatest.hasLifesteal || heroSkillEffect === 'lifesteal') && damage > 0) {
                        const healBack = Math.floor(damage * 0.35);
                        nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                            u.id === actor.id ? { ...u, hp: Math.min(u.maxHp, u.hp + healBack) } : u
                        );
                        logMsg += `Hút máu +${healBack}. `;
                    }

                    const processTarget = (u: any) => {
                        if (u.id === target.id) {
                            let statusUpdates: any = {
                                shield: Math.max(0, (u.shield || 0) - shieldAbsorb)
                            };
                            const immuneCC = u.isImmuneCC;
                            if (!immuneCC) {
                                if (applyStatus === 'stun') statusUpdates.isStunned = true;
                                if (applyStatus === 'freeze') statusUpdates.isFrozen = true;
                                if (applyStatus === 'petrify') statusUpdates.isPetrified = true;
                                if (applyStatus === 'knockup') statusUpdates.isKnockedUp = true;
                                if (applyStatus === 'silence') statusUpdates.isSilenced = true;
                                if (applyStatus === 'taunt') statusUpdates.tauntedBy = actor.id;
                            }
                            if (applyStatus === 'poison') statusUpdates.isPoisoned = true;
                            if (applyStatus === 'bleed') statusUpdates.isBleeding = true;
                            if (applyStatus === 'burn') statusUpdates.isBurning = true;
                            if (applyStatus === 'slow') statusUpdates.hasSlowDebuff = true;
                            if (applyStatus === 'armor_break') statusUpdates.hasArmorBreak = true;
                            if (applyStatus === 'anti_heal') statusUpdates.hasAntiHeal = true;
                            if (applyStatus === 'atk_down') statusUpdates.hasAtkDown = true;
                            if (applyStatus === 'reflect') statusUpdates.hasReflect = true;
                            const newHp = Math.max(0, u.hp - damage);
                            const finalHp = u.isUndying ? Math.max(1, newHp) : newHp;
                            return { ...u, hp: finalHp, ...statusUpdates };
                        }
                        return u;
                    };

                    nextUnits[targetFaction] = nextUnits[targetFaction].map(processTarget);

                    // Phản sát thương (Reflect)
                    if (latestTarget.hasReflect && damage > 0) {
                        const reflectDmg = Math.floor(damage * 0.25);
                        nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                            u.id === actor.id ? { ...u, hp: Math.max(0, u.hp - reflectDmg) } : u
                        );
                        popups.push({ id: actor.id, dmg: reflectDmg, key: Date.now() + idx + 2000, isCrit: false, isReflect: true });
                        logMsg += `[Phản] ${target.name} phản ${reflectDmg} ST! `;
                    }
                }
            });

            // Tăng 25 nộ khi đánh thường thành công
            if (!isUltimate && !isSupportSkill) {
                nextUnits[selfFactionKey] = nextUnits[selfFactionKey].map((u: any) =>
                    u.id === actor.id ? { ...u, morale: Math.min(100, (u.morale || 0) + 25) } : u
                );
            }

            setLogs((prev: any) => [logMsg, ...prev].slice(0, 5));
            
            let effectType = 'slash';
            if (isSupportSkill) effectType = 'heal';
            else if (isUltimate) {
                const ef = heroSkillEffect;
                if (ef === 'burn') effectType = 'dragon';
                else if (ef === 'freeze') effectType = 'ice';
                else if (ef === 'stun') effectType = 'stun';
                else if (ef === 'silence') effectType = 'silence';
                else if (ef === 'knockup') effectType = 'knockup';
                else if (ef === 'bleed') effectType = 'bleed';
                else if (ef === 'poison') effectType = 'poison_strike';
                else if (ef === 'taunt') effectType = 'taunt_strike';
                else if (ef === 'true_damage') effectType = 'true_dmg';
                else if (ef === 'armor_pen') effectType = 'arrow';
                else if (ef === 'max_hp_dmg') effectType = 'smash';
                else {
                    const role = currentActorState.role;
                    if (role === 'Pháp sư') effectType = 'dragon';
                    else if (role === 'Cung thủ') effectType = 'arrow';
                    else if (role === 'Khống chế') effectType = 'ice';
                    else if (role === 'Sát thủ') effectType = 'bleed';
                    else effectType = 'smash';
                }
            } else {
                const role = currentActorState.role;
                if (role === 'Pháp sư') effectType = 'normal_magic';
                else if (role === 'Cung thủ' || role === 'Xạ thủ') effectType = 'arrow';
                else if (role === 'Khống chế') effectType = 'normal_control';
                else if (role === 'Sát thủ') effectType = 'normal_assassin';
                else if (role === 'Tiên phong') effectType = 'normal_tank';
                else if (role === 'Hỗ trợ') effectType = 'heal';
                else effectType = 'slash';
            }

            setActiveEffect(effectType);
            setDamagePopups(popups);
            setUnits(nextUnits);
            // Cập nhật unitsRef ngay lập tức để các lượt sau không bị stale
            unitsRef.current = nextUnits;
            setActiveSkillVideo(null);
            
            // Nếu có tướng vừa được hồi sinh → thêm vào cuối queue của hiệp này
            if (revivedHeroForQueue) {
                setTurnQueue(prev => {
                    // Tránh thêm trùng nếu tướng đó vẫn còn trong queue (trường hợp edge case)
                    const alreadyInQueue = prev.some((u: any) => u.id === revivedHeroForQueue.id);
                    if (alreadyInQueue) return prev;
                    return [...prev, revivedHeroForQueue];
                });
            }

            if (hasSkillVideo && t2.current) {
                clearTimeout(t2.current);
                t2.current = setTimeout(() => {
                    setActiveAttacker(null); setActiveTargets([]); setActiveEffect(null);
                    setDamagePopups([]); setAttackerOffset({ tx: 0, ty: 0 });
                    processingRef.current = false;
                    setTurnQueue(prev => prev.slice(1));
                }, resetAt);
            }
        }; // end runHitLogic

        if (hasSkillVideo) {
            // Lưu callback để video overlay gọi khi end/skip
            hitCallbackRef.current = () => { runHitLogic(); };
            // Fallback: nếu sau 30s video chưa kết thúc/bị skip thì tự chạy
            t1.current = setTimeout(() => { hitCallbackRef.current = null; runHitLogic(); }, 30000);
        } else {
            // Không có video: chạy bình thường sau hitAt ms
            t1.current = setTimeout(runHitLogic, hitAt);
        }

        t2.current = setTimeout(() => {
            setActiveAttacker(null);
            setActiveTargets([]);
            setActiveEffect(null);
            setDamagePopups([]);
            setAttackerOffset({ tx: 0, ty: 0 });
            processingRef.current = false;
            
            setUnits((prev: any) => {
                const p = {...prev};
                let dotLogs: string[] = [];

                const applyDoT = (u: any) => {
                    // Tướng đã chết KHÔNG nhận DoT và KHÔNG được update thêm
                    if (u.hp <= 0) return { ...u, hp: 0 }; // Đảm bảo hp không bao giờ âm
                    let newU = { ...u };
                    // Độc: 5% maxHP
                    if (u.isPoisoned) {
                        const pdmg = Math.floor(u.maxHp * 0.05);
                        dotLogs.push(`☠️ [Độc] ${u.name} mất ${pdmg} HP.`);
                        newU.hp = Math.max(0, newU.hp - pdmg);
                    }
                    // Thiêu đốt: 4% maxHP
                    if (u.isBurning) {
                        const bdmg = Math.floor(u.maxHp * 0.04);
                        dotLogs.push(`🔥 [Thiêu] ${u.name} mất ${bdmg} HP.`);
                        newU.hp = Math.max(0, newU.hp - bdmg);
                        // Giảm dần sau 3 lượt (dùng burnStacks)
                        newU.burnStacks = (newU.burnStacks || 3) - 1;
                        if (newU.burnStacks <= 0) newU.isBurning = false;
                    }
                    // Chảy máu: 3% maxHP
                    if (u.isBleeding) {
                        const bldmg = Math.floor(u.maxHp * 0.03);
                        dotLogs.push(`🩸 [Chảy máu] ${u.name} mất ${bldmg} HP.`);
                        newU.hp = Math.max(0, newU.hp - bldmg);
                        newU.bleedStacks = (newU.bleedStacks || 3) - 1;
                        if (newU.bleedStacks <= 0) newU.isBleeding = false;
                    }
                    // Giảm tốc: tự hết sau 2 lượt
                    if (u.hasSlowDebuff) {
                        newU.slowTurns = (newU.slowTurns || 2) - 1;
                        if (newU.slowTurns <= 0) newU.hasSlowDebuff = false;
                    }
                    // Phá giáp: hết sau 3 lượt
                    if (u.hasArmorBreak) {
                        newU.armorBreakTurns = (newU.armorBreakTurns || 3) - 1;
                        if (newU.armorBreakTurns <= 0) newU.hasArmorBreak = false;
                    }
                    // Cấm trị liệu: hết sau 2 lượt
                    if (u.hasAntiHeal) {
                        newU.antiHealTurns = (newU.antiHealTurns || 2) - 1;
                        if (newU.antiHealTurns <= 0) newU.hasAntiHeal = false;
                    }
                    // Giảm công: hết sau 2 lượt
                    if (u.hasAtkDown) {
                        newU.atkDownTurns = (newU.atkDownTurns || 2) - 1;
                        if (newU.atkDownTurns <= 0) newU.hasAtkDown = false;
                    }
                    // Vô địch: hết sau invincibleTurns
                    if (u.isInvincible) {
                        newU.invincibleTurns = (newU.invincibleTurns || 1) - 1;
                        if (newU.invincibleTurns <= 0) newU.isInvincible = false;
                    }
                    // Khiêu khích: hết sau 2 lượt
                    if (u.tauntedBy) {
                        newU.tauntTurns = (newU.tauntTurns || 2) - 1;
                        if (newU.tauntTurns <= 0) { newU.tauntedBy = null; }
                    }
                    // Phản sát thương: hết sau 2 lượt
                    if (u.hasReflect) {
                        newU.reflectTurns = (newU.reflectTurns || 2) - 1;
                        if (newU.reflectTurns <= 0) newU.hasReflect = false;
                    }
                    // Hút máu: hết sau 3 lượt
                    if (u.hasLifesteal) {
                        newU.lifestealTurns = (newU.lifestealTurns || 3) - 1;
                        if (newU.lifestealTurns <= 0) newU.hasLifesteal = false;
                    }
                    // Tăng công
                    if (u.hasAtkUp) {
                        newU.atkUpTurns = (newU.atkUpTurns || 3) - 1;
                        if (newU.atkUpTurns <= 0) newU.hasAtkUp = false;
                    }
                    // Tăng thủ
                    if (u.hasDefUp) {
                        newU.defUpTurns = (newU.defUpTurns || 3) - 1;
                        if (newU.defUpTurns <= 0) newU.hasDefUp = false;
                    }
                    // Tăng tỷ lệ bkích
                    if (u.hasCritUp) {
                        newU.critUpTurns = (newU.critUpTurns || 3) - 1;
                        if (newU.critUpTurns <= 0) newU.hasCritUp = false;
                    }
                    // Bất tử
                    if (u.isUndying) {
                        newU.undyingTurns = (newU.undyingTurns || 2) - 1;
                        if (newU.undyingTurns <= 0) newU.isUndying = false;
                    }
                    // Chia sẻ sát thương
                    if (u.hasDamageShare) {
                        newU.damageShareTurns = (newU.damageShareTurns || 3) - 1;
                        if (newU.damageShareTurns <= 0) newU.hasDamageShare = false;
                    }
                    // Miễn khống chế
                    if (u.isImmuneCC) {
                        newU.immuneCCTurns = (newU.immuneCCTurns || 3) - 1;
                        if (newU.immuneCCTurns <= 0) newU.isImmuneCC = false;
                    }
                    // Phản công
                    if (u.hasCounter) {
                        newU.counterTurns = (newU.counterTurns || 3) - 1;
                        if (newU.counterTurns <= 0) newU.hasCounter = false;
                    }
                    return newU;
                };

                // Áp DoT cho cả hai phe (effect của ai đó đánh xong thì enemy cũng chịu DoT nếu có)
                p.ally = p.ally.map(applyDoT);
                p.enemy = p.enemy.map(applyDoT);
                // Cập nhật unitsRef sau DoT
                unitsRef.current = p;
                if (dotLogs.length > 0) setLogs((l:any) => [...dotLogs, ...l].slice(0,5));
                return p;
            });

            // Xóa actor vừa hành động khỏi queue VÀ lọc bỏ tướng đã chết (hp <= 0 theo unitsRef mới nhất)
            setTurnQueue(prev => {
                const afterSlice = prev.slice(1);
                // Lọc thêm tướng đã chết dựa trên unitsRef cập nhật sau DoT
                return afterSlice.filter((u: any) => {
                    const liveUnits = unitsRef.current;
                    const found = u.isAlly
                        ? liveUnits.ally.find((x: any) => x.id === u.id)
                        : liveUnits.enemy.find((x: any) => x.id === u.id);
                    return found && found.hp > 0;
                });
            });
        }, hasSkillVideo ? 33000 : resetAt);
        // ^ Nếu có video: t2 chạy sau 33s (video 30s + 3s effect), đảm bảo luôn được reset

    }, [turnQueue, active, result]);

    const getTargetClass = (id: string, isAlly: boolean) => {
        if (activeAttacker === id) {
            return isAlly
                ? 'z-[200] drop-shadow-[0_0_40px_rgba(234,179,8,1)]'
                : 'z-[200] drop-shadow-[0_0_40px_rgba(239,68,68,1)]';
        }
        if (activeTargets.includes(id)) {
            if (activeEffect === 'heal') return 'animate-pulse drop-shadow-[0_0_50px_rgba(34,197,94,1)]';
            if (activeEffect === 'smash' || activeEffect === 'dragon' || activeEffect === 'normal_tank') return 'animate-shake drop-shadow-[0_0_50px_rgba(239,68,68,1)]';
            if (activeEffect === 'ice' || activeEffect === 'stun' || activeEffect === 'normal_control') return 'animate-shake drop-shadow-[0_0_50px_rgba(59,130,246,1)]';
            if (activeEffect === 'silence') return 'animate-shake drop-shadow-[0_0_50px_rgba(168,85,247,1)]';
            if (activeEffect === 'knockup') return 'animate-bounce drop-shadow-[0_0_50px_rgba(255,255,255,1)]';
            if (activeEffect === 'bleed' || activeEffect === 'normal_assassin') return 'animate-shake drop-shadow-[0_0_50px_rgba(220,38,38,1)]';
            if (activeEffect === 'poison_strike') return 'animate-shake drop-shadow-[0_0_50px_rgba(132,204,22,1)]';
            if (activeEffect === 'taunt_strike') return 'animate-shake drop-shadow-[0_0_50px_rgba(251,146,60,1)]';
            if (activeEffect === 'arrow') return 'animate-shake drop-shadow-[0_0_50px_rgba(234,179,8,1)]';
            if (activeEffect === 'slash') return 'animate-shake drop-shadow-[0_0_50px_rgba(255,255,255,1)]';
            if (activeEffect === 'normal_magic') return 'animate-shake drop-shadow-[0_0_50px_rgba(168,85,247,1)]';
            return 'animate-shake drop-shadow-[0_0_50px_rgba(255,255,255,1)]';
        }
        return '';
    };

    const renderGrid = (factionUnits: any[], isAlly: boolean) => {
        const slots = [0, 1, 2, 3, 4, 5];
        return (
            <div className={`grid grid-cols-2 gap-2 md:gap-4 lg:gap-6 w-full max-w-[320px]`}>
                {slots.map(idx => {
                    const unit = factionUnits.find(u => u.gridPosition === idx);
                    if (!unit) {
                        return <div key={idx} className="w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-48 border-2 border-dashed border-white/10 rounded-xl bg-black/20" />;
                    }
                    
                    const hpPercent = Math.max(0, (unit.hp / unit.maxHp) * 100);
                    const moralePercent = Math.max(0, ((unit.morale || 0) / 100) * 100);
                    const isDead = unit.hp <= 0;
                    const popups = damagePopups.filter(p => p.id === unit.id);

                    const isAttacker = activeAttacker === unit.id;
                    const cardStyle: React.CSSProperties = isAttacker
                        ? {
                            transform: `translate(${attackerOffset.tx}px, ${attackerOffset.ty}px) scale(1.55)`,
                            transition: 'transform 0.35s cubic-bezier(0.22,0.91,0.54,1.02)',
                            position: 'relative',
                            zIndex: 200,
                          }
                        : {
                            transform: 'translate(0, 0) scale(1)',
                            transition: 'transform 0.35s ease-in-out',
                          };

                    // Attacker visual enhancement
                    const roleAura: Record<string, string> = {
                        'Pháp sư': 'rgba(220,38,38,0.8)',
                        'Cung thủ': 'rgba(234,179,8,0.8)',
                        'Xạ thủ': 'rgba(234,179,8,0.8)',
                        'Khống chế': 'rgba(59,130,246,0.8)',
                        'Tiên phong': 'rgba(251,146,60,0.8)',
                        'Sát thủ': 'rgba(168,85,247,0.8)',
                        'Hỗ trợ': 'rgba(34,197,94,0.8)',
                    };
                    const auraColor = isAttacker ? (roleAura[unit.role] || 'rgba(255,200,50,0.8)') : '';
                    const isUltimateActor = isAttacker && (unit.morale >= 100 || activeEffect !== null);

                    return (
                        <div id={`combat-card-${unit.id}`} key={unit.id} style={cardStyle} className={`relative flex flex-col items-center justify-end ${isDead ? 'opacity-30 grayscale blur-[2px]' : ''} ${getTargetClass(unit.id, isAlly)} w-16 h-24 sm:w-20 sm:h-28 md:w-24 md:h-36 lg:w-28 lg:h-40 xl:w-32 xl:h-48 mx-auto`}>
                            {/* ===== ATTACKER VISUAL EFFECTS ===== */}
                            {isAttacker && (
                                <>
                                    {/* Outer spinning ring */}
                                    <div style={{
                                        position: 'absolute', inset: '-16px', borderRadius: '50%',
                                        border: `3px solid ${auraColor}`,
                                        animation: 'spinRing 1.2s linear infinite',
                                        boxShadow: `0 0 24px ${auraColor}, 0 0 48px ${auraColor}`,
                                        pointerEvents: 'none', zIndex: 300,
                                    }} />
                                    {/* Inner aura pulse */}
                                    <div style={{
                                        position: 'absolute', inset: '-6px', borderRadius: '14px',
                                        background: `radial-gradient(ellipse at center, ${auraColor} 0%, transparent 70%)`,
                                        animation: 'auraPulse 0.8s ease-in-out infinite',
                                        pointerEvents: 'none', zIndex: 299,
                                    }} />
                                    {/* Particle sparks — 6 sparks flying out */}
                                    {[
                                        { sx: '40px',  sy: '-55px' },
                                        { sx: '-45px', sy: '-50px' },
                                        { sx: '55px',  sy: '10px'  },
                                        { sx: '-55px', sy: '10px'  },
                                        { sx: '20px',  sy: '55px'  },
                                        { sx: '-20px', sy: '55px'  },
                                    ].map((s, si) => (
                                        <div key={si} style={{
                                            position: 'absolute', top: '50%', left: '50%',
                                            width: '8px', height: '8px', borderRadius: '50%',
                                            background: auraColor,
                                            boxShadow: `0 0 8px ${auraColor}`,
                                            '--sx': s.sx, '--sy': s.sy,
                                            animation: `sparkFly 0.9s ease-out ${si * 0.12}s infinite`,
                                            pointerEvents: 'none', zIndex: 301,
                                        } as React.CSSProperties} />
                                    ))}
                                    {/* Skill name label */}
                                    <div style={{
                                        position: 'absolute', bottom: '-32px', left: '50%',
                                        transform: 'translateX(-50%)',
                                        whiteSpace: 'nowrap',
                                        background: 'rgba(0,0,0,0.75)',
                                        border: `1px solid ${auraColor}`,
                                        borderRadius: '999px',
                                        padding: '3px 10px',
                                        color: auraColor,
                                        fontWeight: 900,
                                        fontSize: '12px',
                                        letterSpacing: '1px',
                                        animation: 'skillNamePop 0.4s ease-out forwards',
                                        boxShadow: `0 0 10px ${auraColor}`,
                                        zIndex: 302, pointerEvents: 'none',
                                    }}>
                                        ⚔ {unit.name}
                                    </div>
                                </>
                            )}
                            {/* ===== END ATTACKER EFFECTS ===== */}
                            {popups.map(popup => {
                                const isMorale = popup.type === 'morale' || (popup as any).isMorale;
                                const isDrain = popup.type === 'morale_drain';
                                const isRevive = (popup as any).isRevive;
                                const isCleanse = (popup as any).isCleanse;
                                return (
                                    <div key={popup.key} style={{
                                        position: 'absolute',
                                        top: '-2.5rem',
                                        left: '50%',
                                        zIndex: 60,
                                        whiteSpace: 'nowrap',
                                        fontWeight: 900,
                                        fontSize: popup.isCrit || isRevive ? 'clamp(18px,4vw,38px)' : 'clamp(14px,3vw,30px)',
                                        animation: popup.isHeal || isRevive ? 'healPopup 1s ease-out forwards'
                                                 : popup.isShield ? 'shieldPopup 1s ease-out forwards'
                                                 : popup.isReflect ? 'reflectPopup 1s ease-out forwards'
                                                 : popup.isCrit ? 'critPopup 1s ease-out forwards'
                                                 : 'damagePopup 1s ease-out forwards',
                                        color: isRevive ? '#38bdf8'
                                             : isMorale ? '#facc15'
                                             : isCleanse ? '#34d399'
                                             : popup.isHeal ? '#4ade80'
                                             : popup.isShield ? '#93c5fd'
                                             : popup.isReflect ? '#c084fc'
                                             : popup.isCrit ? '#fde047'
                                             : popup.dmg === 0 ? '#94a3b8'
                                             : '#ef4444',
                                        filter: isRevive ? 'drop-shadow(0 0 12px rgba(56,189,248,1))'
                                              : isMorale ? 'drop-shadow(0 0 10px rgba(250,204,21,0.9))'
                                              : isCleanse ? 'drop-shadow(0 0 10px rgba(52,211,153,0.9))'
                                              : popup.isHeal ? 'drop-shadow(0 0 8px rgba(34,197,94,0.9))'
                                              : popup.isShield ? 'drop-shadow(0 0 8px rgba(147,197,253,0.9))'
                                              : popup.isReflect ? 'drop-shadow(0 0 8px rgba(192,132,252,0.9))'
                                              : popup.isCrit ? 'drop-shadow(0 0 10px rgba(234,179,8,1))'
                                              : 'drop-shadow(0 0 6px rgba(0,0,0,0.9))',
                                    }}>
                                        {isRevive ? `✨ HỒI SINH (+${popup.dmg}) ✨`
                                         : isDrain ? `⚡-${popup.dmg} NỘ`
                                         : isMorale ? `⚡+${popup.dmg} NỘ`
                                         : isCleanse ? `🌿 THANH TẨY`
                                         : popup.isHeal ? `+${popup.dmg}`
                                         : popup.isShield ? `🛡️-${popup.dmg}`
                                         : popup.isReflect ? `🪞-${popup.dmg}`
                                         : popup.dmg === 0 ? '⭐MIỄN⭐'
                                         : `-${popup.dmg}`}{' '}
                                        {popup.isCrit && !popup.isHeal && !popup.isShield && !popup.isReflect && !isMorale && !isRevive ? 'CRIT!' : ''}
                                    </div>
                                );
                            })}
                            {activeEffect && activeTargets.includes(unit.id) && (
                                <div className="absolute inset-0 z-40 pointer-events-none flex items-center justify-center overflow-hidden rounded-xl">
                                    {activeEffect === 'heal' && <div style={{ width:'100%', height:'100%', background:'rgba(34,197,94,0.4)', borderRadius:'10px', animation:'healOverlay 0.6s ease-in-out infinite alternate', border:'2px solid rgba(34,197,94,0.8)' }} />}
                                    {activeEffect === 'smash' && <div style={{ width:'160%', height:'160%', background:'radial-gradient(circle, rgba(255,100,0,0.85) 0%, transparent 70%)', borderRadius:'50%', animation:'ping 0.5s ease-out' }} />}
                                    {activeEffect === 'dragon' && (
                                        <>
                                            <div style={{ width:'200%', height:'200%', background:'radial-gradient(ellipse, rgba(255,30,0,0.7) 0%, transparent 65%)', animation:'dragonStrike 0.5s ease-out forwards', transform:'rotate(45deg)' }} />
                                            <div style={{ position:'absolute', width:'120%', height:'12px', background:'linear-gradient(90deg, transparent, rgba(255,100,0,1), transparent)', animation:'arrowStrike 0.4s ease-out', transform:'rotate(-30deg)' }} />
                                        </>
                                    )}
                                    {activeEffect === 'arrow' && <div style={{ width:'150%', height:'12px', background:'linear-gradient(90deg, transparent, white, transparent)', transform:'rotate(45deg)', animation:'arrowStrike 0.5s ease-out', boxShadow:'0 0 20px white' }} />}
                                    {(activeEffect === 'ice' || activeEffect === 'stun') && (
                                        <>
                                            <div style={{ width:'100%', height:'100%', background: activeEffect==='ice' ? 'rgba(147,210,255,0.5)' : 'rgba(255,215,0,0.4)', borderRadius:'10px', border: activeEffect==='ice' ? '3px solid cyan' : '3px solid gold', animation:'freezeOverlay 0.4s ease-in-out infinite alternate', boxShadow: activeEffect==='ice' ? '0 0 25px cyan' : '0 0 25px gold' }} />
                                            {activeEffect === 'stun' && <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', animation:'spinStar 0.4s linear infinite' }}><Star size={32} color="gold" fill="gold" /></div>}
                                        </>
                                    )}
                                    {activeEffect === 'slash' && (
                                        <>
                                            {/* Dao chém X đẹp với gradient */}
                                            <div style={{ position:'absolute', width:'140%', height:'6px', background:'linear-gradient(90deg, transparent, rgba(255,255,255,0.9), white, rgba(255,255,255,0.9), transparent)', transform:'rotate(40deg)', animation:'slashEffect 0.35s ease-out forwards', boxShadow:'0 0 20px rgba(255,255,255,0.8), 0 0 40px rgba(200,200,255,0.5)', borderRadius:'3px' }} />
                                            <div style={{ position:'absolute', width:'140%', height:'6px', background:'linear-gradient(90deg, transparent, rgba(200,220,255,0.9), white, rgba(200,220,255,0.9), transparent)', transform:'rotate(-40deg)', animation:'slashEffect 0.35s ease-out 0.06s forwards', boxShadow:'0 0 20px rgba(200,220,255,0.8)', borderRadius:'3px' }} />
                                            <div style={{ position:'absolute', inset:0, background:'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', animation:'slashEffect 0.35s ease-out forwards', borderRadius:'10px' }} />
                                        </>
                                    )}
                                    {/* Đòn thường: Pháp sư */}
                                    {activeEffect === 'normal_magic' && (
                                        <>
                                            <div style={{ position:'absolute', width:'120%', height:'120%', background:'radial-gradient(circle, rgba(150,50,255,0.6) 0%, rgba(100,20,200,0.3) 40%, transparent 70%)', animation:'ping 0.5s ease-out forwards', borderRadius:'50%' }} />
                                            <div style={{ position:'absolute', width:'60%', height:'6px', background:'linear-gradient(90deg, transparent, rgba(180,100,255,1), transparent)', animation:'arrowStrike 0.4s ease-out', boxShadow:'0 0 15px rgba(150,50,255,0.9)' }} />
                                        </>
                                    )}
                                    {/* Đòn thường: Sát thủ */}
                                    {activeEffect === 'normal_assassin' && (
                                        <>
                                            <div style={{ position:'absolute', width:'140%', height:'4px', background:'linear-gradient(90deg, transparent, rgba(200,0,50,0.9), rgba(255,50,80,1), rgba(200,0,50,0.9), transparent)', transform:'rotate(30deg)', animation:'slashEffect 0.3s ease-out forwards', boxShadow:'0 0 15px rgba(200,0,50,0.8)', borderRadius:'2px' }} />
                                            <div style={{ position:'absolute', width:'140%', height:'4px', background:'linear-gradient(90deg, transparent, rgba(150,0,200,0.9), rgba(200,50,255,1), rgba(150,0,200,0.9), transparent)', transform:'rotate(-30deg)', animation:'slashEffect 0.3s ease-out 0.05s forwards', boxShadow:'0 0 15px rgba(150,0,200,0.8)', borderRadius:'2px' }} />
                                            <div style={{ position:'absolute', width:'140%', height:'4px', background:'linear-gradient(90deg, transparent, rgba(180,0,100,0.8), transparent)', transform:'rotate(0deg)', animation:'slashEffect 0.3s ease-out 0.1s forwards', boxShadow:'0 0 10px rgba(200,0,50,0.6)', borderRadius:'2px' }} />
                                        </>
                                    )}
                                    {/* Đòn thường: Tiên phong / Tank */}
                                    {activeEffect === 'normal_tank' && (
                                        <>
                                            <div style={{ position:'absolute', width:'180%', height:'180%', background:'radial-gradient(circle, rgba(255,120,0,0.7) 0%, rgba(255,80,0,0.3) 40%, transparent 70%)', animation:'ping 0.4s ease-out forwards', borderRadius:'50%' }} />
                                            <div style={{ position:'absolute', inset:'-4px', border:'4px solid rgba(255,140,0,0.8)', borderRadius:'12px', animation:'auraPulse 0.3s ease-out forwards', boxShadow:'0 0 25px rgba(255,140,0,0.8)' }} />
                                        </>
                                    )}
                                    {/* Đòn thường: Khống chế */}
                                    {activeEffect === 'normal_control' && (
                                        <>
                                            <div style={{ position:'absolute', width:'100%', height:'100%', background:'rgba(80,120,255,0.3)', border:'3px solid rgba(100,150,255,0.8)', borderRadius:'10px', animation:'freezeOverlay 0.4s ease-in-out forwards', boxShadow:'0 0 20px rgba(80,120,255,0.6)' }} />
                                            <div style={{ position:'absolute', width:'60%', height:'6px', background:'linear-gradient(90deg, transparent, rgba(100,180,255,0.9), transparent)', animation:'arrowStrike 0.4s ease-out', boxShadow:'0 0 10px rgba(100,180,255,0.6)' }} />
                                        </>
                                    )}
                                    {activeEffect === 'silence' && (
                                        <div style={{ width:'100%', height:'100%', background:'rgba(168,85,247,0.4)', borderRadius:'10px', border:'3px dashed rgba(200,100,255,0.9)', animation:'silenceOverlay 0.5s ease-in-out infinite alternate', boxShadow:'0 0 20px rgba(168,85,247,0.6)' }}>
                                            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}><VolumeX size={32} color="violet" /></div>
                                        </div>
                                    )}
                                    {activeEffect === 'knockup' && (
                                        <div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.3)', borderRadius:'10px', border:'3px solid rgba(255,255,255,0.8)', animation:'knockupOverlay 0.5s ease-out', boxShadow:'0 0 30px white' }}>
                                            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', animation:'bounce 0.3s ease-out' }}><Wind size={32} color="white" /></div>
                                        </div>
                                    )}
                                    {activeEffect === 'bleed' && (
                                        <div style={{ width:'100%', height:'100%', background:'rgba(220,0,0,0.35)', borderRadius:'10px', border:'3px solid rgba(220,30,30,0.9)', animation:'bleedDrip 0.4s ease-in-out infinite alternate', boxShadow:'0 0 20px rgba(200,0,0,0.8)' }}>
                                            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}><Droplets size={32} color="red" /></div>
                                        </div>
                                    )}
                                    {activeEffect === 'poison_strike' && (
                                        <div style={{ width:'100%', height:'100%', background:'rgba(80,200,0,0.35)', borderRadius:'10px', border:'3px solid rgba(100,220,0,0.9)', animation:'poisonBubble 0.5s ease-in-out infinite alternate', boxShadow:'0 0 20px rgba(80,200,0,0.7)' }}>
                                            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}><Skull size={32} color="#50c800" /></div>
                                        </div>
                                    )}
                                    {activeEffect === 'taunt_strike' && (
                                        <div style={{ width:'100%', height:'100%', background:'rgba(255,100,0,0.3)', borderRadius:'10px', border:'3px solid rgba(255,130,0,0.9)', animation:'burnFlicker 0.3s ease-in-out infinite alternate', boxShadow:'0 0 20px rgba(255,100,0,0.8)' }}>
                                            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}><Frown size={32} color="orange" /></div>
                                        </div>
                                    )}
                                    {/* Sát thương chuẩn - trắng xuyên thấu */}
                                    {activeEffect === 'true_dmg' && (
                                        <>
                                            <div style={{ width:'100%', height:'100%', background:'rgba(255,255,255,0.5)', borderRadius:'10px', border:'3px solid white', animation:'trueDmgFlash 0.3s ease-out', boxShadow:'0 0 30px white, inset 0 0 20px rgba(255,255,255,0.5)' }} />
                                            <div style={{ position:'absolute', width:'80%', height:'6px', background:'white', boxShadow:'0 0 15px white, 0 0 30px cyan', borderRadius:'3px', animation:'laserBeam 0.4s ease-out' }} />
                                        </>
                                    )}
                                    {/* Xuyên giáp */}
                                    {activeEffect === 'armor_pen' && (
                                        <div style={{ width:'100%', height:'100%', background:'rgba(255,165,0,0.3)', borderRadius:'10px', border:'3px solid rgba(255,165,0,0.9)', boxShadow:'0 0 20px orange', animation:'armorPenFlash 0.4s ease-out' }}>
                                            <div style={{ position:'absolute', width:'40%', height:'110%', background:'linear-gradient(to bottom, transparent, rgba(255,165,0,0.8), transparent)', left:'30%', animation:'drillThrough 0.4s ease-in-out', filter:'blur(2px)' }} />
                                        </div>
                                    )}
                                    {/* Máu tối đa */}
                                    {activeEffect === 'max_hp' && (
                                        <div style={{ width:'100%', height:'100%', background:'rgba(180,0,50,0.4)', borderRadius:'10px', border:'3px solid rgba(255,50,100,0.9)', animation:'maxHpPulse 0.3s ease-in-out infinite alternate', boxShadow:'0 0 25px rgba(255,50,100,0.8)' }}>
                                            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}><HeartCrack size={32} color="#ff3264" /></div>
                                        </div>
                                    )}
                                    {/* Kết liễu */}
                                    {activeEffect === 'execute' && (
                                        <div style={{ width:'100%', height:'100%', background:'rgba(30,0,0,0.6)', borderRadius:'10px', border:'3px solid rgba(200,0,0,0.9)', animation:'executePulse 0.2s ease-in-out infinite alternate', boxShadow:'0 0 30px rgba(200,0,0,0.9)' }}>
                                            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', animation:'spinStar 0.3s linear infinite' }}><Skull size={32} color="#c80000" /></div>
                                        </div>
                                    )}
                                    {/* Buff overlay (tăng công/thủ/tốc/cleanse...) */}
                                    {activeEffect === 'buff' && (
                                        <div style={{ width:'100%', height:'100%', background:'rgba(50,220,150,0.3)', borderRadius:'10px', border:'3px solid rgba(80,255,180,0.9)', animation:'buffGlow 0.4s ease-in-out infinite alternate', boxShadow:'0 0 25px rgba(50,220,150,0.8)' }}>
                                            <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(45deg, rgba(80,255,180,0.08) 0px, rgba(80,255,180,0.08) 2px, transparent 2px, transparent 8px)', borderRadius:'10px' }} />
                                            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)' }}><Sparkles size={32} color="#50ffb4" /></div>
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="w-full h-full relative rounded-xl overflow-hidden border-[3px] border-amber-900/40 shadow-2xl bg-stone-900">
                                <img src={unit.image} className="w-full h-full object-cover" alt={unit.name} onError={(e) => { (e.target as HTMLImageElement).src = unit.faction === 'enemy' ? DEFAULT_ENEMY_IMG : DEFAULT_ALLY_IMG; }} />
                                
                                {/* ===== STATUS EFFECT OVERLAYS ===== */}
                                {/* Đóng băng overlay */}
                                {unit.isFrozen && (
                                    <div style={{ position:'absolute', inset:0, borderRadius:'10px', background:'rgba(147,210,255,0.35)', border:'2px solid rgba(147,210,255,0.9)', animation:'freezeOverlay 1s ease-in-out infinite', pointerEvents:'none', zIndex:15 }}>
                                        <div style={{ position:'absolute', inset:0, backgroundImage:'repeating-linear-gradient(45deg, rgba(200,240,255,0.15) 0px, rgba(200,240,255,0.15) 2px, transparent 2px, transparent 8px)', borderRadius:'10px' }} />
                                    </div>
                                )}
                                {/* Thiêu đốt overlay */}
                                {unit.isBurning && (
                                    <div style={{ position:'absolute', inset:0, borderRadius:'10px', background:'rgba(255,80,0,0.25)', border:'2px solid rgba(255,120,0,0.8)', animation:'burnFlicker 0.4s ease-in-out infinite alternate', pointerEvents:'none', zIndex:15 }} />
                                )}
                                {/* Chảy máu overlay */}
                                {unit.isBleeding && (
                                    <div style={{ position:'absolute', inset:0, borderRadius:'10px', background:'rgba(180,0,0,0.2)', border:'2px solid rgba(220,30,30,0.7)', animation:'bleedDrip 0.8s ease-in-out infinite', pointerEvents:'none', zIndex:15 }} />
                                )}
                                {/* Hóa đá overlay */}
                                {unit.isPetrified && (
                                    <div style={{ position:'absolute', inset:0, borderRadius:'10px', background:'rgba(150,150,150,0.5)', border:'2px solid rgba(180,180,180,0.8)', pointerEvents:'none', zIndex:15, filter:'grayscale(0.8)' }} />
                                )}
                                {/* Vô địch overlay */}
                                {unit.isInvincible && (
                                    <div style={{ position:'absolute', inset:'-4px', borderRadius:'14px', border:'3px solid rgba(255,215,0,0.9)', animation:'invincibleGlow 0.5s ease-in-out infinite alternate', boxShadow:'0 0 20px rgba(255,215,0,0.8), inset 0 0 20px rgba(255,215,0,0.2)', pointerEvents:'none', zIndex:20 }} />
                                )}
                                {/* Tạo khiên overlay */}
                                {unit.shield > 0 && (
                                    <div style={{ position:'absolute', inset:'-3px', borderRadius:'13px', border:'2px solid rgba(120,200,255,0.8)', animation:'shieldPulse 1s ease-in-out infinite', boxShadow:'0 0 12px rgba(120,200,255,0.6)', pointerEvents:'none', zIndex:18 }} />
                                )}
                                {/* Phản sát thương overlay */}
                                {unit.hasReflect && (
                                    <div style={{ position:'absolute', inset:0, borderRadius:'10px', background:'linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(236,72,153,0.15) 100%)', border:'2px solid rgba(168,85,247,0.7)', animation:'reflectShimmer 1.2s ease-in-out infinite', pointerEvents:'none', zIndex:15 }} />
                                )}
                                {/* Câm lặng overlay */}
                                {unit.isSilenced && (
                                    <div style={{ position:'absolute', inset:0, borderRadius:'10px', background:'rgba(100,60,140,0.25)', border:'2px dashed rgba(168,85,247,0.7)', pointerEvents:'none', zIndex:15 }} />
                                )}
                                {/* Phá giáp overlay */}
                                {unit.hasArmorBreak && (
                                    <div style={{ position:'absolute', inset:0, borderRadius:'10px', border:'2px solid rgba(251,191,36,0.8)', background:'rgba(251,191,36,0.08)', animation:'armorBreakFlash 0.6s ease-in-out infinite alternate', pointerEvents:'none', zIndex:15 }} />
                                )}
                                {/* Tăng công overlay */}
                                {unit.hasAtkUp && (
                                    <div style={{ position:'absolute', inset:'-3px', borderRadius:'13px', border:'2px solid rgba(239,68,68,0.8)', animation:'atkUpGlow 0.8s ease-in-out infinite alternate', boxShadow:'0 0 12px rgba(239,68,68,0.6)', pointerEvents:'none', zIndex:16 }} />
                                )}
                                {/* Tăng thủ overlay */}
                                {unit.hasDefUp && (
                                    <div style={{ position:'absolute', inset:'-3px', borderRadius:'13px', border:'2px solid rgba(100,180,255,0.9)', animation:'defUpGlow 0.8s ease-in-out infinite alternate', boxShadow:'0 0 14px rgba(100,180,255,0.7)', background:'rgba(100,180,255,0.06)', pointerEvents:'none', zIndex:16 }} />
                                )}
                                {/* Bất tử overlay */}
                                {unit.isUndying && (
                                    <div style={{ position:'absolute', inset:0, borderRadius:'10px', background:'rgba(255,255,100,0.15)', border:'2px solid rgba(255,215,0,0.9)', animation:'undyingPulse 0.5s ease-in-out infinite alternate', boxShadow:'0 0 20px rgba(255,200,0,0.5)', pointerEvents:'none', zIndex:19 }}>
                                        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', opacity:0.8 }}><HeartPulse size={20} color="gold" /></div>
                                    </div>
                                )}
                                {/* Chia sẻ sát thương overlay */}
                                {unit.hasDamageShare && (
                                    <div style={{ position:'absolute', inset:0, borderRadius:'10px', border:'2px dashed rgba(100,220,200,0.7)', background:'rgba(100,220,200,0.08)', animation:'damageSharePulse 1s ease-in-out infinite', pointerEvents:'none', zIndex:15 }} />
                                )}
                                {/* Phản công overlay */}
                                {unit.hasCounter && (
                                    <div style={{ position:'absolute', inset:'-2px', borderRadius:'12px', border:'2px solid rgba(255,100,50,0.8)', animation:'counterGlow 0.6s ease-in-out infinite alternate', boxShadow:'0 0 10px rgba(255,100,50,0.5)', pointerEvents:'none', zIndex:16 }} />
                                )}

                                {/* ===== STATUS ICONS ===== */}
                                <div className="absolute top-1 left-1 right-1 flex justify-start gap-0.5 flex-wrap z-30" style={{ lineHeight: 1 }}>
                                    {unit.isStunned    && <span title="Choáng"        style={{ display:'inline-block', animation:'spinStar 0.6s linear infinite', filter:'drop-shadow(0 0 4px gold)' }}><Star size={14} color="gold" fill="gold" /></span>}
                                    {unit.isFrozen     && <span title="Đóng băng"     style={{ filter:'drop-shadow(0 0 5px cyan)', animation:'pulse 1s ease-in-out infinite' }}><Snowflake size={14} color="cyan" /></span>}
                                    {unit.isPetrified  && <span title="Hóa đá"        style={{ filter:'drop-shadow(0 0 4px gray)' }}><MountainSnow size={14} color="gray" /></span>}
                                    {unit.isKnockedUp  && <span title="Hất tung"      style={{ animation:'bounce 0.5s ease-in-out infinite' }}><Wind size={14} color="white" /></span>}
                                    {unit.isSilenced   && <span title="Câm lặng"      style={{ filter:'drop-shadow(0 0 4px purple)' }}><VolumeX size={14} color="violet" /></span>}
                                    {unit.isCharmed    && <span title="Mê hoặc"       style={{ animation:'pulse 0.8s ease-in-out infinite', filter:'drop-shadow(0 0 5px hotpink)' }}><Heart size={14} color="hotpink" fill="hotpink" /></span>}
                                    {unit.tauntedBy    && <span title="Khiêu khích"   style={{ animation:'pulse 0.7s ease-in-out infinite', filter:'drop-shadow(0 0 4px orange)' }}><Frown size={14} color="orange" /></span>}
                                    {unit.isPoisoned   && <span title="Trúng độc"     style={{ filter:'drop-shadow(0 0 5px lime)' }}><Skull size={14} color="lime" /></span>}
                                    {unit.isBurning    && <span title="Thiêu đốt"     style={{ animation:'burnFlicker 0.4s ease-in-out infinite alternate', filter:'drop-shadow(0 0 5px orangered)' }}><Flame size={14} color="orangered" /></span>}
                                    {unit.isBleeding   && <span title="Chảy máu"      style={{ animation:'bleedDrip 0.8s ease-in-out infinite', filter:'drop-shadow(0 0 4px red)' }}><Droplets size={14} color="red" /></span>}
                                    {unit.hasArmorBreak && <span title="Phá giáp"     style={{ filter:'drop-shadow(0 0 4px gold)' }}><ShieldOff size={14} color="gold" /></span>}
                                    {unit.hasAntiHeal  && <span title="Cấm trị liệu" style={{ filter:'drop-shadow(0 0 4px red)' }}><Ban size={14} color="red" /></span>}
                                    {unit.hasSlowDebuff && <span title="Giảm tốc"     style={{ filter:'drop-shadow(0 0 4px steelblue)' }}><Hourglass size={14} color="steelblue" /></span>}
                                    {unit.hasAtkDown   && <span title="Giảm công"     style={{ filter:'drop-shadow(0 0 4px orange)' }}><TrendingDown size={14} color="orange" /></span>}
                                    {/* Buff icons */}
                                    {unit.hasAtkUp     && <span title="Tăng công"     style={{ animation:'atkUpGlow 0.8s ease-in-out infinite alternate', filter:'drop-shadow(0 0 5px red)' }}><SwordIcon size={14} color="#ff4444" /></span>}
                                    {unit.hasDefUp     && <span title="Tăng thủ"     style={{ animation:'defUpGlow 0.8s ease-in-out infinite alternate', filter:'drop-shadow(0 0 5px royalblue)' }}><Shield size={14} color="#4488ff" /></span>}
                                    {unit.hasSpdUp     && <span title="Tăng tốc"     style={{ filter:'drop-shadow(0 0 5px aqua)' }}><Zap size={14} color="aqua" fill="aqua" /></span>}
                                    {unit.hasCritUp    && <span title="Tăng bạo kích" style={{ animation:'pulse 0.5s ease-in-out infinite', filter:'drop-shadow(0 0 6px yellow)' }}><Target size={14} color="yellow" /></span>}
                                    {unit.shield > 0   && <span title="Tạo khiên"     style={{ animation:'shieldPulse 1s ease-in-out infinite', filter:'drop-shadow(0 0 6px skyblue)' }}><ShieldCheck size={14} color="skyblue" /></span>}
                                    {unit.isInvincible && <span title="Vô địch"       style={{ animation:'invincibleGlow 0.5s ease-in-out infinite alternate', filter:'drop-shadow(0 0 8px gold)' }}><Crown size={14} color="gold" /></span>}
                                    {unit.isUndying    && <span title="Bất tử"       style={{ animation:'undyingPulse 0.5s ease-in-out infinite alternate', filter:'drop-shadow(0 0 8px gold)' }}><HeartPulse size={14} color="gold" /></span>}
                                    {unit.isImmuneCC   && <span title="Miễn khống"    style={{ filter:'drop-shadow(0 0 5px silver)' }}><ShieldAlert size={14} color="silver" /></span>}
                                    {unit.hasLifesteal && <span title="Hút máu"       style={{ filter:'drop-shadow(0 0 5px crimson)' }}><Syringe size={14} color="crimson" /></span>}
                                    {unit.hasReflect   && <span title="Phản sát thương" style={{ animation:'reflectShimmer 1.2s ease-in-out infinite', filter:'drop-shadow(0 0 5px violet)' }}><RefreshCw size={14} color="violet" /></span>}
                                    {unit.hasCounter   && <span title="Phản công"     style={{ animation:'counterGlow 0.6s ease-in-out infinite alternate', filter:'drop-shadow(0 0 5px orangered)' }}><Crosshair size={14} color="orangered" /></span>}
                                    {unit.hasDamageShare && <span title="Chia sẻ ST"  style={{ filter:'drop-shadow(0 0 5px teal)' }}><Link2 size={14} color="teal" /></span>}
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 bg-black/85 px-1.5 py-1.5 z-20">
                                    <div className="text-[10px] sm:text-xs md:text-sm text-amber-400 font-cinzel font-black uppercase truncate text-center mb-1">{unit.name}</div>
                                    <div className="w-full h-1.5 sm:h-2 bg-red-950 rounded-full overflow-hidden mb-1">
                                        <div className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-300" style={{ width: `${hpPercent}%` }}></div>
                                    </div>
                                    <div className="w-full h-1.5 sm:h-2 bg-blue-950 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-300" style={{ width: `${moralePercent}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-50 bg-stone-950 flex flex-col font-sans overflow-hidden">
            <style>{`
                /* --- AURA PULSE around attacker card at center --- */
                @keyframes auraPulse {
                    0%   { opacity: 0.6; transform: scale(1);    }
                    50%  { opacity: 1;   transform: scale(1.18); }
                    100% { opacity: 0.6; transform: scale(1);    }
                }
                /* --- Spinning outer ring --- */
                @keyframes spinRing {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
                /* --- Particle spark fade out --- */
                @keyframes sparkFly {
                    0%   { opacity: 1; transform: translate(0,0) scale(1); }
                    100% { opacity: 0; transform: translate(var(--sx,30px), var(--sy,-50px)) scale(0.3); }
                }
                /* --- Skill name pop-in --- */
                @keyframes skillNamePop {
                    0%   { opacity: 0; transform: translateY(10px) scale(0.7); }
                    40%  { opacity: 1; transform: translateY(-4px) scale(1.08); }
                    100% { opacity: 1; transform: translateY(0) scale(1); }
                }
                /* --- Screen vignette flash --- */
                @keyframes vignetteFlash {
                    0%   { opacity: 0; }
                    20%  { opacity: 0.45; }
                    100% { opacity: 0; }
                }
                @keyframes healPopup {
                    0% { opacity: 0; transform: translate(-50%, 0) scale(0.5); }
                    20% { opacity: 1; transform: translate(-50%, -20px) scale(1.2); }
                    80% { opacity: 1; transform: translate(-50%, -30px) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -40px) scale(0.8); }
                }
                @keyframes arrowStrike {
                    0% { opacity: 0; transform: rotate(45deg) scaleX(0) translateX(-150px); }
                    50% { opacity: 1; transform: rotate(45deg) scaleX(1) translateX(0); }
                    100% { opacity: 0; transform: rotate(45deg) scaleX(0) translateX(150px); }
                }
                @keyframes dragonStrike {
                    0% { opacity: 0; transform: scale(0.5) translateY(-80px); }
                    50% { opacity: 1; transform: scale(1.2) translateY(0); filter: hue-rotate(90deg); }
                    100% { opacity: 0; transform: scale(1.5) translateY(80px); filter: hue-rotate(180deg); }
                }
                @keyframes damagePopup {
                    0% { opacity: 0; transform: translate(-50%, 0) scale(0.5); }
                    20% { opacity: 1; transform: translate(-50%, -20px) scale(1.2); }
                    80% { opacity: 1; transform: translate(-50%, -30px) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -40px) scale(0.8); }
                }
                @keyframes critPopup {
                    0% { opacity: 0; transform: translate(-50%, 0) scale(0.5); color: #fff; }
                    20% { opacity: 1; transform: translate(-50%, -30px) scale(1.5) rotate(-5deg); color: #fde047; }
                    40% { transform: translate(-50%, -30px) scale(1.3) rotate(5deg); }
                    80% { opacity: 1; transform: translate(-50%, -40px) scale(1.1) rotate(0); }
                    100% { opacity: 0; transform: translate(-50%, -50px) scale(0.8); }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-8px) rotate(-3deg); }
                    75% { transform: translateX(8px) rotate(3deg); }
                }
                @keyframes slashEffect {
                    0% { opacity: 0; transform: rotate(45deg) scaleX(0); }
                    50% { opacity: 1; transform: rotate(45deg) scaleX(1); }
                    100% { opacity: 0; transform: rotate(45deg) scaleX(1.5); }
                }
                /* ===== STATUS EFFECT ANIMATIONS ===== */
                /* Choáng: ngôi sao quay */
                @keyframes spinStar {
                    from { transform: translate(-50%,-50%) rotate(0deg); }
                    to   { transform: translate(-50%,-50%) rotate(360deg); }
                }
                /* Đóng băng / Hóa đá overlay */
                @keyframes freezeOverlay {
                    0%   { opacity: 0.6; box-shadow: 0 0 10px cyan; }
                    100% { opacity: 1;   box-shadow: 0 0 30px cyan, inset 0 0 15px rgba(200,240,255,0.4); }
                }
                /* Thiêu đốt nhấp nháy */
                @keyframes burnFlicker {
                    0%   { opacity: 0.7; box-shadow: 0 0 8px orangered; }
                    100% { opacity: 1;   box-shadow: 0 0 25px orangered, inset 0 0 12px rgba(255,80,0,0.5); }
                }
                /* Chảy máu nhỏ giọt */
                @keyframes bleedDrip {
                    0%   { opacity: 0.6; box-shadow: 0 0 8px crimson; }
                    50%  { opacity: 1;   box-shadow: 0 0 20px crimson; }
                    100% { opacity: 0.6; box-shadow: 0 0 8px crimson; }
                }
                /* Vô địch hào quang vàng */
                @keyframes invincibleGlow {
                    0%   { box-shadow: 0 0 15px rgba(255,215,0,0.8), inset 0 0 10px rgba(255,215,0,0.2); border-color: rgba(255,215,0,0.7); }
                    100% { box-shadow: 0 0 40px rgba(255,215,0,1), inset 0 0 25px rgba(255,215,0,0.4); border-color: rgba(255,255,200,1); }
                }
                /* Khiên xanh sáng */
                @keyframes shieldPulse {
                    0%   { box-shadow: 0 0 8px rgba(120,200,255,0.5); opacity: 0.7; }
                    50%  { box-shadow: 0 0 20px rgba(120,200,255,0.9); opacity: 1; }
                    100% { box-shadow: 0 0 8px rgba(120,200,255,0.5); opacity: 0.7; }
                }
                /* Phản sát thương lấp lánh */
                @keyframes reflectShimmer {
                    0%   { border-color: rgba(168,85,247,0.5); box-shadow: 0 0 8px rgba(168,85,247,0.4); }
                    50%  { border-color: rgba(236,72,153,0.9); box-shadow: 0 0 20px rgba(236,72,153,0.7); }
                    100% { border-color: rgba(168,85,247,0.5); box-shadow: 0 0 8px rgba(168,85,247,0.4); }
                }
                /* Phá giáp flash vàng */
                @keyframes armorBreakFlash {
                    0%   { border-color: rgba(251,191,36,0.5); }
                    100% { border-color: rgba(251,191,36,1); box-shadow: 0 0 15px rgba(251,191,36,0.7); }
                }
                /* Câm lặng overlay */
                @keyframes silenceOverlay {
                    0%   { border-color: rgba(168,85,247,0.4); opacity: 0.7; }
                    100% { border-color: rgba(200,100,255,0.9); opacity: 1; }
                }
                /* Hất tung overlay */
                @keyframes knockupOverlay {
                    0%   { opacity: 1; transform: translateY(0); }
                    50%  { opacity: 0.6; transform: translateY(-10px); }
                    100% { opacity: 0; transform: translateY(-20px); }
                }
                /* Độc bong bóng */
                @keyframes poisonBubble {
                    0%   { box-shadow: 0 0 8px rgba(80,200,0,0.5); }
                    100% { box-shadow: 0 0 25px rgba(80,200,0,0.9), inset 0 0 10px rgba(80,200,0,0.3); }
                }
                /* Heal overlay */
                @keyframes healOverlay {
                    0%   { box-shadow: 0 0 10px rgba(34,197,94,0.5); }
                    100% { box-shadow: 0 0 30px rgba(34,197,94,0.9), inset 0 0 15px rgba(34,197,94,0.3); }
                }
                /* Shield/Reflect popup */
                @keyframes shieldPopup {
                    0%   { opacity: 0; transform: translate(-50%, 0) scale(0.5); }
                    20%  { opacity: 1; transform: translate(-50%, -20px) scale(1.1); }
                    80%  { opacity: 1; transform: translate(-50%, -28px) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -36px) scale(0.8); }
                }
                @keyframes reflectPopup {
                    0%   { opacity: 0; transform: translate(-50%, 0) scale(0.5); }
                    20%  { opacity: 1; transform: translate(-50%, -20px) scale(1.1); }
                    80%  { opacity: 1; transform: translate(-50%, -28px) scale(1); }
                    100% { opacity: 0; transform: translate(-50%, -36px) scale(0.8); }
                }
                /* Bounce */
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50%       { transform: translateY(-8px); }
                }
                /* Pulse */
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0.5; }
                }
                /* T\u0103ng c\u00f4ng glow \u0111\u1ecf */
                @keyframes atkUpGlow {
                    0%   { border-color: rgba(239,68,68,0.5); box-shadow: 0 0 6px rgba(239,68,68,0.4); }
                    100% { border-color: rgba(239,68,68,1); box-shadow: 0 0 18px rgba(239,68,68,0.9), 0 0 30px rgba(239,68,68,0.4); }
                }
                /* T\u0103ng th\u1ee7 glow xanh */
                @keyframes defUpGlow {
                    0%   { border-color: rgba(100,180,255,0.5); box-shadow: 0 0 6px rgba(100,180,255,0.4); }
                    100% { border-color: rgba(100,180,255,1); box-shadow: 0 0 18px rgba(100,180,255,0.9), 0 0 30px rgba(100,180,255,0.4); }
                }
                /* B\u1ea5t t\u1eed pulse v\u00e0ng */
                @keyframes undyingPulse {
                    0%   { border-color: rgba(255,215,0,0.6); box-shadow: 0 0 10px rgba(255,215,0,0.4); background: rgba(255,255,100,0.1); }
                    100% { border-color: rgba(255,215,0,1); box-shadow: 0 0 25px rgba(255,215,0,0.8), inset 0 0 15px rgba(255,215,0,0.2); background: rgba(255,255,100,0.2); }
                }
                /* Chia s\u1ebb s\u00e1t th\u01b0\u01a1ng */
                @keyframes damageSharePulse {
                    0%   { border-color: rgba(100,220,200,0.4); box-shadow: 0 0 6px rgba(100,220,200,0.3); }
                    50%  { border-color: rgba(100,220,200,0.9); box-shadow: 0 0 16px rgba(100,220,200,0.6); }
                    100% { border-color: rgba(100,220,200,0.4); box-shadow: 0 0 6px rgba(100,220,200,0.3); }
                }
                /* Ph\u1ea3n c\u00f4ng glow cam */
                @keyframes counterGlow {
                    0%   { border-color: rgba(255,100,50,0.5); box-shadow: 0 0 6px rgba(255,100,50,0.3); }
                    100% { border-color: rgba(255,100,50,1); box-shadow: 0 0 16px rgba(255,100,50,0.8); }
                }
                /* S\u00e1t th\u01b0\u01a1ng chu\u1ea9n - tr\u1eafng ch\u00f3i */
                @keyframes trueDmgFlash {
                    0%   { opacity: 0; }
                    30%  { opacity: 1; }
                    100% { opacity: 0.3; }
                }
                @keyframes laserBeam {
                    0%   { width: 0%; opacity: 1; }
                    60%  { width: 85%; opacity: 1; }
                    100% { width: 100%; opacity: 0; }
                }
                /* Xuy\u00ean gi\u00e1p */
                @keyframes armorPenFlash {
                    0%   { opacity: 0; }
                    40%  { opacity: 1; }
                    100% { opacity: 0.5; }
                }
                @keyframes drillThrough {
                    0%   { top: -10%; opacity: 1; }
                    100% { top: 110%; opacity: 0; }
                }
                /* Sát thương theo máu tối đa */
                @keyframes maxHpPulse {
                    0%   { box-shadow: 0 0 10px rgba(255,50,100,0.5); background: rgba(180,0,50,0.3); }
                    100% { box-shadow: 0 0 30px rgba(255,50,100,1); background: rgba(180,0,50,0.55); }
                }
                /* Kết liễu */
                @keyframes executePulse {
                    0%   { box-shadow: 0 0 15px rgba(200,0,0,0.7); }
                    100% { box-shadow: 0 0 35px rgba(255,0,0,1), inset 0 0 20px rgba(200,0,0,0.4); }
                }
                /* Buff glow xanh lá */
                @keyframes buffGlow {
                    0%   { box-shadow: 0 0 10px rgba(50,220,150,0.5); border-color: rgba(80,255,180,0.6); }
                    100% { box-shadow: 0 0 30px rgba(50,220,150,0.9), inset 0 0 15px rgba(80,255,180,0.2); border-color: rgba(80,255,180,1); }
                }
            `}</style>
            
            {/* Header */}
            <div className="h-12 sm:h-14 bg-gradient-to-r from-stone-950 via-red-950/40 to-stone-950 border-b border-red-900/30 flex items-center justify-between px-2 sm:px-4 shrink-0 shadow-md z-[60]">
                <button onClick={handleFlee} className="text-stone-400 hover:text-white transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-bold bg-stone-900 px-2 sm:px-3 py-1 rounded-md border border-stone-700 relative z-[60]">
                    <Flag size={14} className="text-red-500" /> Rút lui
                </button>
                <div className="text-sm sm:text-base md:text-lg font-cinzel text-red-500 font-black tracking-widest uppercase drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] flex items-center gap-2">
                    <SwordIcon size={18} className="animate-pulse" /> 
                    {combatMode === 'hero-trial' ? `Ải ${chapter} - Quá Ải` : 'Giao Tranh'} 
                    <SwordIcon size={18} className="animate-pulse" />
                </div>
                <div className="flex gap-1 sm:gap-2">
                    <button onClick={() => setSpeed(s => s === 1 ? 2 : (s === 2 ? 4 : 1))} className="text-stone-300 font-black text-[10px] sm:text-xs bg-stone-800 px-2 sm:px-3 py-1 rounded-md border border-stone-600 hover:bg-stone-700 w-12 sm:w-16 text-center relative z-[60]">
                        x{speed}
                    </button>
                </div>
            </div>

            {/* Battle Field - Split into 3 columns */}
            <div className="flex-1 relative flex flex-col md:flex-row w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-stone-900 via-stone-950 to-black overflow-hidden z-10">
                
                {/* Full screen vignette flash when attacker is flying out */}
                {activeAttacker && (
                    <div style={{
                        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50,
                        background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)',
                        animation: 'vignetteFlash 0.5s ease-out forwards',
                    }} />
                )}

                {/* ===== TOÀN MÀN HÌNH: HIỆU ỨNG TUYỆT CHIÊU ===== */}
                {(() => {
                    const showFx = activeEffect && activeEffect !== 'slash' &&
                        activeEffect !== 'normal_magic' && activeEffect !== 'normal_assassin' &&
                        activeEffect !== 'normal_tank' && activeEffect !== 'normal_control';
                    if (!showFx) return null;
                    return (
                        <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:280, display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                            {activeEffect === 'heal' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(34,197,94,0.35) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 30px rgba(34,197,94,1))', animation:'auraPulse 0.5s ease-in-out infinite' }}><HeartPulse size={120} color="#22c55e" /></div>
                                <div style={{ position:'absolute', width:'280px', height:'280px', borderRadius:'50%', border:'4px solid rgba(34,197,94,0.6)', animation:'ping 0.6s ease-out infinite', boxShadow:'0 0 60px rgba(34,197,94,0.5)' }} />
                            </>)}
                            {activeEffect === 'buff' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(50,220,150,0.3) 0%, transparent 70%)' }} />
                                <div style={{ animation:'auraPulse 0.4s ease-in-out infinite', filter:'drop-shadow(0 0 40px rgba(50,220,150,1))' }}><Sparkles size={130} color="#32dc96" /></div>
                                <div style={{ position:'absolute', width:'300px', height:'300px', borderRadius:'50%', border:'4px solid rgba(50,220,150,0.7)', animation:'ping 0.6s ease-out infinite', boxShadow:'0 0 60px rgba(50,220,150,0.5)' }} />
                            </>)}
                            {activeEffect === 'dragon' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(255,80,0,0.4) 0%, transparent 70%)' }} />
                                <div style={{ animation:'auraPulse 0.4s ease-in-out infinite', filter:'drop-shadow(0 0 50px rgba(255,100,0,1))' }}><Flame size={130} color="#ff5000" /></div>
                                <div style={{ position:'absolute', width:'300px', height:'300px', borderRadius:'50%', border:'5px solid rgba(255,100,0,0.8)', animation:'ping 0.5s ease-out infinite', boxShadow:'0 0 80px rgba(255,80,0,0.6)' }} />
                                <div style={{ position:'absolute', width:'180px', height:'180px', borderRadius:'50%', border:'3px solid rgba(255,150,0,0.6)', animation:'ping 0.5s ease-out 0.2s infinite' }} />
                            </>)}
                            {activeEffect === 'smash' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(255,100,0,0.4) 0%, transparent 70%)' }} />
                                <div style={{ position:'absolute', width:'380px', height:'380px', borderRadius:'50%', border:'6px solid rgba(255,150,0,0.9)', animation:'ping 0.5s ease-out infinite', boxShadow:'0 0 100px rgba(255,100,0,0.7)' }} />
                                <div style={{ position:'absolute', width:'220px', height:'220px', borderRadius:'50%', background:'radial-gradient(circle, rgba(255,120,0,0.6) 0%, transparent 70%)', animation:'ping 0.5s ease-out 0.1s infinite' }} />
                            </>)}
                            {activeEffect === 'ice' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(100,200,255,0.35) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 50px rgba(100,210,255,1))', animation:'auraPulse 0.5s ease-in-out infinite' }}><Snowflake size={130} color="#64c8ff" /></div>
                                <div style={{ position:'absolute', width:'300px', height:'300px', borderRadius:'50%', border:'4px solid rgba(100,200,255,0.7)', animation:'ping 0.6s ease-in-out infinite', boxShadow:'0 0 70px rgba(100,200,255,0.5)' }} />
                            </>)}
                            {activeEffect === 'stun' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(255,215,0,0.3) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 50px rgba(255,215,0,1))', animation:'spinStar 0.4s linear infinite' }}><Star size={130} color="gold" fill="gold" /></div>
                                <div style={{ position:'absolute', width:'290px', height:'290px', borderRadius:'50%', border:'5px solid rgba(255,215,0,0.7)', animation:'ping 0.5s ease-out infinite', boxShadow:'0 0 80px gold' }} />
                            </>)}
                            {activeEffect === 'silence' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(168,85,247,0.3) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 50px rgba(168,85,247,1))', animation:'auraPulse 0.5s ease-in-out infinite' }}><VolumeX size={130} color="#a855f7" /></div>
                                <div style={{ position:'absolute', width:'280px', height:'280px', borderRadius:'50%', border:'4px dashed rgba(168,85,247,0.8)', animation:'spinRing 2s linear infinite', boxShadow:'0 0 60px rgba(168,85,247,0.5)' }} />
                            </>)}
                            {activeEffect === 'knockup' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(255,255,255,0.2) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 50px rgba(255,255,255,1))', animation:'bounce 0.4s ease-in-out infinite' }}><Wind size={130} color="white" /></div>
                                <div style={{ position:'absolute', width:'310px', height:'310px', borderRadius:'50%', border:'5px solid rgba(255,255,255,0.5)', animation:'ping 0.5s ease-out infinite', boxShadow:'0 0 80px rgba(255,255,255,0.6)' }} />
                            </>)}
                            {activeEffect === 'bleed' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(200,0,0,0.35) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 50px rgba(220,0,0,1))', animation:'auraPulse 0.4s ease-in-out infinite' }}><Droplets size={130} color="#dc0000" /></div>
                                <div style={{ position:'absolute', width:'280px', height:'280px', borderRadius:'50%', border:'4px solid rgba(200,0,0,0.8)', animation:'ping 0.5s ease-out infinite', boxShadow:'0 0 70px rgba(200,0,0,0.7)' }} />
                            </>)}
                            {activeEffect === 'poison_strike' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(80,200,0,0.3) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 50px rgba(80,200,0,1))', animation:'auraPulse 0.5s ease-in-out infinite' }}><Skull size={130} color="#50c800" /></div>
                                <div style={{ position:'absolute', width:'290px', height:'290px', borderRadius:'50%', border:'4px solid rgba(80,200,0,0.7)', animation:'ping 0.6s ease-out infinite', boxShadow:'0 0 70px rgba(80,200,0,0.6)' }} />
                            </>)}
                            {activeEffect === 'taunt_strike' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(255,100,0,0.3) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 50px rgba(255,100,0,1))', animation:'auraPulse 0.4s ease-in-out infinite' }}><Frown size={130} color="orange" /></div>
                                <div style={{ position:'absolute', width:'280px', height:'280px', borderRadius:'50%', border:'4px solid rgba(255,100,0,0.8)', animation:'ping 0.5s ease-out infinite', boxShadow:'0 0 70px orange' }} />
                            </>)}
                            {activeEffect === 'true_dmg' && (<>
                                <div style={{ position:'absolute', inset:0, background:'rgba(255,255,255,0.2)' }} />
                                <div style={{ position:'absolute', width:'500px', height:'10px', background:'linear-gradient(90deg, transparent, white, cyan, white, transparent)', boxShadow:'0 0 60px white, 0 0 100px cyan', borderRadius:'5px', animation:'arrowStrike 0.4s ease-out' }} />
                            </>)}
                            {activeEffect === 'armor_pen' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(255,165,0,0.3) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 50px rgba(255,165,0,1))', animation:'auraPulse 0.4s ease-in-out infinite' }}><ShieldOff size={130} color="orange" /></div>
                                <div style={{ position:'absolute', width:'280px', height:'280px', borderRadius:'50%', border:'4px solid rgba(255,165,0,0.8)', animation:'ping 0.5s ease-out infinite', boxShadow:'0 0 70px orange' }} />
                            </>)}
                            {activeEffect === 'max_hp' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(200,0,50,0.4) 0%, transparent 70%)' }} />
                                <div style={{ filter:'drop-shadow(0 0 50px rgba(255,50,100,1))', animation:'auraPulse 0.4s ease-in-out infinite' }}><HeartCrack size={130} color="#ff3264" /></div>
                                <div style={{ position:'absolute', width:'290px', height:'290px', borderRadius:'50%', border:'4px solid rgba(255,50,100,0.8)', animation:'ping 0.5s ease-out infinite', boxShadow:'0 0 80px rgba(255,50,100,0.7)' }} />
                            </>)}
                            {activeEffect === 'execute' && (<>
                                <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.5)' }} />
                                <div style={{ filter:'drop-shadow(0 0 60px rgba(200,0,0,1))', animation:'spinStar 0.3s linear infinite' }}><Skull size={140} color="#c80000" /></div>
                                <div style={{ position:'absolute', width:'320px', height:'320px', borderRadius:'50%', border:'6px solid rgba(200,0,0,0.9)', animation:'ping 0.4s ease-out infinite', boxShadow:'0 0 100px rgba(200,0,0,0.8)' }} />
                            </>)}
                            {activeEffect === 'arrow' && (<>
                                <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse at center, rgba(234,179,8,0.2) 0%, transparent 60%)' }} />
                                <div style={{ position:'absolute', width:'500px', height:'8px', background:'linear-gradient(90deg, transparent, rgba(234,179,8,0.9), white, rgba(234,179,8,0.9), transparent)', animation:'arrowStrike 0.4s ease-out', boxShadow:'0 0 40px rgba(234,179,8,0.9)', borderRadius:'4px' }} />
                            </>)}
                        </div>
                    );
                })()}



                {/* Left Column - Ally (Bottom on Mobile) */}
                <div className="w-full md:w-[30%] h-[40%] md:h-auto flex items-center justify-center md:justify-start pl-0 md:pl-8 py-2 md:py-4 order-3 md:order-1">
                    {renderGrid(units.ally, true)}
                </div>

                {/* Center Column - Turn Queue, Animation Stage, Logs (Middle on Mobile) */}
                <div className="w-full md:w-[40%] h-[20%] md:h-auto flex flex-col items-center justify-center md:justify-between py-1 md:py-4 relative z-20 border-y md:border-y-0 md:border-x border-stone-800/30 bg-black/40 order-2 md:order-2">
                    {/* Turn Queue at the top center */}
                    <div className="w-full flex justify-center mt-2 px-2">
                        <div className="bg-stone-950/80 border border-stone-800 rounded-full flex items-center px-4 py-2 overflow-x-auto custom-scrollbar gap-3 shadow-lg backdrop-blur-sm max-w-full">
                            <div className="text-[10px] font-black text-stone-500 uppercase mr-2 whitespace-nowrap shrink-0">Hiệp {roundCount}</div>
                            {turnQueue.map((u, i) => (
                                <div key={i} className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-2 overflow-hidden shrink-0 transition-all ${i === 0 ? 'border-yellow-400 scale-125 shadow-[0_0_15px_rgba(250,204,21,0.6)] z-10' : (u.isAlly ? 'border-blue-500/50 opacity-60' : 'border-red-500/50 opacity-60')}`}>
                                    <img src={u.image} className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = !u.isAlly ? DEFAULT_ENEMY_IMG : DEFAULT_ALLY_IMG; }} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stage Center Graphic */}
                    <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none flex-col items-center">
                        <div className="text-7xl md:text-9xl text-red-800 font-cinzel font-black tracking-widest drop-shadow-2xl opacity-60">VS</div>
                    </div>

                    {/* Logs at the bottom center */}
                    <div className="hidden md:flex w-full max-w-lg bg-stone-950/80 border border-stone-900 p-3 sm:p-5 rounded-3xl h-32 sm:h-44 overflow-hidden flex-col-reverse text-[11px] sm:text-xs md:text-sm shadow-2xl backdrop-blur-sm mb-4 mx-4 border-t-2 border-t-red-900/50">
                        {logs.map((log: string, i: number) => (
                            <div key={i} className={`mb-1.5 truncate ${i === 0 ? 'text-amber-400 font-black text-sm md:text-base' : 'text-stone-500 font-bold'}`}>
                                {log}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - Enemy (Top on Mobile) */}
                <div className="w-full md:w-[30%] h-[40%] md:h-auto flex items-center justify-center md:justify-end pr-0 md:pr-8 py-2 md:py-4 order-1 md:order-3">
                    {renderGrid(units.enemy, false)}
                </div>
            </div>

            {/* ===== VIDEO CUT-IN OVERLAY ===== */}
            {activeSkillVideo && (
                <div
                    className="absolute inset-0 z-[500] flex items-center justify-center bg-black cursor-pointer"
                    onClick={() => {
                        // Người chơi bỏ qua: gọi callback fire-hit ngay
                        if (hitCallbackRef.current) {
                            hitCallbackRef.current();
                            hitCallbackRef.current = null;
                        } else {
                            if (t1.current) { clearTimeout(t1.current); t1.current = null; }
                            setActiveSkillVideo(null);
                        }
                    }}
                    style={{ animation: 'none' }}
                >
                    <video
                        key={activeSkillVideo}
                        src={activeSkillVideo}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                        style={{ maxHeight: '100vh', maxWidth: '100vw' }}
                        onEnded={() => {
                            // Video kết thúc tự nhiên: fire hit ngay
                            if (hitCallbackRef.current) {
                                hitCallbackRef.current();
                                hitCallbackRef.current = null;
                            } else {
                                if (t1.current) { clearTimeout(t1.current); t1.current = null; }
                                setActiveSkillVideo(null);
                            }
                        }}
                        onError={() => {
                            // Lỗi load video: clear và tiếp tục bình thường
                            if (hitCallbackRef.current) {
                                hitCallbackRef.current();
                                hitCallbackRef.current = null;
                            } else {
                                if (t1.current) { clearTimeout(t1.current); t1.current = null; }
                                setActiveSkillVideo(null);
                            }
                        }}
                    />
                    {/* Skip hint */}
                    <div style={{
                        position: 'absolute', bottom: '32px', left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'rgba(0,0,0,0.6)',
                        color: 'rgba(255,255,255,0.7)',
                        padding: '8px 20px',
                        borderRadius: '999px',
                        fontSize: '13px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        border: '1px solid rgba(255,255,255,0.2)',
                        pointerEvents: 'none',
                        animation: 'pulse 2s ease-in-out infinite',
                    }}>
                        ▶ Chạm để bỏ qua
                    </div>
                    {/* Tên kỹ năng ở góc trên */}
                    <div style={{
                        position: 'absolute', top: '24px', left: '50%',
                        transform: 'translateX(-50%)',
                        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.8), transparent)',
                        color: '#f59e0b',
                        padding: '10px 40px',
                        fontSize: '20px',
                        fontWeight: 900,
                        letterSpacing: '4px',
                        textTransform: 'uppercase',
                        fontFamily: 'Cinzel, serif',
                        textShadow: '0 0 20px rgba(245,158,11,0.8)',
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap',
                    }}>
                        ⚔ TUYỆT CHIÊU ⚔
                    </div>
                </div>
            )}

            {result && (
                <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-[100] backdrop-blur-sm animate-in fade-in duration-500 p-4">
                    <div className="bg-gradient-to-b from-stone-900 to-stone-950 p-6 sm:p-10 rounded-[2rem] border-2 shadow-2xl text-center max-w-sm w-full animate-in zoom-in-95 duration-500 ease-out border-amber-900/50">
                        {combatMode === 'arena' && arenaMatchData ? (
                            <>
                                <div className={`text-3xl sm:text-5xl font-cinzel font-black uppercase tracking-widest mb-2 sm:mb-4 drop-shadow-[0_0_15px_currentColor] ${result === 'win' ? 'text-yellow-500' : 'text-stone-500'}`}>
                                    {result === 'win' ? 'CHIẾN THẮNG' : 'THẤT BẠI'}
                                </div>
                                <div className="text-xl sm:text-2xl font-bold text-white mb-6">
                                    ĐIỂM ELO
                                    <div className="mt-2 text-3xl flex items-center justify-center gap-4">
                                        <span className="text-slate-400">{arenaMatchData.oldScore}</span>
                                        <span className="text-slate-500 text-xl">&gt;</span>
                                        <span className={result === 'win' ? 'text-green-400 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)]' : 'text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.5)]'}>
                                            {result === 'win' ? '+' : ''}{arenaMatchData.pointChange}
                                        </span>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className={`text-3xl sm:text-5xl font-cinzel font-black uppercase tracking-widest mb-2 sm:mb-4 drop-shadow-[0_0_15px_currentColor] ${result === 'win' ? 'text-yellow-500' : 'text-stone-500'}`}>
                                {result === 'win' ? 'CHIẾN THẮNG' : 'THẤT BẠI'}
                            </div>
                        )}
                        <p className="text-stone-400 text-xs sm:text-sm mb-6 sm:mb-8 italic">{combatMode === 'arena' ? 'So tài hoàn tất!' : (result === 'win' ? 'Quân địch đã bị tiêu diệt hoàn toàn!' : 'Đội hình của bạn đã bị đập tan.')}</p>
                        
                        <div className="flex flex-col gap-3">
                            {result === 'win' && combatMode !== 'arena' && onWin && (
                                <button onClick={() => { setActive(false); onWin(); }} className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white font-black uppercase py-3 sm:py-4 rounded-xl shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-all active:scale-95 text-xs sm:text-sm border border-amber-500/50">
                                    Nhận Thưởng & Đi Tiếp
                                </button>
                            )}
                            <button onClick={() => { setActive(false); setView(combatMode === 'hero-trial' ? 'hero-trial' : combatMode === 'arena' ? 'arena' : 'quan-doan'); }} className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-black uppercase py-3 sm:py-4 rounded-xl shadow-lg transition-all active:scale-95 text-xs sm:text-sm border border-stone-600">
                                {combatMode === 'hero-trial' ? 'Trở về Quỷ Ải' : combatMode === 'arena' ? 'Trở về Đấu Trường' : 'Trở về Quân Doanh'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};


const ArtifactDetailModal = ({ artifact, onClose }: any) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Split description to separate stats and lore
  const descParts = (artifact.description || '').split('. ');
  const hasAttributesInDesc = descParts.length > 1;
  const attributesStr = hasAttributesInDesc ? descParts[0] : '';
  const loreStr = hasAttributesInDesc ? descParts.slice(1).join('. ') : artifact.description;

  let exclusiveHeroNames = '';
  if (artifact.exclusiveTo && artifact.exclusiveTo.length > 0) {
      const heroes = artifact.exclusiveTo.map((id: string) => INITIAL_HEROES.find(h => h.id === id) || ENEMY_HEROES.find(h => h.id === id)).filter(Boolean);
      exclusiveHeroNames = heroes.map((h: any) => h.name).join(' và ');
  }

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <div className="bg-gradient-to-b from-stone-900 to-stone-950 max-w-sm w-full p-8 rounded-[3rem] shadow-[0_0_50px_rgba(245,158,11,0.2)] border-2 border-amber-600/50 text-center relative max-h-[90vh] overflow-y-auto custom-scrollbar" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors text-2xl font-black leading-none">✕</button>
        <h3 className="text-2xl font-cinzel font-black uppercase mb-2 text-amber-500 drop-shadow-md">{artifact.name || 'Thần Khí'}</h3>
        <p className="text-stone-300 text-sm mb-4 font-bold italic">{loreStr}</p>
        
        {exclusiveHeroNames && (
          <div className="bg-amber-900/20 text-amber-500 text-xs p-3 rounded-xl border border-amber-500/30 mb-6 text-left">
             <span className="font-bold">Thần khí bản mệnh của {exclusiveHeroNames}</span>
             <p className="mt-1 opacity-80 text-[10px]">(chỉ có tác dụng khi {exclusiveHeroNames} lên trận và người chơi sở hữu thần khí này)</p>
          </div>
        )}

        <div className="w-32 h-32 mx-auto bg-stone-800 rounded-full flex items-center justify-center border-4 border-amber-700 shadow-[0_0_30px_rgba(245,158,11,0.4)] mb-6 overflow-hidden">
           <img src={artifact.image || './items/artifact_ticket.png'} className="w-full h-full object-cover scale-110" alt={artifact.name} />
        </div>
        
        {attributesStr && (
          <div className="bg-black/40 rounded-2xl p-4 border border-stone-700/50 mb-3 text-left">
              <h4 className="text-stone-400 text-xs font-black uppercase tracking-wider mb-2">Thuộc tính</h4>
              <p className="text-white text-sm font-bold">{attributesStr}</p>
          </div>
        )}

        <div className="bg-black/40 rounded-2xl p-4 border border-stone-700/50 mb-2 text-left">
            <h4 className="text-stone-400 text-xs font-black uppercase tracking-wider mb-2">Hiệu ứng đặc biệt</h4>
            <p className="text-green-400 text-sm font-bold">{artifact.effectDesc || 'Tăng cường sức mạnh cho tướng sở hữu'}</p>
        </div>
      </div>
    </div>
  );
};

const HeroDetailModal = ({ hero, onClose, actions }: { hero: Hero, onClose: () => void, actions?: React.ReactNode }) => {
  const [showRoadmapModal, setShowRoadmapModal] = useState(false);
  const [showSkillVideoModal, setShowSkillVideoModal] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<{name: string, desc: string, x: number, y: number} | null>(null);

  const videoSlug = hero.skillVideoUrl ? hero.skillVideoUrl.replace('/videos/', '').replace('.mp4', '') : '';
  const hasSkillVideo = Boolean(videoSlug && AVAILABLE_VIDEOS.includes(videoSlug));

  // Nhấn Esc để đóng modal
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const rarityColor: Record<string, string> = {
    'UR':  'from-yellow-900/95 to-stone-950 border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.5)]',
    'SSR': 'from-red-900/95 to-stone-950 border-red-600 shadow-[0_0_35px_rgba(220,38,38,0.5)]',
    'SR':  'from-purple-900/95 to-stone-950 border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.4)]',
    'R':   'from-blue-900/95 to-stone-950 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.3)]',
    'C':   'from-green-900/95 to-stone-950 border-green-600 shadow-[0_0_15px_rgba(22,163,74,0.4)]',
  };
  const rarityTextColor: Record<string, string> = {
    'UR': 'text-yellow-400', 'SSR': 'text-red-400', 'SR': 'text-purple-400',
    'R': 'text-blue-400', 'C': 'text-green-400',
  };
  const rarityGlow: Record<string, string> = {
    'UR': 'drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]',
    'SSR': 'drop-shadow-[0_0_16px_rgba(220,38,38,0.7)]',
    'SR':  'drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]',
    'R':   'drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]',
    'C':   'drop-shadow-[0_0_8px_rgba(22,163,74,0.5)]',
  };
  const cardGradient = rarityColor[hero.rarity] || rarityColor['C'];
  const textColor    = rarityTextColor[hero.rarity] || 'text-amber-400';
  const glowClass    = rarityGlow[hero.rarity] || '';

  let equippedArtifact = hero.artifactId ? ARTIFACTS.find(a => a.id === hero.artifactId) : null;
  let isSignature = false;

  if (!equippedArtifact) {
    const signatureArt = ARTIFACTS.find(a => a.exclusiveTo?.includes(hero.id) || a.exclusiveTo?.some(id => hero.id.startsWith(id + '_')));
    if (signatureArt) {
       equippedArtifact = signatureArt;
       isSignature = true;
    }
  }

  // Only apply bonus stats if the artifact is actually equipped (not just a signature preview) AND it belongs to this hero
  const isCorrectHero = equippedArtifact && (equippedArtifact.exclusiveTo?.includes(hero.id) || equippedArtifact.exclusiveTo?.some(id => hero.id.startsWith(id + '_')));
  const shouldApplyStats = equippedArtifact && (!isSignature) && isCorrectHero;

  const bonusAtk = shouldApplyStats ? (equippedArtifact.bonusAtk || 0) + Math.floor(hero.atk * ((equippedArtifact.bonusAtkPc || 0) / 100)) : 0;
  const bonusDef = shouldApplyStats ? (equippedArtifact.bonusDef || 0) + Math.floor(hero.def * ((equippedArtifact.bonusDefPc || 0) / 100)) : 0;
  const bonusSpd = shouldApplyStats ? (equippedArtifact.bonusSpd || 0) + Math.floor(hero.spd * ((equippedArtifact.bonusSpdPc || 0) / 100)) : 0;
  const bonusHp = shouldApplyStats ? (equippedArtifact.bonusHp || 0) + Math.floor(hero.maxHp * ((equippedArtifact.bonusHpPc || 0) / 100)) : 0;

  return (
    <div
      className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-3xl max-h-[92vh] bg-gradient-to-br ${cardGradient} border-2 rounded-[2rem] overflow-hidden animate-in zoom-in-90 duration-300 flex flex-col`}
        onClick={e => e.stopPropagation()}
      >
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 flex items-center justify-center text-stone-400 hover:text-white hover:bg-red-900/80 transition-all border border-white/10"
        >
          <XCircle size={20}/>
        </button>

        {/* Layout: ảnh trái + info phải (desktop) / ảnh trên + info dưới (mobile) */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0">
          {/* ===== CỘT ẢNH ===== */}
          <div className="md:w-64 flex-shrink-0 relative bg-black/40 flex flex-col items-center justify-center p-3" style={{minHeight: '280px'}}>
             <div className={`relative w-full h-64 md:h-full max-h-[380px] rounded-xl ${getStarBorderClass(hero.star)}`}>
               <img
                 src={hero.image}
                 className={`w-full h-full object-contain object-center ${glowClass} relative z-10`}
                 onError={(e) => { (e.target as HTMLImageElement).src = hero.faction === 'enemy' ? DEFAULT_ENEMY_IMG : DEFAULT_ALLY_IMG; }}
                 alt={hero.name}
               />
             </div>
             {/* Nút bấm Xem 30 Cảnh Giới ngay dưới ảnh tướng */}
             <button
               onClick={() => setShowRoadmapModal(true)}
               className="w-full mt-3 py-2.5 px-2 bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 hover:from-amber-900 hover:to-stone-800 text-amber-300 border border-amber-500/60 rounded-xl font-cinzel font-black text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all active:scale-95 z-20 cursor-pointer"
             >
                <ScrollText size={16} className="text-amber-400 shrink-0" />
                <span>Cảnh Giới Thiên Phú (1-30)</span>
             </button>
            {/* Gradient dưới ảnh (desktop) */}
            <div className="hidden md:block absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"/>
            {/* Badge phẩm */}
            <div className={`absolute top-2 left-2 text-[9px] font-black px-2 py-0.5 rounded-full bg-black/85 border border-white/10 ${textColor} tracking-widest uppercase`}>
              {hero.rarity}
            </div>
          </div>

          {/* ===== CỘT THÔNG TIN ===== */}
          <div className="flex-1 p-5 flex flex-col gap-3 overflow-y-auto min-h-0" style={{maxHeight: '92vh'}}>
            {/* Tên & danh hiệu */}
            <div>
              <h2 className={`text-2xl font-cinzel font-black uppercase tracking-wide ${textColor} leading-tight`}>{hero.name}</h2>
              <HeroStars starCount={hero.star} size={12} className="mt-1.5" />
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <p className="text-stone-400 text-[11px] font-bold uppercase tracking-widest">✦ {hero.title} ✦</p>
                {hero.subFaction && (
                  <span className={`text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                    hero.subFaction === 'mac' ? 'bg-yellow-950/80 text-yellow-300 border-yellow-500/70 shadow-[0_0_8px_rgba(234,179,8,0.3)]' :
                    hero.subFaction === 'le_trinh' ? 'bg-red-950/80 text-red-300 border-red-500/70 shadow-[0_0_8px_rgba(239,68,68,0.3)]' :
                    hero.subFaction === 'nguyen' ? 'bg-blue-950/80 text-blue-300 border-blue-500/70 shadow-[0_0_8px_rgba(59,130,246,0.3)]' :
                    'bg-emerald-950/80 text-emerald-300 border-emerald-500/70 shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                  }`}>
                    {hero.subFaction === 'mac' ? '👑 Bắc Triều (Nhà Mạc)' :
                     hero.subFaction === 'le_trinh' ? '🚩 Nam Triều (Vua Lê - Chúa Trịnh)' :
                     hero.subFaction === 'nguyen' ? '🌊 Đàng Trong (Chúa Nguyễn)' : '📜 Trung Lập (Trạng Trình Bạch Vân)'}
                  </span>
                )}
              </div>
            </div>

            {/* Chỉ số chiến đấu */}
            <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5">
              <p className="text-[9px] font-black uppercase text-stone-500 tracking-widest mb-2.5">Chỉ Số Chiến Đấu</p>
              <div className="grid grid-cols-2 gap-2.5">
                <StatBar label="⚔ Tấn Công" value={hero.atk} bonus={bonusAtk} max={100} color="bg-red-500" />
                <StatBar label="🛡 Phòng Thủ" value={hero.def} bonus={bonusDef} max={100} color="bg-blue-500" />
                <StatBar label="⚡ Tốc Độ" value={hero.spd - 100} bonus={bonusSpd} max={40} color="bg-yellow-400" />
                <StatBar label="💖 Máu" value={hero.maxHp} bonus={bonusHp} max={10000} color="bg-emerald-500" isHp />
              </div>
              <div className="mt-2.5 flex justify-between items-center border-t border-white/5 pt-2.5">
                <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Lực chiến tổng</span>
                <span className={`text-lg font-black ${textColor}`}>{hero.overall}</span>
              </div>
            </div>

            {/* Kỹ năng đánh thường */}
            <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5">
              <p className="text-[9px] font-black uppercase text-stone-500 tracking-widest mb-1.5">🗡 Kỹ Năng Đánh Thường</p>
              <p className={`font-black text-sm ${textColor} mb-1`}>Công Kích Cơ Bản</p>
              <p className="text-stone-400 text-[11px] leading-relaxed">Gây sát thương bằng 100% Tấn công lên 1 mục tiêu địch.</p>
            </div>

            {/* Kỹ năng nộ khí */}
            <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5 border-l-4 border-l-amber-500/80">
              <div className="flex items-center justify-between mb-1.5 flex-wrap gap-2">
                <p className="text-[9px] font-black uppercase text-amber-500/80 tracking-widest">⚡ Kỹ Năng Nộ Khí</p>
                {hasSkillVideo && (
                  <button
                    onClick={() => setShowSkillVideoModal(true)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-red-950 via-amber-950 to-red-950 hover:from-red-900 hover:to-amber-900 border border-amber-500/60 rounded-xl text-amber-300 text-[10px] font-cinzel font-black uppercase tracking-wider shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
                    title="Xem video thi triển tuyệt chiêu"
                  >
                    <Play size={11} className="fill-amber-400 text-amber-400" />
                    <span>Xem Tuyệt Chiêu</span>
                  </button>
                )}
              </div>
              <p className={`font-black text-sm ${textColor} mb-1`}>{hero.skillName}</p>
              <p className="text-stone-400 text-[11px] leading-relaxed">{hero.skillDesc}</p>
            </div>

            {/* Thần Khí */}
            {equippedArtifact && (
              <div className={`bg-black/40 rounded-2xl p-3.5 border flex gap-3 items-center relative overflow-hidden ${isSignature ? 'border-stone-700/50 opacity-60 grayscale-[0.8]' : 'border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'}`}>
                 <div className={`absolute inset-0 bg-gradient-to-r to-transparent pointer-events-none ${isSignature ? 'from-stone-900/30' : 'from-amber-900/20'}`}/>
                 <img src={equippedArtifact.image} alt={equippedArtifact.name} className={`w-12 h-12 object-cover rounded-lg border z-10 ${isSignature ? 'border-stone-600' : 'border-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`} />
                 <div className="z-10 flex-1">
                    <p className={`text-[9px] font-black uppercase tracking-widest mb-0.5 ${isSignature ? 'text-stone-400' : 'text-amber-500'}`}>
                       ✨ Thần Khí Bản Mệnh {isSignature ? '(Chưa Trang Bị)' : '(Đã Kích Hoạt)'}
                    </p>
                    <p className={`font-bold text-sm ${isSignature ? 'text-stone-400' : 'text-amber-200'}`}>{equippedArtifact.name}</p>
                    <p className={`text-[10px] leading-relaxed mt-0.5 ${isSignature ? 'text-stone-500' : 'text-amber-100/70'}`}>{equippedArtifact.description}</p>
                    {(!isCorrectHero && !isSignature) && (
                       <p className="text-red-400 text-[8px] font-black uppercase mt-1 bg-red-900/20 px-1 py-0.5 rounded inline-block">
                          ⚠️ Lắp sai chủ nhân - Không có tác dụng
                       </p>
                    )}
                 </div>
              </div>
            )}

            {/* Mô tả lịch sử */}
            <div className="bg-black/40 rounded-2xl p-3.5 border border-white/5">
              <p className="text-[9px] font-black uppercase text-stone-500 tracking-widest mb-1.5">📜 Lịch Sử</p>
              <p className="text-stone-300 text-[11px] leading-relaxed">{hero.description}</p>
            </div>

            {/* Duyên Phận */}
            {SYNERGIES.filter(s => s.heroIds.some(reqId => hero.id === reqId || hero.id.startsWith(reqId + '_'))).length > 0 && (
              <div className="bg-black/40 rounded-2xl p-3.5 border border-amber-500/20">
                <p className="text-[9px] font-black uppercase text-amber-500 tracking-widest mb-2 flex items-center gap-1">🤝 Duyên Phận</p>
                <div className="flex flex-col gap-2.5">
                  {SYNERGIES.filter(s => s.heroIds.some(reqId => hero.id === reqId || hero.id.startsWith(reqId + '_'))).map(syn => (
                     <div key={syn.id} className="border-l-2 border-amber-500/50 pl-2.5">
                        <p className={`font-bold text-[11px] ${textColor}`}>{syn.name}</p>
                        <p className="text-stone-300 text-[10px] leading-relaxed mt-0.5">{syn.description}</p>
                     </div>
                  ))}
                </div>
              </div>
            )}

            {/* Phe & Chương */}
            <div className="flex gap-2">
              <div className="flex-1 bg-black/40 rounded-xl p-2.5 border border-white/5 text-center">
                <p className="text-[8px] text-stone-600 font-bold uppercase tracking-widest mb-0.5">Phe</p>
                <p className={`font-black text-xs ${hero.faction === 'ally' ? 'text-emerald-400' : 'text-red-400'}`}>
                  {hero.faction === 'ally' ? '🟢 Ta' : '🔴 Địch'}
                </p>
              </div>
              <div className="flex-1 bg-black/40 rounded-xl p-2.5 border border-white/5 text-center">
                <p className="text-[8px] text-stone-600 font-bold uppercase tracking-widest mb-0.5">Chương</p>
                <p className="font-black text-xs text-amber-400">{hero.chapter}</p>
              </div>
              {hero.initialMorale > 0 && (
                <div className="flex-1 bg-black/40 rounded-xl p-2.5 border border-white/5 text-center">
                  <p className="text-[8px] text-stone-600 font-bold uppercase tracking-widest mb-0.5">Nhuệ Đầu</p>
                  <p className="font-black text-xs text-purple-400">+{hero.initialMorale}</p>
                </div>
              )}
            </div>
             {actions}
          </div>
        </div>
      </div>

      {/* Modal Popup Con Đường 30 Cảnh Giới */}
      {showRoadmapModal && (
        <div className="fixed inset-0 z-[300] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in" onClick={() => setShowRoadmapModal(false)}>
          <div className="bg-stone-950 border-2 border-amber-500 rounded-3xl p-6 max-w-xl w-full relative max-h-[85vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
             <button onClick={() => setShowRoadmapModal(false)} className="absolute top-4 right-4 text-stone-400 hover:text-white transition-colors">
                <XCircle size={24} />
             </button>
             <h3 className="text-xl font-cinzel font-black text-amber-400 text-center mb-1">📜 Cảnh Giới Thiên Phú Tối Thượng</h3>
             <p className="text-center text-xs text-stone-400 font-bold mb-4">{hero.name} · Cấp Cảnh Giới Hiện Tại: <span className="text-amber-400 font-black">{Math.min(RARITY_MAX_STARS[hero.rarity] || 30, hero.star)}/{RARITY_MAX_STARS[hero.rarity] || 30}</span></p>

             <div className="mb-4 bg-black/40 rounded-2xl p-3 border border-white/5 shrink-0">
               <p className="text-[10px] font-black uppercase text-amber-500 tracking-widest mb-2 text-center">🌟 {RARITY_MAX_PASSIVES[hero.rarity] || 0} Thiên Phú Bẩm Sinh (Thức tỉnh theo mốc Sao)</p>
               <div className="grid grid-cols-2 gap-2">
                 {getHeroPassives(hero as any).length > 0 ? getHeroPassives(hero as any).map((passive, index) => {
                    const unlockStar = 6 + index * 5;
                    const isUnlocked = hero.star >= unlockStar;
                    const tierColors = ['text-red-400', 'text-purple-400', 'text-white', 'text-amber-400'];
                    const color = tierColors[index];
                    return (
                       <div key={passive.id} className={`flex flex-col p-2.5 rounded-xl border ${!isUnlocked ? 'bg-black/30 border-white/5 opacity-50 grayscale' : 'bg-amber-950/20 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.1)]'}`}>
                          <div className="flex justify-between items-center mb-1.5">
                             <span 
                               className={`font-black text-xs ${color} uppercase drop-shadow-md flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity border-b border-dashed`}
                               title={passive.desc}
                               onClick={(e) => { e.stopPropagation(); setActiveTooltip({ name: '✦ ' + passive.name, desc: passive.desc, x: e.clientX, y: e.clientY }); }}
                             >
                                ✦ {passive.name}
                             </span>
                             {isUnlocked ? (
                               <span className="text-[8px] text-emerald-400 font-black bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">ĐÃ KÍCH HOẠT</span>
                             ) : (
                               <span className="text-[8px] text-stone-500 font-bold bg-stone-900 px-1.5 py-0.5 rounded border border-white/5">MỐC {unlockStar} SAO</span>
                             )}
                          </div>
                          <span className="text-[10px] text-stone-300 leading-relaxed">{passive.desc}</span>
                       </div>
                    );
                 }) : (
                    <div className="col-span-2 text-center py-4 text-xs font-bold text-stone-500">
                       Tướng phẩm chất {hero.rarity} không sở hữu Thiên Phú bẩm sinh.
                    </div>
                 )}
               </div>
             </div>

             <p className="text-[10px] font-black uppercase text-stone-500 tracking-widest mb-2 flex-shrink-0">📜 Trình tự nâng cấp {RARITY_MAX_STARS[hero.rarity] || 30} Cảnh Giới</p>
             <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {getStarRoadmap(hero).map(item => (
                  <div key={item.star} className={`p-3 rounded-xl border text-xs flex flex-col gap-1 ${item.isUnlocked ? 'bg-amber-950/40 border-amber-500/40 text-stone-200' : 'bg-black/30 border-white/5 opacity-45 text-stone-500'}`}>
                    <div className="flex items-center justify-between font-bold">
                       <span className="flex items-center gap-2">
                          <span>{item.iconName}</span>
                          <span className={item.isUnlocked ? item.tierColor : 'text-stone-500'}>{item.title}</span>
                       </span>
                       {item.isUnlocked ? (
                          <span className="text-[9px] font-black text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">✓ ĐÃ ĐẠT</span>
                       ) : (
                          <span className="text-[9px] font-bold text-stone-600">CHƯA ĐẠT</span>
                       )}
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed mt-0.5">
                       {item.passiveName ? (
                         <>
                           {item.effect.split(`[${item.passiveName}]`)[0]}
                           <span 
                             className={`${item.passiveColor} font-black cursor-pointer border-b border-dashed hover:opacity-80 transition-opacity`}
                             title={item.passiveDesc}
                             onClick={(e) => { e.stopPropagation(); setActiveTooltip({ name: '✦ ' + item.passiveName, desc: item.passiveDesc || '', x: e.clientX, y: e.clientY }); }}
                           >
                             [{item.passiveName}]
                           </span>
                           {item.effect.split(`[${item.passiveName}]`)[1]}
                         </>
                       ) : (
                         item.effect
                       )}
                    </p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      )}

      {/* Giao diện Tooltip Khám Phá */}
      {activeTooltip && (
         <div className="fixed inset-0 z-[600]" onClick={(e) => { e.stopPropagation(); setActiveTooltip(null); }}>
            <div 
              className={`absolute bg-stone-900 border-2 border-amber-500 rounded-xl p-3 shadow-[0_0_20px_rgba(245,158,11,0.4)] w-64 pointer-events-none transform -translate-x-1/2 ${activeTooltip.y < 150 ? 'translate-y-4' : '-translate-y-full -mt-2'}`}
              style={{ left: activeTooltip.x, top: activeTooltip.y }}
            >
               <div className="text-amber-400 font-black uppercase text-sm mb-1 flex items-center gap-1.5">
                 <Lightbulb size={14} className="text-amber-400 fill-amber-400" /> {activeTooltip.name}
               </div>
               <div className="text-stone-300 text-xs leading-relaxed font-bold">
                 {activeTooltip.desc}
               </div>
            </div>
         </div>
      )}

      {/* Modal Video Tuyệt Chiêu */}
      {showSkillVideoModal && (
        <div 
          className="fixed inset-0 z-[400] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setShowSkillVideoModal(false)}
        >
          <div 
            className="relative w-full max-w-4xl bg-stone-950 border-2 border-amber-500 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.4)] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-3 sm:p-4 bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-cinzel font-black text-sm sm:text-base">⚡ Tuyệt Chiêu: {hero.skillName}</span>
                <span className="text-stone-400 text-xs hidden sm:inline">({hero.name})</span>
              </div>
              <button 
                onClick={() => setShowSkillVideoModal(false)}
                className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-stone-400 hover:text-white hover:bg-red-900 transition-all border border-white/10 cursor-pointer"
              >
                <XCircle size={20} />
              </button>
            </div>
            <div className="relative bg-black flex items-center justify-center aspect-video max-h-[75vh]">
              <video 
                src={hero.skillVideoUrl} 
                autoPlay 
                controls 
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/** Thanh chỉ số mini */
const StatBar = ({ label, value, max, color, isHp, bonus = 0 }: { label: string, value: number, max: number, color: string, isHp?: boolean, bonus?: number }) => {
  const pct = Math.min(100, Math.round(((value + bonus) / max) * 100));
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">{label}</span>
        <span className="text-[10px] text-white font-black flex gap-1">
          {isHp ? (value || 0).toLocaleString() : value}
          {bonus > 0 && <span className="text-emerald-400">+{isHp ? (bonus || 0).toLocaleString() : bonus}</span>}
          {bonus < 0 && <span className="text-red-400">{isHp ? (bonus || 0).toLocaleString() : bonus}</span>}
        </span>
      </div>
      <div className="w-full h-1.5 bg-stone-800 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }}/>
      </div>
    </div>
  );
};

const HeroGalleryCard = ({ hero, isEnemy, onClick }: { key?: React.Key, hero: Hero, isEnemy?: boolean, onClick?: () => void }) => {
  const rarityBorder: Record<string, string> = {
    'UR':  'border-yellow-500 shadow-[0_0_16px_rgba(234,179,8,0.45)]',
    'SSR': 'border-red-600 shadow-[0_0_12px_rgba(220,38,38,0.4)]',
    'SR':  'border-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.35)]',
    'R':   'border-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.3)]',
    'C':   'border-green-600 shadow-[0_0_8px_rgba(22,163,74,0.3)]',
  };
  const rarityText: Record<string, string> = {
    'UR': 'text-yellow-400', 'SSR': 'text-red-400', 'SR': 'text-purple-400',
    'R': 'text-blue-400', 'C': 'text-green-500',
  };
  const borderClass = rarityBorder[hero.rarity] || (isEnemy ? 'border-red-900' : 'border-amber-900');
  const equippedArtifact = hero.artifactId ? ARTIFACTS.find(a => a.id === hero.artifactId) : null;
  const bonusAtk = equippedArtifact ? (equippedArtifact.bonusAtk || 0) + Math.floor(hero.atk * ((equippedArtifact.bonusAtkPc || 0) / 100)) : 0;
  const bonusSpd = equippedArtifact ? (equippedArtifact.bonusSpd || 0) + Math.floor(hero.spd * ((equippedArtifact.bonusSpdPc || 0) / 100)) : 0;

  return (
    <div
      onClick={onClick}
      className={`bg-gradient-to-b from-stone-900 to-stone-950 p-3 rounded-2xl border-2 transition-all hover:scale-105 shadow-xl cursor-pointer hover:brightness-110 active:scale-95 ${borderClass}`}
    >
       <div className={`relative rounded-xl mb-3 ${getStarBorderClass(hero.star)}`}>
         <div className="relative overflow-hidden rounded-xl h-full w-full z-10 bg-[#1c1917]">
           <img src={hero.image} className="w-full aspect-[2/3] object-cover contrast-110 border border-white/5 relative z-10" onError={(e) => { (e.target as HTMLImageElement).src = hero.faction === 'enemy' ? DEFAULT_ENEMY_IMG : DEFAULT_ALLY_IMG; }} />
           <div className={`absolute top-1 right-1 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-black/75 z-20 ${rarityText[hero.rarity] || 'text-amber-500'}`}>{hero.rarity}</div>
           {hero.subFaction && (
             <div className="absolute top-1 left-1 z-20">
               <span className={`text-[7px] font-black uppercase px-1.5 py-0.5 rounded-md border backdrop-blur-sm ${
                 hero.subFaction === 'mac' ? 'bg-yellow-950/90 text-yellow-300 border-yellow-500/70' :
                 hero.subFaction === 'le_trinh' ? 'bg-red-950/90 text-red-300 border-red-500/70' :
                 hero.subFaction === 'nguyen' ? 'bg-blue-950/90 text-blue-300 border-blue-500/70' :
                 'bg-emerald-950/90 text-emerald-300 border-emerald-500/70'
               }`}>
                 {hero.subFaction === 'mac' ? 'Mạc' :
                  hero.subFaction === 'le_trinh' ? 'Lê-Trịnh' :
                  hero.subFaction === 'nguyen' ? 'Nguyễn' : 'Trạng Trình'}
               </span>
             </div>
           )}
           <div className="absolute top-1 right-1 flex flex-col items-end gap-1 z-20">
            <HeroStars starCount={hero.star} size={8} className="justify-center mt-1" />
           </div>
           {equippedArtifact && (
             <div className="absolute bottom-1 right-1 bg-black/80 rounded border border-purple-500/50 p-0.5 flex flex-col items-center z-20">
               <img src={equippedArtifact.image} className="w-4 h-4 object-cover rounded-sm mb-0.5" alt={equippedArtifact.name} />
             </div>
           )}
         </div>
       </div>
       <div className="text-center">
          <div className="text-[10px] font-cinzel text-amber-400 font-black uppercase truncate">{hero.name}</div>
          {(hero as any).isArtifact ? (
            <div className="text-[8px] text-amber-300 font-bold mt-1 uppercase truncate px-1">
              {hero.description || 'Thần Khí Bản Mệnh'}
            </div>
          ) : (
            <div className="text-[8px] text-stone-500 font-bold mt-1 uppercase flex justify-center gap-1">
              <span>⚔️{hero.atk}{bonusAtk > 0 && <span className="text-emerald-400">+{bonusAtk}</span>}</span>
              <span>·</span>
              <span>⚡{hero.spd}{bonusSpd > 0 && <span className="text-emerald-400">+{bonusSpd}</span>}</span>
            </div>
          )}
       </div>
    </div>
  );
};

const MainMenuItem = ({ icon, title, subtitle, onClick, color }: any) => (
  <button onClick={onClick} className={`p-7 rounded-[2rem] border-2 flex flex-col items-center gap-3 transition-all hover:scale-105 shadow-2xl group relative overflow-hidden ${color}`} style={{boxShadow:'0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)'}}>
    <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"/>
    <div className="group-hover:scale-110 transition-transform duration-300 group-hover:drop-shadow-[0_0_8px_currentColor]">{icon}</div>
    <div>
      <div className="font-cinzel font-black uppercase text-[11px] tracking-[0.2em] text-center">{title}</div>
      {subtitle && <div className="text-[9px] uppercase tracking-widest opacity-45 mt-0.5 text-center font-bold">{subtitle}</div>}
    </div>
  </button>
);

const GradeView = ({ setGrade, setView }: any) => (
  <div 
    className="min-h-screen flex flex-col items-center justify-end pb-[10vh] p-8 relative overflow-hidden bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: `url('${import.meta.env.BASE_URL}ancient_exam_bg.jpg')` }}
  >
     <div className="absolute inset-0 bg-black/40 pointer-events-none z-0" />
     <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&display=swap');
        `}
     </style>
     
     {/* Tiêu đề Kinh Luân Tu Luyện nằm ngay dưới chữ Quốc Tử Giám */}
     <div className="absolute top-[26%] xl:top-[28%] left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="bg-transparent border-[3px] border-[#FFD700] px-8 md:px-12 py-3 rounded-md shadow-[0_0_20px_rgba(255,215,0,0.5),inset_0_0_15px_rgba(255,215,0,0.3)]">
           <h2 className="text-3xl md:text-5xl xl:text-6xl font-cinzel font-black text-[#FFD700] uppercase tracking-wider text-center leading-none whitespace-nowrap" style={{ textShadow: '0 0 15px rgba(255,215,0,1), 0 0 30px rgba(255,215,0,0.8), 2px 2px 4px rgba(0,0,0,1)' }}>
             Kinh Luân Tu Luyện
           </h2>
        </div>
     </div>
     {/* 2 Câu thơ bên trái */}
     <div className="hidden lg:flex absolute left-[2%] top-0 bottom-0 flex-row items-center justify-center gap-6 xl:gap-10 pointer-events-none opacity-100 py-10 z-10">
       <div className="flex flex-col justify-center gap-4 xl:gap-8 h-full">
         {["Nam", "Quốc", "Sơn", "Hà", "Nam", "Đế", "Cư"].map((word, i) => (
           <div key={`l1-${i}`} className="text-[2.2rem] xl:text-[2.8rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
             {word}
           </div>
         ))}
       </div>
       <div className="flex flex-col justify-center gap-4 xl:gap-8 h-full">
         {["Tiệt", "Nhiên", "Định", "Phận", "Tại", "Thiên", "Thư"].map((word, i) => (
           <div key={`l2-${i}`} className="text-[2.2rem] xl:text-[2.8rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
             {word}
           </div>
         ))}
       </div>
     </div>

     {/* 2 Câu thơ bên phải */}
     <div className="hidden lg:flex absolute right-[2%] top-0 bottom-0 flex-row items-center justify-center gap-6 xl:gap-10 pointer-events-none opacity-100 py-10 z-10">
       <div className="flex flex-col justify-center gap-4 xl:gap-8 h-full">
         {["Như", "Hà", "Nghịch", "Lỗ", "Lai", "Xâm", "Phạm"].map((word, i) => (
           <div key={`r1-${i}`} className="text-[2.2rem] xl:text-[2.8rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
             {word}
           </div>
         ))}
       </div>
       <div className="flex flex-col justify-center gap-4 xl:gap-8 h-full">
         {["Nhữ", "Đẳng", "Hành", "Khan", "Thủ", "Bại", "Hư"].map((word, i) => (
           <div key={`r2-${i}`} className="text-[2.2rem] xl:text-[2.8rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
             {word}
           </div>
         ))}
       </div>
     </div>

     <div className="w-full max-w-4xl text-center relative z-20 flex flex-col items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full px-4">
           {[6, 7, 8, 9].map(g => (
             <button key={g} onClick={() => { setGrade(g); setView('kinh-luan-topic'); }} className="bg-stone-900/80 backdrop-blur-md text-[#FFD700] border-2 border-[#FFD700] py-8 rounded-2xl font-cinzel font-black text-3xl hover:bg-stone-800 hover:scale-105 shadow-[0_0_20px_rgba(255,215,0,0.3)] active:scale-95 transition-all">LỚP {g}</button>
           ))}
        </div>
        <button onClick={() => setView('chapter-hub')} className="mt-12 text-[#c2a265] font-cinzel font-bold text-xl uppercase tracking-widest border-b-2 border-[#c2a265] hover:text-amber-400 hover:border-amber-400 transition-colors drop-shadow-md">
           Quay lại HUB
        </button>
      </div>
  </div>
);

const TopicView = ({ grade, setChapterIdx, setView, player }: any) => {
  const chapters = MATH_DATA[grade] || [];
  const mathProgress = player?.mathProgress || {};
  const [lockedModal, setLockedModal] = React.useState<{chapterIdx: number} | null>(null);

  // Kiểm tra chương đã hoàn thành (mở khóa chương tiếp theo) khi số bài mở >= tổng số bài
  const isChapterUnlocked = (idx: number): boolean => {
    if (idx === 0) return true; // Chương 1 luôn mở
    const prevChapter = chapters[idx - 1];
    if (!prevChapter) return false;
    const totalLessons = prevChapter.lessons?.length || 0;
    const progressKey = `g${grade}-c${idx - 1}`;
    const unlockedInPrev = mathProgress[progressKey] || 0;
    return unlockedInPrev >= totalLessons;
  };

  return (
  <div 
    className="min-h-screen flex items-center justify-center p-8 overflow-y-auto bg-cover bg-center bg-no-repeat relative"
    style={{ backgroundImage: `url('${import.meta.env.BASE_URL}ancient_exam_bg.jpg')` }}
  >
     <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />

     {/* Modal cảnh báo khi chạm chương bị khóa */}
     {lockedModal && (
       <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70" onClick={() => setLockedModal(null)}>
         <div className="bg-amber-950 border-2 border-amber-600 rounded-3xl p-8 max-w-md mx-4 text-center shadow-[0_0_50px_rgba(217,119,6,0.4)]" onClick={e => e.stopPropagation()}>
           <div className="text-4xl mb-4">🏯</div>
           <h3 className="text-xl font-cinzel font-black text-amber-300 uppercase mb-3">
             {chapters[lockedModal.chapterIdx]?.title || `Chương ${lockedModal.chapterIdx + 1}`}
           </h3>
           <p className="text-amber-200 text-sm leading-relaxed mb-2">
             Chúa công chưa hoàn thành <b>{chapters[lockedModal.chapterIdx - 1]?.title}</b>.
           </p>
           <p className="text-amber-100 text-sm leading-relaxed mb-2">
             Cần hoàn thành <b>tất cả {chapters[lockedModal.chapterIdx - 1]?.lessons?.length || 0} bài</b> của chương trước mới có thể tiến vào chương này.
           </p>
           <p className="text-amber-200/60 text-xs mb-5">
             (Hiện đã mở: {mathProgress[`g${grade}-c${lockedModal.chapterIdx - 1}`] || 0}/{chapters[lockedModal.chapterIdx - 1]?.lessons?.length || 0} bài)
           </p>
           <button 
             onClick={() => setLockedModal(null)}
             className="bg-amber-600 hover:bg-amber-500 text-white font-black uppercase px-6 py-2 rounded-xl transition-colors"
           >
             Hiểu rồi!
           </button>
         </div>
       </div>
     )}

     <div className="max-w-3xl w-full scroll-bg p-10 rounded-[3rem] text-center shadow-2xl border-blue-900 my-10 relative z-10">
        <h2 className="text-2xl font-cinzel font-black text-blue-950 uppercase mb-8">LỚP {grade} - Chọn Chương</h2>
        <div className="grid grid-cols-1 gap-4 text-left">
           {chapters.map((ch: any, idx: number) => {
             const unlocked = isChapterUnlocked(idx);
             const progressKey = `g${grade}-c${idx}`;
             const lessonsUnlocked = mathProgress[progressKey] || 0;
             const totalLessons = ch.lessons?.length || 0;
             const isCompleted = lessonsUnlocked >= totalLessons && totalLessons > 0;

             return unlocked ? (
               <button 
                 key={idx} 
                 onClick={() => { setChapterIdx(idx); setView('kinh-luan-lesson'); }} 
                 className="bg-white border-2 border-blue-900 p-6 rounded-2xl flex items-center gap-4 group hover:bg-blue-50 transition-all cursor-pointer"
               >
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform ${isCompleted ? 'bg-green-600 text-white' : 'bg-blue-900 text-white'}`}>
                   {isCompleted ? '✓' : idx + 1}
                 </div>
                 <div className="flex-1">
                   <span className="font-bold text-blue-900 text-lg">{ch.title}</span>
                   <div className="text-xs text-slate-500 mt-0.5">
                     {isCompleted ? 'Đã hoàn thành' : `${lessonsUnlocked}/${totalLessons} bài đã mở`}
                   </div>
                 </div>
               </button>
             ) : (
               <button 
                 key={idx}
                 onClick={() => setLockedModal({ chapterIdx: idx })}
                 className="bg-slate-100 border-2 border-slate-300 p-6 rounded-2xl flex items-center gap-4 cursor-pointer opacity-60 hover:opacity-80 transition-opacity"
               >
                 <div className="bg-slate-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                   🔒
                 </div>
                 <div className="flex-1">
                   <span className="font-bold text-slate-500 text-lg">{ch.title}</span>
                   <div className="text-xs text-slate-400 mt-0.5">Hoàn thành chương trước để mở</div>
                 </div>
               </button>
             );
           })}
        </div>
        <button onClick={() => setView('kinh-luan-grade')} className="mt-8 text-blue-900 font-bold uppercase cursor-pointer hover:underline">Quay lại</button>
     </div>
  </div>
  );
};


const LessonListView = ({ grade, chapterIdx, setLessonIdx, setView, progress, player, startQuiz }: any) => {
  const chapter = MATH_DATA[grade] && MATH_DATA[grade][chapterIdx];
  const unlockedCount = (progress && progress[`g${grade}-c${chapterIdx}`]) || 0;

  // Modal thông báo bài bị khoá
  const [lockedModal, setLockedModal] = React.useState<{
    lessonTitle: string;
    lessonIdx: number;
    prevTitle: string;
    prevIdx: number;
    prevTotal: number;
    prevCorrect: number;
    prevRemaining: number;
  } | null>(null);

  // Modal chọn gói câu hỏi khi click bài đã mở
  const [packageModal, setPackageModal] = React.useState<{
    lessonIdx: number;
    lessonTitle: string;
    totalQ: number;
    correctCount: number;
    remainingQ: number;
  } | null>(null);

  if (!chapter) return null;

  const handleLessonClick = (idx: number, lesson: any, isUnlocked: boolean) => {
    if (!isUnlocked) {
      const prevIdx = idx - 1;
      const prevLesson = chapter.lessons[prevIdx];
      const prevQList = getQuestionsForLesson(grade, chapterIdx, prevIdx);
      const prevTotal = prevQList.length > 0 ? prevQList.length : 60;
      const prevCorrect = (player?.mathCorrectQuestions?.[`g${grade}-c${chapterIdx}-l${prevIdx}`] || []).length;
      const prevRemaining = Math.max(0, prevTotal - prevCorrect);

      setLockedModal({
        lessonTitle: lesson.title,
        lessonIdx: idx,
        prevTitle: prevLesson ? prevLesson.title : `Bài ${idx}`,
        prevIdx: prevIdx,
        prevTotal: prevTotal,
        prevCorrect: prevCorrect,
        prevRemaining: prevRemaining,
      });
    } else {
      const allQ = getQuestionsForLesson(grade, chapterIdx, idx);
      const totalQ = allQ.length > 0 ? allQ.length : 60;
      const correctIds = player?.mathCorrectQuestions?.[`g${grade}-c${chapterIdx}-l${idx}`] || [];
      const correctCount = correctIds.length;
      const remainingQ = Math.max(0, totalQ - correctCount);

      setPackageModal({
        lessonIdx: idx,
        lessonTitle: lesson.title,
        totalQ: totalQ,
        correctCount: correctCount,
        remainingQ: remainingQ
      });
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}ancient_exam_bg.jpg')` }}
    >
       <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />
       
       {/* Trái - Nguyễn Ánh */}
       <div className="hidden lg:flex absolute left-[2%] top-0 bottom-0 flex-row items-center justify-center gap-4 xl:gap-8 pointer-events-none opacity-100 py-4 z-10">
         <div className="flex flex-col justify-center gap-2 xl:gap-4 h-full">
           {["Ta", "Và", "Nguyễn", "Huệ", "Ai", "Hơn?"].map((word, i) => (
             <div key={`l1-${i}`} className="text-[1.8rem] xl:text-[2.4rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
           <div className="text-[1.2rem] xl:text-[1.5rem] font-bold text-[#c2a265] text-center mt-6 leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 4px rgba(0,0,0,1)' }}>Nguyễn</div>
           <div className="text-[1.2rem] xl:text-[1.5rem] font-bold text-[#c2a265] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 4px rgba(0,0,0,1)' }}>Ánh</div>
         </div>
       </div>

       {/* Phải - Bùi Thị Xuân */}
       <div className="hidden lg:flex absolute right-[2%] top-0 bottom-0 flex-row items-center justify-center gap-4 xl:gap-6 pointer-events-none opacity-100 py-4 z-10">
         <div className="flex flex-col justify-center gap-1 xl:gap-2 h-full">
           {["Chúa", "Công", "Ta", "Tay", "Kiếm", "Tay", "Cờ", "Mà", "Làm", "Nên", "Sự", "Nghiệp"].map((word, i) => (
             <div key={`r1-${i}`} className="text-[1rem] xl:text-[1.4rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
         <div className="flex flex-col justify-center gap-1 xl:gap-2 h-full">
           {["Trong", "Khi", "Nhà", "Ngươi", "Đi", "Cầu", "Viện", "Ngoại", "Bang", "Làm", "Tan", "Nát", "Cả", "Sơn", "Hà"].map((word, i) => (
             <div key={`r2-${i}`} className="text-[1rem] xl:text-[1.4rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
         <div className="flex flex-col justify-center gap-1 xl:gap-2 h-full">
           {["Đem", "So", "Với", "Chúa", "Công", "Ta", "Ngươi", "Chỉ", "Là", "Nước", "Vũng", "So", "Với", "Ao", "Trời"].map((word, i) => (
             <div key={`r3-${i}`} className="text-[1rem] xl:text-[1.4rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
           <div className="text-[0.9rem] xl:text-[1.1rem] font-bold text-[#c2a265] text-center mt-2 leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 4px rgba(0,0,0,1)' }}>Bùi</div>
           <div className="text-[0.9rem] xl:text-[1.1rem] font-bold text-[#c2a265] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 4px rgba(0,0,0,1)' }}>Thị</div>
           <div className="text-[0.9rem] xl:text-[1.1rem] font-bold text-[#c2a265] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 4px rgba(0,0,0,1)' }}>Xuân</div>
         </div>
       </div>

       <div className="max-w-3xl w-full scroll-bg p-8 md:p-10 rounded-[3rem] text-center shadow-2xl border-blue-900 my-10 relative z-20">
          <h2 className="text-2xl md:text-3xl font-cinzel font-black text-blue-950 mb-2 uppercase tracking-wider drop-shadow-sm">Bài Học (Tuần Tự)</h2>
          <p className="text-amber-900/80 font-bold text-sm uppercase tracking-widest mb-6">
            LỚP {grade} &middot; {chapter.title}
          </p>

          <div className="grid grid-cols-1 gap-3 max-h-[60vh] overflow-y-auto custom-scrollbar pr-1">
             {chapter.lessons.map((lesson: any, idx: number) => {
               const isUnlocked = idx <= unlockedCount;
               const isDone = idx < unlockedCount;
               const allQ = getQuestionsForLesson(grade, chapterIdx, idx);
               const totalQ = allQ.length > 0 ? allQ.length : 60;
               const correctIds = player?.mathCorrectQuestions?.[`g${grade}-c${chapterIdx}-l${idx}`] || [];
               const correctCount = correctIds.length;
               const remainingQ = Math.max(0, totalQ - correctCount);

               return (
                 <button
                   key={idx}
                   onClick={() => handleLessonClick(idx, lesson, isUnlocked)}
                   className={`p-4 rounded-2xl border-2 flex items-center justify-between transition-all group ${
                     isUnlocked
                       ? isDone
                         ? 'border-emerald-500/80 bg-emerald-50/90 text-left font-bold hover:border-emerald-700 shadow-sm cursor-pointer'
                         : 'border-blue-300 bg-white text-left font-bold hover:border-blue-900 hover:shadow-md cursor-pointer'
                       : 'bg-stone-200/80 text-stone-400 border-stone-300 opacity-60 cursor-pointer hover:opacity-80'
                   }`}
                 >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                        !isUnlocked ? 'bg-stone-300 text-stone-500' : isDone ? 'bg-emerald-600 text-white' : 'bg-blue-900 text-white'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className={`text-sm md:text-base ${!isUnlocked ? 'text-stone-500' : isDone ? 'text-emerald-950' : 'text-blue-950'}`}>
                          {lesson.title}
                        </div>
                        {isUnlocked && (
                          <div className="text-xs text-stone-500 font-normal flex items-center gap-2 mt-0.5">
                            <span>Tiến độ: <strong className={isDone ? 'text-emerald-600' : 'text-blue-700'}>{correctCount}/{totalQ}</strong> câu</span>
                            {isDone ? (
                              <span className="text-emerald-700 font-bold text-[10px] bg-emerald-100 px-2 py-0.5 rounded-full">✅ Đã xong</span>
                            ) : (
                              <span className="text-amber-700 font-medium text-[10px] bg-amber-100 px-2 py-0.5 rounded-full">Còn {remainingQ} câu</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {!isUnlocked ? (
                        <Lock size={18} className="text-stone-400"/>
                      ) : isDone ? (
                        <CheckCircle size={20} className="text-emerald-600"/>
                      ) : (
                        <SwordIcon size={20} className="text-blue-600 animate-bounce"/>
                      )}
                    </div>
                 </button>
               );
             })}
          </div>
          <button onClick={() => setView('kinh-luan-topic')} className="mt-8 text-blue-900 font-bold uppercase hover:underline cursor-pointer">Quay lại</button>
       </div>

       {/* ===== MODAL: BÀI BỊ KHOÁ ===== */}
       {lockedModal && (
         <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" onClick={() => setLockedModal(null)}>
           <div className="bg-gradient-to-b from-stone-900 via-amber-950/95 to-stone-950 border-2 border-amber-600/80 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[0_0_60px_rgba(245,158,11,0.3)] text-center relative" onClick={e => e.stopPropagation()}>
             <div className="w-16 h-16 rounded-full bg-amber-950/80 border-2 border-amber-500/60 flex items-center justify-center mx-auto mb-4 text-3xl shadow-[0_0_20px_rgba(245,158,11,0.4)]">
               🔒
             </div>
             <div className="text-xs text-amber-500 font-bold uppercase tracking-[0.2em] mb-1">Chưa Mở Khóa</div>
             <h3 className="text-amber-300 font-cinzel font-black text-xl md:text-2xl uppercase tracking-wider mb-4 drop-shadow">
               {lockedModal.lessonTitle}
             </h3>
             
             <div className="bg-stone-950/80 border border-amber-800/50 rounded-2xl p-4 md:p-5 mb-6 text-stone-200 text-sm md:text-base leading-relaxed text-left">
               <p className="mb-2">
                 Bạn phải vượt qua <span className="text-amber-400 font-bold">{lockedModal.prevTotal} câu</span> thì mới mở khóa được <span className="text-amber-300 font-bold">{lockedModal.lessonTitle}</span>, hiện chúa công đã vượt qua <span className="text-emerald-400 font-bold">{lockedModal.prevCorrect} câu</span>, còn <span className="text-red-400 font-bold">{lockedModal.prevRemaining} câu</span>.
               </p>
               <p className="text-amber-300 font-medium italic mt-3 pt-3 border-t border-stone-800 flex items-center gap-2">
                 <span>⚔️</span>
                 <span>Mời chúa công tiếp tục thí luyện để nhận các phần thưởng nhằm tăng cường quân lực phe ta.</span>
               </p>
             </div>

             <div className="flex flex-col sm:flex-row gap-3">
               <button
                 onClick={() => {
                   setLessonIdx(lockedModal.prevIdx);
                   setLockedModal(null);
                   setView('lesson-summary');
                 }}
                 className="flex-1 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold py-3 px-4 rounded-xl transition-all shadow-lg active:scale-95 cursor-pointer"
               >
                 Đến làm {lockedModal.prevTitle} ngay
               </button>
               <button
                 onClick={() => setLockedModal(null)}
                 className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold py-3 px-6 rounded-xl transition-all active:scale-95 cursor-pointer"
               >
                 Đã hiểu
               </button>
             </div>
           </div>
         </div>
       )}

       {/* ===== MODAL: CHỌN GÓI CÂU HỎI KHI VÀO BÀI ===== */}
       {packageModal && (
         <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in" onClick={() => setPackageModal(null)}>
           <div className="bg-gradient-to-b from-blue-950 via-slate-900 to-stone-950 border-2 border-blue-500/70 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-[0_0_60px_rgba(59,130,246,0.3)] text-center relative" onClick={e => e.stopPropagation()}>
             <div className="w-16 h-16 rounded-full bg-blue-950/80 border-2 border-blue-500/60 flex items-center justify-center mx-auto mb-3 text-3xl shadow-[0_0_20px_rgba(59,130,246,0.4)]">
               📚
             </div>
             <h3 className="text-blue-300 font-cinzel font-black text-xl uppercase tracking-wider mb-2 drop-shadow">
               {packageModal.lessonTitle}
             </h3>
             <div className="bg-blue-950/50 border border-blue-800/50 rounded-2xl p-4 mb-5 text-stone-300 text-sm leading-relaxed">
               <p className="mb-1">
                 Bài này có <span className="text-blue-400 font-bold">{packageModal.totalQ} câu hỏi</span>.
               </p>
               <p>
                 Đã vượt qua: <span className="text-emerald-400 font-bold">{packageModal.correctCount}/{packageModal.totalQ} câu</span>
                 {packageModal.remainingQ > 0 ? (
                   <span> (còn <span className="text-amber-400 font-bold">{packageModal.remainingQ} câu</span>).</span>
                 ) : (
                   <span className="text-emerald-300 font-bold"> (Đã hoàn thành 100%!).</span>
                 )}
               </p>
               <p className="text-blue-200 text-xs mt-2 italic">Vui lòng chọn nội dung học hoặc gói câu hỏi để bắt đầu:</p>
             </div>

             <div className="space-y-3 mb-6">
               <button
                 onClick={() => {
                   setLessonIdx(packageModal.lessonIdx);
                   setPackageModal(null);
                   setView('lesson-summary');
                 }}
                 className="w-full bg-gradient-to-r from-amber-800 to-amber-700 hover:from-amber-700 hover:to-amber-600 text-white font-bold p-3.5 rounded-xl border border-amber-500/60 transition-all flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
               >
                 <span>📖</span>
                 <span>Xem Kiến Thức Trọng Tâm</span>
               </button>

               <div className="grid grid-cols-2 gap-2.5">
                 {[10, 20, 30].map(cnt => (
                   <button
                     key={cnt}
                     onClick={() => {
                       setLessonIdx(packageModal.lessonIdx);
                       setPackageModal(null);
                       startQuiz(cnt);
                     }}
                     className="bg-stone-900/90 hover:bg-blue-900/80 border border-stone-700 hover:border-blue-500 text-white font-bold p-3 rounded-xl transition-all active:scale-95 cursor-pointer text-left flex items-center justify-between"
                   >
                     <span>Gói {cnt} câu</span>
                     <span className="text-xs text-blue-400">⚡</span>
                   </button>
                 ))}

                 <button
                   onClick={() => {
                     setLessonIdx(packageModal.lessonIdx);
                     setPackageModal(null);
                     startQuiz(packageModal.remainingQ > 0 ? packageModal.remainingQ : packageModal.totalQ);
                   }}
                   className="bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 border border-blue-500 text-white font-bold p-3 rounded-xl transition-all active:scale-95 cursor-pointer text-left flex items-center justify-between"
                 >
                   <span>Tất cả {packageModal.remainingQ > 0 ? `(${packageModal.remainingQ} câu)` : `(${packageModal.totalQ} câu)`}</span>
                   <span className="text-xs text-amber-300">👑</span>
                 </button>
               </div>
             </div>

             <button onClick={() => setPackageModal(null)} className="text-stone-400 hover:text-white text-sm transition-colors cursor-pointer">
               Đóng
             </button>
           </div>
         </div>
       )}
    </div>
  );
};

const MathJaxText = React.memo(({ html, className, tag: Tag = 'div', id }: { html: string, className?: string, tag?: any, id?: string }) => {
  const containerRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = html;
      const renderMath = () => {
        const mj = (window as any).MathJax;
        if (mj && mj.typesetPromise) {
          setTimeout(() => {
            try {
              if (containerRef.current) {
                mj.typesetClear([containerRef.current]);
                mj.typesetPromise([containerRef.current]).catch((err: any) => console.log('MathJax error: ', err));
              }
            } catch(e) {}
          }, 50);
        } else {
          setTimeout(renderMath, 100);
        }
      };
      renderMath();
    }
  }, [html]);
  return <Tag id={id} ref={containerRef} className={className} />;
});

const LessonSummaryView = ({ grade, chapterIdx, lessonIdx, setView }: any) => {
  const chapter = MATH_DATA[grade] && MATH_DATA[grade][chapterIdx];
  const lesson = chapter && chapter.lessons[lessonIdx];
  
  if (!lesson) return null;

  // Basic markdown parser
  const renderMarkdown = (text: string) => {
    let html = text
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      // Headers h4
      .replace(/#### (.*)/g, '<h4 class="text-lg font-bold mt-5 mb-2 text-amber-900 flex items-center gap-2">🔹 $1</h4>')
      // Headers (Kiến thức trọng tâm)
      .replace(/### (.*)/g, '<h3 class="text-xl font-black mt-8 mb-4 bg-amber-100/80 p-3 rounded-xl border-l-4 border-amber-600 text-amber-950 shadow-sm uppercase tracking-wide">✨ $1</h3>')
      // Blockquotes (Notes)
      .replace(/&gt; \[\!NOTE\][\s\S]*?&gt; \*\*(.*?)\*\*([\s\S]*)/g, '<div class="bg-gradient-to-br from-red-50 to-orange-50 border-l-[8px] border-red-600 p-6 md:p-8 my-10 rounded-r-3xl shadow-xl relative overflow-hidden ring-1 ring-red-900/10"><strong class="text-red-700 block mb-4 text-xl md:text-2xl font-black uppercase flex items-center gap-3 tracking-wide drop-shadow-sm">⚠️ $1</strong><div class="text-red-950/90 font-medium leading-relaxed text-lg z-10 relative">$2</div><div class="absolute -bottom-10 -right-10 text-9xl opacity-5">⚠️</div></div>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-900 font-bold">$1</strong>')
      // Images
      .replace(/!\[(.*?)\]\((.*?)\)/g, '<div class="flex justify-center my-6"><img src="$2" alt="$1" class="max-h-64 md:max-h-72 w-auto max-w-full object-contain drop-shadow-md rounded-xl bg-white p-3 border border-amber-200"/></div>')
      .replace(/^&gt; (.*)/gm, '<div class="pl-2 mb-2">$1</div>')
      // Lists
      .replace(/^- (.*)/gm, '<li class="ml-6 mb-2 list-disc pl-2">$1</li>')
      // Sub-lists
      .replace(/^  - (.*)/gm, '<li class="ml-10 mb-1 list-[circle] text-sm text-gray-800">$1</li>')
      // Auto-convert LaTeX in backticks to MathJax delimiters
      .replace(/`(\\[a-zA-Z]+.*?)`/g, '$$$1$$')
      // Inline Code / Math placeholders
      .replace(/`(.*?)`/g, '<code class="bg-amber-100 text-amber-900 px-1 rounded">$1</code>')
      // Newlines
      .replace(/\n/g, '<br/>')
      // Clean up empty br tags next to li/div
      .replace(/<br\/>(<li|<div)/g, '$1')
      .replace(/(<\/li>|<\/div>)<br\/>/g, '$1');
      
    return { __html: html };
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url('${import.meta.env.BASE_URL}ancient_exam_bg.jpg')` }}
    >
       <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />
       
       {/* 2 Câu thơ bên trái - Bình Ngô Đại Cáo */}
       <div className="hidden lg:flex absolute left-[2%] top-0 bottom-0 flex-row items-center justify-center gap-6 xl:gap-10 pointer-events-none opacity-100 py-10 z-10">
         <div className="flex flex-col justify-center gap-4 xl:gap-8 h-full">
           {["Việc", "Nhân", "Nghĩa", "Cốt", "Ở", "Yên", "Dân"].map((word, i) => (
             <div key={`l1-${i}`} className="text-[2.2rem] xl:text-[2.8rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
         <div className="flex flex-col justify-center gap-4 xl:gap-8 h-full">
           {["Quân", "Điếu", "Phạt", "Trước", "Lo", "Trừ", "Bạo"].map((word, i) => (
             <div key={`l2-${i}`} className="text-[2.2rem] xl:text-[2.8rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
       </div>

       {/* 2 Câu thơ bên phải */}
       <div className="hidden lg:flex absolute right-[2%] top-0 bottom-0 flex-row items-center justify-center gap-6 xl:gap-10 pointer-events-none opacity-100 py-10 z-10">
         <div className="flex flex-col justify-center gap-4 xl:gap-8 h-full">
           {["Như", "Nước", "Đại", "Việt", "Ta", "Từ", "Trước"].map((word, i) => (
             <div key={`r1-${i}`} className="text-[2.2rem] xl:text-[2.8rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
         <div className="flex flex-col justify-center gap-4 xl:gap-8 h-full">
           {["Vốn", "Xưng", "Nền", "Văn", "Hiến", "Đã", "Lâu"].map((word, i) => (
             <div key={`r2-${i}`} className="text-[2.2rem] xl:text-[2.8rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
       </div>

       <div className="max-w-4xl w-full scroll-bg p-12 rounded-[3rem] shadow-2xl flex flex-col max-h-[90vh] relative z-20">
         <h2 className="text-3xl font-cinzel font-black mb-6 text-amber-950 flex items-center gap-3"><BookOpen size={36}/> Kiến Thức Trọng Tâm</h2>
         <MathJaxText id="lesson-summary-content" className="flex-1 overflow-y-auto custom-scrollbar text-left prose prose-amber" html={renderMarkdown(lesson.summary).__html} tag="div" />
        <button onClick={() => setView('quiz-setup')} className="mt-8 bg-amber-950 text-white py-5 rounded-2xl font-black uppercase text-xl shadow-lg active:scale-95 transition-all">Vào Tu Luyện</button>
      </div>
    </div>
  );
};

const QuizSetupView = ({ startQuiz, setView, grade, chapterIdx, lessonIdx, player }: any) => {
  const chapter = MATH_DATA[grade]?.[chapterIdx];
  const lesson = chapter?.lessons?.[lessonIdx];
  const allQ = getQuestionsForLesson(grade, chapterIdx, lessonIdx);
  const totalQ = allQ.length > 0 ? allQ.length : 60;
  const correctKey = `g${grade}-c${chapterIdx}-l${lessonIdx}`;
  const correctCount = (player?.mathCorrectQuestions?.[correctKey] || []).length;
  const remainingQ = Math.max(0, totalQ - correctCount);

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/ancient_exam_bg.jpg?v=1')" }}
    >
       <div className="absolute inset-0 bg-black/60 pointer-events-none z-0" />
       
       {/* 3 Câu thơ bên trái */}
       <div className="hidden lg:flex absolute left-[2%] top-0 bottom-0 flex-row items-center justify-center gap-4 xl:gap-8 pointer-events-none opacity-100 py-4 z-10">
         <div className="flex flex-col justify-center gap-2 xl:gap-4 h-full">
           {["Đánh", "Cho", "Sử", "Tri", "Nam", "Quốc", "Anh", "Hùng", "Chi", "Hữu", "Chủ"].map((word, i) => (
             <div key={`l1-${i}`} className="text-[1.6rem] xl:text-[2rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
           <div className="text-[1.2rem] xl:text-[1.5rem] font-bold text-[#c2a265] text-center mt-2 leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 4px rgba(0,0,0,1)' }}>Nguyễn</div>
           <div className="text-[1.2rem] xl:text-[1.5rem] font-bold text-[#c2a265] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 4px rgba(0,0,0,1)' }}>Huệ</div>
         </div>
         <div className="flex flex-col justify-center gap-2 xl:gap-4 h-full">
           {["Đánh", "Cho", "Họ", "Phiến", "Giáp", "Bất", "Hoàn"].map((word, i) => (
             <div key={`l2-${i}`} className="text-[1.8rem] xl:text-[2.4rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
         <div className="flex flex-col justify-center gap-2 xl:gap-4 h-full">
           {["Đánh", "Cho", "Họ", "Chích", "Luân", "Bất", "Phản"].map((word, i) => (
             <div key={`l3-${i}`} className="text-[1.8rem] xl:text-[2.4rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
       </div>

       {/* 2 Câu thơ bên phải */}
       <div className="hidden lg:flex absolute right-[2%] top-0 bottom-0 flex-row items-center justify-center gap-4 xl:gap-8 pointer-events-none opacity-100 py-4 z-10">
         <div className="flex flex-col justify-center gap-2 xl:gap-4 h-full">
           {["Đánh", "Cho", "Để", "Đen", "Răng"].map((word, i) => (
             <div key={`r1-${i}`} className="text-[1.8rem] xl:text-[2.4rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
         <div className="flex flex-col justify-center gap-2 xl:gap-4 h-full">
           {["Đánh", "Cho", "Để", "Dài", "Tóc"].map((word, i) => (
             <div key={`r2-${i}`} className="text-[1.8rem] xl:text-[2.4rem] font-bold text-[#FFD700] text-center leading-none" style={{ fontFamily: "'Dancing Script', cursive", textShadow: '2px 2px 6px rgba(0,0,0,1), 0 0 15px rgba(0,0,0,0.9)' }}>
               {word}
             </div>
           ))}
         </div>
       </div>

       <div className="max-w-2xl w-full scroll-bg p-8 md:p-12 rounded-[3rem] text-center shadow-2xl border-amber-900 relative z-20">
          <Trophy className="mx-auto mb-3 text-amber-600" size={56}/>
          <h2 className="text-2xl md:text-3xl font-cinzel font-black text-blue-950 uppercase mb-4">Thiết Lập Tu Luyện</h2>
          
          {/* Thông báo số câu bài học theo yêu cầu của Chúa công */}
          <div className="bg-gradient-to-r from-blue-950/80 to-stone-900/90 border border-amber-500/50 rounded-2xl p-5 mb-6 text-stone-200 text-left shadow-lg">
             <div className="text-amber-400 font-cinzel font-black text-lg mb-1">{lesson?.title || 'Bài học'}</div>
             <div className="text-sm md:text-base leading-relaxed text-stone-300">
               Bài này có <span className="text-amber-300 font-bold">{totalQ} câu hỏi</span>.
               Hiện chúa công đã vượt qua: <span className="text-emerald-400 font-bold">{correctCount}/{totalQ} câu</span>
               {remainingQ > 0 ? (
                 <span> (còn <span className="text-amber-300 font-bold">{remainingQ} câu</span> chưa vượt qua).</span>
               ) : (
                 <span className="text-emerald-300 font-bold"> (Đã vượt qua toàn bộ!).</span>
               )}
             </div>
             <div className="text-xs text-amber-400/90 mt-2 font-medium italic">
               ⚡ Vui lòng chọn gói câu hỏi bên dưới để bắt đầu thí luyện:
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
             {[10, 15, 20, 30].map(cnt => (
               <button 
                 key={cnt} 
                 onClick={() => startQuiz(cnt)} 
                 className="bg-gradient-to-r from-blue-900 to-blue-800 hover:from-blue-800 hover:to-blue-700 text-white py-4 px-4 rounded-xl font-black uppercase text-base shadow-md active:scale-95 transition-all cursor-pointer border border-blue-600/50 flex items-center justify-between"
               >
                 <span>Gói {cnt} Câu Hỏi</span>
                 <span className="text-amber-400 text-xs">⚔️</span>
               </button>
             ))}
             <button 
               onClick={() => startQuiz(remainingQ > 0 ? remainingQ : totalQ)} 
               className="sm:col-span-2 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white py-4 px-6 rounded-xl font-black uppercase text-base shadow-lg active:scale-95 transition-all cursor-pointer border border-amber-400/60 flex items-center justify-center gap-2"
             >
               <span>👑 Gói Tất Cả {remainingQ > 0 ? `Còn Lại (${remainingQ} câu)` : `(${totalQ} câu)`}</span>
             </button>
          </div>
          <button onClick={() => setView('kinh-luan-lesson')} className="text-blue-900 font-bold uppercase border-b border-blue-900 hover:text-blue-700 transition-colors cursor-pointer text-sm">Xem lại danh mục bài</button>
       </div>
    </div>
  );
};
const QuizResultView = ({ correct, total, rewards, setView, player }: any) => {
  const handleExportExcel = () => {
    if (!player || !player.trialHistory || player.trialHistory.length === 0) {
      alert("Không có dữ liệu để xuất!");
      return;
    }
    const lastRecord = player.trialHistory[player.trialHistory.length - 1];
    
    const rows = lastRecord.questions.map((q: any, index: number) => ({
      "Tên người chơi": lastRecord.username,
      "Gói câu hỏi": lastRecord.packageSize,
      "Lớp": lastRecord.grade,
      "Câu số": index + 1,
      "Nội dung câu hỏi": q.questionText,
      "Đáp án của người chơi": q.options && q.options.length > 0 && typeof q.userAnswer === 'number' ? q.options[q.userAnswer] : (q.userAnswer !== null ? q.userAnswer : "Chưa trả lời"),
      "Đáp án đúng": q.options && q.options.length > 0 && typeof q.correctAnswer === 'number' ? q.options[q.correctAnswer] : q.correctAnswer,
      "Kết quả": q.isCorrect ? "Đúng" : "Sai",
      "Thời gian trả lời (giây)": q.timeTakenSeconds
    }));

    const worksheet = XLSX.utils.json_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "KetQuaThiLuyen");
    XLSX.writeFile(workbook, `KetQuaThiLuyen_${lastRecord.timestamp}.xlsx`);
  };

  return (
  <div className="min-h-screen ancient-bg flex items-center justify-center p-8">
     <div className="max-w-3xl w-full scroll-bg p-12 rounded-[3rem] text-center shadow-2xl border-amber-900">
        <Trophy className="mx-auto text-amber-500 mb-6" size={100}/>
        <h2 className="text-3xl font-cinzel font-black uppercase mb-2 text-amber-950">Tổng Kết Tu Luyện</h2>
        <div className="text-6xl font-black mb-2 text-stone-700">{correct} <span className="text-2xl text-stone-400">/ {total}</span></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 mt-10 text-center">
           <div className="group relative bg-stone-900 p-4 rounded-2xl border border-amber-500/20 shadow-lg flex flex-col items-center justify-center cursor-pointer">
              <img src="/items/gold.png" alt="Vàng" className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2 drop-shadow-md group-hover:scale-110 transition-transform" />
              <div className="text-yellow-500 font-black text-2xl">+{(rewards.gold || 0).toLocaleString()}</div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl border border-amber-500/30">Vàng</div>
           </div>
           <div className="group relative bg-stone-900 p-4 rounded-2xl border border-blue-500/20 shadow-lg flex flex-col items-center justify-center cursor-pointer">
              <img src="/items/normal_ticket.png" alt="Lệnh bài" className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2 drop-shadow-md group-hover:scale-110 transition-transform" />
              <div className="text-blue-400 font-black text-2xl">+{rewards.normal}</div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl border border-blue-500/30">Lệnh Bài</div>
           </div>
           <div className="group relative bg-stone-900 p-4 rounded-2xl border border-purple-500/20 shadow-lg flex flex-col items-center justify-center cursor-pointer">
              <img src="/items/premium_ticket.png" alt="Danh tướng" className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2 drop-shadow-md group-hover:scale-110 transition-transform" />
              <div className="text-purple-400 font-black text-2xl">+{rewards.premium}</div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl border border-purple-500/30">Lệnh Bài Danh Tướng</div>
           </div>
           <div className="group relative bg-stone-900 p-4 rounded-2xl border border-amber-500/40 shadow-lg flex flex-col items-center justify-center cursor-pointer">
              <img src="/items/artifact_ticket.png" alt="Thần Khí" className="w-12 h-12 md:w-16 md:h-16 object-contain mb-2 drop-shadow-md group-hover:scale-110 transition-transform" />
              <div className="text-amber-400 font-black text-2xl">+{rewards.artifact || 0}</div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black/90 text-white text-[10px] md:text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-xl border border-amber-500/50">Mảnh Thần Khí</div>
           </div>
        </div>
        <div className="flex flex-col gap-4">
           <button onClick={handleExportExcel} className="bg-green-700 hover:bg-green-600 text-white px-20 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Xuất Kết Quả Excel</button>
           <button onClick={() => setView('chapter-hub')} className="bg-stone-900 text-amber-500 px-20 py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl active:scale-95 hover:bg-stone-800 transition-all">Về Doanh Trại</button>
        </div>
     </div>
  </div>
  );
};

const QuizPlayView = ({ question, idx, total, showFeedback, userAnswers, setUserAnswers, onAnswer, lastReward, onNext, setView, autoNext, onAutoNextChange }: any) => {
  const [timeLeft, setTimeLeft] = useState(30);

  // Reset timer khi chuyển câu
  useEffect(() => {
    setTimeLeft(30);
  }, [idx]);

  // Đồng hồ đếm ngược
  useEffect(() => {
    if (showFeedback) return; // Dừng khi đã có đáp án
    if (timeLeft <= 0) {
      onAnswer(-1, 0); // Hết giờ → tính sai
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showFeedback]);

  // Tự chuyển câu sau 2.5s nếu bật autoNext
  useEffect(() => {
    if (showFeedback && autoNext) {
      const t = setTimeout(() => onNext(), 2500);
      return () => clearTimeout(t);
    }
  }, [showFeedback, autoNext]);

  if (!question) {
     return (
       <div className="min-h-screen ancient-bg flex items-center justify-center p-8">
         <div className="max-w-2xl w-full scroll-bg p-12 rounded-[3rem] text-center shadow-2xl border-amber-900">
           <h2 className="text-2xl font-cinzel font-black text-amber-950 uppercase mb-4">Không tìm thấy câu hỏi</h2>
           <p className="text-amber-900/70 mb-8 font-bold">Chưa có dữ liệu bài tập cho phần này hoặc dữ liệu đang cập nhật. Xin vui lòng thử lại sau.</p>
           <button onClick={() => setView && setView('kinh-luan-lesson')} className="bg-amber-950 text-white py-4 px-8 rounded-xl font-black uppercase shadow-lg transition-all active:scale-95">Quay Lại</button>
         </div>
       </div>
     );
  }
  const uAns = userAnswers[idx];

  // Màu timer theo thời gian
  const timerColor = timeLeft <= 5 ? 'text-red-600' : timeLeft <= 10 ? 'text-orange-500' : 'text-amber-800';
  const timerBg = timeLeft <= 5 ? 'bg-red-100 border-red-400' : timeLeft <= 10 ? 'bg-orange-100 border-orange-400' : 'bg-amber-50 border-amber-300';
  const timerBarColor = timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-orange-400' : 'bg-amber-600';

  return (
    <div className="min-h-screen ancient-bg flex items-center justify-center p-4">
      <div id="quiz-container-inner" className="max-w-5xl w-[95vw] scroll-bg p-10 md:p-16 rounded-[3rem] shadow-2xl min-h-[85vh] flex flex-col relative">
        {/* Header: Thoát | Câu số | Timer | AutoNext | Cấp độ */}
        <div className="flex justify-between items-center mb-4 text-xs font-black uppercase text-amber-900/40">
          <div className="flex gap-4 items-center">
             <button onClick={() => {
                if (window.confirm('Bạn có chắc chắn muốn thoát? Toàn bộ kết quả thi luyện hiện tại sẽ bị hủy bỏ!')) {
                   setView('chapter-hub');
                }
             }} className="bg-red-900/10 text-red-700 px-4 py-2 rounded-xl hover:bg-red-900/20 active:scale-95 transition-all">THOÁT</button>
             <span>Câu {idx + 1} / {total}</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Toggle tự động chuyển câu */}
            {onAutoNextChange && (
              <label className="flex items-center gap-1.5 cursor-pointer select-none text-amber-800/70 hover:text-amber-700 transition-colors">
                <div
                  onClick={() => onAutoNextChange(!autoNext)}
                  className={`relative w-10 h-5 rounded-full transition-colors ${autoNext ? 'bg-amber-600' : 'bg-stone-300'}`}
                >
                  <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoNext ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </div>
                <span className="text-[10px]">Tự chuyển câu</span>
              </label>
            )}
            {/* Timer tròn */}
            {!showFeedback && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 font-black text-base transition-all ${timerBg} ${timerColor}`}>
                ⏱ {timeLeft}s
              </div>
            )}
          </div>
          <span className="bg-amber-900/10 px-3 py-1 rounded-full border border-amber-900/20">Cấp độ: {question.level}</span>
        </div>

        {/* Thanh progress timer */}
        {!showFeedback && (
          <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-6">
            <div
              className={`h-full rounded-full transition-all duration-1000 ${timerBarColor}`}
              style={{ width: `${(timeLeft / 30) * 100}%` }}
            />
          </div>
        )}

        <MathJaxText className="text-3xl md:text-4xl font-bold mb-12 text-center text-amber-950 leading-relaxed quiz-content" html={question.question.replace(/\\,/g, '.').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-900 bg-amber-200/50 px-2 py-1 rounded shadow-sm">$1</strong>')} tag="div" />
        {question.imageUrl && (
          <div className="flex justify-center mb-12">
            <img src={question.imageUrl} alt="Hình ảnh bài toán" className="max-w-full h-auto max-h-96 rounded-xl border-4 border-amber-900/20 shadow-lg object-contain bg-white" />
          </div>
        )}
        <div className="flex-1">
          {question.type === 'short_answer' ? (
            <div className="space-y-4">
              <input type="text" className="w-full p-6 border-4 border-amber-900/50 rounded-2xl text-center text-3xl font-black outline-none bg-white text-black shadow-xl" placeholder="Đáp số..." value={uAns || ''} onChange={(e) => setUserAnswers((p: any) => ({...p, [idx]: e.target.value}))} disabled={showFeedback} />
              {!showFeedback && <button onClick={() => onAnswer(uAns, timeLeft)} className="w-full bg-amber-950 text-white py-5 rounded-2xl font-black uppercase text-xl shadow-lg transition-all active:scale-95">Xác Nhận</button>}
            </div>
          ) : (
            <div className={`grid grid-cols-1 ${(question.options || []).some((opt: any) => opt.length > 40) ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-4 md:gap-6`}>
              {(question.options?.length > 0 ? question.options : (question.type === 'true_false' ? ['Đúng', 'Sai'] : [])).map((opt: any, i: number) => (
                <button key={i} onClick={() => onAnswer(i, timeLeft)} disabled={showFeedback} className={`p-6 rounded-2xl border-2 font-bold text-left transition-all text-xl md:text-2xl flex items-center ${showFeedback ? (i === question.correctAnswer ? 'bg-green-600 text-white border-green-800 scale-105 z-10' : (uAns === i ? 'bg-red-600 text-white border-red-800' : 'bg-stone-200 opacity-40')) : 'bg-white/90 border-amber-900/20 hover:border-amber-900 hover:bg-white hover:shadow-md'}`}>
                  <span className="inline-block bg-amber-950/10 w-10 h-10 text-center leading-10 rounded-lg mr-4 text-amber-900 font-black">{question.type === 'true_false' ? (i === 0 ? 'Đ' : 'S') : String.fromCharCode(65 + i)}</span>
                  <MathJaxText html={opt.replace(/^[A-Z]\.\s*/, '').replace(/\\,/g, '.').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')} tag="span" />
                </button>
              ))}
            </div>
          )}
        </div>
        {showFeedback && (
          <div className="mt-8 p-6 bg-white rounded-3xl border-2 border-amber-900/20 shadow-xl animate-in slide-in-from-bottom-4">
             {lastReward && (
               <div className="flex flex-col items-center gap-1 mb-4 bg-green-900/10 py-3 rounded-2xl border border-green-900/20 text-green-800 font-black uppercase text-sm">
                 <div className="flex items-center gap-2">
                   <Sparkles className="text-yellow-500" size={20}/>
                   <span>+ {lastReward.gold.toLocaleString()} 💰 {lastReward.ticket ? ` & 1 ${lastReward.ticket === 'premium' ? '💎' : lastReward.ticket === 'artifact' ? '⚗️' : '🎫'}` : ""}</span>
                 </div>
                 {lastReward.speedLabel && (
                   <span className="text-xs px-3 py-0.5 rounded-full bg-amber-200/60 text-amber-800 font-black">{lastReward.speedLabel}</span>
                 )}
               </div>
             )}
             <MathJaxText className="bg-amber-50 p-6 md:p-8 rounded-xl border border-amber-900/10 text-lg md:text-xl italic font-bold text-amber-950 leading-relaxed" html={question.explanation.replace(/\\,/g, '.').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\*\*(.*?)\*\*/g, '<strong class="text-amber-900">$1</strong>')} tag="div" />
             {question.explanationImageUrl && (
               <div className="flex justify-center mt-4">
                 <img src={question.explanationImageUrl} alt="Giải thích" className="max-w-full h-auto max-h-64 rounded-xl border-4 border-amber-900/20 shadow-sm object-contain bg-white" />
               </div>
             )}
             {autoNext ? (
               <div className="mt-4 text-center text-xs text-amber-600 font-bold animate-pulse">Tự chuyển câu sau 2.5 giây...</div>
             ) : (
               <button onClick={onNext} className="mt-6 w-full bg-stone-900 text-amber-500 py-4 rounded-xl font-black uppercase tracking-widest shadow-lg active:scale-95">Tiếp Tục</button>
             )}
          </div>
        )}
      </div>
    </div>

  );
}



const SummonView = ({ player, summon, results, setView, clearResults, chapter }: any) => {
  const [animState, setAnimState] = useState<'idle' | 'rolling' | 'playing_videos' | 'revealing' | 'done'>('idle');
  const [revealIndices, setRevealIndices] = useState<number[]>([]);
  const [flash, setFlash] = useState(false);
  const [selectedHero, setSelectedHero] = useState<any>(null);
  const [videoQueue, setVideoQueue] = useState<any[]>([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (results.length > 0 && animState === 'idle') {
      setAnimState('rolling');
      setRevealIndices([]);
      setFlash(false);
      
      // Chỉ lấy tướng UR/SSR có chỉ số cao nhất để phát video giới thiệu
      const allWithVideo = [...results]
        .filter(r => r && r.skillVideoUrl && AVAILABLE_VIDEOS.includes(r.skillVideoUrl.replace('/videos/', '').replace('.mp4', ''))
                  && (r.rarity === 'UR' || r.rarity === 'SSR'))
        .sort((a, b) => (b.overall || 0) - (a.overall || 0));
      const queue = allWithVideo.length > 0 ? [allWithVideo[0]] : [];
      
      setVideoQueue(queue);
      setCurrentVideoIndex(0);

      // Wait for rolling animation
      setTimeout(() => {
        if (queue.length > 0) {
          setAnimState('playing_videos');
        } else {
          setAnimState('revealing');
        }
      }, 2500); // 2.5s of mystery shaking
    } else if (results.length === 0) {
      setAnimState('idle');
      setVideoQueue([]);
    }
  }, [results, animState]);

  useEffect(() => {
    if (animState === 'revealing') {
       let i = 0;
       const interval = setInterval(() => {
          const currentIndex = i;
          setRevealIndices(prev => [...prev, currentIndex]);
          
          // Check for SSR/UR flash
          if (results[currentIndex] && (results[currentIndex].rarity === 'SSR' || results[currentIndex].rarity === 'UR')) {
             setFlash(true);
             setTimeout(() => setFlash(false), 1500);
          }

          i++;
          if (i >= results.length) {
            clearInterval(interval);
            setTimeout(() => setAnimState('done'), 1000);
          }
       }, 500); // reveal one by one every 500ms
       return () => clearInterval(interval);
    }
  }, [animState, results]);

  return (
    <div className="min-h-screen viet-bg flex flex-col items-center justify-start pt-12 pb-24 p-6 relative overflow-y-auto custom-scrollbar">
      {flash && <div className="ssr-flash-overlay" />}
      {animState === 'playing_videos' && videoQueue.length > 0 && (
        <div
          className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center cursor-pointer select-none"
          onClick={() => setAnimState('revealing')}
        >
          <video
            src={videoQueue[currentVideoIndex].skillVideoUrl}
            autoPlay
            playsInline
            preload="auto"
            className="w-full max-w-4xl h-auto max-h-[70vh] object-contain border-2 border-amber-500/50 rounded-xl shadow-[0_0_50px_rgba(245,158,11,0.3)] pointer-events-none"
            onEnded={() => {
              if (currentVideoIndex < videoQueue.length - 1) {
                setCurrentVideoIndex(currentVideoIndex + 1);
              } else {
                setAnimState('revealing');
              }
            }}
            onError={(e) => {
              console.warn("Video load failed, skipping...", e);
              if (currentVideoIndex < videoQueue.length - 1) {
                setCurrentVideoIndex(currentVideoIndex + 1);
              } else {
                setAnimState('revealing');
              }
            }}
          />
          <div className="mt-8 text-center animate-fade-in-up" onClick={e => e.stopPropagation()}>
             <h3 className="text-4xl font-cinzel text-amber-400 uppercase tracking-widest drop-shadow-[0_0_15px_rgba(245,158,11,0.8)]">{videoQueue[currentVideoIndex].name}</h3>
             <div className="flex items-center justify-center gap-3 mt-3">
               <span className={`font-black italic px-3 py-1 rounded text-sm ${videoQueue[currentVideoIndex].rarity === 'UR' ? 'bg-yellow-900/60 text-yellow-400' : videoQueue[currentVideoIndex].rarity === 'SSR' ? 'bg-red-900/60 text-red-400' : 'bg-purple-900/60 text-purple-400'}`}>
                 {videoQueue[currentVideoIndex].rarity}
               </span>
               <p className="text-amber-200 font-medium text-lg tracking-wide">{videoQueue[currentVideoIndex].title}</p>
             </div>
             <p className="text-amber-500/80 italic mt-2">Chỉ số: {videoQueue[currentVideoIndex].overall}</p>
          </div>
          {/* Gợi ý bỏ qua */}
          <p className="absolute bottom-6 text-stone-500 text-xs tracking-widest animate-pulse pointer-events-none">
            Nhấn vào khoảng trống để bỏ qua ⏭
          </p>
        </div>
      )}

      {/* Sao lấp lánh nền huyền bí */}
      {[...Array(18)].map((_, i) => (
        <div key={i} className="absolute w-1 h-1 bg-amber-400/25 rounded-full pointer-events-none" style={{
          left: `${(Math.sin(i * 1.5) * 45 + 50)}%`,
          top: `${(Math.cos(i * 2.3) * 45 + 50)}%`,
          animation: `starTwinkle ${2 + i % 3}s ease-in-out infinite`,
          animationDelay: `${i * 0.3}s`,
        }}/>
      ))}
      <div className="absolute inset-0 pointer-events-none" style={{background:'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.07) 0%, transparent 60%)'}}/>
      <button onClick={() => { setView('chapter-hub'); clearResults(); }} className="absolute top-6 left-6 text-amber-500 font-bold flex items-center gap-2 hover:text-amber-400 transition-colors z-10"><ChevronLeft/> Trở về</button>

      {/* Nút tắt đường sang Doanh Trại & Quân Đoàn */}
      <div className="absolute top-5 right-6 z-10 flex items-center gap-2">
        <button
          onClick={() => { clearResults(); setView('danh-trai'); }}
          className="flex items-center gap-1.5 bg-stone-900/80 hover:bg-amber-900/60 border border-amber-700/50 hover:border-amber-500 text-amber-300 hover:text-amber-200 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md backdrop-blur-md"
          title="Đến Doanh Trại để bày trận"
        >
          <Tent size={14} /> Doanh Trại
        </button>
        <button
          onClick={() => { clearResults(); setView('quan-doan'); }}
          className="flex items-center gap-1.5 bg-stone-900/80 hover:bg-emerald-900/60 border border-emerald-700/50 hover:border-emerald-500 text-emerald-300 hover:text-emerald-200 px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md backdrop-blur-md"
          title="Đến Quân Đoàn để bày trận vĩnh viễn"
        >
          <Users size={14} /> Quân Đoàn
        </button>
      </div>

      <h2 className="text-4xl font-cinzel text-amber-400 mb-3 tracking-widest uppercase drop-shadow-[0_0_15px_rgba(201,148,26,0.45)] relative z-10">✦ Tiên Hiền Trận ✦</h2>
      <p className="text-amber-800/55 font-black uppercase text-[10px] mb-10 tracking-widest italic border-b border-amber-900/20 pb-2 relative z-10">Hào kiệt Chương {chapter}: {CHAPTER_NAMES[chapter]}</p>
      
      {results.length > 0 ? (
        <div className="flex flex-col items-center justify-start w-full max-w-[1080px] px-2 relative z-10 mt-4 mb-auto">
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {results.map((res: any, idx: number) => {
              const raritySummonClass: Record<string, string> = {
                'UR':  'border-yellow-500 summon-card-ur',
                'SSR': 'border-red-500 summon-card-ssr',
                'SR':  'border-purple-400 summon-card-sr',
                'R':   'border-blue-500',
                'C':   'border-green-600',
              };
              const rarityLabelColor: Record<string, string> = {
                'UR': 'text-yellow-400', 'SSR': 'text-red-400', 'SR': 'text-purple-400',
                'R': 'text-blue-400', 'C': 'text-green-500',
              };
              const rClass = raritySummonClass[res.rarity] || 'border-amber-500';
              const rarityColor = rarityLabelColor[res.rarity] || 'text-amber-400';
              const isRevealed = revealIndices.includes(idx);
              const isRolling = animState === 'rolling';

              return (
                <div key={idx} className={`w-[120px] md:w-[180px] h-[180px] md:h-[270px] gacha-card-container relative`}>
                  <div className={`gacha-card ${isRevealed ? 'flipped' : ''} ${isRolling ? 'animate-gacha-spin' : ''}`}>
                    
                    {/* MẶT TRƯỚC (Bí ẩn - Lưng thẻ 3D) */}
                    {!isRevealed && (
<div className="gacha-face gacha-front flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-2 border-2 border-amber-700/40 rounded-xl"></div>
                        <div className="w-14 h-14 md:w-20 md:h-20 rounded-full border-[3px] border-amber-600/60 flex items-center justify-center bg-black/60 mb-3 shadow-[0_0_20px_rgba(201,148,26,0.5)] z-10">
                           <span className="text-4xl text-amber-500 font-cinzel font-black drop-shadow-md">✦</span>
                        </div>
                        <div className="text-lg md:text-xl font-black uppercase text-amber-500 tracking-[0.1em] font-cinzel text-center leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] z-10">Sử Việt<br/>Anh Hùng</div>
                        <div className="absolute inset-0 bg-cover bg-center opacity-50 pointer-events-none mix-blend-screen" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/vietnam_map.png')` }}></div>
                          <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url('${import.meta.env.BASE_URL}images/texture_noise.png')` }}></div>
                    </div>
)}

                    {/* MẶT SAU (Kết quả) */}
                    <div className={`gacha-face gacha-back bg-gradient-to-b from-stone-900 to-stone-950 p-2 md:p-4 rounded-[2rem] border-2 ${rClass} shadow-[-4px_4px_0_#1a0f07,-6px_6px_20px_rgba(0,0,0,0.9)] flex flex-col items-center cursor-pointer`} onClick={() => isRevealed && setSelectedHero(res)}>
                        <div className={`relative w-full overflow-hidden rounded-xl mb-2 md:mb-3 ${getStarBorderClass(res.star)}`}>
                          <img src={res.image} className="w-full aspect-[2/3] object-cover contrast-125 shadow-xl border border-white/5" onError={(e) => { (e.target as HTMLImageElement).src = res.faction === 'enemy' ? DEFAULT_ENEMY_IMG : DEFAULT_ALLY_IMG; }} />
                          <div className={`absolute top-1 right-1 text-[8px] font-black px-1.5 py-0.5 rounded-full bg-black/80 ${rarityColor}`}>{res.rarity}</div>
                        </div>
                       <div className="mt-2 text-center">
                          <div className={`font-black uppercase tracking-widest text-[10px] md:text-sm drop-shadow-md ${rarityColor}`}>{res.name}</div>
                          <HeroStars starCount={res.star} size={9} className="justify-center pt-0.5 md:pt-1" />
                       </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
          {animState === 'done' && (
            <button onClick={clearResults} className="mt-12 gold-shimmer-btn px-20 py-5 rounded-2xl font-black uppercase text-xl shadow-xl transition-all active:scale-95 border border-amber-600/30 animate-in slide-in-from-bottom-4">Thu Quân!</button>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full z-10 h-full flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 w-full max-w-[1400px] px-4 text-center relative z-10 h-full items-center pb-8">
            <SummonBox type="normal" title="Chiêu Mộ Anh Hào" desc="Tỉ lệ cao C, R, SR" ticketCount={player.normalTickets} onSummon={(cnt: number) => summon('normal', cnt)} color="border-blue-500/80" glow="shadow-[0_0_70px_rgba(59,130,246,0.5)]" icon={<Ticket className="text-blue-300 drop-shadow-[0_0_20px_rgba(59,130,246,1)] mb-4" size={56}/>} titleColor="text-blue-100 drop-shadow-[0_0_12px_rgba(59,130,246,1)]" btnColor="bg-blue-900/80 hover:bg-blue-800 border-blue-400/50 text-blue-100 hover:text-white" bgImage="./images/black_tortoise_pillar.png" bgClass="brightness-[0.85]" />
            
            <SummonBox type="premium" title="Chiêu Mộ Danh Tướng" desc="Tỉ lệ cao SR, SSR, UR" ticketCount={player.premiumTickets} onSummon={(cnt: number) => summon('premium', cnt)} color="border-purple-500/80" glow="shadow-[0_0_70px_rgba(168,85,247,0.4)]" icon={<Ticket className="text-purple-300 drop-shadow-[0_0_20px_rgba(168,85,247,0.9)] mb-4" size={56}/>} titleColor="text-purple-100 drop-shadow-[0_0_10px_rgba(168,85,247,0.8)]" btnColor="bg-purple-900/80 hover:bg-purple-800 border-purple-400/50 text-purple-100 hover:text-white" bgImage="./images/vermilion_bird_pillar.png" />
            
            <SummonBox type="artifact" title="Chiêu Mộ Thần Khí" desc="Rơi Thần Khí Bản Mệnh" ticketCount={player.artifactTickets || 0} onSummon={(cnt: number) => summon('artifact', cnt)} color="border-amber-500/80" glow="shadow-[0_0_70px_rgba(245,158,11,0.5)]" icon={<ScrollText className="text-amber-300 drop-shadow-[0_0_20px_rgba(245,158,11,1)] mb-4" size={56}/>} titleColor="text-amber-100 drop-shadow-[0_0_12px_rgba(245,158,11,1)]" btnColor="bg-amber-900/80 hover:bg-amber-800 border-amber-400/50 text-amber-100 hover:text-white" bgImage="./images/white_tiger_pillar.png" bgClass="brightness-[0.85]" />
            
            <SummonBox type="legion" title="Chiêu Mộ Quân Đoàn" desc="Anh Hào & Thần Khí Toàn Cõi" ticketCount={player.legionTickets || 0} onSummon={(cnt: number) => summon('legion', cnt)} color="border-emerald-500/80" glow="shadow-[0_0_70px_rgba(16,185,129,0.4)]" icon={<Ticket className="text-emerald-300 drop-shadow-[0_0_20px_rgba(16,185,129,0.9)] mb-4" size={56}/>} titleColor="text-emerald-100 drop-shadow-[0_0_10px_rgba(16,185,129,0.8)]" btnColor="bg-emerald-900/80 hover:bg-emerald-800 border-emerald-400/50 text-emerald-100 hover:text-white" bgImage="./images/azure_dragon_pillar.png" />
          </div>
        </div>
        )}
        {selectedHero && !selectedHero.isArtifact && <HeroDetailModal hero={selectedHero} onClose={() => setSelectedHero(null)} />}
        {selectedHero && selectedHero.isArtifact && <ArtifactDetailModal artifact={selectedHero} onClose={() => setSelectedHero(null)} />}
      </div>
    );
  };

const SummonBox = ({ type, title, desc, ticketCount, onSummon, color, glow, icon, titleColor, btnColor, isCenter, bgImage, bgClass }: any) => {
  const titleParts = title.split(' ');
  const titleLine1 = titleParts.slice(0, 2).join(' ');
  const titleLine2 = titleParts.slice(2).join(' ');

  return (
  <div className={`relative w-full h-[550px] ${isCenter ? 'h-[600px]' : ''} rounded-[3rem] border-4 ${color} ${glow} overflow-hidden group hover:scale-[1.03] transition-all duration-500`}>
    {/* Background Image Pillar */}
    <img src={bgImage || "./images/dragon_pillar.png"} className={`absolute inset-0 w-full h-full object-cover ${bgClass || 'brightness-[0.7]'} group-hover:brightness-[0.9] group-hover:scale-110 transition-all duration-700`} alt="Pillar" />
    
    {/* Gradient Overlay for text readability (Top and Bottom only) */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none"></div>
    
    {/* Content */}
    <div className="absolute inset-0 px-6 pb-6 pt-2 md:px-8 md:pb-8 md:pt-4 flex flex-col justify-between text-center z-10">
      
      {/* TOP: Title Block */}
      <div className="flex flex-col items-center">
        <h3 className={`text-2xl md:text-3xl ${isCenter ? 'md:text-4xl' : ''} font-cinzel font-black uppercase tracking-widest leading-tight ${titleColor} mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,1)]`}>
           <div className="text-xl md:text-2xl opacity-90">{titleLine1}</div>
           <div>{titleLine2}</div>
        </h3>
        <p className={`font-bold italic text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-stone-200 drop-shadow-[0_1px_4px_rgba(0,0,0,1)]`}>{desc}</p>
      </div>
      
      {/* BOTTOM: Actions */}
      <div className="flex flex-col w-full">
        <div className="bg-black/60 backdrop-blur-md py-4 rounded-3xl border border-white/20 flex flex-col items-center justify-center gap-1 mb-6 shadow-inner">
           <span className="text-stone-300 text-[10px] font-black uppercase tracking-widest">Đang sở hữu</span>
           <div className="flex items-center gap-2">
              <span className="text-amber-400 font-black text-3xl drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]">{ticketCount}</span>
              <span className="text-amber-500/90 text-xs font-bold uppercase">Lệnh bài</span>
           </div>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
            {[1, 5, 10].map(cnt => (
               <button key={cnt} onClick={() => onSummon(cnt)} className={`${btnColor} py-4 md:py-5 rounded-2xl font-black uppercase text-sm border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] active:scale-95 transition-all hover:shadow-[0_0_20px_inherit] backdrop-blur-sm`}>
                  x{cnt}
               </button>
            ))}
        </div>
      </div>
      
    </div>
  </div>
  );
};

const AdminPanel = ({ player, setPlayer, onClose }: any) => {
  const [activeTab, setActiveTab] = useState<'claim' | 'images'>('claim');
  const [selectedType, setSelectedType] = useState('gold');
  const [selectedItem, setSelectedItem] = useState('');
  const [amount, setAmount] = useState(1);

  // Custom image links
  const [customImages, setCustomImages] = useState<Record<string, string>>(() => {
    return player.customItemImages || {};
  });

  const handleClaim = () => {
     if (selectedType === 'gold') {
        setPlayer({ ...player, gold: player.gold + amount });
     } else if (selectedType === 'jade') {
        setPlayer({ ...player, jade: player.jade + amount });
     } else if (selectedType === 'normalTickets') {
          setPlayer({ ...player, normalTickets: (player.normalTickets || 0) + amount });
       } else if (selectedType === 'premiumTickets') {
          setPlayer({ ...player, premiumTickets: (player.premiumTickets || 0) + amount });
       } else if (selectedType === 'artifactTickets') {
          setPlayer({ ...player, artifactTickets: (player.artifactTickets || 0) + amount });
       } else if (selectedType === 'legionTickets') {
          setPlayer({ ...player, legionTickets: (player.legionTickets || 0) + amount });
     } else if (selectedType === 'pills') {
        if (!selectedItem) return alert("Chưa chọn Đột Phá Đan");
        setPlayer({
          ...player,
          pills: {
            ...(player.pills || {}),
            [selectedItem]: ((player.pills && player.pills[selectedItem]) || 0) + amount
          }
        });
     } else if (selectedType === 'hero') {
        if (!selectedItem) return alert("Chưa chọn tướng");
        let heroData = INITIAL_HEROES.find(h => h.id === selectedItem);
        if (!heroData) heroData = ENEMY_HEROES.find(h => h.id === selectedItem);
        if (!heroData) return alert("Không tìm thấy tướng");
        
        const newInventory = [...player.inventory];
        for(let i = 0; i < amount; i++) {
            newInventory.push({ ...heroData, id: `${heroData.id}_${Date.now()}_${i}`, isPermanent: true });
        }
        setPlayer({ ...player, inventory: newInventory });
     } else if (selectedType === 'fragment') {
        if (!selectedItem) return alert("Chưa chọn tướng");
        let heroData = INITIAL_HEROES.find(h => h.id === selectedItem);
        if (!heroData) heroData = ENEMY_HEROES.find(h => h.id === selectedItem);
        if (!heroData) return alert("Không tìm thấy tướng");

        const newInventory = [...player.inventory];
        const existingHeroes = newInventory.filter(h => h.name === heroData!.name && h.isPermanent === true);
        if (existingHeroes.length > 0) {
            existingHeroes.forEach(h => { h.fragments = (h.fragments || 0) + amount; });
            setPlayer({ ...player, inventory: newInventory });
        } else {
            return alert("Chúa công phải sở hữu tướng này trong Quân Đoàn trước mới có chỗ chứa mảnh!");
        }
     } else if (selectedType === 'artifact') {
        if (!selectedItem) return alert("Chưa chọn thần khí");
        const artData = ARTIFACTS.find(a => a.id === selectedItem);
        if (!artData) return alert("Không tìm thấy thần khí");
        const newArtifacts = [...(player.artifacts || [])];
        for(let i = 0; i < amount; i++) newArtifacts.push(artData.id);
        setPlayer({ ...player, artifacts: newArtifacts });
     }
     alert("Chúa công đã nhận vật phẩm thành công!");
  };

  const handleFileUpload = (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        setCustomImages(prev => ({ ...prev, [itemId]: result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveCustomImages = () => {
    setPlayer((prev: any) => ({
      ...prev,
      customItemImages: customImages
    }));
    alert("Đã lưu bộ ảnh vật phẩm mới thành công!");
  };

  const resetCustomImages = () => {
    setCustomImages({});
    setPlayer((prev: any) => ({
      ...prev,
      customItemImages: {}
    }));
    alert("Đã đặt lại bộ ảnh vật phẩm về mặc định!");
  };

  const ITEM_LIST = [
    { id: 'normal', name: 'Lệnh Bài Thường', defaultImg: './items/normal_ticket.png', icon: '🎫' },
    { id: 'premium', name: 'Lệnh Bài Danh Tướng', defaultImg: './items/premium_ticket.png', icon: '📜' },
    { id: 'artifact', name: 'Tầm Bảo Thần Khí', defaultImg: './items/artifact_ticket.png', icon: '🔮' },
    { id: 'jade', name: 'Ngọc Bích', defaultImg: './items/jade.png', icon: '💎' },
    { id: 'pill1', name: 'Sơ Cấp Đột Phá Đan (6-10★)', defaultImg: './items/pill1.png', icon: '💊' },
    { id: 'pill2', name: 'Trung Cấp Phá Cảnh Đan (11-15★)', defaultImg: './items/pill2.png', icon: '🔮' },
    { id: 'pill3', name: 'Cao Cấp Thông Thiên Đan (16-20★)', defaultImg: './items/pill3.png', icon: '⚡' },
    { id: 'pill4', name: 'Thần Cấp Hóa Thần Đan (21-25★)', defaultImg: './items/pill4.png', icon: '🌌' },
    { id: 'pill5', name: 'Tối Thượng Thái Sơ Đan (26-30★)', defaultImg: './items/pill5.png', icon: '🚩' },
  ];

  return (
     <div className="fixed inset-0 z-[999] bg-black/80 flex items-center justify-center p-4 md:p-6 animate-in fade-in" onClick={onClose}>
        <div className="bg-stone-900 border-2 border-amber-500 rounded-3xl p-6 md:p-8 max-w-2xl w-full relative max-h-[90vh] flex flex-col shadow-2xl" onClick={e => e.stopPropagation()}>
           <button onClick={onClose} className="absolute top-4 right-4 text-amber-500 hover:text-amber-300 transition-colors">
              <XCircle size={28} />
           </button>
           
           <h2 className="text-xl md:text-2xl font-cinzel font-black text-amber-400 text-center mb-4">Lệnh Bài Chúa Công (Admin)</h2>
           
           {/* Navigation Tabs */}
           <div className="flex border-b border-amber-900/50 mb-6 gap-2">
              <button onClick={() => setActiveTab('claim')} className={`flex-1 py-2.5 rounded-t-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all ${activeTab === 'claim' ? 'bg-amber-700/40 text-amber-300 border-t-2 border-x-2 border-amber-500' : 'text-stone-400 hover:text-white'}`}>
                 🎁 Nhận Vật Phẩm
              </button>
              <button onClick={() => setActiveTab('images')} className={`flex-1 py-2.5 rounded-t-xl font-bold text-xs md:text-sm uppercase tracking-wider transition-all ${activeTab === 'images' ? 'bg-amber-700/40 text-amber-300 border-t-2 border-x-2 border-amber-500' : 'text-stone-400 hover:text-white'}`}>
                 🖼️ Tự Thay Ảnh Vật Phẩm
              </button>
           </div>

           {activeTab === 'claim' ? (
              <div className="flex flex-col gap-4 overflow-y-auto pr-1">
                 <select className="bg-black border border-amber-900 p-3 rounded-xl text-amber-200 outline-none" value={selectedType} onChange={e => {setSelectedType(e.target.value); setSelectedItem('');}}>
                    <option value="gold">Ngân Lượng</option>
                    <option value="jade">Ngọc Bích</option>
                    <option value="pills">Các Loại Đột Phá Đan</option>
                    <option value="normalTickets">Vé Anh Hào</option>
                      <option value="premiumTickets">Vé Danh Tướng</option>
                      <option value="artifactTickets">Vé Thần Khí</option>
                      <option value="legionTickets">Vé Quân Đoàn</option>
                    <option value="hero">Tướng</option>
                    <option value="fragment">Mảnh Tướng</option>
                    <option value="artifact">Thần Khí</option>
                 </select>

                 {selectedType === 'pills' && (
                    <select className="bg-black border border-amber-900 p-3 rounded-xl text-amber-200 outline-none" value={selectedItem} onChange={e => setSelectedItem(e.target.value)}>
                       <option value="">-- Chọn Đột Phá Đan --</option>
                       {BREAKTHROUGH_PILLS.map(p => <option key={p.id} value={p.id}>{p.icon} {p.name} ({p.desc})</option>)}
                    </select>
                 )}

                 {(selectedType === 'hero' || selectedType === 'fragment') && (
                    <select className="bg-black border border-amber-900 p-3 rounded-xl text-amber-200 outline-none" value={selectedItem} onChange={e => setSelectedItem(e.target.value)}>
                       <option value="">-- Chọn Tướng --</option>
                       <optgroup label="Ta">
                         {INITIAL_HEROES.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                       </optgroup>
                       <optgroup label="Địch">
                         {ENEMY_HEROES.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
                       </optgroup>
                    </select>
                 )}
                 {selectedType === 'artifact' && (
                    <select className="bg-black border border-amber-900 p-3 rounded-xl text-amber-200 outline-none" value={selectedItem} onChange={e => setSelectedItem(e.target.value)}>
                       <option value="">-- Chọn Thần Khí --</option>
                       {ARTIFACTS.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                    </select>
                 )}

                 <input type="number" min="1" className="bg-black border border-amber-900 p-3 rounded-xl text-amber-200 outline-none" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Số lượng" />
                 
                 <button onClick={handleClaim} className="bg-amber-600 text-white font-black py-3.5 rounded-xl hover:bg-amber-500 mt-2 tracking-widest uppercase">
                    NHẬN VẬT PHẨM
                 </button>
              </div>
           ) : (
              <div className="flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 flex-1">
                 <div className="bg-amber-950/40 p-3 rounded-xl border border-amber-800/40 text-xs text-amber-200 leading-relaxed">
                    💡 <b>Tự thêm ảnh của Chúa công:</b> Chọn file ảnh từ máy tính hoặc dán URL ảnh trực tiếp bên dưới. Ảnh sẽ lập tức thay thế hiển thị trong Kỳ Trân Các và Nâng Sao!
                 </div>

                 <div className="flex flex-col gap-3">
                    {ITEM_LIST.map((item) => {
                       const currentVal = customImages[item.id] || '';
                       return (
                          <div key={item.id} className="bg-black/60 p-3 rounded-xl border border-white/10 flex flex-col md:flex-row items-center gap-3">
                             <div className="w-14 h-14 rounded-lg bg-stone-950 border border-amber-600/30 overflow-hidden flex items-center justify-center shrink-0">
                                {currentVal ? (
                                   <img src={currentVal} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                   <span className="text-2xl">{item.icon}</span>
                                )}
                             </div>

                             <div className="flex-1 w-full flex flex-col gap-1">
                                <span className="text-xs font-bold text-amber-300">{item.name}</span>
                                <input
                                   type="text"
                                   placeholder="Dán URL link ảnh tại đây..."
                                   value={currentVal}
                                   onChange={e => setCustomImages(prev => ({ ...prev, [item.id]: e.target.value }))}
                                   className="bg-stone-950 border border-stone-800 text-xs p-2 rounded-lg text-stone-200 outline-none focus:border-amber-500 w-full"
                                />
                             </div>

                             <label className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs px-3 py-2 rounded-lg cursor-pointer font-bold border border-white/10 shrink-0 text-center">
                                📁 Chọn ảnh từ máy
                                <input
                                   type="file"
                                   accept="image/*"
                                   className="hidden"
                                   onChange={e => handleFileUpload(item.id, e)}
                                />
                             </label>
                          </div>
                       );
                    })}
                 </div>

                 <div className="flex gap-2 mt-4 pt-2 border-t border-white/10">
                    <button onClick={saveCustomImages} className="flex-1 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg">
                       💾 Lưu Bộ Ảnh Custom
                    </button>
                    <button onClick={resetCustomImages} className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-bold px-4 py-3 rounded-xl text-xs uppercase">
                       🔄 Đặt Lại Mặc Định
                    </button>
                 </div>
              </div>
           )}
        </div>
     </div>
  );
};

const ShopView = ({ player, setPlayer, setView }: any) => {
  const [activeTab, setActiveTab] = useState<'gold' | 'jade'>('gold');
  const [quantities, setQuantities] = useState<Record<string, number>>({
    normal: 1, premium: 1, artifact: 1, legion: 1,
    pill1: 1, pill2: 1, pill3: 1, pill4: 1, pill5: 1
  });

  const buyWithGold = (type: string, price: number, name: string) => {
    const qty = Math.max(1, quantities[type] || 1);
    const totalCost = price * qty;
    if (player.gold < totalCost) return alert(`Ngân lượng không đủ! Cần ${totalCost.toLocaleString()} Vàng.`);
    setPlayer((prev: any) => {
      const keyMap: Record<string, string> = { normal: 'normalTickets', premium: 'premiumTickets', artifact: 'artifactTickets', legion: 'legionTickets' };
      const key = keyMap[type];
      return { ...prev, gold: prev.gold - totalCost, [key]: (prev[key] || 0) + qty };
    });
    alert(`Đã mua thành công ${qty.toLocaleString()}x ${name}!`);
  };

  const buyWithJade = (type: string, price: number, name: string) => {
    const qty = Math.max(1, quantities[type] || 1);
    const totalCost = price * qty;
    if ((player.jade || 0) < totalCost) return alert(`Ngọc Bích không đủ! Cần ${totalCost.toLocaleString()} Ngọc Bích.`);
    setPlayer((prev: any) => {
      const newPills = { ...(prev.pills || {}) };
      newPills[type] = (newPills[type] || 0) + qty;
      return { ...prev, jade: (prev.jade || 0) - totalCost, pills: newPills };
    });
    alert(`Đã mua thành công ${qty.toLocaleString()}x ${name}!`);
  };

  return (
    <div className="min-h-screen ancient-bg flex flex-col">
       <div className="p-4 md:p-6 flex justify-between items-center bg-stone-900/95 border-b border-amber-900/50 shadow-xl z-10 backdrop-blur-md">
         <button onClick={() => setView('chapter-hub')} className="text-amber-500 font-bold flex items-center gap-2 hover:text-amber-400 transition-colors bg-stone-800 px-4 py-2 rounded-xl border border-amber-900/30 font-sans"><ChevronLeft/> Trở về</button>
         <div className="text-amber-400 font-black font-cinzel text-xl md:text-2xl tracking-widest uppercase drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">✦ Kỳ Trân Các ✦</div>
         <div className="flex items-center gap-3 font-sans">
           <div className="bg-stone-950 px-3 py-1.5 rounded-xl border border-yellow-700/50 flex items-center gap-1.5"><span className="text-yellow-500">🪙</span><span className="text-yellow-400 font-black text-sm">{(player.gold || 0).toLocaleString()}</span></div>
           <div className="bg-stone-950 px-3 py-1.5 rounded-xl border border-green-700/50 flex items-center gap-1.5"><span className="text-green-400 text-base">💚</span><span className="text-green-400 font-black text-sm">{(player.jade || 0).toLocaleString()}</span></div>
         </div>
       </div>
       <div className="flex border-b border-amber-900/30 bg-stone-950/60 font-sans">
         <button onClick={() => setActiveTab('gold')} className={`flex-1 py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${activeTab === 'gold' ? 'text-yellow-400 border-b-2 border-yellow-500 bg-yellow-950/20' : 'text-stone-500 hover:text-yellow-600'}`}>🪙 Kho Vàng — Lệnh Bài</button>
         <button onClick={() => setActiveTab('jade')} className={`flex-1 py-4 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all ${activeTab === 'jade' ? 'text-green-400 border-b-2 border-green-500 bg-green-950/20' : 'text-stone-500 hover:text-green-600'}`}>💚 Ngọc Bích — Đột Phá Đan</button>
       </div>
       <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full overflow-y-auto pb-20 custom-scrollbar font-sans">
         {activeTab === 'gold' && (
           <div className="animate-in fade-in duration-300">
             <div className="text-center mb-8"><h2 className="text-amber-400 font-cinzel font-black text-2xl uppercase tracking-widest mb-1">Lệnh Bài Triệu Hồi</h2><p className="text-stone-500 text-sm font-bold">Dùng Vàng để mua Lệnh Bài triệu hồi anh hùng</p></div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <ShopItem itemId="normal" player={player} title="Lệnh Bài Anh Hào" desc="Tỉ lệ: C → SR" price={2000} currency="gold" qty={quantities.normal} setQty={(q: number) => setQuantities(p => ({...p, normal: q}))} onBuy={() => buyWithGold('normal', 2000, 'Lệnh Bài Anh Hào')} img="./items/normal_ticket.png" color="blue" />
               <ShopItem itemId="premium" player={player} title="Lệnh Bài Danh Tướng" desc="Tỉ lệ cao SR → UR" price={10000} currency="gold" qty={quantities.premium} setQty={(q: number) => setQuantities(p => ({...p, premium: q}))} onBuy={() => buyWithGold('premium', 10000, 'Lệnh Bài Danh Tướng')} img="./items/premium_ticket.png" color="purple" />
               <ShopItem itemId="artifact" player={player} title="Thẻ Tầm Bảo Thần Khí" desc="Rơi Thần Khí Bản Mệnh" price={20000} currency="gold" qty={quantities.artifact} setQty={(q: number) => setQuantities(p => ({...p, artifact: q}))} onBuy={() => buyWithGold('artifact', 20000, 'Thẻ Tầm Bảo Thần Khí')} img="./items/artifact_ticket.png" color="amber" />
               <ShopItem itemId="legion" player={player} title="Lệnh Bài Quân Đoàn" desc="Anh Hào & Thần Khí Toàn Cõi" price={50000} currency="gold" qty={quantities.legion} setQty={(q: number) => setQuantities(p => ({...p, legion: q}))} onBuy={() => buyWithGold('legion', 50000, 'Lệnh Bài Quân Đoàn')} img="./items/legion_ticket.png" icon="🏯" color="emerald" />
             </div>
           </div>
         )}
         {activeTab === 'jade' && (
           <div className="animate-in fade-in duration-300">
             <div className="text-center mb-8">
               <h2 className="text-green-400 font-cinzel font-black text-2xl uppercase tracking-widest mb-1">Đột Phá Đan Thần Dược</h2>
               <p className="text-stone-500 text-sm font-bold">Dùng Ngọc Bích để mua Đan Dược nâng cấp mốc Sao tướng</p>
               <div className="inline-flex items-center gap-2 mt-2 bg-green-950/50 px-4 py-1.5 rounded-full border border-green-800/50"><span className="text-green-400">💚</span><span className="text-green-400 font-black text-sm">Ngọc Bích hiện có: {(player.jade || 0).toLocaleString()}</span></div>
             </div>
             <div className="flex items-center justify-between border-b border-rose-900/40 pb-2 mb-6"><h3 className="text-rose-400 font-cinzel font-black text-lg uppercase tracking-widest flex items-center gap-2">💊 5 Cấp Bậc Đan Dược</h3><span className="text-xs bg-rose-950 text-rose-300 px-3 py-1 rounded-full border border-rose-800/50 font-bold">Hàng Độc Quyền Quý Hiếm</span></div>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
               <ShopItem itemId="pill1" player={player} title="Sơ Cấp Đột Phá Đan" desc="Mốc 6-10★" price={20} currency="jade" qty={quantities.pill1} setQty={(q: number) => setQuantities(p => ({...p, pill1: q}))} onBuy={() => buyWithJade('pill1', 20, 'Sơ Cấp Đột Phá Đan')} img="./items/pill1.png" icon="💊" color="red" />
               <ShopItem itemId="pill2" player={player} title="Trung Cấp Phá Cảnh Đan" desc="Mốc 11-15★" price={60} currency="jade" qty={quantities.pill2} setQty={(q: number) => setQuantities(p => ({...p, pill2: q}))} onBuy={() => buyWithJade('pill2', 60, 'Trung Cấp Phá Cảnh Đan')} img="./items/pill2.png" icon="🔮" color="purple" />
               <ShopItem itemId="pill3" player={player} title="Cao Cấp Thông Thiên Đan" desc="Mốc 16-20★" price={150} currency="jade" qty={quantities.pill3} setQty={(q: number) => setQuantities(p => ({...p, pill3: q}))} onBuy={() => buyWithJade('pill3', 150, 'Cao Cấp Thông Thiên Đan')} img="./items/pill3.png" icon="⚡" color="sky" />
               <ShopItem itemId="pill4" player={player} title="Thần Cấp Hóa Thần Đan" desc="Mốc 21-25★" price={400} currency="jade" qty={quantities.pill4} setQty={(q: number) => setQuantities(p => ({...p, pill4: q}))} onBuy={() => buyWithJade('pill4', 400, 'Thần Cấp Hóa Thần Đan')} img="./items/pill4.png" icon="🌌" color="amber" />
               <ShopItem itemId="pill5" player={player} title="Tối Thượng Thái Sơ Đan" desc="Mốc 26-30★" price={1000} currency="jade" qty={quantities.pill5} setQty={(q: number) => setQuantities(p => ({...p, pill5: q}))} onBuy={() => buyWithJade('pill5', 1000, 'Tối Thượng Thái Sơ Đan')} img="./items/pill5.png" icon="🚩" color="rose" />
             </div>
             <div className="mt-10 bg-green-950/20 rounded-2xl border border-green-800/30 p-6">
               <h3 className="text-green-400 font-cinzel font-black uppercase tracking-widest text-sm mb-3">💡 Cách Kiếm Ngọc Bích</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-stone-400 font-bold">
                 <div className="bg-stone-900/60 rounded-xl p-3 border border-green-900/30"><div className="text-green-300 mb-1">🏆 Tự Hào Sử Việt</div><div>Thám Hoa: 20/câu đúng | Bảng Nhãn: 25/câu | Trạng Nguyên: 30/câu</div></div>
                 <div className="bg-stone-900/60 rounded-xl p-3 border border-green-900/30"><div className="text-green-300 mb-1">⚔️ Thí Luyện Đường</div><div>Vượt ải: 50 ngọc/ải</div></div>
                 <div className="bg-stone-900/60 rounded-xl p-3 border border-green-900/30"><div className="text-green-300 mb-1">🔧 Tháo Dỡ Tướng</div><div>UR: 30 | SSR: 20 | SR: 10 | R: 5 | C: 2</div></div>
               </div>
             </div>
           </div>
         )}
       </div>
    </div>
  );
};

const ShopItem = ({ title, price, qty, setQty, onBuy, img, icon, color, desc, itemId, player, currency }: any) => {
  const [imgError, setImgError] = useState(false);
  const colorMap: any = {
    blue: { border: 'border-blue-500/40', bg: 'from-stone-900 to-blue-950/30', text: 'text-blue-300', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]' },
    purple: { border: 'border-purple-500/40', bg: 'from-stone-900 to-purple-950/40', text: 'text-purple-300', glow: 'shadow-[0_0_40px_rgba(168,85,247,0.25)]' },
    amber: { border: 'border-amber-500/40', bg: 'from-stone-900 to-amber-950/40', text: 'text-amber-300', glow: 'shadow-[0_0_40px_rgba(245,158,11,0.25)]' },
    green: { border: 'border-green-500/40', bg: 'from-stone-900 to-green-950/30', text: 'text-green-300', glow: 'shadow-[0_0_30px_rgba(34,197,94,0.2)]' },
    emerald: { border: 'border-emerald-500/50', bg: 'from-stone-900 to-emerald-950/40', text: 'text-emerald-300', glow: 'shadow-[0_0_40px_rgba(16,185,129,0.3)]' },
    red: { border: 'border-red-500/40', bg: 'from-stone-900 to-red-950/40', text: 'text-red-300', glow: 'shadow-[0_0_30px_rgba(239,68,68,0.25)]' },
    sky: { border: 'border-sky-500/40', bg: 'from-stone-900 to-sky-950/40', text: 'text-sky-300', glow: 'shadow-[0_0_30px_rgba(56,189,248,0.25)]' },
    rose: { border: 'border-rose-500/50', bg: 'from-stone-900 to-rose-950/50', text: 'text-rose-300 font-bold', glow: 'shadow-[0_0_40px_rgba(244,63,94,0.35)]' }
  };
  const isJade = currency === 'jade';
  const theme = colorMap[color] || colorMap.amber;
  const customImg = player?.customItemImages && player.customItemImages[itemId];
  const displaySrc = customImg || img;

  const currentBalance = isJade ? (player?.jade || 0) : (player?.gold || 0);
  const maxAffordable = Math.max(1, Math.floor(currentBalance / price));
  const currentQty = qty === undefined ? 1 : qty;
  const totalCost = price * Math.max(1, currentQty);

  const handleManualInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim();
    if (raw === '') {
      setQty(0);
      return;
    }
    const parsed = parseInt(raw, 10);
    if (!isNaN(parsed)) {
      setQty(Math.max(0, Math.min(99999, parsed)));
    }
  };

  const handleBlur = () => {
    if (!currentQty || currentQty < 1) {
      setQty(1);
    }
  };

  return (
    <div className={`bg-gradient-to-b ${theme.bg} p-5 md:p-6 rounded-3xl border-2 ${theme.border} flex flex-col items-center gap-3.5 ${theme.glow} transition-all hover:scale-[1.03] hover:-translate-y-1 duration-300 relative font-sans`}>
      {desc && (
        <span className="absolute top-3 right-3 text-[10px] bg-black/75 text-stone-300 px-2 py-0.5 rounded-md border border-white/10 font-sans tracking-tight">
          {desc}
        </span>
      )}
      <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl flex items-center justify-center bg-black/50 mt-2">
        {displaySrc && !imgError ? (
          <img 
            src={displaySrc} 
            alt={title} 
            onError={() => setImgError(true)} 
            className="w-full h-full object-cover scale-110" 
          />
        ) : (
          <span className="text-5xl md:text-6xl drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] animate-pulse">{icon || '🏯'}</span>
        )}
      </div>
      <h3 className={`font-black uppercase text-center text-sm md:text-base tracking-wide ${theme.text} min-h-[2.5rem] flex items-center leading-tight font-sans`}>{title}</h3>
      
      <div className={`flex items-center gap-1.5 bg-stone-950/70 px-4 py-1.5 rounded-xl border border-white/5`}>
        {isJade ? (
          <><span className="text-green-400 text-base">💚</span><span className="text-green-400 font-black text-sm md:text-base">{(price || 0).toLocaleString()}</span></>
        ) : (
          <><span className="text-yellow-500 text-base">🪙</span><span className="text-yellow-400 font-black text-sm md:text-base">{(price || 0).toLocaleString()}</span></>
        )}
      </div>
      
      {/* Bộ điều khiển số lượng: Nhập tự do + Nút Tăng/Giảm + Phím tắt +10 và MAX */}
      <div className="flex items-center gap-1.5 w-full">
        <div className="flex items-center bg-stone-950/90 px-2 py-1.5 rounded-xl border border-amber-900/40 flex-1 justify-between shadow-inner focus-within:border-amber-500/80 transition-colors">
          <button 
            type="button"
            onClick={() => setQty(Math.max(1, (currentQty || 1) - 1))} 
            className="text-amber-500 hover:text-white hover:bg-amber-600/20 active:scale-90 transition-all p-1 rounded-lg cursor-pointer"
            title="Giảm 1"
          >
            <Minus size={15}/>
          </button>
          <input 
            type="number" 
            min="1"
            max="99999"
            className="bg-transparent text-center w-14 font-black outline-none text-white text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:text-amber-300 transition-colors" 
            value={currentQty === 0 ? '' : currentQty}
            onChange={handleManualInput}
            onBlur={handleBlur}
            onFocus={(e) => e.target.select()}
            placeholder="1"
            title="Nhập số lượng tự do"
          />
          <button 
            type="button"
            onClick={() => setQty((currentQty || 0) + 1)} 
            className="text-amber-500 hover:text-white hover:bg-amber-600/20 active:scale-90 transition-all p-1 rounded-lg cursor-pointer"
            title="Tăng 1"
          >
            <Plus size={15}/>
          </button>
        </div>
        
        <button 
          type="button"
          onClick={() => setQty((currentQty || 0) + 10)} 
          className="bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-amber-300 px-2.5 py-2 rounded-xl border border-stone-700/50 text-[11px] font-black transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          title="Thêm nhanh 10"
        >
          +10
        </button>
        
        <button 
          type="button"
          onClick={() => setQty(Math.max(1, maxAffordable))} 
          className="bg-amber-950/60 hover:bg-amber-900/80 text-amber-300 hover:text-yellow-200 px-2.5 py-2 rounded-xl border border-amber-600/40 text-[11px] font-black transition-all active:scale-95 cursor-pointer whitespace-nowrap"
          title={`Mua tối đa (${maxAffordable.toLocaleString()})`}
        >
          MAX
        </button>
      </div>
      
      <button 
        onClick={() => {
          if (!currentQty || currentQty < 1) setQty(1);
          onBuy();
        }} 
        className={`w-full py-3 rounded-xl font-black uppercase text-xs transition-all shadow-[0_4px_15px_rgba(0,0,0,0.5)] active:scale-95 tracking-wider flex items-center justify-center gap-1.5 cursor-pointer ${
          isJade
            ? 'bg-gradient-to-r from-green-800 to-green-900 hover:from-green-700 hover:to-green-800 text-green-100 border border-green-700/50'
            : 'bg-gradient-to-r from-amber-800 to-amber-900 hover:from-amber-700 hover:to-amber-800 text-amber-100 border border-amber-700/50'
        }`}
      >
        <span>Mua {Math.max(1, currentQty).toLocaleString()}</span>
        <span className="opacity-60">•</span>
        <span>{totalCost.toLocaleString()} {isJade ? '💚' : '🪙'}</span>
      </button>
    </div>
  );
};

const MOCK_LEGIONS = [
  "Đại Việt Hùng Binh", "Giao Chỉ Thiết Kỵ", "Vạn Xuân Bất Diệt", "Lĩnh Nam Uy Vũ", "Lam Sơn Tụ Nghĩa", 
  "Tây Sơn Thần Tốc", "Mê Linh Khởi Nghĩa", "Hoa Lư Vạn Thắng", "Bình Ngô Đại Quân", "Sát Thát Dũng Sĩ"
].map((name, index) => {
  const pLineup = [];
  let pPower = 0;
  for(let j=0; j<6; j++) {
     const baseHero = INITIAL_HEROES[(index + j) % INITIAL_HEROES.length];
     const star = (j === 0) ? Math.min(30, 6 + (index * 2)) : Math.floor(Math.random() * 5) + 1;
     const botHero = calculateHeroStatsWithStar(baseHero, star);
     pLineup.push({ ...botHero });
     pPower += botHero.overall;
  }
  return { legionName: name, power: pPower, lineup: pLineup, isPlayer: false, leaderStar: pLineup[0].star };
});

const QuanDoanView = ({ player, setPlayer, quickLineup, setView, onCombat }: any) => {
  const [activeTab, setActiveTab] = useState<'heroes' | 'items'>('heroes');
  const [selectedHeroId, setSelectedHeroId] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showDecomposeModal, setShowDecomposeModal] = useState(false);
  const [showEquipModal, setShowEquipModal] = useState(false);
  const [showQuickDecomposeModal, setShowQuickDecomposeModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  useEffect(() => {
     if (player && player.inventory) {
        const synced = syncHeroInventoryStats(player.inventory);
        let changed = false;
        for (let i = 0; i < synced.length; i++) {
           if (synced[i].overall !== player.inventory[i]?.overall || synced[i].skillDesc !== player.inventory[i]?.skillDesc) {
              changed = true;
              break;
           }
        }
        if (changed) {
           setPlayer((p: any) => ({ ...p, inventory: synced }));
        }
     }
  }, []);

  const selectedHero = player.inventory.filter((h: Hero) => h.isPermanent === true).find((h: Hero) => h.id === selectedHeroId);
  const currentLineupHeroes = player.permLineup.map((id: string) => player.inventory.find((h: Hero) => h.id === id)).filter(Boolean).map((h: Hero) => calculateHeroStatsWithStar(h, h.star));
  const combatPower = currentLineupHeroes.reduce((acc: number, h: Hero) => acc + h.overall, 0);

  const moveHero = (heroId: string, slotIdx: number) => {
    const newLineup = [...player.permLineup];
    const oldIdx = newLineup.indexOf(heroId);
    if (oldIdx !== -1) newLineup[oldIdx] = null;
    newLineup[slotIdx] = heroId;
    setPlayer((p: any) => ({ ...p, permLineup: newLineup }));
    setSelectedSlot(null);
    setSelectedHeroId(null);
  };

  const removeHeroFromLineup = (slotIdx: number) => {
    const newLineup = [...player.permLineup];
    newLineup[slotIdx] = null;
    setPlayer((p: any) => ({ ...p, permLineup: newLineup }));
  };

  const decompose = (rewardType: 'fragments' | 'jade' | 'gold') => {
    if (!selectedHero) return;
    if (player.permLineup.includes(selectedHero.id)) return alert("Anh hùng đang tham trận, không thể giải ngũ!");
    if (selectedHero.isPermanent !== true) return alert("Đây là Tướng Doanh Trại tạm thời! Hãy vào Doanh Trại để giải ngũ.");

    const heroRarity = selectedHero.rarity;
    const heroName = selectedHero.name;
    const heroId = selectedHero.id;

    const jadeTable: Record<string, number> = { UR: 30, SSR: 20, SR: 10, R: 5, C: 2 };
    const goldTable: Record<string, number> = { UR: 15000, SSR: 10000, SR: 7500, R: 3000, C: 1000 };

    const jadeGain = rewardType === 'jade'  ? (jadeTable[heroRarity] || 0) : 0;
    const goldGain = rewardType === 'gold'  ? (goldTable[heroRarity] || 0) : 0;

    setPlayer((p: any) => {
      const newInv = p.inventory.filter((h: Hero) => h.id !== heroId);
      const heroFragments = { ...(p.heroFragments || {}) };

      if (rewardType === 'fragments') {
          heroFragments[heroName] = (heroFragments[heroName] || 0) + 50;
      }

      return {
        ...p,
        inventory: newInv,
        jade: (p.jade || 0) + jadeGain,
        gold: (p.gold || 0) + goldGain,
        heroFragments,
      };
    });

    const rewardMsg = rewardType === 'fragments'
      ? `+50 Mảnh Tướng ${heroName}`
      : rewardType === 'jade'
      ? `+${jadeGain} Ngọc Bích 💎`
      : `+${goldGain} Vàng 🪙`;
    setTimeout(() => alert(`Giải ngũ thành công!\n${rewardMsg}`), 100);

    setSelectedHeroId(null);
    setShowDecomposeModal(false);
  };

  const upgradeStar = () => {
    if (!selectedHero) return;
    if (selectedHero.star >= 30) return alert("Hào kiệt đã đạt tới giới hạn tối thượng 30 Sao!");
    if (selectedHero.rarity === Rarity.R || selectedHero.rarity === Rarity.C) return alert("Binh sĩ hạng R và C không thể nâng sao.");

    const req = getStarUpgradeReq(selectedHero.star);
    // Tổng mảnh = mảnh trên người + mảnh rời trong kho
    const _heroName = selectedHero.name;
    const _storedFrags = (player.heroFragments || {})[_heroName] || 0;
    const _totalFragments = (selectedHero.fragments || 0) + _storedFrags;

    if (_totalFragments < req.fragReq) return alert(`Thiếu mảnh tướng! (Cần ${req.fragReq}, hiện có ${_totalFragments})`);
    if (player.jade < req.jadeReq) return alert(`Thiếu Ngọc Bích! (Cần ${req.jadeReq}, hiện có ${player.jade})`);

    if (req.requiredPill) {
       const hasCount = (player.pills && player.pills[req.requiredPill.id]) || 0;
       if (hasCount < req.pillQty!) return alert(`Đột phá mốc ${req.nextStar} Sao cần ${req.pillQty} ${req.requiredPill.name}! (Hiện có ${hasCount}). Hãy dùng Lệnh Bài Chúa Công để lấy đan!`);
    }

    setPlayer((p: any) => {
      const newPills = { ...(p.pills || {}) };
      if (req.requiredPill) {
         newPills[req.requiredPill.id] = Math.max(0, (newPills[req.requiredPill.id] || req.pillQty) - req.pillQty!);
      }
      const _heroFragments = { ...(p.heroFragments || {}) };
      const _curStored = _heroFragments[_heroName] || 0;
      let _remaining = req.fragReq;
      const _fromStored = Math.min(_curStored, _remaining);
      _remaining -= _fromStored;
      _heroFragments[_heroName] = _curStored - _fromStored;
      return {
        ...p,
        jade: p.jade - req.jadeReq,
        pills: newPills,
        heroFragments: _heroFragments,
        inventory: p.inventory.map((h: Hero) => {
          if (h.id === selectedHero.id) {
             const updated = calculateHeroStatsWithStar(h, h.star + 1);
             return { ...updated, fragments: (h.fragments || 0) - _remaining };
          }
          return h;
        })
      };
    });
    setShowUpgradeModal(false);
  };

  return (
    <div className="min-h-screen viet-bg flex flex-col h-screen overflow-hidden">
       <div className="p-4 flex justify-between items-center bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-amber-900/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-30">
          <button onClick={() => setView('chapter-hub')} className="text-amber-500 font-bold flex items-center gap-2 hover:text-amber-400 transition-colors"><ChevronLeft/> Trở về</button>
          <div className="flex flex-col items-center">
             <h2 className="text-xl font-cinzel text-amber-400 font-black uppercase tracking-widest drop-shadow-[0_0_8px_rgba(201,148,26,0.3)]">⚔ Quân Đoàn ⚔</h2>
             <div className="text-[10px] md:text-xs font-bold text-amber-500/80 uppercase tracking-widest mt-0.5 bg-black/40 px-3 py-0.5 rounded-full border border-amber-900/30">Lực chiến Quân Đoàn: <span className="text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">{(combatPower || 0).toLocaleString()}</span></div>
          </div>
          <div className="flex gap-3">
             <button onClick={quickLineup} className="bg-amber-900/80 text-amber-200 px-5 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 hover:bg-amber-800 shadow-lg transition-all border border-amber-800/40"><Zap size={16}/> Bày trận nhanh</button>
             <button onClick={onCombat} className="bg-gradient-to-r from-red-800 to-red-700 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 hover:from-red-700 hover:to-red-600 shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse transition-all border border-red-600/30"><SwordIcon size={18}/> XUẤT QUÂN</button>
          </div>
       </div>

       <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          <div className="w-full h-[55%] md:h-auto md:w-1/3 bg-stone-950/80 border-t-2 md:border-t-0 border-amber-900/50 p-4 md:p-6 overflow-y-auto custom-scrollbar shadow-2xl z-10 flex flex-col order-2 md:order-1">
             
             {/* Tabs */}
             <div className="flex gap-2 mb-6 border-b border-amber-900/30 pb-4">
                <button 
                   onClick={() => setActiveTab('heroes')} 
                   className={`flex-1 py-3 rounded-xl font-black uppercase text-sm transition-all border ${activeTab === 'heroes' ? 'bg-amber-900/80 text-amber-200 border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'bg-stone-900 text-stone-500 border-stone-800 hover:bg-stone-800'}`}
                >
                   <Tent size={18} className="inline-block mb-1 mr-1" /> Anh Hào ({player.inventory.filter(h => h.isPermanent === true).length})
                </button>
                <button 
                   onClick={() => setActiveTab('items')} 
                   className={`flex-1 py-3 rounded-xl font-black uppercase text-sm transition-all border ${activeTab === 'items' ? 'bg-amber-900/80 text-amber-200 border-amber-500 shadow-[0_0_15px_rgba(251,191,36,0.2)]' : 'bg-stone-900 text-stone-500 border-stone-800 hover:bg-stone-800'}`}
                >
                   <Package size={18} className="inline-block mb-1 mr-1" /> Vật Phẩm
                </button>
             </div>
             
             {activeTab === 'heroes' && (
               <>
                <button onClick={() => setShowQuickDecomposeModal(true)} className="w-full mb-4 bg-red-900/40 text-red-400 border border-red-900/50 hover:bg-red-900/60 transition-all p-3 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2">
                   <Recycle size={16}/> Tách Tướng Nhanh
                </button>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-10">
                  {[...player.inventory.filter((h: Hero) => h.isPermanent === true)].sort((a: Hero, b: Hero) => {
                    return (b.overall || 0) - (a.overall || 0);
                  }).map((h: Hero) => {
                    const isInLineup = player.permLineup.includes(h.id);
                    return (
                      <div key={h.id} className="relative group" draggable onDragStart={(e) => { e.dataTransfer.setData('heroId', h.id); }}>
                        <HeroGalleryCard hero={h} onClick={() => { 
                          if (selectedSlot !== null) {
                              moveHero(h.id, selectedSlot);
                          } else {
                              setSelectedHeroId(h.id);
                          }
                        }} />
                        {isInLineup && <div className="absolute top-1 right-1 bg-amber-900 p-0.5 rounded-full shadow-lg z-10"><CheckCircle size={14} className="text-amber-500"/></div>}
                        {isInLineup && selectedSlot !== null && <div className="absolute inset-0 bg-black/60 rounded-2xl pointer-events-none z-10" />}
                      </div>
                    );
                  })}
               </div>
               </>
             )}

             {activeTab === 'items' && (
               <div className="space-y-4">
                  {player.playerName === 'admin' && (
                     <div className="bg-red-900/40 p-4 rounded-2xl border-2 border-red-500/50 flex items-center gap-4 cursor-pointer hover:bg-red-900/60 transition-colors" onClick={() => setShowAdminPanel(true)}>
                        <div className="w-12 h-12 bg-red-900/80 rounded-xl flex items-center justify-center border border-yellow-500/80 overflow-hidden relative shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                           <Crown size={28} className="text-yellow-300 drop-shadow-md" />
                        </div>
                        <div className="flex-1">
                           <div className="text-yellow-400 font-black text-sm uppercase tracking-widest drop-shadow-md">Lệnh Bài Chúa Công</div>
                           <div className="text-red-200 text-xs mt-1">Đặc quyền tối cao - Lấy mọi vật phẩm trong thiên hạ</div>
                        </div>
                        <div className="text-sm font-black text-yellow-500 px-3 py-1 bg-black/40 rounded-full border border-yellow-500/30">Vĩnh viễn</div>
                     </div>
                  )}

                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-4">
                     <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center border border-blue-500/30 overflow-hidden relative">
                        <img src="./items/normal_ticket.png" className="w-full h-full object-cover scale-110 drop-shadow-md" alt="Lệnh Bài Thường"/>
                     </div>
                     <div className="flex-1">
                        <div className="text-white font-bold text-sm uppercase">Lệnh Bài Thường</div>
                        <div className="text-stone-400 text-xs">Dùng để chiêu mộ Hào Kiệt</div>
                     </div>
                     <div className="text-2xl font-black text-blue-400">{player.normalTickets}</div>
                  </div>

                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-4">
                     <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center border border-purple-500/30 overflow-hidden relative">
                        <img src="./items/premium_ticket.png" className="w-full h-full object-cover scale-110 drop-shadow-md" alt="Lệnh Bài Danh Tướng"/>
                     </div>
                     <div className="flex-1">
                        <div className="text-white font-bold text-sm uppercase">Lệnh Bài Danh Tướng</div>
                        <div className="text-stone-400 text-xs">Dùng để chiêu mộ Danh Tướng SSR/UR</div>
                     </div>
                     <div className="text-2xl font-black text-purple-400">{player.premiumTickets}</div>
                  </div>

                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-4">
                     <div className="w-12 h-12 bg-amber-900/30 rounded-xl flex items-center justify-center border border-amber-500/30 overflow-hidden relative">
                        <img src="./items/artifact_ticket.png" className="w-full h-full object-cover scale-110 drop-shadow-md" alt="Lệnh Bài Tầm Bảo Thần Khí" onError={(e) => { (e.target as HTMLImageElement).src = './items/premium_ticket.png'; }} />
                     </div>
                     <div className="flex-1">
                        <div className="text-white font-bold text-sm uppercase">Tầm Bảo Thần Khí</div>
                        <div className="text-stone-400 text-xs">Dùng để tìm kiếm Thần Khí Bản Mệnh</div>
                     </div>
                     <div className="text-2xl font-black text-amber-500">{player.artifactTickets || 0}</div>
                  </div>

                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-4">
                     <div className="w-12 h-12 bg-green-900/30 rounded-xl flex items-center justify-center border border-green-500/30 overflow-hidden relative">
                        <img src="./items/jade.png" className="w-full h-full object-cover scale-110 drop-shadow-md" alt="Ngọc Bích"/>
                     </div>
                     <div className="flex-1">
                        <div className="text-white font-bold text-sm uppercase">Ngọc Bích</div>
                        <div className="text-stone-400 text-xs">Dùng để Đột Phá cảnh giới (Nâng sao)</div>
                     </div>
                     <div className="text-2xl font-black text-green-400">{player.jade}</div>
                  </div>

                  <div className="bg-stone-900/80 p-4 rounded-2xl border border-stone-700 flex items-center gap-4">
                     <div className="w-12 h-12 bg-yellow-900/30 rounded-xl flex items-center justify-center border border-yellow-500/30 overflow-hidden relative">
                        <img src="./items/gold.png" className="w-full h-full object-cover scale-110 drop-shadow-md" alt="Ngân Lượng"/>
                     </div>
                     <div className="flex-1">
                        <div className="text-white font-bold text-sm uppercase">Ngân Lượng</div>
                        <div className="text-stone-400 text-xs">Vàng dùng để mua sắm trong Kỳ Trân Các</div>
                     </div>
                     <div className="text-xl font-black text-yellow-500">{(player.gold || 0).toLocaleString()}</div>
                  </div>
               </div>
              )}
           </div>

           <div className="w-full h-[45%] md:h-auto md:flex-1 p-4 md:p-10 flex flex-col items-center justify-center relative bg-[url('/hub-bg.png')] bg-cover bg-center order-1 md:order-2 overflow-hidden">
             <div className="absolute inset-0 bg-stone-900/70"></div>
             <div className="absolute top-2 md:top-10 text-amber-900/20 font-cinzel font-black uppercase tracking-[0.2em] md:tracking-[0.5em] text-xl md:text-4xl pointer-events-none select-none z-0">TRẬN ĐỒ QUÂN TA</div>
             <div className="grid grid-cols-3 gap-4 md:gap-8 p-6 md:p-12 bg-black/40 rounded-[2rem] md:rounded-[4rem] border-2 md:border-4 border-dashed border-amber-900/40 shadow-inner relative z-10 transform scale-90 md:scale-100">
                {[0, 1, 2, 3, 4, 5].map(idx => {
                   const hId = player.permLineup[idx];
                   const hero = player.inventory.filter(h => h.isPermanent === true).find(h => h.id === hId);
                   const isSelected = selectedSlot === idx;
                   return (
                     <div key={idx} className="relative group"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                              e.preventDefault();
                              const heroId = e.dataTransfer.getData('heroId');
                              if (heroId) moveHero(heroId, idx);
                          }}>
                        <button onClick={() => setSelectedSlot(isSelected ? null : idx)} className={`w-36 h-52 rounded-2xl border-4 transition-all flex flex-col items-center justify-center overflow-hidden shadow-2xl relative ${isSelected ? 'border-amber-500 bg-amber-500/20 scale-110 z-20' : 'border-amber-900/30 bg-stone-900 hover:bg-stone-800 hover:border-amber-900/50'}`}>
                           {hero ? (
                             <>
                                <div className={`w-full h-full relative flex flex-col items-center justify-between p-1 ${getStarBorderClass(hero.star)}`}>
                                   <div className="relative overflow-hidden rounded-xl w-full h-full z-10 bg-[#1c1917]">
                                      <img src={hero.image} className="w-full h-full object-cover contrast-110" onError={(e) => { (e.target as HTMLImageElement).src = hero.faction === 'enemy' ? DEFAULT_ENEMY_IMG : DEFAULT_ALLY_IMG; }} />

                                       {/* Sao & Cảnh giới */}
                                       <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 bg-black/80 px-2 py-0.5 rounded-full border border-white/10 shadow-md">
                                          <HeroStars starCount={hero.star} size={8} />
                                       </div>

                                       {/* Tên & Lực chiến */}
                                       <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent py-1.5 px-1 text-center z-20">
                                          <div className="text-[10px] text-amber-300 font-cinzel font-black uppercase truncate">{hero.name}</div>
                                          <div className="text-[8px] text-amber-500 font-bold">CL: {hero.overall ? hero.overall.toLocaleString() : ''}</div>
                                       </div>

                                       {/* Nút Xóa khỏi trận */}
                                       <button onClick={(e) => { e.stopPropagation(); removeHeroFromLineup(idx); }} className="absolute -top-1 -right-1 bg-red-900 text-white p-1 rounded-full shadow-lg hover:bg-red-700 transition-colors z-30 opacity-0 group-hover:opacity-100">
                                          <XCircle size={16}/>
                                       </button>
                                    </div>
                                 </div>
                             </>
                           ) : (
                             <div className="text-center space-y-2 opacity-30 group-hover:opacity-100 transition-opacity">
                                <Plus size={32} className="text-amber-900 mx-auto" />
                                <div className="text-[8px] text-amber-900 font-black uppercase">Vị trí {idx+1}</div>
                             </div>
                           )}
                        </button>
                        {isSelected && !hero && <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] text-amber-500 font-black whitespace-nowrap animate-bounce">CHỌN TƯỚNG BÊN TRÁI</div>}
                     </div>
                   );
                })}
             </div>
          </div>
       </div>

       {showUpgradeModal && selectedHero && (() => {
          const req = getStarUpgradeReq(selectedHero.star);
          const hasPills = req.requiredPill ? ((player.pills && player.pills[req.requiredPill.id]) || 0) : 0;
          const storedFrags = (player.heroFragments || {})[selectedHero.name] || 0;
          let otherCopiesFrags = 0;
          (player.inventory || []).forEach((h: Hero) => {
             if (h.name === selectedHero.name && h.id !== selectedHero.id) {
                 otherCopiesFrags += (h.fragments || 0);
             }
          });
          const totalFrags = (selectedHero.fragments || 0) + storedFrags + otherCopiesFrags;
          return (
           <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
              <div className="scroll-bg max-w-lg w-full p-10 rounded-[3rem] shadow-2xl border-amber-900 text-center">
                 <h3 className="text-2xl font-cinzel font-black uppercase mb-6">Đột Phá Cảnh Giới</h3>
                 <div className="flex justify-center gap-10 items-center mb-10">
                    <div className="text-center">
                       <HeroStars starCount={selectedHero.star} size={14} className="justify-center mb-2" />
                       <div className="text-xs font-bold uppercase text-stone-600">Hiện tại</div>
                    </div>
                    <ArrowRight size={32} className="text-amber-900" />
                    <div className="text-center">
                       <HeroStars starCount={selectedHero.star + 1} size={14} className="justify-center mb-2 animate-pulse" />
                       <div className="text-xs font-bold uppercase text-amber-900">Sao mới</div>
                    </div>
                 </div>
                 <div className="bg-white/40 p-6 rounded-2xl mb-8 border border-amber-900/10 space-y-3 text-left">
                    <div className="flex justify-between items-center font-bold">
                       <span className="text-xs uppercase">Mảnh tướng {selectedHero.name}:</span>
                        <span className={totalFrags >= req.fragReq ? 'text-green-700 font-black' : 'text-red-700 font-black'}>
                          {totalFrags} / {req.fragReq}
                          {storedFrags > 0 && <span className="text-[10px] text-amber-600 ml-1">(+{storedFrags} kho rời)</span>}
                        </span>
                    </div>
                    <div className="flex justify-between items-center font-bold">
                       <span className="text-xs uppercase">Ngọc bích cần thiết:</span>
                       <span className={player.jade >= req.jadeReq ? 'text-green-700 font-black' : 'text-red-700 font-black'}>
                          {player.jade} / {req.jadeReq}
                       </span>
                    </div>
                    {req.requiredPill && (
                       <div className="flex justify-between items-center font-bold pt-2 border-t border-amber-900/10">
                          <span className="text-xs uppercase text-red-900 flex items-center gap-1">
                             <span>{req.requiredPill.icon}</span> {req.requiredPill.name}:
                          </span>
                          <span className={hasPills >= (req.pillQty || 1) ? 'text-green-700 font-black' : 'text-red-700 font-black'}>
                             {hasPills} / {req.pillQty}
                          </span>
                       </div>
                    )}
                    <div className="pt-3 border-t border-amber-900/10 text-xs italic text-amber-900/70 text-center">Tăng điểm tiềm năng, lực chiến và mở khóa cảnh giới mới.</div>
                 </div>
                 <div className="flex gap-4">
                    <button onClick={() => setShowUpgradeModal(false)} className="flex-1 bg-stone-800 hover:bg-stone-700 py-3 rounded-xl font-bold uppercase transition-colors text-white">Hủy</button>
                    <button onClick={upgradeStar} className="flex-1 py-4 font-black uppercase text-xs bg-amber-950 text-white rounded-xl shadow-lg transition-all active:scale-95">Xác nhận nâng sao</button>
                 </div>
              </div>
           </div>
          );
       })()}

       {showDecomposeModal && selectedHero && (
          <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
             <div className="scroll-bg max-w-lg w-full p-10 rounded-[3rem] shadow-2xl border-red-900 text-center">
                <h3 className="text-2xl font-cinzel font-black uppercase mb-6 text-red-900">Giải Ngũ Hào Kiệt</h3>
                <p className="text-sm italic mb-8 text-stone-700 font-bold">Lệnh bài giải ngũ sẽ thu hồi anh hùng, Chúa công muốn nhận bồi hoàn gì?</p>
                <div className="grid grid-cols-1 gap-4 mb-10">
                   <button onClick={() => decompose('fragments')} className="bg-white/60 p-5 rounded-2xl border-2 border-amber-900/20 hover:border-amber-900 transition-all flex justify-between items-center font-black">
                      <span className="text-xs uppercase">50 Mảnh tướng {selectedHero.name}</span>
                      <UserCheck className="text-amber-900" />
                   </button>
                   <button onClick={() => decompose('jade')} className="bg-white/60 p-5 rounded-2xl border-2 border-amber-900/20 hover:border-amber-900 transition-all flex justify-between items-center font-black">
                      <span className="text-xs uppercase">Ngọc Bích ({selectedHero.rarity === 'UR' ? 30 : selectedHero.rarity === 'SSR' ? 20 : selectedHero.rarity === 'SR' ? 10 : selectedHero.rarity === 'R' ? 5 : 2})</span>
                      <Star className="text-green-700" />
                   </button>
                   <button onClick={() => decompose('gold')} className="bg-white/60 p-5 rounded-2xl border-2 border-amber-900/20 hover:border-amber-900 transition-all flex justify-between items-center font-black">
                      <span className="text-xs uppercase">Vàng ({selectedHero.rarity === 'UR' ? 15000 : selectedHero.rarity === 'SSR' ? 10000 : selectedHero.rarity === 'SR' ? 7500 : selectedHero.rarity === 'R' ? 3000 : 1000})</span>
                      <Coins className="text-yellow-600" />
                   </button>
                </div>
                <button onClick={() => setShowDecomposeModal(false)} className="w-full py-4 text-xs font-black uppercase text-stone-500 underline">Quay lại</button>
             </div>
          </div>
       )}

       <QuickDisassembleModal isOpen={showQuickDecomposeModal} onClose={() => setShowQuickDecomposeModal(false)} inventory={player.inventory.filter((h: any) => h.isPermanent) || []} lineup={player.permLineup || []} setPlayer={setPlayer} isPermanentView={true} />

       {showEquipModal && selectedHero && (
          <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-6 backdrop-blur-sm animate-in fade-in duration-300">
             <div className="scroll-bg max-w-2xl w-full p-8 rounded-[3rem] shadow-2xl border-purple-900 text-center max-h-[80vh] flex flex-col">
                <h3 className="text-2xl font-cinzel font-black uppercase mb-2 text-purple-400">Trang Bị Thần Khí</h3>
                <p className="text-sm italic mb-6 text-stone-400 font-bold">Chọn thần khí phù hợp cho {selectedHero.name}</p>
                <div className="flex-1 overflow-y-auto min-h-[300px] grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 pr-2">
                   <button onClick={() => {
                      setPlayer((p: any) => ({
                          ...p, 
                          inventory: p.inventory.map((h: any) => h.id === selectedHero.id ? { ...h, artifactId: undefined } : h)
                      }));
                      setShowEquipModal(false);
                   }} className="bg-red-900/20 p-4 rounded-xl border border-red-500/30 hover:bg-red-900/40 hover:border-red-400 transition-all font-black text-[10px] uppercase text-red-300 flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-full border-2 border-red-500/50 flex items-center justify-center bg-red-950/50 text-xl">✖</div>
                      Tháo Trang Bị
                   </button>
                   {player.artifacts && player.artifacts.filter((artId: string) => {
                          const art = ARTIFACTS.find(a => a.id === artId);
                          return art && (art.exclusiveTo?.includes(selectedHero.id) || art.exclusiveTo?.some(id => selectedHero.id.startsWith(id + '_')));
                       }).length > 0 ? (
                       player.artifacts.filter((artId: string) => {
                          const art = ARTIFACTS.find(a => a.id === artId);
                          return art && (art.exclusiveTo?.includes(selectedHero.id) || art.exclusiveTo?.some(id => selectedHero.id.startsWith(id + '_')));
                       }).map((artId: string, i: number) => {
                          const art = ARTIFACTS.find(a => a.id === artId);
                          if (!art) return null;
                          const isEquipped = selectedHero.artifactId === art.id;
                          return (
                             <button key={i} onClick={() => {
                                setPlayer((p: any) => ({
                                    ...p, 
                                    inventory: p.inventory.map((h: any) => h.id === selectedHero.id ? { ...h, artifactId: art.id } : h)
                                }));
                                setShowEquipModal(false);
                             }} className={`bg-purple-900/20 p-3 rounded-xl border ${isEquipped ? 'border-purple-400 bg-purple-900/40 shadow-[0_0_15px_rgba(168,85,247,0.4)]' : 'border-purple-500/30'} hover:border-purple-400 transition-all flex flex-col items-center gap-2 relative`}>
                                <img src={art.image} className="w-12 h-12 rounded border border-purple-500/50 object-cover" />
                                <div className="font-bold text-purple-200 text-[10px] uppercase truncate w-full">{art.name}</div>
                                {isEquipped && <div className="absolute top-1 right-1 bg-purple-500 text-white text-[8px] px-1 rounded uppercase font-bold">Đang dùng</div>}
                             </button>
                          );
                       })
                   ) : (
                       <div className="col-span-2 text-stone-500 text-xs italic mt-10">Chúa công chưa có Thần Khí bản mệnh nào phù hợp cho hào kiệt này. Hãy vào Chiêu Hiền Đài để tìm kiếm!</div>
                   )}
                </div>
                <button onClick={() => setShowEquipModal(false)} className="w-full py-4 text-xs font-black uppercase text-stone-500 underline mt-auto">Đóng</button>
             </div>
          </div>
       )}

       {selectedHeroId && !selectedSlot && selectedHero && !showUpgradeModal && !showDecomposeModal && !showEquipModal && (
          <HeroDetailModal 
            hero={selectedHero} 
            onClose={() => setSelectedHeroId(null)}
            actions={
               <div className="flex gap-2 mt-4 w-full">
                  <button onClick={() => setShowUpgradeModal(true)} className="flex-1 bg-gradient-to-r from-green-800 to-green-700 hover:from-green-700 hover:to-green-600 text-white py-3 rounded-xl text-[10px] font-black uppercase flex flex-col items-center justify-center gap-1 shadow-md transition-all border border-green-600/30"><ArrowUpCircle size={14}/> Nâng Sao</button>
                  <button onClick={() => setShowEquipModal(true)} className="flex-1 bg-gradient-to-r from-purple-900 to-purple-800 hover:from-purple-800 hover:to-purple-700 text-white py-3 rounded-xl text-[10px] font-black uppercase flex flex-col items-center justify-center gap-1 shadow-md transition-all border border-purple-500/30"><ScrollText size={14}/> Thần Khí</button>
                  <button onClick={() => setShowDecomposeModal(true)} className="flex-1 bg-gradient-to-r from-red-900 to-red-800 hover:from-red-800 hover:to-red-700 text-white py-3 rounded-xl text-[10px] font-black uppercase flex flex-col items-center justify-center gap-1 shadow-md transition-all border border-red-700/30"><Scissors size={14}/> Tách</button>
               </div>
            }
          />
       )}

       {showAdminPanel && <AdminPanel player={player} setPlayer={setPlayer} onClose={() => setShowAdminPanel(false)} />}
    </div>
  );
};

// Helper to determine skill effect based on text

const DanhVongDaiView = ({ player, setView }: any) => {
  const [viewLineupTarget, setViewLineupTarget] = useState<any>(null);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [activeTab, setActiveTab] = useState<'combat' | 'knowledge'>('combat');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!selectedHero) {
          setViewLineupTarget(null);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedHero]);

  // COMBAT LEADERBOARD
  const permHeroes = player.inventory.filter((h: Hero) => h.isPermanent === true).map((h: Hero) => calculateHeroStatsWithStar(h, h.star)).sort((a: Hero, b: Hero) => b.overall - a.overall);
  const top6 = permHeroes.slice(0, 6);
  const combatPower = top6.reduce((acc: number, h: Hero) => acc + h.overall, 0);

  const combatLeaderboard = [...MOCK_LEGIONS, {
       legionName: player.legionName || player.playerName || "Quân Đoàn Của Bạn", 
       power: combatPower, 
       lineup: top6, 
       isPlayer: true,
       leaderImg: top6.length > 0 ? top6[0].image : null,
       leaderStar: top6.length > 0 ? (top6[0].star || 0) : 0
  }].map((lb: any) => {
       const leader = lb.lineup && lb.lineup.length > 0 ? lb.lineup[0] : null;
       return { 
         ...lb, 
         leaderImg: lb.leaderImg || leader?.image || null,
         leaderStar: lb.leaderStar !== undefined ? lb.leaderStar : (leader?.star || 0)
       };
  }).sort((a, b) => b.power - a.power);

  const top8Combat = combatLeaderboard.slice(0, 8);
  const remainingCombat = combatLeaderboard.slice(8);

  // KNOWLEDGE LEADERBOARD (Khoa Cử)
  const knowledgeLeaderboard = useMemo(() => {
    return [...MOCK_LEGIONS, {
       legionName: player.playerName || player.legionName || "Bạn", 
       power: player.tuHaoSuVietScore || player.level * 100 || 500, // mock score if undefined
       lineup: top6,
       isPlayer: true,
       leaderImg: player.avatar || (top6.length > 0 ? top6[0].image : null),
       leaderStar: top6.length > 0 ? (top6[0].star || 0) : 0
    }].map((lb: any, idx) => {
       const score = lb.isPlayer ? lb.power : (lb.power % 500) + 300 + Math.floor(Math.random() * 200);
       const leader = lb.lineup && lb.lineup.length > 0 ? lb.lineup[0] : null;
       return { 
         ...lb, 
         score: score,
         leaderImg: lb.leaderImg || leader?.image || null,
         leaderStar: lb.leaderStar !== undefined ? lb.leaderStar : (leader?.star || 0)
       };
    }).sort((a, b) => b.score - a.score);
  }, [player, MOCK_LEGIONS, top6]);

  const top8Knowledge = knowledgeLeaderboard.slice(0, 8);
  const remainingKnowledge = knowledgeLeaderboard.slice(8);

  const top8 = activeTab === 'combat' ? top8Combat : top8Knowledge;
  const remaining = activeTab === 'combat' ? remainingCombat : remainingKnowledge;

  return (
    <div className="min-h-screen viet-bg flex flex-col h-screen overflow-hidden">
       <div className="p-4 flex justify-between items-center bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b border-amber-900/50 shadow-[0_4px_20px_rgba(0,0,0,0.5)] z-30 shrink-0">
          <button onClick={() => setView('chapter-hub')} className="text-amber-500 font-bold flex items-center gap-2 hover:text-amber-400 transition-colors"><ChevronLeft/> Trở về</button>
          <div className="flex flex-col items-center">
             <h2 className="text-xl font-cinzel text-amber-400 font-black uppercase tracking-widest drop-shadow-[0_0_8px_rgba(201,148,26,0.3)]">🏆 Danh Vọng Đài 🏆</h2>
             <div className="flex gap-4 mt-2">
                <button onClick={() => setActiveTab('combat')} className={`px-4 py-1 font-bold text-sm rounded-full transition-colors border ${activeTab === 'combat' ? 'bg-amber-600 text-white border-amber-400' : 'bg-stone-800 text-stone-400 border-stone-600 hover:text-amber-500'}`}>Lực Chiến</button>
                <button onClick={() => setActiveTab('knowledge')} className={`px-4 py-1 font-bold text-sm rounded-full transition-colors border ${activeTab === 'knowledge' ? 'bg-amber-600 text-white border-amber-400' : 'bg-stone-800 text-stone-400 border-stone-600 hover:text-amber-500'}`}>Khoa Cử</button>
             </div>
          </div>
          <div className="w-20"></div>
       </div>

       <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-4xl mx-auto flex justify-center items-end gap-4 md:gap-10 pt-10 pb-16 relative">
             {/* Hạng 2 */}
             {top8[1] && (
                <div onClick={() => activeTab === 'combat' && setViewLineupTarget(top8[1])} className={`flex flex-col items-center hover:scale-105 transition-transform z-20 pb-10 ${activeTab === 'combat' ? 'cursor-pointer' : ''}`}>
                   <div className="bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 px-4 py-1.5 rounded-t-lg font-black text-black shadow-md uppercase text-xs border-2 border-white text-center">
                      {activeTab === 'combat' ? '🥈 Quốc Sư [Hạng 2]' : '🥈 Bảng Nhãn'}
                   </div>
                   <div className="bg-black/80 px-3 py-1 text-[10px] text-gray-300 font-bold border-b border-x border-gray-400/50 rounded-b-md mb-2">{top8[1].legionName} - {activeTab === 'combat' ? top8[1].power.toLocaleString() : (top8[1].score + ' điểm')}</div>
                   <div className={`relative w-32 h-44 md:w-40 md:h-52 z-10 drop-shadow-[0_0_20px_rgba(156,163,175,0.5)] ${getStarBorderClass(top8[1].leaderStar)}`}>
                      <div className="relative overflow-hidden rounded-xl w-full h-full z-10 bg-[#1c1917]">
                         <img src={top8[1].leaderImg || DEFAULT_ALLY_IMG} onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_ALLY_IMG; }} className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] relative z-10" alt="Hạng 2" />
                      </div>
                      <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-36 md:w-48 h-12 md:h-16 bg-gradient-to-b from-gray-200 to-gray-500 rounded-[100%] shadow-[0_10px_30px_rgba(156,163,175,0.6)] border-2 border-white/50 z-0"></div>
                   </div>
                </div>
             )}

             {/* Hạng 1 */}
             {top8[0] && (
                <div onClick={() => activeTab === 'combat' && setViewLineupTarget(top8[0])} className={`flex flex-col items-center hover:scale-105 transition-transform z-30 pb-20 ${activeTab === 'combat' ? 'cursor-pointer' : ''}`}>
                   <div className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 px-6 py-2 rounded-t-xl font-black text-black shadow-lg uppercase text-sm border-2 border-yellow-200 text-center">
                      {activeTab === 'combat' ? '🥇 Cửu Ngũ Chí Tôn [Hạng 1]' : '🥇 Trạng Nguyên'}
                   </div>
                   <div className="bg-black/80 px-4 py-1 text-[10px] text-yellow-500 font-bold border-b border-x border-yellow-600/50 rounded-b-lg mb-2">{top8[0].legionName} - {activeTab === 'combat' ? top8[0].power.toLocaleString() : (top8[0].score + ' điểm')}</div>
                   <div className={`relative w-40 h-56 md:w-48 md:h-64 z-10 drop-shadow-[0_0_30px_rgba(234,179,8,0.5)] ${getStarBorderClass(top8[0].leaderStar)}`}>
                      <div className="relative overflow-hidden rounded-xl w-full h-full z-10 bg-[#1c1917]">
                         <img src={top8[0].leaderImg || DEFAULT_ALLY_IMG} onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_ALLY_IMG; }} className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] relative z-10" alt="Hạng 1" />
                      </div>
                      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-48 md:w-64 h-16 md:h-24 bg-gradient-to-b from-yellow-300 to-yellow-700 rounded-[100%] shadow-[0_20px_50px_rgba(202,138,4,0.6)] border-4 border-yellow-100/50 z-0"></div>
                   </div>
                </div>
             )}

             {/* Hạng 3 */}
             {top8[2] && (
                <div onClick={() => activeTab === 'combat' && setViewLineupTarget(top8[2])} className={`flex flex-col items-center hover:scale-105 transition-transform z-20 pb-10 ${activeTab === 'combat' ? 'cursor-pointer' : ''}`}>
                   <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 px-4 py-1.5 rounded-t-lg font-black text-white shadow-md uppercase text-xs border-2 border-amber-400 text-center">
                      {activeTab === 'combat' ? '🥉 Thừa Tướng [Hạng 3]' : '🥉 Thám Hoa'}
                   </div>
                   <div className="bg-black/80 px-3 py-1 text-[10px] text-amber-500 font-bold border-b border-x border-amber-700/50 rounded-b-md mb-2">{top8[2].legionName} - {activeTab === 'combat' ? top8[2].power.toLocaleString() : (top8[2].score + ' điểm')}</div>
                   <div className={`relative w-32 h-44 md:w-40 md:h-52 z-10 drop-shadow-[0_0_20px_rgba(217,119,6,0.5)] ${getStarBorderClass(top8[2].leaderStar)}`}>
                      <div className="relative overflow-hidden rounded-xl w-full h-full z-10 bg-[#1c1917]">
                         <img src={top8[2].leaderImg || DEFAULT_ALLY_IMG} onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_ALLY_IMG; }} className="w-full h-full object-contain drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] relative z-10" alt="Hạng 3" />
                      </div>
                      <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-36 md:w-44 h-12 md:h-14 bg-gradient-to-b from-amber-500 to-amber-800 rounded-[100%] shadow-[0_10px_30px_rgba(180,83,9,0.6)] border-2 border-amber-300/50 z-0"></div>
                   </div>
                </div>
             )}
          </div>

          {/* TOP 4-8 CARDS */}
          {top8.length > 3 && (
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
             {[
               { title: activeTab === 'combat' ? "Tả Tướng Quân" : "Tiến Sĩ", data: top8[3], rank: 4, color: "from-cyan-700 to-cyan-900", border: "border-cyan-500" },
               { title: activeTab === 'combat' ? "Hữu Tướng Quân" : "Cử Nhân", data: top8[4], rank: 5, color: "from-blue-700 to-blue-900", border: "border-blue-500" },
               { title: activeTab === 'combat' ? "Phó Tướng" : "Tú Tài", data: top8[5], rank: 6, color: "from-purple-700 to-purple-900", border: "border-purple-500" },
               { title: activeTab === 'combat' ? "Thống Lĩnh" : "Đồng Sinh", data: top8[6], rank: 7, color: "from-pink-700 to-pink-900", border: "border-pink-500" },
               { title: activeTab === 'combat' ? "Hiệu Úy" : "Môn Sinh", data: top8[7], rank: 8, color: "from-red-700 to-red-900", border: "border-red-500" },
             ].map((item, idx) => item.data && (
                <div key={idx} onClick={() => activeTab === 'combat' && setViewLineupTarget(item.data)} className={`bg-stone-900 rounded-2xl border-2 overflow-hidden shadow-2xl flex flex-col items-center relative group hover:-translate-y-2 transition-transform ${activeTab === 'combat' ? 'cursor-pointer' : ''} ${item.border} ${getStarBorderClass(item.data.leaderStar)}`}>
                   <div className={`absolute top-0 w-full bg-gradient-to-r ${item.color} py-1 text-center font-black text-white text-[10px] uppercase z-20 shadow-md`}>
                      {item.title} [Hạng {item.rank}]
                   </div>
                   <div className="w-full aspect-[3/4] relative mt-6 border-b-2 border-stone-800 bg-stone-950">
                      <img src={item.data.leaderImg || DEFAULT_ALLY_IMG} onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_ALLY_IMG; }} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                   </div>
                   <div className="absolute bottom-0 w-full p-2 text-center bg-black/60 backdrop-blur-sm z-30">
                      <div className={`font-black text-[10px] uppercase truncate px-1 ${item.data.isPlayer ? 'text-amber-400' : 'text-stone-200'}`}>{item.data.legionName}</div>
                      <div className="text-[10px] text-amber-500 font-bold">{activeTab === 'combat' ? 'CL: ' + item.data.power.toLocaleString() : 'Điểm: ' + item.data.score}</div>
                   </div>
                </div>
             ))}
          </div>
          )}

          {remaining.length > 0 && (
             <div className="max-w-5xl mx-auto mt-16 bg-stone-900/80 rounded-2xl border border-amber-700/50 overflow-hidden shadow-2xl mb-10">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-gradient-to-r from-amber-900/80 to-amber-950/80 text-amber-200 uppercase tracking-widest text-sm border-b border-amber-700/50">
                         <th className="p-4 text-center w-24">Hạng</th>
                         <th className="p-4">{activeTab === 'combat' ? 'Tên Quân Đoàn' : 'Người Chơi'}</th>
                         <th className="p-4 text-center">{activeTab === 'combat' ? 'Chiến Lực' : 'Điểm Khoa Cử'}</th>
                      </tr>
                   </thead>
                   <tbody>
                      {remaining.map((lb: any, idx: number) => (
                         <tr key={idx} onClick={() => activeTab === 'combat' && setViewLineupTarget(lb)} className={`${activeTab === 'combat' ? 'cursor-pointer' : ''} border-b border-amber-900/30 hover:bg-amber-900/20 transition-colors ${lb.isPlayer ? 'bg-amber-900/40' : ''}`}>
                            <td className="p-4 text-center font-bold text-stone-500">{idx + 9}</td>
                            <td className={`p-4 font-bold text-base ${lb.isPlayer ? 'text-amber-400' : 'text-stone-200'}`}>
                               {lb.legionName}
                               {lb.isPlayer && <span className="ml-2 text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded-full uppercase tracking-widest align-middle">Bạn</span>}
                            </td>
                            <td className="p-4 text-center font-black text-amber-500 tracking-wider">
                               {activeTab === 'combat' ? (lb.power || 0).toLocaleString() : lb.score}
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          )}
        </div>

       {viewLineupTarget && (
          <div className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4 md:p-6 backdrop-blur-sm animate-in fade-in duration-300" onClick={(e) => { if(e.target === e.currentTarget) setViewLineupTarget(null); }}>
             <div className="scroll-bg max-w-2xl w-full p-4 md:p-6 rounded-[2rem] shadow-2xl border-amber-900 relative max-h-screen flex flex-col">
                <button onClick={() => setViewLineupTarget(null)} className="absolute top-4 right-4 text-amber-500 hover:text-amber-300 z-50">
                   <XCircle size={28} />
                </button>
                <div className="text-center mb-4 shrink-0 mt-4 md:mt-0">
                   <h3 className="text-xl md:text-3xl font-cinzel font-black uppercase text-amber-400 drop-shadow-[0_0_10px_rgba(201,148,26,0.5)]">{viewLineupTarget.legionName}</h3>
                   <div className="text-amber-100 text-xs md:text-sm font-bold uppercase tracking-widest mt-1">Chiến Lực: <span className="text-amber-500 text-base md:text-lg">{viewLineupTarget.power.toLocaleString()}</span></div>
                </div>
                
                <div className="bg-stone-900/50 p-4 rounded-2xl border-2 border-dashed border-amber-900/30 overflow-y-auto custom-scrollbar">
                   <div className="grid grid-cols-3 gap-3 md:gap-4">
                      {[0, 1, 2, 3, 4, 5].map(idx => {
                         const hero = viewLineupTarget.lineup && viewLineupTarget.lineup[idx];
                         return (
                           <div key={idx} className="relative group">
                              <div className={`w-full aspect-[3/4] rounded-2xl transition-all flex flex-col items-center justify-center overflow-hidden shadow-xl relative ${hero ? getStarBorderClass(hero.star || 0) : 'border-2 border-stone-700 bg-stone-800'}`}>
                                 {hero ? (
                                   <div className="relative overflow-hidden rounded-xl w-full h-full z-10 bg-[#1c1917] cursor-pointer hover:scale-105 transition-transform p-0.5" onClick={() => setSelectedHero(hero)}>
                                      <img src={hero.image} className="w-full h-full object-cover opacity-90 contrast-110" onError={(e) => { (e.target as HTMLImageElement).src = hero.faction === 'enemy' ? DEFAULT_ENEMY_IMG : DEFAULT_ALLY_IMG; }} />
                                      <div className="absolute top-1 left-1 z-20 pointer-events-none">
                                         <HeroStars starCount={hero.star || 0} size={10} className="flex-col gap-1" />
                                      </div>
                                      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent py-2 text-[10px] text-amber-300 font-cinzel font-black uppercase text-center flex flex-col items-center pointer-events-none z-20">
                                         <span>{hero.name}</span>
                                         <span className="text-[8px] text-amber-500 font-bold">CL: {hero.overall ? hero.overall.toLocaleString() : ''}</span>
                                      </div>
                                   </div>
                                 ) : (
                                   <div className="text-center opacity-20">
                                      <div className="text-[10px] text-white font-black uppercase tracking-widest">Trống</div>
                                   </div>
                                 )}
                              </div>
                           </div>
                         );
                      })}
                   </div>
                </div>
             </div>
          </div>
       )}
       {selectedHero && (
         <HeroDetailModal hero={selectedHero} onClose={() => setSelectedHero(null)} />
       )}
    </div>
  );
};


const Ch9FactionSelectModal = ({ currentFaction, onSelect, onClose }: { currentFaction?: string, onSelect: (faction: string) => void, onClose: () => void }) => {
  const factions = [
    {
      id: 'mac',
      title: 'Bắc Triều (Nhà Mạc)',
      badge: 'Hoàng Long Bắc Triều',
      color: 'from-yellow-950 via-stone-900 to-yellow-950/80 border-yellow-500 text-yellow-300 shadow-[0_0_30px_rgba(234,179,8,0.3)]',
      accentColor: 'text-yellow-400',
      tagBg: 'bg-yellow-900/60 border-yellow-600/50 text-yellow-300',
      icon: '👑',
      desc: 'Định đô Thăng Long, mở mang phát triển kinh tế thương mại, cải cách điền địa và duy trì nền khoa cử Nho học thịnh vượng bậc nhất thế kỷ XVI.',
      heroes: ['Mạc Đăng Dung', 'Mạc Kính Điển', 'Nguyễn Kính', 'Mạc Đăng Doanh', 'Nguyễn Giản Thanh'],
      statBonus: 'Tấn Công +10% & Phòng Thủ +15%'
    },
    {
      id: 'le_trinh',
      title: 'Nam Triều (Vua Lê - Chúa Trịnh)',
      badge: 'Trung Hưng Nam Triều',
      color: 'from-red-950 via-stone-900 to-red-950/80 border-red-500 text-red-300 shadow-[0_0_30px_rgba(239,68,68,0.3)]',
      accentColor: 'text-red-400',
      tagBg: 'bg-red-900/60 border-red-600/50 text-red-300',
      icon: '🚩',
      desc: 'Phất cờ Phò Lê diệt Mạc từ Thanh Hóa - Vạn Lại, binh hùng tướng mạnh, nắm trọn quyền bính quân sự thiết lập chế độ Vua Lê - Chúa Trịnh thống trị Đàng Ngoài.',
      heroes: ['Trịnh Kiểm', 'Trịnh Tùng', 'Nguyễn Kim', 'Trịnh Cương', 'Phùng Khắc Khoan'],
      statBonus: 'Tấn Công +15% & Tốc Độ +10%'
    },
    {
      id: 'nguyen',
      title: 'Đàng Trong (Chúa Nguyễn)',
      badge: 'Hùng Cứ Nam Hà',
      color: 'from-blue-950 via-stone-900 to-blue-950/80 border-blue-500 text-blue-300 shadow-[0_0_30px_rgba(59,130,246,0.3)]',
      accentColor: 'text-blue-400',
      tagBg: 'bg-blue-900/60 border-blue-600/50 text-blue-300',
      icon: '🌊',
      desc: 'Nghe lời sấm Trạng Trình vượt Hoành Sơn mở cõi phương Nam, lập Lũy Thầy vững như bàn thạch, mở mang thương cảng Hội An và cương thổ đến Sài Gòn - Gia Định.',
      heroes: ['Nguyễn Hoàng', 'Nguyễn Phúc Nguyên', 'Đào Duy Từ', 'Nguyễn Hữu Cảnh', 'Nguyễn Phúc Tần'],
      statBonus: 'Phòng Thủ +20% & Hồi Máu +10%'
    }
  ];

  return (
    <div className="fixed inset-0 z-[250] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300" onClick={onClose}>
      <div className="relative w-full max-w-4xl bg-gradient-to-b from-stone-900 via-stone-950 to-black border-2 border-amber-500/80 rounded-[2.5rem] p-6 md:p-8 shadow-[0_0_60px_rgba(245,158,11,0.35)] flex flex-col max-h-[92vh] overflow-y-auto custom-scrollbar" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-black/70 flex items-center justify-center text-stone-400 hover:text-white hover:bg-red-900 transition-all border border-white/10">
          <XCircle size={24} />
        </button>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/50 px-4 py-1 rounded-full text-amber-300 text-xs font-black uppercase tracking-widest mb-2">
            ⚔️ Chương 9: Thời Kỳ Nội Chiến Nam - Bắc Triều ⚔️
          </div>
          <h2 className="text-2xl md:text-3xl font-cinzel font-black uppercase text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">
            Lựa Chọn Phe Phái Xuất Quân
          </h2>
          <p className="text-stone-400 text-xs md:text-sm mt-1 max-w-xl mx-auto">
            Chúa công hãy chọn một trong ba thế lực lớn để dẫn dắt quân đội, chiêu mộ tướng tài và đối đầu với các thế lực đối nghịch!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {factions.map(f => {
            const isSelected = currentFaction === f.id;
            return (
              <div 
                key={f.id}
                onClick={() => onSelect(f.id)}
                className={`relative rounded-2xl border-2 p-5 flex flex-col justify-between transition-all duration-300 cursor-pointer bg-gradient-to-b ${f.color} hover:scale-[1.03] active:scale-95 ${isSelected ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-black' : 'opacity-90 hover:opacity-100'}`}
              >
                {isSelected && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-black font-black text-[10px] uppercase px-3 py-0.5 rounded-full shadow-lg">
                    ✓ Đang Phụng Sự
                  </div>
                )}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{f.icon}</span>
                    <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${f.tagBg}`}>
                      {f.badge}
                    </span>
                  </div>
                  <h3 className={`text-lg font-cinzel font-black uppercase mb-1.5 ${f.accentColor}`}>
                    {f.title}
                  </h3>
                  <p className="text-stone-300 text-[11px] leading-relaxed mb-3">
                    {f.desc}
                  </p>
                  <div className="border-t border-white/10 pt-2.5 mb-3">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Tướng Tiêu Biểu:</span>
                    <div className="flex flex-wrap gap-1">
                      {f.heroes.map((hName, idx) => (
                        <span key={idx} className="text-[9px] bg-black/50 text-stone-300 px-1.5 py-0.5 rounded border border-white/5 font-semibold">
                          {hName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onSelect(f.id); }}
                  className={`w-full py-2.5 rounded-xl font-cinzel font-black text-xs uppercase tracking-wider transition-all border ${
                    isSelected ? 'bg-amber-500 text-stone-950 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'bg-black/60 text-stone-200 border-white/20 hover:bg-white/10'
                  }`}
                >
                  {isSelected ? 'Đang Phụng Sự' : 'Gia Nhập Phe'}
                </button>
              </div>
            );
          })}
        </div>

        <div className="bg-amber-950/40 border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3">
          <span className="text-2xl shrink-0">📜</span>
          <p className="text-[11px] text-amber-200/90 leading-relaxed italic">
            <strong className="text-amber-400 not-italic">Lời sấm Trạng Trình: </strong> 
            Bậc tiên tri đại tài Nguyễn Bỉnh Khiêm giữ vị thế trung lập tối cao, sẵn sàng xuất hiện hỗ trợ trong đội hình của cả ba phe!
          </p>
        </div>
      </div>
    </div>
  );
};


const QuocTuGiamView = ({ setView, activeChapter = 1 }: any) => {
  const [viewChapter, setViewChapter] = useState(activeChapter || 1);
  const [selectedHero, setSelectedHero] = useState<Hero | null>(null);
  const [activeTab, setActiveTab] = useState<string>((activeChapter || 1) === 9 ? 'mac' : 'allies');

  useEffect(() => {
    if (viewChapter === 9) {
      if (!['mac', 'le_trinh', 'nguyen', 'all', 'artifacts'].includes(activeTab)) {
        setActiveTab('mac');
      }
    } else {
      if (!['allies', 'enemies', 'artifacts'].includes(activeTab)) {
        setActiveTab('allies');
      }
    }
  }, [viewChapter]);

  const allies = INITIAL_HEROES.filter(h => h.chapter === viewChapter).sort((a, b) => (b.overall as number) - (a.overall as number));
  const enemies = ENEMY_HEROES.filter(h => h.chapter === viewChapter).sort((a, b) => (b.overall as number) - (a.overall as number));
  const artifacts = ARTIFACTS.filter(a => {
    if (!a.exclusiveTo || a.exclusiveTo.length === 0) return false;
    const firstHeroId = a.exclusiveTo[0];
    const hero = INITIAL_HEROES.find(h => h.id === firstHeroId) || ENEMY_HEROES.find(h => h.id === firstHeroId);
    return hero ? hero.chapter === viewChapter : false;
  }).map(a => ({
    ...a,
    rarity: 'SSR',
    star: 5,
    overall: 'Thần Khí',
    isArtifact: true,
    baseId: a.id
  }));

  const macCount = INITIAL_HEROES.filter(h => h.chapter === 9 && (h.subFaction === 'mac' || h.subFaction === 'neutral')).length;
  const leTrinhCount = INITIAL_HEROES.filter(h => h.chapter === 9 && (h.subFaction === 'le_trinh' || h.subFaction === 'neutral')).length;
  const nguyenCount = INITIAL_HEROES.filter(h => h.chapter === 9 && (h.subFaction === 'nguyen' || h.subFaction === 'neutral')).length;
  const allCh9Count = INITIAL_HEROES.filter(h => h.chapter === 9).length;

  return (
    <div className="min-h-screen ancient-bg flex flex-col h-screen overflow-hidden">
       <div className="p-6 flex justify-between items-center bg-stone-900 border-b border-amber-900 shadow-xl z-20">
          <button onClick={() => setView('chapter-hub')} className="text-amber-500 font-bold flex items-center gap-2 hover:text-amber-400 transition-colors"><ChevronLeft/> Trở về</button>
          <div className="flex items-center gap-4 bg-stone-800 px-4 py-2 rounded-2xl border border-amber-900/40 shadow-inner">
            <span className="text-amber-900 font-black uppercase text-[10px] tracking-widest">Tra cứu:</span>
            <select 
              value={viewChapter} 
              onChange={(e) => setViewChapter(Number(e.target.value))}
              className="bg-transparent text-amber-500 border-none outline-none font-bold text-sm cursor-pointer"
            >
              {[1,2,3,4,5,6,7,8,9,10].map(c => <option key={c} value={c} className="bg-stone-900">Chương {c}</option>)}
            </select>
          </div>
          <h2 className="text-xl font-cinzel text-amber-500 font-black uppercase tracking-widest">Quốc Tử Giám</h2>
       </div>

       <div className="flex-1 overflow-y-auto p-8 custom-scrollbar pb-24">
          <div className="text-center max-w-2xl mx-auto mb-8">
             <h3 className="text-3xl font-cinzel text-amber-950 font-black uppercase mb-2 animate-in slide-in-from-top duration-500">{CHAPTER_NAMES[viewChapter]}</h3>
             <p className="text-stone-600 italic text-sm font-bold uppercase tracking-wider opacity-60">Sử thi anh hào & nghịch tặc</p>
          </div>

          <div className="flex justify-center gap-4 mb-12 animate-in slide-in-from-bottom duration-500 flex-wrap">
            {viewChapter === 9 ? (
              <>
                <button 
                  onClick={() => setActiveTab('mac')}
                  className={`px-5 py-2.5 rounded-xl font-cinzel font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'mac' ? 'bg-yellow-950/60 text-yellow-300 border-2 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.35)] scale-105' : 'bg-stone-900/60 text-stone-400 border border-stone-800 hover:bg-stone-800 hover:text-yellow-400'}`}
                >
                  <Crown size={16} /> Bắc Triều Nhà Mạc ({macCount})
                </button>
                <button 
                  onClick={() => setActiveTab('le_trinh')}
                  className={`px-5 py-2.5 rounded-xl font-cinzel font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'le_trinh' ? 'bg-red-950/60 text-red-300 border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.35)] scale-105' : 'bg-stone-900/60 text-stone-400 border border-stone-800 hover:bg-stone-800 hover:text-red-400'}`}
                >
                  <SwordIcon size={16} /> Vua Lê - Chúa Trịnh ({leTrinhCount})
                </button>
                <button 
                  onClick={() => setActiveTab('nguyen')}
                  className={`px-5 py-2.5 rounded-xl font-cinzel font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'nguyen' ? 'bg-blue-950/60 text-blue-300 border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.35)] scale-105' : 'bg-stone-900/60 text-stone-400 border border-stone-800 hover:bg-stone-800 hover:text-blue-400'}`}
                >
                  <Users size={16} /> Chúa Nguyễn Đàng Trong ({nguyenCount})
                </button>
                <button 
                  onClick={() => setActiveTab('all')}
                  className={`px-5 py-2.5 rounded-xl font-cinzel font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'all' ? 'bg-emerald-950/60 text-emerald-300 border-2 border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.35)] scale-105' : 'bg-stone-900/60 text-stone-400 border border-stone-800 hover:bg-stone-800 hover:text-emerald-400'}`}
                >
                  <Users size={16} /> Toàn Bộ Hào Kiệt ({allCh9Count})
                </button>
                <button 
                  onClick={() => setActiveTab('artifacts')}
                  className={`px-5 py-2.5 rounded-xl font-cinzel font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'artifacts' ? 'bg-purple-950/60 text-purple-300 border-2 border-purple-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] scale-105' : 'bg-stone-900/60 text-stone-400 border border-stone-800 hover:bg-stone-800 hover:text-purple-400'}`}
                >
                  <Sparkles size={16} /> Thần Khí ({artifacts.length})
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => setActiveTab('allies')}
                  className={`px-6 py-2.5 rounded-xl font-cinzel font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'allies' ? 'bg-green-900/20 text-green-500 border-2 border-green-700/50 shadow-[0_0_15px_rgba(34,197,94,0.2)]' : 'bg-stone-900/50 text-stone-500 border border-stone-800 hover:bg-stone-800 hover:text-green-600'}`}
                >
                  <Users size={16} /> Hào Kiệt Phe Ta ({allies.length})
                </button>
                <button 
                  onClick={() => setActiveTab('enemies')}
                  className={`px-6 py-2.5 rounded-xl font-cinzel font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'enemies' ? 'bg-red-900/20 text-red-500 border-2 border-red-700/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-stone-900/50 text-stone-500 border border-stone-800 hover:bg-stone-800 hover:text-red-600'}`}
                >
                  <SwordIcon size={16} /> Nghịch Tặc Phe Địch ({enemies.length})
                </button>
                <button 
                  onClick={() => setActiveTab('artifacts')}
                  className={`px-6 py-2.5 rounded-xl font-cinzel font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'artifacts' ? 'bg-purple-900/20 text-purple-500 border-2 border-purple-700/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]' : 'bg-stone-900/50 text-stone-500 border border-stone-800 hover:bg-stone-800 hover:text-purple-600'}`}
                >
                  <Sparkles size={16} /> Thần Khí ({artifacts.length})
                </button>
              </>
            )}
          </div>

          {viewChapter === 9 ? (
             <section className="animate-in fade-in duration-500">
                {activeTab === 'artifacts' ? (
                  artifacts.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                       {artifacts.map(a => <HeroGalleryCard key={a.id} hero={a as any} onClick={() => setSelectedHero(a as any)} />)}
                    </div>
                  ) : (
                    <div className="text-center py-20 text-stone-500 font-cinzel text-sm uppercase tracking-widest italic">
                       Chưa có thần khí nào cho chương này
                    </div>
                  )
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                     {INITIAL_HEROES.filter(h => h.chapter === 9 && (activeTab === 'all' || h.subFaction === activeTab || h.subFaction === 'neutral'))
                        .sort((a, b) => (b.overall as number) - (a.overall as number))
                        .map(h => <HeroGalleryCard key={h.id} hero={h} onClick={() => setSelectedHero(h)} />)
                     }
                  </div>
                )}
             </section>
          ) : (
            <>
              {activeTab === 'allies' && (
                 <section className="animate-in fade-in duration-500">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                       {allies.map(h => <HeroGalleryCard key={h.id} hero={h} onClick={() => setSelectedHero(h)} />)}
                    </div>
                 </section>
              )}

              {activeTab === 'enemies' && (
                 <section className="animate-in fade-in duration-500">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                       {enemies.map(h => <HeroGalleryCard key={h.id} hero={h} isEnemy onClick={() => setSelectedHero(h)} />)}
                    </div>
                 </section>
              )}

              {activeTab === 'artifacts' && (
                 <section className="animate-in fade-in duration-500">
                    {artifacts.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                         {artifacts.map(a => <HeroGalleryCard key={a.id} hero={a as any} onClick={() => setSelectedHero(a as any)} />)}
                      </div>
                    ) : (
                      <div className="text-center py-20 text-stone-500 font-cinzel text-sm uppercase tracking-widest italic">
                         Chưa có thần khí nào cho chương này
                      </div>
                    )}
                 </section>
              )}
            </>
          )}
       </div>
       {selectedHero && !selectedHero.isArtifact && <HeroDetailModal hero={selectedHero} onClose={() => setSelectedHero(null)} />}
       {selectedHero && selectedHero.isArtifact && <ArtifactDetailModal artifact={selectedHero as any} onClose={() => setSelectedHero(null)} />}
    </div>
  );
};

export default App;
