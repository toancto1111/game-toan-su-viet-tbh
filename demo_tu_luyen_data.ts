export const demoTuLuyenData = [
  {
    "id": "TU_LUYEN_001",
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Để chuẩn bị cho chuyến dã ngoại, lớp 6A chia thành các nhóm nhỏ. Gọi $A$ là tập hợp số lượng thành viên có thể có của mỗi nhóm, biết rằng mỗi nhóm phải có ít nhất 4 bạn và không quá 7 bạn. Cách viết tập hợp $A$ nào sau đây là đúng?",
    "options": [
      "A. $A = \\{4; 5; 6; 7\\}$",
      "B. $A = \\{5; 6; 7\\}$",
      "C. $A = \\{4; 5; 6\\}$",
      "D. $A = [4; 5; 6; 7]$"
    ],
    "correctAnswer": 0,
    "explanation": "Từ 'ít nhất 4' nghĩa là lấy từ số 4 trở lên (bao gồm cả số 4). Từ 'không quá 7' nghĩa là chỉ lấy đến tối đa là số 7 (bao gồm cả số 7). Do đó, số bạn trong một nhóm có thể là 4, 5, 6 hoặc 7 bạn. Tập hợp A viết đúng là $A = \\{4; 5; 6; 7\\}$."
  },
  {
    "id": "TU_LUYEN_002",
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Mật khẩu điện thoại của An là một số tự nhiên có 4 chữ số khác nhau, được tạo thành từ tập hợp $X = \\{0; 2; 4; 6\\}$. Mật khẩu đó là số tự nhiên lớn nhất có thể tạo ra. Hỏi mật khẩu của An là bao nhiêu?",
    "options": [],
    "correctAnswer": "6420",
    "explanation": "Để tạo được số tự nhiên lớn nhất có 4 chữ số, ta cần xếp các chữ số lớn nhất ở các hàng cao nhất (từ trái sang phải). Trong tập hợp $X = \\{0; 2; 4; 6\\}$, ta xếp: Chữ số lớn nhất là 6 ở hàng nghìn; tiếp theo là 4 ở hàng trăm; 2 ở hàng chục; và 0 ở hàng đơn vị. Ta được số 6420."
  },
  {
    "id": "TU_LUYEN_003",
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Một siêu thị quy định: Khách hàng mua từ 5 đến 10 sản phẩm sẽ được tặng 1 phiếu bốc thăm. Gọi $S$ là tập hợp số lượng sản phẩm khách hàng cần mua để được nhận phiếu bốc thăm. Khẳng định nào sau đây diễn tả đúng quy định trên?",
    "options": [
      "A. $S = \\{x \\in \\mathbb{N} \\mid 5 < x < 10\\}$",
      "B. $S = \\{x \\in \\mathbb{N} \\mid 5 \\le x \\le 10\\}$",
      "C. $S = \\{x \\in \\mathbb{N} \\mid 5 < x \\le 10\\}$",
      "D. $S = \\{x \\in \\mathbb{N}^* \\mid 5 \\le x < 10\\}$"
    ],
    "correctAnswer": 1,
    "explanation": "Cụm từ 'từ 5 đến 10' nghĩa là bao gồm cả số 5 và số 10. Trong toán học, ta dùng kí hiệu nhỏ hơn hoặc bằng ($\\le$) để thể hiện điều này ($5 \\le x \\le 10$). Vậy đáp án đúng là B."
  },
  {
    "id": "TU_LUYEN_004",
    "level": "Vận dụng cao",
    "type": "short_answer",
    "question": "Trong đợt quyên góp sách vở cho học sinh vùng lũ, lớp 6B thu thập được một số lượng quyển vở. Biết rằng số quyển vở đó là một số tự nhiên có 3 chữ số. Chữ số hàng trăm là 2, chữ số hàng chục là số tự nhiên chẵn nhỏ nhất khác 0, và chữ số hàng đơn vị là số tự nhiên lớn nhất có 1 chữ số. Hỏi lớp 6B quyên góp được bao nhiêu quyển vở?",
    "options": [],
    "correctAnswer": "229",
    "explanation": "Ta tìm từng chữ số của số cần tìm:\n- Chữ số hàng trăm là: 2.\n- Số tự nhiên chẵn nhỏ nhất khác 0 là 2, nên chữ số hàng chục là: 2.\n- Số tự nhiên lớn nhất có 1 chữ số là 9, nên chữ số hàng đơn vị là: 9.\nGhép lại, số quyển vở lớp 6B quyên góp được là 229."
  },
  {
    "id": "TU_LUYEN_005",
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một bảng mã bảo mật yêu cầu người dùng chọn một ký tự thuộc tập hợp các chữ cái tiếng Việt có trong từ ``VIET NAM''. Gọi tập hợp đó là $V$. Tập hợp $V$ viết dưới dạng liệt kê là:",
    "options": [
      "A. $V = \\{V; I; E; T; N; A; M\\}$",
      "B. $V = \\{V, I, E, T, N, A, M\\}$",
      "C. $V = \\{V; I; E; T; N; A; M; V\\}$",
      "D. $V = \\{V; I; \\hat{E}; T; N; A; M\\}$"
    ],
    "correctAnswer": 0,
    "explanation": "Các chữ cái trong từ 'VIET NAM' là: V, I, E, T, N, A, M. Lưu ý khi viết tập hợp, mỗi phần tử chỉ được liệt kê 1 lần và viết bên trong hai dấu ngoặc nhọn $\\{\\}$. Các phần tử được ngăn cách bởi dấu chấm phẩy (;). Vậy $V = \\{V; I; E; T; N; A; M\\}$."
  },
  {
    "id": "TU_LUYEN_006",
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Cửa hàng bán trà sữa có các size ly là $S, M, L$. Giá của ly size $S$ là $20 000$ đồng. Giá ly size $M$ đắt hơn size $S$ là $5 000$ đồng. Giá ly size $L$ đắt hơn size $M$ là $10 000$ đồng. Gọi $T$ là tập hợp các mức giá của cửa hàng (đơn vị: nghìn đồng). Tính tổng tất cả các phần tử của tập hợp $T$.",
    "options": [],
    "correctAnswer": "80",
    "explanation": "Ta tính giá của từng size ly:\n- Size S: 20 (nghìn đồng)\n- Size M đắt hơn S 5 nghìn: $20 + 5 = 25$ (nghìn đồng)\n- Size L đắt hơn M 10 nghìn: $25 + 10 = 35$ (nghìn đồng)\nTập hợp các mức giá là $T = \\{20; 25; 35\\}$.\nTổng các phần tử trong tập hợp T là: $20 + 25 + 35 = 80$."
  },
  {
    "id": "TU_LUYEN_007",
    "level": "Vận dụng cao",
    "type": "multiple_choice_1",
    "question": "Để tham gia giải bóng đá trường, huấn luyện viên cần chọn ra một tập hợp $D$ gồm các cầu thủ mang áo số chẵn (khác 0) và số áo đó phải nhỏ hơn 15. Tuy nhiên, cầu thủ mang áo số 4 bị chấn thương nên không thể tham gia. Hỏi tập hợp $D$ gồm bao nhiêu phần tử?",
    "options": [
      "A. 6 phần tử",
      "B. 7 phần tử",
      "C. 8 phần tử",
      "D. 5 phần tử"
    ],
    "correctAnswer": 0,
    "explanation": "Các số chẵn khác 0 và nhỏ hơn 15 là: 2, 4, 6, 8, 10, 12, 14. Ban đầu có 7 số áo.\nVì cầu thủ số 4 bị chấn thương, ta loại số 4 ra khỏi tập hợp.\nVậy tập hợp $D$ còn lại là $\\{2; 6; 8; 10; 12; 14\\}$, gồm 6 phần tử."
  },
  {
    "id": "TU_LUYEN_008",
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Mã OTP (mã xác nhận) gửi về máy điện thoại của chú Bình là một dãy gồm 6 chữ số (có thể bắt đầu bằng chữ số 0, ví dụ: 012345). Hỏi có tất cả bao nhiêu mã OTP có thể được tạo ra?",
    "options": [
      "A. $900 000$",
      "B. $999 999$",
      "C. $1 000 000$",
      "D. $100 000$"
    ],
    "correctAnswer": 2,
    "explanation": "Mã OTP gồm 6 chữ số sẽ bắt đầu từ mã nhỏ nhất là $000 000$ đến mã lớn nhất là $999 999$.\nCông thức tính số lượng các số từ $a$ đến $b$ là: $(b - a) + 1$.\nVậy số lượng mã OTP có thể tạo ra là: $(999 999 - 0) + 1 = 1 000 000$ (mã)."
  },
  {
    "id": "TU_LUYEN_009",
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Nhà xe chở 45 học sinh đi tham quan bằng 3 xe. Xe thứ nhất chở 14 bạn, xe thứ hai chở 16 bạn, xe thứ ba chở $x$ bạn. Gọi $X$ là tập hợp số học sinh được xếp trên mỗi xe. Cách viết tập hợp $X$ nào sau đây là đúng?",
    "options": [
      "A. $X = \\{14; 15; 16\\}$",
      "B. $X = \\{14; 16; x\\}$",
      "C. $X = [14; 15; 16]$",
      "D. $X = \\{14; 16\\}$"
    ],
    "correctAnswer": 0,
    "explanation": "Đầu tiên, ta tính số học sinh trên xe thứ ba là: $x = 45 - 14 - 16 = 15$ (bạn).\nVậy số học sinh trên 3 xe lần lượt là 14, 16 và 15.\nTập hợp số lượng học sinh trên mỗi xe được viết trong dấu ngoặc nhọn và các phần tử ngăn cách bởi dấu chấm phẩy là: $X = \\{14; 15; 16\\}$."
  },
  {
    "id": "TU_LUYEN_010",
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một người bán vé xem phim ghi nhận độ tuổi của nhóm khách hàng vào xem phim kinh dị. Tập hợp độ tuổi được cho là $A = \\{x \\in \\mathbb{N}^* \\mid x \\ge 18\\}$. Khẳng định nào sau đây là ý nghĩa thực tế của tập hợp $A$?",
    "options": [
      "A. Phim dành cho khán giả từ 18 tuổi trở lên.",
      "B. Phim dành cho khán giả lớn hơn 18 tuổi.",
      "C. Phim dành cho khán giả dưới 18 tuổi.",
      "D. Phim dành cho mọi lứa tuổi."
    ],
    "correctAnswer": 0,
    "explanation": "Kí hiệu $x \\ge 18$ đọc là '$x$ lớn hơn hoặc bằng 18'.\nTrong thực tế, điều này có nghĩa là độ tuổi của khán giả phải từ 18 tuổi trở lên mới được vào xem phim. Đáp án đúng là A."
  }
];
