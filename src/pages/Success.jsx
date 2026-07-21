import { Link } from "react-router-dom";

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-black p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-lg text-center">

        <div className="text-7xl mb-4">🏆</div>

        <h1 className="text-4xl font-bold text-green-600 mb-4">
          Quiz Submitted Successfully!
        </h1>

        <p className="text-gray-700 text-lg mb-6">
          Thank you for participating in the
          <br />
          <span className="font-bold text-blue-600">
            🕉️ Mahabharata Quiz Competition
          </span>
        </p>

        <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-4 mb-6">
          <p className="font-semibold text-yellow-800">
            Results will be announced after evaluation.
          </p>
        </div>

        <p className="text-gray-500 mb-6">
          Your responses have been recorded successfully.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition"
        >
          Back to Home
        </Link>

      </div>
    </div>
  );
}