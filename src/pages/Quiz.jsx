import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import questions from "../data/questions";

export default function Quiz() {
  const quizStartTime = new Date("2026-09-14T20:00:00");
  const quizEndTime = new Date("2026-09-14T20:10:00");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(600);

  
  const [countdown, setCountdown] = useState(
  quizStartTime.getTime() - new Date().getTime()
);
  const [quizStarted, setQuizStarted] = useState(
    new Date() >= quizStartTime
  );

  const navigate = useNavigate();

  useEffect(() => {
  const interval = setInterval(() => {
    const remaining =
      quizStartTime.getTime() - new Date().getTime();

    setCountdown(remaining);

    if (remaining <= 0) {
      setQuizStarted(true);
      clearInterval(interval);
    }
  }, 1000);

  return () => clearInterval(interval);
}, []);
  


  const question = questions[currentQuestion];

  const handleAnswer = (option) => {
    setAnswers({
      ...answers,
      [question.id]: option,
    });
  };
  
  const handleSubmit = async () => {
    const mobile = localStorage.getItem("mobile");

const q = query(
  collection(db, "participants"),
  where("mobile", "==", mobile)
);

const snapshot = await getDocs(q);

if (!snapshot.empty) {
  navigate("/success");
  return;
}
    let score = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        score++;
      }
    });

    try {
      await addDoc(collection(db, "participants"), {
        name: localStorage.getItem("name"),
        mobile: localStorage.getItem("mobile"),
        score,
        answers,
        submittedAt: new Date(),
        timeRemaining: timeLeft,
      });

      navigate("/success");
    } catch (error) {
      console.error("Firestore Error:", error);
      alert("Failed to save response");
    }
  };

  useEffect(() => {
  if (!quizStarted) return;

  const timer = setInterval(() => {
    setTimeLeft((prev) => {
      if (prev <= 1) {
        clearInterval(timer);
        return 0;
      }

      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [quizStarted]);

useEffect(() => {
  if (timeLeft === 0 && quizStarted) {
    handleSubmit();
  }
}, [timeLeft, quizStarted]);

  if (!quizStarted) {
  const days = Math.floor(
    countdown / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (countdown % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
  );

  const minutes = Math.floor(
    (countdown % (1000 * 60 * 60)) /
      (1000 * 60)
  );

  const seconds = Math.floor(
    (countdown % (1000 * 60)) / 1000
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          ✅ Registration Successful
        </h1>

        <p className="text-lg text-black mb-4">
          Please wait for the quiz to start
        </p>

        <p className="text-xl font-bold text-blue-600">
          14 September 2026 - 8:00 PM
        </p>

        <div className="mt-6 text-4xl font-bold text-red-600">
          {days}d {hours}h {minutes}m {seconds}s
        </div>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 w-full max-w-3xl shadow-2xl">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-yellow-400">
            🕉️ Mahabharata Quiz
          </h1>

          <div className="bg-red-500 px-4 py-2 rounded-xl font-bold">
            ⏳ {Math.floor(timeLeft / 60)}:
            {(timeLeft % 60).toString().padStart(2, "0")}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-300">
            Question {currentQuestion + 1} of {questions.length}
          </p>

          <h2 className="text-2xl font-semibold mt-2">
            {question.question}
          </h2>
        </div>

        <div className="space-y-3">
          {question.options.map((option) => (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full text-left p-4 rounded-xl transition ${
                answers[question.id] === option
                  ? "bg-yellow-500 text-black font-bold"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-between mt-8">
          {currentQuestion > 0 ? (
            <button
              onClick={() =>
                setCurrentQuestion(currentQuestion - 1)
              }
              className="bg-gray-600 px-6 py-3 rounded-xl"
            >
              Previous
            </button>
          ) : (
            <div />
          )}

          {currentQuestion < questions.length - 1 ? (
            <button
              onClick={() =>
                setCurrentQuestion(currentQuestion + 1)
              }
              className="bg-blue-600 px-6 py-3 rounded-xl"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 px-6 py-3 rounded-xl font-bold"
            >
              Submit Quiz
            </button>
          )}
        </div>

      </div>
    </div>
  );
}