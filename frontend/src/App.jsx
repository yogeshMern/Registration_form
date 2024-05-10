import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Pages/Header";
import Register from "./Pages/Register";
import Userdetails from "./Pages/Userdetails";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/userdetails" element={<Userdetails />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
