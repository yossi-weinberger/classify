"use client";

import { nanoid } from "nanoid";
import Link from "next/link";
import styles from "./GenericGrid.module.css";
import { useState, useEffect, useMemo } from "react";
import { useSortContext } from "@/providers/SortProvider";
import { Sort_search } from "@/components/sort-search/sort-search";
import Loading from "../loading/loading";

export default function GenericGrid({ items, type, classInfo }) {
  const { sortItems } = useSortContext();
  const [search, setSearch] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSearchField = (item) => {
    if (type === "students") {
      return `${item.firstName} ${item.lastName}`;
    } else if (type === "classes") {
      return item.className.toString();
    }
    return "";
  };

  const getSortField = () => (type === "students" ? "firstName" : "className");

  const itemsToShow = useMemo(() => {
    if (!isClient || !Array.isArray(items)) return [];

    return sortItems(
      items.filter((item) =>
        getSearchField(item)
          .toLowerCase()
          .includes((search || "").toLowerCase())
      ),
      getSortField()
    ).map((item) => (
      <GridItem key={nanoid()} item={item} type={type} classInfo={classInfo} />
    ));
  }, [isClient, items, search, type, classInfo, sortItems]);

  if (!isClient) {
    return <Loading />;
  }

  return (
    <div className={styles.gridContainer}>
      {type === "students" && classInfo && (
        <h1>תלמידים בכיתה {classInfo.className}&apos;</h1>
      )}
      <Sort_search
        setSearch={setSearch}
        pageType={type === "students" ? "specificClass" : "allClasses"}
      />
      <div className={styles.grid}>
        {itemsToShow.length > 0 ? (
          itemsToShow
        ) : (
          <p>{type === "students" ? "לא נמצאו תלמידים" : "לא נמצאו כיתות"}</p>
        )}
      </div>
    </div>
  );
}

function GridItem({ item, type, classInfo }) {
  if (type === "students") {
    if (!item || !item._id || !item.firstName || !item.lastName) {
      return null;
    }

    return (
      <Link
        href={`/classes/${classInfo._id}/${item._id}`}
        className={styles.gridItem}
      >
        <div className={styles.imageContainer}>
          {item.img && (
            <img src={item.img} alt={`${item.firstName} ${item.lastName}`} />
          )}
        </div>
        <div className={styles.itemDetails}>
          <h2 className={styles.studentName}>
            {item.firstName} {item.lastName}
          </h2>
          <p className={styles.studentId}>ת.ז: {item.idil}</p>
          <div className={styles.readMore}>
            <button>תיק אישי</button>
          </div>
        </div>
      </Link>
    );
  } else if (type === "classes") {
    if (!item || !item._id) {
      return null;
    }

    return (
      <Link href={`/classes/${item._id}`} className={styles.gridItem}>
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
    );
  }

  return null;
}
