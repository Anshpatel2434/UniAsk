import axios from "axios";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PostDoubt = () => {
	const navigate = useNavigate();
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	const [doubt, setDoubt] = useState({
		doubt: "",
		subject: "None",
		doubtFor: "None",
	});

	useEffect(() => {
		if (localStorage.getItem("loggedIn") === "false") navigate("/signin");
		const token = localStorage.getItem("token");
		if (token) {
			const payload = JSON.parse(atob(token.split(".")[1]));
			const expiration = new Date(payload.exp * 1000);
			const now = new Date();

			if (now >= expiration) {
				localStorage.removeItem("token");
				localStorage.setItem("loggedIn", "false");
				navigate("/signin");
				toast.error("Session expired, please log in again.");
			} else {
				// Set a timeout to remove the token just before it expires
				const timeout = expiration.getTime() - now.getTime();
				setTimeout(() => {
					localStorage.removeItem("token");
					localStorage.setItem("loggedIn", "false");
					navigate("/signin");
					toast.error("Session expired, please log in again.");
				}, timeout);
			}
		}
	}, [navigate]);

	async function sendRequest(e) {
		e.preventDefault();
		console.log(doubt);
		if (doubt.doubt == "") {
			toast.error("Please enter your doubt");
			return;
		}
		if (doubt.subject === "None") {
			toast.error("Please select a Subject");
			return;
		}
		if (doubt.doubtFor === "None") {
			toast.error("Please select where you want to post your doubt");
			return;
		}

		try {
			const res = await axios.post(
				`${BACKEND_URL}/api/v1/doubt/postDoubt`,
				doubt,
				{
					headers: {
						Authorization: `${localStorage.getItem("token")}`,
					},
				}
			);
			if (res.data.status !== 200) {
				toast.error(res.data.message);
			} else {
				toast.success("Doubt posted successfully");
			}
		} catch (error) {
			toast.error("Failed to post doubt");
		}
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900">
			<Toaster />
			<div className="w-full max-w-lg p-8 bg-gray-800 shadow-2xl rounded-lg border-2 border-gray-700">
				<h1 className="text-3xl font-bold mb-6 text-center text-green-400">
					Post Your Doubt
				</h1>
				<form onSubmit={sendRequest} className="space-y-6">
					<div>
						<label
							htmlFor="doubt"
							className="block text-sm font-medium text-gray-300 mb-2"
						>
							Write your Doubt:
						</label>
						<textarea
							id="doubt"
							rows="5"
							className="w-full px-3 py-2 border-2 border-dashed border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white resize-none"
							placeholder="Describe your doubt here..."
							onChange={(e) =>
								setDoubt({
									...doubt,
									doubt: e.target.value,
								})
							}
						/>
					</div>
					<div>
						<label
							htmlFor="subject"
							className="block text-sm font-medium text-gray-300 mb-2"
						>
							Select the subject for your doubt:
						</label>
						<select
							id="subject"
							className="w-full px-3 py-2 border-2 border-dashed border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
							onChange={(e) =>
								setDoubt({
									...doubt,
									subject: e.target.value,
								})
							}
						>
							<option value="None">None</option>
							<option value="FSD">FSD</option>
							<option value="Python">Python</option>
							<option value="DM">DM</option>
							<option value="TOC">TOC</option>
							<option value="COA">COA</option>
						</select>
					</div>
					<div>
						<label
							htmlFor="doubtFor"
							className="block text-sm font-medium text-gray-300 mb-2"
						>
							Select where you want to post your doubt:
						</label>
						<select
							id="doubtFor"
							className="w-full px-3 py-2 border-2 border-dashed border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-700 text-white"
							onChange={(e) =>
								setDoubt({
									...doubt,
									doubtFor: e.target.value,
								})
							}
						>
							<option value="None">None</option>
							<option value="All">All</option>
							<option value="Department">Department</option>
							<option value="Batch">Batch</option>
						</select>
					</div>
					<div className="text-center">
						<button
							type="submit"
							className="w-full mt-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition-colors border-2 border-gray-600"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PostDoubt;
