import SchoolClassesGrid from "@/components/SchoolClassesGrid/SchoolClassesGrid";
import GenericGrid from "@/components/GenericGrid/GenericGrid";

import { fetchSchoolClasses } from "@/app/actions";
import Image from "next/image";

export default async function SchoolClassesPage() {
  console.log("CI value in Docker:", process.env.CI);
  if (process.env.CI === "true") {
    console.log("Blocking classes display due to CI=true");
    return null;
  }

  const SchoolClasses = await fetchSchoolClasses();
  return (
    <div>
      <GenericGrid items={SchoolClasses.data} type="classes" />
    </div>
  );
}
