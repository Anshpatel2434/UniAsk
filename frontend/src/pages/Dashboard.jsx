import React from "react";
import ProfileCard from "../components/ProfileCard";
import StatsCard from "../components/StatsCard";
import StatsCard1 from "../components/StatsCard1";
import StatsCard2 from "../components/StatsCard2";
import Sidebar from "../components/Sidebar";
import HeatMap from "../components/HeatMap";
import DoubtList from "../components/DoubtList";
import { useStudent } from "../hooks/useStudent";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const Dashboard = () => {
	const response = {
		status: 200,
		student: {
			id: 69,
			dep: "CE/IT-2",
			branch: "CSE",
			roll_no: "50",
			enr_no: "22002171210103",
			batch: "B2",
			name: "PATEL ANSH AJAYKUMAR",
			noOfDoubts: 5,
			noOfSolutions: 6,
			noOfUpvotes: 6,
			doubts: [
				{
					id: 1,
					subject: "FSD",
					doubt:
						"First doubt - Full Stack Development (FSD) involves building both the front-end and back-end of web applications, requiring skills in multiple technologies like HTML, CSS, JavaScript, databases, and server-side languages. Full Stack Development (FSD) involves building both the front-end and back-end of web applications, requiring skills in multiple technologies like HTML, CSS, JavaScript, databases, and server-side languages. Full Stack Development (FSD) involves building both the front-end and back-end of web applications, requiring skills in multiple technologies like HTML, CSS, JavaScript, databases, and server-side languages.",
					postedBy: 69,
					postedOn: "2024-08-20T18:08:56Z",
					doubtFor: "B2",
				},
				{
					id: 2,
					subject: "Python",
					doubt: "Second Doubt",
					postedBy: 69,
					postedOn: "2024-08-20T18:21:32.083694Z",
					doubtFor: "B2",
				},
				{
					id: 3,
					subject: "DM",
					doubt: "Third Doubt",
					postedBy: 69,
					postedOn: "2024-08-20T18:38:16.564001Z",
					doubtFor: "CE/IT-2",
				},
				{
					id: 4,
					subject: "TOC",
					doubt: "Third Doubt from frontend",
					postedBy: 69,
					postedOn: "2024-08-20T19:17:27.267166Z",
					doubtFor: "All",
				},
				{
					id: 5,
					subject: "TOC",
					doubt: "Fourth doubt by me",
					postedBy: 69,
					postedOn: "2024-08-21T15:27:04.959557Z",
					doubtFor: "B2",
				},
			],
			solutions: [
				{
					id: 1,
					doubt: 1,
					solution:
						"First solution for first doubt.  Full Stack Development (FSD) involves building both the front-end and back-end of web applications, requiring skills in multiple technologies like HTML, CSS, JavaScript, databases, and server-side languages.  Full Stack Development (FSD) involves building both the front-end and back-end of web applications, requiring skills in multiple technologies like HTML, CSS, JavaScript, databases, and server-side languages. Full Stack Development (FSD) involves building both the front-end and back-end of web applications, requiring skills in multiple technologies like HTML, CSS, JavaScript, databases, and server-side languages.",
					postedBy: 69,
					postedOn: "2024-08-24T18:40:14Z",
					upvotes: 0,
				},
				{
					id: 2,
					doubt: 1,
					solution:
						"Second solution for first doubt.  Full Stack Development (FSD) involves building both the front-end and back-end of web applications, requiring skills in multiple technologies like HTML, CSS, JavaScript, databases, and server-side languages.  Full Stack Development (FSD) involves building both the front-end and back-end of web applications, requiring skills in multiple technologies like HTML, CSS, JavaScript, databases, and server-side languages. Full Stack Development (FSD) involves building both the front-end and back-end of web applications, requiring skills in multiple technologies like HTML, CSS, JavaScript, databases, and server-side languages.",
					postedBy: 69,
					postedOn: "2024-08-25T11:57:08Z",
					upvotes: 1,
				},
				{
					id: 5,
					doubt: 1,
					solution: "Fifth solution from frontend",
					postedBy: 69,
					postedOn: "2024-08-25T13:28:45.627993Z",
					upvotes: 1,
				},
				{
					id: 6,
					doubt: 1,
					solution: "Sixth Solution from frontend",
					postedBy: 69,
					postedOn: "2024-08-25T13:29:44.403519Z",
					upvotes: 1,
				},
				{
					id: 7,
					doubt: 1,
					solution: "Seventh Solution from frontend",
					postedBy: 69,
					postedOn: "2024-08-25T13:34:37.053322Z",
					upvotes: 1,
				},
				{
					id: 8,
					doubt: 2,
					solution: "First solution for python",
					postedBy: 69,
					postedOn: "2024-08-26T16:05:50.895188Z",
					upvotes: 1,
				},
			],
		},
	};

	const { student_id } = useParams();
	const { student, loading } = useStudent({ student_id });

	const data = student;
	return (
		<div className="bg-gray-800">
			{loading ? (
				<Loading />
			) : (
				<div className="flex justify-center min-h-screen bg-gray-800 p-4 ml-[4rem] sm:ml-24 md:ml-20 lg:ml-1">
					<Sidebar />
					<div className="flex flex-col md:flex-row justify-center items-start bg-gray-800 rounded-xl p-6 max-w-6xl w-full mx-auto space-y-4 md:space-y-0 md:space-x-8">
						{/* Profile Card */}
						<div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 mr-8">
							<ProfileCard
								name={data.name}
								doubts={data.noOfDoubts}
								solutions={data.noOfSolutions}
								branch={data.branch}
								batch={data.batch}
								upvotes={data.noOfUpvotes}
								gender={data.gender}
								student_id={student_id}
							/>
						</div>

						{/* Stats and Text Area */}
						<div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-between">
							{/* Stats Cards at the top */}
							<div className="flex flex-wrap sm:flex-nowrap items-start gap-2 mb-4">
								<StatsCard doubts={data.noOfDoubts} dob={data.doubts} />
								<StatsCard1
									solutions={data.noOfSolutions}
									sol={data.solutions}
								/>
								<StatsCard2 upvotes={data.noOfUpvotes} sol={data.solutions} />
							</div>

							{/* Heatmap Area */}
							<HeatMap doubts={data.doubts} solutions={data.solutions} />

							<DoubtList doubts={data.doubts} solutions={data.solutions} />
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Dashboard;
