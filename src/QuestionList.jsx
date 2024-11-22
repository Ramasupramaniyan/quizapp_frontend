import React from "react";

const QuestionList = ({ totalQuestions, currentQuestion, answeredQuestions }) => {
  return (
    <div className="p-4 m-1 border h-100 rounded">
      <h4 className="text-lg font-semibold">Quiz Questions List</h4>
      <ul className="h-100" style={{"listStyleType": "none"}}>
        {Array.from({ length: totalQuestions }, (_, index) => {
          const status = answeredQuestions[index + 1];
          const backgroundColor =
            status === "correct"
              ? "#28A745"
              : status === "incorrect"
              ? "#DC3545"
              : "white";

          return (
            <li
              key={index}
              className="py-2 px-3 m-1 border rounded"
              style={{
                backgroundColor,
                color: status ? "white" : "black",
                float:"left"
              }}
            >
              {`Q ${index + 1}`}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default QuestionList;
