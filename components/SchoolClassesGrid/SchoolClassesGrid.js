"use client";

import { nanoid } from "nanoid";
import Link from "next/link";
import "./SchoolClassesGrid.css";
import { useState } from "react";
import { sortSchoolClasses } from "@/functions/global_functions";
import { Sort_search } from "@/components/sort-search/sort-search";

export default function SchoolClassesGrid({ SchoolClasses }) {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState(0);

  const SchoolClassesToShow = Array.isArray(SchoolClasses?.data)
    ? SchoolClasses.data
        .filter((classItem) =>
          classItem?.className
            ?.trim()
            .toLowerCase()
            .includes((search || "").trim().toLowerCase())
        )
        .sort((a, b) => sortSchoolClasses(a, b, sortBy))
        .map((classItem) => <GridItem key={nanoid()} item={classItem} />)
    : [];

  return (
    <div className="grid-container">
      <Sort_search
        sortBy={sortBy}
        setSortBy={setSortBy}
        setSearch={setSearch}
      />

      <div className="grid">
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
    <Link href={`/classes/${item._id}`}>
      <div className="grid-item">
        {item.img && <img src={item.img} alt={item.className} />}
        <div>
          <h2>כיתה {item.className}</h2>
          <p>מורה: {item.teacher}</p>
          <div className="read-more">
            <button>פרטים</button>
          </div>
        </div>
      </div>
    </Link>
  ) : null;
}

// "use client";
// import { nanoid } from "nanoid";
// // import { speakersList } from "../../data/speakersLinks";
// import Link from "next/link";
// // import { SchoolClasses } from "../../screens/speakers";
// import "./SchoolClassesGrid.css";
// import { useState } from "react";
// import { sortSchoolClasses } from "@/functions/global_functions";
// import { Sort_search } from "@/components/sort-search/sort-search";
// // import { useLoadingContext } from "../../contexts/loadingContext.js";
// // import { CircularProgress } from "@mui/material";

// export default function SchoolClassesGrid({ SchoolClasses }) {
//   // console.log(SchoolClasses.data);
//   // State variables for the search input and the sort option
//   const [search, setSearch] = useState("");
//   const [sortBy, setSortBy] = useState(0);

//   // const SchoolClassesToShow = SchoolClasses.data
//   //   .filter((product) => product.title.includes(search)) // Filter SchoolClasses based on search
//   //   .sort((a, b) => sortSchoolClasses(a, b, sortBy)) // Sort SchoolClasses based on sort option
//   //   .map((product) => <GridItem key={nanoid()} item={product} />); // Map each product to a GridItem component

//   const SchoolClassesToShow = Array.isArray(SchoolClasses?.data)
//     ? SchoolClasses.data
//         .filter((class) => class?.className?.includes(search))
//         .sort((a, b) => sortSchoolClasses(a, b, sortBy))
//         .map((class) => <GridItem key={nanoid()} item={class} />)
//     : [];
//   return (
//     <div className="grid-container">
//       <Sort_search
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//         setSearch={setSearch}
//       />

//       <div className="grid">
//         {SchoolClassesToShow.length > 0 ? SchoolClassesToShow : <p>No SchoolClasses found</p>}
//       </div>
//     </div>
//   );
// }

// function GridItem({ item }) {
//   return item && item.className ? (
//     <Link href={`/SchoolClasses/${encodeURIComponent(item.className)}`}>
//       <div className="grid-item">
//         <img src={item.img} />
//         <div>
//           <h2>{item.className}</h2>
//           <p>{item.teacher}</p>
//           {/* <p className="rtl">{item.desc}</p> */}

//           <div className="read-more">
//             <button>Read-more</button>
//           </div>
//         </div>
//       </div>
//     </Link>
//   ) : null;
// }
