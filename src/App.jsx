import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/layout/TopBar";
import BubbleSort from "./pages/BubbleSort";
import InsertionSort from "./pages/InsertionSort";
import MergeSort from "./pages/MergeSort";

function App() {
  return (
    <>
      <Router>
        <TopBar />
        <Routes>
          <Route path="/bubble" element={<BubbleSort />} />
          <Route path="/insertion" element={<InsertionSort />} />
          <Route path="/merge" element={<MergeSort />} />
          <Route path="/" element={<InsertionSort />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
