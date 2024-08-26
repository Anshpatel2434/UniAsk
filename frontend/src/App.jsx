import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import PostDoubt from "./pages/PostDoubt";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/postDoubt" element={<PostDoubt />} />
        <Route path="/sidebar" element={<Sidebar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
