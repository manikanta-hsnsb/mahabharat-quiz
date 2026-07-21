import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { addDoc } from "firebase/firestore";

export default function Register() {
  
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  const navigate = useNavigate();

  const handleContinue = async () => {
    const quizEndTime = new Date("2026-09-14T20:10:00");

  if (new Date() > quizEndTime) {
    alert("Registration Closed");
    return;
  }
    if (!name || !mobile) {
      alert("Please enter Name and Mobile Number");
      return;
    }

    if (mobile.length !== 10) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    try {
      const q = query(
  collection(db, "registrations"),
  where("mobile", "==", mobile)
);

const querySnapshot = await getDocs(q);

if (!querySnapshot.empty) {

  localStorage.setItem(
    "name",
    querySnapshot.docs[0].data().name
  );

  localStorage.setItem("mobile", mobile);

  alert("Already Registered");

  navigate("/quiz");
  return;
}

      localStorage.setItem("name", name);
      localStorage.setItem("mobile", mobile);
      await addDoc(collection(db, "registrations"), {
  name,
  mobile,
  registeredAt: new Date(),
});
      navigate("/quiz");
    } catch (error) {
      console.error(error);
      alert("Error checking mobile number");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 w-full max-w-md shadow-2xl">
        <h1 className="text-3xl font-bold text-yellow-400 text-center mb-6">
          Participant Registration
        </h1>

        <div className="mb-4">
          <label className="block mb-2 text-gray-200">
            Full Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-white text-black outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 text-gray-200">
            Mobile Number
          </label>

          <input
            type="tel"
            placeholder="Enter mobile number"
            value={mobile}
            onChange={(e) =>
              setMobile(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-white text-black outline-none"
          />
        </div>

        <button
          onClick={handleContinue}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 rounded-xl"
        >
          Register
        </button>
      </div>
    </div>
  );
}