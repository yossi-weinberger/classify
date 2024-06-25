import SchoolClassesGrid from "@/components/SchoolClassesGrid/SchoolClassesGrid";
import { getAllSchoolClasses } from "@/functions/apiCalls";
import Image from "next/image";

export default async function SchoolClassesPage() {
  const SchoolClasses = await getAllSchoolClasses();
  // console.log(SchoolClasses);

  return (
    <div>
      <SchoolClassesGrid SchoolClasses={SchoolClasses} />
    </div>
  );
}
