import { SuVietQuestion } from './tu_hao_su_viet_data';

export const SU_VIET_QUESTIONS_EXTRA_2: SuVietQuestion[] = [
  // ==================== NGÔ - ĐINH - TIỀN LÊ ====================
  {
    id: 'sv_ex2_01',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'short_answer',
    question: 'Ai là người đã sử dụng kế cắm cọc gỗ trên sông Bạch Đằng năm 938 để đánh bại quân Nam Hán, kết thúc 1000 năm Bắc thuộc?',
    correctAnswer: 'Ngô Quyền',
    acceptableAnswers: ['ngô quyền', 'ngo quyen', 'tiền ngô vương'],
    explanation: 'Năm 938, Ngô Quyền đã dùng mưu cắm cọc nhọn bọc sắt dưới lòng sông Bạch Đằng, lợi dụng thủy triều để tiêu diệt hạm đội của Lưu Hoằng Tháo, giành lại độc lập cho dân tộc.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex2_02',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'multiple_choice_1',
    question: 'Sau khi dẹp loạn 12 sứ quân, Đinh Bộ Lĩnh lên ngôi Hoàng đế và đặt tên nước là gì?',
    options: ['Vạn Xuân', 'Đại Cồ Việt', 'Đại Việt', 'Đại Nam'],
    correctAnswer: 1,
    explanation: 'Năm Mậu Thìn (968), Đinh Bộ Lĩnh dẹp yên 12 sứ quân, lên ngôi Hoàng đế (Đinh Tiên Hoàng), đặt quốc hiệu là Đại Cồ Việt, đóng đô ở Hoa Lư.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex2_03',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'true_false',
    question: 'Lê Hoàn được Thái hậu Dương Vân Nga khoác áo long bào lên ngôi vua để lãnh đạo cuộc kháng chiến chống quân Tống năm 981. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Trước nguy cơ quân Tống xâm lược, Thái hậu Dương Vân Nga đã lấy áo long bào khoác lên người Thập đạo tướng quân Lê Hoàn, tôn ông lên ngôi vua (Lê Đại Hành) để chỉ huy giữ nước.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex2_04',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'short_answer',
    question: 'Người con cả của Đinh Tiên Hoàng đã bị ám sát cùng vua cha trong cung năm 979 tên là gì?',
    correctAnswer: 'Đinh Liễn',
    acceptableAnswers: ['đinh liễn', 'dinh lien', 'đinh khuông liễn'],
    explanation: 'Đêm tháng 10 năm Kỷ Mão (979), Đinh Tiên Hoàng và con trưởng là Nam Việt vương Đinh Liễn bị viên quan Đỗ Thích ám sát trong cung.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex2_05',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'multiple_choice_1',
    question: 'Kinh đô Hoa Lư (Ninh Bình) là kinh đô của những triều đại nào?',
    options: ['Ngô, Đinh', 'Đinh, Tiền Lê', 'Tiền Lê, Lý', 'Lý, Trần'],
    correctAnswer: 1,
    explanation: 'Hoa Lư được Đinh Tiên Hoàng chọn làm kinh đô năm 968, và tiếp tục là kinh đô dưới triều Tiền Lê của Lê Đại Hành cho đến khi Lý Công Uẩn dời đô về Thăng Long (1010).',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },

  // ==================== CÁC CÂU HỎI THỜI KỲ KHÁC (NGẪU NHIÊN THÊM) ====================
  {
    id: 'sv_ex2_06',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'true_false',
    question: 'Trạng Lường Lương Thế Vinh là người biên soạn cuốn "Đại thành toán pháp" nổi tiếng. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Lương Thế Vinh đỗ Trạng Nguyên khoa Quý Mùi (1463) đời Lê Thánh Tông, nổi tiếng giỏi toán và đã soạn cuốn "Đại thành toán pháp" được dùng làm sách giáo khoa suốt nhiều thế kỷ.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex2_07',
    era: 'Triều Lý',
    type: 'short_answer',
    question: 'Tên ngôi chùa nổi tiếng ở Hà Nội do vua Lý Thái Tông xây dựng, kiến trúc giống một đóa sen mọc lên từ mặt nước là chùa gì?',
    correctAnswer: 'Chùa Một Cột',
    acceptableAnswers: ['chùa một cột', 'chua mot cot', 'diên hựu tự', 'chùa diên hựu'],
    explanation: 'Năm Kỷ Sửu (1049), vua Lý Thái Tông nằm mộng thấy Phật Quan Âm dắt lên đài hoa sen, sau đó cho dựng chùa Diên Hựu (Chùa Một Cột) theo hình dáng đó.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex2_08',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Ai là người lãnh đạo cuộc khởi nghĩa Yên Thế kéo dài gần 30 năm chống lại thực dân Pháp?',
    options: ['Phan Đình Phùng', 'Hoàng Hoa Thám', 'Đinh Công Tráng', 'Nguyễn Thiện Thuật'],
    correctAnswer: 1,
    explanation: 'Hoàng Hoa Thám (Đề Thám) còn được gọi là "Hùm thiêng Yên Thế", đã lãnh đạo cuộc khởi nghĩa nông dân Yên Thế chống Pháp từ năm 1884 đến 1913.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex2_09',
    era: 'Triều Trần',
    type: 'short_answer',
    question: 'Vị vua cuối cùng của triều Trần bị Hồ Quý Ly ép nhường ngôi năm 1400 là ai?',
    correctAnswer: 'Trần Thiếu Đế',
    acceptableAnswers: ['trần thiếu đế', 'tran thieu de', 'thiếu đế'],
    explanation: 'Năm Canh Thìn (1400), Hồ Quý Ly phế truất cháu ngoại của mình là Trần Thiếu Đế (lúc đó mới 5 tuổi), tự lên ngôi lập ra nhà Hồ, chấm dứt triều Trần.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex2_10',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'multiple_choice_1',
    question: 'Vị anh hùng nào có câu nói nổi tiếng: "Tôi muốn cưỡi cơn gió mạnh, đạp luồng sóng dữ, chém cá kình ở biển Đông..."?',
    options: ['Trưng Trắc', 'Trưng Nhị', 'Bà Triệu', 'Lê Chân'],
    correctAnswer: 2,
    explanation: 'Bà Triệu (Triều Thị Trinh) khi được khuyên lấy chồng đã khảng khái đáp: "Tôi muốn cưỡi cơn gió mạnh... chứ không thèm bắt chước thế tục cúi đầu lưng làm tì thiếp cho người ta."',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  }
];
