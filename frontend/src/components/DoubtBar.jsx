import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Book } from "lucide-react";

const DoubtBar = ({ doubt }) => {
	const navigate = useNavigate();
	const formattedDate = doubt.postedOn.split("T")[0];

	return (
		<div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
			<div className="p-5">
				{/* Subject */}
				<h3 className="text-xl font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
					{doubt.subject}
				</h3>

				{/* Doubt Text */}
				<div
					className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 hover:line-clamp-none cursor-pointer transition-all duration-300"
					onClick={() => navigate(`/doubt/${doubt.id}`)}
				>
					{doubt.doubt}
				</div>

				{/* Additional Information */}
				<div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
					<div className="flex items-center">
						<Book size={16} className="mr-2" />
						<span>Doubt For: </span>
						<span className="font-medium text-indigo-600 dark:text-indigo-400 ml-1">
							{doubt.doubtFor}
						</span>
					</div>
					<div className="flex items-center">
						<Calendar size={16} className="mr-2" />
						<span>Posted: </span>
						<span className="font-medium ml-1">{formattedDate}</span>
					</div>
				</div>
			</div>
			<div className="bg-indigo-50 dark:bg-indigo-900 p-3 text-center">
				<button
					onClick={() => navigate(`/doubt/${doubt.id}`)}
					className="text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-300"
				>
					View Details
				</button>
			</div>
		</div>
	);
};

export default DoubtBar;
