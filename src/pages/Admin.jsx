import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function Admin() {
  const [registrations, setRegistrations] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (loggedIn) {
      loadData();
    }
  }, [loggedIn]);

  const loadData = async () => {
    const regSnapshot = await getDocs(
  collection(db, "registrations")
);

const regData = regSnapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
}));

setRegistrations(regData);
    const snapshot = await getDocs(
      collection(db, "participants")
    );

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      return b.timeRemaining - a.timeRemaining;
    });

    setParticipants(data);
  };

  const exportToCSV = () => {
    const headers = [
      "Rank,Name,Mobile,Score,TimeLeft"
    ];

    const rows = participants.map(
      (p, index) =>
        `${index + 1},${p.name},${p.mobile},${p.score},${p.timeRemaining}`
    );

    const csvContent = [
      headers[0],
      ...rows,
    ].join("\n");

    const blob = new Blob(
      [csvContent],
      {
        type:
          "text/csv;charset=utf-8;",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;
    link.setAttribute(
      "download",
      "Mahabharata_Quiz_Results.csv"
    );

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const login = () => {
    if (password === "ishani@701") {
      setLoggedIn(true);
    } else {
      alert("Wrong Password");
    }
  };

  const totalParticipants =
    participants.length;

  const highestScore =
    participants.length > 0
      ? participants[0].score
      : 0;

  const averageScore =
    participants.length > 0
      ? (
          participants.reduce(
            (sum, p) =>
              sum + p.score,
            0
          ) / participants.length
        ).toFixed(1)
      : 0;

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white p-6 rounded-xl shadow-xl">
          <h2 className="text-black text-xl mb-4">
            Admin Login
          </h2>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="border p-2 w-full rounded"
          />

          <button
            onClick={login}
            className="bg-blue-600 text-white px-4 py-2 mt-4 rounded w-full"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    
    <div className="p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        🏆 Mahabharata Quiz Results
      </h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={exportToCSV}
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold"
        >
          📥 Export CSV
        </button>
      </div>
      <div className="bg-yellow-600 p-6 rounded-xl text-center mb-6">
  <h2 className="text-2xl font-bold">
    📝 Total Registrations
  </h2>

  <p className="text-3xl mt-2">
    {registrations.length}
  </p>
</div>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-600 p-6 rounded-xl text-center">
          <h2 className="text-2xl font-bold">
            👥 Total Participants
          </h2>

          <p className="text-3xl mt-2">
            {totalParticipants}
          </p>
        </div>

        <div className="bg-green-600 p-6 rounded-xl text-center">
          <h2 className="text-2xl font-bold">
            🎯 Highest Score
          </h2>

          <p className="text-3xl mt-2">
            {highestScore}
          </p>
        </div>

        <div className="bg-purple-600 p-6 rounded-xl text-center">
          <h2 className="text-2xl font-bold">
            📊 Average Score
          </h2>

          <p className="text-3xl mt-2">
            {averageScore}
          </p>
        </div>
      </div>

      {participants.length >= 3 && (
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-yellow-500 text-black p-6 rounded-2xl text-center">
            <h2 className="text-3xl font-bold">
              🥇 First Place
            </h2>

            <p className="text-xl mt-3 font-semibold">
              {participants[0]?.name}
            </p>

            <p>
              Score:{" "}
              {participants[0]?.score}
            </p>
          </div>

          <div className="bg-gray-300 text-black p-6 rounded-2xl text-center">
            <h2 className="text-3xl font-bold">
              🥈 Second Place
            </h2>

            <p className="text-xl mt-3 font-semibold">
              {participants[1]?.name}
            </p>

            <p>
              Score:{" "}
              {participants[1]?.score}
            </p>
          </div>

          <div className="bg-orange-400 text-black p-6 rounded-2xl text-center">
            <h2 className="text-3xl font-bold">
              🥉 Third Place
            </h2>

            <p className="text-xl mt-3 font-semibold">
              {participants[2]?.name}
            </p>

            <p>
              Score:{" "}
              {participants[2]?.score}
            </p>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-400 bg-white text-black">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3">
                Rank
              </th>
              <th className="p-3">
                Name
              </th>
              <th className="p-3">
                Mobile
              </th>
              <th className="p-3">
                Score
              </th>
              <th className="p-3">
                Time Left
              </th>
            </tr>
          </thead>

          <tbody>
            {participants.map(
              (p, index) => (
                <tr
                  key={p.id}
                  className="border-t text-center hover:bg-gray-100"
                >
                  <td className="p-2">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : index === 2
                      ? "🥉"
                      : index + 1}
                  </td>

                  <td className="p-2">
                    {p.name}
                  </td>

                  <td className="p-2">
                    {p.mobile}
                  </td>

                  <td className="p-2">
                    {p.score}
                  </td>

                  <td className="p-2">
  {Math.floor(p.timeRemaining / 60)}m {p.timeRemaining % 60}s
</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <h2 className="text-3xl font-bold mt-10 mb-4">
  Registered Users
</h2>

<div className="overflow-x-auto">
  <table className="w-full border border-gray-400 bg-white text-black">
    <thead>
      <tr className="bg-gray-700 text-white">
        <th className="p-3">Name</th>
        <th className="p-3">Mobile</th>
      </tr>
    </thead>

    <tbody>
      {registrations.map((p) => (
        <tr
          key={p.id}
          className="border-t text-center hover:bg-gray-100"
        >
          <td className="p-2">{p.name}</td>
          <td className="p-2">{p.mobile}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    </div>
  );
}