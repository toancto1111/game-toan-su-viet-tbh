import re
import json

with open("scratch/parsed_questions_b3.ts", "r", encoding="utf-8") as f:
    parsed_ts = f.read()

arr_str = parsed_ts.split(" = ", 1)[1].strip()
if arr_str.endswith(";"):
    arr_str = arr_str[:-1]

new_questions = json.loads(arr_str)

target_file = "toan8_chuong1_questions.ts"
with open(target_file, "r", encoding="utf-8") as f:
    content = f.read()

idx = content.rfind("]")
if idx != -1:
    before = content[:idx].rstrip()
    
    if not before.endswith("["):
        before += ",\n"
        
    new_str = json.dumps(new_questions, indent=2, ensure_ascii=False)
    new_str = new_str[1:-1].strip()
    
    final_content = before + "  " + new_str + "\n];\n"
    
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(final_content)
    print("Successfully appended 50 questions to", target_file)
else:
    print("Failed to find ]")
