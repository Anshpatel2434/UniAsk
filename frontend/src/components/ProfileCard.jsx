import React from "react";

const ProfileCard = () => {
  return (
    <div className="bg-gray-900 text-white p-6 md:p-8 rounded-xl shadow-lg w-full md:max-w-xs flex-shrink-0">
      <div className="flex flex-col items-center mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gray-700 flex items-center justify-center mb-4">
          <i className="bx bx-user text-xl md:text-3xl"></i>
        </div>
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-bold">Siddhant_Kotak</h2>
          <p className="text-sm md:text-base text-gray-400">Rank 1,374,477</p>
        </div>
      </div>
      <div className="border-t border-gray-800 pt-4 md:pt-6">
        <h3 className="text-lg md:text-xl font-semibold text-start mb-4">
          Community Stats
        </h3>
        <div className="space-y-4 ml-2 mt-2">
          <div className="text-center flex items-start">
            <i className="bx bx-show-alt text-blue-500 text-base md:text-xl mr-3"></i>
            <div className="text-justify">
              <p className="text-sm md:text-base">
                Views <span className="font-bold">0</span>
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                Last week <span className="font-bold">0</span>
              </p>
            </div>
          </div>
          <div className="text-center flex items-start">
            <i className="bx bx-check-circle text-green-500 text-base md:text-xl mr-3"></i>
            <div className="text-justify">
              <p className="text-sm md:text-base">
                Solution <span className="font-bold">0</span>
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                Last week <span className="font-bold">0</span>
              </p>
            </div>
          </div>
          <div className="text-center flex items-start">
            <i className="bx bx-chat text-cyan-500 text-base md:text-xl mr-3"></i>
            <div className="text-justify">
              <p className="text-sm md:text-base">
                Discuss <span className="font-bold">0</span>
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                Last week <span className="font-bold">0</span>
              </p>
            </div>
          </div>
          <div className="text-center flex items-start">
            <i className="bx bx-star text-yellow-500 text-base md:text-xl mr-3"></i>
            <div className="text-justify">
              <p className="text-sm md:text-base">
                Reputation <span className="font-bold">0</span>
              </p>
              <p className="text-xs md:text-sm text-gray-400">
                Last week <span className="font-bold">0</span>
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
              Branch : <span className="font-bold"> CSE</span>
            </p>
            <p className="text-xs md:text-sm text-gray-400">
              Computer Science & Engineering
            </p>
          </div>
        </div>
        <div className="text-center flex items-start mt-2">
          <i className="bx bx-group text-green-500 text-base md:text-xl mr-3"></i>
          <div className="text-justify">
            <p className="text-sm md:text-base">
              Batch : <span className="font-bold"> B2</span>
            </p>
            <p className="text-xs md:text-sm text-gray-400">
              Academic Year 2023-2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
