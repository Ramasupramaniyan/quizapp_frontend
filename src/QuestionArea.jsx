//question area
import React, { useState } from "react";

const QuestionArea = ({
  question,
  options,
  correctAnswer,
  selectedOption,
  onOptionSelect,
  isSubmitted,
}) => {
  const [hoveredOption, setHoveredOption] = useState(null);

  return (
    <div className="p-4 m-1 border rounded">
      <h4 className="text-xl font-semibold m-1">{question}</h4>
      {options.map((option, index) => {
        let backgroundColor = "white";
        if (isSubmitted) {
          if (option === correctAnswer) {
            backgroundColor = "#28A745";
          } else if (option === selectedOption) {
            backgroundColor = "#DC3545";
          }
        } else if (option === selectedOption) {
          backgroundColor = "#d1e7ff";
        } else if (option === hoveredOption) {
          backgroundColor = "#f1f1f1";
        }

        return (
          <button
            key={index}
            className="block w-100 text-left py-2 px-4 mb-2 border rounded"
            style={{
              backgroundColor,
              border: "1px solid gray",
              color: isSubmitted ? "white" : "black",
              pointerEvents: isSubmitted ? "none" : "auto",
              cursor: "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseEnter={() => setHoveredOption(option)}
            onMouseLeave={() => setHoveredOption(null)}
            onClick={() => onOptionSelect(option)}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default QuestionArea;
