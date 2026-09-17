import { Hero, Rarity } from './types';
import { DEFAULT_ENEMY_IMG, INITIAL_HEROES, ENEMY_HEROES } from './constants';

export interface TrialEnemyRaw {
  name: string;
  title: string;
  desc: string;
}

export interface HeroTrialStage {
  id: number;
  name: string;
  year: string;
  context: string;
  recommendedPower: number;
  enemiesRaw: TrialEnemyRaw[];
}

export const HERO_TRIAL_STAGES: HeroTrialStage[] = [
  {
    id: 1,
    name: "Trận Lãng Bạc",
    year: "Năm 42",
    context: "Quân Hán mang quân số áp đảo, vũ khí kim loại và ngựa chiến tiến sang nhằm đè bẹp chính quyền non trẻ của Hai Bà Trưng. Nghĩa quân Hai Bà Trưng tuy anh dũng nhưng trang bị thô sơ, chưa có nhiều kinh nghiệm dàn trận quy mô lớn trước quân chính quy nhà Hán.",
    recommendedPower: 12000,
    enemiesRaw: [
      { name: "Mã Viện", title: "Phục ba Tướng quân", desc: "Tổng chỉ huy quân Hán" },
      { name: "Lưu Long", title: "Phù Lạc hầu", desc: "Phó tướng của Mã Viện" },
      { name: "Đoàn Chí", title: "Lâu thuyền tướng quân", desc: "Chỉ huy thủy quân" },
      { name: "Hàn Uy", title: "Tì tướng", desc: "Tham gia chỉ huy bộ binh" },
      { name: "Tôn Thất Hồn", title: "Tì tướng", desc: "Cùng cánh quân với Hàn Uy" },
      { name: "Hán Quang Vũ Đế", title: "Hoàng đế nhà Hán", desc: "Người hạ chiếu điều động binh lực" }
    ]
  },
  {
    id: 2,
    name: "Trận đầm Dạ Trạch",
    year: "548 - 550",
    context: "Quân Lương ban đầu rất mạnh nhưng bị sa lầy vào đầm Dạ Trạch do không quen thuộc địa hình. Triệu Quang Phục lợi dụng đầm lầy hiểm trở để đánh du kích tiêu hao sinh lực địch, cuối cùng phản công khi nội bộ giặc suy yếu.",
    recommendedPower: 18000,
    enemiesRaw: [
      { name: "Trần Bá Tiên", title: "Tư mã Giao Châu", desc: "Tướng thiện chiến nhất chỉ huy vây hãm Dạ Trạch" },
      { name: "Dương Phiêu", title: "Thứ sử Giao Châu", desc: "Chỉ huy chung của nhà Lương" },
      { name: "Dương Sàn", title: "Tì tướng", desc: "Thay Trần Bá Tiên giữ quyền chỉ huy và bị tử trận" },
      { name: "Vương Tăng Biện", title: "Đại tướng nhà Lương", desc: "Hỗ trợ chiến dịch dẹp loạn phương Nam" },
      { name: "Tiêu Tư", title: "Cựu Thứ sử", desc: "Bị đuổi trước đó, luôn tìm cách báo thù" },
      { name: "Lương Vũ Đế", title: "Hoàng đế nhà Lương", desc: "Kẻ phát động cuộc chiến tiêu diệt vạn Xuân" }
    ]
  },
  {
    id: 3,
    name: "Trận Bạch Đằng lần 1",
    year: "Năm 938",
    context: "Lưu Hoằng Tháo ỷ thế quân đông, thuyền lớn tiến vào Bạch Đằng với ý đồ đánh nhanh. Ngô Quyền đã lường trước, chủ động diệt nội phản, ổn định lòng quân và bày sẵn trận địa cọc ngầm đón lõng giặc.",
    recommendedPower: 26000,
    enemiesRaw: [
      { name: "Lưu Hoằng Tháo", title: "Giao Châu thứ sử", desc: "Chủ soái đạo quân Nam Hán tử trận tại Bạch Đằng" },
      { name: "Lưu Nghiễm", title: "Hoàng đế Nam Hán", desc: "Cha của Hoằng Tháo, dẫn đại quân đóng ở Hải Môn" },
      { name: "Kiều Công Tiễn", title: "Kẻ phản thần", desc: "Làm nội ứng cầu viện Nam Hán" },
      { name: "Trình Diên", title: "Tướng Nam Hán", desc: "Đi theo Hầu Hoằng Tháo" },
      { name: "Vương Tiễn", title: "Tướng Nam Hán", desc: "Đi theo Hầu Hoằng Tháo" },
      { name: "Tiêu Ích", title: "Thượng thư Lại bộ", desc: "Can ngăn xuất binh nhưng không thành" }
    ]
  },
  {
    id: 4,
    name: "Trận Bạch Đằng lần 2",
    year: "Năm 981",
    context: "Nhà Tống lợi dụng Đại Cồ Việt rối ren để xâm lược. Lê Hoàn kế thừa chiến thuật cọc ngầm của Ngô Quyền, nhử thủy quân địch vào bãi cọc để tiêu diệt, làm phá sản hoàn toàn kế hoạch phối hợp thủy bộ.",
    recommendedPower: 38000,
    enemiesRaw: [
      { name: "Hầu Nhân Bảo", title: "Tổng chỉ huy thủy quân", desc: "Tử trận tại Bạch Đằng" },
      { name: "Lưu Trừng", title: "Phó tướng thủy quân", desc: "Khâm châu Lộ bố hải bộ trù sứ" },
      { name: "Giả Thực", title: "Tướng thủy quân", desc: "Chỉ huy chiến thuyền nhà Tống" },
      { name: "Vương Soạn", title: "Tướng thủy quân", desc: "Chỉ huy chiến thuyền nhà Tống" },
      { name: "Tôn Toàn Hưng", title: "Tổng chỉ huy bộ binh", desc: "Trách nhiệm phối hợp nhưng chần chừ" },
      { name: "Tống Thái Tông", title: "Hoàng đế nhà Tống", desc: "Phát động chiến tranh nhân lúc Đinh Tiên Hoàng mất" }
    ]
  },
  {
    id: 5,
    name: "Trận Chi Lăng lần 1",
    year: "Năm 981",
    context: "Cánh quân bộ Tống đóng ở Lạng Sơn nghe tin thủy quân bị diệt thì nhuệ khí suy sụp. Lê Hoàn chớp thời cơ dốc toàn lực lượng lên ải Chi Lăng đánh một trận phủ đầu khiến quân Tống tan vỡ.",
    recommendedPower: 55000,
    enemiesRaw: [
      { name: "Tôn Toàn Hưng", title: "Tổng chỉ huy bộ binh", desc: "Tiến vào Lạng Sơn" },
      { name: "Trần Khâm Tộ", title: "Phó tướng bộ binh", desc: "Trực tiếp đụng độ quân Tiền Lê" },
      { name: "Quách Tiến", title: "Tướng bộ binh", desc: "Tướng bộ binh nhà Tống" },
      { name: "Triệu Diên Tiến", title: "Tướng nhà Tống", desc: "Cùng đi trong đạo quân bộ" },
      { name: "Thôi Lượng", title: "Tướng nhà Tống", desc: "Chỉ huy cánh quân hỗ trợ" },
      { name: "Hầu Nhân Bảo", title: "Oan hồn", desc: "Sự sụp đổ của viên tướng này khiến quân bộ hoảng loạn" }
    ]
  },
  {
    id: 6,
    name: "Trận Ung Châu",
    year: "Năm 1075",
    context: "Nhà Tống tập trung vật lực lớn tại Ung Châu chuẩn bị xâm lược. Lý Thường Kiệt dùng chiến thuật 'Tiên phát chế nhân', bất ngờ đưa đại quân vây hãm và thiêu rụi toàn bộ hậu cần của địch.",
    recommendedPower: 75000,
    enemiesRaw: [
      { name: "Tô Giám", title: "Tri châu Ung Châu", desc: "Chỉ huy tử thủ và tự sát khi thành vỡ" },
      { name: "Trương Thủ Tiết", title: "Tuần kiểm Đô giám", desc: "Đem viện binh cứu nhưng bị phục kích ở ải Côn Lôn" },
      { name: "Thẩm Khởi", title: "Cựu Tri châu Quế Châu", desc: "Tích cực xây dựng căn cứ hậu cần chống Đại Việt" },
      { name: "Lưu Di", title: "Tri châu Quế Châu", desc: "Tiếp nối huấn luyện dân binh, cấm buôn bán" },
      { name: "Tống Thần Tông", title: "Hoàng đế nhà Tống", desc: "Ôm mộng bình nam giải quyết khủng hoảng" },
      { name: "Vương An Thạch", title: "Tể tướng", desc: "Người đề xướng chiến lược xâm lược" }
    ]
  },
  {
    id: 7,
    name: "Trận phòng tuyến Như Nguyệt",
    year: "Năm 1077",
    context: "Đạo quân Tống hừng hực khí thế báo thù nhưng bị chặn đứng tại bờ bắc sông Như Nguyệt. Không thể vượt sông, quân Tống đóng trại chờ đợi, dần bị thời tiết và các cuộc tập kích ban đêm làm kiệt quệ.",
    recommendedPower: 100000,
    enemiesRaw: [
      { name: "Quách Quỳ", title: "Đô tổng quản", desc: "Tổng chỉ huy đại quân Tống" },
      { name: "Triệu Tiết", title: "Phó đô tổng quản", desc: "Phó tướng của Quách Quỳ" },
      { name: "Yên Đạt", title: "Tướng tiên phong", desc: "Tướng tiên phong của quân Tống" },
      { name: "Khúc Trân", title: "Tướng xung kích", desc: "Chỉ huy các cánh quân xung kích" },
      { name: "Miêu Lý", title: "Tướng nhà Tống", desc: "Bị đánh bại khi cố vượt sông" },
      { name: "Vương Phán", title: "Tướng nhà Tống", desc: "Đi theo cánh quân bộ" }
    ]
  },
  {
    id: 8,
    name: "Trận Bình Lệ Nguyên",
    year: "Năm 1258",
    context: "Cuộc đụng độ lớn đầu tiên với kỵ binh Mông Cổ. Vua Trần Thái Tông thấy thế giặc quá mạnh nên quyết định không dốc túi đánh, mà tổ chức rút lui có trật tự để thực hiện kế 'vườn không nhà trống'.",
    recommendedPower: 130000,
    enemiesRaw: [
      { name: "Ngột Lương Hợp Thai", title: "Chủ soái", desc: "Chủ soái đạo quân Mông Cổ (Uriyangkhadai)" },
      { name: "A Thuật", title: "Tướng tiên phong", desc: "Con trai của Ngột Lương Hợp Thai, dũng mãnh (Aju)" },
      { name: "Cốt Đãi Ngột Lang", title: "Tướng Mông Cổ", desc: "Chỉ huy kỵ binh hạng nặng" },
      { name: "Triệt Triệt Đô", title: "Tướng kỵ binh", desc: "Trúng kế quân Trần, sợ bị phạt nên uống độc tự sát" },
      { name: "Hoài Đô", title: "Tướng Mông Cổ", desc: "Phó tướng cánh quân Mông Cổ" },
      { name: "Quỳ Mông Cốt Đãi", title: "Tướng cánh tả", desc: "Chỉ huy cánh tả quân Mông Cổ" }
    ]
  },
  {
    id: 9,
    name: "Trận Đông Bộ Đầu",
    year: "Năm 1258",
    context: "Quân Mông Cổ chiếm Thăng Long trống không nên rơi vào nạn đói. Lợi dụng giặc suy yếu và mệt mỏi, quân Trần dùng thuyền ngược sông Hồng bất ngờ đổ bộ vào bến Đông Bộ Đầu, đánh tan địch.",
    recommendedPower: 170000,
    enemiesRaw: [
      { name: "Ngột Lương Hợp Thai", title: "Chủ soái", desc: "Chủ soái đạo quân Mông Cổ" },
      { name: "A Thuật", title: "Tướng tiên phong", desc: "Tướng tiên phong dũng mãnh" },
      { name: "Cốt Đãi Ngột Lang", title: "Tướng Mông Cổ", desc: "Chỉ huy kỵ binh" },
      { name: "Hoài Đô", title: "Tướng Mông Cổ", desc: "Tướng lĩnh Mông Cổ" },
      { name: "Quỳ Mông Cốt Đãi", title: "Tướng cánh tả", desc: "Chỉ huy cánh tả quân Mông Cổ" },
      { name: "Kỵ binh Nguyên Mông", title: "Đội quân tinh nhuệ", desc: "Bị đói kém và mất sĩ khí" }
    ]
  },
  {
    id: 10,
    name: "Trận Hàm Tử",
    year: "Năm 1285",
    context: "Đạo quân thiện chiến của Toa Đô di chuyển dài ngày từ phía Nam lên, bị mệt mỏi và chia cắt. Trần Nhật Duật đã tổ chức chặn đánh ác liệt tại cửa Hàm Tử, cắt đứt hoàn toàn liên lạc của giặc.",
    recommendedPower: 220000,
    enemiesRaw: [
      { name: "Toa Đô", title: "Nguyên soái", desc: "Chỉ huy cánh quân từ Chiêm Thành đánh lên (Sogetu)" },
      { name: "Ô Mã Nhi", title: "Phó tướng", desc: "Rất thiện chiến trên thủy chiến (Omar)" },
      { name: "Lưu Khuê", title: "Tướng thủy quân", desc: "Chỉ huy chiến thuyền Nguyên" },
      { name: "Giảo Kỳ", title: "Tướng nhà Nguyên", desc: "Đi theo cánh quân Toa Đô" },
      { name: "Tích Lệ Cơ", title: "Tôn vương", desc: "Tham chiến trong nhiều chiến dịch" },
      { name: "Bột Nhan Thiết Mộc Nhi", title: "Tướng kỵ binh", desc: "Chỉ huy kỵ binh tháp tùng" }
    ]
  },
  {
    id: 11,
    name: "Trận Chương Dương",
    year: "Năm 1285",
    context: "Căn cứ thủy quân Chương Dương của giặc bị suy yếu do thiếu lương. Quân Trần dưới sự chỉ huy của Trần Quang Khải đánh úp chớp nhoáng, dọn đường giải phóng Thăng Long.",
    recommendedPower: 280000,
    enemiesRaw: [
      { name: "Thoát Hoan", title: "Trấn Nam Vương", desc: "Tổng chỉ huy toàn bộ quân Nguyên (Toghon)" },
      { name: "A Lý Hải Nha", title: "Hữu Thừa tướng", desc: "Phó tướng mưu lược số 1 (Ariq Qaya)" },
      { name: "Lý Hằng", title: "Tướng tiên phong", desc: "Từng bị trúng tên độc tử trận trên đường chạy trốn" },
      { name: "Lý Quán", title: "Phó tướng", desc: "Tử trận cùng đợt với Lý Hằng" },
      { name: "Phàn Tiếp", title: "Tham tri chính sự", desc: "Chỉ huy thủy binh" },
      { name: "A Bát Xích", title: "Vạn hộ", desc: "Hộ giá Thoát Hoan chạy trốn (Abachi)" }
    ]
  },
  {
    id: 12,
    name: "Trận Tây Kết",
    year: "Năm 1285",
    context: "Toa Đô cố gắng hội quân với Thoát Hoan nhưng không biết hắn đã bỏ chạy. Quân Trần bao vây trùng trùng điệp điệp, chém đầu Toa Đô. Ô Mã Nhi dùng thuyền nhỏ trốn chạy ra biển.",
    recommendedPower: 350000,
    enemiesRaw: [
      { name: "Toa Đô", title: "Nguyên soái", desc: "Bị chém đầu tại trận Tây Kết" },
      { name: "Ô Mã Nhi", title: "Phó tướng", desc: "Trốn chạy ra biển trên thuyền nhỏ" },
      { name: "Lưu Khuê", title: "Tướng thủy quân", desc: "Thất trận cùng Toa Đô" },
      { name: "Giảo Kỳ", title: "Tướng nhà Nguyên", desc: "Bị tiêu diệt cùng đại quân" },
      { name: "Tích Lệ Cơ", title: "Tôn vương", desc: "Hoảng sợ tháo chạy" },
      { name: "Bột Nhan", title: "Tướng kỵ binh", desc: "Tử trận trong vòng vây" }
    ]
  },
  {
    id: 13,
    name: "Trận Vân Đồn",
    year: "Năm 1287",
    context: "Nhược điểm chí mạng của quân Nguyên là lương thảo. Trần Khánh Dư bỏ qua Ô Mã Nhi, chờ đoàn thuyền chở lương khổng lồ của Trương Văn Hổ đi qua để tiêu diệt, đốt sạch lương thảo.",
    recommendedPower: 450000,
    enemiesRaw: [
      { name: "Trương Văn Hổ", title: "Phó Đô vạn hộ", desc: "Chỉ huy trưởng đoàn thuyền lương" },
      { name: "Ô Mã Nhi", title: "Tướng hộ tống", desc: "Kiêu ngạo tiến đi trước bỏ mặc thuyền lương" },
      { name: "Phí Củng Thìn", title: "Tướng vận lương", desc: "Chỉ huy một toán thuyền tải lương" },
      { name: "Từ Khánh", title: "Tướng nhà Nguyên", desc: "Phụ trách vận lương" },
      { name: "Phàn Tiếp", title: "Tướng thủy quân", desc: "Cùng Ô Mã Nhi hộ tống đi trước" },
      { name: "Hốt Tất Liệt", title: "Đại hãn", desc: "Dồn toàn lực vận lương hòng phục thù (Kublai Khan)" }
    ]
  },
  {
    id: 14,
    name: "Trận thủy chiến Bạch Đằng lần 3",
    year: "Năm 1288",
    context: "Mất sạch lương thảo, quân Nguyên phải rút quân. Thủy quân rút qua sông Bạch Đằng, bị nhử vào bãi cọc lúc triều rút. Quân Trần dùng hỏa công và đổ bộ đánh giáp lá cà tiêu diệt toàn bộ.",
    recommendedPower: 580000,
    enemiesRaw: [
      { name: "Ô Mã Nhi", title: "Tổng chỉ huy thủy quân", desc: "Bị bắt sống" },
      { name: "Phàn Tiếp", title: "Phó tướng", desc: "Trúng tên bị thương, bị bắt sống" },
      { name: "Tích Lệ Cơ", title: "Tôn vương", desc: "Bị bắt sống tại Bạch Đằng" },
      { name: "Trương Ngọc", title: "Vạn hộ", desc: "Tử trận tại bãi cọc" },
      { name: "Sầm Đoạn", title: "Tướng thủy quân", desc: "Chỉ huy chiến thuyền bị thiêu rụi" },
      { name: "Lưu Khuê", title: "Tướng thủy quân", desc: "Bị vây khốn không lối thoát" }
    ]
  },
  {
    id: 15,
    name: "Trận Tốt Động - Chúc Động",
    year: "Năm 1426",
    context: "Quân Minh có viện binh nên chủ quan định gài bẫy ta. Nhưng nghĩa quân Lam Sơn bắt được thám tử địch, tương kế tựu kế dụ toàn bộ 5 vạn quân Minh lọt vào vùng đầm lầy lội để tiêu diệt.",
    recommendedPower: 750000,
    enemiesRaw: [
      { name: "Vương Thông", title: "Tổng binh", desc: "Tổng chỉ huy quân Minh, bị thương trong trận này" },
      { name: "Mã Kỳ", title: "Tham tướng", desc: "Bị quân Lam Sơn đánh tơi bời" },
      { name: "Sơn Thọ", title: "Thái giám", desc: "Kẻ xúi giục và tham gia chỉ huy quân sự" },
      { name: "Phương Chính", title: "Tướng lĩnh", desc: "Khét tiếng tàn ác của nhà Minh" },
      { name: "Lý An", title: "Tướng bảo vệ", desc: "Bảo vệ thành Đông Quan, cùng kéo ra trận" },
      { name: "Trần Trí", title: "Tướng lĩnh", desc: "Từng thảm bại ở Nghệ An bị điều ra Bắc" }
    ]
  },
  {
    id: 16,
    name: "Trận ải Chi Lăng lần 2",
    year: "Năm 1427",
    context: "Viện binh nhà Minh hùng hậu tràn sang. Nghĩa quân Lam Sơn giả thua bỏ chạy để nhử cánh kỵ binh đi đầu của kiêu tướng Liễu Thăng lọt vào ổ phục kích ở Chi Lăng.",
    recommendedPower: 950000,
    enemiesRaw: [
      { name: "Liễu Thăng", title: "An Viễn hầu", desc: "Trực tiếp dẫn quân đi trước và bị chém đầu ở đồi Mã Yên" },
      { name: "Lương Minh", title: "Bảo Định bá", desc: "Lên thay Liễu Thăng được vài ngày thì tử trận" },
      { name: "Lý Khánh", title: "Binh bộ Thượng thư", desc: "Ốm chết vì quá hoảng sợ sau khi Liễu Thăng tử trận" },
      { name: "Thôi Tụ", title: "Đô đốc", desc: "Nắm quyền chỉ huy tàn quân sau khi 3 tướng chết" },
      { name: "Hoàng Phúc", title: "Binh bộ Thượng thư", desc: "Đi theo hỗ trợ thiết lập lại chính quyền đô hộ" },
      { name: "Sử An", title: "Tướng tiên phong", desc: "Tử trận cùng Lương Minh" }
    ]
  },
  {
    id: 17,
    name: "Trận Xương Giang",
    year: "Năm 1427",
    context: "Đạo quân Liễu Thăng vỡ nát, lê lết đến Xương Giang thì thành đã bị ta chiếm. Quân Minh bị dồn ra cánh đồng trống vắng, kiệt sức và bị đại quân Lam Sơn vây bọc tiêu diệt sạch.",
    recommendedPower: 1200000,
    enemiesRaw: [
      { name: "Thôi Tụ", title: "Đô đốc", desc: "Tổng chỉ huy tàn quân, bị chém vì không chịu quỳ" },
      { name: "Hoàng Phúc", title: "Binh bộ Thượng thư", desc: "Bị bắt sống, Lê Lợi tha mạng cho về nước" },
      { name: "Trần Hiệp", title: "Tướng bộ binh", desc: "Chỉ huy quân bộ nhà Minh" },
      { name: "Lý Nhậm", title: "Tướng nhà Minh", desc: "Tử trận tại Xương Giang" },
      { name: "Mộc Thạnh", title: "Kiềm Quốc công", desc: "Nghe tin Liễu Thăng chết vội bỏ chạy về nước" },
      { name: "Minh Tuyên Tông", title: "Hoàng đế nhà Minh", desc: "Đành chấp nhận bãi binh, công nhận độc lập" }
    ]
  },
  {
    id: 18,
    name: "Trận Rạch Gầm - Xoài Mút",
    year: "Năm 1785",
    context: "Quân Xiêm vô cùng kiêu ngạo. Nguyễn Huệ giấu đại bác ở bờ sông rậm rạp, dùng thuyền nhỏ dụ địch đuổi theo rồi nhất tề khai hỏa pháo tiễu trừ 5 vạn quân Xiêm La.",
    recommendedPower: 1550000,
    enemiesRaw: [
      { name: "Chiêu Tăng", title: "Chủ soái", desc: "Chỉ huy quân Xiêm La do vua Rama I cử sang" },
      { name: "Chiêu Sương", title: "Phó soái", desc: "Phó tướng quân Xiêm La" },
      { name: "Nguyễn Ánh", title: "Chúa Nguyễn", desc: "Dẫn đường và liên minh quân sự với Xiêm" },
      { name: "Châu Văn Tiếp", title: "Tướng tâm phúc", desc: "Tướng của Nguyễn Ánh, cầu viện quân Xiêm" },
      { name: "Chiêu Thùy Biện", title: "Tướng Xiêm La", desc: "Tham gia chiến dịch đường thủy" },
      { name: "Thát Xỉ Đa", title: "Tướng Chân Lạp", desc: "Bị Xiêm ép đi cùng hỗ trợ đường thủy" }
    ]
  },
  {
    id: 19,
    name: "Trận Hà Hồi - Ngọc Hồi",
    year: "Năm 1789",
    context: "Quân Thanh đóng đồn kiên cố ở phía Nam Thăng Long, ỷ thế quân đông trúng dịp Tết. Quang Trung hành quân thần tốc, dùng rơm ướt làm mộc đỡ đạn hỏa khí, đánh giáp lá cà đè bẹp hệ thống phòng thủ.",
    recommendedPower: 2000000,
    enemiesRaw: [
      { name: "Tôn Sĩ Nghị", title: "Lưỡng Quảng tổng đốc", desc: "Tổng chỉ huy 29 vạn quân Thanh" },
      { name: "Hứa Thế Hanh", title: "Tả dực bảo dũng hầu", desc: "Trực tiếp chỉ huy đồn Ngọc Hồi, tử trận" },
      { name: "Thượng Duy Thăng", title: "Tổng binh", desc: "Cố thủ và tử trận ở Ngọc Hồi" },
      { name: "Trương Triều Long", title: "Tổng binh", desc: "Tướng tiên phong hung hãn của giặc" },
      { name: "Tôn Khởi Đỉnh", title: "Tướng lĩnh", desc: "Tham gia giữ đồn phía nam" },
      { name: "Khánh Thành", title: "Đề đốc", desc: "Bỏ chạy thục mạng khi phòng tuyến vỡ" }
    ]
  },
  {
    id: 20,
    name: "Trận Đống Đa",
    year: "Năm 1789",
    context: "Đô đốc Long đi đường tắt, tập kích bất ngờ sáng mùng 5 Tết. Đồn Khương Thượng vỡ, quân Tây Sơn đốt lửa bện rơm hình rồng tiến vào, uy hiếp đại bản doanh của Tôn Sĩ Nghị.",
    recommendedPower: 2600000,
    enemiesRaw: [
      { name: "Sầm Nghi Đống", title: "Thái thú Điền Châu", desc: "Chỉ huy đồn Khương Thượng, thắt cổ ở Loa Sơn" },
      { name: "Tôn Sĩ Nghị", title: "Tổng đốc", desc: "Hoảng loạn bỏ chạy không kịp mặc áo giáp" },
      { name: "Lê Chiêu Thống", title: "Vua bù nhìn", desc: "Cầu viện quân Thanh, bỏ chạy theo Tôn Sĩ Nghị" },
      { name: "Điền Châu Tì Tướng", title: "Các thuộc hạ", desc: "Nhiều người tự vẫn theo chủ Sầm Nghi Đống" },
      { name: "Thang Hùng Nghiệp", title: "Tướng Thanh", desc: "Chạy thoát cùng Tôn Sĩ Nghị" },
      { name: "Càn Long", title: "Hoàng đế Thanh", desc: "Ra lệnh điều động 29 vạn quân với dã tâm nuốt bờ cõi" }
    ]
  }
];

export const generateTrialEnemies = (stageId: number): Hero[] => {
  const stage = HERO_TRIAL_STAGES.find(s => s.id === stageId);
  if (!stage) return [];

  // Base stats scaling significantly per stage
  const baseStat = 80 + stageId * 2; // e.g. Stage 1: 82 -> SSR, Stage 20: 120 -> UR
  
  return stage.enemiesRaw.map((e, idx) => {
    // Make the first enemy the "Boss" with higher stats
    const isBoss = idx === 0;
    const stat = isBoss ? baseStat + 10 : baseStat;
    
    let rarity = Rarity.SSR;
    if (stat >= 90) rarity = Rarity.UR;
    
    const baseTemplate = INITIAL_HEROES.find(b => b.name === e.name) || ENEMY_HEROES.find(b => b.name === e.name);

    return {
      id: `trial_e_${stageId}_${idx}`,
      name: e.name,
      title: baseTemplate ? baseTemplate.title : e.title,
      rarity,
      overall: stat,
      atk: stat * 3, // inflated stats for trial challenge
      def: stat * 2,
      spd: 90 + Math.min(60, stageId * 3) + (stat % 10),
      hp: stat * 150,
      maxHp: stat * 150,
      morale: 0,
      initialMorale: isBoss ? 50 : 0,
      star: Math.min(30, 5 + Math.floor(stageId * 1.2) + (isBoss ? 3 : 0)),
      fragments: 0,
      description: baseTemplate ? baseTemplate.desc || e.desc : e.desc,
      skillName: baseTemplate ? baseTemplate.skillName : 'Khí Thế Nghịch Tặc',
      skillDesc: baseTemplate ? baseTemplate.skillDesc : 'Gây sát thương khủng khiếp lên quân ta.',
      role: baseTemplate ? baseTemplate.role : undefined,
      targetScope: baseTemplate ? baseTemplate.targetScope : undefined,
      skillEffect: baseTemplate ? baseTemplate.skillEffect : undefined,
      skillEffectChance: baseTemplate ? baseTemplate.skillEffectChance : undefined,
      skillDmgMult: baseTemplate ? baseTemplate.skillDmgMult : undefined,
      skillVideoUrl: baseTemplate ? baseTemplate.skillVideoUrl : undefined,
      image: baseTemplate ? baseTemplate.image : DEFAULT_ENEMY_IMG,
      faction: 'enemy'
    };
  });
};
