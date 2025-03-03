import { useEffect, useRef, useState } from "react";

export default function DropDownSelectMultiple({
  onChange = (selectedValues) => {},
  options = [],
  defaultSelected = ["Any Model"],
  additionalParentClass = "",
}) {
  const selectRef = useRef();
  const optionsRef = useRef();
  const [selectedValues, setSelectedValues] = useState(defaultSelected);

  const toggleDropdown = () => {
    selectRef.current.classList.toggle("open");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!selectRef.current.contains(event.target)) {
        selectRef.current.classList.remove("open");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // **Sync state with defaultSelected when it changes (e.g., on filter reset)**
  useEffect(() => {
    setSelectedValues(defaultSelected);
  }, [defaultSelected]);

  const handleOptionClick = (option) => {
    let newSelectedValues;
    if (selectedValues.includes(option)) {
      newSelectedValues = selectedValues.filter((item) => item !== option);
    } else {
      newSelectedValues = [...selectedValues, option];
    }
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  return (
    <div className={`nice-select ${additionalParentClass}`} ref={selectRef}>
      <span  style={{overflow:"hidden"}} className="current" onClick={toggleDropdown}>
        {selectedValues.length > 0 ? selectedValues.join(", ") : "Any Model"}
      </span>
      <ul className="list" ref={optionsRef}>
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleOptionClick(option)}
            className={`option ${selectedValues.includes(option) ? "selected" : ""}`}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
}
