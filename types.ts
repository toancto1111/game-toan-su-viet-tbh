
export enum Rarity {
  C = 'C',
  R = 'R',
  SR = 'SR',
  SSR = 'SSR',
  UR = 'UR'
}

export interface Artifact {
  id: string;
  name: string;
  description: string;
  price: number;
  bonusAtkPc?: number;
  bonusHpPc?: number;
  bonusDefPc?: number;
  bonusSpdPc?: number;
  bonusAtk?: number;
  bonusDef?: number;
  bonusSpd?: number;
  bonusHp?: number;
  exclusiveTo?: string[]; // IDs of heroes this artifact belongs to (for display in Library)
  image: string;
  effectDesc?: string;
  specialEffect?: 'heal' | 'immune' | 'extra_turn' | 'revive' | 'stun';
  effectChance?: number; // Tỉ lệ phần trăm kích hoạt (0-100)
}

export interface Hero {
  id: string;
  desc?: string;
  name: string;
  title: string;
  rarity: Rarity;
  overall: number;
  atk: number;
  def: number;
  spd: number;
  hp: number;
  maxHp: number;
  morale: number;
  initialMorale: number;
  star: number;
  fragments: number; // Mảnh tướng để nâng sao
  description: string;
  skillName: string;
  skillDesc: string;
  role?: 'Tiên phong' | 'Sát thủ' | 'Hỗ trợ' | 'Khống chế' | 'Chiến tướng' | 'Cung thủ' | 'Pháp sư' | 'Đấu sĩ' | 'Đỡ đòn';
  targetScope?: 'single' | 'front_row' | 'back_row' | 'row' | 'column' | 'all' | 'random2' | 'random3' | 'lowest_hp' | 'highest_hp' | 'highest_atk' | 'lowest_morale' | 'dead_ally';
  // skillEffect: kiểu hiệu ứng tuyệt chiêu đa dạng
  skillEffect?: 
    // Debuff
    | 'stun' | 'freeze' | 'petrify' | 'knockup' | 'silence'
    | 'poison' | 'bleed' | 'burn'
    | 'armor_break' | 'anti_heal' | 'slow' | 'atk_down' | 'def_down' | 'rage_drain'
    | 'taunt' | 'reflect' | 'dispel'
    // Buff
    | 'atk_up' | 'def_up' | 'spd_up' | 'dodge_up' | 'crit_up' | 'cleanse' | 'shield' | 'heal'
    | 'energy_regen' | 'revive' | 'undying' | 'damage_share' | 'lifesteal'
    | 'invincible' | 'immune_cc'
    // Cơ chế đặc biệt
    | 'true_damage' | 'true_dmg' | 'armor_pen' | 'max_hp_dmg' | 'max_hp' | 'splash'
    | 'counter' | 'execute'
    // Visual đặc biệt
    | 'none'; // chỉ gây sát thương thuần túy, không hiệu ứng
  skillEffectChance?: number; // 0-100, xác suất kích hoạt
  skillDmgMult?: number; // Hệ số nhân sát thương (mặc định 12)
  image: string;
  artifactId?: string;
  faction: 'ally' | 'enemy';
  subFaction?: 'mac' | 'le_trinh' | 'nguyen' | 'neutral';
  chapter?: number; 
  isCharmed?: boolean; // Cờ dành cho trạng thái mê hoặc trong chiến đấu
  isPermanent?: boolean; // Tướng vĩnh viễn không bị mất khi qua chương
  isArtifact?: boolean; // Cờ dành cho kỹ năng hoặc vật phẩm
  skillVideoUrl?: string; // Đường dẫn video tuyệt chiêu (nếu có)
}

export interface PlayerState {
  playerName: string;
  legionName: string;
  gold: number;
  normalTickets: number;
  premiumTickets: number;
  artifactTickets?: number;
  legionTickets?: number;
  upgradePills?: number; // Dan nâng sao
  pills?: Record<string, number>;
  permArtifacts: string[];
  jade: number;
  inventory: Hero[];
  artifacts?: string[];
  lineup: (string | null)[];
  permLineup?: (string | null)[];
  currentChapter: number;
  progress: Record<number, number>;
  mathProgress: Record<string, number>;
  seenMathQuestions: string[];
  heroTrialProgress?: number;
  trialHistory?: TrialRecord[];
  ch9Faction?: string;
  avatarId?: string;
  suVietDailyPlays?: number;    // Số lượt đã chơi Tự Hào Sử Việt hôm nay
  suVietLastPlayDate?: string;  // Ngày chơi cuối (YYYY-MM-DD)
  suVietSeenQuestions?: string[]; // Danh sách ID câu hỏi đã gặp
  suVietSeenResetDate?: string;   // Ngày reset danh sách câu hỏi đã gặp (thường là sau 7 ngày hoặc T2 hàng tuần)
  tuHaoSuVietScore?: number;      // Điểm xếp hạng Khoa Cử
  fullName?: string;              // Họ và tên thật của học sinh (VD: Nguyễn Văn A)
  className?: string;             // Tên lớp (VD: 6A1, 9B...)
  isGuest?: boolean;              // Cờ đánh dấu tài khoản Khách (không lưu lên Cloud)
  grade?: number;                 // Khối lớp học sinh đang học (6, 7, 8, 9)
  customAvatar?: string;          // Ảnh đại diện tải lên từ máy tính (Data URL/Base64)
  username?: string;              // Tên tài khoản đăng nhập

  // === HỆ THỐNG TIẾN TRÌNH MỞ KHÓA ===
  unlockedChapters?: number[];            // Danh sách chương đã mở (mặc định [1])
  tuLuyenCorrectIds?: Record<string, string[]>; // { lessonId: [questionId,...] } - câu đã trả lời đúng
  tuLuyenUnlockedLessons?: string[];      // Danh sách lessonId đã mở (mặc định ['B1'])
  mathCorrectQuestions?: Record<string, string[]>; // { 'g6-c0-l0': [questionId,...] } - câu đã trả lời đúng trong Kinh Luân Thí Luyện
}

export interface GiftCodeReward {
  itemId: string;
  amount: number;
}

export interface GiftCode {
  code: string;
  rewards: GiftCodeReward[];
  usedBy: string[]; // Danh sách playerName đã sử dụng code này
  expiresAt?: number; // Timestamp hết hạn (ms)
  allowedPlayers?: string[]; // Danh sách playerName được phép dùng (nếu để trống = công khai)
  isPrivate?: boolean; // true = chỉ tài khoản trong allowedPlayers mới dùng được
}

export interface TrialRecord {
  id: string;
  username: string; // Tên đăng nhập của người chơi
  timestamp: number;
  grade: number;
  packageSize: number; // Gói câu hỏi đã chọn (ví dụ: 5, 10, 30)
  questions: {
    questionText: string;
    options: string[];
    userAnswer: string | number | null;
    correctAnswer: string | number;
    isCorrect: boolean;
    timeTakenSeconds: number; // Thời gian trả lời câu hỏi đó
  }[];
}

export interface Question {
  id: string;
  grade: number;
  chapter: number;
  lesson?: number | string;
  level?: string;
  type?: 'true_false' | 'multiple_choice_1' | 'multiple_choice' | 'short_answer';
  question: string;
  imageUrl?: string;
  options: string[];
  correctAnswer: number | string;
  explanation?: string;
  explanationImageUrl?: string;
}

export interface Synergy {
  id: string;
  name: string;
  heroIds: string[]; // Các ID tướng cần thiết để kích hoạt
  description: string;
  applyEffect: (activeUnits: any[], addLog: (msg: string) => void) => void;
}

export interface LeaderboardEntry {
  uid: string;
  playerName: string;
  legionName: string;
  fullName?: string;
  className?: string;
  avatarUrl?: string;
  grade: number; // 6, 7, 8, 9
  combatPower: number; // Tổng chiến lực 6 tướng mạnh nhất
  knowledgeScore: number; // Điểm Khoa Cử (Toán + Sử)
  trialStage: number; // Cấp ải Thí Luyện cao nhất
  questionsAnswered: number; // Số câu hỏi đã hoàn thành
  studyStreak: number; // Chuỗi ngày học
  topHeroStar: number; // Sao của chủ tướng
  topHeroTitle?: string;
  lineupPreview?: {
    id: string;
    name: string;
    image: string;
    star: number;
    rarity: string;
    overall: number;
  }[];
  isPlayer?: boolean;
  updatedAt?: number;
}

