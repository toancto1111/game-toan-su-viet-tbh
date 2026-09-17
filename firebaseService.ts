import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, doc, setDoc, where, getDoc, deleteDoc } from "firebase/firestore";
import { GiftCode } from "./types";
import { TrialRecord, LeaderboardEntry } from "./types";

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
          fetched.push(docSnap.data() as LeaderboardEntry);
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
      if (!normalizedAllowed.includes(playerName.toLowerCase().trim())) {
        return { success: false, message: "Tài khoản của bạn không có quyền sử dụng mã code đặc biệt này." };
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
