import SchoolClassesGrid from "@/components/SchoolClassesGrid/SchoolClassesGrid";
import GenericGrid from "@/components/GenericGrid/GenericGrid";

import { getAllSchoolClasses } from "@/functions/api";
import Image from "next/image";

export default async function SchoolClassesPage() {
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PHASE) {
    return null;
  }

  const SchoolClasses = await getAllSchoolClasses();
  return (
    <div>
      <GenericGrid items={SchoolClasses.data} type="classes" />
    </div>
  );
}
