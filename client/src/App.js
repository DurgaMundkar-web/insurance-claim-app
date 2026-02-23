import React from "react";
import { Routes, Route } from "react-router-dom";
import Recommendation from "./pages/Recommendation";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Recommendation />} />
      <Route path="/recommendation" element={<Recommendation />} />
    </Routes>
  );
}

export default App;