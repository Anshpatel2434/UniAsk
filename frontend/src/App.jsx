import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Home from "./pages/Home";
import PostDoubt from "./pages/PostDoubt";
import Dashboard from "./pages/Dashboard";
import RegisteredUsersPage from "./pages/RegUsers";
import DoubtPage from "./pages/DoubtPage";
import SolutionInfo from "./components/SolutionInfo";
import AllDoubt from "./pages/AllDoubt";
import ChatPage from "./pages/ChatPage";
import Leaderboard from "./pages/Leaderboard";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/postDoubt" element={<PostDoubt />} />
				<Route path="/reguser" element={<RegisteredUsersPage />} />
				<Route path="/dashboard/:student_id" element={<Dashboard />} />
				<Route path="/doubt/:doubt_id" element={<DoubtPage />} />
				<Route path="/doubts" element={<AllDoubt />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
				<Route path="/solution/:solution_id" element={<SolutionInfo />} />
				<Route path="/chat/:chat_name" element={<ChatPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
