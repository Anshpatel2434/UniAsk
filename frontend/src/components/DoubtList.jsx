import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileText, CheckCircle, ChevronRight } from "lucide-react";

const DoubtList = ({ doubts, solutions }) => {
  const navigate = useNavigate();
  const [showDoubts, setShowDoubts] = useState(true);

  return (
    <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden max-h-[80vh] mt-10 p-6">
      <div className="sticky top-0 bg-gray-800 p-4 z-10">
        <div className="flex items-center justify-between">
          {showDoubts ? (
            <div className="flex items-center text-white">
              <FileText size={20} className="mr-2" />
              <span className="text-lg font-medium">Doubts</span>
            </div>
          ) : (
            <div className="flex items-center text-white">
              <CheckCircle size={20} className="mr-2" />
              <span className="text-lg font-medium">Solutions</span>
            </div>
          )}
          <button
            onClick={() => setShowDoubts(!showDoubts)}
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-all duration-300"
          >
            <span className="mr-2">
              Switch to {showDoubts ? "Solutions" : "Doubts"}
            </span>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="overflow-y-auto max-h-[calc(80vh-64px)]">
        {showDoubts
          ? doubts.map((problem, index) => (
              <div
                key={index}
                className="bg-gray-800 hover:bg-gray-700 p-4 mb-2 cursor-pointer transition-all duration-300"
                onClick={() => navigate(`/doubt/${problem.id}`)}
              >
                <h2 className="text-lg font-medium text-white mb-2">
                  {problem.doubt.substring(
                    0,
                    Math.min(problem.doubt.length, 80)
                  )}
                  {problem.doubt.length > 80 ? "..." : ""}
                </h2>
                <p className="text-sm text-gray-400">
                  Posted on: {problem.postedOn.split("T")[0]}
                </p>
              </div>
            ))
          : solutions.map((problem, index) => (
              <div
                key={index}
                className="bg-gray-800 hover:bg-gray-700 p-4 mb-2 cursor-pointer transition-all duration-300"
                onClick={() => navigate(`/solution/${problem.id}`)}
              >
                <h2 className="text-lg font-medium text-white mb-2">
                  {problem.solution.substring(
                    0,
                    Math.min(problem.solution.length, 80)
                  )}
                  {problem.solution.length > 80 ? "..." : ""}
                </h2>
                <p className="text-sm text-gray-400">
                  Posted on: {problem.postedOn.split("T")[0]}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DoubtList;
