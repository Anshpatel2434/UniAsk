import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThumbsUp, ThumbsDown, User, Calendar, ArrowLeft } from "lucide-react";
import { useSolution } from "../hooks/useSolution";
import Sidebar from "./Sidebar";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import Loading from "./Loading";

const SolutionInfo = () => {
  const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
  const { solution_id } = useParams();
  const { solution, loading } = useSolution({ solution_id });
  const navigate = useNavigate();

  const { user } = useContext(AppContext);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  useEffect(() => {
    if (user && solution.votes) {
      const foundVote = solution.votes.find(
        (vote) => vote.votedBy.id === user.id
      );

      if (foundVote) {
        if (foundVote.type === "UP") setUpVote(true);
        if (foundVote.type === "DOWN") setDownVote(true);
      }
    }
  }, [loading, solution.votes, user.id]);

  async function handleVote(type) {
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/v1/vote/postVote`,
        {
          solution_id: solution.id,
          type: type,
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.status == 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-[5rem] sm:pl-[5rem]">
        <div className="max-w-4xl mx-auto w-full px-4 py-8">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Doubt
          </button>
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-white mb-4">Solution</h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {solution.solution}
              </p>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    className={`p-2 rounded-full ${
                      upVote ? "bg-green-600" : "bg-gray-700 hover:bg-gray-600"
                    } transition-colors duration-300`}
                    disabled={upVote}
                    onClick={() => handleVote("UP")}
                  >
                    <ThumbsUp size={20} className="text-white" />
                  </button>
                  <span className="text-xl font-bold text-white">
                    {solution.upvotes}
                  </span>
                  <button
                    className={`p-2 rounded-full ${
                      downVote ? "bg-red-600" : "bg-gray-700 hover:bg-gray-600"
                    } transition-colors duration-300`}
                    disabled={downVote}
                    onClick={() => handleVote("DOWN")}
                  >
                    <ThumbsDown size={20} className="text-white" />
                  </button>
                </div>
                <div className="flex items-center text-gray-400">
                  <Calendar size={20} className="mr-2" />
                  <span>
                    {new Date(solution.postedOn).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <div
                  className="flex items-center cursor-pointer hover:text-blue-400 transition-colors duration-300"
                  onClick={() => navigate(`/dashboard/${solution.postedBy.id}`)}
                >
                  <User size={20} className="mr-2" />
                  <span>Posted by: {solution.postedBy.name}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionInfo;
