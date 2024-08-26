import React, { useState } from "react";

const DoubtList = ({ doubts, solutions }) => {
  const [on, setOn] = useState(true);
  return (
    <div className="bg-gray-900 rounded-md max-h-80 mt-10 overflow-y-scroll no-scrollbar relative">
      <div className="flex items-center justify-between mb-3 sticky top-0 p-4 bg-gray-900 z-10">
        {on ? (
          <div className="flex items-center justify-center">
            <i
              className="bx bx-file"
              style={{ width: "20px", height: "20px", color: "white" }}
            ></i>
            <span className="ml-1 mt-[-0.2rem] text-md font-medium text-white">
              Doubts
            </span>
          </div>
        ) : (
          <div className="flex items-center">
            <i
              className="bx bx-check-circle"
              style={{ width: "20px", height: "20px", color: "white" }}
            ></i>
            <span className="ml-1 mt-[-0.2rem] text-md font-medium text-white">
              Solutions
            </span>
          </div>
        )}
        {on ? (
          <div className="flex items-center gap-4 justify-center">
            <span className="font-semibold text-green-500">change to</span>
            <button
              onClick={() => setOn(!on)}
              className="flex items-center bg-gray-800 text-white text-sm md:text-base px-2 py-1 rounded-lg shadow hover:bg-gray-700 transition-all duration-300"
            >
              <i className="bx bx-check-circle text-green-500 text-lg md:text-xl mr-2 md:mr-3"></i>
              <span className="text-sm md:text-base font-medium">
                Solutions
              </span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 justify-center">
            <span className="font-semibold text-blue-500">change to</span>
            <button
              onClick={() => setOn(!on)}
              className="flex items-center bg-gray-800 text-white text-sm md:text-base px-2 py-1 rounded-lg shadow hover:bg-gray-700 transition-all duration-300"
            >
              <i className="bx bx-file text-blue-500 text-lg md:text-xl mr-2 md:mr-3"></i>
              <span className="text-sm md:text-base font-medium">Doubts</span>
            </button>
          </div>
        )}
      </div>
      <div className="p-4 mt-[-1.5rem]">
        {on
          ? doubts.map((problem, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-md p-4 mb-2 cursor-pointer"
              >
                <h2 className="text-base sm:text-lg font-medium text-white">
                  {problem.doubt.substring(
                    0,
                    Math.min(problem.doubt.length, 80)
                  )}
                  {problem.doubt.length > 80 ? "..." : ""}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  {problem.postedOn.split("T")[0]}
                </p>
              </div>
            ))
          : solutions.map((problem, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-md p-4 mb-2 cursor-pointer"
              >
                <h2 className="text-base sm:text-lg font-medium text-white">
                  {problem.solution.substring(
                    0,
                    Math.min(problem.solution.length, 80)
                  )}
                  {problem.solution.length > 80 ? "..." : ""}
                </h2>
                <p className="text-xs sm:text-sm text-gray-400">
                  {problem.postedOn.split("T")[0]}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default DoubtList;
