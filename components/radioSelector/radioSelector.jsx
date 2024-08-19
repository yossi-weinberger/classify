import React, { useState } from "react";
import "./RadioSelector.css";

function RadioSelector({ value, onChange }) {
  const [selectedValue, setSelectedValue] = useState(value || "1");

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="radio-input">
      {[1, 2, 3, 4, 5].map((num) => (
        <label key={num}>
          <input
            type="radio"
            name="value-radio"
            value={num.toString()}
            checked={selectedValue === num.toString()}
            onChange={handleChange}
          />
          <span>{num}</span>
        </label>
      ))}
      <span
        className="selection"
        style={{
          transform: `translateX(calc(var(--container_width) * ${
            parseInt(selectedValue) - 1
          }/5))`,
        }}
      ></span>
    </div>
  );
}

export default RadioSelector;

// import React, { useState } from "react";
// import "./RadioSelector.css";

// function RadioSelector({ value, onChange }) {
//   const [selectedValue, setSelectedValue] = useState(value || "1");

//   const handleChange = (event) => {
//     const newValue = event.target.value;
//     setSelectedValue(newValue);
//     onChange(newValue);
//   };

//   return (
//     <div className="radio-input">
//       {[1, 2, 3, 4, 5].map((num) => (
//         <label key={num}>
//           <input
//             type="radio"
//             name="value-radio"
//             value={num.toString()}
//             checked={selectedValue === num.toString()}
//             onChange={handleChange}
//           />
//           <span>{num}</span>
//         </label>
//       ))}
//       <span
//         className="selection"
//         style={{
//           transform: `translateX(calc(var(--container_width) * ${
//             parseInt(selectedValue) - 1
//           }/5))`,
//         }}
//       ></span>
//     </div>
//   );
// }

// export default RadioSelector;
