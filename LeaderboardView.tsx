import React, { useState, useEffect, useMemo } from 'react';
import { PlayerState, Hero, LeaderboardEntry } from './types';
import { DEFAULT_ALLY_IMG, INITIAL_HEROES } from './constants';
import { fetchOnlineLeaderboard, syncPlayerToLeaderboard, resetAllLeaderboardRecords } from './firebaseService';
import { 
  ChevronLeft, Search, Trophy, Swords, BookOpen, Flame, 
  Award, Shield, Crown, Star, Sparkles, X, User, ExternalLink, RefreshCw, RotateCcw, Filter
} from 'lucide-react';

// Helper tính sao và viền LED
export const getStarBorderClass = (star: number) => {
  if (star >= 26) return 'led-border led-gold';
  if (star >= 21) return 'led-border led-gold';
  if (star >= 16) return 'led-border led-white';
  if (star >= 11) return 'led-border led-purple';
  if (star >= 6) return 'led-border led-red';
  return '';
};

// Helper tính chỉ số tướng theo sao
const calculateStats = (hero: Hero, star: number) => {
  const mult = 1 + (Math.max(1, star) - 1) * 0.15;
  return {
    ...hero,
    star,
    overall: Math.round(hero.overall * mult),
    atk: Math.round(hero.atk * mult),
    def: Math.round(hero.def * mult),
    hp: Math.round(hero.hp * mult),
    maxHp: Math.round(hero.maxHp * mult),
    spd: hero.spd
  };
};

// Danh sách dữ liệu mô phỏng phong phú các danh tướng và học sinh hào kiệt
const SEED_LEGIONS = [
  { name: "Trần Quốc Tuấn", legion: "Vạn Kiếp Thiết Quân", grade: 9, star: 28, scoreBonus: 850, trialStage: 15, questions: 420 },
  { name: "Lê Lợi", legion: "Lam Sơn Đại Quân", grade: 8, star: 25, scoreBonus: 810, trialStage: 14, questions: 395 },
  { name: "Quang Trung", legion: "Tây Sơn Thần Tốc", grade: 9, star: 26, scoreBonus: 790, trialStage: 13, questions: 380 },
  { name: "Ngô Quyền", legion: "Bạch Đằng Thủy Quân", grade: 7, star: 22, scoreBonus: 750, trialStage: 12, questions: 350 },
  { name: "Lý Thường Kiệt", legion: "Như Nguyệt Hùng Binh", grade: 8, star: 24, scoreBonus: 720, trialStage: 11, questions: 330 },
  { name: "Trần Hưng Đạo", legion: "Đông A Hào Khí", grade: 9, star: 20, scoreBonus: 690, trialStage: 10, questions: 310 },
  { name: "Phan Bội Châu", legion: "Đông Du Chí Sĩ", grade: 9, star: 18, scoreBonus: 680, trialStage: 9, questions: 290 },
  { name: "Chu Văn An", legion: "Quốc Tử Tư Đồ", grade: 7, star: 16, scoreBonus: 660, trialStage: 9, questions: 280 },
  { name: "Hai Bà Trưng", legion: "Mê Linh Vạn Thắng", grade: 6, star: 15, scoreBonus: 640, trialStage: 8, questions: 260 },
  { name: "Đinh Bộ Lĩnh", legion: "Hoa Lư Động Chủ", grade: 7, star: 14, scoreBonus: 610, trialStage: 8, questions: 240 },
  { name: "Nguyễn Huệ", legion: "Bình Định Phong Lôi", grade: 8, star: 13, scoreBonus: 590, trialStage: 7, questions: 220 },
  { name: "Võ Thị Sáu", legion: "Đất Đỏ Anh Hùng", grade: 6, star: 12, scoreBonus: 570, trialStage: 7, questions: 210 },
  { name: "Nguyễn Trãi", legion: "Ức Trai Thư Viện", grade: 8, star: 11, scoreBonus: 550, trialStage: 6, questions: 195 },
  { name: "Bà Triệu", legion: "Cửu Chân Nộ Hải", grade: 6, star: 10, scoreBonus: 530, trialStage: 6, questions: 180 },
  { name: "Lê Văn Hưu", legion: "Đại Việt Sử Ký", grade: 7, star: 9, scoreBonus: 510, trialStage: 5, questions: 165 },
];

export const LeaderboardView: React.FC<{
  player: PlayerState;
  setView: any;
  selectedGrade?: number;
}> = ({ player, setView, selectedGrade = 6 }) => {
  // Tabs: Khoa Cử (Học tập), Chiến Lực (Quân đoàn), Thí Luyện (Ải), Cần Vương (Chăm chỉ)
  const [activeTab, setActiveTab] = useState<'knowledge' | 'combat' | 'trial' | 'diligent'>('knowledge');
  // Mặc định lọc theo đúng khối lớp của học sinh đang đăng nhập
  const [gradeFilter, setGradeFilter] = useState<number | 'all'>(player.grade || 'all');
  const [includeMockSeeds, setIncludeMockSeeds] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectTarget, setInspectTarget] = useState<LeaderboardEntry | null>(null);
  const [onlineEntries, setOnlineEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Vừa xong');

  // Tính toán dữ liệu của chính người chơi đang đăng nhập
  const myComputedData = useMemo(() => {
    // 1. Chiến lực: Top 6 tướng vĩnh viễn mạnh nhất
    const permHeroes = (player.inventory || [])
      .filter(h => h.isPermanent)
      .map(h => calculateStats(h, h.star || 1))
      .sort((a, b) => b.overall - a.overall);
    
    const top6 = permHeroes.slice(0, 6);
    const combatPower = top6.reduce((sum, h) => sum + h.overall, 0);

    // 2. Điểm Khoa Cử (Toán & Sử)
    const mathCompletedLessons = Object.keys(player.mathProgress || {}).length;
    const mathScoreBonus = Object.values(player.mathProgress || {}).reduce((sum, val) => sum + (val || 0) * 50, 0);
    const suVietScore = player.tuHaoSuVietScore || 0;
    const knowledgeScore = (mathCompletedLessons * 100) + mathScoreBonus + suVietScore;

    // 3. Cấp ải Thí Luyện
    const trialStage = player.heroTrialProgress || 1;

    // 4. Cần Cù
    const questionsAnswered = (player.seenMathQuestions || []).length + (player.trialHistory || []).reduce((acc, r) => acc + (r.questions?.length || 0), 0);
    const studyStreak = player.suVietDailyPlays ? Math.min(30, (player.suVietDailyPlays || 1) * 3) : 1;

    // 5. Lineup preview
    const lineupPreview = top6.map(h => ({
      id: h.id,
      name: h.name,
      image: h.image,
      star: h.star,
      rarity: h.rarity,
      overall: h.overall
    }));

    const leaderHero = top6[0];
    const currentAvatarHero = (player.inventory || []).find(h => h.id === player.avatarId);
    const avatarUrl = player.customAvatar || (currentAvatarHero ? currentAvatarHero.image : (leaderHero?.image || DEFAULT_ALLY_IMG));

    const entry: LeaderboardEntry = {
      uid: player.username || player.playerName || 'player_me',
      playerName: player.playerName || 'Hào Kiệt Vô Danh',
      fullName: player.fullName,
      className: player.className,
      legionName: player.legionName || 'Đại Việt Nghĩa Quân',
      avatarUrl: avatarUrl,
      grade: player.grade || selectedGrade || 6,
      combatPower: Math.max(combatPower, 500),
      knowledgeScore: Math.max(knowledgeScore, 100),
      trialStage: trialStage,
      questionsAnswered: Math.max(questionsAnswered, 5),
      studyStreak: studyStreak,
      topHeroStar: leaderHero?.star || 1,
      topHeroTitle: leaderHero?.name || 'Chiến Tướng',
      lineupPreview: lineupPreview,
      isPlayer: true,
      updatedAt: Date.now()
    };

    return entry;
  }, [player, selectedGrade]);

  // Đồng bộ người chơi lên Cloud & lấy danh sách mới
  const refreshData = async () => {
    setLoading(true);
    // 1. Tự động đồng bộ người chơi lên Firestore
    await syncPlayerToLeaderboard(myComputedData);

    // 2. Kéo dữ liệu từ Cloud
    const cloudData = await fetchOnlineLeaderboard(activeTab, typeof gradeFilter === 'number' ? gradeFilter : undefined);
    setOnlineEntries(cloudData);
    setLoading(false);
    setLastSyncTime(new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }));
  };

  const handleResetLeaderboard = async () => {
    const cfm = window.confirm("⚠️ BẠN CÓ CHẮC CHẮN MUỐN RESET TOÀN BỘ BẢNG XẾP HẠNG TỪ ĐẦU?\n\n- Thao tác này dùng khi bắt đầu đưa website chính thức lên cho học sinh toàn trường tham gia.\n- Bảng xếp hạng sẽ xóa sạch các bài thi/điểm cũ và bắt đầu tính điểm mới.");
    if (cfm) {
      setLoading(true);
      await resetAllLeaderboardRecords();
      setOnlineEntries([]);
      setIncludeMockSeeds(false);
      setLoading(false);
      alert("✅ Đã reset Bảng Xếp Hạng thành công! Dữ liệu đã sẵn sàng cho học sinh mới.");
      refreshData();
    }
  };

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  // Tạo danh sách kết hợp giữa người chơi thật và các danh tướng hạt nhân (nếu bật)
  const fullLeaderboard = useMemo(() => {
    const baseList: LeaderboardEntry[] = SEED_LEGIONS.map((s, idx) => {
      // Giả lập 6 tướng
      const seedLineup = [];
      let totalP = 0;
      for (let j = 0; j < 6; j++) {
        const baseH = INITIAL_HEROES[(idx + j) % INITIAL_HEROES.length];
        const hStar = j === 0 ? s.star : Math.max(1, Math.floor(s.star * 0.7));
        const st = calculateStats(baseH, hStar);
        seedLineup.push({
          id: st.id,
          name: st.name,
          image: st.image,
          star: hStar,
          rarity: st.rarity,
          overall: st.overall
        });
        totalP += st.overall;
      }

      return {
        uid: `seed_${idx}`,
        playerName: s.name,
        fullName: s.name,
        className: `${s.grade}A1`,
        legionName: s.legion,
        avatarUrl: seedLineup[0]?.image || DEFAULT_ALLY_IMG,
        grade: s.grade,
        combatPower: totalP,
        knowledgeScore: s.scoreBonus + Math.floor(totalP * 0.1),
        trialStage: s.trialStage,
        questionsAnswered: s.questions,
        studyStreak: Math.min(30, Math.floor(s.questions / 15)),
        topHeroStar: s.star,
        topHeroTitle: seedLineup[0]?.name,
        lineupPreview: seedLineup,
        isPlayer: false,
        updatedAt: Date.now()
      };
    });

    // Gom dữ liệu: Online + Seed + Người chơi hiện tại (loại trừ trùng lặp)
    const map = new Map<string, LeaderboardEntry>();
    if (includeMockSeeds) {
      baseList.forEach(e => map.set(e.playerName.toLowerCase(), e));
    }
    onlineEntries.forEach(e => map.set(e.playerName.toLowerCase(), { ...e, isPlayer: e.playerName === myComputedData.playerName }));
    map.set(myComputedData.playerName.toLowerCase(), myComputedData);

    let all = Array.from(map.values());

    // Bộ lọc theo Khối Lớp
    if (gradeFilter !== 'all') {
      all = all.filter(item => item.grade === gradeFilter || item.isPlayer);
    }

    // Bộ lọc theo từ khóa tìm kiếm
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      all = all.filter(item => 
        item.playerName.toLowerCase().includes(q) || 
        (item.fullName && item.fullName.toLowerCase().includes(q)) ||
        item.legionName.toLowerCase().includes(q)
      );
    }

    // Sắp xếp theo Tab đang chọn
    all.sort((a, b) => {
      if (activeTab === 'combat') return b.combatPower - a.combatPower;
      if (activeTab === 'knowledge') return b.knowledgeScore - a.knowledgeScore;
      if (activeTab === 'trial') return b.trialStage - a.trialStage;
      return b.questionsAnswered - a.questionsAnswered;
    });

    return all;
  }, [onlineEntries, myComputedData, gradeFilter, searchQuery, activeTab, includeMockSeeds]);

  // Vị trí thứ hạng của người chơi hiện tại
  const myRankIndex = useMemo(() => {
    return fullLeaderboard.findIndex(e => e.isPlayer);
  }, [fullLeaderboard]);

  const myRankNumber = myRankIndex >= 0 ? myRankIndex + 1 : null;
  const targetAboveMe = myRankIndex > 0 ? fullLeaderboard[myRankIndex - 1] : null;

  // Điểm chênh lệch cần vượt
  const scoreGapToSurpass = useMemo(() => {
    if (!targetAboveMe || !myComputedData) return 0;
    if (activeTab === 'combat') return Math.max(1, targetAboveMe.combatPower - myComputedData.combatPower + 10);
    if (activeTab === 'knowledge') return Math.max(1, targetAboveMe.knowledgeScore - myComputedData.knowledgeScore + 1);
    if (activeTab === 'trial') return Math.max(1, targetAboveMe.trialStage - myComputedData.trialStage);
    return Math.max(1, targetAboveMe.questionsAnswered - myComputedData.questionsAnswered + 1);
  }, [targetAboveMe, myComputedData, activeTab]);

  // Top 3 và các thứ hạng sau
  const top1 = fullLeaderboard[0];
  const top2 = fullLeaderboard[1];
  const top3 = fullLeaderboard[2];
  const top4To8 = fullLeaderboard.slice(3, 8);
  const remainingList = fullLeaderboard.slice(8);

  // Helper lấy nhãn điểm hiển thị
  const getMetricLabel = (item: LeaderboardEntry) => {
    if (activeTab === 'combat') return `${(item.combatPower || 0).toLocaleString()} CL`;
    if (activeTab === 'knowledge') return `${(item.knowledgeScore || 0).toLocaleString()} Điểm`;
    if (activeTab === 'trial') return `Ải ${item.trialStage}`;
    return `${item.questionsAnswered} Câu (${item.studyStreak} ngày)`;
  };

  // Helper danh hiệu triều đình theo Tab
  const getCourtTitles = () => {
    if (activeTab === 'knowledge') {
      return {
        r1: '🥇 Trạng Nguyên',
        r2: '🥈 Bảng Nhãn',
        r3: '🥉 Thám Hoa',
        r4_8: ['Hoàng Giáp', 'Tiến Sĩ', 'Cử Nhân', 'Tú Tài', 'Đồng Sinh']
      };
    }
    if (activeTab === 'combat') {
      return {
        r1: '🥇 Cửu Ngũ Chí Tôn',
        r2: '🥈 Quốc Sư',
        r3: '🥉 Thừa Tướng',
        r4_8: ['Tả Tướng Quân', 'Hữu Tướng Quân', 'Phó Tướng', 'Thống Lĩnh', 'Hiệu Úy']
      };
    }
    if (activeTab === 'trial') {
      return {
        r1: '🥇 Đại Đô Đốc',
        r2: '🥈 Thượng Tướng Quân',
        r3: '🥉 Đại Tư Mã',
        r4_8: ['Tiên Phong Tướng', 'Trấn Nam Tướng', 'Bình Bắc Tướng', 'Phá Lộ Tướng', 'Dũng Sĩ']
      };
    }
    return {
      r1: '🥇 Cần Vương Bảng Nhất',
      r2: '🥈 Văn Xương Đế Quân',
      r3: '🥉 Cần Mẫn Quốc Sĩ',
      r4_8: ['Tinh Cần Học Sinh', 'Khổ Luyện Sinh', 'Cần Học Hào Kiệt', 'Học Giả', 'Môn Đồ']
    };
  };

  const courtTitles = getCourtTitles();

  return (
    <div className="min-h-screen viet-bg flex flex-col h-screen overflow-hidden text-stone-100 select-none">
      {/* ─── HEADER HOÀNG GIA ────────────────────────────────────────────────────────── */}
      <header className="bg-gradient-to-r from-stone-950 via-stone-900 to-stone-950 border-b-2 border-amber-500/60 px-4 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)] z-40 shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Nút trở về */}
          <button 
            onClick={() => setView('chapter-hub')}
            className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-cinzel font-bold text-sm bg-amber-950/60 hover:bg-amber-900/70 border border-amber-600/40 px-3.5 py-1.5 rounded-full transition-all active:scale-95 shadow-md"
          >
            <ChevronLeft size={18} />
            <span>Trở Về Hoàng Thành</span>
          </button>

          {/* Tiêu đề trung tâm */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2">
              <span className="text-xl animate-bounce">🏮</span>
              <h1 className="text-lg md:text-2xl font-cinzel font-black uppercase tracking-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-500 drop-shadow-[0_2px_10px_rgba(245,158,11,0.8)]">
                BẢNG VÀNG DANH DỰ
              </h1>
              <span className="text-xl animate-bounce" style={{ animationDelay: '1s' }}>🏮</span>
            </div>
            <p className="text-[10px] md:text-xs text-amber-400/70 font-cinzel tracking-widest uppercase italic">
              Phong Thần Đại Việt • Khắc Tên Vào Sử Sách
            </p>
          </div>

          {/* Nút hành động */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIncludeMockSeeds(!includeMockSeeds)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all border ${
                includeMockSeeds 
                  ? 'bg-amber-950 text-amber-300 border-amber-600' 
                  : 'bg-stone-900 text-stone-400 border-stone-700 hover:text-white'
              }`}
              title="Bật/Tắt hiển thị danh tướng mẫu giả lập"
            >
              <Filter size={13} />
              <span className="hidden sm:inline">{includeMockSeeds ? "Tướng Mẫu: Bật" : "Tướng Mẫu: Tắt"}</span>
            </button>

            <button 
              onClick={handleResetLeaderboard}
              className="flex items-center gap-1.5 text-xs text-red-400 hover:text-white bg-red-950/60 hover:bg-red-900/80 border border-red-700/50 px-3 py-1.5 rounded-full transition-all active:scale-95"
              title="Reset lại toàn bộ bảng xếp hạng từ đầu (khi bắt đầu mở cổng cho học sinh tham gia)"
            >
              <RotateCcw size={13} />
              <span className="hidden md:inline">Reset BXH</span>
            </button>

            <button 
              onClick={refreshData}
              disabled={loading}
              className="flex items-center gap-1.5 text-xs text-stone-300 hover:text-amber-400 bg-stone-900/80 hover:bg-stone-800 border border-stone-700 px-3 py-1.5 rounded-full transition-all active:scale-95"
              title="Đồng bộ lại dữ liệu mới nhất"
            >
              <RefreshCw size={13} className={loading ? "animate-spin text-amber-500" : ""} />
              <span className="hidden sm:inline">{loading ? "Đang đồng bộ..." : "Đồng Bộ"}</span>
            </button>
          </div>
        </div>
      </header>

      {/* ─── THANH ĐIỀU HƯỚNG TABS & BỘ LỌC KHỐI LỚP ──────────────────────────── */}
      <div className="bg-stone-950/90 border-b border-amber-900/40 px-4 py-2.5 z-30 shrink-0 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-3 items-center justify-between">
          {/* 4 Tabs Danh Mục Thi Đua */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
            {[
              { id: 'knowledge', label: 'Bảng Khoa Cử', icon: <BookOpen size={16} />, color: 'from-amber-600 to-amber-700' },
              { id: 'combat', label: 'Bảng Chiến Lực', icon: <Swords size={16} />, color: 'from-red-600 to-red-700' },
              { id: 'trial', label: 'Bảng Thí Luyện', icon: <Crown size={16} />, color: 'from-purple-600 to-purple-700' },
              { id: 'diligent', label: 'Bảng Cần Vương', icon: <Flame size={16} />, color: 'from-emerald-600 to-emerald-700' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-cinzel font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeTab === t.id 
                    ? `bg-gradient-to-r ${t.color} text-white shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-amber-400 scale-105` 
                    : 'bg-stone-900 text-stone-400 border border-stone-800 hover:text-amber-300 hover:border-amber-800'
                }`}
              >
                {t.icon}
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Bộ lọc Khối Lớp & Ô Tìm Kiếm */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-center">
            {/* Lọc Khối Lớp */}
            <div className="flex items-center bg-stone-900/90 rounded-xl border border-stone-700 p-0.5 text-xs font-bold font-cinzel">
              <button 
                onClick={() => setGradeFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${gradeFilter === 'all' ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-white'}`}
              >
                Tất Cả
              </button>
              {[6, 7, 8, 9].map(g => (
                <button 
                  key={g}
                  onClick={() => setGradeFilter(g)}
                  className={`px-2 py-1 rounded-lg transition-all ${gradeFilter === g ? 'bg-amber-600 text-white shadow' : 'text-stone-400 hover:text-white'}`}
                >
                  K{g}
                </button>
              ))}
            </div>

            {/* Ô tìm kiếm */}
            <div className="relative flex-1 md:w-56">
              <input 
                type="text"
                placeholder="Tìm chúa công..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900/90 border border-stone-700 focus:border-amber-500 rounded-xl py-1 pl-8 pr-3 text-xs text-stone-200 outline-none transition-all placeholder:text-stone-500"
              />
              <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-500" />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-500 hover:text-white">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ─── NỘI DUNG CUỘN CHÍNH ─────────────────────────────────────────────────── */}
      <main className="flex-1 overflow-y-auto px-4 py-6 md:p-8 custom-scrollbar pb-28">
        <div className="max-w-6xl mx-auto space-y-10">

          {/* 1. BỤC VINH QUANG TOP 3 (IMPERIAL 3D PODIUM) */}
          <section className="relative pt-6 pb-4">
            <div className="text-center mb-6">
              <h2 className="text-xs uppercase font-cinzel font-bold tracking-[0.3em] text-amber-500/80">
                ★ TAM KHÔI ĐỆ NHẤT ĐẠI VIỆT ★
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-2 sm:gap-6 md:gap-10 items-end max-w-4xl mx-auto px-2">
              
              {/* 🥈 HẠNG 2: BẢNG NHÃN (Bên trái) */}
              {top2 && (
                <div 
                  onClick={() => setInspectTarget(top2)}
                  className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:-translate-y-2 order-1"
                >
                  <div className="bg-gradient-to-r from-slate-300 via-gray-100 to-slate-400 text-stone-900 font-cinzel font-black text-[10px] md:text-xs uppercase px-3 py-1 rounded-t-xl border-2 border-white shadow-[0_0_15px_rgba(203,213,225,0.6)] text-center whitespace-nowrap">
                    {courtTitles.r2}
                  </div>
                  <div className="bg-black/90 px-3 py-1 text-[9px] md:text-[11px] text-slate-300 font-bold border-b border-x border-slate-400/50 rounded-b-lg mb-2 text-center truncate max-w-full">
                    <div className="font-black text-white truncate">{top2.fullName ? `${top2.fullName} (${top2.className || 'K' + top2.grade})` : top2.playerName}</div>
                    <div className="text-[9px] text-slate-400">{top2.playerName} • {getMetricLabel(top2)}</div>
                  </div>
                  <div className={`relative w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-52 z-10 drop-shadow-[0_0_20px_rgba(156,163,175,0.4)] ${getStarBorderClass(top2.topHeroStar)}`}>
                    <div className="relative overflow-hidden rounded-2xl w-full h-full z-10 bg-stone-900 border-2 border-slate-300/40">
                      <img 
                        src={top2.avatarUrl || DEFAULT_ALLY_IMG} 
                        onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_ALLY_IMG; }} 
                        className="w-full h-full object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105" 
                        alt="Hạng 2" 
                      />
                      <div className="absolute top-2 left-2 bg-slate-800/90 text-slate-200 text-[10px] font-bold px-1.5 py-0.5 rounded border border-slate-500">
                        {top2.className || `K${top2.grade}`}
                      </div>
                    </div>
                    {/* Bệ ngọc Bạc 3D */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 sm:w-36 md:w-48 h-8 sm:h-12 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 rounded-[100%] shadow-[0_10px_25px_rgba(148,163,184,0.6)] border border-white/60 z-0"></div>
                  </div>
                  <span className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider group-hover:text-amber-400 flex items-center gap-1">
                    <User size={10} /> Soi Đội Hình
                  </span>
                </div>
              )}

              {/* 🥇 HẠNG 1: TRẠNG NGUYÊN (Chính giữa, cao nhất) */}
              {top1 && (
                <div 
                  onClick={() => setInspectTarget(top1)}
                  className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:-translate-y-3 order-2 z-20"
                >
                  <div className="relative">
                    <div className="bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-600 text-stone-950 font-cinzel font-black text-xs md:text-sm uppercase px-4 md:px-6 py-1.5 rounded-t-2xl border-2 border-yellow-200 shadow-[0_0_25px_rgba(234,179,8,0.9)] text-center whitespace-nowrap animate-pulse">
                      {courtTitles.r1}
                    </div>
                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-2xl drop-shadow-[0_0_8px_gold]">👑</span>
                  </div>
                  <div className="bg-stone-950 px-4 py-1 text-[10px] md:text-xs text-yellow-400 font-black border-b border-x border-amber-500/60 rounded-b-xl mb-2 text-center truncate max-w-full shadow-lg">
                    <div className="font-black text-amber-200 truncate">{top1.fullName ? `${top1.fullName} (${top1.className || 'K' + top1.grade})` : top1.playerName}</div>
                    <div className="text-[9px] text-yellow-400/80">{top1.playerName} • {getMetricLabel(top1)}</div>
                  </div>
                  <div className={`relative w-28 h-40 sm:w-40 sm:h-52 md:w-48 md:h-64 z-10 drop-shadow-[0_0_35px_rgba(234,179,8,0.7)] ${getStarBorderClass(top1.topHeroStar)}`}>
                    <div className="relative overflow-hidden rounded-2xl w-full h-full z-10 bg-stone-900 border-2 border-yellow-400/70 shadow-2xl">
                      <img 
                        src={top1.avatarUrl || DEFAULT_ALLY_IMG} 
                        onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_ALLY_IMG; }} 
                        className="w-full h-full object-contain drop-shadow-[0_12px_12px_rgba(0,0,0,0.9)] transition-transform duration-500 group-hover:scale-110" 
                        alt="Hạng 1" 
                      />
                      <div className="absolute top-2 left-2 bg-amber-900/90 text-yellow-300 text-xs font-black px-2 py-0.5 rounded border border-amber-400">
                        {top1.className || `Lớp ${top1.grade}`}
                      </div>
                      <div className="absolute bottom-2 right-2 flex items-center gap-0.5 bg-black/80 px-2 py-0.5 rounded-full border border-yellow-500/50 text-[10px] text-yellow-400 font-bold">
                        <Star size={10} className="fill-yellow-400" /> {top1.topHeroStar}★
                      </div>
                    </div>
                    {/* Bệ ngọc Hoàng Kim 3D */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 sm:w-48 md:w-60 h-10 sm:h-16 bg-gradient-to-b from-yellow-300 via-amber-500 to-yellow-800 rounded-[100%] shadow-[0_15px_40px_rgba(234,179,8,0.8)] border-2 border-yellow-200 z-0"></div>
                  </div>
                  <span className="mt-5 text-xs text-yellow-400 font-black uppercase tracking-wider group-hover:text-white flex items-center gap-1 drop-shadow">
                    <Sparkles size={12} /> Soi Đội Hình Quán Quân
                  </span>
                </div>
              )}

              {/* 🥉 HẠNG 3: THÁM HOA (Bên phải) */}
              {top3 && (
                <div 
                  onClick={() => setInspectTarget(top3)}
                  className="flex flex-col items-center group cursor-pointer transition-all duration-300 hover:-translate-y-2 order-3"
                >
                  <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-800 text-amber-100 font-cinzel font-black text-[10px] md:text-xs uppercase px-3 py-1 rounded-t-xl border-2 border-amber-400 shadow-[0_0_15px_rgba(217,119,6,0.6)] text-center whitespace-nowrap">
                    {courtTitles.r3}
                  </div>
                  <div className="bg-black/90 px-3 py-1 text-[9px] md:text-[11px] text-amber-300 font-bold border-b border-x border-amber-600/50 rounded-b-lg mb-2 text-center truncate max-w-full">
                    <div className="font-black text-amber-200 truncate">{top3.fullName ? `${top3.fullName} (${top3.className || 'K' + top3.grade})` : top3.playerName}</div>
                    <div className="text-[9px] text-amber-400/80">{top3.playerName} • {getMetricLabel(top3)}</div>
                  </div>
                  <div className={`relative w-24 h-32 sm:w-32 sm:h-44 md:w-40 md:h-52 z-10 drop-shadow-[0_0_20px_rgba(217,119,6,0.4)] ${getStarBorderClass(top3.topHeroStar)}`}>
                    <div className="relative overflow-hidden rounded-2xl w-full h-full z-10 bg-stone-900 border-2 border-amber-600/40">
                      <img 
                        src={top3.avatarUrl || DEFAULT_ALLY_IMG} 
                        onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_ALLY_IMG; }} 
                        className="w-full h-full object-contain drop-shadow-[0_8px_8px_rgba(0,0,0,0.8)] transition-transform duration-500 group-hover:scale-105" 
                        alt="Hạng 3" 
                      />
                      <div className="absolute top-2 left-2 bg-amber-950/90 text-amber-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-700">
                        {top3.className || `K${top3.grade}`}
                      </div>
                    </div>
                    {/* Bệ ngọc Đồng 3D */}
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-28 sm:w-36 md:w-48 h-8 sm:h-12 bg-gradient-to-b from-amber-500 via-amber-700 to-amber-900 rounded-[100%] shadow-[0_10px_25px_rgba(180,83,9,0.6)] border border-amber-400/60 z-0"></div>
                  </div>
                  <span className="mt-4 text-[10px] text-amber-500 font-bold uppercase tracking-wider group-hover:text-white flex items-center gap-1">
                    <User size={10} /> Soi Đội Hình
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* 2. THẺ BÀI DANH TƯỚNG (TOP 4 - 8 CARDS) */}
          {top4To8.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-800/60"></div>
                <h3 className="font-cinzel font-black text-sm uppercase tracking-widest text-amber-400 flex items-center gap-2">
                  <Shield size={16} /> Bảng Tiền Đạo (Hạng 4 - 8)
                </h3>
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-800/60"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
                {top4To8.map((item, idx) => {
                  const rank = idx + 4;
                  const courtRole = courtTitles.r4_8[idx] || `Hạng ${rank}`;
                  return (
                    <div
                      key={item.uid || idx}
                      onClick={() => setInspectTarget(item)}
                      className={`bg-stone-900/90 rounded-2xl border-2 overflow-hidden shadow-xl flex flex-col items-center relative group hover:-translate-y-1.5 transition-all duration-300 cursor-pointer ${
                        item.isPlayer ? 'border-amber-400 ring-2 ring-amber-400/50' : 'border-stone-700 hover:border-amber-500'
                      }`}
                    >
                      {/* Huy hiệu tước vị */}
                      <div className="w-full bg-gradient-to-r from-amber-950 via-stone-900 to-amber-950 border-b border-amber-800/50 py-1 text-center font-cinzel font-black text-[11px] text-amber-300 uppercase truncate px-2">
                        #{rank} • {courtRole}
                      </div>

                      {/* Ảnh đại diện tướng */}
                      <div className="w-full aspect-[4/5] relative bg-stone-950 overflow-hidden">
                        <img 
                          src={item.avatarUrl || DEFAULT_ALLY_IMG} 
                          onError={(e) => { (e.target as HTMLImageElement).src = DEFAULT_ALLY_IMG; }}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100" 
                          alt={item.playerName}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                        <div className="absolute top-2 left-2 bg-stone-900/80 text-stone-300 font-bold text-[10px] px-1.5 py-0.5 rounded border border-stone-600">
                          {item.className || `Khối ${item.grade}`}
                        </div>
                      </div>

                      {/* Thông tin & Điểm số */}
                      <div className="w-full p-2.5 text-center bg-stone-900 border-t border-stone-800">
                        <div className={`font-black text-xs uppercase truncate ${item.isPlayer ? 'text-amber-400' : 'text-stone-200'}`}>
                          {item.fullName ? `${item.fullName} (${item.className || 'K' + item.grade})` : item.playerName} {item.isPlayer && "(Bạn)"}
                        </div>
                        <div className="text-[10px] text-stone-400 truncate mb-1">Chúa công: {item.playerName}</div>
                        <div className="text-xs font-cinzel font-black text-amber-400 bg-amber-950/60 py-0.5 px-2 rounded-md border border-amber-900/40">
                          {getMetricLabel(item)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* 3. BẢNG CHIẾU CHỈ HOÀNG GIA (TOP 9 - 100 LIST) */}
          <section className="bg-stone-900/90 border border-amber-800/50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-4 bg-gradient-to-r from-stone-950 via-amber-950/40 to-stone-950 border-b border-amber-800/50 flex items-center justify-between">
              <h3 className="font-cinzel font-black text-sm uppercase tracking-widest text-amber-300 flex items-center gap-2">
                <Trophy size={18} className="text-amber-400" /> Chiếu Chỉ Bảng Vàng (Hạng 9+)
              </h3>
              <span className="text-xs text-stone-400 font-cinzel">Tổng số: {fullLeaderboard.length} chúa công</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-stone-950/80 text-amber-200/70 font-cinzel uppercase text-[11px] tracking-wider border-b border-stone-800">
                    <th className="py-3 px-4 text-center w-16">Thứ Hạng</th>
                    <th className="py-3 px-4">Học Sinh / Chúa Công</th>
                    <th className="py-3 px-4 text-center w-24">Lớp Học</th>
                    <th className="py-3 px-4 text-right">Chỉ Số Đạt Được</th>
                    <th className="py-3 px-4 text-center w-28">Thao Tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 text-sm">
                  {remainingList.map((item, idx) => {
                    const rank = idx + 9;
                    const isMe = item.isPlayer;
                    return (
                      <tr 
                        key={item.uid || idx}
                        onClick={() => setInspectTarget(item)}
                        className={`hover:bg-amber-950/30 transition-colors cursor-pointer ${
                          isMe ? 'bg-amber-900/30 font-bold border-l-4 border-amber-400' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 text-center font-cinzel font-bold text-stone-400">
                          #{rank}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl overflow-hidden bg-stone-800 border border-stone-700 shrink-0">
                              <img src={item.avatarUrl || DEFAULT_ALLY_IMG} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className={`font-bold text-sm ${isMe ? 'text-amber-300' : 'text-stone-200'}`}>
                                {item.fullName ? `${item.fullName}` : item.playerName}
                                {isMe && (
                                  <span className="ml-2 text-[10px] bg-amber-500 text-stone-950 font-black px-2 py-0.5 rounded-full uppercase">
                                    Bạn
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-stone-400">Chúa công: <span className="text-amber-400/90 font-bold">{item.playerName}</span> • {item.legionName}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="bg-stone-800 text-stone-300 text-xs px-2.5 py-1 rounded-full border border-stone-700 font-bold">
                            {item.className || `Lớp ${item.grade}`}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-cinzel font-black text-amber-400 text-sm">
                          {getMetricLabel(item)}
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setInspectTarget(item); }}
                            className="text-xs text-stone-400 hover:text-amber-300 bg-stone-800 hover:bg-stone-700 px-2.5 py-1 rounded-lg border border-stone-600 transition-colors"
                          >
                            Soi
                          </button>
                        </td>
                      </tr>
                    );
                  })}

                  {remainingList.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-stone-500 text-sm">
                        Chưa có thêm học sinh nào trong danh mục này. Hãy là người tiếp theo ghi danh!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      {/* ─── MODAL SOI ĐỘI HÌNH QUÂN ĐOÀN (INSPECT LINEUP) ────────────────────── */}
      {inspectTarget && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setInspectTarget(null)}
        >
          <div 
            className="bg-stone-900 border-2 border-amber-500/80 rounded-3xl p-6 md:p-8 max-w-3xl w-full shadow-2xl relative max-h-[90vh] flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <button 
              onClick={() => setInspectTarget(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white p-1 rounded-full bg-stone-800 border border-stone-700"
            >
              <X size={20} />
            </button>

            {/* Header thông tin người chơi */}
            <div className="flex items-center gap-4 border-b border-amber-900/50 pb-5 mb-5">
              <div className="w-16 h-16 rounded-2xl border-2 border-amber-400 overflow-hidden bg-stone-950 shrink-0">
                <img src={inspectTarget.avatarUrl || DEFAULT_ALLY_IMG} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-cinzel font-black text-amber-300 uppercase">
                    {inspectTarget.playerName}
                  </h3>
                  <span className="bg-amber-950 text-amber-300 text-xs px-2.5 py-0.5 rounded-full border border-amber-600/40">
                    Khối {inspectTarget.grade}
                  </span>
                </div>
                <p className="text-stone-400 text-xs mt-0.5">Quân Đoàn: <span className="text-white font-bold">{inspectTarget.legionName}</span></p>
                <div className="flex flex-wrap gap-3 mt-2 text-xs font-bold">
                  <span className="text-amber-400">⚔️ Chiến Lực: {(inspectTarget.combatPower || 0).toLocaleString()}</span>
                  <span className="text-sky-400">📜 Điểm Khoa Cử: {inspectTarget.knowledgeScore}</span>
                  <span className="text-purple-400">🏛️ Ải Thí Luyện: {inspectTarget.trialStage}</span>
                  <span className="text-emerald-400">⚡ Đã làm: {inspectTarget.questionsAnswered} câu</span>
                </div>
              </div>
            </div>

            {/* Danh sách 6 tướng trong Đội Hình */}
            <div className="flex-1 overflow-y-auto pr-1">
              <h4 className="text-xs font-cinzel font-bold text-amber-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Swords size={14} /> Trận Đồ Danh Tướng Xuất Chiến (6 Tướng)
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {(inspectTarget.lineupPreview && inspectTarget.lineupPreview.length > 0 
                  ? inspectTarget.lineupPreview 
                  : []
                ).map((h, i) => (
                  <div 
                    key={i} 
                    className="bg-stone-950 rounded-xl border border-amber-900/50 p-2.5 flex flex-col items-center relative overflow-hidden group"
                  >
                    <div className="w-full aspect-square rounded-lg overflow-hidden bg-stone-900 mb-2 relative">
                      <img src={h.image} alt={h.name} className="w-full h-full object-contain" />
                      <span className="absolute top-1 right-1 bg-black/80 text-yellow-400 text-[10px] font-black px-1.5 py-0.5 rounded border border-yellow-500/50">
                        {h.star}★
                      </span>
                    </div>
                    <div className="font-bold text-xs text-white text-center truncate w-full">{h.name}</div>
                    <div className="text-[10px] text-amber-500 font-black mt-1">Lực Chiến: {(h.overall || 0).toLocaleString()}</div>
                  </div>
                ))}

                {(!inspectTarget.lineupPreview || inspectTarget.lineupPreview.length === 0) && (
                  <p className="col-span-full text-center text-stone-500 text-xs py-8">
                    Người chơi này chưa thiết lập đầy đủ danh sách xuất chiến.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── THANH CỐ ĐỊNH "VỊ TRÍ CỦA TÔI" (STICKY MY RANK DƯỚI ĐÁY) ───────────── */}
      <footer className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-stone-950 via-stone-900 to-stone-900/95 border-t-2 border-amber-500 px-4 py-2.5 z-40 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
          
          {/* Thông tin hạng hiện tại của người chơi */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-full border-2 border-amber-400 overflow-hidden bg-stone-900 shrink-0">
              <img src={myComputedData.avatarUrl || DEFAULT_ALLY_IMG} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-cinzel font-black uppercase text-amber-400">Vị Trí Của Bạn:</span>
                <span className="bg-amber-600 text-stone-950 font-black text-xs px-2 py-0.5 rounded-full shadow">
                  {myRankNumber ? `Hạng #${myRankNumber}` : 'Chưa xếp hạng'}
                </span>
                <span className="text-xs text-stone-300 font-bold hidden md:inline">({myComputedData.playerName})</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Chỉ số: <span className="text-amber-300 font-bold">{getMetricLabel(myComputedData)}</span>
              </p>
            </div>
          </div>

          {/* Mục tiêu động lực vượt hạng vi mô */}
          <div className="text-center sm:text-right w-full sm:w-auto">
            {myRankNumber === 1 ? (
              <div className="text-xs font-black text-yellow-400 font-cinzel animate-pulse">
                👑 Bạn đang ngự trên đỉnh Trạng Nguyên! Hãy giữ vững hào quang!
              </div>
            ) : targetAboveMe ? (
              <div className="text-xs text-stone-300">
                <span>Cần thêm </span>
                <span className="text-amber-400 font-black text-sm">+{scoreGapToSurpass}</span>
                <span> để vượt qua </span>
                <span className="text-white font-bold">"{targetAboveMe.playerName}"</span>
                <span> vươn lên </span>
                <span className="text-yellow-400 font-black">Hạng #{myRankNumber ? myRankNumber - 1 : 1}</span>!
              </div>
            ) : (
              <div className="text-xs text-stone-400">
                Tham gia thêm bài học để bứt phá bảng xếp hạng!
              </div>
            )}
          </div>

          {/* Nút hành động nhanh để kiếm điểm */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setView('kinh-luan-grade')}
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-cinzel font-black text-xs uppercase px-4 py-2 rounded-xl transition-transform active:scale-95 shadow-md flex items-center gap-1.5"
            >
              <BookOpen size={14} /> Học Tập Vượt Hạng
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LeaderboardView;
