export function sortSchoolClasses(a, b, sortBy) {
  const collator = new Intl.Collator("he");
  switch (sortBy) {
    case 0: // מיון לפי שם כיתה בסדר עולה
      return collator.compare(a.className, b.className);
    case 1: // מיון לפי שם כיתה בסדר יורד
      return collator.compare(b.className, a.className);
    // case 2: // מיון לפי שם מורה בסדר עולה
    //   return collator.compare(a.teacher, b.teacher);
    // case 3: // מיון לפי שם מורה בסדר יורד
    //   return collator.compare(b.teacher, a.teacher);
    default:
      return 0;
  }
}
