import "./App.css";
import Navbar from "./Navbar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import TestsPage from "./pages/TestsPage";
import OtherPage from "./pages/OtherPage";
import Travel from "./pages/Travel";

function App() {
  return (
    <div className="App bg-black h-full font-serif">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/travel" element={<Travel />} />
        <Route exact path="/contact" element={<ContactPage />} />
        <Route exact path="/notes" element={<ContactPage />} />
        <Route exact path="/tests" element={<TestsPage />} />
        <Route exact path="/other" element={<OtherPage />} />
      </Routes>
    </div>
  );
}

export default App;
