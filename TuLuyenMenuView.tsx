import React from 'react';
import { ChevronLeft, Book, ChevronRight, Lock, CheckCircle, Star } from 'lucide-react';
import { chuong1ThucTeData } from './chuong1_thucte_data';
import { chuong2ThucTeData } from './chuong2_thucte_data';
import { chuong3ThucTeData } from './chuong3_thucte_data';
import { chuong4ThucTeData } from './chuong4_thucte_data';
import { demoTuLuyenData } from './demo_tu_luyen_data';
import { questionsRaw } from './questions_data';

interface TuLuyenMenuViewProps {
  setView: (view: any) => void;
  startLesson: (lessonId: string, questions: any[]) => void;
  unlockedLessons: string[];
  correctIds: Record<string, string[]>;
}

const ALL_QUESTIONS_IN_LESSON: Record<string, any[]> = {};

export const TuLuyenMenuView: React.FC<TuLuyenMenuViewProps> = ({ setView, startLesson, unlockedLessons, correctIds }) => {
  const lessons = [
    { id: 'B1',     name: 'Bài 1: Tập hợp (Demo)',                                  questions: demoTuLuyenData },
    { id: 'B2',     name: 'Bài 2: Cách ghi số tự nhiên',                             questions: chuong1ThucTeData.filter(q => q.id.includes('THUC_TE_B2')) },
    { id: 'B3',     name: 'Bài 3: Thứ tự trong tập hợp',                             questions: chuong1ThucTeData.filter(q => q.id.includes('THUC_TE_B3')) },
    { id: 'B4',     name: 'Bài 4: Phép cộng và phép trừ',                            questions: chuong1ThucTeData.filter(q => q.id.includes('THUC_TE_B4')) },
    { id: 'B5',     name: 'Bài 5: Phép nhân và phép chia',                           questions: chuong1ThucTeData.filter(q => q.id.includes('THUC_TE_B5')) },
    { id: 'B6',     name: 'Bài 6: Luỹ thừa với số mũ tự nhiên',                     questions: chuong1ThucTeData.filter(q => q.id.includes('THUC_TE_B6')) },
    { id: 'B7',     name: 'Bài 7: Thứ tự thực hiện phép tính',                      questions: chuong1ThucTeData.filter(q => q.id.includes('THUC_TE_B7')) },
    { id: 'B8',     name: 'Bài 8: Quan hệ chia hết và tính chất',                   questions: chuong2ThucTeData.filter(q => q.id.includes('THUC_TE_B8')) },
    { id: 'B9_10',  name: 'Bài 9: Dấu hiệu chia hết cho 2, 3, 5, 9',               questions: chuong2ThucTeData.filter(q => q.id.includes('THUC_TE_B9') || q.id.includes('THUC_TE_B10')) },
    { id: 'B11',    name: 'Bài 10: Số nguyên tố. Hợp số',                            questions: chuong2ThucTeData.filter(q => q.id.includes('THUC_TE_B11')) },
    { id: 'B12',    name: 'Bài 11: Ước chung. Ước chung lớn nhất',                  questions: chuong2ThucTeData.filter(q => q.id.includes('THUC_TE_B12')) },
    { id: 'B13',    name: 'Bài 12: Bội chung. Bội chung nhỏ nhất',                  questions: chuong2ThucTeData.filter(q => q.id.includes('THUC_TE_B13')) },
    { id: 'C3_B13', name: 'Bài 13: Tập hợp các số nguyên',                          questions: chuong3ThucTeData.filter(q => q.id.includes('THUC_TE_C3_B13')) },
    { id: 'C3_B14', name: 'Bài 14: Phép cộng và phép trừ số nguyên',                questions: chuong3ThucTeData.filter(q => q.id.includes('THUC_TE_C3_B14')) },
    { id: 'C3_B15', name: 'Bài 15: Quy tắc dấu ngoặc',                              questions: chuong3ThucTeData.filter(q => q.id.includes('THUC_TE_C3_B15')) },
    { id: 'C3_B16', name: 'Bài 16: Phép nhân số nguyên',                             questions: chuong3ThucTeData.filter(q => q.id.includes('THUC_TE_C3_B16')) },
    { id: 'C3_B17', name: 'Bài 17: Phép chia hết. Ước và bội của một số nguyên',    questions: chuong3ThucTeData.filter(q => q.id.includes('THUC_TE_C3_B17')) },
    { 
      id: 'C4', 
      name: 'Chương 4: Một số hình phẳng trong thực tiễn (Bài 18, 19 & 20)', 
      questions: [
        ...chuong4ThucTeData.filter(q => q.id.includes('THUC_TE_B18')),
        ...questionsRaw.filter(q => q.id.includes('USER_B19_')),
        ...questionsRaw.filter(q => q.id.includes('USER_B20_'))
      ]
    },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 z-50 flex flex-col items-center p-6 overflow-y-auto">
      {/* Header */}
      <div className="w-full max-w-5xl flex justify-between items-center mb-8 mt-4">
        <button 
          onClick={() => setView('chapter-hub')} 
          className="text-slate-400 hover:text-emerald-400 flex items-center gap-2 transition-colors border border-slate-700 hover:border-emerald-500/50 px-4 py-2 rounded-lg"
        >
          <ChevronLeft /> Quay lại
        </button>
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-cinzel text-emerald-400 font-bold uppercase tracking-widest drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            Thí Luyện Đường
          </h1>
          <p className="text-slate-400 text-sm mt-1">Hoàn thành từng bài để mở khóa bài tiếp theo</p>
        </div>
        <div className="w-[100px]"></div>
      </div>

      {/* Progress summary */}
      <div className="w-full max-w-5xl mb-6 bg-slate-800/50 border border-emerald-500/20 rounded-2xl p-4 flex items-center gap-6">
        <div className="text-center">
          <div className="text-2xl font-black text-emerald-400">
            {lessons.filter(l => unlockedLessons.includes(l.id)).length}
            <span className="text-slate-500 text-lg">/{lessons.length}</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-widest">Bài đã mở</div>
        </div>
        <div className="h-10 w-px bg-slate-700" />
        <div className="text-center">
          <div className="text-2xl font-black text-yellow-400">
            {lessons.filter(l => {
              const correct = correctIds[l.id]?.length || 0;
              return correct >= l.questions.length && l.questions.length > 0;
            }).length}
            <span className="text-slate-500 text-lg">/{lessons.length}</span>
          </div>
          <div className="text-xs text-slate-400 mt-0.5 uppercase tracking-widest">Bài hoàn thành</div>
        </div>
        <div className="flex-1 ml-4">
          <div className="text-xs text-slate-400 mb-1 uppercase tracking-widest">Tổng tiến độ</div>
          {(() => {
            const totalQ = lessons.reduce((sum, l) => sum + l.questions.length, 0);
            const totalCorrect = lessons.reduce((sum, l) => sum + (correctIds[l.id]?.length || 0), 0);
            const pct = totalQ > 0 ? Math.round((totalCorrect / totalQ) * 100) : 0;
            return (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="text-emerald-400 font-bold text-sm">{pct}%</span>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{totalCorrect}/{totalQ} câu đã hoàn thành</div>
              </>
            );
          })()}
        </div>
      </div>

      {/* Lesson grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-5xl pb-8">
        {lessons.map((lesson, index) => {
          const isUnlocked = unlockedLessons.includes(lesson.id);
          const correctCount = correctIds[lesson.id]?.length || 0;
          const total = lesson.questions.length;
          const isCompleted = total > 0 && correctCount >= total;
          const pct = total > 0 ? Math.min(100, Math.round((correctCount / total) * 100)) : 0;
          const remaining = total - correctCount;

          if (!isUnlocked) {
            // Bài bị khóa
            return (
              <div
                key={lesson.id}
                className="bg-slate-900/80 border-2 border-slate-800 p-6 rounded-xl flex items-center justify-between opacity-60 select-none"
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700">
                    <Lock className="text-slate-600" size={28} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-500 mb-1">{lesson.name}</h3>
                    <p className="text-slate-600 text-sm">{total} câu · Hoàn thành bài trước để mở</p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <Lock size={20} className="text-slate-700" />
                </div>
              </div>
            );
          }

          if (isCompleted) {
            // Bài đã hoàn thành 100%
            return (
              <button
                key={lesson.id}
                onClick={() => startLesson(lesson.id, lesson.questions)}
                className="bg-gradient-to-r from-yellow-950/80 via-amber-900/60 to-yellow-950/80 border-2 border-yellow-600/60 hover:border-yellow-400 p-6 rounded-xl text-left transition-all group flex items-center justify-between hover:shadow-[0_0_20px_rgba(234,179,8,0.3)]"
              >
                <div className="flex items-center gap-5">
                  <div className="p-3 bg-yellow-900/50 rounded-lg border border-yellow-600/50 group-hover:border-yellow-400/70 transition-colors relative">
                    <Book className="text-yellow-400" size={28} />
                    <CheckCircle size={14} className="text-yellow-300 absolute -top-1.5 -right-1.5 bg-yellow-900 rounded-full" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-xl font-bold text-yellow-200 group-hover:text-white transition-colors">{lesson.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[1,2,3].map(i => <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />)}
                      </div>
                      <p className="text-yellow-600 text-sm font-semibold">✅ Hoàn thành · {total} câu · Ôn tập lại</p>
                    </div>
                  </div>
                </div>
                <ChevronRight className="text-yellow-600 group-hover:text-yellow-400 transition-colors" />
              </button>
            );
          }

          // Bài đang mở, chưa hoàn thành
          return (
            <button
              key={lesson.id}
              onClick={() => startLesson(lesson.id, lesson.questions)}
              className="bg-slate-800/80 border-2 border-emerald-500/20 hover:border-emerald-400 hover:bg-slate-800 p-6 rounded-xl text-left transition-all group flex items-center justify-between hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]"
            >
              <div className="flex items-center gap-5 flex-1 min-w-0">
                <div className="p-3 bg-slate-900 rounded-lg group-hover:bg-emerald-900/50 border border-slate-700 group-hover:border-emerald-500/50 transition-colors shrink-0">
                  <Book className="text-emerald-500/70 group-hover:text-emerald-400" size={28} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-slate-200 group-hover:text-white mb-1 transition-colors truncate">{lesson.name}</h3>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden max-w-[120px]">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-slate-400 group-hover:text-emerald-200/70 text-sm whitespace-nowrap">
                      {pct > 0
                        ? `${correctCount}/${total} câu · Còn ${remaining} câu`
                        : `${total} câu · Chưa bắt đầu`
                      }
                    </p>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-slate-600 group-hover:text-emerald-400 transition-colors shrink-0 ml-2" />
            </button>
          );
        })}
      </div>
    </div>
  );
};
