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
