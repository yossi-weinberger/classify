import SchoolClassesGrid from "@/components/SchoolClassesGrid/SchoolClassesGrid";
import GenericGrid from "@/components/GenericGrid/GenericGrid";

import { getAllSchoolClasses } from "@/functions/api";
import Image from "next/image";

export default async function SchoolClassesPage() {
  console.log("CI value in Docker:", process.env.CI);
  if (process.env.CI === "true") {
    console.log("Blocking classes display due to CI=true");
    return null;
  }

  const SchoolClasses = await getAllSchoolClasses();
  return (
    <div>
      <GenericGrid items={SchoolClasses.data} type="classes" />
    </div>
  );
}
