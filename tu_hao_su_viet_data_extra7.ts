import { SuVietQuestion } from './tu_hao_su_viet_data';

export const SU_VIET_QUESTIONS_EXTRA_7: SuVietQuestion[] = [
  // ==================== BATCH 7: SỰ KIỆN, TRẬN ĐÁNH & NGOẠI GIAO ====================
  {
    id: 'sv_ex7_01',
    era: 'Triều Lý',
    type: 'short_answer',
    question: 'Trận tuyến trên sông nào đã chặn đứng hoàn toàn quân Tống tiến vào Thăng Long năm 1077?',
    correctAnswer: 'Sông Như Nguyệt',
    acceptableAnswers: ['như nguyệt', 'sông như nguyệt', 'sông cầu', 'song cau'],
    explanation: 'Phòng tuyến sông Như Nguyệt (sông Cầu ngày nay) do Lý Thường Kiệt xây dựng với hàng rào tre cọc kiên cố đã chặn đứng hoàn toàn 10 vạn quân Tống của Quách Quỳ.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex7_02',
    era: 'Triều Trần',
    type: 'multiple_choice_1',
    question: 'Trong 3 lần kháng chiến chống Mông - Nguyên, kinh thành Thăng Long bị giặc chiếm đóng mấy lần?',
    options: ['1 lần', '2 lần', '3 lần', 'Không lần nào'],
    correctAnswer: 2,
    explanation: 'Cả 3 lần xâm lược (1258, 1285, 1287-1288), quân Mông - Nguyên đều tiến vào được Thăng Long, nhưng quân dân nhà Trần đã thực hiện chiến thuật "vườn không nhà trống" khiến giặc đói khát rồi phản công giành lại.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex7_03',
    era: 'Triều Trần',
    type: 'true_false',
    question: 'Trận Vân Đồn (1287) là trận thủy chiến tiêu diệt toàn bộ đoàn thuyền lương của quân Nguyên do Trương Văn Hổ chỉ huy. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Dưới sự chỉ huy của Trần Khánh Dư, quân Trần đã mai phục tại Vân Đồn, đánh chìm và bắt gọn toàn bộ đoàn thuyền lương khổng lồ của Trương Văn Hổ, đẩy quân Nguyên vào thế đói khát.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex7_04',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'short_answer',
    question: 'Hội thề nào đánh dấu sự gắn kết sinh tử của Lê Lợi và 18 vị anh hùng ban đầu của cuộc khởi nghĩa?',
    correctAnswer: 'Hội thề Lũng Nhai',
    acceptableAnswers: ['hội thề lũng nhai', 'lũng nhai', 'lung nhai'],
    explanation: 'Năm 1416, Lê Lợi cùng 18 người bạn chiến đấu đã cắt máu ăn thề tại rừng Lũng Nhai (Thanh Hóa), nguyện sống chết có nhau đánh đuổi giặc Minh.',
    source: 'Cả hai bộ sử',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex7_05',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'multiple_choice_1',
    question: 'Kế sách "Tâm công" trong khởi nghĩa Lam Sơn có nghĩa là gì?',
    options: ['Đánh vào tim giặc', 'Đánh vào lòng người', 'Tấn công ban đêm', 'Dùng tâm lý chiến đe dọa'],
    correctAnswer: 1,
    explanation: 'Nguyễn Trãi chủ trương "đánh vào lòng người" (tâm công), dùng thư từ dụ hàng tướng giặc, không chiến mà khuất phục được binh lính địch.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex7_06',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Trận đánh nào đã chôn vùi 5 vạn quân Xiêm La dưới đáy sông Tiền chỉ trong một đêm?',
    correctAnswer: 'Rạch Gầm Xoài Mút',
    acceptableAnswers: ['rạch gầm - xoài mút', 'rach gam xoai mut', 'rạch gầm xoài mút'],
    explanation: 'Trận thủy chiến Rạch Gầm - Xoài Mút do Nguyễn Huệ chỉ huy là một trong những trận đánh vĩ đại nhất lịch sử, tiêu diệt hoàn toàn viện binh Xiêm La.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex7_07',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Trong chiến dịch giải phóng Thăng Long (1789), đạo quân do Đô đốc Long chỉ huy đã đánh vào đồn nào?',
    options: ['Ngọc Hồi', 'Khương Thượng (Đống Đa)', 'Hà Hồi', 'Văn Điển'],
    correctAnswer: 1,
    explanation: 'Đạo quân của Đô đốc Long (Đặng Tiến Đông) được lệnh tiến đánh bất ngờ vào đồn Khương Thượng, khiến Sầm Nghi Đống phải thắt cổ tự tử.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex7_08',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'true_false',
    question: 'Hiệp ước Nhâm Tuất (1862) là hiệp ước mà triều đình Huế cắt 3 tỉnh miền Đông Nam Kỳ cho Pháp. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Năm 1862, triều đình Tự Đức cử Phan Thanh Giản ký Hiệp ước Nhâm Tuất, nhượng 3 tỉnh miền Đông Nam Kỳ (Gia Định, Định Tường, Biên Hòa) cho Pháp.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex7_09',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Sự kiện năm 1885 khi Tôn Thất Thuyết đánh úp đồn Mang Cá và tòa Khâm sứ Pháp được gọi là gì?',
    correctAnswer: 'Kinh thành thất thủ',
    acceptableAnswers: ['kinh thành thất thủ', 'kinh thanh that thu', 'thất thủ kinh đô', 'sự kiện 23 tháng 5'],
    explanation: 'Cuộc phản công của phe chủ chiến do Tôn Thất Thuyết chỉ huy thất bại, dẫn đến việc quân Pháp tràn vào tàn sát kinh thành Huế (được dân gian gọi là ngày Thất thủ kinh đô 23/5 âm lịch).',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex7_10',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'multiple_choice_1',
    question: 'Sau chiến thắng Bạch Đằng năm 938, Ngô Quyền xưng Vương và đóng đô ở đâu?',
    options: ['Hoa Lư', 'Cổ Loa', 'Phong Châu', 'Thăng Long'],
    correctAnswer: 1,
    explanation: 'Ngô Quyền sau khi đánh đuổi quân Nam Hán đã không xưng Đế mà xưng Vương, và quyết định đóng đô tại Cổ Loa để nối tiếp truyền thống của An Dương Vương.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex7_11',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'short_answer',
    question: 'Trận chiến nào đã kết thúc ách đô hộ của nhà Lương đối với nước Vạn Xuân năm 548?',
    correctAnswer: 'Không có trận nào', // Câu mẹo
    acceptableAnswers: ['hồ điển triệt', 'đầm dạ trạch', 'dạ trạch'],
    explanation: 'Thực tế Lý Nam Đế thất bại ở hồ Điển Triệt và lui về động Khuất Lão (548). Phải đến thời Triệu Quang Phục đánh ở Dạ Trạch và sau đó Lý Phật Tử mới khôi phục một phần. Đây là câu hỏi khó để học sinh suy luận (đáp án Dạ Trạch được chấp nhận cho giai đoạn này).',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex7_12',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'multiple_choice_1',
    question: 'Cuộc khởi nghĩa nông dân lớn nhất dưới thời Lê trung hưng (thế kỷ 18) do ai lãnh đạo ở vùng Hải Dương?',
    options: ['Nguyễn Hữu Cầu', 'Hoàng Công Chất', 'Nguyễn Danh Phương', 'Lê Duy Mật'],
    correctAnswer: 0,
    explanation: 'Nguyễn Hữu Cầu (Quận He) lãnh đạo cuộc khởi nghĩa nông dân quy mô rất lớn ở Đồ Sơn, Hải Dương, gây kinh hoàng cho chính quyền chúa Trịnh.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex7_13',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'true_false',
    question: 'Trận Cầu Giấy lần 1 (1873) là nơi tướng Pháp Francis Garnier bị quân cờ đen của Lưu Vĩnh Phúc chém chết. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Trong trận Cầu Giấy (1873), Francis Garnier (Gác-ni-ê) lọt vào ổ phục kích của quân Cờ Đen và bị tiêu diệt, khiến quân Pháp hoang mang phải rút khỏi Hà Nội.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex7_14',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Tên tướng Pháp bị tiêu diệt trong trận Cầu Giấy lần 2 (1882) là ai?',
    correctAnswer: 'Henri Rivière',
    acceptableAnswers: ['henri rivière', 'riviere', 'ri-vi-e', 'rivière'],
    explanation: 'Giống như Garnier, Henri Rivière mang quân ra đánh Hà Nội lần 2 và cũng bị quân Cờ Đen phối hợp với quân triều đình tiêu diệt tại trận Cầu Giấy năm 1883.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex7_15',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Chính sách "Bế quan tỏa cảng" của triều Nguyễn đã dẫn đến hậu quả gì?',
    options: ['Bảo vệ được nền văn hóa', 'Làm cho đất nước tụt hậu, dễ bị xâm lược', 'Phát triển nông nghiệp mạnh mẽ', 'Tăng cường quan hệ với Trung Quốc'],
    correctAnswer: 1,
    explanation: 'Chính sách đóng cửa, cấm đạo, không giao thương với phương Tây của triều Nguyễn đã khiến đất nước không bắt kịp đà phát triển của thế giới và trở thành nạn nhân của thực dân Pháp.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex7_16',
    era: 'Triều Lý',
    type: 'short_answer',
    question: 'Vào thời Lý, để củng cố biên giới, nhà vua thường dùng chính sách ngoại giao nào với các tù trưởng dân tộc thiểu số?',
    correctAnswer: 'Gả công chúa',
    acceptableAnswers: ['gả công chúa', 'nhu viễn', 'kết hôn', 'hòa thân'],
    explanation: 'Nhà Lý thường dùng chính sách nhu viễn, gả công chúa cho các tù trưởng vùng biên giới (như Thân Cảnh Phúc) để tạo sự ràng buộc thân tình, bảo vệ biên cương.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex7_17',
    era: 'Triều Trần',
    type: 'multiple_choice_1',
    question: 'Trong Hội nghị Diên Hồng, vua Trần Thánh Tông đã làm hành động gì để biểu thị sự kính trọng với các bô lão?',
    options: ['Tự tay rót rượu ban cho bô lão', 'Ban yến tiệc và tự tay gắp thức ăn', 'Quỳ xuống hỏi ý kiến', 'Ban tước vị cho tất cả'],
    correctAnswer: 1,
    explanation: 'Theo Đại Việt Sử Ký Toàn Thư, vua ban yến tiệc cho các bô lão ở thềm điện Diên Hồng và hỏi kế đánh giặc, thể hiện tinh thần dân chủ rất cao thời Trần.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex7_18',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'true_false',
    question: 'Trận Rạch Gầm - Xoài Mút là trận đánh lớn nhất thời Lê sơ chống lại quân Minh. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 1,
    explanation: 'Sai hoàn toàn. Trận Rạch Gầm - Xoài Mút là của Quang Trung thời Tây Sơn đánh Xiêm La. Trận đánh lớn thời Lê sơ chống Minh là Chi Lăng - Xương Giang.',
    source: 'Cả hai bộ sử',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex7_19',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Tại Huế, hệ thống lăng tẩm của vua nào được đánh giá là công phu và tốn kém nhất, gây ra cuộc nổi loạn của thợ xây (Loạn Chày Vôi)?',
    correctAnswer: 'Tự Đức',
    acceptableAnswers: ['tự đức', 'tu duc', 'vua tự đức'],
    explanation: 'Quá trình xây dựng Vạn Niên Cơ (sau gọi là Khiêm Lăng) cho vua Tự Đức vô cùng cực khổ, dẫn đến cuộc nổi loạn của dân phu Đoàn Hữu Trưng (loạn chày vôi).',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex7_20',
    era: 'Triều Lý',
    type: 'multiple_choice_1',
    question: 'Quốc hiệu Đại Cồ Việt được đổi thành Đại Việt vào năm nào?',
    options: ['1010', '1054', '1070', '1225'],
    correctAnswer: 1,
    explanation: 'Năm Giáp Ngọ (1054), vua Lý Thánh Tông lên ngôi và chính thức đổi quốc hiệu từ Đại Cồ Việt (có từ thời Đinh) thành Đại Việt.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'easy'
  }
];
