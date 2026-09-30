import re
import json

with open("scratch/questions_b4.tex", "r", encoding="utf-8") as f:
    text = f.read()

questions = []
current_type = None

# Part 1: MCQ (4 options)
part1 = re.search(r'\\section\*{.*?PHẦN I(.*?)(\\section\*|$)', text, re.DOTALL)
if part1:
    content = part1.group(1)
    
    blocks = re.split(r'\\cauthu\{(\d+)\}(\[\*\])?', content)
    for i in range(1, len(blocks), 3):
        q_num = blocks[i]
        is_star = blocks[i+1] is not None
        q_body = blocks[i+2]
        
        # extract question text
        q_text_match = re.search(r'^(.*?)\\begin\{enumerate\}', q_body, re.DOTALL)
        if not q_text_match: continue
        q_text = q_text_match.group(1).strip()
        
        # extract options
        opts_match = re.search(r'\\begin\{enumerate\}.*?(.*)\\end\{enumerate\}', q_body, re.DOTALL)
        opts = []
        if opts_match:
            opts_raw = opts_match.group(1)
            opts = re.findall(r'\\item\s*(.*?)(?=\\item|$)', opts_raw, re.DOTALL)
            opts = [o.strip() for o in opts]
        
        # extract answer
        ans_match = re.search(r'\\dapan\{Đáp án:\s*([A-D])\}(.*)$', q_body, re.DOTALL)
        correct_ans = 0
        explanation = ""
        if ans_match:
            ans_char = ans_match.group(1)
            correct_ans = ord(ans_char) - ord('A')
            explanation = ans_match.group(2).strip()
            if explanation.startswith("—") or explanation.startswith("-"):
                explanation = explanation[1:].strip()
        
        q_obj = {
            "id": f"toan8_c1_b4_new_{q_num}",
            "grade": 8,
            "chapter": 1,
            "lesson": 4,
            "level": "van-dung" if is_star else "thong-hieu",
            "type": "multiple_choice_1",
            "question": q_text,
            "options": opts,
            "correctAnswer": correct_ans,
            "explanation": explanation
        }
        questions.append(q_obj)

# Part 2: True/False
part2 = re.search(r'\\section\*{.*?PHẦN II(.*?)(\\end\{document\}|$)', text, re.DOTALL)
if part2:
    content = part2.group(1)
    
    blocks = re.split(r'\\cauthu\{(\d+[a-d]?)\}(\[\*\])?', content)
    for i in range(1, len(blocks), 3):
        q_num = blocks[i]
        is_star = blocks[i+1] is not None
        q_body = blocks[i+2]
        
        q_text_match = re.search(r'^(.*?)\\begin\{center\}', q_body, re.DOTALL)
        q_text = q_text_match.group(1).strip() if q_text_match else q_body.split("\\begin{center}")[0].strip()
        
        ans_match = re.search(r'\\dapan\{Đáp án:\s*(ĐÚNG|SAI)\}(.*)$', q_body, re.DOTALL)
        correct_ans = True
        explanation = ""
        if ans_match:
            ans_str = ans_match.group(1)
            correct_ans = (ans_str == 'ĐÚNG')
            explanation = ans_match.group(2).strip()
            if explanation.startswith("—") or explanation.startswith("-"):
                explanation = explanation[1:].strip()
                
        q_obj = {
            "id": f"toan8_c1_b4_new_{q_num}",
            "grade": 8,
            "chapter": 1,
            "lesson": 4,
            "level": "van-dung" if is_star else "thong-hieu",
            "type": "true_false",
            "question": q_text,
            "correctAnswer": correct_ans,
            "explanation": explanation
        }
        questions.append(q_obj)


out_str = "export const TOAN_8_CHUONG1_QUESTIONS_B4: Question[] = " + json.dumps(questions, indent=2, ensure_ascii=False) + ";"

with open("scratch/parsed_questions_b4.ts", "w", encoding="utf-8") as f:
    f.write(out_str)

print("Parsed", len(questions), "questions!")
