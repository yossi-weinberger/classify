import "./sort-search.css";
import Link from "next/link";

export function Sort_search({ sortBy, setSortBy, setSearch, pageType }) {
  return (
    <div className="toolbar">
      {pageType === "allClasses" && (
        <Link href={`/add-class`}>
          <button className="toolbar-element add-new">הוספת כיתה חדשה</button>
        </Link>
      )}
      {pageType === "specificClass" && (
        <>
          <Link href={`/add-student`}>
            <button className="toolbar-element add-new">הוספת תלמיד חדש</button>
          </Link>
          <Link href={`/teacher-form`}>
            <button className="toolbar-element add-new">
              דיווח התקדמות תלמיד
            </button>
          </Link>
        </>
      )}
      <select
        className="toolbar-element select"
        value={sortBy}
        onChange={(e) => setSortBy(parseInt(e.target.value))}
      >
        <option value={0}>מיון א-ת</option>
        <option value={1}>מיון ת-א</option>
      </select>
      <input
        className="toolbar-element input"
        placeholder="חיפוש..."
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}
