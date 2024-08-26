import React from "react";
import ProfileCard from "../components/ProfileCard";
import StatsCard from "../components/StatsCard";
import StatsCard1 from "../components/StatsCard1";
import StatsCard2 from "../components/StatsCard2";
import Sidebar from "../components/Sidebar";
import HeatMap from "../components/HeatMap";

const Dashboard = () => {
  return (
    <div className="bg-gray-800">
      <Sidebar />
      <div className="flex justify-center min-h-screen bg-gray-800 p-4 ml-[4rem] sm:ml-24 md:ml-20 lg:ml-1">
        <div className="flex flex-col md:flex-row justify-center items-start bg-gray-800 rounded-xl p-6 max-w-6xl w-full mx-auto space-y-4 md:space-y-0 md:space-x-8">
          {/* Profile Card */}
          <div className="w-full md:w-1/3 lg:w-1/4 flex-shrink-0 mr-8">
            <ProfileCard />
          </div>

          {/* Stats and Text Area */}
          <div className="w-full md:w-2/3 lg:w-3/4 flex flex-col justify-between">
            {/* Stats Cards at the top */}
            <div className="flex flex-wrap sm:flex-nowrap items-start gap-2 mb-4">
              <StatsCard />
              <StatsCard1 />
              <StatsCard2 />
            </div>

            {/* Heatmap Area */}
            <HeatMap />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
