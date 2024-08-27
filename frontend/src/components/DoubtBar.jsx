import React from "react";
import { useNavigate } from "react-router-dom";

const DoubtBar = ({ doubt }) => {
	const navigate = useNavigate();
	const formattedDate = doubt.postedOn.split("T")[0];

	return (
		<div className="relative bg-gray-800 text-white rounded-lg shadow-md p-3 flex flex-col h-auto max-w-full md:h-40 hover:bg-gray-700 transition-colors duration-300">
			{/* Subject */}
			<div className="text-lg font-semibold text-blue-400 mb-2">
				{doubt.subject}
			</div>

			{/* Doubt Text */}
			<div
				className="flex-1 overflow-hidden text-sm hover:scale-[101%] hover:cursor-pointer transition-transform duration-300 hover:bg-[#4169E1]"
				onClick={() => navigate(`/doubt/${doubt.id}`)}
			>
				{doubt.doubt.substring(0, 200)}...
			</div>

			{/* Divider */}
			<div className="border-t border-gray-600 my-2"></div>

			{/* Additional Information */}
			<div className="flex justify-between items-center text-xs">
				<div className="text-gray-400">
					Doubt For:{" "}
					<span className="font-medium text-green-300">{doubt.doubtFor}</span>
				</div>
				<div className="text-gray-400">
					Posted On: <span className="font-medium">{formattedDate}</span>
				</div>
			</div>
		</div>
	);
};

export default DoubtBar;
