import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { useSolution } from "../hooks/useSolution";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const SolutionInfo = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const { solution_id } = useParams();
	const { solution, loading } = useSolution({ solution_id });
	const navigate = useNavigate();

	const { user } = useContext(AppContext);
	const [upVote, setUpVote] = useState(false);
	const [downVote, setDownVote] = useState(false);

	useEffect(() => {
		if (user && solution.votes) {
			// Check if the current user has voted and what type of vote
			const foundVote = solution.votes.find(
				(vote) => vote.votedBy.id === user.id
			);

			if (foundVote) {
				if (foundVote.type === "UP") setUpVote(true);
				if (foundVote.type === "DOWN") setDownVote(true);
			}
		}
	}, [loading, solution.votes, user.id]);

	async function handleVote(type) {
		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/vote/postVote`,
				{
					solution_id: solution.id,
					type: type,
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("token")}`,
					},
				}
			);
			if (res.data.status == 200) {
				window.location.reload();
			}
		} catch (error) {
			console.log(error);
		}
	}

	if (loading) {
		return <div className="text-center text-white">Loading...</div>;
	}

	return (
		<div className="flex justify-center items-center min-h-screen bg-gray-900 text-white p-4">
			<Sidebar />
			<div className="max-w-2xl w-full bg-gray-800 rounded-lg shadow-lg p-6">
				{/* Solution Text */}
				<div className="text-center mb-6">
					<h1 className="text-2xl font-bold mb-4">Solution Details</h1>
					<p className="text-lg leading-relaxed">{solution.solution}</p>
				</div>

				{/* Voting Section */}
				<div className="flex justify-center items-center mb-6">
					<button
						className={`text-lg hover:text-green-500 mb-0 md:mb-2 ${
							upVote ? " text-green-500" : ""
						}`}
						disabled={upVote}
						onClick={() => handleVote("UP")}
					>
						<FaThumbsUp />
					</button>
					<span className="text-lg mx-4">{solution.upvotes}</span>
					<button
						className={`text-lg hover:text-red-500 mb-0 md:mb-2 ${
							downVote ? " text-red-500" : ""
						}`}
						disabled={downVote}
						onClick={() => handleVote("DOWN")}
					>
						<FaThumbsDown />
					</button>
				</div>

				{/* Posted By Section */}
				<div className="text-center">
					<div
						className="hover:cursor-pointer text-blue-400 text-lg"
						onClick={() => navigate(`/dashboard/${solution.postedBy.id}`)}
					>
						Posted by:{" "}
						<span className="relative inline-block group">
							<span className="hover:text-white transition-colors duration-300 ease-in-out">
								{solution.postedBy.name}
							</span>
							<span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out"></span>
						</span>
					</div>
					<div className="text-sm text-gray-400 mt-2">
						{new Date(solution.postedOn).toLocaleDateString()}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SolutionInfo;
