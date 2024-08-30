import React, { useState, useContext } from "react";
import Sidebar from "../components/Sidebar";
import UserTable from "../components/UserTable";
import Pagination from "../components/Pagination";
import { useAllStudents } from "../hooks/useAllStudent";

const RegisteredUsersPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [filterOption, setFilterOption] = useState("all");
	const [currentPage, setCurrentPage] = useState(1);
	const [isChangingPage, setIsChangingPage] = useState(false);
	const { students, loading } = useAllStudents();
	console.log(students);

	if (loading) {
		return <div>Loading...</div>;
	}

	var users = [];
	if (students) users = students;
	// const users = [
	// 	// Change the objects used here to the ones we call from database
	// 	...[...Array(50)].map((_, index) => ({
	// 		id: index + 6,
	// 		name: `User ${index + 1}`,
	// 		enroll: `${22002171210000 + index + 1}`,
	// 		dep: ["CSE", "CE", "AIML", "IT", "CST"][Math.floor(Math.random() * 5)],
	// 		yeardiv: "SY", //no need to change this
	// 	})),
	// ];
	const filteredUsers = users.filter((user) => {
		const matchesSearch = user.name
			.toLowerCase()
			.includes(searchTerm.toLowerCase());
		const matchesFilter =
			filterOption === "all" ||
			(filterOption === "CSE" && user.branch == "CSE") ||
			(filterOption === "CE" && user.branch == "CE") ||
			(filterOption === "IT" && user.branch == "IT") ||
			(filterOption === "AIML" && user.branch == "AIML") ||
			(filterOption === "CST" && user.branch == "CST");
		return matchesSearch && matchesFilter;
	});

	const usersPerPage = 10; // If u want change the number of user per page to be displayed here
	const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
	const startIndex = (currentPage - 1) * usersPerPage;
	const endIndex = startIndex + usersPerPage;
	const currentUsers = filteredUsers.slice(startIndex, endIndex);

	const handlePageChange = (pageNumber) => {
		setIsChangingPage(true);
		setTimeout(() => {
			setCurrentPage(pageNumber);
			setIsChangingPage(false);
			window.scrollTo(0, 0);
		}, 300); // This should match the transition duration in UserTable
	};
	return (
		<div className="flex flex-col min-h-screen bg-gray-800">
			<Sidebar />

			<div className="flex-1 p-4 sm:p-8">
				<div className="w-9/12 ml-20 sm:mx-20 lg:mx-auto bg-gray-900 shadow-2xl rounded-lg border border-[#2e2c4e] p-4 sm:p-8">
					<h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-white">
						Registered Users
					</h1>
					<div className="mb-4 sm:mb-6 flex flex-col sm:flex-row gap-4">
						<input
							type="text"
							placeholder="Search users..."
							className="w-full sm:flex-grow px-3 py-2 border-2 border-[#2e2c4e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e4b73] bg-[#1d1b31] text-white"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<select
							className="w-full sm:w-auto px-2 py-2 border-2 border-[#2e2c4e] rounded-md focus:outline-none focus:ring-2 focus:ring-[#4e4b73] bg-[#1d1b31] text-white"
							value={filterOption}
							onChange={(e) => setFilterOption(e.target.value)}
						>
							<option value="all">All</option>
							<option value="CSE">CSE</option>
							<option value="CE">CE</option>
							<option value="IT">IT</option>
							<option value="CST">CST</option>
						</select>
					</div>

					<UserTable users={currentUsers} isChangingPage={isChangingPage} />

					{filteredUsers.length === 0 ? (
						<p className="text-center text-gray-400 mt-4">
							No users found matching your criteria.
						</p>
					) : (
						<Pagination
							currentPage={currentPage}
							totalPages={totalPages}
							onPageChange={handlePageChange}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default RegisteredUsersPage;
