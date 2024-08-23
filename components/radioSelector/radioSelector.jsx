import React, { useState, useEffect } from "react";
import "./radioSelector.css";

function RadioSelector({ value, onChange, name }) {
  const [selectedValue, setSelectedValue] = useState(value || "1");

  useEffect(() => {
    setSelectedValue(value || "1");
  }, [value]);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="radio-input">
      {[1, 2, 3, 4, 5, 6, 7].map((num) => (
        <React.Fragment key={num}>
          <input
            type="radio"
            id={`${name}-${num}`}
            name={name}
            value={num.toString()}
            checked={selectedValue === num.toString()}
            onChange={handleChange}
          />
          <label htmlFor={`${name}-${num}`}>
            <span>{num}</span>
          </label>
        </React.Fragment>
      ))}
      <span
        className="selection"
        style={{
          transform: `translateX(calc(var(--container_width) * ${
            parseInt(selectedValue) - 1
          }/7))`,
        }}
      ></span>
    </div>
  );
}

export default RadioSelector;
