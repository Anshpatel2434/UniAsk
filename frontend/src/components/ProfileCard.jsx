import React from "react";
import ansh from "../assets/anshpatel.jpeg";

const ProfileCard = ({ name, doubts, solutions, batch, branch, upvotes }) => {
  return (
    <div className="bg-gray-900 text-white p-6 md:p-8 rounded-xl shadow-lg w-full md:max-w-xs flex-shrink-0">
      <div className="flex flex-col items-center mb-6">
        <img
          className="w-20 h-20 md:w-32 md:h-32 rounded-full border-white border-2 p-2 flex items-center justify-center mb-4"
          src={ansh}
        />
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold">{name}</h2>
          <p className="text-sm md:text-base text-gray-400">Rank 1,374,477</p>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-4 md:pt-6">
        <h3 className="text-lg md:text-xl font-semibold text-start mb-4">
          Community Stats
        </h3>
        <div className="space-y-4 ml-2 mt-2">
          <div className="text-center flex items-start">
            <i className="bx bx-file text-blue-500 text-base md:text-xl mr-3"></i>
            <div className="text-justify">
              <p className="text-sm md:text-base">
                Doubts : <span className="font-bold">{doubts}</span>
              </p>
            </div>
          </div>
          <div className="text-center flex items-start">
            <i className="bx bx-check-circle text-green-500 text-base md:text-xl mr-3"></i>
            <div className="text-justify">
              <p className="text-sm md:text-base">
                Solution : <span className="font-bold">{solutions}</span>
              </p>
            </div>
          </div>
          <div className="text-center flex items-start">
            <i className="bx bx-like text-cyan-500 text-base md:text-xl mr-3"></i>
            <div className="text-justify">
              <p className="text-sm md:text-base">
                Upvotes : <span className="font-bold">{upvotes}</span>
              </p>
            </div>
          </div>
          <div className="text-center flex items-start">
            <i className="bx bx-star text-yellow-500 text-base md:text-xl mr-3"></i>
            <div className="text-justify">
              <p className="text-sm md:text-base">
                Reputation : <span className="font-bold">0</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-4 md:pt-6 mt-4 md:mt-6">
        <h3 className="text-lg md:text-xl font-semibold text-start mb-6">
          Details
        </h3>
        <div className="text-center flex items-start">
          <i className="bx bx-code-alt text-blue-500 text-base md:text-xl mr-3"></i>
          <div className="text-justify">
            <p className="text-sm md:text-base">
              Branch : <span className="font-bold"> {branch}</span>
            </p>
            <p className="text-xs md:text-sm text-gray-400">
              {branch == "CSE"
                ? "Computer Science & Engineering"
                : branch == "CE"
                ? "Computer Engineering"
                : branch == "IT"
                ? "Information Technology"
                : branch == "CSD"
                ? "Computer Science & Design"
                : branch == "CST"
                ? "Computer Science & Technology"
                : "Artificial Intelligence Markup Language"}
            </p>
          </div>
        </div>
        <div className="text-center flex items-start mt-2">
          <i className="bx bx-group text-green-500 text-base md:text-xl mr-3"></i>
          <div className="text-justify">
            <p className="text-sm md:text-base">
              Batch : <span className="font-bold"> {batch}</span>
            </p>
            <p className="text-xs md:text-sm text-gray-400">
              Academic Year 2022-2026
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
