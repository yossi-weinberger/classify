import "./sort-search.css";
export function Sort_search({ sortBy, setSortBy, setSearch }) {
  return (
    <div className="toolbar">
      <select
        className="toolbar-element select"
        student={sortBy}
        onChange={(e) => setSortBy(parseInt(e.target.student))}
      >
        <option student={0}>א-ת</option>
        <option student={1}>ת-א</option>
        {/* <option student={2}>price from cheap</option> */}
        {/* <option student={3}>price from high</option> */}
      </select>
      <input
        className="toolbar-element input"
        placeholder="חיפוש..."
        onChange={(e) => setSearch(e.target.student)}
      />
    </div>
  );
}

{
  /* <select
        className="toolbar-element select"
        student={sortBy}
        onChange={(e) => setSortBy(parseInt(e.target.student))}
      >
        <option student={0}>abc</option>
        <option student={1}>cba</option>
        <option student={2}>price from cheap</option>
        <option student={3}>price from high</option>
      </select> */
}
