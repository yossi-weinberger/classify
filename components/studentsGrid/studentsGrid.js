"use client";
import { nanoid } from "nanoid";
import Link from "next/link";
import "./studentsGrid.css";
import { useState, useEffect } from "react";
import { useSortContext } from "@/providers/SortProvider";
import { Sort_search } from "@/components/sort-search/sort-search";

export default function StudentsGrid({ students, classInfo }) {
  const { sortItems } = useSortContext();
  const [search, setSearch] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const studentsToShow =
    isClient && Array.isArray(students)
      ? sortItems(
          students.filter(
            (student) =>
              (student?.firstName + " " + student?.lastName)
                .toLowerCase()
                .includes((search || "").toLowerCase())
          ),
          "firstName"
        ).map((student) => (
          <GridItem key={nanoid()} item={student} classInfo={classInfo} />
        ))
      : [];

  if (!isClient) {
    return <div className="loading">טוען...</div>;
  }

  return (
    <div className="grid-container">
      <h1>תלמידים בכיתה {classInfo.className}&apos;</h1>
      <Sort_search setSearch={setSearch} pageType="specificClass" />
      <div className="grid">
        {studentsToShow.length > 0 ? studentsToShow : <p>לא נמצאו תלמידים</p>}
      </div>
    </div>
  );
}

function GridItem({ item, classInfo }) {
  if (!item || !item._id || !item.firstName || !item.lastName) {
    return null;
  }

  return (
    <Link href={`/classes/${classInfo._id}/${item._id}`}>
      <div className="grid-item">
        {item.img && (
          <img src={item.img} alt={`${item.firstName} ${item.lastName}`} />
        )}
        <div>
          <h2>
            {item.firstName} {item.lastName}
          </h2>
          <p className="student-id">ת.ז: {item.idil}</p>
          <div className="read-more">
            <button>תיק אישי</button>
          </div>
        </div>
      </div>
    </Link>
  );
}