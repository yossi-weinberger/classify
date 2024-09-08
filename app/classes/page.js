import SchoolClassesGrid from "@/components/SchoolClassesGrid/SchoolClassesGrid";
import GenericGrid from "@/components/GenericGrid/GenericGrid";

import { getAllSchoolClasses } from "@/functions/api";
import Image from "next/image";

export default async function SchoolClassesPage() {
  const SchoolClasses = await getAllSchoolClasses();
  // console.log(SchoolClasses);

  return (
    <div>
      {/* <SchoolClassesGrid SchoolClasses={SchoolClasses} /> */}
      <GenericGrid items={SchoolClasses.data} type="classes" />
    </div>
  );
}
