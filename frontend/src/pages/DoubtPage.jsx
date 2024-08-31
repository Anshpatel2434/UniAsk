import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDoubt } from "../hooks/useDoubts";
import Sidebar from "../components/Sidebar";
import SolutionBar from "../components/SolutionBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";

const DoubtPage = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const { doubt_id } = useParams();
	const { doubt, loading } = useDoubt({ doubt_id });
	const [read, setRead] = useState(false);
	const navigate = useNavigate();
	const [currentSolution, setCurrentSolution] = useState("");

	let studentDetails;
	let solutions;
	let formattedDate;

	if (!loading && doubt) {
		console.log(doubt);
		studentDetails = doubt.postedBy;
		solutions = doubt.solutions;
		solutions.sort((a, b) => b.upvotes - a.upvotes);
		formattedDate = new Date(doubt.postedOn).toLocaleDateString();
	}

	async function postSolution() {
		const res = await axios.post(
			`${BACKEND_URL}/api/v1/solution/postSolution/${doubt_id}`,
			{
				solution: currentSolution,
			},
			{
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
				},
			}
		);
		if (res.data.status === 200) {
			toast.success(res.data.message);
		} else {
			toast.error(res.data.message);
		}
		setTimeout(() => {
			window.location.reload();
		}, 2000);
	}

	if (loading) return <Loading />;

	return (
		<div className="flex">
			<Toaster />
			<Sidebar />
			{/* Header Section */}
			<div className="flex-1 flex flex-col bg-gray-900 text-white min-h-screen pl-[5rem] sm:pl-[5rem]">
				<div className="fixed top-0 left-[5rem] sm:left-[5rem] right-0 z-10 bg-gray-800 p-[0.5rem] sm:p-[1rem] shadow-md">
					<div className="flex flex-col space-y-[0.5rem] sm:space-y-[1rem]">
						<div className="flex justify-between items-center">
							<h1 className="text-[1rem] sm:text-[1.5rem] font-bold text-white">
								Subject: {doubt.subject}
							</h1>
							<div
								className="hover:cursor-pointer text-blue-400 text-sm mt-2 md:mt-0"
								onClick={() => navigate(`/dashboard/${studentDetails.id}`)}
							>
								Posted by:{" "}
								<span className="relative inline-block group">
									<span className="hover:text-white transition-colors duration-300 ease-in-out">
										{studentDetails.name}
									</span>
									<span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
								</span>
							</div>
						</div>
						<div className="flex justify-between items-center text-xs sm:text-sm">
							<div>Doubt For: {doubt.doubtFor}</div>
							<div>Posted On: {formattedDate}</div>
						</div>
						<div className="text-xs sm:text-sm">
							Doubt:{" "}
							{read ? doubt.doubt : `${doubt.doubt.substring(0, 200)}...`}
							<span
								className="hover:cursor-pointer text-blue-500 ml-[0.25rem] sm:ml-[0.5rem]"
								onClick={() => setRead(!read)}
							>
								{read ? "Read Less" : "Read More"}
							</span>
						</div>
						{/* New Button for Chatroom Discussion */}
						<div className="mt-2">
							<button
								className="bg-blue-500 text-white py-1 px-3 rounded-md text-xs sm:text-sm hover:bg-blue-600 transition"
								onClick={() => navigate(`/chat/doubt_${doubt_id}`)}
							>
								Go to Chatroom Discussion
							</button>
						</div>
					</div>
				</div>

				{/* Solutions Section */}
				<div className="flex-1 mt-[12rem] sm:mt-[12rem] mb-[4rem] sm:mb-[6rem] overflow-y-auto p-[0.5rem] sm:p-[1rem]">
					{loading ? (
						<div className="text-sm sm:text-base">Loading solutions...</div>
					) : solutions.length > 0 ? (
						<div className="space-y-4">
							{solutions.map((solution, index) => (
								<SolutionBar solution={solution} key={index} />
							))}
						</div>
					) : (
						<div className="text-sm sm:text-base">No Solution Exists</div>
					)}
				</div>

				{/* Fixed Text Area Section */}
				<div className="fixed bottom-0 left-[5rem] sm:left-[5rem] right-0 bg-gray-800 p-[0.5rem] sm:p-[1rem] shadow-md">
					<div className="flex items-center space-x-[0.25rem] sm:space-x-[0.5rem]">
						<button className="p-[0.25rem] sm:p-[0.5rem] bg-gray-700 rounded-full">
							<i className="bx bx-pin text-white text-[1rem] sm:text-[1.25rem]"></i>
						</button>
						<textarea
							className="flex-1 p-[0.25rem] sm:p-[0.5rem] rounded-md bg-gray-700 text-white resize-none text-xs sm:text-sm"
							placeholder="Type your solution here..."
							rows="2"
							onChange={(e) => setCurrentSolution(e.target.value)}
						></textarea>
						<button
							className="p-[0.25rem] sm:p-[0.5rem] bg-blue-500 text-white rounded-md text-xs sm:text-sm"
							onClick={postSolution}
						>
							Send
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DoubtPage;
