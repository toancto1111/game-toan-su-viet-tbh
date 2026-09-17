import { SU_VIET_QUESTIONS_EXTRA_1 } from './tu_hao_su_viet_data_extra1';
import { SU_VIET_QUESTIONS_EXTRA_2 } from './tu_hao_su_viet_data_extra2';
import { SU_VIET_QUESTIONS_EXTRA_3 } from './tu_hao_su_viet_data_extra3';
import { SU_VIET_QUESTIONS_EXTRA_4 } from './tu_hao_su_viet_data_extra4';
import { SU_VIET_QUESTIONS_EXTRA_5 } from './tu_hao_su_viet_data_extra5';
import { SU_VIET_QUESTIONS_EXTRA_6 } from './tu_hao_su_viet_data_extra6';
import { SU_VIET_QUESTIONS_EXTRA_7 } from './tu_hao_su_viet_data_extra7';
import { SU_VIET_QUESTIONS_EXTRA_8 } from './tu_hao_su_viet_data_extra8';
import { SU_VIET_QUESTIONS_EXTRA_9 } from './tu_hao_su_viet_data_extra9';
import { SU_VIET_QUESTIONS_EXTRA_10 } from './tu_hao_su_viet_data_extra10';
import { SU_VIET_QUESTIONS_EXTRA_11 } from './tu_hao_su_viet_data_extra11';
import { SU_VIET_QUESTIONS_EXTRA_12 } from './tu_hao_su_viet_data_extra12';
import { SU_VIET_QUESTIONS_EXTRA_13 } from './tu_hao_su_viet_data_extra13';
import { SU_VIET_QUESTIONS_EXTRA_14 } from './tu_hao_su_viet_data_extra14';
import { SU_VIET_QUESTIONS_EXTRA_15 } from './tu_hao_su_viet_data_extra15';
import { SU_VIET_QUESTIONS_EXTRA_16 } from './tu_hao_su_viet_data_extra16';
import { SU_VIET_QUESTIONS_EXTRA_17 } from './tu_hao_su_viet_data_extra17';
import { SU_VIET_QUESTIONS_EXTRA_18 } from './tu_hao_su_viet_data_extra18';
import { SU_VIET_QUESTIONS_EXTRA_19 } from './tu_hao_su_viet_data_extra19';
import { SU_VIET_QUESTIONS_EXTRA_20 } from './tu_hao_su_viet_data_extra20';

export interface SuVietQuestion {
  id: string;
  era: 'Thời Dựng Nước & Bắc Thuộc' | 'Ngô - Đinh - Tiền Lê' | 'Triều Lý' | 'Triều Trần' | 'Khởi Nghĩa Lam Sơn & Hậu Lê' | 'Thời Tây Sơn & Cận Đại';
  type: 'multiple_choice_1' | 'short_answer' | 'true_false';
  question: string;
  options?: string[]; // 4 lựa chọn cho trắc nghiệm, hoặc ['Đúng', 'Sai']
  correctAnswer: number | string; // Index cho trắc nghiệm/đúng sai, hoặc chuỗi tên cho điền ngắn
  acceptableAnswers?: string[]; // Danh sách các cách viết tên được chấp nhận cho dạng điền ngắn
  explanation: string;
  source: 'Đại Việt Sử Ký Toàn Thư' | 'Việt Nam Sử Lược' | 'Cả hai bộ sử';
  difficulty?: 'easy' | 'medium' | 'hard';
}

const BASE_QUESTIONS: SuVietQuestion[] = [
  // ==================== THỜI DỰNG NƯỚC & BẮC THUỘC ====================
  {
    id: 'sv_01',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'multiple_choice_1',
    question: 'Theo "Đại Việt Sử Ký Toàn Thư", Kinh Dương Vương húy là Lộc Tục, lấy con gái của Động Đình Quân sinh ra ai?',
    options: ['Lạc Long Quân (Sùng Lãm)', 'Hùng Quốc Vương', 'An Dương Vương', 'Phù Đổng Thiên Vương'],
    correctAnswer: 0,
    explanation: 'Sử thần Ngô Sĩ Liên chép: "Kinh Dương Vương lấy con gái Động Đình Quân là Long Nữ, sinh ra Lạc Long Quân, tên húy là Sùng Lãm. Vua lấy con gái vua Đế Lai là Âu Cơ, sinh một bọc trăm trứng, nở thành trăm con trai."',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_02',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'short_answer',
    question: 'Vị vua nào đã cho xây thành Cổ Loa theo hình trôn ốc và dùng nỏ thần Kim Quy đánh bại quân Triệu Đà nhiều lần?',
    correctAnswer: 'An Dương Vương',
    acceptableAnswers: ['an duong vuong', 'thuc phan', 'thục phán', 'an dương vương'],
    explanation: 'Thục Phán sau khi hợp nhất Âu Việt và Lạc Việt đã lập nên nước Âu Lạc, xưng là An Dương Vương, đóng đô ở Cổ Loa (Đông Anh, Hà Nội ngày nay), cho đắp thành chín vòng hình trôn ốc kiên cố vô song.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_03',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'true_false',
    question: 'Hai Bà Trưng phất cờ khởi nghĩa vào năm 40 sau Công nguyên tại Hát Môn nhằm lật đổ ách đô hộ của viên Thái thú nhà Đông Hán là Tô Định. Nhận định này Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Theo "Việt Nam Sử Lược", mùa xuân năm Canh Tý (năm 40), Hai Bà Trưng căm thù Tô Định bạo ngược và giết chồng Trưng Trắc là Thi Sách, đã phất cờ khởi nghĩa tại cửa sông Hát, giành lại 65 thành trì đất Lĩnh Nam.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_04',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'short_answer',
    question: 'Nữ anh hùng nào ở Cửu Chân từng khẳng định khí phách: "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông, chứ không thèm bắt chước người đời cúi đầu làm tì thiếp người ta"?',
    correctAnswer: 'Bà Triệu',
    acceptableAnswers: ['ba trieu', 'trieu thi trinh', 'triệu thị trinh', 'trieu au', 'triệu ẩu', 'bà triệu', 'bà triệu thị trinh'],
    explanation: 'Bà Triệu (Triệu Thị Trinh) khởi nghĩa năm 248 chống quân Đông Ngô. Câu nói khẳng khái lưu danh thiên cổ của bà thể hiện ý chí độc lập bất khuất của phụ nữ Việt Nam.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_05',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'multiple_choice_1',
    question: 'Năm 544, sau khi đánh đuổi quân đô hộ nhà Lương, Lý Bí lên ngôi Hoàng đế và đặt tên nước ta là gì?',
    options: ['Vạn Xuân', 'Đại Cồ Việt', 'Đại Việt', 'Đại Nam'],
    correctAnswer: 0,
    explanation: 'Mùa xuân năm Giáp Tý (544), Lý Bí lên ngôi xưng là Lý Nam Đế, đặt niên hiệu là Thiên Đức, đặt tên nước là Vạn Xuân với mong muốn non sông vững bền trường tồn đến vạn mùa xuân.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_06',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'short_answer',
    question: 'Vị tướng kế tục sự nghiệp của Lý Nam Đế, lui về đầm Dạ Trạch dùng chiến thuật du kích tập kích quân Lương và được nhân dân tôn là Dạ Trạch Vương là ai?',
    correctAnswer: 'Triệu Quang Phục',
    acceptableAnswers: ['trieu quang phuc', 'triệu quang phục', 'da trach vuong', 'dạ trạch vương'],
    explanation: 'Triệu Quang Phục chiếm cứ đầm Dạ Trạch (Hưng Yên), ngày ẩn náu đêm chèo thuyền độc mộc đánh úp quân Lương, nhân dân tôn xưng ông là Dạ Trạch Vương.',
    source: 'Cả hai bộ sử',
    difficulty: 'medium'
  },
  {
    id: 'sv_07',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'true_false',
    question: 'Phùng Hưng sau khi đánh đuổi quan đô hộ Cao Chính Bình của nhà Đường, làm chủ phủ Tống Bình, đã được nhân dân suy tôn là "Bố Cái Đại Vương". Nhận định này Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Đúng. Nhân dân ghi nhớ công ơn đức lớn như cha mẹ (Bố Cái) của Phùng Hưng nên tôn xưng ngài là Bố Cái Đại Vương.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_08',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'multiple_choice_1',
    question: 'Năm 722, vị thủ lĩnh nào lãnh đạo nhân dân khởi nghĩa chống nhà Đường, đóng đô ở thành Vạn An (Nghệ An) và được gọi là Mai Hắc Đế?',
    options: ['Mai Thúc Loan', 'Mai Kỳ Sơn', 'Khúc Thừa Dụ', 'Dương Đình Nghệ'],
    correctAnswer: 0,
    explanation: 'Mai Thúc Loan khởi nghĩa năm Nhâm Tuất (722), liên kết với các nước lân cận chống lại ách cai trị khắc nghiệt của nhà Đường, xưng Đế nên gọi là Mai Hắc Đế.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },

  // ==================== THỜI KỲ PHỤC HƯNG: NGÔ - ĐINH - TIỀN LÊ ====================
  {
    id: 'sv_09',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'multiple_choice_1',
    question: 'Trận đại thắng trên sông Bạch Đằng năm 938 của Ngô Quyền đã chôn vùi tướng giặc nào của quân Nam Hán?',
    options: ['Hoằng Thao (Lưu Hoằng Thao)', 'Quách Quỳ', 'Ô Mã Nhi', 'Thoát Hoan'],
    correctAnswer: 0,
    explanation: 'Đại Việt Sử Ký Toàn Thư ghi: "Ngô Quyền thừa lúc nước triều rút, dốc toàn lực phản công, thuyền giặc vướng cọc nhọn vỡ tan tành. Hoằng Thao rơi xuống nước chết, quân Nam Hán thiệt hại quá nửa."',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_10',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'short_answer',
    question: 'Vị anh hùng cờ lau tập trận nào đã dẹp yên loạn 12 sứ quân, thống nhất non sông và lập nên nước Đại Cồ Việt?',
    correctAnswer: 'Đinh Bộ Lĩnh',
    acceptableAnswers: ['dinh bo linh', 'đinh bộ lĩnh', 'dinh tien hoang', 'đinh tiên hoàng', 'vạn thắng vương', 'van thang vuong'],
    explanation: 'Năm Mậu Thìn (968), Đinh Bộ Lĩnh dẹp yên 12 sứ quân, lên ngôi Hoàng đế (Đinh Tiên Hoàng), đặt quốc hiệu Đại Cồ Việt, dời đô về Hoa Lư.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_11',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'true_false',
    question: 'Đinh Tiên Hoàng là vị vua đầu tiên của nước ta đặt niên hiệu độc lập cho đất nước là "Thái Bình". Nhận định này Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Đúng. Năm 970, Đinh Tiên Hoàng đặt niên hiệu Thái Bình và cho đúc đồng tiền "Thái Bình hưng bảo" - đồng tiền đầu tiên trong lịch sử tiền tệ Việt Nam.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_12',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'short_answer',
    question: 'Thái hậu nào đã chủ động trao chiếc long bào của vua Đinh cho Thập đạo Tướng quân Lê Hoàn để thống nhất lòng quân chống giặc Tống xâm lược?',
    correctAnswer: 'Dương Vân Nga',
    acceptableAnswers: ['duong van nga', 'dương vân nga', 'duong thai hau', 'dương thái hậu'],
    explanation: 'Trước họa xâm lược của nhà Tống năm 980, Thái hậu Dương Vân Nga vì đại cục dân tộc đã trao long bào cho Lê Hoàn (Lê Đại Hành), đưa đất nước qua cơn quốc nạn.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_13',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'multiple_choice_1',
    question: 'Năm 981, vua Lê Đại Hành đã chỉ huy quân dân Đại Cồ Việt đánh tan quân Tống xâm lược trên tuyến phòng thủ nào?',
    options: ['Sông Bạch Đằng và ải Chi Lăng', 'Sông Như Nguyệt', 'Hàm Tử và Chương Dương', 'Rạch Gầm - Xoài Mút'],
    correctAnswer: 0,
    explanation: 'Năm 981, Lê Hoàn tự làm tướng đốc chiến, đánh bại thủy quân giặc trên sông Bạch Đằng và phục kích chém tướng bộ binh Hầu Nhân Bảo tại Chi Lăng, quân Tống đại bại tháo chạy.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },

  // ==================== TRIỀU ĐẠI NHÀ LÝ ====================
  {
    id: 'sv_14',
    era: 'Triều Lý',
    type: 'short_answer',
    question: 'Vị vua nào đã ban hành "Chiếu dời đô" năm 1010 chuyển kinh đô từ Hoa Lư về thành Thăng Long?',
    correctAnswer: 'Lý Thái Tổ',
    acceptableAnswers: ['ly thai to', 'lý thái tổ', 'ly cong uan', 'lý công uẩn'],
    explanation: 'Mùa thu năm Canh Tuất (1010), Lý Thái Tổ (Lý Công Uẩn) thấy thành Đại La đất đai rộng rãi bằng phẳng, muôn vật tươi tốt phồn thịnh, bèn ban Chiếu dời đô và đổi tên thành Thăng Long.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_15',
    era: 'Triều Lý',
    type: 'multiple_choice_1',
    question: 'Bài thơ thần "Nam quốc sơn hà" vang lên trên phòng tuyến sông Như Nguyệt năm 1077 gắn liền với tên tuổi của vị danh tướng nào?',
    options: ['Lý Thường Kiệt', 'Lý Đạo Thành', 'Tô Hiến Thành', 'Trần Hưng Đạo'],
    correctAnswer: 0,
    explanation: 'Lý Thường Kiệt đã cho người ngâm bài thơ "Nam quốc sơn hà Nam đế cư" trong đền Trương Hống, Trương Hát bên sông Cầu, cổ vũ sĩ khí quân ta, làm tiêu tan ý chí xâm lược của quân Quách Quỳ.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_16',
    era: 'Triều Lý',
    type: 'true_false',
    question: 'Năm 1075, Lý Thường Kiệt đã chủ động đem quân sang đất Tống phá tan các căn cứ tập kết quân lương tại Khâm Châu, Liêm Châu và Ung Châu nhằm tự vệ trước âm mưu xâm lược. Nhận định này Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Đúng. Đây là tư tưởng quân sự "Tiên phát chế nhân" kiệt xuất: "Ngồi yên đợi giặc không bằng đem quân đánh trước để chặn mũi nhọn của giặc".',
    source: 'Cả hai bộ sử',
    difficulty: 'medium'
  },
  {
    id: 'sv_17',
    era: 'Triều Lý',
    type: 'short_answer',
    question: 'Ai là nữ nhi triều Lý hai lần buông rèm nhiếp chính giúp đất nước thanh bình, được dân gian kính cẩn tôn xưng là "Quan Âm Nữ"?',
    correctAnswer: 'Nguyên phi Ỷ Lan',
    acceptableAnswers: ['y lan', 'nguyen phi y lan', 'nguyên phi ỷ lan', 'ỷ lan', 'linh nhan thai hau', 'linh nhân thái hậu'],
    explanation: 'Nguyên phi Ỷ Lan (Linh Nhân Hoàng thái hậu) là người phụ nữ kiệt xuất triều Lý, trị quốc an dân tài tình khi vua Lý Thánh Tông và Lý Thường Kiệt xuất chinh đánh giặc.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_18',
    era: 'Triều Lý',
    type: 'multiple_choice_1',
    question: 'Văn Miếu Thăng Long - biểu tượng của truyền thống hiếu học Việt Nam - được vua Lý Thánh Tông cho xây dựng vào năm nào?',
    options: ['1070', '1010', '1075', '1076'],
    correctAnswer: 0,
    explanation: 'Năm Canh Tuất (1070), vua Lý Thánh Tông cho lập Văn Miếu, đắp tượng Khổng Tử, Chu Công và tứ phối. Đến năm 1076, vua Lý Nhân Tông cho lập thêm Quốc Tử Giám.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_19',
    era: 'Triều Lý',
    type: 'short_answer',
    question: 'Đại thần triều Lý nào nổi tiếng chí công vô tư, khi lâm bệnh nặng được hỏi ai có thể thay thế đã tiến cử người tài là Trần Trung Tá chứ không tiến cử người hầu hạ chu đáo là Vũ Tán Đường?',
    correctAnswer: 'Tô Hiến Thành',
    acceptableAnswers: ['to hien thanh', 'tô hiến thành'],
    explanation: 'Tô Hiến Thành là tấm gương sáng ngời về đức độ phụ chính triều Lý, đặt lợi ích xã tắc và người tài lên trên tình riêng.',
    source: 'Cả hai bộ sử',
    difficulty: 'hard'
  },

  // ==================== HÀO KHÍ ĐÔNG A: TRIỀU TRẦN ====================
  {
    id: 'sv_20',
    era: 'Triều Trần',
    type: 'short_answer',
    question: 'Thái sư triều Trần nào đã khẳng khái thưa với vua Trần Thái Tông: "Đầu thần chưa rơi xuống đất, xin bệ hạ đừng lo" khi quân Mông Cổ xâm lược lần thứ nhất (1258)?',
    correctAnswer: 'Trần Thủ Độ',
    acceptableAnswers: ['tran thu do', 'trần thủ độ', 'thai su tran thu do', 'thái sư trần thủ độ'],
    explanation: 'Câu nói đanh thép của Thái sư Trần Thủ Độ năm 1258 đã củng cố niềm tin tuyệt đối cho vua tôi nhà Trần dốc lòng phản công, lập nên chiến thắng Đông Bộ Đầu hiển hách.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_21',
    era: 'Triều Trần',
    type: 'multiple_choice_1',
    question: 'Quốc công Tiết chế Hưng Đạo Đại Vương Trần Quốc Tuấn là tác giả của áng văn bất hủ nào nhằm khích lệ tinh thần tướng sĩ chống giặc Nguyên Mông?',
    options: ['Hịch tướng sĩ', 'Bình Ngô đại cáo', 'Nam quốc sơn hà', 'Chiếu dời đô'],
    correctAnswer: 0,
    explanation: 'Hưng Đạo Vương viết "Dụ chư tì tướng hịch văn" (Hịch tướng sĩ) năm 1284, lời lẽ thống thiết hào hùng, lay động lòng quân, hun đúc nên hào khí Đông A quật cường.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_22',
    era: 'Triều Trần',
    type: 'short_answer',
    question: 'Tướng trẻ nào triều Trần vì chưa đủ tuổi dự hội nghị Bình Than đã uất ức bóp nát quả cam trong tay, sau đó tự chiêu mộ binh sĩ thêu lá cờ 6 chữ vàng "Phá cường địch, báo hoàng ân"?',
    correctAnswer: 'Trần Quốc Toản',
    acceptableAnswers: ['tran quoc toan', 'trần quốc toản', 'hoai van hau tran quoc toan', 'hoài văn hầu trần quốc toản'],
    explanation: 'Hoài Văn Hầu Trần Quốc Toản tuổi trẻ chí lớn, dũng cảm xung trận đánh đuổi giặc Thoát Hoan, trở thành biểu tượng tuổi trẻ yêu nước bất diệt của non sông Việt Nam.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_23',
    era: 'Triều Trần',
    type: 'multiple_choice_1',
    question: 'Danh tướng nào khi bị giặc bắt dụ dỗ chức tước phương Bắc đã đanh thép tuyên bố: "Ta thà làm ma nước Nam chứ không thèm làm vương đất Bắc"?',
    options: ['Trần Bình Trọng', 'Trần Khánh Dư', 'Trần Quang Khải', 'Trần Nhật Duật'],
    correctAnswer: 0,
    explanation: 'Bảo Nghĩa Vương Trần Bình Trọng hy sinh oanh liệt năm 1285. Khí tiết hiên ngang của ông sáng soi ngàn thu sử sách.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_24',
    era: 'Triều Trần',
    type: 'true_false',
    question: 'Trận thủy chiến Bạch Đằng lịch sử năm 1288 dưới sự chỉ huy của Trần Hưng Đạo đã bắt sống tướng giặc Ô Mã Nhi và Phàn Tiếp, tiêu diệt hoàn toàn thủy quân Nguyên Mông. Nhận định này Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Đúng. Ngày 8 tháng 3 năm Mậu Tý (1288), quân dân nhà Trần mai phục bãi cọc nhọn trên sông Bạch Đằng, bắt sống các tướng giặc Ô Mã Nhi, Tích Lệ Cơ, Phàn Tiếp, kết thúc cuộc kháng chiến lần 3.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_25',
    era: 'Triều Trần',
    type: 'short_answer',
    question: 'Vị gia tướng kiệt xuất của Trần Hưng Đạo có tài lặn dưới nước cả ngày, từng lặn đục thủng đáy thuyền chiến của giặc Nguyên Mông trên sông Bạch Đằng là ai?',
    correctAnswer: 'Yết Kiêu',
    acceptableAnswers: ['yet kieu', 'yết kiêu', 'pham huu the', 'phạm hữu thế'],
    explanation: 'Yết Kiêu (tên thật là Phạm Hữu Thế) cùng với Dã Tượng là hai gia tướng tâm phúc trung liệt của Hưng Đạo Đại Vương, có công lao hiển hách trong các chiến dịch phá quân Nguyên.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_26',
    era: 'Triều Trần',
    type: 'multiple_choice_1',
    question: 'Hai câu thơ nổi tiếng: "Đoạt sáo Chương Dương độ / Cầm Hồ Hàm Tử quan" nằm trong bài thơ "Tụng giá hoàn kinh sư" của vị đại thần triều Trần nào?',
    options: ['Trần Quang Khải', 'Trần Hưng Đạo', 'Trần Nhân Tông', 'Chu Văn An'],
    correctAnswer: 0,
    explanation: 'Thượng tướng Thái sư Trần Quang Khải sáng tác bài thơ khi khải hoàn rước xa giá hai vua Trần về Thăng Long sau đại thắng Hàm Tử và Chương Dương năm 1285.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_27',
    era: 'Triều Trần',
    type: 'short_answer',
    question: 'Vị danh nho được tôn vinh là "Người thầy của muôn đời" (Vạn thế sư biểu) triều Trần, từng dâng "Thất trảm sớ" xin chém 7 tên quyền thần nịnh bợ là ai?',
    correctAnswer: 'Chu Văn An',
    acceptableAnswers: ['chu van an', 'chu văn an'],
    explanation: 'Chu Văn An là vị Tư nghiệp Quốc Tử Giám mẫu mực, tiết tháo thanh cao, cương trực dũng cảm dâng sớ trừ gian diệt nịnh.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },

  // ==================== KHỞI NGHĨA LAM SƠN & TRIỀU HẬU LÊ ====================
  {
    id: 'sv_28',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'short_answer',
    question: 'Năm 1418, thủ lĩnh nào đã dấy binh khởi nghĩa tại đất Lam Sơn (Thanh Hóa), tự xưng là Bình Định Vương chống lại ách đô hộ tàn bạo của nhà Minh?',
    correctAnswer: 'Lê Lợi',
    acceptableAnswers: ['le loi', 'lê lợi', 'le thai to', 'lê thái tổ', 'binh dinh vuong', 'bình định vương'],
    explanation: 'Lê Lợi chiêu tập hào kiệt bốn phương, nếm mật nằm gai suốt 10 năm ròng rã, lãnh đạo nghĩa quân Lam Sơn quét sạch 15 vạn quân giặc Minh giành lại độc lập hoàn toàn cho dân tộc.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_29',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'multiple_choice_1',
    question: 'Danh nhân văn hóa thế giới nào là quân sư tài ba của Lê Lợi, tác giả của áng thiên cổ hùng văn "Bình Ngô đại cáo"?',
    options: ['Nguyễn Trãi', 'Nguyễn Bỉnh Khiêm', 'Ngô Sĩ Liên', 'Lê Văn Hưu'],
    correctAnswer: 0,
    explanation: 'Nguyễn Trãi dâng "Bình Ngô sách" với tư tưởng cốt lõi "Lấy đại nghĩa để thắng hung tàn, đem chí nhân mà thay cường bạo", đặt nền móng chiến lược toàn thắng cho nghĩa quân Lam Sơn.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_30',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'short_answer',
    question: 'Tướng lĩnh Lam Sơn nào đã xả thân mặc áo bào của Lê Lợi, giả làm Bình Định Vương dẫn quân phá vây ở núi Chí Linh để cứu chủ tướng và toàn quân?',
    correctAnswer: 'Lê Lai',
    acceptableAnswers: ['le lai', 'lê lai'],
    explanation: 'Lê Lai liều mình cứu chúa năm 1418 là một trong những biểu tượng cao đẹp nhất về lòng trung nghĩa và đức hy sinh trong lịch sử nước nhà ("Lê Lai cứu chúa").',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_31',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'multiple_choice_1',
    question: 'Trận quyết chiến chiến lược nào cuối năm 1427 đã chém đầu Liễu Thăng tại gò Mã Yên, buộc Vương Thông phải đầu hàng mở hội thề Đông Quan?',
    options: ['Trận Chi Lăng - Xương Giang', 'Trận Ngọc Hồi - Đống Đa', 'Trận Tốt Động - Chúc Động', 'Trận Bạch Đằng'],
    correctAnswer: 0,
    explanation: 'Trận Chi Lăng - Xương Giang (tháng 10 - 11/1427) diệt hơn 10 vạn viện binh giặc Minh do Liễu Thăng chỉ huy, đập tan hoàn toàn ý chí xâm lăng của triều đình nhà Minh.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_32',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'true_false',
    question: 'Vua Lê Thánh Tông là người đã sáng lập Hội Tao Đàn và cho ban hành bộ luật "Quốc triều hình luật" (còn gọi là Luật Hồng Đức) đồ sộ và tiến bộ bậc nhất thời phong kiến. Nhận định này Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Đúng. Dưới thời trị vì của vua Lê Thánh Tông (niên hiệu Quang Thuận và Hồng Đức), Đại Việt đạt đến đỉnh cao phát triển rực rỡ về kinh tế, văn hóa, quân sự và pháp luật.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_33',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'short_answer',
    question: 'Ai là nhà sử học lỗi lạc triều Hậu Lê đã hoàn thành bộ quốc sử "Đại Việt Sử Ký Toàn Thư" gồm 15 quyển vào năm 1479?',
    correctAnswer: 'Ngô Sĩ Liên',
    acceptableAnswers: ['ngo si lien', 'ngô sĩ liên'],
    explanation: 'Sử quan Ngô Sĩ Liên vâng mệnh vua Lê Thánh Tông biên soạn Đại Việt Sử Ký Toàn Thư, kế thừa công trình của Lê Văn Hưu và Phan Phu Tiên, đặt nền tảng chính sử nước nhà.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },

  // ==================== THỜI TÂY SƠN & CẬN ĐẠI ====================
  {
    id: 'sv_34',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Vị anh hùng áo vải cờ đào nào đã lập nên chiến thắng thần tốc mùa xuân Kỷ Dậu (1789), quét sạch 29 vạn quân Thanh ra khỏi bờ cõi?',
    correctAnswer: 'Quang Trung',
    acceptableAnswers: ['quang trung', 'nguyen hue', 'nguyễn huệ', 'vua quang trung', 'bac binh vuong', 'bắc bình vương'],
    explanation: 'Hoàng đế Quang Trung (Nguyễn Huệ) là thiên tài quân sự bách chiến bách thắng của dân tộc. Đêm mùng 4 rạng mùng 5 Tết Kỷ Dậu 1789, quân Tây Sơn đại phá Ngọc Hồi - Đống Đa, giải phóng Thăng Long.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_35',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Đầu năm 1785, Nguyễn Huệ đã dùng chiến thuật mai phục dòng sông tiêu diệt 5 vạn quân Xiêm xâm lược trong trận đánh lẫy lừng nào?',
    options: ['Rạch Gầm - Xoài Mút', 'Ngọc Hồi - Đống Đa', 'Bạch Đằng', 'Chi Lăng'],
    correctAnswer: 0,
    explanation: 'Ngày 20/1/1785, trên đoạn sông Tiền từ Rạch Gầm đến Xoài Mút (Tiền Giang), Nguyễn Huệ chỉ huy quân Tây Sơn nghiền nát 300 thuyền chiến và 5 vạn quân Xiêm trong chưa đầy một ngày.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_36',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Nữ tướng kiệt xuất nào của phong trào Tây Sơn được mệnh danh là Tây Sơn Ngũ Phụng Thư, chỉ huy đội tượng binh dũng mãnh khiến quân thù khiếp sợ?',
    correctAnswer: 'Bùi Thị Xuân',
    acceptableAnswers: ['bui thi xuan', 'bùi thị xuân', 'do doc bui thi xuan', 'đô đốc bùi thị xuân'],
    explanation: 'Đô đốc Bùi Thị Xuân là bậc nữ kiệt tài sắc vẹn toàn, vị nữ tướng cầm quân xuất sắc nhất của phong trào khởi nghĩa nông dân Tây Sơn.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_37',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'true_false',
    question: 'Vua Quang Trung đã ban hành "Chiếu khuyến học" và chủ trương dùng chữ Nôm làm văn tự chính thức trong các kỳ thi khoa cử và chiếu biểu triều đình. Nhận định này Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Đúng. Vua Quang Trung đề cao tinh thần dân tộc sâu sắc, cho lập Viện Sùng Chính do La Sơn Phu Tử Nguyễn Thiếp đứng đầu nhằm dịch kinh sách chữ Hán sang chữ Nôm.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_38',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Danh sĩ Bắc Hà nào đã hiến kế cho quân Tây Sơn tạm rút về phòng tuyến Tam Điệp - Biện Sơn để "chờ giặc vào sâu rồi mới quét sạch một mẻ"?',
    options: ['Ngô Thì Nhậm', 'Phan Huy Ích', 'Nguyễn Thiếp', 'Trần Văn Kỷ'],
    correctAnswer: 0,
    explanation: 'Kế sách rút quân chiến lược của Ngô Thì Nhậm bảo toàn lực lượng, tạo tiền đề quyết định để vua Quang Trung từ Phú Xuân thần tốc hành quân ra Bắc đại phá quân Thanh.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_39',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Tướng giặc Mãn Thanh nào chỉ huy đạo quân 29 vạn sang xâm lược nước ta, hoảng loạn cắt cầu phao tháo chạy khi thành Thăng Long thất thủ?',
    correctAnswer: 'Tôn Sĩ Nghị',
    acceptableAnswers: ['ton si nghi', 'tôn sĩ nghị'],
    explanation: 'Tổng đốc Lưỡng Quảng Tôn Sĩ Nghị kinh hồn bạt vía trước đòn tấn công sấm sét của vua Quang Trung, không kịp đóng yên ngựa vội vã tháo chạy về phương Bắc.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_40',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'multiple_choice_1',
    question: 'Hồ Gươm (Hồ Hoàn Kiếm) ở thủ đô Hà Nội gắn liền với truyền thuyết lịch sử thiêng liêng nào?',
    options: ['Vua Lê Thái Tổ trả lại gươm thần Thuận Thiên cho Rùa Vàng', 'Vua An Dương Vương bắn nỏ thần', 'Lý Thái Tổ nhìn thấy rồng bay lên', 'Lạc Long Quân trở về biển cả'],
    correctAnswer: 0,
    explanation: 'Sau khi dẹp yên giặc Minh, vua Lê Thái Tổ dạo thuyền trên hồ Tả Vọng, Rùa Vàng nổi lên nhận lại thanh gươm thần "Thuận Thiên" mà Long Quân đã cho mượn cứu nước.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_41',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'multiple_choice_1',
    question: 'Theo truyền thuyết, người con trai trưởng của Lạc Long Quân và Âu Cơ được tôn lên làm vua, lấy hiệu là gì?',
    options: ['Hùng Vương', 'An Dương Vương', 'Lạc Vương', 'Hùng Quốc Vương'],
    correctAnswer: 0,
    explanation: 'Theo "Việt Nam Sử Lược", con trưởng ở lại đất Phong Châu được tôn lên nối ngôi cha, xưng là Hùng Vương, đặt quốc hiệu là Văn Lang, truyền được 18 đời.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_42',
    era: 'Triều Lý',
    type: 'short_answer',
    question: 'Ai là trạng nguyên đầu tiên trong lịch sử khoa cử Việt Nam, đỗ đầu khoa thi Minh kinh bác học năm 1075 dưới triều vua Lý Nhân Tông?',
    correctAnswer: 'Lê Văn Thịnh',
    acceptableAnswers: ['le van thinh', 'lê văn thịnh'],
    explanation: 'Lê Văn Thịnh đỗ đầu khoa thi Nho học đầu tiên năm 1075, sau làm đến chức Thái sư triều Lý, có tài ngoại giao đàm phán đòi lại vùng đất Quảng Nguyên cho nước nhà.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_43',
    era: 'Triều Trần',
    type: 'true_false',
    question: 'Hội nghị Diên Hồng năm 1284 là hội nghị các bô lão cả nước tụ họp tại kinh thành Thăng Long, đồng thanh hô vang "Đánh!" khi Thượng hoàng Trần Thánh Tông hỏi kế sách đối phó giặc Nguyên Mông. Nhận định này Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Đúng. Hội nghị Diên Hồng là biểu tượng sáng ngời cho tinh thần đại đoàn kết dân tộc, thể hiện ý chí "muôn người một lòng" triệu người như một của nước Đại Việt.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_44',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'short_answer',
    question: 'Hội nghị quân sự thề kết nghĩa huynh đệ 18 hào kiệt năm 1416 do Lê Lợi chủ trì trước khi chính thức dựng cờ khởi nghĩa Lam Sơn mang tên là gì?',
    correctAnswer: 'Hội thề Lũng Nhai',
    acceptableAnswers: ['hoi the lung nhai', 'hội thề lũng nhai', 'lung nhai', 'lũng nhai'],
    explanation: 'Mùa đông năm Bính Thân (1416), Lê Lợi cùng 18 bậc trung nghĩa hào kiệt (Nguyễn Trãi, Lê Lai, Trần Nguyên Hãn...) tổ chức Hội thề Lũng Nhai nguyện sống chết vì đại nghiệp cứu nước.',
    source: 'Cả hai bộ sử',
    difficulty: 'medium'
  },
  {
    id: 'sv_45',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Trận tập kích Đống Đa sáng mùng 5 Tết Kỷ Dậu (1789) đã khiến viên Đô đốc quân Thanh nào khiếp sợ phải thắt cổ tự vẫn tại đền Khương Thượng?',
    options: ['Sầm Nghi Đống', 'Hứa Thế Hanh', 'Thượng Duy Thăng', 'Ô Đại Kinh'],
    correctAnswer: 0,
    explanation: 'Đô đốc Sầm Nghi Đống chỉ huy đồn Khương Thượng (Đống Đa) bị đạo quân đô đốc Đặng Tiến Đông tập kích bất ngờ hỏa công thiêu rụi, thế cùng lực kiệt bèn thắt cổ tự vẫn.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  }
];

export const SU_VIET_QUESTIONS: SuVietQuestion[] = [
  ...BASE_QUESTIONS,
  ...SU_VIET_QUESTIONS_EXTRA_1,
  ...SU_VIET_QUESTIONS_EXTRA_2,
  ...SU_VIET_QUESTIONS_EXTRA_3,
  ...SU_VIET_QUESTIONS_EXTRA_4,
  ...SU_VIET_QUESTIONS_EXTRA_5,
  ...SU_VIET_QUESTIONS_EXTRA_6,
  ...SU_VIET_QUESTIONS_EXTRA_7,
  ...SU_VIET_QUESTIONS_EXTRA_8,
  ...SU_VIET_QUESTIONS_EXTRA_9,
  ...SU_VIET_QUESTIONS_EXTRA_10,
  ...SU_VIET_QUESTIONS_EXTRA_11,
  ...SU_VIET_QUESTIONS_EXTRA_12,
  ...SU_VIET_QUESTIONS_EXTRA_13,
  ...SU_VIET_QUESTIONS_EXTRA_14,
  ...SU_VIET_QUESTIONS_EXTRA_15,
  ...SU_VIET_QUESTIONS_EXTRA_16,
  ...SU_VIET_QUESTIONS_EXTRA_17,
  ...SU_VIET_QUESTIONS_EXTRA_18,
  ...SU_VIET_QUESTIONS_EXTRA_19,
  ...SU_VIET_QUESTIONS_EXTRA_20
];

// Hàm hỗ trợ chuẩn hóa tên nhân vật cho dạng điền ngắn
export function normalizeHeroName(input: string): string {
  if (!input) return '';
  return input
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Bỏ dấu tiếng Việt
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ');
}

// Kiểm tra câu trả lời điền ngắn
export function checkShortAnswer(userAnswer: string, question: SuVietQuestion): boolean {
  if (!userAnswer) return false;
  const normalizedUser = normalizeHeroName(userAnswer);
  
  // Kiểm tra đáp án chính
  const mainNorm = normalizeHeroName(String(question.correctAnswer));
  if (normalizedUser === mainNorm) return true;

  // Kiểm tra các biến thể tên chấp nhận được
  if (question.acceptableAnswers && question.acceptableAnswers.length > 0) {
    return question.acceptableAnswers.some(ans => normalizeHeroName(ans) === normalizedUser);
  }

  return false;
}
