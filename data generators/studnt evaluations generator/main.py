import csv
import random
import uuid
from datetime import datetime, timedelta

import json

def read_students_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        students = json.load(file)
    return students

# קריאת הנתונים מהקובץ
students = read_students_from_file('students.json')

def generate_score(base_score, year_factor, max_score=7):
    score = base_score + year_factor + random.randint(-1, 1)
    return max(1, min(max_score, int(score)))

def generate_evaluations(student):
    # בדיקה אם התלמיד בכיתה א' או ג'
    if student["class"] not in ["א", "ג"]:
        return []

    # הגדרת משתנים גלובליים
    global programs, disabilities, secondary_disabilities, schools, neighborhoods, comments, evaluators

    # אם המשתנים הגלובליים לא הוגדרו, נגדיר אותם כאן
    if 'programs' not in globals():
        programs = ["תגבור מתמטיקה", "קבוצת קריאה מתקדמת", "סדנת אמנות טיפולית", "תוכנית מנהיגות צעירה", "חוג רובוטיקה", "קבוצת כישורים חברתיים"]
    if 'disabilities' not in globals():
        disabilities = ["לקות למידה", "ADHD", "אוטיזם ברמה נמוכה", "חרדה"]
    if 'secondary_disabilities' not in globals():
        secondary_disabilities = ["קשיי קשב וריכוז", "דיסלקציה", "קשיי התנהגות"]
    if 'schools' not in globals():
        schools = ["בית ספר יסודי אופק", "בית ספר יסודי שקד", "בית ספר יסודי רימון", "בית ספר יסודי ברושים", "בית ספר יסודי כרמל"]
    if 'neighborhoods' not in globals():
        neighborhoods = ["צפון", "דרום", "מרכז", "מזרח", "מערב"]
    if 'comments' not in globals():
        comments = [
            "מתקדם באופן עקבי בכל התחומים",
            "זקוק לתמיכה נוספת בתחום החברתי",
            "מגלה יכולות מנהיגות",
            "משתתף באופן פעיל בכיתה",
            "מתקשה בעבודה קבוצתית",
            "מראה שיפור משמעותי במוטיבציה ללמידה"
        ]
    if 'evaluators' not in globals():
        evaluators = [
            {"name": "רחל כהן", "role": "מחנכת"},
            {"name": "משה לוי", "role": "יועץ חינוכי"},
            {"name": "דנה שרון", "role": "פסיכולוגית בית הספר"},
            {"name": "יוסי אברהם", "role": "מורה לחינוך מיוחד"},
            {"name": "מיכל דוד", "role": "מחנכת"}
        ]

    special_ed = random.random() < 0.6  # שינוי מ-0.2 ל-0.4, כלומר 40% סיכוי לחינוך מיוחד
    iep = special_ed and random.random() < 0.8  # 80% of special ed students have IEP
    main_disability = random.choice(disabilities) if special_ed else ""
    secondary_disability = random.choice(secondary_disabilities) if special_ed and random.random() < 0.5 else ""

    # מספר התוכניות שהתלמיד יקבל (בין 1 ל-3)
    num_programs = random.randint(1, 3)
    selected_programs = random.sample(programs, num_programs)

    current_programs = set(selected_programs)  # תחילת התוכנית כוללת את כל התוכניות שנבחרו מראש
    years_in_programs = 0

    evaluations = []
    for year in range(2021, 2025):
        evaluation_date = datetime(year, 9, 1) + timedelta(days=random.randint(0, 60))
        age_at_evaluation = year - int(student["dateOfBirth"][:4])

        # Update class
        student_class = chr(ord(student["class"]) + (year - 2021))

        # Update programs
        if selected_programs and random.random() < 0.6:  # 40% סיכוי להוסיף תוכנית בשנה
            new_program = selected_programs.pop()  # בחר תוכנית מהתוכניות שנבחרו מראש
            current_programs.add(new_program)
            years_in_programs += 1

        year_factor = (year - 2021) * 0.7  # פקטור שנתי לעלייה הדרגתית
        
        evaluation = {
            "id": str(uuid.uuid4()),
            "evaluation_date": evaluation_date.strftime("%Y-%m-%d %H:%M:%S"),
            "year": year,
            "phase": random.randint(1, 4),
            "student_idil": student["idil"],
            "first_name": student["firstName"],
            "last_name": student["lastName"],
            "gender": student["gender"],
            "date_of_birth": student["dateOfBirth"],
            "age_at_evaluation": age_at_evaluation,
            "class": student["class"],
            "school_name": random.choice(schools),
            "city": student["address"]["city"],
            "neighborhood": random.choice(neighborhoods),
            "special_education_status": str(special_ed).lower(),
            "iep_exists": str(iep).lower(),
            "main_disability": main_disability,
            "secondary_disability": secondary_disability,
            # "current_programs": list(current_programs) if current_programs else [],
            "current_programs": json.dumps(list(current_programs), ensure_ascii=False) if current_programs else '[]',
            "years_in_programs": years_in_programs,
            "socioeconomic_status": random.randint(1, 10),
            "number_of_siblings": random.randint(0, 4),
            "social_competence_1": generate_score(2, year_factor),
            "social_competence_2": generate_score(2, year_factor),
            "social_competence_3": generate_score(2, year_factor),
            "emotional_regulation_1": generate_score(2, year_factor),
            "emotional_regulation_2": generate_score(2, year_factor),
            "emotional_regulation_3": generate_score(2, year_factor),
            "learning_motivation_1": generate_score(2, year_factor),
            "learning_motivation_2": generate_score(2, year_factor),
            "learning_motivation_3": generate_score(2, year_factor),
            "cognitive_skills_1": generate_score(2, year_factor),
            "cognitive_skills_2": generate_score(2, year_factor),
            "cognitive_skills_3": generate_score(2, year_factor),
            "additional_comments": random.choice(comments),
            "evaluator_name": random.choice(evaluators)["name"],
            "evaluator_role": random.choice(evaluators)["role"],
            "full_name": f"{student['firstName']} {student['lastName']}"
        }
        evaluations.append(evaluation)
        # print(f"Current programs: {current_programs}")


    return evaluations


# Generate evaluations for all students
all_evaluations = []
for student in students:
    all_evaluations.extend(generate_evaluations(student))

# Write to CSV
with open('student_evaluations.csv', 'w', newline='', encoding='utf-8') as csvfile:
    fieldnames = all_evaluations[0].keys()
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    writer.writeheader()
    for evaluation in all_evaluations:
        writer.writerow(evaluation)

print("Evaluations generated and saved to student_evaluations.csv")