export function sortSchoolClasses(a, b, sortBy) {
  const collator = new Intl.Collator("he");
  switch (sortBy) {
    case 0: // מיון לפי שם כיתה בסדר עולה
      return collator.compare(a.className, b.className);
    case 1: // מיון לפי שם כיתה בסדר יורד
      return collator.compare(b.className, a.className);
    case 2: // מיון לפי שם מורה בסדר עולה
      return collator.compare(a.teacher, b.teacher);
    case 3: // מיון לפי שם מורה בסדר יורד
      return collator.compare(b.teacher, a.teacher);
    default:
      return 0;
  }
}
// export function sortSchoolClasses(a, b, sortBy) {
//   switch (sortBy) {
//     case 0: {
//       if (a.title < b.title) {
//         return -1;
//       }
//       if (a.title > b.title) {
//         return 1;
//       }
//     }
//     case 1: {
//       if (a.title < b.title) {
//         return 1;
//       }
//       if (a.title > b.title) {
//         return -1;
//       }
//     }
//     case 2: {
//       if (a.price < b.price) {
//         return -1;
//       }
//       if (a.price > b.price) {
//         return 1;
//       }
//     }
//     default: {
//       if (a.price < b.price) {
//         return 1;
//       }
//       if (a.price > b.price) {
//         return -1;
//       }
//     }
//   }
// }
