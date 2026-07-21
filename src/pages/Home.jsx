import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-10 text-center max-w-xl w-full shadow-2xl">
        <h1 className="text-4xl font-bold text-yellow-400 mb-4">
          🕉️ Mahabharata Quiz Competition
        </h1>

        <p className="text-gray-200 mb-6">
          Test your knowledge of the Mahabharata
        </p>

        <div className="space-y-2 text-lg mb-8">
          <p>📅 Date: 14 September 2026</p>
          <p>⏰ Time: 8:00 PM</p>
          <p>❓ Questions: 50</p>
          <p>⏳ Duration: 10 Minutes</p>
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/register">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-3 rounded-xl">
              Start Quiz
            </button>
          </Link>

          <button
            onClick={() => navigate("/admin")}
            className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl"
          >
            Admin Login
          </button>
        </div>
      </div>
    </div>
  );
}