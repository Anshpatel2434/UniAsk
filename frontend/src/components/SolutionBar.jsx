import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ThumbsUp,
  ThumbsDown,
  User,
  Calendar,
  ChevronRight,
} from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";

const SolutionBar = ({ solution }) => {
  const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
  const { user, loading } = useContext(AppContext);
  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);
  const navigate = useNavigate();
  const formattedDate = solution.postedOn.split("T")[0];

  useEffect(() => {
    if (!loading && solution.votes) {
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

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
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
            <span className="text-lg font-bold text-white">
              {solution.upvotes || 0}
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
            <Calendar size={16} className="mr-2" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <div
          className="text-white mb-4 cursor-pointer hover:text-blue-400 transition-colors duration-300"
          onClick={() => navigate(`/solution/${solution.id}`)}
        >
          {solution.solution.substring(0, 350)}...
        </div>
        <div className="flex justify-between items-center text-sm text-gray-400">
          <div
            className="flex items-center cursor-pointer hover:text-blue-400 transition-colors duration-300"
            onClick={() => navigate(`/dashboard/${solution.postedBy.id}`)}
          >
            <User size={16} className="mr-2" />
            <span>Posted by: {solution.postedBy.name}</span>
          </div>
          <button
            className="flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300"
            onClick={() => navigate(`/solution/${solution.id}`)}
          >
            <span className="mr-2">View Full Solution</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionBar;
