import { BrowserRouter, Routes, Route } from "react-router-dom";

import Success from "./pages/Success";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/success" element={<Success />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/admin" element={<Admin />} />
       
      </Routes>
    </BrowserRouter>
  );
}