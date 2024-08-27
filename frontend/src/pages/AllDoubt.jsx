import React, { useContext, useState, useEffect } from "react";
import { useAllDoubts } from "../hooks/useAllDoubts";
import Sidebar from "../components/Sidebar";
import { AppContext } from "../context/AppContext";
import DoubtBar from "../components/DoubtBar";

const AllDoubt = () => {
	const { doubts, loading } = useAllDoubts();
	const { user } = useContext(AppContext);
	const [search, setSearch] = useState("");
	const [subject, setSubject] = useState("None");
	const [doubtFor, setDoubtFor] = useState("None");
	const [doubtsArray, setDoubtsArray] = useState([]);

	useEffect(() => {
		if (doubts && doubts.length > 0) {
			setDoubtsArray(doubts);
			applyFilter();
			console.log(doubts);
		}
	}, [doubts, loading]);

	function applyFilter() {
		let filteredDoubts = doubts;

		if (search !== "None") {
			filteredDoubts = filteredDoubts.filter((doubt) => {
				const includesSearch = doubt.doubt
					.toLowerCase()
					.includes(search.toLowerCase());
				return includesSearch;
			});
		}

		if (subject !== "None") {
			filteredDoubts = filteredDoubts.filter(
				(doubt) => doubt.subject === subject
			);
		}

		if (doubtFor === "All") {
			filteredDoubts = filteredDoubts.filter(
				(doubt) => doubt.doubtFor === "All"
			);
		} else if (doubtFor === "Department") {
			filteredDoubts = filteredDoubts.filter(
				(doubt) => doubt.doubtFor === user.dep
			);
		} else if (doubtFor === "Batch") {
			filteredDoubts = filteredDoubts.filter(
				(doubt) => doubt.doubtFor === user.batch
			);
		}

		// Sort filtered doubts by date in descending order
		filteredDoubts = filteredDoubts.sort((a, b) => {
			const dateA = new Date(a.postedOn);
			const dateB = new Date(b.postedOn);
			return dateB - dateA; // Latest first
		});

		setDoubtsArray(filteredDoubts);
	}

	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 flex flex-col bg-gray-900 text-white min-h-screen pl-[5rem] sm:pl-[5rem]">
				{/* Header Section */}
				<div className="fixed top-0 left-[5rem] sm:left-[5rem] right-0 z-10 bg-gray-800 p-[0.5rem] sm:p-[1rem] shadow-md">
					<div className="flex flex-col space-y-[0.5rem] sm:space-y-[1rem]">
						<h1 className="text-[1rem] sm:text-[1.5rem] font-bold">
							All Doubts
						</h1>

						{/* Header section for search and filters */}
						<div className="flex flex-wrap gap-[0.5rem] items-center">
							{/* Search bar */}
							<input
								type="text"
								className="flex-grow px-[0.5rem] py-[0.25rem] sm:px-[1rem] sm:py-[0.5rem] border-2 border-[#2e2c4e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e4b73] bg-[#1d1b31] text-white text-xs sm:text-sm"
								placeholder="Search doubts..."
								value={search}
								onChange={(e) => setSearch(e.target.value)}
							/>

							{/* Dropdown for subject filter */}
							<select
								className="px-[0.5rem] py-[0.25rem] sm:px-[1rem] sm:py-[0.5rem] border-2 border-[#2e2c4e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e4b73] bg-[#1d1b31] text-white text-xs sm:text-sm"
								value={subject}
								onChange={(e) => setSubject(e.target.value)}
							>
								<option value="None">None</option>
								<option value="FSD">FSD</option>
								<option value="Python">Python</option>
								<option value="DM">DM</option>
								<option value="TOC">TOC</option>
								<option value="COA">COA</option>
							</select>

							{/* Dropdown for doubtFor filter */}
							<select
								className="px-[0.5rem] py-[0.25rem] sm:px-[1rem] sm:py-[0.5rem] border-2 border-[#2e2c4e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e4b73] bg-[#1d1b31] text-white text-xs sm:text-sm"
								value={doubtFor}
								onChange={(e) => setDoubtFor(e.target.value)}
							>
								<option value="None">None</option>
								<option value="All">All</option>
								<option value="Department">My Department</option>
								<option value="Batch">My Batch</option>
							</select>

							{/* Button to apply filters */}
							<button
								className="px-[0.5rem] py-[0.75rem] sm:px-[1rem] sm:py-[0.5rem] bg-[#2e2c4e] text-white rounded-md hover:bg-[#4e4b73] transition-colors text-xs sm:text-sm"
								onClick={applyFilter}
							>
								Apply Filter
							</button>
						</div>
					</div>
				</div>

				{/* Doubts Section */}
				<div className="flex-1 mt-[6rem] sm:mt-[8rem] mb-[4rem] sm:mb-[6rem] overflow-y-auto p-[0.5rem] sm:p-[1rem]">
					{loading ? (
						<div className="text-xs sm:text-sm">Loading...</div>
					) : doubtsArray.length > 0 ? (
						<div className="space-y-[1rem] sm:space-y-[1rem]">
							{doubtsArray.map((doubt, index) => (
								<DoubtBar doubt={doubt} key={index} />
							))}
						</div>
					) : (
						<div className="text-xs sm:text-sm mt-6">No doubts found.</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default AllDoubt;
