import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const SolutionBar = ({ solution }) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const { user, loading } = useContext(AppContext);
	const [upVote, setUpVote] = useState(false);
	const [downVote, setDownVote] = useState(false);
	const navigate = useNavigate();
	const formattedDate = solution.postedOn.split("T")[0];

	useEffect(() => {
		if (!loading && solution.votes) {
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

	return (
		<div className="relative bg-gray-800 text-white rounded-lg shadow-md p-3 flex flex-col h-auto max-w-full md:h-40">
			<div className="flex flex-1 flex-col md:flex-row">
				{/* Upvote, Downvote, and Vote Count */}
				<div className="flex flex-row items-center justify-between md:flex-col md:items-center mr-2 md:mr-4 mb-2 md:mb-0">
					<button
						className={`text-lg hover:text-green-500 mb-0 md:mb-2 ${
							upVote ? " text-green-500" : ""
						}`}
						disabled={upVote}
						onClick={() => handleVote("UP")}
					>
						<FaThumbsUp />
					</button>
					<span className="text-sm mx-2 md:my-1">{solution.upvotes || 0}</span>
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

				{/* Vertical Divider */}
				<div className="hidden md:block border-l border-gray-600 h-full mx-2"></div>

				{/* Solution Text */}
				<div
					className="flex-1 overflow-hidden text-sm hover:scale-[101%] hover:cursor-pointer transition-all duration-150 hover:bg-green-800"
					onClick={() => navigate(`/solution/${solution.id}`)}
				>
					{solution.solution.substring(0, 350)}...
				</div>
			</div>

			{/* Posted By (at the bottom) */}
			<div className="flex flex-col md:flex-row justify-between items-center mt-2 pt-2 border-t border-gray-600">
				<div
					className="hover:cursor-pointer text-blue-400 text-sm mt-2 md:mt-0"
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
				<div className="text-sm text-gray-400 mt-2 md:mt-0">
					{formattedDate}
				</div>
			</div>
		</div>
	);
};

export default SolutionBar;
