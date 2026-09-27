import React from 'react';
import { 
  X, Library, BookOpen, Flag, UserPlus, Tent, 
  Shield, Swords, Trophy, ShoppingBag, Info, AlertTriangle, MountainSnow
} from 'lucide-react';

interface InstructionsModalProps {
  onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ onClose }) => {
  const instructions = [
    {
      title: "Quốc Tử Giám",
      desc: "Là nơi người chơi xem các thông tin tướng của toàn bộ hệ thống game.",
      icon: <Library className="text-amber-400" size={24} />
    },
    {
      title: "Thí Luyện Đường",
      desc: "Là nơi người chơi tham gia học tập và trả lời các câu hỏi liên quan đến bộ môn toán theo khối lớp của người chơi. Trả lời đúng sẽ nhận được phần thưởng ngẫu nhiên gồm Vàng, vé quay các loại (tùy nhân phẩm và độ khó của câu hỏi).",
      icon: <BookOpen className="text-amber-400" size={24} />
    },
    {
      title: "Tự Hào Sử Việt",
      desc: "Là nơi người chơi tham gia học tập và trả lời các câu hỏi liên quan đến bộ môn Lịch sử Việt Nam. Trả lời đúng sẽ được phần thưởng kèm các danh hiệu xếp hạng.",
      icon: <Flag className="text-amber-400" size={24} />
    },
    {
      title: "Chiêu Hiền Đài",
      desc: "Là nơi người chơi sẽ dùng thẻ tướng có được để Chiêu mộ tướng.",
      icon: <UserPlus className="text-amber-400" size={24} />
    },
    {
      title: "Doanh Trại",
      desc: "Là nơi bố trí các tướng chiêu mộ để vượt ải theo chương của bản đồ (ví dụ ở bản đồ chương 1 thì chỉ có tướng của chương 1, qua chương 2 thì các tướng này sẽ bị xóa bỏ. Các tướng này có được khi người chơi quay các vé Anh Hào và vé Danh Tướng).",
      icon: <Tent className="text-amber-400" size={24} />
    },
    {
      title: "Quân Đoàn",
      desc: "Là nơi bố trí các tướng vĩnh viễn của người chơi xuyên suốt quá trình game (các tướng này sẽ có được khi người chơi dùng vé Quân Đoàn để quay trong Chiêu hiền đài). Các tướng trong Quân Đoàn sẽ dùng để xếp hạng lực chiến và tham gia các tính năng Đấu trường và Anh hùng quá ải.",
      icon: <Shield className="text-amber-400" size={24} />
    },
    {
      title: "Anh Hùng Quá Ải",
      desc: "Là nơi người chơi tham gia các trận chiến khốc liệt trong lịch sử Việt Nam. Nếu dành chiến thắng sẽ nhận phần thưởng to lớn.",
      icon: <MountainSnow className="text-amber-400" size={24} />
    },
    {
      title: "Đấu Trường PK",
      desc: "Là nơi các người chơi chiến đấu với nhau để tranh thứ hạng.",
      icon: <Swords className="text-amber-400" size={24} />
    },
    {
      title: "Danh Vọng Đài",
      desc: "Là nơi người chơi xem bảng xếp hạng các hạng mục.",
      icon: <Trophy className="text-amber-400" size={24} />
    },
    {
      title: "Kỳ Trân Các",
      desc: "Là nơi người chơi mua các vật phẩm cần thiết cho game.",
      icon: <ShoppingBag className="text-amber-400" size={24} />
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="relative w-full max-w-5xl max-h-[90vh] border-[3px] border-amber-600/60 rounded-3xl shadow-[0_0_80px_rgba(245,158,11,0.25)] flex flex-col overflow-hidden bg-stone-950">
        
        {/* Lớp nền sang trọng: Hình Trống đồng & Rồng */}
        <div 
          className="absolute inset-0 z-0 opacity-70"
          style={{ backgroundImage: 'url(/images/instructions_bg.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        {/* Lớp phủ gradient để làm nổi bật chữ */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-stone-950/60 via-stone-950/30 to-stone-950/70" />

        {/* --- KHU VỰC NỘI DUNG CHÍNH (nổi lên trên nền) --- */}
        <div className="relative z-10 flex flex-col h-full max-h-[90vh]">
          {/* Header */}
          <div className="relative p-6 text-center border-b border-amber-600/30 bg-stone-950/30 backdrop-blur-md">
            <div className="absolute inset-0 bg-gradient-to-b from-amber-500/10 to-transparent pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 uppercase tracking-widest drop-shadow-[0_2px_10px_rgba(245,158,11,0.5)] flex items-center justify-center gap-4">
            <Info className="text-amber-400" size={28} />
            Hướng Dẫn Trò Chơi
            <Info className="text-amber-400" size={28} />
          </h2>
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-stone-400 hover:text-amber-400 hover:scale-110 transition-all bg-stone-900 p-1.5 rounded-xl border border-stone-700 hover:border-amber-400/50 shadow-lg"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 scrollbar-thin scrollbar-thumb-amber-600/80 scrollbar-track-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {instructions.map((item, index) => (
              <div 
                key={index}
                className="group relative bg-stone-900/40 p-5 rounded-2xl border border-amber-900/40 hover:border-amber-400/80 transition-all duration-300 hover:shadow-[0_0_25px_rgba(245,158,11,0.3)] hover:-translate-y-1 flex gap-4 items-start backdrop-blur-lg"
              >
                <div className="shrink-0 p-3 bg-stone-950/60 rounded-xl border border-stone-700/50 group-hover:border-amber-400/60 group-hover:bg-amber-950/50 group-hover:scale-110 transition-all shadow-inner backdrop-blur-md">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-amber-300 font-cinzel font-bold text-lg mb-1.5 flex items-center gap-2">
                    <span className="text-stone-500 text-sm">{index + 1}.</span>
                    {item.title}
                  </h3>
                  <p className="text-stone-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
            </div>

            {/* Warning Note */}
            <div className="mt-8 p-6 sm:p-7 rounded-2xl border-l-[6px] border-l-amber-500 bg-gradient-to-r from-amber-950/60 to-stone-950/40 relative overflow-hidden shadow-[0_0_30px_rgba(245,158,11,0.2)] backdrop-blur-lg">
              <div className="absolute right-0 top-0 opacity-10 w-40 h-40 transform translate-x-4 -translate-y-4 text-amber-500">
              <AlertTriangle size={128} />
            </div>
            <h4 className="text-amber-400 font-bold text-lg mb-3 flex items-center gap-2">
              <AlertTriangle size={20} className="animate-pulse" />
              LƯU Ý QUAN TRỌNG
            </h4>
            <div className="text-stone-300 text-sm leading-relaxed space-y-2 relative z-10">
              <p>
                Khi người chơi qua chương mới (bản đồ mới) chỉ có các tài nguyên <strong>Vàng, Ngọc bích, các loại vé quay và tài nguyên</strong> sẽ được giữ lại. 
              </p>
              <p className="text-red-300">
                Các tướng quay trong Chiêu Hiền Đài bằng <strong>vé Anh Hào</strong> và <strong>Danh tướng</strong> sẽ bị xóa bỏ, nên người chơi cân nhắc để sử dụng tài nguyên hợp lý.
              </p>
              <p className="font-bold text-amber-200 pt-2 flex items-center gap-2">
                <span className="text-xl">✨</span> Muốn tướng mạnh hơn hãy nâng sao tướng nhé!
              </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-5 border-t border-amber-600/30 bg-stone-950/30 flex justify-center backdrop-blur-md">
            <button 
              onClick={onClose}
              className="px-10 py-3.5 rounded-full bg-gradient-to-r from-amber-600 via-yellow-500 to-amber-600 hover:from-amber-500 hover:via-yellow-400 hover:to-amber-500 text-stone-950 font-black uppercase tracking-widest shadow-[0_0_25px_rgba(245,158,11,0.5)] transition-all hover:scale-105 active:scale-95 border border-yellow-300/50"
            >
              Phụng Thiên Thừa Vận
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
