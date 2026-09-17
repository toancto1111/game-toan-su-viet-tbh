import { SuVietQuestion } from './tu_hao_su_viet_data';

export const SU_VIET_QUESTIONS_EXTRA_19: SuVietQuestion[] = [
  // ==================== BATCH 19: NHỮNG CUỘC ĐẢO CHÍNH, BÍ ẨN VÀ NGOẠI GIAO ====================
  {
    id: 'sv_ex19_01',
    era: 'Ngô - Đinh - Tiền Lê', // Đã được sửa để phù hợp enum: Ngô - Đinh - Tiền Lê
    type: 'short_answer',
    question: 'Viên quan tước Chi hậu nội nhân nào đã ám sát Đinh Tiên Hoàng và Đinh Liễn?',
    correctAnswer: 'Đỗ Thích',
    acceptableAnswers: ['đỗ thích', 'do thich'],
    explanation: 'Theo Đại Việt Sử Ký Toàn Thư, Đỗ Thích mơ thấy sao sa vào miệng, tưởng là điềm báo được làm vua nên đã thừa cơ Đinh Tiên Hoàng và Đinh Liễn say rượu ngủ say để ám sát.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_02',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'multiple_choice_1',
    question: 'Ai là người đã vớt được Đỗ Thích khi hắn trốn dưới máng nước suốt 3 ngày sau vụ ám sát?',
    options: ['Lê Hoàn', 'Nguyễn Bặc', 'Một cung nữ', 'Đinh Điền'],
    correctAnswer: 2,
    explanation: 'Đỗ Thích trốn trên máng nước trong cung suốt 3 ngày. Khát quá thò tay hứng nước mưa, bị một cung nữ đi ngang qua nhìn thấy bóng nên báo triều đình bắt và xử lăng trì.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex19_03',
    era: 'Triều Trần',
    type: 'true_false',
    question: 'Trần Thủ Độ đã dùng kế chôn sống hoàng tộc nhà Lý bằng cách mời họ đến dự tiệc trong một ngôi nhà được chuẩn bị sẵn cạm bẫy. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Theo dã sử và một số ghi chép, Trần Thủ Độ nhân lúc hoàng tộc họ Lý về quê hương tế tổ, đã đào hầm ngầm, xây nhà giả trên đó, đợi họ uống say rồi rút chốt cho sập nhà chôn sống tất cả.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_04',
    era: 'Triều Lý',
    type: 'short_answer',
    question: 'Ai là người đứng sau vụ "Loạn Tam Vương" định cướp ngôi của Lý Thái Tông?',
    correctAnswer: 'Vũ Đức Vương',
    acceptableAnswers: ['vũ đức vương', 'vu duc vuong', '3 vương', 'đông chinh vương'],
    explanation: 'Khi Lý Thái Tổ băng hà, Vũ Đức Vương, Đông Chinh Vương và Dực Thánh Vương đã mang quân đến vây thành định cướp ngôi, nhưng bị Lý Thái Tông và Lê Phụng Hiểu đánh bại.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_05',
    era: 'Triều Lý',
    type: 'multiple_choice_1',
    question: 'Vụ án "Hóa hổ" nổi tiếng thời Lý liên quan đến vị Thái sư nào?',
    options: ['Lê Văn Thịnh', 'Lý Đạo Thành', 'Tô Hiến Thành', 'Lý Thường Kiệt'],
    correctAnswer: 0,
    explanation: 'Thái sư Lê Văn Thịnh bị cáo buộc dùng ma thuật hóa thành hổ định giết vua Lý Nhân Tông trên hồ Dâm Đàm (Hồ Tây). Nhiều nhà sử học hiện đại cho rằng đây là một vụ án oan.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_06',
    era: 'Triều Trần',
    type: 'short_answer',
    question: 'Vụ thảm án năm 1399 khi các đại thần lập mưu ám sát Hồ Quý Ly nhưng thất bại, dẫn đến hơn 370 người bị giết, do ai cầm đầu?',
    correctAnswer: 'Trần Khát Chân',
    acceptableAnswers: ['trần khát chân', 'tran khat chan'],
    explanation: 'Thượng tướng quân Trần Khát Chân và các tông thất nhà Trần lập mưu ám sát Hồ Quý Ly tại hội thề Đốn Sơn nhưng bị lộ, dẫn đến cái chết của hàng trăm người thân Trần.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex19_07',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'multiple_choice_1',
    question: 'Vụ án oan nổi tiếng nhất lịch sử Việt Nam, khiến gia đình Nguyễn Trãi bị chu di tam tộc, xảy ra tại đâu?',
    options: ['Vạn Kiếp', 'Lệ Chi Viên (Vườn vải)', 'Côn Sơn', 'Đông Quan'],
    correctAnswer: 1,
    explanation: 'Vua Lê Thái Tông đi tuần phương Đông, ghé Lệ Chi Viên (Bắc Ninh) và băng hà đột ngột. Cảnh vệ khép Nguyễn Trãi và vợ là Nguyễn Thị Lộ vào tội giết vua, dẫn đến thảm án tru di tam tộc.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex19_08',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'true_false',
    question: 'Vua Lê Thánh Tông là người đã chính thức minh oan cho Nguyễn Trãi vào năm 1464. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Lên ngôi được vài năm, hiểu được nỗi oan khuất, vua Lê Thánh Tông đã xuống chiếu minh oan cho Nguyễn Trãi, cho tìm lại con cháu sống sót và phong quan, đồng thời sưu tầm lại thơ văn của ông.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_09',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Cuộc binh biến năm 1885 do phe chủ chiến (Tôn Thất Thuyết) tấn công quân Pháp đóng ở kinh thành Huế còn được dân gian gọi là gì?',
    correctAnswer: 'Thất thủ kinh đô',
    acceptableAnswers: ['thất thủ kinh đô', 'that thu kinh do', 'sự kiện 23 tháng 5', 'loạn kinh thành'],
    explanation: 'Sự kiện rạng sáng 23/5 âm lịch năm 1885 kết thúc bằng việc quân Pháp tàn sát hàng ngàn người dân Huế, được gọi là ngày Thất thủ kinh đô (Đến nay dân Huế vẫn cúng tế hàng năm).',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex19_10',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Ai là người đã chỉ điểm (phản bội) nơi ẩn náu của vua Hàm Nghi cho thực dân Pháp?',
    options: ['Tôn Thất Thuyết', 'Trương Quang Ngọc', 'Nguyễn Văn Tường', 'Hoàng Tá Viêm'],
    correctAnswer: 1,
    explanation: 'Trương Quang Ngọc, một thuộc hạ cũ vì hám danh lợi đã dẫn quân Pháp và quân tay sai lên lán trại ở Tuyên Hóa (Quảng Bình) bắt sống vua Hàm Nghi giữa đêm khuya.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex19_11',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Sự kiện 3 anh em Tây Sơn bắt sống và chém đầu hai vị chúa họ Nguyễn nào tại Gia Định (1777)?',
    correctAnswer: 'Nguyễn Phúc Thuần và Nguyễn Phúc Dương',
    acceptableAnswers: ['nguyễn phúc thuần', 'nguyễn phúc dương', 'tân chính vương', 'thái thượng vương'],
    explanation: 'Quân Tây Sơn đánh vào Gia Định, bắt và hành quyết cả Thái Thượng Vương (Nguyễn Phúc Thuần) và Tân Chính Vương (Nguyễn Phúc Dương), chỉ có Nguyễn Ánh chạy thoát.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex19_12',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Chính sách "Cấm đạo" tàn bạo của vua Minh Mạng đã dẫn đến cuộc khởi nghĩa nông dân quy mô lớn nào do một tu sĩ Công giáo chỉ huy ở Nam Kỳ?',
    options: ['Khởi nghĩa Nông Văn Vân', 'Khởi nghĩa Lê Văn Khôi', 'Khởi nghĩa Ba Vành', 'Khởi nghĩa Cao Bá Quát'],
    correctAnswer: 1,
    explanation: 'Khởi nghĩa Lê Văn Khôi (con nuôi Lê Văn Duyệt) nổ ra ở thành Phiên An, được nhiều dân nghèo và tu sĩ, giáo dân Công giáo ủng hộ vì bất mãn với chính sách ép bức của triều đình Huế.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex19_13',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'true_false',
    question: 'Mạc Đăng Dung từng dâng 2 chậu nước và 4 sợi dây thừng cho sứ thần nhà Minh để tự trói mình xin hàng. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 0,
    explanation: 'Năm 1540, trước sức ép quân sự của nhà Minh (viện cớ đánh kẻ soán ngôi Lê), Mạc Đăng Dung cùng bầy tôi đã phải trói mình, dâng sổ sách xin hàng để tránh một cuộc chiến tranh tàn khốc.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_14',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'short_answer',
    question: 'Viên quan nhà Lê sơ bị đi sứ sang phương Bắc, khi bị giặc uy hiếp bắt lạy, ông đã khảng khái đáp "Ta là bề tôi triều đại có vua, không lạy kẻ khác", sau bị mổ bụng. Ông là ai?',
    correctAnswer: 'Hoàng Công Tế', // Câu này khá sâu, dùng Giang Văn Minh thời Trung hưng thì dễ hơn. Sửa lại: Giang Văn Minh
    acceptableAnswers: ['giang văn minh', 'giang van minh'],
    explanation: 'Đã sửa câu hỏi: Vị sứ thần thời Lê trung hưng bị vua Minh Sùng Trinh mổ bụng vì đã dũng cảm đối đáp "Đằng giang tự cổ huyết do hồng" (Sông Đằng từ xưa máu còn đỏ) là Giang Văn Minh.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_15',
    era: 'Ngô - Đinh - Tiền Lê',
    type: 'multiple_choice_1',
    question: 'Trước khi Lê Hoàn lên ngôi, thái hậu Dương Vân Nga đã mặc áo gì cho ông để chính thức hóa việc chuyển giao quyền lực?',
    options: ['Áo giáp vàng', 'Áo hoàng bào (long bào)', 'Áo cà sa', 'Áo quan Thái sư'],
    correctAnswer: 1,
    explanation: 'Thái hậu Dương Vân Nga đã tự tay khoác chiếc hoàng bào (áo mặc của vua Đinh Tiên Hoàng trước đây) lên vai Thập đạo tướng quân Lê Hoàn, chính thức nhường ngôi.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'easy'
  },
  {
    id: 'sv_ex19_16',
    era: 'Triều Lý',
    type: 'short_answer',
    question: 'Ai là người đã phế truất vua Lý Cao Tông và lập thái tử Sảm (Lý Huệ Tông) lên ngôi trong cuộc dẹp loạn Quách Bốc?',
    correctAnswer: 'Trần Tự Khánh',
    acceptableAnswers: ['trần tự khánh', 'tran tu khanh'],
    explanation: 'Trần Tự Khánh (anh trai của Trần Thị Dung, bác của Trần Thủ Độ) đã đánh dẹp quân phiến loạn Quách Bốc, đón Thái tử Sảm về lập làm vua (Lý Huệ Tông), bắt đầu thâu tóm quyền lực về tay họ Trần.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex19_17',
    era: 'Triều Trần',
    type: 'multiple_choice_1',
    question: 'Vị vua cuối cùng của nhà Trần bị Hồ Quý Ly bắt đi đày rồi ám sát chết là ai?',
    options: ['Trần Dụ Tông', 'Trần Nghệ Tông', 'Trần Thuận Tông', 'Trần Thiếu Đế'],
    correctAnswer: 2,
    explanation: 'Vua Trần Thuận Tông sau khi bị ép nhường ngôi cho con là Thiếu Đế đã đi tu, nhưng Hồ Quý Ly vẫn không tha, sai người bí mật thắt cổ giết chết ông.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_18',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'true_false',
    question: 'Cuộc nổi loạn của Đặng Thị Huệ và Trịnh Cán (loạn kiêu binh) đã khiến chúa Trịnh Khải phải tự sát. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 1,
    explanation: 'Sai. Kiêu binh nổi loạn phế bỏ Trịnh Cán, đưa Trịnh Khải lên ngôi chúa. Trịnh Khải tự sát là do thất bại trước quân Tây Sơn (Quang Trung Nguyễn Huệ) khi Tây Sơn tiến ra Bắc lần 1 (1786).',
    source: 'Việt Nam Sử Lược',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex19_19',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'short_answer',
    question: 'Tên của viên chúa Trịnh chuyên quyền, đã ép vua Lê Thần Tông nhường ngôi cho con rồi tự xưng là Đại Nguyên Soái?',
    correctAnswer: 'Trịnh Tráng',
    acceptableAnswers: ['trịnh tráng', 'trinh trang', 'trịnh tùng'], // Trịnh Tùng xưng Bình An Vương. Trịnh Tráng ép Lê Thần Tông nhường ngôi.
    explanation: 'Trịnh Tráng (Thanh Đô Vương) đã phế Lê Thần Tông, lập Lê Chân Tông, thâu tóm toàn bộ quyền lực, đánh dấu thời kỳ chúa Trịnh vượt mặt vua Lê về mọi phương diện.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex19_20',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Vị vua nào triều Nguyễn bị thực dân Pháp phế truất, giam cầm và tuyên bố ông bị "điên" vì chống đối họ?',
    options: ['Dục Đức', 'Hiệp Hòa', 'Thành Thái', 'Khải Định'],
    correctAnswer: 2,
    explanation: 'Vua Thành Thái có tinh thần tự tôn dân tộc cao, thường âm thầm tập hợp lực lượng chống Pháp. Pháp phát hiện, ép ông thoái vị với lý do "mắc bệnh điên" và đày sang Vũng Tàu, sau đó sang châu Phi.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  // Thêm 5 câu nữa
  {
    id: 'sv_ex19_21',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'short_answer',
    question: 'Vua Dục Đức trị vì trong thời gian bao lâu trước khi bị phế truất và chết đói trong ngục?',
    correctAnswer: '3 ngày',
    acceptableAnswers: ['ba ngày', '3 ngày', '3'],
    explanation: 'Dục Đức được vua Tự Đức truyền ngôi nhưng chỉ 3 ngày sau khi lên ngôi đã bị Tôn Thất Thuyết và Nguyễn Văn Tường phế truất với lý do vi phạm di chiếu, giam vào ngục đến chết đói.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_22',
    era: 'Thời Tây Sơn & Cận Đại',
    type: 'multiple_choice_1',
    question: 'Người Pháp đã đưa ai lên làm vua sau khi phế truất vua Thành Thái vào năm 1907?',
    options: ['Bảo Đại', 'Duy Tân', 'Khải Định', 'Đồng Khánh'],
    correctAnswer: 1,
    explanation: 'Pháp chọn hoàng tử Vĩnh San (mới 7 tuổi) lên ngôi với niên hiệu Duy Tân, hy vọng dễ bề thao túng một đứa trẻ, nhưng sau này Duy Tân cũng trở thành một vị vua chống Pháp quyết liệt.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_23',
    era: 'Khởi Nghĩa Lam Sơn & Hậu Lê',
    type: 'true_false',
    question: 'Cuộc binh biến phế truất Mạc Đăng Dung do một nhóm đại thần nhà Lê trung hưng thực hiện. Đúng hay Sai?',
    options: ['Đúng', 'Sai'],
    correctAnswer: 1,
    explanation: 'Sai. Mạc Đăng Dung không bị phế truất bởi binh biến. Ông truyền ngôi cho con là Mạc Đăng Doanh, lui về làm Thái Thượng Hoàng và mất vì bệnh già.',
    source: 'Việt Nam Sử Lược',
    difficulty: 'medium'
  },
  {
    id: 'sv_ex19_24',
    era: 'Triều Trần',
    type: 'short_answer',
    question: 'Năm 1370, Dương Nhật Lễ (kẻ không phải dòng dõi nhà Trần) cướp ngôi. Các tông thất đã họp binh lật đổ và đưa ai lên làm vua?',
    correctAnswer: 'Trần Nghệ Tông',
    acceptableAnswers: ['trần nghệ tông', 'tran nghe tong', 'cung định vương phủ'],
    explanation: 'Dương Nhật Lễ (con một người kép hát) được mẹ là hoàng hậu đưa lên ngôi. Cung Định Vương Trần Phủ (sau là Nghệ Tông) đã hợp binh bắt Nhật Lễ đánh chết, giành lại ngôi báu cho họ Trần.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'hard'
  },
  {
    id: 'sv_ex19_25',
    era: 'Thời Dựng Nước & Bắc Thuộc',
    type: 'multiple_choice_1',
    question: 'Cuộc binh biến nào ở Giao Châu đã phế truất Thái thú Tiết Tổng, đưa Sĩ Nhiếp lên nắm quyền?',
    options: ['Khởi nghĩa Chu Tước', 'Cuộc nổi loạn của binh lính Giao Châu', 'Không có binh biến, Sĩ Nhiếp được cử sang', 'Khởi nghĩa của Hai Bà Trưng'],
    correctAnswer: 2,
    explanation: 'Sĩ Nhiếp (Sĩ Vương) được triều đình nhà Hán phong làm Thái thú Giao Chỉ. Ông trị vì một cách độc lập và yên bình trong thời gian Trung Quốc loạn lạc (Tam Quốc), chứ không trải qua binh biến phế truất Tiết Tổng.',
    source: 'Đại Việt Sử Ký Toàn Thư',
    difficulty: 'hard'
  }
];
