export function sortSchoolClasses(a, b, sortBy) {
  switch (sortBy) {
    case 0: // מיון לפי שם כיתה בסדר עולה
      return a.className.localeCompare(b.className, "he");
    case 1: // מיון לפי שם כיתה בסדר יורד
      return b.className.localeCompare(a.className, "he");
    case 2: // מיון לפי שם מורה בסדר עולה
      return a.teacher.localeCompare(b.teacher, "he");
    case 3: // מיון לפי שם מורה בסדר יורד
      return b.teacher.localeCompare(a.teacher, "he");
    default:
      return 0;
  }
}
