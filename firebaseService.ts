import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, doc, setDoc, where, getDoc, deleteDoc, onSnapshot, arrayUnion, updateDoc } from "firebase/firestore";
import { GiftCode } from "./types";
import { TrialRecord, LeaderboardEntry, PlayerState } from "./types";

// HƯỚNG DẪN CẤU HÌNH FIREBASE:
// 1. Vào trang https://console.firebase.google.com/ tạo một Project mới.
// 2. Chọn tính năng Firestore Database và tạo một Database (chế độ Test Mode).
// 3. Vào Project Settings -> Đăng ký Web App (biểu tượng </>) để lấy cục Config bên dưới.
// 4. Thay thế đoạn code dưới đây bằng Config thật của bạn.

const firebaseConfig = {
  apiKey: "AIzaSyCIs0VVAH-6OLTPRKtxzb3STyKqPI-xFAM",
  authDomain: "math-and-history-of-vietnam.firebaseapp.com",
  projectId: "math-and-history-of-vietnam",
  storageBucket: "math-and-history-of-vietnam.firebasestorage.app",
  messagingSenderId: "272925500619",
  appId: "1:272925500619:web:b9d23822655f775e89274e",
  measurementId: "G-W92D4476V3"
};

let db: any = null;

try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (error) {
  console.error("Lỗi khởi tạo Firebase:", error);
}

export const saveTrialRecord = async (record: TrialRecord) => {
  if (!db) {
    console.warn("Chưa cấu hình Firebase! Dữ liệu bài làm chưa được đồng bộ lên máy chủ Cloud.");
    return false;
  }
  
  try {
    const docRef = await addDoc(collection(db, "trial_records"), {
      ...record,
      createdAt: new Date().toISOString()
    });
    console.log("Đã lưu kết quả lên Cloud thành công! ID:", docRef.id);
    return true;
  } catch (error) {
    console.error("Lỗi khi lưu lên Cloud:", error);
    return false;
  }
};

export const getAllTrialRecords = async () => {
  if (!db) {
    alert("Chưa cấu hình Firebase! Admin vui lòng cấu hình trong file firebaseService.ts để kéo dữ liệu về.");
    return [];
  }
  
  try {
    const q = query(collection(db, "trial_records"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const records: any[] = [];
    querySnapshot.forEach((doc) => {
      records.push({ id: doc.id, ...doc.data() });
    });
    return records;
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu từ Cloud:", error);
    return [];
  }
};

// ==================== BẢNG XẾP HẠNG (LEADERBOARDS) ====================

// Bộ nhớ đệm Client-side để mở BXH tức thì (0.05s) không bị chậm
let leaderboardMemoryCache: { timestamp: number; data: LeaderboardEntry[] } | null = null;
const CACHE_DURATION_MS = 2 * 60 * 1000; // 2 phút

/**
 * Đồng bộ dữ liệu người chơi lên bảng xếp hạng Firestore
 */
export const syncPlayerToLeaderboard = async (entry: LeaderboardEntry): Promise<boolean> => {
  // 1. Luôn cập nhật vào LocalStorage trước để đảm bảo mượt mà offline
  try {
    const localStore = JSON.parse(localStorage.getItem("sv_leaderboard_my_entry") || "null") || {};
    localStorage.setItem("sv_leaderboard_my_entry", JSON.stringify({ ...localStore, ...entry, updatedAt: Date.now() }));
  } catch (e) {
    console.warn("Lỗi lưu local entry:", e);
  }

  if (!db) {
    return false;
  }
  if (entry.uid && entry.uid.startsWith('guest_')) return false;

  // Không xếp hạng các tài khoản admin để nhường top cho người chơi
  const safeName = (entry.playerName || entry.uid || "").toLowerCase();
  if (safeName === 'admin' || safeName === 'tmt') {
      return false;
  }

  try {
    const safeId = (entry.uid || entry.playerName || "player").toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const docRef = doc(db, "leaderboards", safeId);
    await setDoc(docRef, {
      ...entry,
      updatedAt: Date.now()
    }, { merge: true });
    
    // Invalidate cache để lần sau kéo dữ liệu mới
    leaderboardMemoryCache = null;
    return true;
  } catch (error) {
    console.error("Lỗi đồng bộ lên Leaderboard Cloud:", error);
    return false;
  }
};

/**
 * Lấy danh sách Bảng Xếp Hạng từ Cloud Firestore
 * Hỗ trợ lọc theo Khối Lớp (grade) và Hạng mục (category)
 */
export const fetchOnlineLeaderboard = async (
  category: 'knowledge' | 'combat' | 'trial' | 'diligent',
  gradeFilter?: number
): Promise<LeaderboardEntry[]> => {
  let entries: LeaderboardEntry[] = [];

  // Thử kéo từ Firebase nếu có kết nối
  if (db) {
    try {
      // Kiểm tra cache bộ nhớ
      if (leaderboardMemoryCache && (Date.now() - leaderboardMemoryCache.timestamp < CACHE_DURATION_MS)) {
        entries = leaderboardMemoryCache.data;
      } else {
        const q = query(
          collection(db, "leaderboards"),
          limit(150)
        );
        const querySnapshot = await getDocs(q);
        const fetched: LeaderboardEntry[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data() as LeaderboardEntry;
          const safeName = (data.playerName || data.uid || "").toLowerCase();
          if (safeName !== 'admin' && safeName !== 'tmt') {
             fetched.push(data);
          }
        });
        if (fetched.length > 0) {
          entries = fetched;
          leaderboardMemoryCache = { timestamp: Date.now(), data: fetched };
        }
      }
    } catch (err) {
      console.warn("Không thể tải Leaderboard từ Firebase, chuyển sang dữ liệu mô phỏng:", err);
    }
  }

  return entries;
};

/**
 * Xóa trắng toàn bộ Bảng Xếp Hạng trên Cloud Firestore và bộ nhớ đệm
 * (Dùng cho Admin khi chính thức mở cổng game cho học sinh trường tham gia)
 */
export const resetAllLeaderboardRecords = async (): Promise<boolean> => {
  try {
    localStorage.removeItem("sv_leaderboard_my_entry");
    leaderboardMemoryCache = null;
    if (!db) return true;
    
    const q = query(collection(db, "leaderboards"));
    const snapshot = await getDocs(q);
    const deletePromises: Promise<any>[] = [];
    snapshot.forEach((docSnap) => {
      // Lazy import or deleteDoc
      deletePromises.push(setDoc(docSnap.ref, { isDeleted: true, updatedAt: Date.now() }, { merge: true }));
    });
    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.error("Lỗi khi reset Leaderboard:", error);
    return false;
  }
};



// ==================== GIFT CODES (CLOUD) ====================

export const fetchCloudGiftCodes = async (): Promise<GiftCode[]> => {
  if (!db) return [];
  try {
    const q = query(collection(db, "gift_codes"));
    const snapshot = await getDocs(q);
    const codes: GiftCode[] = [];
    snapshot.forEach(docSnap => {
      codes.push(docSnap.data() as GiftCode);
    });
    return codes;
  } catch (error) {
    console.error("Lỗi lấy Giftcode từ Cloud:", error);
    return [];
  }
};

export const saveCloudGiftCode = async (code: GiftCode): Promise<boolean> => {
  if (!db) return false;
  try {
    const docRef = doc(db, "gift_codes", code.code);
    await setDoc(docRef, code);
    return true;
  } catch (error) {
    console.error("Lỗi lưu Giftcode lên Cloud:", error);
    return false;
  }
};

export const deleteCloudGiftCode = async (codeStr: string): Promise<boolean> => {
  if (!db) return false;
  try {
    const docRef = doc(db, "gift_codes", codeStr);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Lỗi xóa Giftcode trên Cloud:", error);
    return false;
  }
};

export const redeemCloudGiftCode = async (codeStr: string, playerName: string): Promise<{ success: boolean; message: string; code?: GiftCode }> => {
  if (!db) return { success: false, message: "Hệ thống Cloud đang bảo trì." };
  try {
    const docRef = doc(db, "gift_codes", codeStr.toUpperCase());
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return { success: false, message: "Code không tồn tại." };
    }
    
    const code = docSnap.data() as GiftCode;
    
    if (code.expiresAt && Date.now() > code.expiresAt) {
      return { success: false, message: "Code đã hết hạn sử dụng." };
    }
    
    // Kiểm tra code có giới hạn tài khoản không
    if (code.isPrivate && code.allowedPlayers && code.allowedPlayers.length > 0) {
      const normalizedAllowed = code.allowedPlayers.map(p => p.toLowerCase().trim());
      const normalizedPlayer = playerName.toLowerCase().trim();
      // So sánh cả username lẫn playerName (để tương thích code cũ)
      if (!normalizedAllowed.includes(normalizedPlayer)) {
        return { success: false, message: "Tài khoản của bạn không có quyền sử dụng mã code đặc biệt này.\n\n(Gợi ý: Nhờ Admin thêm tên tài khoản đăng nhập vào danh sách cho phép)" };
      }
    }
    
    if (code.usedBy && code.usedBy.includes(playerName)) {
      return { success: false, message: "Bạn đã sử dụng code này rồi." };
    }
    
    // Add player to usedBy array
    const updatedUsedBy = [...(code.usedBy || []), playerName];
    const updatedCode = { ...code, usedBy: updatedUsedBy };
    
    await setDoc(docRef, updatedCode);
    
    return { success: true, message: "Nhập code thành công!", code: updatedCode };
  } catch (error) {
    console.error("Lỗi nhập Giftcode:", error);
    return { success: false, message: "Lỗi kết nối máy chủ." };
  }
};

// ==================== TÀI KHOẢN NGƯỜI CHƠI (CLOUD) ====================

/**
 * Đăng ký tài khoản mới lên Cloud Firestore
 * Collection: "accounts" | Doc ID: username (lowercase)
 */
export const saveCloudAccount = async (username: string, passwordHash: string, playerData: any): Promise<boolean> => {
  if (!db) return false;
  try {
    const docRef = doc(db, "accounts", username.toLowerCase());
    await setDoc(docRef, {
      username: username.toLowerCase(),
      passwordHash,
      playerData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    });
    return true;
  } catch (error) {
    console.error("Lỗi tạo tài khoản Cloud:", error);
    return false;
  }
};

/**
 * Lấy thông tin tài khoản từ Cloud Firestore (dùng khi đăng nhập)
 */
export const getCloudAccount = async (username: string): Promise<{ passwordHash: string; playerData: any; updatedAt?: number; isBanned?: boolean; bannedFromChat?: boolean; banReason?: string } | null> => {
  if (!db) return null;
  try {
    const docRef = doc(db, "accounts", username.toLowerCase());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    return { 
      passwordHash: data.passwordHash, 
      playerData: data.playerData,
      updatedAt: data.updatedAt || 0,
      isBanned: !!data.isBanned,
      bannedFromChat: !!data.bannedFromChat,
      banReason: data.banReason || ''
    };
  } catch (error) {
    console.error("Lỗi lấy tài khoản từ Cloud:", error);
    return null;
  }
};

/**
 * Lưu dữ liệu game (tiến độ, vàng, tướng...) lên Cloud sau mỗi hành động quan trọng
 */
export const savePlayerDataToCloud = async (username: string, playerData: any, sessionId?: string): Promise<boolean> => {
  if (!db || playerData?.isGuest || username.startsWith('guest_')) return false;
  try {
    const docRef = doc(db, "accounts", username.toLowerCase());
    await setDoc(docRef, { playerData, updatedAt: Date.now(), ...(sessionId ? { currentSessionId: sessionId } : {}) }, { merge: true });
    return true;
  } catch (error) {
    console.error("Lỗi lưu dữ liệu người chơi lên Cloud:", error);
    return false;
  }
};

// ==================== OFFLINE-FIRST SAVE SYSTEM ====================

/** Kiểm tra Firebase đã sẵn sàng (có kết nối) chưa */
export const isFirebaseReady = (): boolean => !!db;

/**
 * Lưu tiến độ game lên Cloud Firestore — Offline-first.
 * Tự động loại bỏ customAvatar (Base64 ~500KB) để tiết kiệm quota miễn phí.
 */
export const savePlayerProgress = async (
  username: string,
  playerData: PlayerState,
  sessionId?: string
): Promise<boolean> => {
  if (!db || playerData.isGuest || username.startsWith('guest_')) return false;
  try {
    // Strip avatar Base64 để tiết kiệm Firestore quota (~500KB/save)
    const { customAvatar: _ignored, ...safePlayerData } = playerData as any;
    const docRef = doc(db, "accounts", username.toLowerCase());
    await setDoc(
      docRef,
      {
        playerData: safePlayerData,
        updatedAt: Date.now(),
        ...(sessionId ? { currentSessionId: sessionId } : {})
      },
      { merge: true }
    );
    return true;
  } catch (error) {
    console.error("Lỗi lưu tiến độ lên Cloud:", error);
    return false;
  }
};

/**
 * Tải toàn bộ tiến độ game từ Cloud Firestore khi đăng nhập.
 * Ưu tiên Cloud (mới nhất) > localStorage (backup offline).
 * Trả về PlayerState hoặc null nếu không có / lỗi.
 */
export const loadPlayerDataFromCloud = async (
  username: string
): Promise<PlayerState | null> => {
  if (!db) return null;
  try {
    const docRef = doc(db, "accounts", username.toLowerCase());
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    if (!data?.playerData) return null;
    return data.playerData as PlayerState;
  } catch (error) {
    console.error("Lỗi tải tiến độ từ Cloud:", error);
    return null;
  }
};

/**
 * Lắng nghe thay đổi tài khoản từ Cloud để xử lý kick out nếu đăng nhập thiết bị khác
 */
export const listenToAccountSession = (
  username: string,
  currentSessionId: string,
  onKickedOut: () => void
): (() => void) | null => {
  if (!db) return null;
  try {
    const docRef = doc(db, "accounts", username.toLowerCase());
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.currentSessionId && data.currentSessionId !== currentSessionId) {
          // Phát hiện đăng nhập từ nơi khác!
          onKickedOut();
        }
      }
    });
    return unsubscribe;
  } catch (error) {
    console.error("Lỗi lắng nghe session từ Cloud:", error);
    return null;
  }
};

// ==================== ANALYTICS HỌC SINH (CLOUD) ====================

export interface StudentAnalytics {
  username: string;
  fullName: string;
  className: string;
  grade: number;
  totalQuestionsAnswered: number;
  correctAnswers: number;
  accuracy: number; // phần trăm chính xác
  lastSessionAt: number;
  studyStreakDays: number;
  chapterProgress: Record<string, number>; // chapterId: stage đã đạt
  topChapter: number;
  knowledgeScore: number;
  combatPower: number;
  heroCount: number;
  totalGold: number;
  updatedAt: number;
}

/**
 * Cập nhật analytics học sinh lên Cloud (fire-and-forget, không block).
 * Được gọi tự động cùng với savePlayerProgress để giáo viên theo dõi.
 */
export const updateStudentAnalytics = async (
  username: string,
  playerData: PlayerState,
  combatPower?: number
): Promise<void> => {
  if (!db) return;
  try {
    const totalAnswered = Object.values(playerData.mathProgress || {}).reduce((a, b) => a + b, 0);
    const tuLuyenCorrect = Object.values(playerData.tuLuyenCorrectIds || {}).reduce(
      (sum, arr) => sum + (arr?.length || 0),
      0
    );

    const analytics: StudentAnalytics = {
      username: username.toLowerCase(),
      fullName: playerData.fullName || playerData.playerName,
      className: playerData.className || "",
      grade: playerData.grade || 6,
      totalQuestionsAnswered: totalAnswered,
      correctAnswers: tuLuyenCorrect,
      accuracy: totalAnswered > 0 ? Math.round((tuLuyenCorrect / totalAnswered) * 100) : 0,
      lastSessionAt: Date.now(),
      studyStreakDays: (playerData as any).studyStreak || 0,
      chapterProgress: Object.fromEntries(
        Object.entries(playerData.progress || {}).map(([k, v]) => [k, v])
      ),
      topChapter: Math.max(...Object.keys(playerData.progress || { 1: 1 }).map(Number), 1),
      knowledgeScore: playerData.tuHaoSuVietScore || 0,
      combatPower: combatPower || 0,
      heroCount: (playerData.inventory || []).length,
      totalGold: playerData.gold || 0,
      updatedAt: Date.now()
    };

    const docRef = doc(db, "analytics", username.toLowerCase());
    await setDoc(docRef, analytics, { merge: true });
  } catch (error) {
    // Analytics không critical — fail silently để không ảnh hưởng gameplay
    console.warn("Lỗi cập nhật analytics (không ảnh hưởng gameplay):", error);
  }
};

/**
 * Lấy analytics của tất cả học sinh (dành cho Admin/Giáo viên).
 * Có thể filter theo lớp hoặc khối.
 */
export const fetchAllStudentAnalytics = async (
  gradeFilter?: number,
  classFilter?: string
): Promise<StudentAnalytics[]> => {
  if (!db) return [];
  try {
    const q = query(collection(db, "analytics"), orderBy("updatedAt", "desc"));
    const snapshot = await getDocs(q);
    let result: StudentAnalytics[] = [];
    snapshot.forEach(docSnap => {
      result.push(docSnap.data() as StudentAnalytics);
    });
    // Filter client-side (đơn giản, không cần composite index)
    if (gradeFilter) result = result.filter(s => s.grade === gradeFilter);
    if (classFilter) result = result.filter(s => s.className.toUpperCase() === classFilter.toUpperCase());
    return result;
  } catch (error) {
    console.error("Lỗi lấy analytics học sinh:", error);
    return [];
  }
};

// ==================== ĐẤU TRƯỜNG BÁ VƯƠNG (ARENA - RANK SWAP SYSTEM) ====================

/**
 * Lấy danh sách đối thủ có Hạng (Rank) cao hơn người chơi hiện tại một chút
 */
export const getArenaOpponents = async (currentRank: number = 10000, excludeUid: string): Promise<LeaderboardEntry[]> => {
  if (!db) return [];
  try {
    // 1. Tìm những người có rank TỐT HƠN (nhỏ hơn) currentRank, lấy 15 người gần nhất
    let q = query(
      collection(db, "leaderboards"),
      where("arenaRank", "<", currentRank),
      orderBy("arenaRank", "desc"),
      limit(15)
    );
    let snapshot = await getDocs(q);
    
    // Nếu đang là Top 1 (không có ai rank < 1), thì lấy những người xếp ngay sau (rank > 1)
    if (snapshot.empty) {
       q = query(
         collection(db, "leaderboards"),
         where("arenaRank", ">", currentRank),
         orderBy("arenaRank", "asc"),
         limit(15)
       );
       snapshot = await getDocs(q);
    }

    let betterPlayers: LeaderboardEntry[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as LeaderboardEntry;
      // Chỉ lấy những người có setup đội hình thủ và không phải chính mình
      if (data.uid !== excludeUid && data.arenaDefenseFormation && data.arenaDefenseFormation.length > 0) {
        betterPlayers.push(data);
      }
    });

    if (betterPlayers.length < 3) {
      // Fake bot nếu thực sự không có ai (chỉ xảy ra khi DB hoàn toàn trống)
      const fakeBots: LeaderboardEntry[] = [
        { uid: 'bot1', playerName: 'Vô Danh Tiền Bối', grade: 9, combatPower: 50000, knowledgeScore: 0, arenaRank: Math.max(1, currentRank - 10), trialStage: 1, questionsAnswered: 0, studyStreak: 0, topHeroStar: 5 },
        { uid: 'bot2', playerName: 'Ẩn Danh Cao Thủ', grade: 9, combatPower: 45000, knowledgeScore: 0, arenaRank: Math.max(1, currentRank - 50), trialStage: 1, questionsAnswered: 0, studyStreak: 0, topHeroStar: 4 },
        { uid: 'bot3', playerName: 'Huyền Thoại Võ Lâm', grade: 9, combatPower: 60000, knowledgeScore: 0, arenaRank: Math.max(1, currentRank - 100), trialStage: 1, questionsAnswered: 0, studyStreak: 0, topHeroStar: 6 },
      ];
      return fakeBots.slice(0, 3);
    }

    // Lấy 3 người ngẫu nhiên trong danh sách tìm được để tạo sự đa dạng
    const shuffled = betterPlayers.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  } catch (error) {
    console.error("Lỗi lấy đối thủ Đấu Trường:", error);
    return [];
  }
};

/**
 * Đổi hạng (Rank) giữa 2 người chơi khi Kẻ Thách Đấu chiến thắng
 */
export const swapArenaRanks = async (
  challengerUid: string, 
  challengerCurrentRank: number,
  defenderUid: string, 
  defenderCurrentRank: number
): Promise<boolean> => {
  if (!db) return false;
  if (challengerUid.startsWith('guest_')) return false;
  
  try {
    const challengerId = challengerUid.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const challengerRef = doc(db, "leaderboards", challengerId);
    
    // Nếu đánh thắng Bot, chỉ cập nhật rank của bản thân
    if (defenderUid.startsWith('bot')) {
      await setDoc(challengerRef, {
        arenaRank: defenderCurrentRank,
        updatedAt: Date.now()
      }, { merge: true });
      leaderboardMemoryCache = null;
      return true;
    }

    // Nếu đánh thắng người chơi thật, HOÁN ĐỔI RANK
    const defenderId = defenderUid.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const defenderRef = doc(db, "leaderboards", defenderId);

    // Dùng batch hoặc cập nhật song song
    await Promise.all([
      setDoc(challengerRef, { arenaRank: defenderCurrentRank, updatedAt: Date.now() }, { merge: true }),
      setDoc(defenderRef, { arenaRank: challengerCurrentRank, updatedAt: Date.now() }, { merge: true })
    ]);
    
    leaderboardMemoryCache = null;
    return true;
  } catch (error) {
    console.error("Lỗi hoán đổi hạng Đấu Trường:", error);
    return false;
  }
};

// Giữ lại hàm cũ để tránh lỗi tương thích nếu còn gọi ở đâu đó
export const updateArenaScore = async (uid: string, newScore: number): Promise<boolean> => {
  return false; 
};

export const updateArenaDefenseFormation = async (uid: string, playerName: string, formation: any[], currentRank: number): Promise<boolean> => {
  if (!db) return false;
  if (uid.startsWith('guest_')) return false;

  try {
    const safeId = uid.toLowerCase().replace(/[^a-z0-9_-]/g, '_');
    const docRef = doc(db, "leaderboards", safeId);
    await setDoc(docRef, {
      uid: safeId,
      playerName: playerName,
      arenaDefenseFormation: formation,
      arenaRank: currentRank,
      updatedAt: Date.now()
    }, { merge: true });
    
    leaderboardMemoryCache = null;
    return true;
  } catch (error) {
    console.error("Lỗi cập nhật đội hình phòng thủ:", error);
    return false;
  }
};


// ==================== AI CHAT HISTORY & CACHING (CLOUD) ====================

export interface ChatMessage {
  id: string;
  html: string;
  sender: 'user' | 'ai';
  timestamp: number;
}

export interface ChatSession {
  id: string;
  uid: string;
  playerName: string;
  title: string;
  messages: ChatMessage[];
  updatedAt: number;
}

export const saveChatSession = async (session: ChatSession): Promise<boolean> => {
  if (!db || session.uid.startsWith('guest_')) return false;
  try {
    const docRef = doc(db, 'chat_sessions', session.id);
    // Sanitize to remove undefined values (like isStreaming) that Firestore rejects
    const sanitizedSession = JSON.parse(JSON.stringify(session));
    await setDoc(docRef, { ...sanitizedSession, updatedAt: Date.now() }, { merge: true });
    return true;
  } catch (error) {
    console.error('Lỗi lưu lịch sử chat:', error);
    return false;
  }
};

export const getPlayerChatSessions = async (uid: string): Promise<ChatSession[]> => {
  if (!db || uid.startsWith('guest_')) return [];
  try {
    const q = query(collection(db, 'chat_sessions'), where('uid', '==', uid), limit(50));
    const snapshot = await getDocs(q);
    const sessions: ChatSession[] = [];
    snapshot.forEach(docSnap => sessions.push(docSnap.data() as ChatSession));
    // Sort in memory to avoid needing composite index in Firestore
    return sessions.sort((a, b) => b.updatedAt - a.updatedAt);
  } catch (error) {
    console.error('Lỗi lấy lịch sử chat:', error);
    return [];
  }
};

export const getAllChatSessions = async (): Promise<ChatSession[]> => {
  if (!db) return [];
  try {
    const q = query(collection(db, 'chat_sessions'), orderBy('updatedAt', 'desc'), limit(100));
    const snapshot = await getDocs(q);
    const sessions: ChatSession[] = [];
    snapshot.forEach(docSnap => sessions.push(docSnap.data() as ChatSession));
    return sessions;
  } catch (error) {
    console.error('Lỗi lấy tất cả lịch sử chat:', error);
    return [];
  }
};

export const getAICache = async (questionHash: string): Promise<string | null> => {
  if (!db) return null;
  try {
    const docRef = doc(db, 'ai_cache', questionHash);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      await setDoc(docRef, { hits: (docSnap.data().hits || 0) + 1, lastUsedAt: Date.now() }, { merge: true });
      return docSnap.data().answer;
    }
    return null;
  } catch (error) {
    console.error('Lỗi đọc AI Cache:', error);
    return null;
  }
};

export const saveAICache = async (questionHash: string, question: string, answer: string): Promise<void> => {
  if (!db) return;
  try {
    const docRef = doc(db, 'ai_cache', questionHash);
    await setDoc(docRef, { question, answer, hits: 1, createdAt: Date.now(), lastUsedAt: Date.now() }, { merge: true });
  } catch (error) {
    console.error('Lỗi lưu AI Cache:', error);
  }
};

// ================= GLOBAL CHAT (TỐI ƯU CHI PHÍ) & MODERATION =================
export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderGrade: string; // Tên cấp bậc (Tân binh, Thiếu úy...)
  avatar?: string;
  text: string;
  timestamp: number;
}

export interface ModerationRules {
  bannedChatUsers: string[];    // Danh sách username bị cấm chat
  bannedAccounts: string[];     // Danh sách username bị khóa tài khoản
  updatedAt?: number;
}

const GLOBAL_CHAT_ROOM_ID = 'main_room';

/**
 * Lắng nghe danh sách cấm chat & khóa tài khoản theo thời gian thực (1 doc duy nhất)
 */
export const listenToModerationRules = (callback: (rules: ModerationRules) => void) => {
  if (!db) return () => {};
  const docRef = doc(db, 'system_moderation', 'rules');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback({
        bannedChatUsers: (data.bannedChatUsers as string[]) || [],
        bannedAccounts: (data.bannedAccounts as string[]) || [],
        updatedAt: data.updatedAt
      });
    } else {
      callback({ bannedChatUsers: [], bannedAccounts: [] });
    }
  }, (err) => {
    console.error("Lỗi lắng nghe moderation rules:", err);
  });
};

/**
 * Lấy quy tắc kiểm duyệt 1 lần
 */
export const getModerationRules = async (): Promise<ModerationRules> => {
  if (!db) return { bannedChatUsers: [], bannedAccounts: [] };
  try {
    const docRef = doc(db, 'system_moderation', 'rules');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        bannedChatUsers: (data.bannedChatUsers as string[]) || [],
        bannedAccounts: (data.bannedAccounts as string[]) || [],
        updatedAt: data.updatedAt
      };
    }
    return { bannedChatUsers: [], bannedAccounts: [] };
  } catch (e) {
    console.error("Lỗi lấy moderation rules:", e);
    return { bannedChatUsers: [], bannedAccounts: [] };
  }
};

/**
 * Cấm chat hoặc Bỏ cấm chat một tài khoản
 */
export const banUserFromChat = async (rawUsername: string, banned: boolean, reason?: string): Promise<boolean> => {
  if (!db) return false;
  const username = rawUsername.trim().toLowerCase();
  if (!username) return false;
  try {
    const rulesRef = doc(db, 'system_moderation', 'rules');
    const rulesSnap = await getDoc(rulesRef);
    let bannedChatUsers: string[] = [];
    let bannedAccounts: string[] = [];
    if (rulesSnap.exists()) {
      const data = rulesSnap.data();
      bannedChatUsers = (data.bannedChatUsers as string[]) || [];
      bannedAccounts = (data.bannedAccounts as string[]) || [];
    }

    if (banned) {
      if (!bannedChatUsers.includes(username)) bannedChatUsers.push(username);
    } else {
      bannedChatUsers = bannedChatUsers.filter(u => u.toLowerCase() !== username);
    }

    await setDoc(rulesRef, { bannedChatUsers, bannedAccounts, updatedAt: Date.now() }, { merge: true });

    // Đồng bộ vào tài khoản cá nhân
    const accRef = doc(db, 'accounts', username);
    await setDoc(accRef, { bannedFromChat: banned, chatBanReason: reason || '', updatedAt: Date.now() }, { merge: true });

    return true;
  } catch (e) {
    console.error("Lỗi cấm chat:", e);
    return false;
  }
};

/**
 * Khóa hoặc Mở khóa tài khoản hoàn toàn
 */
export const banAccount = async (rawUsername: string, banned: boolean, reason?: string): Promise<boolean> => {
  if (!db) return false;
  const username = rawUsername.trim().toLowerCase();
  if (!username) return false;
  try {
    const rulesRef = doc(db, 'system_moderation', 'rules');
    const rulesSnap = await getDoc(rulesRef);
    let bannedChatUsers: string[] = [];
    let bannedAccounts: string[] = [];
    if (rulesSnap.exists()) {
      const data = rulesSnap.data();
      bannedChatUsers = (data.bannedChatUsers as string[]) || [];
      bannedAccounts = (data.bannedAccounts as string[]) || [];
    }

    if (banned) {
      if (!bannedAccounts.includes(username)) bannedAccounts.push(username);
    } else {
      bannedAccounts = bannedAccounts.filter(u => u.toLowerCase() !== username);
    }

    await setDoc(rulesRef, { bannedChatUsers, bannedAccounts, updatedAt: Date.now() }, { merge: true });

    // Đồng bộ vào tài khoản cá nhân
    const accRef = doc(db, 'accounts', username);
    await setDoc(accRef, { isBanned: banned, banReason: reason || '', updatedAt: Date.now() }, { merge: true });

    return true;
  } catch (e) {
    console.error("Lỗi khóa tài khoản:", e);
    return false;
  }
};

/**
 * Xóa 1 tin nhắn khỏi Kênh Thế Giới
 */
export const deleteGlobalChatMessage = async (messageId: string): Promise<boolean> => {
  if (!db || !messageId) return false;
  try {
    const docRef = doc(db, 'global_chat', GLOBAL_CHAT_ROOM_ID);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return false;
    const currentMessages = (docSnap.data().messages as ChatMessage[]) || [];
    const updatedMessages = currentMessages.filter(m => m.id !== messageId);
    await updateDoc(docRef, { messages: updatedMessages });
    return true;
  } catch (e) {
    console.error("Lỗi xóa tin nhắn chat:", e);
    return false;
  }
};

/**
 * Lắng nghe tin nhắn mới.
 * Dùng Single-Document (1 read) thay vì Collection (100 reads) để siêu tiết kiệm chi phí!
 */
export const listenToGlobalChat = (callback: (messages: ChatMessage[]) => void) => {
  if (!db) return () => {};
  const docRef = doc(db, 'global_chat', GLOBAL_CHAT_ROOM_ID);
  
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      callback((data.messages as ChatMessage[]) || []);
    } else {
      callback([]);
    }
  }, (error) => {
    console.error("Lỗi lắng nghe chat:", error);
  });
};

/**
 * Gửi tin nhắn mới.
 * Tự động kiểm tra cấm chat và loại bỏ tin nhắn cũ nếu mảng > 100 phần tử để giảm dung lượng Document.
 */
export const sendGlobalChatMessage = async (message: Omit<ChatMessage, 'id' | 'timestamp'>): Promise<boolean> => {
  if (!db) return false;
  try {
    const sender = (message.senderId || '').trim().toLowerCase();
    
    // Kiểm tra cấm chat trước khi gửi
    const rulesRef = doc(db, 'system_moderation', 'rules');
    const rulesSnap = await getDoc(rulesRef);
    if (rulesSnap.exists()) {
      const rules = rulesSnap.data();
      const bannedUsers: string[] = rules.bannedChatUsers || [];
      if (bannedUsers.some(u => u.toLowerCase() === sender)) {
        console.warn(`Tài khoản ${sender} đã bị cấm chat trên Kênh Thế Giới.`);
        return false;
      }
    }

    const docRef = doc(db, 'global_chat', GLOBAL_CHAT_ROOM_ID);
    const newMsg: ChatMessage = {
      ...message,
      id: crypto.randomUUID(),
      timestamp: Date.now()
    };

    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, { messages: [newMsg] });
    } else {
      let currentMessages = (docSnap.data().messages as ChatMessage[]) || [];
      // Giữ tối đa 99 tin cũ + 1 tin mới = 100 tin nhắn
      if (currentMessages.length >= 100) {
        currentMessages = currentMessages.slice(currentMessages.length - 99);
      }
      currentMessages.push(newMsg);
      await updateDoc(docRef, { messages: currentMessages });
    }
    return true;
  } catch (error) {
    console.error("Lỗi gửi tin nhắn:", error);
    return false;
  }
};

export interface SystemAnnouncement {
  id: string;
  text: string;
  timestamp: number;
}
export const listenToAnnouncements = (callback: (anns: SystemAnnouncement[]) => void) => {
  if (!db) return () => {};
  const docRef = doc(db, 'global_announcements', 'main');
  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback(docSnap.data().items || []);
    } else {
      callback([]);
    }
  }, () => {});
};
export const sendAnnouncement = async (text: string) => {
  if (!db) return false;
  try {
    const docRef = doc(db, 'global_announcements', 'main');
    const newAnn = { id: crypto.randomUUID(), text, timestamp: Date.now() };
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      await setDoc(docRef, { items: [newAnn] });
    } else {
      let items = (docSnap.data().items as SystemAnnouncement[]) || [];
      if (items.length >= 10) items = items.slice(items.length - 9);
      items.push(newAnn);
      await updateDoc(docRef, { items });
    }
    return true;
  } catch(e) { return false; }
};
