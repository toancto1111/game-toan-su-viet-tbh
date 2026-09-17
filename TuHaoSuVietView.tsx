import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Award, Crown, CheckCircle2, XCircle, Flame, 
  Sparkles, ChevronRight, RotateCcw, Home, HelpCircle, 
  Heart, Feather, ScrollText, Library, Share2, Compass
} from 'lucide-react';
import { SU_VIET_QUESTIONS, SuVietQuestion, checkShortAnswer } from './tu_hao_su_viet_data';
import { PlayerState } from './types';

interface TuHaoSuVietViewProps {
  playerState: PlayerState;
  setPlayer: React.Dispatch<React.SetStateAction<PlayerState>>;
  onBack: () => void;
}

type GameMode = 'menu' | 'exam-select' | 'exam' | 'practice' | 'library' | 'result';

// Cấu hình gói thi Khảo Thí Trạng Nguyên
const EXAM_PACKAGES = [
  {
    size: 10,
    title: 'THÁM HOA',
    titleVi: 'Thám Hoa',
    desc: 'Thi 10 câu, đỗ trọn vẹn đạt danh Thám Hoa',
    color: 'from-orange-900/80 to-amber-950',
    border: 'border-orange-500/70',
    badgeColor: 'bg-orange-700/60 text-orange-200',
    rewardTickets: 1,
    rewardJadePerQ: 20,
    rewardGoldPerQ: 300,
    bonusJade: 50,
    icon: '🌸',
  },
  {
    size: 20,
    title: 'BẢNG NHÃN',
    titleVi: 'Bảng Nhãn',
    desc: 'Thi 20 câu, đỗ trọn vẹn đạt danh Bảng Nhãn',
    color: 'from-yellow-900/80 to-amber-950',
    border: 'border-yellow-500/70',
    badgeColor: 'bg-yellow-700/60 text-yellow-200',
    rewardTickets: 2,
    rewardJadePerQ: 25,
    rewardGoldPerQ: 500,
    bonusJade: 150,
    icon: '📜',
  },
  {
    size: 30,
    title: 'TRẠNG NGUYÊN',
    titleVi: 'Trạng Nguyên',
    desc: 'Thi 30 câu, đỗ trọn vẹn đạt danh Trạng Nguyên',
    color: 'from-amber-800/80 to-red-950',
    border: 'border-amber-400/70',
    badgeColor: 'bg-amber-600/60 text-amber-100',
    rewardTickets: 3,
    rewardJadePerQ: 30,
    rewardGoldPerQ: 700,
    bonusJade: 300,
    icon: '👑',
  },
] as const;

const MAX_DAILY_PLAYS = 2;

export const TuHaoSuVietView: React.FC<TuHaoSuVietViewProps> = ({
  playerState,
  setPlayer,
  onBack
}) => {
  const [mode, setMode] = useState<GameMode>('menu');
  const [activeEra, setActiveEra] = useState<string>('all');
  const [examQuestions, setExamQuestions] = useState<SuVietQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPackageIdx, setSelectedPackageIdx] = useState(0);

  // Trạng thái trả lời
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [textInput, setTextInput] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCurrentCorrect, setIsCurrentCorrect] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  // Thống kê phiên thi
  const [score, setScore] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [answeredRecords, setAnsweredRecords] = useState<{
    q: SuVietQuestion;
    userAns: string | number;
    isCorrect: boolean;
  }[]>([]);

  // Timer 30 giây đếm ngược
  const [timeLeft, setTimeLeft] = useState(30);
  const [autoNext, setAutoNext] = useState(false);
  const [speedBonus, setSpeedBonus] = useState({ jade: 0, gold: 0 }); // bonus tích lũy cả phiên

  // Thư viện tra cứu
  const [searchKeyword, setSearchKeyword] = useState('');

  // Danh sách các thời kỳ
  const eras = [
    'Tất cả các thời kỳ',
    'Thời Dựng Nước & Bắc Thuộc',
    'Ngô - Đinh - Tiền Lê',
    'Triều Lý',
    'Triều Trần',
    'Khởi Nghĩa Lam Sơn & Hậu Lê',
    'Thời Tây Sơn & Cận Đại'
  ];

  // --- Kiểm tra lượt chơi hàng ngày ---
  const todayStr = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const lastDate = playerState.suVietLastPlayDate || '';
  const playsToday = lastDate === todayStr ? (playerState.suVietDailyPlays || 0) : 0;
  const remainingPlays = Math.max(0, MAX_DAILY_PLAYS - playsToday);
  const isOutOfPlays = remainingPlays <= 0;

  // Tiêu thụ 1 lượt chơi
  const consumePlay = () => {
    setPlayer(prev => ({
      ...prev,
      suVietDailyPlays: playsToday + 1,
      suVietLastPlayDate: todayStr,
    }));
  };

  // --- Danh hiệu dựa trên số câu đúng (cho luyện thi) ---
  const getExamTitle = (correctCount: number) => {
    if (correctCount >= 30) return { title: 'TRẠNG NGUYÊN', color: 'text-amber-300 border-amber-400 bg-amber-950/80', desc: 'Đỉnh cao trí tuệ, rạng danh muôn đời!' };
    if (correctCount >= 25) return { title: 'BẢNG NHÃN', color: 'text-yellow-300 border-yellow-400 bg-yellow-950/80', desc: 'Văn võ toàn tài, nức tiếng thiên hạ!' };
    if (correctCount >= 20) return { title: 'THÁM HOA', color: 'text-orange-300 border-orange-400 bg-orange-950/80', desc: 'Uyên thâm bác học, ngời sáng sử xanh!' };
    if (correctCount >= 15) return { title: 'TIẾN SĨ', color: 'text-emerald-300 border-emerald-400 bg-emerald-950/80', desc: 'Ghi tên bảng vàng, hiền tài quốc gia!' };
    if (correctCount >= 10) return { title: 'CỬ NHÂN', color: 'text-cyan-300 border-cyan-400 bg-cyan-950/80', desc: 'Thông tuệ lịch sử, đỗ đạt kỳ thi Hương!' };
    if (correctCount >= 5) return { title: 'TÚ TÀI', color: 'text-blue-300 border-blue-400 bg-blue-950/80', desc: 'Bước đầu khai trí, hiểu tỏ cội nguồn!' };
    return { title: 'SĨ TỬ NHẬP MÔN', color: 'text-stone-300 border-stone-500 bg-stone-900/80', desc: 'Cần mẫn dùi mài kinh sử để đỗ đạt!' };
  };

  // Khởi động chế độ thi Trạng Nguyên với gói câu đã chọn
  const startExam = (pkgIdx: number) => {
    const pkg = EXAM_PACKAGES[pkgIdx];
    
    // --- Lọc câu hỏi chưa thi trong tuần ---
    const today = new Date();
    let seenList = playerState.suVietSeenQuestions || [];
    let resetDate = playerState.suVietSeenResetDate ? new Date(playerState.suVietSeenResetDate) : null;
    
    // Nếu chưa có ngày reset hoặc đã quá hạn, tạo chu kỳ 7 ngày mới
    let newResetDateStr = playerState.suVietSeenResetDate;
    if (!resetDate || today > resetDate) {
      seenList = [];
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      newResetDateStr = nextWeek.toISOString();
    }

    let available = SU_VIET_QUESTIONS.filter(q => !seenList.includes(q.id));
    
    // Nếu câu hỏi còn lại ít hơn gói thi, ta reset vòng lặp (cho phép lặp)
    if (available.length < pkg.size) {
      available = [...SU_VIET_QUESTIONS];
      seenList = [];
    }

    const shuffled = available.sort(() => 0.5 - Math.random()).slice(0, pkg.size);
    const selectedIds = shuffled.map(q => q.id);
    
    // Lưu các câu vừa thi vào danh sách đã gặp
    setPlayer(prev => ({
      ...prev,
      suVietSeenQuestions: [...seenList, ...selectedIds],
      suVietSeenResetDate: newResetDateStr,
    }));

    setExamQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setWrongCount(0);
    setStreak(0);
    setMaxStreak(0);
    setAnsweredRecords([]);
    resetAnswerState();
    consumePlay();
    setMode('exam');
  };

  // Khởi động chế độ Luyện tập (không tốn lượt)
  const startPractice = (eraFilter: string = 'all') => {
    let pool = [...SU_VIET_QUESTIONS];
    if (eraFilter !== 'all' && eraFilter !== 'Tất cả các thời kỳ') {
      pool = pool.filter(q => q.era === eraFilter);
    }
    const shuffled = pool.sort(() => 0.5 - Math.random());
    setExamQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setWrongCount(0);
    setStreak(0);
    setMaxStreak(0);
    setAnsweredRecords([]);
    resetAnswerState();
    setMode('practice');
  };

  const resetAnswerState = () => {
    setSelectedOption(null);
    setTextInput('');
    setIsAnswered(false);
    setIsCurrentCorrect(false);
    setShowExplanation(false);
  };

  // Timer 30s: reset khi đổi câu
  useEffect(() => {
    setTimeLeft(30);
  }, [currentIndex, mode]);

  // Timer countdown
  useEffect(() => {
    if (mode !== 'exam' && mode !== 'practice') return;
    if (isAnswered) return; // dừng khi đã trả lời
    if (timeLeft <= 0) {
      // Hết giờ: tự submit sai
      handleTimeUp();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isAnswered, mode]);

  // Auto-advance sau 2.5s nếu bật
  useEffect(() => {
    if (isAnswered && autoNext) {
      const t = setTimeout(() => handleNextQuestion(), 2500);
      return () => clearTimeout(t);
    }
  }, [isAnswered, autoNext]);

  const currentQ = examQuestions[currentIndex];

  const handleTimeUp = () => {
    if (isAnswered || !currentQ) return;
    setIsAnswered(true);
    setIsCurrentCorrect(false);
    setShowExplanation(true);
    if (mode === 'exam') setWrongCount(prev => prev + 1);
    setStreak(0);
    setAnsweredRecords(prev => [...prev, { q: currentQ, userAns: '(Hết giờ)', isCorrect: false }]);
  };

  // Xử lý nộp câu trả lời
  const handleAnswer = (optionIdx?: number) => {
    if (isAnswered || !currentQ) return;

    let correct = false;
    let userAns: string | number = '';

    if (currentQ.type === 'multiple_choice_1' || currentQ.type === 'true_false') {
      if (optionIdx === undefined) return;
      setSelectedOption(optionIdx);
      correct = optionIdx === currentQ.correctAnswer;
      userAns = optionIdx;
    } else if (currentQ.type === 'short_answer') {
      if (!textInput.trim()) return;
      correct = checkShortAnswer(textInput, currentQ);
      userAns = textInput.trim();
    }

    setIsAnswered(true);
    setIsCurrentCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
      // Tính speed bonus
      let bonusJade = 0; let bonusGold = 0;
      if (timeLeft >= 25) { bonusJade = 15; bonusGold = 200; } // ≪5s
      else if (timeLeft >= 15) { bonusJade = 8; bonusGold = 100; } // 6–15s
      if (bonusJade > 0) setSpeedBonus(prev => ({ jade: prev.jade + bonusJade, gold: prev.gold + bonusGold }));
    } else {
      setStreak(0);
      if (mode === 'exam') {
        setWrongCount(prev => prev + 1);
      }
    }

    setAnsweredRecords(prev => [...prev, { q: currentQ, userAns, isCorrect: correct }]);
  };

  // Chuyển sang câu tiếp theo
  const handleNextQuestion = () => {
    if (currentIndex + 1 >= examQuestions.length) {
      finishGame();
      return;
    }
    setCurrentIndex(prev => prev + 1);
    resetAnswerState();
  };

  // Kết thúc phiên thi và trao thưởng
  const finishGame = () => {
    const pkg = EXAM_PACKAGES[selectedPackageIdx];
    const isPerfect = mode === 'exam' && wrongCount === 0 && score === examQuestions.length;

    // Thưởng cơ bản: jade + gold tỉ lệ với số câu đúng
    const rewardJade = (mode === 'exam'
      ? score * pkg.rewardJadePerQ + (isPerfect ? pkg.bonusJade : 0)
      : score * 10) + speedBonus.jade;
    const rewardGold = (mode === 'exam' ? score * pkg.rewardGoldPerQ : score * 200) + speedBonus.gold;
    // Thưởng vé quân đoàn chỉ khi hoàn hảo trong chế độ thi
    const rewardTickets = isPerfect ? pkg.rewardTickets : 0;
    // Điểm bảng vàng Khoa Cử (chỉ cộng trong chế độ thi)
    const rewardScore = mode === 'exam' ? score * 10 : 0;

    setPlayer(prev => ({
      ...prev,
      jade: (prev.jade || 0) + rewardJade,
      gold: (prev.gold || 0) + rewardGold,
      legionTickets: (prev.legionTickets || 0) + rewardTickets,
      tuHaoSuVietScore: (prev.tuHaoSuVietScore || 0) + rewardScore,
    }));

    setMode('result');
  };

  // ==================== MÀN HÌNH CHỌN GÓI THI ====================
  if (mode === 'exam-select') {
    return (
      <div className="min-h-screen flex flex-col p-4 md:p-8 items-center justify-center relative overflow-x-hidden text-amber-100 font-viet"
           style={{ background: 'radial-gradient(ellipse at 50% 0%, #3d1a00 0%, #0c0500 100%)' }}>
        {/* Tiêu đề */}
        <div className="relative z-10 text-center mb-8">
          <button onClick={() => setMode('menu')} className="absolute -top-2 left-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-amber-300 transition-all cursor-pointer text-sm">
            <Home className="w-4 h-4" /> Quay lại
          </button>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Crown className="w-8 h-8 text-amber-400" />
            <h1 className="font-cinzel text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 uppercase tracking-widest">
              Chọn Gói Khảo Thí
            </h1>
            <Crown className="w-8 h-8 text-amber-400" />
          </div>
          <p className="text-amber-300/70 text-sm font-viet">Phải trả lời đúng tất cả câu, không được sai một câu nào để nhận danh hiệu và phần thưởng</p>
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-amber-400 bg-amber-950/60 px-4 py-2 rounded-full border border-amber-800/50 inline-flex">
            <span>Lượt thi còn lại hôm nay:</span>
            <div className="flex gap-1 ml-1">
              {Array.from({ length: MAX_DAILY_PLAYS }).map((_, i) => (
                <span key={i} className={`w-3.5 h-3.5 rounded-full border-2 ${i < playsToday ? 'bg-stone-700 border-stone-600' : 'bg-amber-400 border-amber-300'}`} />
              ))}
            </div>
            <span className="font-bold text-amber-200">{remainingPlays}/{MAX_DAILY_PLAYS}</span>
          </div>
        </div>

        {/* 3 gói thi */}
        <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-5">
          {EXAM_PACKAGES.map((pkg, idx) => (
            <div
              key={pkg.size}
              onClick={() => setSelectedPackageIdx(idx)}
              className={`relative rounded-2xl overflow-hidden border-2 bg-gradient-to-b ${pkg.color} ${pkg.border} p-6 flex flex-col gap-4 cursor-pointer transition-all hover:-translate-y-1 shadow-lg ${
                selectedPackageIdx === idx
                  ? 'ring-4 ring-amber-400/70 shadow-[0_0_30px_rgba(251,191,36,0.4)] scale-[1.02]'
                  : 'opacity-80 hover:opacity-100'
              }`}
            >
              {/* Huy hiệu được chọn */}
              {selectedPackageIdx === idx && (
                <div className="absolute top-3 right-3 bg-amber-400 text-stone-950 rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              )}

              <div className="text-center">
                <div className="text-5xl mb-2">{pkg.icon}</div>
                <div className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-2 ${pkg.badgeColor}`}>
                  {pkg.title}
                </div>
                <div className="text-3xl font-black text-white">{pkg.size} <span className="text-base font-normal text-amber-300/80">câu</span></div>
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                <p className="text-amber-300/80 text-xs text-center font-viet">{pkg.desc}</p>
                <div className="mt-3 space-y-1.5 text-xs text-stone-300">
                  <div className="flex justify-between">
                    <span>💎 Ngọc/câu đúng</span>
                    <span className="font-bold text-cyan-300">+{pkg.rewardJadePerQ}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🪙 Vàng/câu đúng</span>
                    <span className="font-bold text-yellow-300">+{pkg.rewardGoldPerQ.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/10 pt-1.5">
                    <div className="text-center text-xs text-amber-400/80 mb-1 font-viet">🏆 Thưởng hoàn hảo (0 sai)</div>
                    <div className="flex justify-between">
                      <span>🎫 Vé Quân Đoàn</span>
                      <span className="font-black text-amber-300">+{pkg.rewardTickets}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>💎 Ngọc thưởng</span>
                      <span className="font-bold text-cyan-300">+{pkg.bonusJade}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nút vào thi */}
        <button
          onClick={() => startExam(selectedPackageIdx)}
          className="relative z-10 mt-8 px-12 py-4 rounded-2xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-black text-lg uppercase tracking-widest shadow-[0_0_30px_rgba(245,158,11,0.6)] hover:scale-105 transition-all cursor-pointer flex items-center gap-3"
        >
          <Feather className="w-6 h-6" />
          Vào Trường Thi – {EXAM_PACKAGES[selectedPackageIdx].titleVi}
        </button>
        <p className="relative z-10 mt-3 text-xs text-amber-400/60 font-viet">Lưu ý: Mỗi lần bấm vào trường thi sẽ tiêu 1 lượt chơi trong ngày</p>
      </div>
    );
  }

  // ==================== MÀN HÌNH CHÍNH (MENU) ====================
  if (mode === 'menu') {
    return (
      <div className="min-h-screen viet-bg flex flex-col p-4 md:p-8 items-center relative overflow-x-hidden text-amber-100 font-sans">
        {/* Nền cổ phong rực rỡ */}
        <div className="absolute inset-0 bg-radial from-red-950/40 via-stone-950/90 to-black pointer-events-none" />
        
        {/* Thanh tiêu đề đỉnh cao */}
        <div className="relative z-10 w-full max-w-5xl flex items-center justify-between border-b-2 border-amber-600/40 pb-4 mb-8">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-amber-300 transition-all cursor-pointer shadow-lg hover:scale-105"
          >
            <Home className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wider uppercase">Hồi Cung</span>
          </button>

          <div className="text-center">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
              <h1 className="font-cinzel text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 uppercase tracking-widest drop-shadow-[0_2px_12px_rgba(251,191,36,0.6)]">
                Tự Hào Sử Việt
              </h1>
              <Sparkles className="w-6 h-6 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
            </div>
            <p className="text-xs md:text-sm text-amber-300/80 tracking-widest uppercase mt-1 font-viet">
              Trích xuất từ Đại Việt Sử Ký Toàn Thư & Việt Nam Sử Lược
            </p>
          </div>

          <div className="flex items-center gap-3 bg-amber-950/80 px-4 py-2 rounded-xl border border-amber-500/40 shadow-inner">
            <Award className="w-5 h-5 text-yellow-400" />
            <div className="text-right">
              <div className="text-[10px] text-amber-400 uppercase font-bold">Bảo Ngọc</div>
              <div className="text-sm font-black text-yellow-300">{playerState.jade?.toLocaleString() || 0}</div>
            </div>
          </div>
        </div>

        {/* Khung nội dung chính */}
        <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Khảo Thí Trạng Nguyên (Chế độ chính) */}
          <div className="group relative rounded-2xl overflow-hidden border-2 border-amber-500/60 bg-gradient-to-b from-red-950/90 via-stone-900/95 to-black p-6 flex flex-col justify-between shadow-[0_0_30px_rgba(239,68,68,0.25)] hover:shadow-[0_0_45px_rgba(245,158,11,0.4)] transition-all hover:-translate-y-1">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-red-700 flex items-center justify-center mb-4 shadow-lg border border-amber-300">
                <Crown className="w-8 h-8 text-amber-100" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-red-900/80 border border-red-500/50 text-red-300 inline-block mb-2">
                Đại Khoa Cử
              </span>
              <h2 className="text-xl md:text-2xl font-cinzel font-black text-amber-300 mb-2">
                Khảo Thí Trạng Nguyên
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed font-viet mb-4">
                Chọn gói thi 10, 20 hoặc 30 câu. Đỗ trọn vẹn không sai câu nào để nhận danh hiệu <strong className="text-amber-300">Thám Hoa</strong>, <strong className="text-yellow-300">Bảng Nhãn</strong> hoặc <strong className="text-amber-200">Trạng Nguyên</strong> kèm phần thưởng cực phẩm!
              </p>
              <div className="space-y-1.5 border-t border-amber-800/40 pt-3 text-xs text-amber-400/80">
                <div className="flex items-center gap-2">
                  <span className="text-base">&#127988;</span> Gói 10 câu → <span className="text-orange-300 font-bold">Đạt Thám Hoa</span> + 1 Thẻ QD
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">&#128196;</span> Gói 20 câu → <span className="text-yellow-300 font-bold">Đạt Bảng Nhãn</span> + 2 Thẻ QD
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base">&#128081;</span> Gói 30 câu → <span className="text-amber-200 font-bold">Đạt Trạng Nguyên</span> + 3 Thẻ QD
                </div>
              </div>
            </div>

            {/* Thông tin lượt chơi còn lại */}
            <div className="mt-4 flex items-center justify-between text-xs bg-black/30 rounded-lg px-3 py-2 border border-amber-900/50">
              <span className="text-amber-400/80 font-viet">Ửng cử hôm nay</span>
              <div className="flex gap-1">
                {Array.from({ length: MAX_DAILY_PLAYS }).map((_, i) => (
                  <span key={i} className={`w-4 h-4 rounded-full border-2 ${i < playsToday ? 'bg-stone-700 border-stone-600' : 'bg-amber-400 border-amber-300 shadow-[0_0_6px_rgba(251,191,36,0.6)]'}`} />
                ))}
                <span className="ml-2 text-amber-300 font-bold">{remainingPlays}/{MAX_DAILY_PLAYS} lượt</span>
              </div>
            </div>

            <button
              onClick={() => setMode('exam-select')}
              disabled={isOutOfPlays}
              className={`mt-4 w-full py-3.5 rounded-xl font-black tracking-widest uppercase text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
                isOutOfPlays
                  ? 'bg-stone-800 border border-stone-600 text-stone-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-stone-950 shadow-[0_0_20px_rgba(245,158,11,0.5)] cursor-pointer hover:scale-[1.02]'
              }`}
            >
              {isOutOfPlays
                ? <><XCircle className="w-5 h-5" /> Hết lượt hôm nay—Ngày mai tiếp tục</>  
                : <><Feather className="w-5 h-5" /> Chọn Gói Thi</>}
            </button>
          </div>

          {/* Card 2: Luyện Tập Tự Do */}
          <div className="group relative rounded-2xl overflow-hidden border-2 border-amber-600/40 bg-gradient-to-b from-stone-900/90 via-stone-900/95 to-black p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(245,158,11,0.3)] transition-all hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-700 to-stone-800 flex items-center justify-center mb-4 shadow-lg border border-amber-500/40">
                <BookOpen className="w-8 h-8 text-amber-300" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-900/60 border border-amber-600/40 text-amber-300 inline-block mb-2">
                Ôn Luyện Sử Học
              </span>
              <h2 className="text-xl md:text-2xl font-cinzel font-black text-amber-300 mb-2">
                Luyện Thi Hương
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed font-viet mb-4">
                Tự do trau dồi kiến thức theo từng triều đại lịch sử. Không áp lực thời gian, không giới hạn sinh mệnh, xem ngay lời bình sử liệu sâu sắc sau mỗi câu.
              </p>
              
              {/* Lựa chọn thời kỳ */}
              <div className="mb-4">
                <label className="text-xs font-bold text-amber-400 block mb-1.5 uppercase">Chọn thời kỳ:</label>
                <select 
                  value={activeEra}
                  onChange={(e) => setActiveEra(e.target.value)}
                  className="w-full bg-stone-950 border border-amber-600/50 rounded-lg px-3 py-2 text-xs text-amber-200 focus:outline-none focus:border-amber-400"
                >
                  {eras.map(e => (
                    <option key={e} value={e}>{e}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={() => startPractice(activeEra)}
              className="mt-4 w-full py-3.5 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/60 text-amber-200 font-bold tracking-widest uppercase text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <Compass className="w-5 h-5" /> Bắt Đầu Luyện
            </button>
          </div>

          {/* Card 3: Thư Viện Sử Liệu */}
          <div className="group relative rounded-2xl overflow-hidden border-2 border-stone-700/60 bg-gradient-to-b from-stone-900/80 via-stone-900/90 to-black p-6 flex flex-col justify-between shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_35px_rgba(217,119,6,0.25)] transition-all hover:-translate-y-1">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-stone-800 to-amber-950 flex items-center justify-center mb-4 shadow-lg border border-amber-700/40">
                <Library className="w-8 h-8 text-amber-400" />
              </div>
              <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-stone-800 border border-stone-600 text-stone-300 inline-block mb-2">
                Chính Sử Điển Tích
              </span>
              <h2 className="text-xl md:text-2xl font-cinzel font-black text-amber-300 mb-2">
                Điển Tích & Danh Ngôn
              </h2>
              <p className="text-sm text-stone-300 leading-relaxed font-viet mb-4">
                Tra cứu trọn vẹn ngân hàng câu hỏi, danh nhân, chiến tích và các lời bình nguyên bản của sử quan Ngô Sĩ Liên và học giả Trần Trọng Kim.
              </p>
              <div className="text-xs text-amber-400/70 border-t border-stone-800 pt-3">
                Tổng cộng <strong>{SU_VIET_QUESTIONS.length}</strong> sử tích & câu hỏi tinh hoa đã được biên soạn.
              </div>
            </div>

            <button
              onClick={() => setMode('library')}
              className="mt-6 w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 border border-stone-600 text-stone-200 font-bold tracking-widest uppercase text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              <ScrollText className="w-5 h-5" /> Mở Kho Sử Liệu
            </button>
          </div>

        </div>

        {/* Lời tựa trích dẫn hào hùng dưới đáy */}
        <div className="relative z-10 w-full max-w-3xl mt-12 text-center p-4 rounded-xl border border-amber-900/40 bg-black/40 backdrop-blur-sm">
          <p className="text-xs md:text-sm text-amber-300/80 italic font-viet leading-relaxed">
            "Dân ta phải biết sử ta / Cho tường gốc tích nước nhà Việt Nam."
          </p>
          <span className="text-[11px] text-amber-500/70 uppercase tracking-widest font-bold mt-1 block">
            — Chủ tịch Hồ Chí Minh
          </span>
        </div>
      </div>
    );
  }

  // ==================== MÀN HÌNH THƯ VIỆN SỬ LIỆU ====================
  if (mode === 'library') {
    const filteredQuestions = SU_VIET_QUESTIONS.filter(q => {
      const kw = searchKeyword.toLowerCase().trim();
      if (!kw) return true;
      return q.question.toLowerCase().includes(kw) || 
             q.explanation.toLowerCase().includes(kw) ||
             q.era.toLowerCase().includes(kw) ||
             String(q.correctAnswer).toLowerCase().includes(kw);
    });

    return (
      <div className="min-h-screen viet-bg flex flex-col p-4 md:p-8 items-center text-amber-100 font-sans">
        <div className="w-full max-w-5xl flex items-center justify-between border-b-2 border-amber-600/40 pb-4 mb-6">
          <button 
            onClick={() => setMode('menu')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/80 hover:bg-amber-900 border border-amber-500/50 text-amber-300 transition-all cursor-pointer"
          >
            <Home className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wider uppercase">Quay Lại</span>
          </button>
          <h1 className="font-cinzel text-xl md:text-3xl font-black text-amber-300 uppercase tracking-widest">
            Kho Tàng Điển Tích
          </h1>
          <div className="text-xs text-amber-400/80 font-viet">
            {filteredQuestions.length} Mục Sử Liệu
          </div>
        </div>

        {/* Ô tìm kiếm */}
        <div className="w-full max-w-5xl mb-6">
          <input 
            type="text"
            placeholder="Tìm kiếm theo tên anh hùng, trận đánh, triều đại, sự kiện..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full bg-stone-950/90 border-2 border-amber-600/60 rounded-xl px-4 py-3 text-sm text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 shadow-inner"
          />
        </div>

        {/* Danh sách thẻ sử liệu */}
        <div className="w-full max-w-5xl space-y-4 max-h-[75vh] overflow-y-auto pr-2">
          {filteredQuestions.map((q, idx) => (
            <div key={q.id || idx} className="rounded-xl border border-amber-700/50 bg-stone-900/80 p-5 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-950 border border-amber-600/50 text-amber-300">
                  {q.era}
                </span>
                <span className="text-xs text-amber-500/80 font-viet">
                  Nguồn: {q.source}
                </span>
              </div>
              <h3 className="text-base md:text-lg font-bold text-amber-200 mb-3">
                {idx + 1}. {q.question}
              </h3>
              <div className="bg-black/50 rounded-lg p-3 border-l-4 border-amber-500 mb-3">
                <span className="text-xs text-amber-400 font-bold uppercase block mb-1">
                  Đáp Án Chuẩn Xác:
                </span>
                <span className="text-sm font-semibold text-yellow-300">
                  {q.type === 'multiple_choice_1' && q.options ? q.options[Number(q.correctAnswer)] : 
                   q.type === 'true_false' ? (q.correctAnswer === 0 ? 'ĐÚNG' : 'SAI') : 
                   q.correctAnswer}
                </span>
              </div>
              <div className="text-xs md:text-sm text-stone-300 font-viet leading-relaxed bg-amber-950/30 p-3 rounded-lg border border-amber-900/40">
                <strong className="text-amber-400">Sử liệu chú giải:</strong> {q.explanation}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ==================== MÀN HÌNH LÀM BÀI (THI / LUYỆN TẬP) ====================
  if (mode === 'exam' || mode === 'practice') {
    if (!currentQ) {
      return (
        <div className="min-h-screen viet-bg flex flex-col items-center justify-center p-4">
          <p className="text-amber-300 text-lg mb-4">Không còn câu hỏi nào trong bộ đề!</p>
          <button onClick={() => setMode('menu')} className="px-6 py-2 bg-amber-600 rounded-lg text-black font-bold">
            Trở Về
          </button>
        </div>
      );
    }

    const currentTitle = getExamTitle(score);

    return (
      <div className="min-h-screen viet-bg flex flex-col p-4 md:p-8 items-center text-amber-100 font-sans relative overflow-x-hidden">
        {/* Nền hiệu ứng hoàng gia */}
        <div className="absolute inset-0 bg-radial from-red-950/30 via-stone-950/90 to-black pointer-events-none" />

        {/* Thanh trạng thái kỳ thi */}
        <div className="relative z-10 w-full max-w-4xl flex items-center justify-between border-b-2 border-amber-600/40 pb-4 mb-6">
          <button 
            onClick={() => {
              if (window.confirm("Bệ hạ có chắc chắn muốn rời trường thi? Tiến trình hiện tại sẽ kết thúc.")) {
                setMode('menu');
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-900 border border-amber-600/40 text-stone-300 hover:text-amber-300 text-xs font-bold uppercase transition-all"
          >
            <Home className="w-4 h-4" /> Bỏ Cuộc
          </button>

          {/* Phẩm hàm thi cử (Chỉ hiện khi thi) */}
          {mode === 'exam' ? (
            <div className="flex items-center gap-2">
              <Crown className="w-5 h-5 text-amber-400" />
              <div className="text-center">
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest block">Danh Vị</span>
                <span className="font-cinzel font-black text-sm text-yellow-300 uppercase">{currentTitle.title}</span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <span className="font-cinzel font-bold text-sm text-amber-400 uppercase">Luyện Thi Hương</span>
            </div>
          )}

          {/* Số câu sai (chỉ trong chế độ exam) */}
          <div className="flex items-center gap-4">
            {mode === 'exam' && (
              <div className="flex items-center gap-2 bg-red-950/80 border border-red-500/50 px-3 py-1 rounded-full text-xs">
                <XCircle className="w-4 h-4 text-red-400" />
                <span className={`font-black ${wrongCount > 0 ? 'text-red-400' : 'text-stone-400'}`}>
                  {wrongCount} sai
                </span>
                {wrongCount === 0 && <span className="text-emerald-400 text-[10px] ml-1">✓ Hoàn hảo!</span>}
              </div>
            )}

            {/* Timer 30s */}
            {!isAnswered && (
              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border-2 font-black text-sm transition-all ${
                timeLeft <= 5 ? 'bg-red-950/80 border-red-500 text-red-300' :
                timeLeft <= 10 ? 'bg-orange-950/80 border-orange-500 text-orange-300' :
                'bg-stone-900/80 border-amber-600/50 text-amber-300'
              }`}>
                ⏱ {timeLeft}s
              </div>
            )}

            {/* Toggle tự chuyển câu */}
            <label className="flex items-center gap-1.5 cursor-pointer select-none text-stone-400 hover:text-amber-400 transition-colors">
              <div
                onClick={() => setAutoNext(v => !v)}
                className={`relative w-9 h-5 rounded-full transition-colors ${autoNext ? 'bg-amber-600' : 'bg-stone-700'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${autoNext ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </div>
              <span className="text-[10px] uppercase font-bold">Tự chuyển</span>
            </label>

            {/* Điểm số */}
            <div className="bg-amber-950/80 border border-amber-500/50 px-3 py-1 rounded-xl text-center">
              <span className="text-[10px] text-amber-400 block font-bold">ĐÚNG</span>
              <span className="font-black text-amber-200 text-sm">{score} / {examQuestions.length}</span>
            </div>
          </div>
        </div>

        {/* Thanh tiến độ câu hỏi */}
        <div className="relative z-10 w-full max-w-4xl mb-2">
          <div className="flex justify-between text-xs text-amber-400/80 mb-1.5 font-bold uppercase">
            <span>Câu Hỏi {currentIndex + 1} / {examQuestions.length}</span>
            <span className="text-amber-500">{currentQ.era}</span>
          </div>
          <div className="w-full h-2 bg-stone-900 rounded-full overflow-hidden border border-amber-900/60">
            <div 
              className="h-full bg-gradient-to-r from-amber-600 to-yellow-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / examQuestions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Thanh timer */}
        {!isAnswered && (
          <div className="relative z-10 w-full max-w-4xl mb-4">
            <div className="w-full h-1.5 bg-stone-900 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${
                  timeLeft <= 5 ? 'bg-red-500' : timeLeft <= 10 ? 'bg-orange-400' : 'bg-emerald-500'
                }`}
                style={{ width: `${(timeLeft / 30) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Khung câu hỏi hoàng gia */}
        <div className="relative z-10 w-full max-w-4xl rounded-2xl border-2 border-amber-500/60 bg-gradient-to-b from-stone-900/95 via-stone-900/90 to-black p-6 md:p-8 shadow-[0_0_40px_rgba(0,0,0,0.8)] mb-6">
          
          {/* Huy hiệu loại câu hỏi */}
          <div className="flex items-center justify-between mb-4 border-b border-amber-800/40 pb-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-950 border border-amber-500/40 text-amber-300">
              {currentQ.type === 'multiple_choice_1' ? 'Trắc Nghiệm 4 Lựa Chọn' : 
               currentQ.type === 'true_false' ? 'Nhận Định Đúng / Sai' : 
               'Điền Ngắn: Tên Nhân Vật Lịch Sử'}
            </span>
            <span className="text-xs text-amber-400/70 font-viet">
              Nguồn: {currentQ.source}
            </span>
          </div>

          {/* Nội dung câu hỏi */}
          <h2 className="text-lg md:text-2xl font-viet font-bold text-amber-100 leading-relaxed mb-6">
            {currentQ.question}
          </h2>

          {/* ================= DẠNG 1 & 3: TRẮC NGHIỆM / ĐÚNG SAI ================= */}
          {(currentQ.type === 'multiple_choice_1' || currentQ.type === 'true_false') && (
            <div className={`grid gap-3.5 ${currentQ.type === 'true_false' ? 'grid-cols-2' : 'grid-cols-1 md:grid-cols-2'}`}>
              {(currentQ.options || (currentQ.type === 'true_false' ? ['Đúng', 'Sai'] : [])).map((opt, idx) => {
                let btnStyle = 'border-amber-700/50 bg-stone-950/80 hover:bg-amber-950/50 text-stone-200 hover:border-amber-400';
                
                if (isAnswered) {
                  if (idx === currentQ.correctAnswer) {
                    btnStyle = 'border-emerald-500 bg-emerald-950/90 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.4)] scale-[1.01]';
                  } else if (idx === selectedOption) {
                    btnStyle = 'border-red-500 bg-red-950/90 text-red-200 shadow-[0_0_20px_rgba(239,68,68,0.4)]';
                  } else {
                    btnStyle = 'opacity-40 border-stone-800 bg-stone-950 text-stone-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleAnswer(idx)}
                    className={`p-4 rounded-xl border-2 text-left font-viet text-sm md:text-base transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <span className="w-7 h-7 rounded-lg bg-black/60 border border-amber-500/40 flex items-center justify-center font-bold text-xs text-amber-300 shrink-0 mt-0.5">
                      {currentQ.type === 'true_false' ? (idx === 0 ? '✓' : '✗') : String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 leading-snug">{opt}</span>
                    {isAnswered && idx === currentQ.correctAnswer && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctAnswer && (
                      <XCircle className="w-6 h-6 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* ================= DẠNG 2: ĐIỀN NGẮN TÊN NHÂN VẬT ================= */}
          {currentQ.type === 'short_answer' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-600/30 text-xs text-amber-300/90 font-viet leading-relaxed">
                💡 <strong>Gợi ý thi cử:</strong> Chỉ cần nhập chính xác họ tên hoặc tước hiệu của nhân vật (chấp nhận cả có dấu hoặc không dấu, ví dụ: <em>Trần Hưng Đạo</em> hoặc <em>Tran Quoc Tuan</em>).
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  disabled={isAnswered}
                  placeholder="Nhập tên nhân vật lịch sử..."
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isAnswered && textInput.trim()) {
                      handleAnswer();
                    }
                  }}
                  className="flex-1 bg-stone-950 border-2 border-amber-600/60 rounded-xl px-4 py-3.5 text-base md:text-lg text-amber-100 placeholder-stone-500 focus:outline-none focus:border-amber-400 shadow-inner"
                />
                {!isAnswered && (
                  <button
                    onClick={() => handleAnswer()}
                    disabled={!textInput.trim()}
                    className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 disabled:opacity-40 disabled:cursor-not-allowed text-stone-950 font-black tracking-wider uppercase text-sm shadow-md transition-all cursor-pointer"
                  >
                    Nộp Bài
                  </button>
                )}
              </div>

              {isAnswered && (
                <div className={`p-4 rounded-xl border-2 flex items-center justify-between ${isCurrentCorrect ? 'border-emerald-500 bg-emerald-950/80 text-emerald-200' : 'border-red-500 bg-red-950/80 text-red-200'}`}>
                  <div>
                    <span className="text-xs uppercase font-bold block">
                      {isCurrentCorrect ? 'Chính xác tuyệt đối!' : 'Chưa chính xác!'}
                    </span>
                    <span className="text-base font-bold">
                      Đáp án: <span className="underline text-yellow-300">{currentQ.correctAnswer}</span>
                    </span>
                  </div>
                  {isCurrentCorrect ? <CheckCircle2 className="w-8 h-8 text-emerald-400" /> : <XCircle className="w-8 h-8 text-red-400" />}
                </div>
              )}
            </div>
          )}

          {/* ================= KHUNG LỜI BÌNH SỬ LIỆU (HIỆN SAU KHI TRẢ LỜI) ================= */}
          {showExplanation && (
            <div className="mt-6 p-5 rounded-xl border border-amber-600/50 bg-black/60 backdrop-blur-md animate-fadeIn">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                  <ScrollText className="w-4 h-4 text-amber-400" /> Lời Bình & Sử Liệu Gốc:
                </span>
                <span className="text-[11px] text-amber-500/80 font-viet">
                  {currentQ.source}
                </span>
              </div>
              <p className="text-sm md:text-base text-stone-200 font-viet leading-relaxed">
                {currentQ.explanation}
              </p>

              {/* Nút sang câu kế tiếp */}
              <div className="mt-5 flex justify-between items-center">
                {autoNext ? (
                  <span className="text-xs text-amber-400/80 font-bold animate-pulse">⏱ Tự chuyển sau 2.5 giây...</span>
                ) : (
                  <div />
                )}
                {!autoNext && (
                  <button
                    onClick={handleNextQuestion}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-black tracking-widest uppercase text-sm shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
                  >
                    <span>{currentIndex + 1 >= examQuestions.length ? 'Xem Sắc Phong' : 'Câu Kế Tiếp'}</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ==================== MÀN HÌNH KẾT QUẢ / SẮC PHONG ====================
  if (mode === 'result') {
    const pkg = EXAM_PACKAGES[selectedPackageIdx];
    const isPerfect = wrongCount === 0 && score === examQuestions.length && examQuestions.length > 0;
    const accuracy = examQuestions.length > 0 ? Math.round((score / examQuestions.length) * 100) : 0;

    // Tính lại phần thưởng để hiển thị (khớp với finishGame)
    const displayJade = score * pkg.rewardJadePerQ + (isPerfect ? pkg.bonusJade : 0);
    const displayGold = score * pkg.rewardGoldPerQ;
    const displayTickets = isPerfect ? pkg.rewardTickets : 0;

    // Danh hiệu hiển thị
    const titleInfo = isPerfect
      ? { label: pkg.title, icon: pkg.icon, color: 'text-amber-200', border: 'border-amber-400', bg: 'bg-amber-950/80', desc: `Xuất sắc! Trả lời đúng toàn bộ ${pkg.size} câu, không sai một câu nào!` }
      : { label: 'CHƯA ĐỖ', icon: '📝', color: 'text-stone-300', border: 'border-stone-500', bg: 'bg-stone-900/80', desc: `Bạn cần trả lời đúng tất cả ${pkg.size} câu để đạt danh hiệu ${pkg.titleVi}.` };

    return (
      <div className="min-h-screen viet-bg flex flex-col p-4 md:p-8 items-center justify-center text-amber-100 font-viet relative overflow-x-hidden">
        <div className="absolute inset-0 bg-radial from-red-950/40 via-stone-950/95 to-black pointer-events-none" />

        {/* Khung Sắc phong Hoàng Gia */}
        <div className="relative z-10 w-full max-w-2xl rounded-3xl border-4 border-amber-500/80 bg-gradient-to-b from-red-950 via-stone-900 to-black p-6 md:p-10 shadow-[0_0_60px_rgba(245,158,11,0.3)] text-center">
          
          <Crown className="w-16 h-16 text-yellow-400 mx-auto mb-3 animate-bounce" style={{ animationDuration: '2s' }} />
          
          <span className="text-xs uppercase tracking-widest text-amber-400 font-bold block mb-1">
            BẢNG VÀNG KHOA CỬ ĐẠI VIỆT
          </span>
          <h2 className="text-2xl md:text-4xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 uppercase tracking-widest mb-2">
            Sắc Phong Vinh Danh
          </h2>
          <p className="text-xs text-amber-400/60 mb-4 font-viet">Gói thi: {pkg.titleVi} ({pkg.size} câu)</p>

          {/* Huy hiệu danh vị */}
          <div className={`my-4 py-4 px-6 rounded-2xl border-2 inline-block ${titleInfo.border} ${titleInfo.bg}`}>
            <div className="text-4xl mb-1">{titleInfo.icon}</div>
            <span className="text-xs uppercase tracking-widest text-amber-300/80 font-bold block mb-1">
              {isPerfect ? 'Đạt Danh Hiệu' : 'Kết Quả'}
            </span>
            <span className={`text-2xl md:text-3xl font-black font-cinzel tracking-wider block ${titleInfo.color}`}>
              {titleInfo.label}
            </span>
            <p className="text-xs mt-2 text-stone-300 font-viet italic max-w-xs mx-auto">
              {titleInfo.desc}
            </p>
          </div>

          {/* Banner hoàn hảo */}
          {isPerfect && (
            <div className="my-3 py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-400/20 to-amber-500/20 border border-amber-400/50 flex items-center justify-center gap-2 text-sm text-amber-200 font-bold animate-pulse">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              HOÀN HẢO — Nhận thưởng Vé Quân Đoàn đặc biệt!
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
          )}

          {/* Thống kê điểm */}
          <div className="grid grid-cols-3 gap-3 my-4">
            <div className="bg-black/60 rounded-xl p-3 border border-emerald-600/40">
              <span className="text-xs text-emerald-400 uppercase font-bold block mb-1">Câu Đúng</span>
              <span className="text-2xl font-black text-emerald-400">{score}</span>
              <span className="text-xs text-stone-400"> / {examQuestions.length}</span>
            </div>
            <div className="bg-black/60 rounded-xl p-3 border border-red-600/40">
              <span className="text-xs text-red-400 uppercase font-bold block mb-1">Câu Sai</span>
              <span className="text-2xl font-black text-red-400">{wrongCount}</span>
            </div>
            <div className="bg-black/60 rounded-xl p-3 border border-amber-600/40">
              <span className="text-xs text-amber-400 uppercase font-bold block mb-1">Chính Xác</span>
              <span className="text-2xl font-black text-amber-300">{accuracy}%</span>
            </div>
          </div>

          {/* Phần thưởng nhận được */}
          <div className="bg-amber-950/40 border border-amber-500/50 rounded-2xl p-4 my-4 text-left">
            <span className="text-xs uppercase font-bold text-amber-300 tracking-wider block mb-3 text-center">
              🎁 Triều Đình Ban Thưởng
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center">
              <div className="bg-black/50 p-2.5 rounded-lg border border-cyan-800/40">
                <span className="text-[10px] text-cyan-400 uppercase block font-bold">Bảo Ngọc</span>
                <span className="text-base font-black text-cyan-300">+{displayJade}</span>
                {isPerfect && <span className="text-[9px] text-amber-400 block">(+{pkg.bonusJade} thưởng)</span>}
              </div>
              <div className={`bg-black/50 p-2.5 rounded-lg border ${isPerfect ? 'border-amber-500/60' : 'border-stone-700/40'}`}>
                <span className="text-[10px] text-amber-400 uppercase block font-bold">Vé Quân Đoàn</span>
                <span className={`text-base font-black ${isPerfect ? 'text-amber-300' : 'text-stone-500'}`}>
                  {isPerfect ? `+${displayTickets}` : '—'}
                </span>
                {!isPerfect && <span className="text-[9px] text-stone-500 block">Cần hoàn hảo</span>}
              </div>
              <div className="bg-black/50 p-2.5 rounded-lg border border-yellow-800/40">
                <span className="text-[10px] text-yellow-400 uppercase block font-bold">Vàng Lương</span>
                <span className="text-base font-black text-yellow-300">+{displayGold.toLocaleString()}</span>
              </div>
              <div className="bg-black/50 p-2.5 rounded-lg border border-orange-800/40 flex flex-col justify-center">
                <span className="text-[10px] text-orange-400 uppercase block font-bold">Điểm Khoa Cử</span>
                <span className="text-base font-black text-orange-300">+{score * 10}</span>
                <span className="text-[9px] text-orange-400/80 block">Để xếp hạng bảng vàng</span>
              </div>
            </div>
          </div>

          {/* Các nút hành động */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-4">
            {remainingPlays > 0 ? (
              <button
                onClick={() => setMode('exam-select')}
                className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-stone-950 font-black tracking-wider uppercase text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Ứng Thí Lại ({remainingPlays} lượt)
              </button>
            ) : (
              <div className="py-3 px-6 rounded-xl bg-stone-800 border border-stone-600 text-stone-500 font-bold text-sm flex items-center gap-2">
                <XCircle className="w-4 h-4" /> Hết lượt hôm nay
              </div>
            )}
            <button
              onClick={() => setMode('menu')}
              className="py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 border border-amber-600/50 text-amber-200 font-bold tracking-wider uppercase text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Home className="w-4 h-4" /> Về Trường Thi
            </button>
          </div>

        </div>
      </div>
    );
  }

  return null;
};
