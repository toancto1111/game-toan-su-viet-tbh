/**
 * Cấu hình theo môn học (Subject Config).
 *
 * Một mã nguồn chung chạy được nhiều web môn học. Môn nào được chọn bởi biến môi trường
 * `VITE_SUBJECT_ID` (đặt trên Vercel cho từng bản triển khai).
 *
 * QUAN TRỌNG – AN TOÀN CHO WEB HIỆN TẠI:
 *  - Nếu KHÔNG đặt `VITE_SUBJECT_ID` thì mặc định là 'toan' = web Toán Sử hiện tại,
 *    với đúng các chữ và dữ liệu như trước đây (không thay đổi gì).
 *  - Chỉ môn 'toan' mới dùng chương trình + câu hỏi Toán có sẵn trong mã nguồn.
 *    Các môn khác bắt đầu trống, nội dung do giáo viên nạp qua Admin (Giai đoạn 3).
 */

export interface SubjectConfig {
  /** Mã môn, dùng làm khóa dữ liệu (toan, khtn, tienganh, tinhoc, ...) */
  id: string;
  /** Tên môn hiển thị, ví dụ "Toán học" */
  subjectName: string;
  /** Tiêu đề thẻ trình duyệt (document.title) */
  siteTitle: string;
  /** Tên thương hiệu trên thanh tiêu đề game */
  brandName: string;
  /** Tên khu luyện tập theo môn (thay cho "Thí Luyện Đường") */
  trialHallName: string;
  /** Có dùng chương trình + câu hỏi Toán dựng sẵn trong mã nguồn không */
  builtInCurriculum: boolean;
  /** Bật nút nghe âm thanh cho câu hỏi (dành cho Anh văn) */
  hasAudio: boolean;
}

const SUBJECTS: Record<string, SubjectConfig> = {
  // Web hiện tại – GIỮ NGUYÊN mọi chuỗi như bản gốc
  toan: {
    id: 'toan',
    subjectName: 'Toán học',
    siteTitle: 'Sử Việt Anh Hùng Truyện & Toán Học Kỳ Thư',
    brandName: 'Sử Việt Anh Hùng',
    trialHallName: 'Thí Luyện Đường',
    builtInCurriculum: true,
    hasAudio: false,
  },
  khtn: {
    id: 'khtn',
    subjectName: 'Khoa học tự nhiên',
    siteTitle: 'Sử Việt Anh Hùng Truyện & Binh Khí Doanh (KHTN)',
    brandName: 'Sử Việt Anh Hùng',
    trialHallName: 'Binh Khí Doanh',
    builtInCurriculum: false,
    hasAudio: false,
  },
  tienganh: {
    id: 'tienganh',
    subjectName: 'Tiếng Anh',
    siteTitle: 'Sử Việt Anh Hùng Truyện & Sứ Thần Điện (Tiếng Anh)',
    brandName: 'Sử Việt Anh Hùng',
    trialHallName: 'Sứ Thần Điện',
    builtInCurriculum: false,
    hasAudio: true,
  },
  tinhoc: {
    id: 'tinhoc',
    subjectName: 'Tin học',
    siteTitle: 'Sử Việt Anh Hùng Truyện & Quân Cơ Viện (Tin học)',
    brandName: 'Sử Việt Anh Hùng',
    trialHallName: 'Quân Cơ Viện',
    builtInCurriculum: false,
    hasAudio: false,
  },
};

const rawId = ((import.meta as any).env?.VITE_SUBJECT_ID as string | undefined)?.trim().toLowerCase();

/** Môn đang chạy. ID lạ hoặc không đặt -> quay về 'toan' (web hiện tại). */
export const SUBJECT: SubjectConfig = (rawId && SUBJECTS[rawId]) || SUBJECTS.toan;
