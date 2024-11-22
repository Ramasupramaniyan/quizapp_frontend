import React, { useState } from "react";
import QuestionArea from "./QuestionArea";
import QuestionList from "./QuestionList";
import Navbar from "./navbar";
import { Navigate,useNavigate } from "react-router-dom";

const Quiz = () => {
  const userEmail = sessionStorage.getItem('email');
  const questions = [
    { id: 1, question: "What is the value of x in the equation 3x + 5 = 14?", options: ["2", "3", "5", "4"], correctAnswer: "3", difficulty: "easy", topic: "Algebra" },
    { id: 2, question: "Simplify: 4x + 2x - 3x", options: ["3x", "5x", "2x", "6x"], correctAnswer: "3x", difficulty: "easy", topic: "Algebra" },
    { id: 3, question: "Solve for x: 2x + 7 = 17", options: ["5", "3", "6", "4"], correctAnswer: "5", difficulty: "easy", topic: "Algebra" },
    
    { id: 4, question: "What is the value of x in the equation 5(x - 2) = 20?", options: ["7", "8", "6", "10"], correctAnswer: "6", difficulty: "medium", topic: "Algebra" },
    { id: 5, question: "Solve for x: 3x + 4 = 19", options: ["5", "6", "7", "3"], correctAnswer: "5", difficulty: "medium", topic: "Algebra" },
    { id: 6, question: "Simplify: (2x² + 4x) - (x² - 3x)", options: ["x² + 7x", "3x² - 7x", "x² + x", "x² - x"], correctAnswer: "x² + 7x", difficulty: "medium", topic: "Algebra" },
    
    { id: 7, question: "Solve for x: x² - 6x + 9 = 0", options: ["2", "3", "1", "4"], correctAnswer: "3", difficulty: "hard", topic: "Algebra" },
    { id: 8, question: "Solve for x: 2x² - 8x = 0", options: ["2", "4", "0", "8"], correctAnswer: "4", difficulty: "hard", topic: "Algebra" },
    { id: 9, question: "What is the value of x in the equation x² - 9 = 0?", options: ["3", "-3", "0", "9"], correctAnswer: "3", difficulty: "hard", topic: "Algebra" },

    { id: 10, question: "What is the sum of the interior angles of a triangle?", options: ["180°", "360°", "90°", "270°"], correctAnswer: "180°", difficulty: "easy", topic: "Geometry" },
    { id: 11, question: "Find the area of a rectangle with length 6 cm and width 3 cm.", options: ["18 cm²", "20 cm²", "15 cm²", "12 cm²"], correctAnswer: "18 cm²", difficulty: "easy", topic: "Geometry" },
    { id: 12, question: "The perimeter of a square is 24 cm. What is the length of one side?", options: ["6 cm", "5 cm", "7 cm", "4 cm"], correctAnswer: "6 cm", difficulty: "easy", topic: "Geometry" },
    
    { id: 13, question: "What is the area of a circle with radius 5 cm? (Use π = 3.14)", options: ["78.5 cm²", "25 cm²", "31.4 cm²", "10 cm²"], correctAnswer: "78.5 cm²", difficulty: "medium", topic: "Geometry" },
    { id: 14, question: "Find the area of a triangle with base 8 cm and height 6 cm.", options: ["24 cm²", "28 cm²", "20 cm²", "22 cm²"], correctAnswer: "24 cm²", difficulty: "medium", topic: "Geometry" },
    { id: 15, question: "In a right triangle, one leg is 4 cm and the hypotenuse is 5 cm. What is the length of the other leg?", options: ["3 cm", "6 cm", "5 cm", "2 cm"], correctAnswer: "3 cm", difficulty: "medium", topic: "Geometry" },
    
    { id: 16, question: "Find the volume of a cylinder with radius 3 cm and height 10 cm. (Use π = 3.14)", options: ["282.6 cm³", "300 cm³", "250 cm³", "150 cm³"], correctAnswer: "282.6 cm³", difficulty: "hard", topic: "Geometry" },
    { id: 17, question: "What is the length of the diagonal of a rectangle with sides 5 cm and 12 cm?", options: ["13 cm", "14 cm", "15 cm", "16 cm"], correctAnswer: "13 cm", difficulty: "hard", topic: "Geometry" },
    { id: 18, question: "A circle has a radius of 10 cm. What is its circumference? (Use π = 3.14)", options: ["62.8 cm", "31.4 cm", "100 cm", "78.5 cm"], correctAnswer: "62.8 cm", difficulty: "hard", topic: "Geometry" },
    
    { id: 19, question: "A triangle has sides of length 8 cm and 15 cm with a 90° included angle. What is its hypotenuse?", options: ["17 cm", "13 cm", "12 cm", "20 cm"], correctAnswer: "17 cm", difficulty: "hard", topic: "Geometry" },
    { id: 20, question: "What is the surface area of a cube with side length 4 cm?", options: ["96 cm²", "64 cm²", "32 cm²", "48 cm²"], correctAnswer: "96 cm²", difficulty: "hard", topic: "Geometry" }
  ];
  
const [showModal, setShowModal]             = useState(false);
const navigate                              = useNavigate()
const [performanceData, setPerformanceData] = useState({
  score: 0, // Example: Total score
  performance: "Poor", // Overall performance feedback
  feedback: "Not available"
});

const handleShowModal = () => setShowModal(true);
const handleCloseModal = () => {
  setShowModal(false)
  navigate("/home");
};

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [selectedOption, setSelectedOption]             = useState(null);
  const [answeredQuestions, setAnsweredQuestions]       = useState({});
  const [abilityLevel, setAbilityLevel]                 = useState(0);
  const [isSubmitted, setIsSubmitted]                   = useState(false);
  const [score, setScore]                               = useState(0);

  // Filter questions by difficulty level
  const getQuestionByDifficulty = (difficulty) => {
    const availableQuestions = questions.filter(
      (q) =>
        !answeredQuestions[q.id] && // Not answered
        q.difficulty === difficulty // Matches difficulty
    );
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  };

  const getNextQuestion = () => {
    let nextQuestion;
  
    // First, try to get questions at the current ability level
    if (abilityLevel <= -1) {
      nextQuestion = getQuestionByDifficulty("easy");
    } else if (abilityLevel >= 1) {
      nextQuestion = getQuestionByDifficulty("hard");
    } else {
      nextQuestion = getQuestionByDifficulty("medium");
    }
  
    // If no questions available at the current level, check other levels
    if (!nextQuestion) {
      nextQuestion = getQuestionByDifficulty("medium") || 
                     getQuestionByDifficulty("easy") || 
                     getQuestionByDifficulty("hard");
    }
  
    return nextQuestion || null;
  };
  

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect       = selectedOption === currentQuestion.correctAnswer;

    // Update score and performance level
    if (isCorrect) {
      setScore((prev) => prev + 1);
      setAbilityLevel((prev) => prev + 1);
    } else {
      setAbilityLevel((prev) => prev - 1);
    }

    // Mark the question as answered
    setAnsweredQuestions((prev) => ({
      ...prev,
      [currentQuestion.id]: isCorrect ? "correct" : "incorrect",
    }));

    setIsSubmitted(true); // Show feedback
  };

  const handleNextQuestion = () => {
    setIsSubmitted(false); // Reset submission state
    setSelectedOption(null); // Reset selected option
    const nextQuestion = getNextQuestion();

    if (nextQuestion) {
      setCurrentQuestionIndex(questions.findIndex((q) => q.id === nextQuestion.id));
    } else {
      console.log("result message", getResultMessage());
    }
  };

  const getTopicFeedback = () => {
    const algebraMistakes = questions.filter(
      (q) => q.topic === "Algebra" && answeredQuestions[q.id] === "incorrect"
    ).length;
  
    const geometryMistakes = questions.filter(
      (q) => q.topic === "Geometry" && answeredQuestions[q.id] === "incorrect"
    ).length;
  
    let suggestions = [];
    if (algebraMistakes > 0) {
      suggestions.push(`You missed ${algebraMistakes} Algebra question(s). Focus on equations, functions, and graphs.`);
    }
    if (geometryMistakes > 0) {
      suggestions.push(`You missed ${geometryMistakes} Geometry question(s). Revise angle properties and key theorems.`);
    }
  
    return suggestions.join(" ");
  };
  
  const getResultMessage = async () => {
    const totalQuestions  = questions.length;
    const percentage      = (score / totalQuestions) * 100;
  
    let performance                         = "";
    if (percentage >= 80) performance       = "Excellent!";
    else if (percentage >= 50) performance  = "Good!";
    else performance                        = "Poor!";
  
    const topicFeedback = getTopicFeedback();
    const resultData = {
        email: userEmail, // Replace with dynamic username if available
        score,
        totalQuestions,
        percentage,
        performance,
        topicFeedback,
      };
      try {
        const response = await fetch('http://localhost:5000/api/saveResults', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(resultData),
        });
        const data = await response.json();
        console.log('Result saved:', data);
      } catch (error) {
        console.error('Error saving result:', error);
      }

      const results = {
        score:        percentage,
        performance:  performance,
        feedback:     topicFeedback,
      };
      setPerformanceData(results);
      handleShowModal(); // Show the modal
    return `${performance} Your score: ${score}/${totalQuestions}. ${topicFeedback}`;
  };
  

  // Initialize quiz
  React.useEffect(() => {
    if (currentQuestionIndex === null) {
      const firstQuestion = getNextQuestion();
      if (firstQuestion) {
        setCurrentQuestionIndex(questions.findIndex((q) => q.id === firstQuestion.id));
      }
    }
  }, [currentQuestionIndex]);

  return (
    <div>
      <Navbar name="Quiz Questions"/>
      <div className="flex flex-col items-center bg-gray-100 min-h-screen">
        <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
          <div className="row">
            <div className="col-6">
              {currentQuestionIndex !== null && (
                <QuestionArea
                  question        = {`Q${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`}
                  options         = {questions[currentQuestionIndex].options}
                  correctAnswer   = {questions[currentQuestionIndex].correctAnswer}
                  selectedOption  = {selectedOption}
                  onOptionSelect  = {handleOptionSelect}
                  isSubmitted     = {isSubmitted}
                />
              )}
            </div>
            <div className="col-6">
              <QuestionList
                totalQuestions    = {questions.length}
                currentQuestion   = {currentQuestionIndex + 1}
                answeredQuestions = {answeredQuestions}
              />
            </div>
          </div>
          <div className="d-flex justify-center mt-4">
            <button className = "btn btn-success m-2"
              onClick   = {handleSubmitAnswer}
              disabled  = {!selectedOption || isSubmitted} > Submit Answer </button>
              
            <button className = "btn btn-primary m-2"
              onClick   = {handleNextQuestion}
              disabled  = {!isSubmitted}> Next </button>
          </div>
        </div>
      </div>
      {showModal && (
        <>
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Performance History</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={handleCloseModal}
                  ></button>
                </div>
                <div className="modal-body">
                  <h2 className={performanceData.score >= 40 ? "text-success" : "text-danger"}>Score: {performanceData.score} / 100</h2>
                  <h6>Performance: {performanceData.performance}</h6>
                  <p>Feedback: {performanceData.feedback}</p>
                </div>
                <div className="modal-footer">
                  <button type="button"
                    className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default Quiz;
