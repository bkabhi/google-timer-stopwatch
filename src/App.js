import "./styles.css";
import { Route, Routes } from "react-router-dom";
import { Timer } from "./Components/Timer";
import { StopWatch } from "./Components/StopWatch";
import { Navbar } from "./Components/Navbar";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/timer" element={<Timer />} />
        <Route path="/*" element={<Timer />} />
        <Route path="/stopwatch" element={<StopWatch />} />
      </Routes>
    </div>
  );
}
