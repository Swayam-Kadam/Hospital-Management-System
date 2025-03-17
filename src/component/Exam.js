import React, { useState } from "react";


const quizQuestions = [
  {
    question: "Which hook is used to manage state in a functional component?",
    options: [
      "useReducer",
      "useContext",
      "useEffect",
      "useState"
    ],
    answer: "useState",
  },
  {
    question: "What is the primary purpose of the useEffect hook?",
    options: [
      "To update the virtual DOM",
      "To perform side effects in functional components",
      "To define state variables",
      "To create a new component"
    ],
    answer: "To perform side effects in functional components",
  },
  {
    question: "What does JSX stand for?",
    options: [
      "JavaScript Xperience",
      "Java Syntax Extra",
      "JavaScript Extension",
      "JavaScript XML"
    ],
    answer: "JavaScript XML",
  },
  {
    question: "Which method is used to render components in React?",
    options: [
      "React.render()",
      "ReactDOM.render()",
      "componentRender()",
      "renderComponent()"
    ],
    answer: "ReactDOM.render()",
  },
  {
    question: "How do you pass data to a child component in React?",
    options: [
      "Using state",
      "Using refs",
      "Using useEffect",
      "Using props"
    ],
    answer: "Using props",
  },
  {
    question: "Which of the following is NOT a React hook?",
    options: [
      "useEffect",
      "useDispatch",
      "useReducer",
      "useState"
    ],
    answer: "useDispatch",
  },
  {
    question: "What is the default behavior of useEffect()?",
    options: [
      "Runs only on state change",
      "Runs only once",
      "Runs only on unmount",
      "Runs after every render"
    ],
    answer: "Runs after every render",
  },
  {
    question: "What is the virtual DOM?",
    options: [
      "A physical DOM element",
      "A lightweight copy of the real DOM",
      "A styling framework",
      "A database for React components"
    ],
    answer: "A lightweight copy of the real DOM",
  },
  {
    question: "Which lifecycle method is used to fetch data in class components?",
    options: [
      "componentWillUpdate",
      "componentDidUpdate",
      "componentWillUnmount",
      "componentDidMount"
    ],
    answer: "componentDidMount",
  },
  {
    question: "Which React feature improves performance by updating only the changed parts of the DOM?",
    options: [
      "Shadow DOM",
      "Virtual DOM",
      "Server-Side Rendering",
      "React Fiber"
    ],
    answer: "Virtual DOM",
  },
  {
    question: "Which of the following is NOT a valid way to handle events in React?",
    options: [
      "Inline function",
      "Binding in the constructor",
      "Using setState directly",
      "Arrow functions"
    ],
    answer: "Using setState directly",
  },
  {
    question: "Which of these hooks is used for complex state logic in functional components?",
    options: [
      "useReducer",
      "useEffect",
      "useContext",
      "useState"
    ],
    answer: "useReducer",
  },
  {
    question: "What is the purpose of React.memo()?",
    options: [
      "To memoize expensive function calls",
      "To prevent unnecessary re-renders",
      "To improve JSX readability",
      "To cache API responses"
    ],
    answer: "To prevent unnecessary re-renders",
  },
  {
    question: "What is the purpose of the key prop in lists?",
    options: [
      "To trigger re-renders",
      "To define unique styles",
      "To help React identify which items have changed",
      "To store state values"
    ],
    answer: "To help React identify which items have changed",
  },
  {
    question: "What will happen if you update a state variable inside useEffect without dependencies?",
    options: [
      "It will cause an infinite loop",
      "It will update once and stop",
      "It will trigger a component error",
      "It will not update"
    ],
    answer: "It will cause an infinite loop",
  },
  {
    question: "Which of these best describes React?",
    options: [
      "A backend framework",
      "A database",
      "A JavaScript UI library",
      "A CSS preprocessor"
    ],
    answer: "A JavaScript UI library",
  },
  {
    question: "What does useRef return?",
    options: [
      "A function",
      "A mutable object with a .current property",
      "A state variable",
      "An event handler"
    ],
    answer: "A mutable object with a .current property",
  },
  {
    question: "Which hook would you use to fetch data when a component mounts?",
    options: [
      "useState",
      "useReducer",
      "useEffect",
      "useMemo"
    ],
    answer: "useEffect",
  },
  {
    question: "Which feature of React helps manage state globally?",
    options: [
      "React Context API",
      "React Hooks",
      "React Lifecycle Methods",
      "React Virtual DOM"
    ],
    answer: "React Context API",
  }
];



export default function QuizGame() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleOptionClick = (option) => {
    if (!isAnswered) {
      setSelectedOption(option);
      setIsAnswered(true);
      if (option === currentQuestion.answer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      alert(`Quiz complete! Your score: ${score}/${quizQuestions.length}`);
      setCurrentQuestionIndex(0);
      setScore(0);
    }
  };

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 ">
      <div className="card shadow-lg" style={{ width: "24rem" }}>
        <div className="card-body">
          <h2 className="card-title text-center mb-4">
            Question {currentQuestionIndex + 1}/{quizQuestions.length}
          </h2>
          <p className="card-text mb-4">{currentQuestion.question}</p>
          <div className="list-group mb-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                className={`list-group-item list-group-item-action ${
                  isAnswered
                    ? option === currentQuestion.answer
                      ? "list-group-item-success bg-success text-light"
                      : option === selectedOption
                      ? "list-group-item-danger bg-danger text-light"
                      : ""
                    : ""
                }`}
                onClick={() => handleOptionClick(option)}
                disabled={isAnswered}
              >
                {option}
              </button>
            ))}
          </div>
          {isAnswered && (
            <button
              onClick={handleNextQuestion}
              className="btn btn-primary w-100"
            >
              {currentQuestionIndex < quizQuestions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
