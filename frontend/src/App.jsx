import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import PostDoubt from "./pages/PostDoubt";
import Dashboard from "./pages/Dashboard";
import RegisteredUsersPage from "./pages/RegUsers";
import DoubtPage from "./pages/DoubtPage";
import SolutionInfo from "./components/SolutionInfo";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/postDoubt" element={<PostDoubt />} />
				<Route path="/reguser" element={<RegisteredUsersPage />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/doubt/:doubt_id" element={<DoubtPage />} />
				<Route path="/solution/:solution_id" element={<SolutionInfo />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
