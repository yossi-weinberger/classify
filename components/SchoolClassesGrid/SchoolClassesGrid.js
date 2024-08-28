"use client";

import { nanoid } from "nanoid";
import Link from "next/link";
import styles from "./SchoolClassesGrid.module.css";
import { useState, useEffect } from "react";
import { useSortContext } from "@/providers/SortProvider";
import { Sort_search } from "@/components/sort-search/sort-search";
import Loading from "../loading/loading";

export default function SchoolClassesGrid({ SchoolClasses }) {
  const { sortItems } = useSortContext();
  const [search, setSearch] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const SchoolClassesToShow =
    isClient && Array.isArray(SchoolClasses?.data)
      ? sortItems(
          SchoolClasses.data.filter((classItem) =>
            classItem?.className
              ?.toString()
              .toLowerCase()
              .includes((search || "").toLowerCase())
          ),
          "className"
        ).map((classItem) => <GridItem key={nanoid()} item={classItem} />)
      : [];

  if (!isClient) {
    return <Loading />;
  }

  return (
    <div className={styles.gridContainer}>
      <Sort_search setSearch={setSearch} pageType="allClasses" />
      <div className={styles.grid}>
        {SchoolClassesToShow.length > 0 ? (
          SchoolClassesToShow
        ) : (
          <p>לא נמצאו כיתות</p>
        )}
      </div>
    </div>
  );
}

function GridItem({ item }) {
  return item && item._id ? (
    <div className={styles.gridItem}>
      <Link className="classLink" href={`/classes/${item._id}`}>
        <div className={styles.imageContainer}>
          {item.img && <img src={item.img} alt={item.className} />}
          <div className={styles.classLabel}>
            <span className={styles.className}>כיתה</span>
            <span className={styles.classNumber}>{item.className}</span>
          </div>
        </div>
        <div className={styles.itemDetails}>
          <p>מורה: {item.teacher}</p>
          <div className={styles.readMore}>
            <button>פרטים</button>
          </div>
        </div>
      </Link>
    </div>
  ) : null;
}
