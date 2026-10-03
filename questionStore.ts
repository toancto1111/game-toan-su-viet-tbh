import { Question } from './types';
import { SUBJECT } from './subject.config';

/**
 * Kho câu hỏi trung tâm (Question Store).
 *
 * Trước đây toàn bộ ngân hàng câu hỏi được import tĩnh và đóng gói chung vào một bundle
 * khiến game nặng. Kho này tải câu hỏi THEO KHỐI LỚP (lazy-load, code-splitting) và cung cấp
 * truy cập đồng bộ sau khi đã nạp, nên các nơi gọi `getQuestionsForLesson` không cần đổi.
 *
 * Cùng một giao diện này sẽ được dùng để nạp câu hỏi từ Firebase cho các web môn học khác
 * (xem `registerQuestions`).
 */

const store: Question[] = [];
const knownIds = new Set<string>();
const gradeLoads = new Map<number, Promise<void>>();
const loadedGrades = new Set<number>();
const listeners = new Set<() => void>();

/** Thêm câu hỏi vào kho (bỏ qua câu trùng ID). */
export const registerQuestions = (list: Question[]): void => {
  for (const q of list) {
    if (!q || !q.id || knownIds.has(q.id)) continue;
    knownIds.add(q.id);
    store.push(q);
  }
};

/** Toàn bộ câu hỏi đã nạp (tham chiếu tới mảng nội bộ, không sửa trực tiếp). */
export const getLoadedQuestions = (): Question[] => store;

export const isGradeLoaded = (grade: number): boolean => loadedGrades.has(grade);

/** Đăng ký lắng nghe khi có gói câu hỏi mới nạp xong. Trả về hàm hủy. */
export const onQuestionsLoaded = (cb: () => void): (() => void) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};

const notify = () => listeners.forEach(cb => { try { cb(); } catch { /* ignore */ } });

/** Chuyển định dạng thô của `questions_data` (lớp 6) sang `Question`. */
const mapRawQuestions = (raw: any[]): Question[] =>
  raw
    .filter(q => q.type !== 'multiple_choice_many')
    .map(q => {
      const type = q.type === 'short_answer_number' ? 'short_answer' : q.type;
      let options = q.options || [];
      let correctAnswer: any = q.answer;
      if (type === 'true_false') {
        options = ['Đúng', 'Sai'];
        correctAnswer = (q.answer === 'Đúng' || q.answer === 'đúng') ? 0 : 1;
      } else if (type === 'multiple_choice_1') {
        const letter = q.answer.toString().trim().charAt(0).toUpperCase();
        correctAnswer = ['A', 'B', 'C', 'D'].indexOf(letter);
      } else {
        correctAnswer = q.answer.toString().replace(/[{}]/g, '').trim();
      }
      return {
        id: q.id, grade: 6, chapter: 1, level: q.level,
        type: type as any, question: q.question, options,
        correctAnswer, explanation: q.explanation,
        imageUrl: q.imageUrl, explanationImageUrl: q.explanationImageUrl,
      } as Question;
    });

/** Mỗi khối lớp -> các hàm tải (mỗi `import()` là một chunk riêng, chỉ tải khi cần). */
const GRADE_LOADERS: Record<number, Array<() => Promise<Question[]>>> = {
  6: [
    () => import('./chuong1_thucte_data').then(m => m.chuong1ThucTeData as Question[]),
    () => import('./chuong2_thucte_data').then(m => m.chuong2ThucTeData as Question[]),
    () => import('./chuong3_thucte_data').then(m => m.chuong3ThucTeData as Question[]),
    () => import('./chuong4_thucte_data').then(m => m.chuong4ThucTeData as Question[]),
    () => import('./questions_data').then(m => mapRawQuestions(m.questionsRaw as any[])),
  ],
  7: [],
  8: [
    () => import('./toan8_chuong1_questions').then(m => m.TOAN_8_CHUONG1_QUESTIONS as Question[]),
  ],
  9: [
    () => import('./toan9_chuong1_questions').then(m => m.toan9Chuong1Questions as Question[]),
    () => import('./toan9_chuong2_questions').then(m => m.toan9Chuong2Questions as Question[]),
    () => import('./toan9_chuong3_questions').then(m => m.toan9Chuong3Questions as Question[]),
    () => import('./toan9_chuong4_questions').then(m => m.toan9Chuong4Questions as Question[]),
    () => import('./toan9_chuong5_questions').then(m => m.toan9Chuong5Questions as Question[]),
    () => import('./toan9_chuong6_questions').then(m => m.toan9Chuong6Questions as Question[]),
    () => import('./toan9_chuong7_questions').then(m => m.toan9Chuong7Questions as Question[]),
    () => import('./toan9_chuong8_questions').then(m => m.toan9Chuong8Questions as Question[]),
  ],
};

/**
 * Nạp (một lần) toàn bộ câu hỏi của một khối lớp. Gọi nhiều lần an toàn, dùng chung một Promise.
 */
export const loadGradeQuestions = (grade: number): Promise<void> => {
  const existing = gradeLoads.get(grade);
  if (existing) return existing;

  const loaders = SUBJECT.builtInCurriculum ? (GRADE_LOADERS[grade] || []) : [];
  const p = Promise.all(loaders.map(load => load().catch(err => {
    console.error(`[questionStore] Lỗi nạp gói câu hỏi lớp ${grade}`, err);
    return [] as Question[];
  }))).then(packs => {
    packs.forEach(registerQuestions);
    loadedGrades.add(grade);
    notify();
  });

  gradeLoads.set(grade, p);
  return p;
};
