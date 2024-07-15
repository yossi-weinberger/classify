"use client";
import { nanoid } from "nanoid";
import Link from "next/link";
import "./studentsGrid.css";
import { useState } from "react";
import { Sort_search } from "@/components/sort-search/sort-search";

function sortStudents(a, b, sortBy) {
  if (sortBy === 0) {
    // מיון א-ת
    return a.lastName.localeCompare(b.lastName, "he");
  } else if (sortBy === 1) {
    // מיון ת-א
    return b.lastName.localeCompare(a.lastName, "he");
  }
  return 0;
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
      <h1>תלמידים בכיתה {classInfo.className}&apos;</h1>
      <Sort_search
        sortBy={sortBy}
        setSortBy={setSortBy}
        setSearch={setSearch}
        pageType="specificClass"
      />
      <div className="grid">
        {studentsToShow.length > 0 ? studentsToShow : <p>לא נמצאו תלמידים</p>}
      </div>
    </div>
  );
}
