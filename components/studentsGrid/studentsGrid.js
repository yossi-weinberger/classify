"use client";
import { nanoid } from "nanoid";
import Link from "next/link";
import "./studentsGrid.css";
import { useState } from "react";
import { Sort_search } from "@/components/sort-search/sort-search";

export default function StudentsGrid({ students, classInfo }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(0);

  const studentsToShow = Array.isArray(students)
    ? students
        .filter(
          (student) =>
            student?.firstName?.toLowerCase().includes(search.toLowerCase()) ||
            student?.lastName?.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => sortStudents(a, b, sortBy))
        .map((student) => (
          <GridItem key={nanoid()} item={student} classInfo={classInfo} />
        ))
    : [];

  return (
    <div className="grid-container">
      <h1>תלמידים בכיתה {classInfo.className}</h1>
      <Sort_search
        sortBy={sortBy}
        setSortBy={setSortBy}
        setSearch={setSearch}
      />
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
          <p>תאריך לידה: {item.dateOfBirth}</p>
          <div className="read-more">
            <button>פרטים נוספים</button>
          </div>
        </div>
      </div>
    </Link>
  );
}
