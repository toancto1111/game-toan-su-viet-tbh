import { Question } from './types';

export const toan9Chuong4Questions: Question[] = [
  {
    "id": "TOAN9_B11_001",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho tam giác $ABC$ vuông tại $A$ Tỉ số $\\frac{AC}{BC}$ là giá trị lượng giác nào của góc $B$?",
    "imageUrl": "/images/toan9/b11_cau1_tam_giac_abc.svg",
    "options": [
      "A. $\\sin B$",
      "B. $\\cos B$",
      "C. $\\tan B$",
      "D. $\\cot B$"
    ],
    "correctAnswer": 0,
    "explanation": "Đối với góc $B$, $AC$ là cạnh đối, $BC$ là cạnh huyền. $\\sin B = \\frac{\\text{đối}}{\\text{huyền}} = \\frac{AC}{BC}$."
  },
  {
    "id": "TOAN9_B11_002",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho tam giác $MNP$ vuông tại $M$. Tỉ số $\\frac{MN}{MP}$ là giá trị của:",
    "imageUrl": "/images/toan9/b11_cau2_tam_giac_mnp.svg",
    "options": [
      "A. $\\sin P$",
      "B. $\\cos P$",
      "C. $\\tan P$",
      "D. $\\cot P$"
    ],
    "correctAnswer": 2,
    "explanation": "Đối với góc $P$, $MN$ là cạnh đối, $MP$ là cạnh kề. $\\tan P = \\frac{\\text{đối}}{\\text{kề}} = \\frac{MN}{MP}$."
  },
  {
    "id": "TOAN9_B11_003",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Giá trị của $\\sin 30^\\circ$ bằng:",
    "options": [
      "A. $\\frac{1}{2}$",
      "B. $\\frac{\\sqrt{3}}{2}$",
      "C. $\\frac{\\sqrt{2}}{2}$",
      "D. $1$"
    ],
    "correctAnswer": 0,
    "explanation": "Theo bảng giá trị lượng giác các góc đặc biệt."
  },
  {
    "id": "TOAN9_B11_004",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho hai góc nhọn $\\alpha, \\beta$ phụ nhau ($\\alpha + \\beta = 90^\\circ$). Khẳng định nào sai?",
    "options": [
      "A. $\\sin \\alpha = \\cos \\beta$",
      "B. $\\cos \\alpha = \\sin \\beta$",
      "C. $\\tan \\alpha = \\cot \\beta$",
      "D. $\\sin \\alpha = \\sin \\beta$"
    ],
    "correctAnswer": 3,
    "explanation": "Chỉ có góc bằng nhau mới có sin bằng nhau (đối với góc nhọn). Hai góc phụ nhau thì sin góc này bằng cos góc kia."
  },
  {
    "id": "TOAN9_B11_005",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho góc nhọn $\\alpha$. Khẳng định nào sau đây là đúng?",
    "options": [
      "A. $\\tan \\alpha = \\frac{\\cos \\alpha}{\\sin \\alpha}$",
      "B. $\\cot \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha}$",
      "C. $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$",
      "D. $\\sin \\alpha + \\cos \\alpha = 1$"
    ],
    "correctAnswer": 2,
    "explanation": "Đây là hệ thức lượng giác cơ bản quan trọng nhất."
  },
  {
    "id": "TOAN9_B11_006",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Trong tam giác $DEF$ vuông tại $D$, $\\cos E$ được tính bằng công thức nào?",
    "imageUrl": "/images/toan9/b11_cau6_tam_giac_def.svg",
    "options": [
      "A. $\\frac{DF}{EF}$",
      "B. $\\frac{DE}{EF}$",
      "C. $\\frac{DF}{DE}$",
      "D. $\\frac{DE}{DF}$"
    ],
    "correctAnswer": 1,
    "explanation": "Cạnh kề góc $E$ là $DE$, cạnh huyền là $EF$. $\\cos E = \\frac{DE}{EF}$."
  },
  {
    "id": "TOAN9_B11_007",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Giá trị của $\\tan 45^\\circ$ bằng:",
    "options": [
      "A. $1$",
      "B. $0$",
      "C. $\\sqrt{3}$",
      "D. Không xác định"
    ],
    "correctAnswer": 0,
    "explanation": "Tam giác vuông cân có hai cạnh góc vuông bằng nhau nên $\\tan 45^\\circ = 1$."
  },
  {
    "id": "TOAN9_B11_008",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Nếu $\\sin \\alpha = \\frac{3}{5}$ thì tam giác vuông có chứa góc $\\alpha$ có thể có các cạnh (đối, kề, huyền) tương ứng là:",
    "options": [
      "A. $3, 5, 4$",
      "B. $3, 4, 5$",
      "C. $4, 3, 5$",
      "D. $5, 4, 3$"
    ],
    "correctAnswer": 1,
    "explanation": "$\\sin \\alpha = \\frac{\\text{đối}}{\\text{huyền}} = \\frac{3}{5}$. Cạnh đối là 3, cạnh huyền là 5. Cạnh kề $=\\sqrt{5^2-3^2}=4$."
  },
  {
    "id": "TOAN9_B11_009",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho $\\cos \\alpha = \\frac{1}{2}$. Số đo góc nhọn $\\alpha$ là:",
    "options": [
      "A. $30^\\circ$",
      "B. $45^\\circ$",
      "C. $60^\\circ$",
      "D. $90^\\circ$"
    ],
    "correctAnswer": 2,
    "explanation": "Theo bảng giá trị lượng giác đặc biệt, $\\cos 60^\\circ = 0,5$."
  },
  {
    "id": "TOAN9_B11_010",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Tính $P = \\tan 30^\\circ \\cdot \\cot 30^\\circ$.",
    "options": [
      "A. $0$",
      "B. $1$",
      "C. $\\sqrt{3}$",
      "D. $3$"
    ],
    "correctAnswer": 1,
    "explanation": "Tích của $\\tan$ và $\\cot$ của cùng một góc nhọn luôn bằng 1."
  },
  {
    "id": "TOAN9_B11_011",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Cho $\\Delta ABC$ vuông tại $A$, có $AB = 6$ cm, $AC = 8$ cm. Tính $\\sin B$.",
    "imageUrl": "/images/toan9/b11_cau11_tam_giac_6_8.svg",
    "options": [
      "A. $\\frac{3}{5}$",
      "B. $\\frac{4}{5}$",
      "C. $\\frac{3}{4}$",
      "D. $\\frac{4}{3}$"
    ],
    "correctAnswer": 1,
    "explanation": "Huyền $BC = \\sqrt{6^2+8^2} = 10$. $\\sin B = \\frac{AC}{BC} = \\frac{8}{10} = \\frac{4}{5}$."
  },
  {
    "id": "TOAN9_B11_012",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Rút gọn biểu thức $M = \\sin^2 15^\\circ + \\sin^2 75^\\circ$.",
    "options": [
      "A. $0$",
      "B. $1$",
      "C. $2$",
      "D. $0,5$"
    ],
    "correctAnswer": 1,
    "explanation": "$\\sin 75^\\circ = \\cos 15^\\circ$. Vậy $M = \\sin^2 15^\\circ + \\cos^2 15^\\circ = 1$."
  },
  {
    "id": "TOAN9_B11_013",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Biết $\\sin \\alpha = 0,8$. Giá trị của $\\cos \\alpha$ là:",
    "options": [
      "A. $0,2$",
      "B. $0,4$",
      "C. $0,6$",
      "D. $0,64$"
    ],
    "correctAnswer": 2,
    "explanation": "$\\cos \\alpha = \\sqrt{1 - \\sin^2 \\alpha} = \\sqrt{1 - 0,64} = \\sqrt{0,36} = 0,6$."
  },
  {
    "id": "TOAN9_B11_014",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Nếu $\\tan \\alpha = \\frac{3}{4}$ thì $\\cot \\alpha$ bằng:",
    "options": [
      "A. $\\frac{3}{4}$",
      "B. $\\frac{4}{3}$",
      "C. $\\frac{3}{5}$",
      "D. $\\frac{4}{5}$"
    ],
    "correctAnswer": 1,
    "explanation": "$\\cot \\alpha = \\frac{1}{\\tan \\alpha} = \\frac{4}{3}$."
  },
  {
    "id": "TOAN9_B11_015",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Giá trị của biểu thức $P = \\cos 60^\\circ + \\sin 30^\\circ$ là:",
    "options": [
      "A. $1$",
      "B. $\\frac{\\sqrt{3}}{2}$",
      "C. $\\sqrt{3}$",
      "D. $0$"
    ],
    "correctAnswer": 0,
    "explanation": "$\\cos 60^\\circ = 0,5$; $\\sin 30^\\circ = 0,5 \\Rightarrow P = 0,5 + 0,5 = 1$."
  },
  {
    "id": "TOAN9_B11_016",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một cột cờ cao $5$ m có bóng trên mặt đất. Góc tạo bởi tia nắng mặt trời và mặt đất là $45^\\circ$. Tính chiều dài bóng của cột cờ.",
    "imageUrl": "/images/toan9/b11_cau16_cot_co_bong_45.svg",
    "options": [
      "A. $5$ m",
      "B. $5\\sqrt{2}$ m",
      "C. $2,5$ m",
      "D. $10$ m"
    ],
    "correctAnswer": 0,
    "explanation": "Gọi bóng là $x$. Ta có $\\tan 45^\\circ = \\frac{5}{x} \\Rightarrow 1 = \\frac{5}{x} \\Rightarrow x = 5$ m."
  },
  {
    "id": "TOAN9_B11_017",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Nếu $\\cos \\alpha = \\sin 35^\\circ$ thì góc nhọn $\\alpha$ bằng:",
    "options": [
      "A. $35^\\circ$",
      "B. $55^\\circ$",
      "C. $65^\\circ$",
      "D. $45^\\circ$"
    ],
    "correctAnswer": 1,
    "explanation": "Hai góc phụ nhau có $\\sin$ góc này bằng $\\cos$ góc kia: $90^\\circ - 35^\\circ = 55^\\circ$."
  },
  {
    "id": "TOAN9_B11_018",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Thầy Toàn hướng dẫn học sinh đo chiều cao tòa nhà. Từ điểm A cách chân tòa nhà 20m, góc nhìn lên đỉnh là $60^\\circ$. Chiều cao tòa nhà là:",
    "imageUrl": "/images/toan9/b11_cau18_chieu_cao_toa_nha.svg",
    "options": [
      "A. $10\\sqrt{3}$ m",
      "B. $20\\sqrt{3}$ m",
      "C. $\\frac{20\\sqrt{3}}{3}$ m",
      "D. $40$ m"
    ],
    "correctAnswer": 1,
    "explanation": "$\\tan 60^\\circ = \\frac{h}{20} \\Rightarrow h = 20 \\cdot \\tan 60^\\circ = 20\\sqrt{3}$."
  },
  {
    "id": "TOAN9_B11_019",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Biết $\\sin \\alpha = \\frac{1}{3}$. Giá trị của biểu thức $A = 3\\sin^2 \\alpha + \\cos^2 \\alpha$ là:",
    "options": [
      "A. $\\frac{11}{9}$",
      "B. $1$",
      "C. $\\frac{10}{9}$",
      "D. $2$"
    ],
    "correctAnswer": 0,
    "explanation": "$\\cos^2 \\alpha = 1 - (\\frac{1}{3})^2 = \\frac{8}{9}$. $A = 3(\\frac{1}{9}) + \\frac{8}{9} = \\frac{3}{9} + \\frac{8}{9} = \\frac{11}{9}$."
  },
  {
    "id": "TOAN9_B11_020",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Cho $\\tan \\alpha = 2$. Giá trị của biểu thức $B = \\frac{\\sin \\alpha - \\cos \\alpha}{\\sin \\alpha + \\cos \\alpha}$ là:",
    "options": [
      "A. $\\frac{1}{3}$",
      "B. $3$",
      "C. $-\\frac{1}{3}$",
      "D. $\\frac{1}{2}$"
    ],
    "correctAnswer": 0,
    "explanation": "Chia cả tử và mẫu cho $\\cos \\alpha$, ta được $B = \\frac{\\tan \\alpha - 1}{\\tan \\alpha + 1} = \\frac{2-1}{2+1} = \\frac{1}{3}$."
  },
  {
    "id": "TOAN9_B11_021",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Với mọi góc nhọn $\\alpha$, $\\sin \\alpha$ luôn lớn hơn 0 và nhỏ hơn 1.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Cạnh đối luôn nhỏ hơn cạnh huyền, và độ dài cạnh luôn dương."
  },
  {
    "id": "TOAN9_B11_022",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: $\\sin 45^\\circ = \\cos 45^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Hai góc $45^\\circ$ phụ nhau, sin góc này bằng cos góc kia."
  },
  {
    "id": "TOAN9_B11_023",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Trong tam giác vuông, cạnh đối diện với góc $\\alpha$ càng lớn thì $\\tan \\alpha$ càng nhỏ (giữ nguyên cạnh kề).",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "$\\tan \\alpha = \\frac{\\text{đối}}{\\text{kề}}$, cạnh đối tăng thì $\\tan \\alpha$ tăng."
  },
  {
    "id": "TOAN9_B11_024",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: $\\sin^2 30^\\circ + \\cos^2 60^\\circ = 1$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Phải là $\\sin^2 30^\\circ + \\cos^2 30^\\circ = 1$. $\\sin 30^\\circ = 0,5, \\cos 60^\\circ = 0,5 \\Rightarrow 0,5^2 + 0,5^2 = 0,5 \\neq 1$."
  },
  {
    "id": "TOAN9_B11_025",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Tỉ số $\\tan \\alpha$ không thể nhận giá trị bằng 10.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "$\\tan \\alpha$ có thể nhận mọi giá trị dương, bao gồm cả 10."
  },
  {
    "id": "TOAN9_B11_026",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: $\\cot 45^\\circ = 1$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tam giác vuông cân có cạnh đối bằng cạnh kề nên $\\cot = 1$."
  },
  {
    "id": "TOAN9_B11_027",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: $\\cos 89^\\circ$ có giá trị rất gần với 1.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Góc càng gần $90^\\circ$ thì $\\cos$ càng gần 0."
  },
  {
    "id": "TOAN9_B11_028",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Nếu hai góc nhọn phụ nhau thì tang của góc này bằng cô-tang của góc kia.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Đó là định lý về tỉ số lượng giác của hai góc phụ nhau."
  },
  {
    "id": "TOAN9_B11_029",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Cho tam giác vuông có $\\sin C = \\frac{AH}{AC}$.",
    "imageUrl": "/images/toan9/b11_cau29_duong_cao_ah.svg",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Trong $\\Delta AHC$ vuông tại $H$, $\\sin C = \\frac{\\text{đối}}{\\text{huyền}} = \\frac{AH}{AC}$."
  },
  {
    "id": "TOAN9_B11_030",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Cho $\\alpha$ là góc nhọn, $\\sin \\alpha = \\frac{\\sqrt{3}}{2} \\Rightarrow \\alpha = 30^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "$\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}$, nên $\\alpha = 60^\\circ$."
  },
  {
    "id": "TOAN9_B11_031",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Tích $\\tan 10^\\circ \\cdot \\tan 80^\\circ = 1$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\tan 80^\\circ = \\cot 10^\\circ \\Rightarrow \\tan 10^\\circ \\cdot \\cot 10^\\circ = 1$."
  },
  {
    "id": "TOAN9_B11_032",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: $\\cos 30^\\circ = \\frac{\\sqrt{3}}{2}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Theo bảng giá trị lượng giác đặc biệt."
  },
  {
    "id": "TOAN9_B11_033",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Nếu tam giác vuông có một góc nhọn $45^\\circ$ thì $\\sin$ và $\\cos$ của góc đó bằng nhau.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\sin 45^\\circ = \\cos 45^\\circ = \\frac{\\sqrt{2}}{2}$."
  },
  {
    "id": "TOAN9_B11_034",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: $\\frac{\\cos \\alpha}{\\sin \\alpha} = \\tan \\alpha$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Đó là công thức của $\\cot \\alpha$."
  },
  {
    "id": "TOAN9_B11_035",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Nếu $\\sin \\alpha = \\cos \\alpha$ thì $\\tan \\alpha = 1$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha} = 1$."
  },
  {
    "id": "TOAN9_B11_036",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Cho tam giác vuông có $\\tan B = \\frac{AC}{BC}$.",
    "imageUrl": "/images/toan9/b11_cau1_tam_giac_abc.svg",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "$\\tan B = \\frac{\\text{đối}}{\\text{kề}} = \\frac{AC}{AB}$. $\\frac{AC}{BC}$ là $\\sin B$."
  },
  {
    "id": "TOAN9_B11_037",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: $\\cos^2 15^\\circ + \\cos^2 75^\\circ = 1$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\cos 75^\\circ = \\sin 15^\\circ \\Rightarrow \\cos^2 15^\\circ + \\sin^2 15^\\circ = 1$."
  },
  {
    "id": "TOAN9_B11_038",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Biết $\\sin \\alpha = 0,5$. Biểu thức $1 + \\tan^2 \\alpha = \\frac{4}{3}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\alpha = 30^\\circ \\Rightarrow \\tan 30^\\circ = \\frac{\\sqrt{3}}{3} \\Rightarrow \\tan^2 \\alpha = \\frac{1}{3} \\Rightarrow 1 + \\frac{1}{3} = \\frac{4}{3}$."
  },
  {
    "id": "TOAN9_B11_039",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Một con dốc có độ nghiêng $12^\\circ$. Nếu đi lên dốc 50m thì độ cao đạt được là $50 \\cdot \\tan 12^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Độ dài đường đi là cạnh huyền. Độ cao là cạnh đối. $\\sin 12^\\circ = \\frac{h}{50} \\Rightarrow h = 50 \\cdot \\sin 12^\\circ$."
  },
  {
    "id": "TOAN9_B11_040",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Thầy Toàn tại Trung tâm Toán Khôi Nguyên thiết kế một logo tam giác vuông có $\\tan = 0,75$. Khi đó $\\sin$ của góc đó là $0,6$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\tan = \\frac{3}{4} \\Rightarrow \\text{Đối}=3, \\text{Kề}=4 \\Rightarrow \\text{Huyền}=5 \\Rightarrow \\sin = \\frac{3}{5} = 0,6$."
  },
  {
    "id": "TOAN9_B11_041",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Trong $\\Delta ABC$ vuông tại $A$ biết $AB = 3$, $AC = 4$. Tính $\\tan B$. ....",
    "imageUrl": "/images/toan9/b11_cau41_tan_b.svg",
    "options": [],
    "correctAnswer": "1.33",
    "explanation": "$\\tan B = \\frac{AC}{AB} = \\frac{4}{3} \\approx 1,33$."
  },
  {
    "id": "TOAN9_B11_042",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tính giá trị biểu thức $\\sqrt{3} \\cdot \\tan 30^\\circ$. ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "$\\sqrt{3} \\cdot \\frac{\\sqrt{3}}{3} = 1$."
  },
  {
    "id": "TOAN9_B11_043",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Giá trị của $\\sin^2 45^\\circ + \\cos^2 45^\\circ$ là ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "Hệ thức $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$."
  },
  {
    "id": "TOAN9_B11_044",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Biết $\\cos \\alpha = 0,5$. Số đo góc $\\alpha$ (độ) bằng ....",
    "options": [],
    "correctAnswer": "60",
    "explanation": "$\\cos 60^\\circ = 0,5$."
  },
  {
    "id": "TOAN9_B11_045",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Cho $\\tan \\alpha = 5$. Giá trị của $\\cot \\alpha$ là ....",
    "options": [],
    "correctAnswer": "0.2",
    "explanation": "$\\cot \\alpha = \\frac{1}{\\tan \\alpha} = \\frac{1}{5} = 0,2$."
  },
  {
    "id": "TOAN9_B11_046",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tính $P = \\sin 30^\\circ - \\cos 60^\\circ$. ....",
    "options": [],
    "correctAnswer": "0",
    "explanation": "$0,5 - 0,5 = 0$."
  },
  {
    "id": "TOAN9_B11_047",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Biết $\\Delta ABC$ vuông tại $A$, có $\\widehat{C} = 45^\\circ$. Giá trị của $\\tan C$ là ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "$\\tan 45^\\circ = 1$."
  },
  {
    "id": "TOAN9_B11_048",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tính $\\sin 90^\\circ$ (dựa trên giới hạn góc vuông). ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "Theo bảng giá trị đặc biệt mở rộng."
  },
  {
    "id": "TOAN9_B11_049",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Biết $\\sin \\alpha = \\frac{\\sqrt{2}}{2}$. Số đo góc $\\alpha$ (độ) là ....",
    "options": [],
    "correctAnswer": "45",
    "explanation": "Theo bảng giá trị lượng giác cơ bản."
  },
  {
    "id": "TOAN9_B11_050",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tính $\\tan 60^\\circ \\cdot \\cot 60^\\circ$. ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "Tích tan và cot luôn bằng 1."
  },
  {
    "id": "TOAN9_B11_051",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Cho tam giác vuông có cạnh huyền là $10$, cạnh góc vuông đối diện với góc $\\alpha$ là $6$. Tính $\\sin \\alpha$. ....",
    "imageUrl": "/images/toan9/b11_cau51_sin_alpha.svg",
    "options": [],
    "correctAnswer": "0.6",
    "explanation": "$\\sin \\alpha = \\frac{6}{10} = 0,6$."
  },
  {
    "id": "TOAN9_B11_052",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Biết $\\sin \\alpha = 0,6$. Giá trị của $\\cos \\alpha$ là ....",
    "options": [],
    "correctAnswer": "0.8",
    "explanation": "$\\cos \\alpha = \\sqrt{1 - 0,6^2} = \\sqrt{0,64} = 0,8$."
  },
  {
    "id": "TOAN9_B11_053",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Cho $\\Delta ABC$ vuông tại $A$, $\\widehat{B} = 30^\\circ$, $AB = \\sqrt{3}$. Tính độ dài $AC$. ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "$\\tan B = \\frac{AC}{AB} \\Rightarrow \\tan 30^\\circ = \\frac{AC}{\\sqrt{3}} \\Rightarrow \\frac{1}{\\sqrt{3}} = \\frac{AC}{\\sqrt{3}} \\Rightarrow AC = 1$."
  },
  {
    "id": "TOAN9_B11_054",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Tính $M = \\sin^2 25^\\circ + \\sin^2 65^\\circ$. ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "$\\sin 65^\\circ = \\cos 25^\\circ \\Rightarrow \\sin^2 25^\\circ + \\cos^2 25^\\circ = 1$."
  },
  {
    "id": "TOAN9_B11_055",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Tính $N = \\frac{\\sin 30^\\circ}{\\cos 30^\\circ} - \\tan 30^\\circ$. ....",
    "options": [],
    "correctAnswer": "0",
    "explanation": "$\\frac{\\sin 30^\\circ}{\\cos 30^\\circ} = \\tan 30^\\circ \\Rightarrow N = 0$."
  },
  {
    "id": "TOAN9_B11_056",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Biết $\\tan \\alpha = 0,5$. Giá trị của biểu thức $P = \\frac{\\cos \\alpha}{\\sin \\alpha}$ là ....",
    "options": [],
    "correctAnswer": "2",
    "explanation": "$P = \\cot \\alpha = \\frac{1}{\\tan \\alpha} = \\frac{1}{0,5} = 2$."
  },
  {
    "id": "TOAN9_B11_057",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Tại Trung tâm Toán Khôi Nguyên, Thầy Toàn vẽ bóng của một cây sào cao $4$ m chiếu xuống mặt đất dài $4\\sqrt{3}$ m. Số đo góc $\\alpha$ (độ) tạo bởi tia nắng và mặt đất là ....",
    "imageUrl": "/images/toan9/b11_cau57_bong_cay_sao.svg",
    "options": [],
    "correctAnswer": "30",
    "explanation": "$\\tan \\alpha = \\frac{4}{4\\sqrt{3}} = \\frac{1}{\\sqrt{3}} \\Rightarrow \\alpha = 30^\\circ$."
  },
  {
    "id": "TOAN9_B11_058",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một con dốc nghiêng $\\alpha = 10^\\circ$. Một người đi xe đạp được 1000m trên dốc đó. Tính độ cao người đó đạt được (làm tròn số nguyên, $\\sin 10^\\circ \\approx 0,1736$). ....",
    "options": [],
    "correctAnswer": "174",
    "explanation": "$h = 1000 \\cdot \\sin 10^\\circ \\approx 1000 \\cdot 0,1736 = 173,6 \\approx 174$ m."
  },
  {
    "id": "TOAN9_B11_059",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Rút gọn $A = \\cos^2 10^\\circ + \\cos^2 20^\\circ + \\cos^2 70^\\circ + \\cos^2 80^\\circ$. Kết quả là ....",
    "options": [],
    "correctAnswer": "2",
    "explanation": "$(\\cos^2 10^\\circ + \\cos^2 80^\\circ) + (\\cos^2 20^\\circ + \\cos^2 70^\\circ) = (\\cos^2 10^\\circ + \\sin^2 10^\\circ) + (\\cos^2 20^\\circ + \\sin^2 20^\\circ) = 1 + 1 = 2$."
  },
  {
    "id": "TOAN9_B11_060",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Cho tam giác $ABC$ có $AB=6, AC=8, BC=10$. Tính $\\sin B + \\cos B$. ....",
    "options": [],
    "correctAnswer": "1.4",
    "explanation": "Tam giác vuông tại $A$ (vì $6^2+8^2=10^2$). $\\sin B = \\frac{8}{10} = 0,8; \\cos B = \\frac{6}{10} = 0,6$. Tổng bằng $1,4$."
  },
  {
    "id": "TOAN9_B11_061",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Khi góc nhọn $\\alpha$ tăng dần từ $0^\\circ$ đến $90^\\circ$ thì $\\cos \\alpha$ tăng dần.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Sai. Khi góc $\\alpha$ tăng từ $0^\\circ$ đến $90^\\circ$, cạnh kề thu nhỏ lại so với cạnh huyền, do đó $\\cos \\alpha$ giảm dần từ 1 về 0."
  },
  {
    "id": "TOAN9_B11_062",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: $\\sin 45^\\circ + \\cos 45^\\circ = 1$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Sai vì $\\sin 45^\\circ + \\cos 45^\\circ = \\frac{\\sqrt{2}}{2} + \\frac{\\sqrt{2}}{2} = \\sqrt{2} \\approx 1{,}414 \\neq 1$. (Không được nhầm với $\\sin^2 45^\\circ + \\cos^2 45^\\circ = 1$)."
  },
  {
    "id": "TOAN9_B11_063",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Hai bạn An và Bình cùng quan sát một tòa tháp. An đứng cách tháp $50\\text{ m}$ nhìn thấy đỉnh tháp với góc nâng $30^\\circ$. Bình đứng xa hơn An và nhìn thấy đỉnh tháp với góc nâng $15^\\circ$. Mệnh đề: Chiều cao của tháp (tính từ mắt người quan sát) bằng $50 \\cdot \\tan 30^\\circ \\approx 28{,}87\\text{ m}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Đúng. Xét tam giác vuông từ chân tháp đến An và đỉnh tháp: chiều cao $h = 50 \\cdot \\tan 30^\\circ \\approx 28{,}87\\text{ m}$."
  },
  {
    "id": "TOAN9_B11_064",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Tính giá trị của biểu thức: $A = \\sin^2 25^\\circ + \\sin^2 65^\\circ$. ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "Vì $25^\\circ + 65^\\circ = 90^\\circ$ nên $\\sin 65^\\circ = \\cos 25^\\circ$. Do đó $A = \\sin^2 25^\\circ + \\cos^2 25^\\circ = 1$."
  },
  {
    "id": "TOAN9_B11_065",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Cho tam giác $ABC$ vuông tại $A$. Biết $\\tan B = \\frac{3}{4}$ và cạnh kề góc $B$ dài $12\\text{ cm}$. Chu vi tam giác $ABC$ là ... cm.",
    "options": [],
    "correctAnswer": "36",
    "explanation": "$\\tan B = \\frac{AC}{AB} = \\frac{3}{4} \\Rightarrow AC = 12 \\cdot \\frac{3}{4} = 9\\text{ cm}$. Cạnh huyền $BC = \\sqrt{12^2 + 9^2} = 15\\text{ cm}$. Chu vi $= 12 + 9 + 15 = 36\\text{ cm}$."
  },
  {
    "id": "TOAN9_B12_001",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho tam giác $ABC$ vuông tại $A$. Hệ thức nào sau đây là đúng?",
    "options": [
      "A. $b = a \\cdot \\sin C$",
      "B. $b = a \\cdot \\cos C$",
      "C. $b = a \\cdot \\tan B$",
      "D. $b = c \\cdot \\sin B$"
    ],
    "correctAnswer": 1,
    "explanation": "Cạnh góc vuông $b$ bằng cạnh huyền $a$ nhân với $\\cos$ góc kề (góc $C$). Vậy $b = a \\cdot \\cos C$ đúng."
  },
  {
    "id": "TOAN9_B12_002",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Trong tam giác vuông, cạnh góc vuông bằng cạnh góc vuông kia nhân với:",
    "options": [
      "A. $\\sin$ góc đối",
      "B. $\\cos$ góc kề",
      "C. $\\tan$ góc đối",
      "D. Cả A và B đều đúng"
    ],
    "correctAnswer": 2,
    "explanation": "Hệ thức: $b = c \\cdot \\tan B = c \\cdot \\cot C$. Nhân với $\\tan$ góc đối hoặc $\\cot$ góc kề."
  },
  {
    "id": "TOAN9_B12_003",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho $\\Delta MNP$ vuông tại $M$, cạnh huyền $NP = 10$, góc $\\widehat{N} = 30^\\circ$. Độ dài cạnh $MP$ là:",
    "options": [
      "A. $10 \\cdot \\sin 30^\\circ$",
      "B. $10 \\cdot \\cos 30^\\circ$",
      "C. $10 \\cdot \\tan 30^\\circ$",
      "D. $10 \\cdot \\cot 30^\\circ$"
    ],
    "correctAnswer": 0,
    "explanation": "$MP$ là cạnh đối của góc $N$. $MP = NP \\cdot \\sin N = 10 \\cdot \\sin 30^\\circ$."
  },
  {
    "id": "TOAN9_B12_004",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho $\\Delta DEF$ vuông tại $D$, có $DE = 5$, $\\widehat{E} = 45^\\circ$. Giải tam giác vuông $DEF$ ta được:",
    "options": [
      "A. $\\widehat{F} = 45^\\circ, DF = 5$",
      "B. $\\widehat{F} = 45^\\circ, DF = 5\\sqrt{2}$",
      "C. $\\widehat{F} = 30^\\circ, DF = 5$",
      "D. $\\widehat{F} = 60^\\circ, EF = 5$"
    ],
    "correctAnswer": 0,
    "explanation": "Góc $F = 90^\\circ - 45^\\circ = 45^\\circ$. Tam giác $DEF$ vuông cân tại $D \\Rightarrow DF = DE = 5$."
  },
  {
    "id": "TOAN9_B12_005",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Hệ thức nào dưới đây sai đối với $\\Delta ABC$ vuông tại $A$?",
    "options": [
      "A. $c = a \\cdot \\sin C$",
      "B. $c = b \\cdot \\tan C$",
      "C. $b = a \\cdot \\cos B$",
      "D. $c = b \\cdot \\cot B$"
    ],
    "correctAnswer": 2,
    "explanation": "Đúng ra phải là $b = a \\cdot \\sin B$ hoặc $b = a \\cdot \\cos C$. Do đó C sai."
  },
  {
    "id": "TOAN9_B12_006",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Giải tam giác vuông là công việc tìm:",
    "options": [
      "A. Chu vi và diện tích tam giác.",
      "B. Tất cả các cạnh và các góc chưa biết của tam giác.",
      "C. Chiều cao và đường trung tuyến.",
      "D. Tọa độ các đỉnh của tam giác."
    ],
    "correctAnswer": 1,
    "explanation": "Định nghĩa SGK: Giải tam giác vuông là tìm tất cả độ dài các cạnh và số đo các góc chưa biết."
  },
  {
    "id": "TOAN9_B12_007",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một cột điện bị gãy gập xuống tạo thành tam giác vuông với mặt đất Đoạn gãy cách mặt đất $3$ m, phần ngọn chạm đất tạo góc $30^\\circ$. Tính chiều cao ban đầu của cột điện.",
    "imageUrl": "/images/toan9/b12_cau7_cot_dien_gay.svg",
    "options": [
      "A. $6$ m",
      "B. $9$ m",
      "C. $3\\sqrt{3}$ m",
      "D. $12$ m"
    ],
    "correctAnswer": 1,
    "explanation": "Đoạn bị gãy $x$ là cạnh huyền. $\\sin 30^\\circ = \\frac{3}{x} \\Rightarrow x = \\frac{3}{0,5} = 6$. Chiều cao ban đầu $= 3 + 6 = 9$ m."
  },
  {
    "id": "TOAN9_B12_008",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Cho $\\Delta ABC$ vuông tại $A$, cạnh huyền $a = 12$, góc $\\widehat{B} = 40^\\circ$. Độ dài cạnh $b$ (làm tròn đến chữ số thập phân thứ hai) là:",
    "options": [
      "A. $9,19$",
      "B. $7,71$",
      "C. $10,07$",
      "D. $14,30$"
    ],
    "correctAnswer": 1,
    "explanation": "$b = a \\cdot \\sin B = 12 \\cdot \\sin 40^\\circ \\approx 12 \\cdot 0,6428 \\approx 7,71$."
  },
  {
    "id": "TOAN9_B12_009",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Biết một tam giác vuông có cạnh huyền bằng $20$ cm, một góc nhọn bằng $60^\\circ$. Cạnh góc vuông kề với góc $60^\\circ$ có độ dài là:",
    "options": [
      "A. $10$ cm",
      "B. $10\\sqrt{3}$ cm",
      "C. $10\\sqrt{2}$ cm",
      "D. $20$ cm"
    ],
    "correctAnswer": 0,
    "explanation": "Cạnh kề = Huyền $\\times \\cos 60^\\circ = 20 \\cdot \\frac{1}{2} = 10$ cm."
  },
  {
    "id": "TOAN9_B12_010",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một cái thang dài 5m đặt tựa vào tường. Chân thang cách tường 3m. Góc tạo bởi thang và mặt đất (làm tròn đến độ) là:",
    "options": [
      "A. $37^\\circ$",
      "B. $53^\\circ$",
      "C. $31^\\circ$",
      "D. $59^\\circ$"
    ],
    "correctAnswer": 1,
    "explanation": "$\\cos \\alpha = \\frac{\\text{kề}}{\\text{huyền}} = \\frac{3}{5} = 0,6 \\Rightarrow \\alpha \\approx 53^\\circ$."
  },
  {
    "id": "TOAN9_B12_011",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Trong tam giác vuông, nếu biết hai cạnh góc vuông là $6$ và $8$, thì số đo góc đối diện với cạnh $6$ (làm tròn đến độ) là:",
    "options": [
      "A. $37^\\circ$",
      "B. $53^\\circ$",
      "C. $45^\\circ$",
      "D. $30^\\circ$"
    ],
    "correctAnswer": 0,
    "explanation": "$\\tan \\alpha = \\frac{6}{8} = 0,75 \\Rightarrow \\alpha \\approx 37^\\circ$."
  },
  {
    "id": "TOAN9_B12_012",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Bác bảo vệ dùng đèn pin chiếu lên tường Góc chiếu là $45^\\circ$, khoảng cách từ đèn đến tường là $5$ m. Độ cao vệt sáng trên tường tính từ mặt phẳng nằm ngang qua đèn là:",
    "imageUrl": "/images/toan9/b12_cau12_den_pin_chieu_tuong.svg",
    "options": [
      "A. $5$ m",
      "B. $5\\sqrt{2}$ m",
      "C. $2,5$ m",
      "D. $10$ m"
    ],
    "correctAnswer": 0,
    "explanation": "$h = 5 \\cdot \\tan 45^\\circ = 5 \\cdot 1 = 5$ m."
  },
  {
    "id": "TOAN9_B12_013",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Cho $\\Delta ABC$ vuông tại $A$. Biết $\\tan B = \\frac{3}{4}$, $AC = 12$. Độ dài cạnh $AB$ là:",
    "options": [
      "A. $16$",
      "B. $9$",
      "C. $15$",
      "D. $20$"
    ],
    "correctAnswer": 0,
    "explanation": "$\\tan B = \\frac{AC}{AB} \\Rightarrow \\frac{3}{4} = \\frac{12}{AB} \\Rightarrow AB = \\frac{12 \\cdot 4}{3} = 16$."
  },
  {
    "id": "TOAN9_B12_014",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Từ đỉnh một ngọn tháp cao $80$ m so với mực nước biển, một người quan sát thấy một hòn đảo với góc hạ $30^\\circ$. Khoảng cách từ chân tháp đến hòn đảo là:",
    "imageUrl": "/images/toan9/b12_cau14_ngon_thap_hon_dao.svg",
    "options": [
      "A. $80\\sqrt{3}$ m",
      "B. $\\frac{80\\sqrt{3}}{3}$ m",
      "C. $160$ m",
      "D. $80$ m"
    ],
    "correctAnswer": 0,
    "explanation": "Góc tạo bởi tia nhìn và mặt biển là $30^\\circ$ (so le trong với góc hạ). Khoảng cách $d = \\frac{80}{\\tan 30^\\circ} = 80\\sqrt{3}$ m."
  },
  {
    "id": "TOAN9_B12_015",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Một con sông rộng $200$ m. Một chiếc đò đi từ bờ này sang bờ kia bị dòng nước đẩy lệch một góc $20^\\circ$ so với hướng vuông góc với bờ. Quãng đường chiếc đò thực tế đã đi là (làm tròn đến mét):",
    "options": [
      "A. $213$ m",
      "B. $188$ m",
      "C. $200$ m",
      "D. $210$ m"
    ],
    "correctAnswer": 0,
    "explanation": "Quãng đường $s = \\frac{200}{\\cos 20^\\circ} \\approx \\frac{200}{0,9397} \\approx 212,8 \\approx 213$ m."
  },
  {
    "id": "TOAN9_B12_016",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Máy bay đang ở độ cao $10$ km so với mặt đất. Khi phi công chuẩn bị hạ cánh xuống sân bay, góc hạ phải là $3^\\circ$. Khoảng cách theo phương ngang từ máy bay đến sân bay là:",
    "options": [
      "A. $190,8$ km",
      "B. $191,1$ km",
      "C. $10,0$ km",
      "D. $52,4$ km"
    ],
    "correctAnswer": 0,
    "explanation": "Khoảng cách ngang $d = \\frac{10}{\\tan 3^\\circ} \\approx \\frac{10}{0,0524} \\approx 190,8$ km."
  },
  {
    "id": "TOAN9_B12_017",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Một người đứng trên đỉnh ngọn hải đăng cao $40$ m so với mặt biển nhìn thấy một con thuyền buồm dưới góc hạ $15^\\circ$. Khoảng cách từ chân ngọn hải đăng đến con thuyền là (làm tròn đến hàng đơn vị):",
    "options": [
      "A. $149$ m",
      "B. $154$ m",
      "C. $120$ m",
      "D. $160$ m"
    ],
    "correctAnswer": 0,
    "explanation": "$d = \\frac{40}{\\tan 15^\\circ} \\approx \\frac{40}{0,2679} \\approx 149,3 \\approx 149$ m."
  },
  {
    "id": "TOAN9_B12_018",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Cho tam giác vuông có cạnh huyền bằng $16$ cm và một góc nhọn bằng $60^\\circ$. Diện tích của tam giác vuông đó là:",
    "options": [
      "A. $32\\sqrt{3}\\text{ cm}^2$",
      "B. $64\\sqrt{3}\\text{ cm}^2$",
      "C. $16\\sqrt{3}\\text{ cm}^2$",
      "D. $48\\text{ cm}^2$"
    ],
    "correctAnswer": 0,
    "explanation": "Hai cạnh góc vuông là $16 \\cdot \\sin 60^\\circ = 8\\sqrt{3}$ và $16 \\cdot \\cos 60^\\circ = 8$. Diện tích $S = \\frac{1}{2} \\cdot 8 \\cdot 8\\sqrt{3} = 32\\sqrt{3}\\text{ cm}^2$."
  },
  {
    "id": "TOAN9_B12_019",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Một chiếc thang dài $6$ m dựng tựa vào bức tường thẳng đứng. Để an toàn, góc tạo bởi thang và bức tường là $20^\\circ$. Khoảng cách từ chân thang đến chân tường là (làm tròn đến hai chữ số thập phân):",
    "options": [
      "A. $2,05$ m",
      "B. $5,64$ m",
      "C. $2,18$ m",
      "D. $1,80$ m"
    ],
    "correctAnswer": 0,
    "explanation": "Khoảng cách từ chân thang đến chân tường là cạnh đối diện góc $20^\\circ$: $d = 6 \\cdot \\sin 20^\\circ \\approx 6 \\cdot 0,3420 \\approx 2,05$ m."
  },
  {
    "id": "TOAN9_B12_020",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Một cột cờ cao $12$ m có bóng trên mặt đất dài $16$ m. Góc nâng của tia nắng mặt trời so với mặt đất (làm tròn đến độ) là:",
    "options": [
      "A. $37^\\circ$",
      "B. $53^\\circ$",
      "C. $45^\\circ$",
      "D. $30^\\circ$"
    ],
    "correctAnswer": 0,
    "explanation": "$\\tan \\alpha = \\frac{12}{16} = 0,75 \\Rightarrow \\alpha \\approx 37^\\circ$."
  },
  {
    "id": "TOAN9_B12_021",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Mệnh đề: Trong tam giác vuông, cạnh góc vuông bằng cạnh huyền nhân với $\\tan$ góc đối.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Cạnh góc vuông bằng cạnh huyền nhân với $\\sin$ góc đối, không phải $\\tan$."
  },
  {
    "id": "TOAN9_B12_022",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Mệnh đề: Trong tam giác vuông, cạnh góc vuông bằng cạnh góc vuông kia nhân với $\\cot$ góc kề.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Đây là hệ thức chuẩn: $b = c \\cdot \\cot C$ (với $C$ là góc kề cạnh $b$)."
  },
  {
    "id": "TOAN9_B12_023",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Mệnh đề: Để giải một tam giác vuông, ta chỉ cần biết trước một góc nhọn của tam giác đó.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Cần biết ít nhất hai yếu tố, trong đó phải có ít nhất một yếu tố về độ dài cạnh."
  },
  {
    "id": "TOAN9_B12_024",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Mệnh đề: Nếu tam giác vuông $ABC$ có $\\widehat{A} = 90^\\circ$ thì $AC = BC \\cdot \\sin B$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Cạnh đối ($AC$) = Cạnh huyền ($BC$) $\\times \\sin$ góc đối ($\\widehat{B}$)."
  },
  {
    "id": "TOAN9_B12_025",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Cho tam giác vuông có khoảng cách $x$ được tính bằng $50 \\cdot \\tan 40^\\circ$.",
    "imageUrl": "/images/toan9/c4_cau1_thang_dua_tuong.svg",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Cạnh đối = Cạnh kề $\\times \\tan(\\text{góc đối}) \\Rightarrow x = 50 \\cdot \\tan 40^\\circ$."
  },
  {
    "id": "TOAN9_B12_026",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Nếu tam giác vuông cân thì chỉ cần biết trước độ dài một cạnh là có thể giải được tam giác đó.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tam giác vuông cân đã biết trước 2 góc nhọn đều là $45^\\circ$, chỉ cần biết thêm 1 cạnh là đủ 2 yếu tố."
  },
  {
    "id": "TOAN9_B12_027",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Cho tam giác vuông có cạnh huyền bằng $10$, một góc nhọn bằng $30^\\circ$. Cạnh góc vuông nhỏ nhất có độ dài bằng $5$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Cạnh góc vuông nhỏ nhất đối diện góc $30^\\circ$: độ dài $= 10 \\cdot \\sin 30^\\circ = 5$."
  },
  {
    "id": "TOAN9_B12_028",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Một cái cây cao $5$ m. Bóng của cây trên mặt đất dài $5$ m. Góc tạo bởi tia nắng và mặt đất khi đó là $60^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Cây và bóng tạo thành tam giác vuông cân $\\Rightarrow$ Góc tạo bởi tia nắng và mặt đất là $45^\\circ$."
  },
  {
    "id": "TOAN9_B12_029",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Nếu tam giác vuông có hai cạnh góc vuông là $3$ và $4$ thì cạnh huyền được tính bằng $3 \\cdot \\cos \\alpha$ (với $\\alpha$ là góc đối diện cạnh 4).",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Cạnh huyền bằng $\\sqrt{3^2+4^2}=5$. Hệ thức trên là sai, vì Cạnh huyền = Cạnh góc vuông / $\\cos(\\text{góc kề})$."
  },
  {
    "id": "TOAN9_B12_030",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Biết chiếc diều đang bay ở độ cao $50$ m, chiều dài dây diều căng thẳng là $100$ m. Góc tạo bởi dây diều và mặt đất là $30^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\sin \\alpha = \\frac{50}{100} = 0,5 \\Rightarrow \\alpha = 30^\\circ$."
  },
  {
    "id": "TOAN9_B12_031",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Trong tam giác vuông, nếu biết cạnh huyền và một góc nhọn, ta luôn tính được hai cạnh góc vuông còn lại bằng các tỉ số $\\sin$ và $\\cos$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Đúng theo hệ thức $b = a \\cdot \\sin B = a \\cdot \\cos C$ và $c = a \\cdot \\sin C = a \\cdot \\cos B$."
  },
  {
    "id": "TOAN9_B12_032",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Góc nâng là góc tạo bởi tia nhìn ngắm lên đỉnh một vật thể và phương thẳng đứng.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Góc nâng là góc tạo bởi tia nhìn ngắm lên và phương nằm ngang (không phải phương thẳng đứng)."
  },
  {
    "id": "TOAN9_B12_033",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Góc hạ là góc tạo bởi tia nhìn ngắm xuống một vật thể và phương nằm ngang tại vị trí quan sát.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Định nghĩa chuẩn của góc hạ trong ứng dụng thực tế hệ thức lượng."
  },
  {
    "id": "TOAN9_B12_034",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Cho tam giác vuông có một góc nhọn $45^\\circ$, nếu độ dài cạnh góc vuông bằng $6$ thì cạnh huyền bằng $6\\sqrt{2}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tam giác vuông cân có cạnh huyền $a = \\sqrt{6^2 + 6^2} = 6\\sqrt{2}$."
  },
  {
    "id": "TOAN9_B12_035",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Trong tam giác $ABC$ vuông tại $A$, ta luôn có hệ thức $AC = AB \\cdot \\cot B$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Hệ thức đúng là $AC = AB \\cdot \\tan B$ hoặc $AC = AB \\cdot \\cot C$."
  },
  {
    "id": "TOAN9_B12_036",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Một người quan sát thấy đỉnh một tòa nhà với góc nâng $60^\\circ$ từ khoảng cách $30$ m tính từ chân tòa nhà. Chiều cao tòa nhà là $30\\sqrt{3}$ m (bỏ qua chiều cao người quan sát).",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$h = 30 \\cdot \\tan 60^\\circ = 30\\sqrt{3}$ m."
  },
  {
    "id": "TOAN9_B12_037",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Khi giải tam giác vuông, nếu đã biết độ dài hai cạnh góc vuông thì luôn tìm được cạnh huyền nhờ định lí Pythagore.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Cạnh huyền $a = \\sqrt{b^2 + c^2}$ luôn tính được từ định lí Pythagore."
  },
  {
    "id": "TOAN9_B12_038",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "true_false",
    "question": "Mệnh đề: Trong một tam giác vuông, cạnh góc vuông luôn có độ dài nhỏ hơn cạnh huyền.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Trong tam giác vuông, góc vuông là góc lớn nhất nên cạnh huyền luôn là cạnh lớn nhất."
  },
  {
    "id": "TOAN9_B12_039",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Nếu góc nâng lên đỉnh núi tăng lên khi người quan sát tiến lại gần chân núi, thì chiều cao ngọn núi cũng tăng lên.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Chiều cao ngọn núi là đại lượng cố định, chỉ có khoảng cách và góc nhìn thay đổi."
  },
  {
    "id": "TOAN9_B12_040",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Nhờ các hệ thức lượng trong tam giác vuông, ta có thể đo gián tiếp chiều cao của những vật thể mà không thể trèo lên đỉnh để đo trực tiếp.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Đây chính là ứng dụng thực tế quan trọng nhất của hệ thức giữa cạnh và góc trong tam giác vuông."
  },
  {
    "id": "TOAN9_B12_041",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Cho tam giác vuông, biết cạnh huyền bằng $12$, góc nhọn bằng $30^\\circ$. Độ dài cạnh góc vuông đối diện góc $30^\\circ$ là ....",
    "options": [],
    "correctAnswer": "6",
    "explanation": "$x = 12 \\cdot \\sin 30^\\circ = 12 \\cdot 0,5 = 6$."
  },
  {
    "id": "TOAN9_B12_042",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Cạnh góc vuông kề với góc $60^\\circ$, biết cạnh huyền là $10$. Độ dài cạnh góc vuông đó là ....",
    "options": [],
    "correctAnswer": "5",
    "explanation": "$x = 10 \\cdot \\cos 60^\\circ = 10 \\cdot 0,5 = 5$."
  },
  {
    "id": "TOAN9_B12_043",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tính độ cao $h$ của bức tường, biết $\\tan 45^\\circ = 1$ và khoảng cách $x = 8$.\n  ....",
    "imageUrl": "/images/toan9/b12_cau12_den_pin_chieu_tuong.svg",
    "options": [],
    "correctAnswer": "8",
    "explanation": "$h = 8 \\cdot \\tan 45^\\circ = 8 \\cdot 1 = 8$."
  },
  {
    "id": "TOAN9_B12_044",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Một cột đèn cao $7$ m đổ bóng trên mặt đất dài $7$ m. Số đo góc (độ) của tia nắng mặt trời tạo với mặt đất là ....",
    "options": [],
    "correctAnswer": "45",
    "explanation": "$\\tan \\alpha = \\frac{7}{7} = 1 \\Rightarrow \\alpha = 45^\\circ$."
  },
  {
    "id": "TOAN9_B12_045",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Tính khoảng cách $d$ từ thuyền đến bến, biết dây neo dài $10$ m và tạo với mặt nước góc $60^\\circ$. ($\\cos 60^\\circ = 0,5$). ....",
    "imageUrl": "/images/toan9/c4_cau1_thang_dua_tuong.svg",
    "options": [],
    "correctAnswer": "5",
    "explanation": "$d = 10 \\cdot \\cos 60^\\circ = 10 \\cdot 0,5 = 5$."
  },
  {
    "id": "TOAN9_B12_046",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Cầu trượt trong công viên dài $4$ m, góc nghiêng của mặt cầu so với mặt đất là $30^\\circ$. Tính chiều cao của cầu trượt (m). ....",
    "options": [],
    "correctAnswer": "2",
    "explanation": "$h = 4 \\cdot \\sin 30^\\circ = 2$ m."
  },
  {
    "id": "TOAN9_B12_047",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Từ đỉnh tháp cao $50$ m, nhìn một chiếc ô tô dưới góc hạ $45^\\circ$. Khoảng cách từ ô tô đến chân tháp (m) là ....",
    "options": [],
    "correctAnswer": "50",
    "explanation": "Góc hạ $45^\\circ \\Rightarrow$ Tam giác vuông cân $\\Rightarrow$ Khoảng cách = chiều cao = $50$ m."
  },
  {
    "id": "TOAN9_B12_048",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Khúc sông rộng $60$ m. Đò đi chéo tạo với bờ sông góc $30^\\circ$. Chiều dài đường đò đi (m) là ....",
    "options": [],
    "correctAnswer": "120",
    "explanation": "Đường đò đi là cạnh huyền: $d = \\frac{60}{\\sin 30^\\circ} = \\frac{60}{0,5} = 120$ m."
  },
  {
    "id": "TOAN9_B12_049",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Cho $\\Delta ABC$ vuông tại $A$, có $AB = 5\\sqrt{3}$, $\\widehat{B} = 60^\\circ$. Tính cạnh góc vuông $AC$. ....",
    "options": [],
    "correctAnswer": "15",
    "explanation": "$AC = AB \\cdot \\tan 60^\\circ = 5\\sqrt{3} \\cdot \\sqrt{3} = 15$."
  },
  {
    "id": "TOAN9_B12_050",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Cho chiếc thang dài $10$ m dựng tựa vào tường. Góc tạo bởi thang và bức tường là $30^\\circ$. Khoảng cách từ chân thang tới chân tường (m) là ....",
    "options": [],
    "correctAnswer": "5",
    "explanation": "$d = 10 \\cdot \\sin 30^\\circ = 10 \\cdot 0,5 = 5$ m."
  },
  {
    "id": "TOAN9_B12_051",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Cho tam giác vuông có một góc nhọn bằng $45^\\circ$ và cạnh huyền bằng $8\\sqrt{2}$. Độ dài cạnh góc vuông của tam giác đó là ....",
    "options": [],
    "correctAnswer": "8",
    "explanation": "Cạnh góc vuông $b = 8\\sqrt{2} \\cdot \\cos 45^\\circ = 8\\sqrt{2} \\cdot \\frac{\\sqrt{2}}{2} = 8$."
  },
  {
    "id": "TOAN9_B12_052",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Từ điểm $A$ cách chân tháp $60$ m, góc nâng lên đỉnh tháp là $45^\\circ$. Chiều cao của tháp (m) là ....",
    "options": [],
    "correctAnswer": "60",
    "explanation": "$h = 60 \\cdot \\tan 45^\\circ = 60 \\cdot 1 = 60$ m."
  },
  {
    "id": "TOAN9_B12_053",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một con tàu rời cảng theo hướng đông được $30$ hải lý rồi rẽ sang hướng bắc đi tiếp $40$ hải lý. Khoảng cách thẳng từ con tàu về cảng là bao nhiêu hải lý? ....",
    "options": [],
    "correctAnswer": "50",
    "explanation": "$d = \\sqrt{30^2 + 40^2} = 50$ hải lý."
  },
  {
    "id": "TOAN9_B12_054",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Cho $\\Delta ABC$ vuông tại $A$, $\\widehat{C} = 30^\\circ$, cạnh huyền $BC = 18$. Tính độ dài cạnh $AB$. ....",
    "options": [],
    "correctAnswer": "9",
    "explanation": "$AB = BC \\cdot \\sin 30^\\circ = 18 \\cdot 0,5 = 9$."
  },
  {
    "id": "TOAN9_B12_055",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Một cột cờ có bóng trên mặt đất dài $12$ m khi góc nâng của mặt trời là $45^\\circ$. Chiều cao cột cờ (m) là ....",
    "options": [],
    "correctAnswer": "12",
    "explanation": "$h = 12 \\cdot \\tan 45^\\circ = 12 \\cdot 1 = 12$ m."
  },
  {
    "id": "TOAN9_B12_056",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một máy bay cất cánh bay lên nghiêng một góc $30^\\circ$ so với mặt đất. Sau khi bay được quãng đường $4000$ m trên không, độ cao của máy bay so với mặt đất (m) là ....",
    "options": [],
    "correctAnswer": "2000",
    "explanation": "$h = 4000 \\cdot \\sin 30^\\circ = 4000 \\cdot 0,5 = 2000$ m."
  },
  {
    "id": "TOAN9_B12_057",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một ngọn hải đăng cao $80$ m so với mực nước biển. Người gác ngọn hải đăng nhìn một chiếc thuyền với góc hạ $45^\\circ$. Khoảng cách từ chân hải đăng đến con thuyền (m) là ....",
    "options": [],
    "correctAnswer": "80",
    "explanation": "$d = \\frac{80}{\\tan 45^\\circ} = 80$ m."
  },
  {
    "id": "TOAN9_B12_058",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Cho $\\Delta ABC$ vuông tại $A$, có $AC = 12\\text{ cm}$, $\\tan C = 0,75$. Tính độ dài cạnh $AB$ (cm). ....",
    "options": [],
    "correctAnswer": "9",
    "explanation": "$AB = AC \\cdot \\tan C = 12 \\cdot 0,75 = 9$ cm."
  },
  {
    "id": "TOAN9_B12_059",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Chân thang đặt cách chân tường $2$ m. Góc tạo bởi thang và mặt đất là $60^\\circ$. Chiều dài của chiếc thang (m) là ....",
    "options": [],
    "correctAnswer": "4",
    "explanation": "$l = \\frac{2}{\\cos 60^\\circ} = \\frac{2}{0,5} = 4$ m."
  },
  {
    "id": "TOAN9_B12_060",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Cho tam giác vuông có cạnh huyền bằng $26$, một cạnh góc vuông bằng $10$. Chu vi của tam giác vuông đó là ....",
    "options": [],
    "correctAnswer": "60",
    "explanation": "Cạnh góc vuông thứ hai $= \\sqrt{26^2 - 10^2} = 24$. Chu vi $= 10 + 24 + 26 = 60$."
  },
  {
    "id": "TOAN9_B12_061",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Trong $\\triangle MNP$ vuông tại $M$, hệ thức $MN = MP \\cdot \\tan P$ thể hiện điều gì?",
    "options": [
      "A. Cạnh góc vuông = Cạnh huyền $\\times \\sin$(góc đối)",
      "B. Cạnh huyền = Cạnh góc vuông $\\times \\tan$(góc đối)",
      "C. Cạnh góc vuông = Cạnh góc vuông kia $\\times \\tan$(góc đối)",
      "D. Cạnh góc vuông = Cạnh góc vuông kia $\\times \\cot$(góc kề)"
    ],
    "correctAnswer": 2,
    "explanation": "Trong $\\triangle MNP$, $MN$ và $MP$ là hai cạnh góc vuông, $\\widehat{P}$ là góc đối diện cạnh $MN$. Đây chính là phát biểu của Định lý 2."
  },
  {
    "id": "TOAN9_B12_062",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "imageUrl": "/images/toan9/b12_cau5_cot_dien_bong.svg",
    "question": "Một cột điện cao $8\\text{ m}$ có bóng trên mặt đất. Vào một thời điểm trong ngày, tia sáng mặt trời tạo với mặt đất một góc $40^\\circ$. Chiều dài bóng cột điện trên mặt đất (làm tròn 1 chữ số thập phân) là:",
    "options": [
      "A. $6{,}1\\text{ m}$",
      "B. $6{,}7\\text{ m}$",
      "C. $9{,}5\\text{ m}$",
      "D. $12{,}4\\text{ m}$"
    ],
    "correctAnswer": 2,
    "explanation": "Gọi bóng là $x$. Ta có: $8 = x \\cdot \\tan 40^\\circ \\Rightarrow x = \\frac{8}{\\tan 40^\\circ} \\approx \\frac{8}{0{,}8391} \\approx 9{,}53\\text{ m} \\approx 9{,}5\\text{ m}$."
  },
  {
    "id": "TOAN9_B12_063",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Xét tam giác vuông có độ dài cạnh huyền là $a$, hai cạnh góc vuông là $b$ và $c$, các góc đối diện tương ứng là $A=90^\\circ, B, C$. Mệnh đề: Cạnh $c$ có thể được tính bằng $a \\cdot \\sqrt{1 - \\sin^2 B}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Đúng. Vì $\\sin^2 B + \\cos^2 B = 1 \\Rightarrow \\cos B = \\sqrt{1 - \\sin^2 B}$. Do đó $c = a \\cdot \\cos B = a \\cdot \\sqrt{1 - \\sin^2 B}$."
  },
  {
    "id": "TOAN9_B12_064",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "imageUrl": "/images/toan9/b12_cau7_thang_tua_tuong_70.svg",
    "question": "Một chiếc thang tựa vào tường, chân thang cách tường $1{,}5\\text{ m}$, góc tạo bởi thang và mặt đất là $70^\\circ$. Mệnh đề: Nếu đẩy chân thang sát vào tường thêm $0{,}5\\text{ m}$ (chiều dài thang không đổi) thì góc giữa thang và mặt đất sẽ lớn hơn $70^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Đúng. Khi chân thang tiến sát vào tường, khoảng cách kề giảm từ $1{,}5\\text{ m}$ xuống $1{,}0\\text{ m}$, làm thang dốc hơn $\\Rightarrow$ góc nâng tăng lên xấp xỉ $76{,}8^\\circ > 70^\\circ$."
  },
  {
    "id": "TOAN9_B12_065",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Tam giác $DEF$ vuông tại $D$ có $EF = 20\\text{ cm}$ và $\\widehat{E} = 45^\\circ$. Tính độ dài cạnh $DF$ theo dạng $a\\sqrt{2}$ (chỉ điền hệ số số nguyên $a$). ....",
    "options": [],
    "correctAnswer": "10",
    "explanation": "$DF = EF \\cdot \\sin E = 20 \\cdot \\sin 45^\\circ = 20 \\cdot \\frac{\\sqrt{2}}{2} = 10\\sqrt{2}$. Hệ số là 10."
  },
  {
    "id": "TOAN9_B12_066",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một tòa nhà có bóng trên mặt đất dài $20\\text{ m}$. Góc tạo bởi tia sáng mặt trời và bóng là $60^\\circ$. Tính chiều cao tòa nhà (làm tròn 1 chữ số thập phân, đơn vị mét). ....",
    "options": [],
    "correctAnswer": "34.6",
    "explanation": "Chiều cao $h = 20 \\cdot \\tan 60^\\circ = 20\\sqrt{3} \\approx 34{,}64\\text{ m} \\Rightarrow$ làm tròn là $34{,}6$."
  },
  {
    "id": "TOAN9_B12_067",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "imageUrl": "/images/toan9/b12_cau11_do_sang_song_lech_25.svg",
    "question": "Một chiếc đò bơi ngang sông bị dòng nước đẩy lệch một góc $25^\\circ$ so với phương vuông góc đôi bờ. Quãng đường thực tế đò đi là $150\\text{ m}$. Tính chiều rộng con sông (làm tròn đến mét). ....",
    "options": [],
    "correctAnswer": "136",
    "explanation": "Chiều rộng $d = 150 \\cdot \\cos 25^\\circ \\approx 150 \\cdot 0{,}9063 \\approx 135{,}94\\text{ m} \\Rightarrow$ làm tròn thành $136\\text{ m}$."
  },
  {
    "id": "TOAN9_B12_068",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "imageUrl": "/images/toan9/b12_cau12_do_chieu_cao_cay.svg",
    "question": "Để đo chiều cao cây $AC$, người ngắm đứng cách gốc $10\\text{ m}$ và đo góc nâng từ mắt (cao $1{,}5\\text{ m}$) đến đỉnh cây là $40^\\circ$. Chiều cao toàn bộ của cây (làm tròn 1 chữ số thập phân, mét) là ....",
    "options": [],
    "correctAnswer": "9.9",
    "explanation": "Đoạn cây trên tầm mắt $h' = 10 \\cdot \\tan 40^\\circ \\approx 8{,}39\\text{ m}$. Tổng chiều cao $h = 8{,}39 + 1{,}5 = 9{,}89 \\approx 9{,}9\\text{ m}$."
  },
  {
    "id": "TOAN9_C4_001",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Một chiếc thang dài $5$ m dựa vào tường. Góc tạo bởi thang và mặt đất là $\\alpha$. Khoảng cách từ chân thang đến tường là $x$. Biểu thức nào sau đây tính đúng $x$?",
    "imageUrl": "/images/toan9/c4_cau1_thang_dua_tuong.svg",
    "options": [
      "A. $x = 5 \\cdot \\sin \\alpha$",
      "B. $x = 5 \\cdot \\cos \\alpha$",
      "C. $x = 5 \\cdot \\tan \\alpha$",
      "D. $x = \\frac{5}{\\cos \\alpha}$"
    ],
    "correctAnswer": 1,
    "explanation": "$x$ là cạnh kề góc $\\alpha$, chiều dài thang là cạnh huyền. $\\cos \\alpha = \\frac{x}{5} \\Rightarrow x = 5 \\cdot \\cos \\alpha$."
  },
  {
    "id": "TOAN9_C4_002",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Trong tam giác vuông, hệ thức nào biểu diễn đúng mối quan hệ giữa cạnh góc vuông $b$, cạnh góc vuông $c$ và góc $\\widehat{B}$?",
    "options": [
      "A. $b = c \\cdot \\sin B$",
      "B. $b = c \\cdot \\cos B$",
      "C. $b = c \\cdot \\tan B$",
      "D. $b = c \\cdot \\cot B$"
    ],
    "correctAnswer": 2,
    "explanation": "Cạnh góc vuông = Cạnh góc vuông kia $\\times \\tan$ góc đối $\\Rightarrow b = c \\cdot \\tan B$."
  },
  {
    "id": "TOAN9_C4_003",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Người ta dùng một dây cáp dài $20$ m để níu một cột ăng-ten. Dây cáp tạo với cột một góc $30^\\circ$. Chiều cao cột ăng-ten là:",
    "imageUrl": "/images/toan9/c4_cau3_ang_ten_cap.svg",
    "options": [
      "A. $20 \\cdot \\sin 30^\\circ$",
      "B. $20 \\cdot \\cos 30^\\circ$",
      "C. $20 \\cdot \\tan 30^\\circ$",
      "D. $\\frac{20}{\\cos 30^\\circ}$"
    ],
    "correctAnswer": 1,
    "explanation": "Chiều cao $h$ là cạnh kề với góc $30^\\circ$. Cáp là cạnh huyền. $h = 20 \\cdot \\cos 30^\\circ$."
  },
  {
    "id": "TOAN9_C4_004",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Khẳng định nào sau đây sai?",
    "options": [
      "A. $\\sin^2 20^\\circ + \\cos^2 20^\\circ = 1$",
      "B. $\\tan 30^\\circ \\cdot \\cot 30^\\circ = 1$",
      "C. $\\sin 40^\\circ = \\cos 50^\\circ$",
      "D. $\\sin 60^\\circ = \\sin 30^\\circ$"
    ],
    "correctAnswer": 3,
    "explanation": "$\\sin 60^\\circ = \\cos 30^\\circ \\neq \\sin 30^\\circ$."
  },
  {
    "id": "TOAN9_C4_005",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "multiple_choice_1",
    "question": "Cho tam giác vuông có cạnh huyền bằng $10$, một góc nhọn bằng $45^\\circ$. Cạnh góc vuông có độ dài là:",
    "options": [
      "A. $5$",
      "B. $5\\sqrt{2}$",
      "C. $5\\sqrt{3}$",
      "D. $10$"
    ],
    "correctAnswer": 1,
    "explanation": "Cạnh góc vuông $= 10 \\cdot \\sin 45^\\circ = 10 \\cdot \\frac{\\sqrt{2}}{2} = 5\\sqrt{2}$."
  },
  {
    "id": "TOAN9_C4_006",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Máy bay cất cánh với vận tốc $200$ km/h, đường bay tạo với mặt đất góc $20^\\circ$. Sau 3 phút, máy bay đạt độ cao là bao nhiêu?",
    "imageUrl": "/images/toan9/c4_cau6_may_bay_cat_canh.svg",
    "options": [
      "A. $10 \\cdot \\sin 20^\\circ$ km",
      "B. $10 \\cdot \\cos 20^\\circ$ km",
      "C. $10 \\cdot \\tan 20^\\circ$ km",
      "D. $200 \\cdot \\sin 20^\\circ$ km"
    ],
    "correctAnswer": 0,
    "explanation": "3 phút = $\\frac{3}{60} = 0,05$ giờ. Quãng đường $s = 200 \\cdot 0,05 = 10$ km. Độ cao $h = 10 \\cdot \\sin 20^\\circ$ km."
  },
  {
    "id": "TOAN9_C4_007",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Một tòa nhà đổ bóng trên mặt đất dài $15$ m, góc tạo bởi tia nắng và mặt đất là $60^\\circ$. Chiều cao tòa nhà là:",
    "options": [
      "A. $15\\sqrt{3}$ m",
      "B. $5\\sqrt{3}$ m",
      "C. $15$ m",
      "D. $30$ m"
    ],
    "correctAnswer": 0,
    "explanation": "$h = 15 \\cdot \\tan 60^\\circ = 15\\sqrt{3}$ m."
  },
  {
    "id": "TOAN9_C4_008",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Con sông rộng $d$. Một chiếc đò đi chéo một góc $30^\\circ$ so với phương vuông góc với bờ sông. Đò phải đi đoạn đường $100$ m mới sang được bờ bên kia. Chiều rộng sông $d$ là:",
    "imageUrl": "/images/toan9/c4_cau8_do_sang_song.svg",
    "options": [
      "A. $100 \\cdot \\sin 30^\\circ$ m",
      "B. $100 \\cdot \\cos 30^\\circ$ m",
      "C. $100 \\cdot \\tan 30^\\circ$ m",
      "D. $\\frac{100}{\\cos 30^\\circ}$ m"
    ],
    "correctAnswer": 1,
    "explanation": "Trong tam giác vuông, chiều rộng $d$ là cạnh kề của góc $30^\\circ$. Cạnh huyền là quãng đường $100$ m. $d = 100 \\cdot \\cos 30^\\circ$."
  },
  {
    "id": "TOAN9_C4_009",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Biết $\\tan \\alpha = \\frac{3}{4}$, giá trị của $\\sin \\alpha + \\cos \\alpha$ là:",
    "options": [
      "A. $\\frac{7}{5}$",
      "B. $\\frac{7}{4}$",
      "C. $\\frac{12}{5}$",
      "D. $\\frac{1}{5}$"
    ],
    "correctAnswer": 0,
    "explanation": "$\\tan \\alpha = \\frac{3}{4} \\Rightarrow$ cạnh đối $= 3$, cạnh kề $= 4 \\Rightarrow$ cạnh huyền $= 5$. $\\sin \\alpha = \\frac{3}{5}$, $\\cos \\alpha = \\frac{4}{5}$. Tổng $= \\frac{7}{5}$."
  },
  {
    "id": "TOAN9_C4_010",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "multiple_choice_1",
    "question": "Rút gọn biểu thức $M = \\sin 25^\\circ - \\cos 65^\\circ + \\tan 45^\\circ$.",
    "options": [
      "A. $0$",
      "B. $1$",
      "C. $2$",
      "D. $-1$"
    ],
    "correctAnswer": 1,
    "explanation": "$\\sin 25^\\circ = \\cos 65^\\circ \\Rightarrow \\sin 25^\\circ - \\cos 65^\\circ = 0$. $\\tan 45^\\circ = 1$. Kết quả bằng $1$."
  },
  {
    "id": "TOAN9_C4_011",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Từ hai điểm $A, B$ trên mặt đất cách nhau $10$ m, cùng nhìn lên đỉnh $C$ của tháp với góc nâng lần lượt là $45^\\circ$ và $30^\\circ$. Chiều cao tháp (làm tròn đến mét) là:",
    "imageUrl": "/images/toan9/c4_cau11_hai_diem_ngam_thap.svg",
    "options": [
      "A. $14$ m",
      "B. $24$ m",
      "C. $10$ m",
      "D. $5$ m"
    ],
    "correctAnswer": 0,
    "explanation": "Gọi chiều cao là $h$. $AH = \\frac{h}{\\tan 45^\\circ} = h$. $BH = \\frac{h}{\\tan 30^\\circ} = h\\sqrt{3}$. Ta có $BH - AH = 10 \\Rightarrow h\\sqrt{3} - h = 10 \\Rightarrow h = \\frac{10}{\\sqrt{3}-1} = 5(\\sqrt{3}+1) \\approx 13,66 \\approx 14$ m."
  },
  {
    "id": "TOAN9_C4_012",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Biết $\\sin \\alpha = 0,6$. Giá trị của biểu thức $P = \\frac{\\sin \\alpha - \\cos \\alpha}{\\sin \\alpha + \\cos \\alpha}$ là:",
    "options": [
      "A. $-\\frac{1}{7}$",
      "B. $\\frac{1}{7}$",
      "C. $7$",
      "D. $-7$"
    ],
    "correctAnswer": 0,
    "explanation": "$\\cos \\alpha = \\sqrt{1 - 0,6^2} = 0,8$. $P = \\frac{0,6 - 0,8}{0,6 + 0,8} = \\frac{-0,2}{1,4} = -\\frac{1}{7}$."
  },
  {
    "id": "TOAN9_C4_013",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Cho tam giác vuông có tỉ số hai cạnh góc vuông là $3:4$, diện tích là $24\\text{ cm}^2$. Chiều cao ứng với cạnh huyền là:",
    "options": [
      "A. $4,8$ cm",
      "B. $2,4$ cm",
      "C. $5$ cm",
      "D. $10$ cm"
    ],
    "correctAnswer": 0,
    "explanation": "Hai cạnh là $3x, 4x$. Diện tích $S = \\frac{1}{2}(3x)(4x) = 6x^2 = 24 \\Rightarrow x=2$. Cạnh là $6, 8 \\Rightarrow$ Huyền là $10$. Đường cao $h = \\frac{6 \\cdot 8}{10} = 4,8$ cm."
  },
  {
    "id": "TOAN9_C4_014",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Máy bay đang ở độ cao $5000$ m. Để hạ cánh an toàn, máy bay cần bắt đầu hạ với góc $5^\\circ$. Quãng đường bay trên không (theo đường chéo) để hạ cánh là:",
    "options": [
      "A. $\\frac{5000}{\\sin 5^\\circ}$",
      "B. $5000 \\cdot \\sin 5^\\circ$",
      "C. $\\frac{5000}{\\tan 5^\\circ}$",
      "D. $5000 \\cdot \\tan 5^\\circ$"
    ],
    "correctAnswer": 0,
    "explanation": "Đường chéo là cạnh huyền. Độ cao là cạnh đối góc $5^\\circ$. Huyền = $\\frac{\\text{Đối}}{\\sin \\alpha} = \\frac{5000}{\\sin 5^\\circ}$."
  },
  {
    "id": "TOAN9_C4_015",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Rút gọn biểu thức $\\cos^4 \\alpha - \\sin^4 \\alpha + 2\\sin^2 \\alpha$ ta được:",
    "options": [
      "A. $1$",
      "B. $0$",
      "C. $\\sin^2 \\alpha$",
      "D. $2\\cos^2 \\alpha$"
    ],
    "correctAnswer": 0,
    "explanation": "$(\\cos^2 \\alpha - \\sin^2 \\alpha)(\\cos^2 \\alpha + \\sin^2 \\alpha) + 2\\sin^2 \\alpha = \\cos^2 \\alpha - \\sin^2 \\alpha + 2\\sin^2 \\alpha = \\cos^2 \\alpha + \\sin^2 \\alpha = 1$."
  },
  {
    "id": "TOAN9_C4_016",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Tàu ngầm đang lặn ở độ sâu $200$ m. Tàu muốn nổi lên mặt nước theo đường chéo tạo góc $15^\\circ$ với mặt nước. Quãng đường tàu ngầm phải di chuyển (làm tròn đến mét) là:",
    "imageUrl": "/images/toan9/c4_cau16_tau_ngam_noi.svg",
    "options": [
      "A. $773$ m",
      "B. $207$ m",
      "C. $746$ m",
      "D. $800$ m"
    ],
    "correctAnswer": 0,
    "explanation": "Độ sâu là cạnh đối. Quãng đường $s = \\frac{200}{\\sin 15^\\circ} \\approx \\frac{200}{0,2588} \\approx 772,7 \\approx 773$ m."
  },
  {
    "id": "TOAN9_C4_017",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Biết $\\sin \\alpha = \\frac{\\sqrt{2}}{2}$, tam giác vuông đó là:",
    "options": [
      "A. Tam giác vuông cân",
      "B. Tam giác đều",
      "C. Tam giác nửa đều",
      "D. Tam giác thường"
    ],
    "correctAnswer": 0,
    "explanation": "$\\alpha = 45^\\circ \\Rightarrow$ Tam giác vuông cân."
  },
  {
    "id": "TOAN9_C4_018",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Hệ thức $\\tan \\alpha \\cdot \\cot \\alpha = 1$ đúng khi:",
    "options": [
      "A. $\\alpha$ là góc nhọn bất kỳ",
      "B. $\\alpha$ là góc tù",
      "C. $\\alpha = 90^\\circ$",
      "D. $\\alpha = 0^\\circ$"
    ],
    "correctAnswer": 0,
    "explanation": "Định nghĩa lớp 9 chỉ áp dụng cho góc nhọn."
  },
  {
    "id": "TOAN9_C4_019",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Giá trị của biểu thức $1 - \\sin^2 25^\\circ - \\sin^2 65^\\circ$ là:",
    "options": [
      "A. $0$",
      "B. $1$",
      "C. $-1$",
      "D. $2$"
    ],
    "correctAnswer": 0,
    "explanation": "$1 - (\\sin^2 25^\\circ + \\cos^2 25^\\circ) = 1 - 1 = 0$."
  },
  {
    "id": "TOAN9_C4_020",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "multiple_choice_1",
    "question": "Cho $\\cos \\alpha = \\frac{4}{5}$. Khi đó $\\tan \\alpha$ bằng:",
    "options": [
      "A. $\\frac{3}{4}$",
      "B. $\\frac{4}{3}$",
      "C. $\\frac{3}{5}$",
      "D. $\\frac{5}{4}$"
    ],
    "correctAnswer": 0,
    "explanation": "Kề = 4, Huyền = 5 $\\Rightarrow$ Đối = 3. $\\tan \\alpha = \\frac{\\text{Đối}}{\\text{Kề}} = \\frac{3}{4}$."
  },
  {
    "id": "TOAN9_C4_021",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Trong một tam giác vuông, $\\sin$ của một góc nhọn luôn bằng $\\cos$ của góc nhọn còn lại.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Hai góc nhọn trong tam giác vuông phụ nhau, nên $\\sin$ góc này bằng $\\cos$ góc kia."
  },
  {
    "id": "TOAN9_C4_022",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Nếu tam giác $ABC$ vuông tại $A$ thì $BC = \\frac{AB}{\\cos B}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\cos B = \\frac{AB}{BC} \\Rightarrow BC = \\frac{AB}{\\cos B}$."
  },
  {
    "id": "TOAN9_C4_023",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: $\\sin^2 45^\\circ + \\cos^2 60^\\circ = 1$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Góc phải giống nhau thì $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$ mới đúng. Ở đây $(\\frac{\\sqrt{2}}{2})^2 + (\\frac{1}{2})^2 = 0,5 + 0,25 = 0,75 \\neq 1$."
  },
  {
    "id": "TOAN9_C4_024",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Một cầu trượt có chiều cao $2$ m, mặt nghiêng $30^\\circ$. Chiều dài mặt trượt là $4$ m.",
    "imageUrl": "/images/toan9/c4_cau24_cau_truot.svg",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Mặt trượt là cạnh huyền. $l = \\frac{2}{\\sin 30^\\circ} = \\frac{2}{0,5} = 4$ m."
  },
  {
    "id": "TOAN9_C4_025",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Biết $\\tan \\alpha = 1$, ta có thể kết luận $\\alpha = 45^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tam giác có 2 cạnh góc vuông bằng nhau là tam giác vuông cân."
  },
  {
    "id": "TOAN9_C4_026",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Nếu $\\sin \\alpha = 0,6$ thì $\\tan \\alpha = 0,75$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\cos \\alpha = 0,8 \\Rightarrow \\tan \\alpha = \\frac{0,6}{0,8} = 0,75$."
  },
  {
    "id": "TOAN9_C4_027",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Trong tam giác vuông, cạnh góc vuông luôn bằng cạnh huyền nhân với $\\tan$ của góc đối diện.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Cạnh góc vuông = Cạnh huyền $\\times \\sin$ (không phải $\\tan$). $\\tan$ dùng với cạnh góc vuông kia."
  },
  {
    "id": "TOAN9_C4_028",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Một chiếc diều cao $h$, dây diều dài $50$ m, góc nâng $45^\\circ$. Khi đó $h = 50$ m.",
    "imageUrl": "/images/toan9/c4_cau28_chiec_dieu.svg",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "$h = 50 \\cdot \\sin 45^\\circ = 25\\sqrt{2} \\approx 35,3$ m. $h$ không thể bằng dây diều (cạnh huyền)."
  },
  {
    "id": "TOAN9_C4_029",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Giá trị của $\\frac{\\sin 30^\\circ}{\\cos 30^\\circ} = \\cot 30^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Bằng $\\tan 30^\\circ$, không phải $\\cot$."
  },
  {
    "id": "TOAN9_C4_030",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "true_false",
    "question": "Mệnh đề: Khi góc $\\alpha$ tăng từ $0^\\circ$ đến $90^\\circ$ thì $\\cos \\alpha$ giảm dần từ 1 về 0.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tính chất của hàm cosin trên $(0^\\circ, 90^\\circ)$."
  },
  {
    "id": "TOAN9_C4_031",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Biết chu vi tam giác vuông là $24$, tỉ số hai cạnh góc vuông là $3:4$. Cạnh huyền bằng $10$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Cạnh $3x, 4x$, huyền $5x$. Chu vi $= 12x = 24 \\Rightarrow x=2 \\Rightarrow$ Huyền $= 10$."
  },
  {
    "id": "TOAN9_C4_032",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Nếu $\\cos \\alpha = \\sin \\alpha$ thì giá trị của $\\tan \\alpha$ là 1.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "$\\tan \\alpha = \\frac{\\sin \\alpha}{\\cos \\alpha} = 1$."
  },
  {
    "id": "TOAN9_C4_033",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Một người đứng ngắm một tòa tháp với góc nâng $60^\\circ$. Nếu người đó bước lùi lại xa tháp hơn, góc nâng sẽ lớn hơn $60^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Bước lùi lại (cạnh kề dài ra) thì góc nâng sẽ nhỏ đi."
  },
  {
    "id": "TOAN9_C4_034",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Tàu ngầm lặn tạo góc $20^\\circ$. Độ sâu $h$ và quãng đường lặn $s$ liên hệ bởi $h = s \\cdot \\sin 20^\\circ$.",
    "imageUrl": "/images/toan9/c4_cau16_tau_ngam_noi.svg",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Độ sâu là cạnh đối, quãng đường là cạnh huyền. $\\sin 20^\\circ = \\frac{h}{s}$."
  },
  {
    "id": "TOAN9_C4_035",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: $\\tan 1^\\circ \\cdot \\tan 2^\\circ \\cdots \\tan 89^\\circ = 1$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Các cặp $\\tan \\alpha \\cdot \\tan(90^\\circ-\\alpha) = \\tan \\alpha \\cdot \\cot \\alpha = 1$. Ở giữa còn $\\tan 45^\\circ = 1$."
  },
  {
    "id": "TOAN9_C4_036",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Giải tam giác vuông khi biết cạnh huyền và một cạnh góc vuông là không thể, bắt buộc phải biết một góc nhọn.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Biết 2 cạnh là giải được (dùng Pythagore tìm cạnh thứ 3, dùng tỉ số lượng giác tìm góc)."
  },
  {
    "id": "TOAN9_C4_037",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Cầu dốc $10\\%$, tức là $\\tan \\alpha = 0,1$. Góc nghiêng $\\alpha$ xấp xỉ $5,7^\\circ$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Bấm máy tính $\\arctan(0,1) \\approx 5,71^\\circ$."
  },
  {
    "id": "TOAN9_C4_038",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Biết $\\sin \\alpha = 0,8$. Tam giác vuông có cạnh huyền $15$ thì cạnh góc vuông đối diện góc $\\alpha$ là $12$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Đối = Huyền $\\times \\sin \\alpha = 15 \\cdot 0,8 = 12$."
  },
  {
    "id": "TOAN9_C4_039",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Hệ thức $\\sin^2 \\alpha - \\cos^2 \\alpha = 1$ là luôn đúng.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 1,
    "explanation": "Phải là dấu $+$, tức là $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$."
  },
  {
    "id": "TOAN9_C4_040",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "true_false",
    "question": "Mệnh đề: Tam giác vuông cân có tỉ số cạnh góc vuông và cạnh huyền là $\\frac{\\sqrt{2}}{2}$.",
    "options": [
      "Đúng",
      "Sai"
    ],
    "correctAnswer": 0,
    "explanation": "Tam giác vuông cân có góc nhọn $45^\\circ$, tỉ số cạnh góc vuông / cạnh huyền là $\\sin 45^\\circ = \\frac{\\sqrt{2}}{2}$."
  },
  {
    "id": "TOAN9_C4_041",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Cho tam giác vuông, cạnh huyền bằng $20$, góc nhọn bằng $30^\\circ$. Cạnh góc vuông đối diện góc $30^\\circ$ dài ....",
    "options": [],
    "correctAnswer": "10",
    "explanation": "$x = 20 \\cdot \\sin 30^\\circ = 20 \\cdot 0,5 = 10$."
  },
  {
    "id": "TOAN9_C4_042",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tính chiều cao cái cây ($h$), biết bóng dài $8$ m và góc tạo bởi tia nắng mặt trời là $45^\\circ$. ....",
    "imageUrl": "/images/toan9/c4_cau42_cay_bong_45.svg",
    "options": [],
    "correctAnswer": "8",
    "explanation": "$h = 8 \\cdot \\tan 45^\\circ = 8 \\cdot 1 = 8$ m."
  },
  {
    "id": "TOAN9_C4_043",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tính $P = \\tan 45^\\circ + \\sin 30^\\circ$. Kết quả là ....",
    "options": [],
    "correctAnswer": "1.5",
    "explanation": "$1 + 0,5 = 1,5$."
  },
  {
    "id": "TOAN9_C4_044",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Biết $\\cos \\alpha = 0,5$. Số đo góc $\\alpha$ (độ) bằng ....",
    "options": [],
    "correctAnswer": "60",
    "explanation": "$\\cos 60^\\circ = 0,5$."
  },
  {
    "id": "TOAN9_C4_045",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Cho tam giác vuông, hai cạnh góc vuông là $3$ và $4$. Cạnh huyền dài ....",
    "options": [],
    "correctAnswer": "5",
    "explanation": "$\\sqrt{3^2 + 4^2} = 5$."
  },
  {
    "id": "TOAN9_C4_046",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tính $\\sin^2 15^\\circ + \\cos^2 15^\\circ$. Kết quả là ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "Theo hằng đẳng thức lượng giác cơ bản."
  },
  {
    "id": "TOAN9_C4_047",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Thang dài $4$ m tựa vào tường. Khoảng cách chân thang đến tường là $2$ m. Tính $\\cos \\alpha$ của góc tạo bởi thang và mặt đất. ....",
    "imageUrl": "/images/toan9/b11_thang_dua_tuong_65.svg",
    "options": [],
    "correctAnswer": "0.5",
    "explanation": "$\\cos \\alpha = \\frac{\\text{kề}}{\\text{huyền}} = \\frac{2}{4} = 0,5$."
  },
  {
    "id": "TOAN9_C4_048",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Giá trị của biểu thức $\\tan 60^\\circ \\cdot \\cot 60^\\circ$ bằng ....",
    "options": [],
    "correctAnswer": "1",
    "explanation": "Tích của tan và cot của cùng một góc luôn bằng 1."
  },
  {
    "id": "TOAN9_C4_049",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Biết $\\sin \\alpha = 0,8$. Giá trị $\\cos \\alpha$ bằng ....",
    "options": [],
    "correctAnswer": "0.6",
    "explanation": "$\\cos \\alpha = \\sqrt{1 - 0,8^2} = 0,6$."
  },
  {
    "id": "TOAN9_C4_050",
    "grade": 9,
    "chapter": 4,
    "level": "Nhận biết",
    "type": "short_answer",
    "question": "Tam giác vuông có cạnh huyền $10$, cạnh kề góc $\\alpha$ là $6$. $\\cos \\alpha$ bằng ....",
    "options": [],
    "correctAnswer": "0.6",
    "explanation": "$\\cos \\alpha = \\frac{6}{10} = 0,6$."
  },
  {
    "id": "TOAN9_C4_051",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Một chiếc diều có chiều dài dây là $100$ m, góc tạo bởi dây diều và phương ngang là $30^\\circ$. Độ cao của diều (m) là ....",
    "options": [],
    "correctAnswer": "50",
    "explanation": "$h = 100 \\cdot \\sin 30^\\circ = 50$ m."
  },
  {
    "id": "TOAN9_C4_052",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Tàu ngầm lặn với góc $30^\\circ$ so với mặt nước. Đi được quãng đường $200$ m theo phương chéo. Độ sâu tàu đạt được (m) là ....",
    "imageUrl": "/images/toan9/c4_cau16_tau_ngam_noi.svg",
    "options": [],
    "correctAnswer": "100",
    "explanation": "$h = 200 \\cdot \\sin 30^\\circ = 100$ m."
  },
  {
    "id": "TOAN9_C4_053",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Tính $M = \\sin^2 10^\\circ + \\sin^2 80^\\circ + 5$. Kết quả là ....",
    "options": [],
    "correctAnswer": "6",
    "explanation": "$\\sin^2 80^\\circ = \\cos^2 10^\\circ \\Rightarrow \\sin^2 10^\\circ + \\cos^2 10^\\circ = 1$. $M = 1 + 5 = 6$."
  },
  {
    "id": "TOAN9_C4_054",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Cột cờ cao $10$ m, góc tia nắng $45^\\circ$. Chiều dài bóng của cột cờ trên mặt đất (m) là ....",
    "options": [],
    "correctAnswer": "10",
    "explanation": "$x = \\frac{10}{\\tan 45^\\circ} = \\frac{10}{1} = 10$ m."
  },
  {
    "id": "TOAN9_C4_055",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Biết $\\tan \\alpha = \\frac{3}{4}$, $\\cos \\alpha = 0,8$. Khi đó $\\sin \\alpha$ bằng ....",
    "options": [],
    "correctAnswer": "0.6",
    "explanation": "$\\sin \\alpha = \\tan \\alpha \\cdot \\cos \\alpha = \\frac{3}{4} \\cdot 0,8 = 0,6$."
  },
  {
    "id": "TOAN9_C4_056",
    "grade": 9,
    "chapter": 4,
    "level": "Thông hiểu",
    "type": "short_answer",
    "question": "Một chiếc đò qua sông rộng $100$ m, bị dòng nước đẩy xiên góc $60^\\circ$ so với bờ sông. Chiều dài đường đò đi (m) (kết quả làm tròn số nguyên) là ....",
    "options": [],
    "correctAnswer": "115",
    "explanation": "Khoảng cách $= \\frac{100}{\\sin 60^\\circ} \\approx 115,47 \\approx 115$ m."
  },
  {
    "id": "TOAN9_C4_057",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Tại Trung tâm Toán Khôi Nguyên, từ cửa sổ $A$ cao $10$ m, thầy Toàn nhìn xuống gốc cây $B$ góc hạ $45^\\circ$. Khoảng cách từ chân tường $H$ đến gốc cây $B$ (m) là ....",
    "imageUrl": "/images/toan9/c4_cau57_cua_so_nhin_cay.svg",
    "options": [],
    "correctAnswer": "10",
    "explanation": "Góc tạo bởi tia nhìn và chân tường là góc vuông, tam giác vuông cân $\\Rightarrow x = 10$ m."
  },
  {
    "id": "TOAN9_C4_058",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Cho $\\tan \\alpha = 1,5$. Giá trị của $A = \\frac{\\sin \\alpha + \\cos \\alpha}{\\sin \\alpha - \\cos \\alpha}$ là ....",
    "options": [],
    "correctAnswer": "5",
    "explanation": "Chia cả tử và mẫu cho $\\cos \\alpha$: $A = \\frac{\\tan \\alpha + 1}{\\tan \\alpha - 1} = \\frac{1,5 + 1}{1,5 - 1} = \\frac{2,5}{0,5} = 5$."
  },
  {
    "id": "TOAN9_C4_059",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Hai điểm $A, B$ cùng nhìn đỉnh tháp cao $50$ m các góc nâng lần lượt là $45^\\circ$ và $30^\\circ$. $A, B$ thẳng hàng với chân tháp và nằm cùng một phía. Khoảng cách $AB$ (m) là (lấy $50\\sqrt{3} \\approx 86,6$) ....",
    "options": [],
    "correctAnswer": "36.6",
    "explanation": "Chân tháp đến B: $50\\sqrt{3}$. Chân tháp đến A: $50$. $AB = 50\\sqrt{3} - 50 \\approx 86,6 - 50 = 36,6$ m."
  },
  {
    "id": "TOAN9_C4_060",
    "grade": 9,
    "chapter": 4,
    "level": "Vận dụng",
    "type": "short_answer",
    "question": "Một con dốc nghiêng $10\\%$, tức là $\\tan \\alpha = 0,1$. Nếu đi lên cao được $10$ m theo phương đứng thì quãng đường di chuyển theo phương ngang (m) là ....",
    "options": [],
    "correctAnswer": "100",
    "explanation": "$\\tan \\alpha = \\frac{\\text{cao}}{\\text{ngang}} \\Rightarrow 0,1 = \\frac{10}{x} \\Rightarrow x = 100$ m."
  }
];
