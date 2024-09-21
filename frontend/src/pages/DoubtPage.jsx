import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDoubt } from "../hooks/useDoubts";
import Sidebar from "../components/Sidebar";
import SolutionBar from "../components/SolutionBar";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
import { MessageCircle, Calendar, User, Book, Send } from "lucide-react";

const DoubtPage = () => {
  const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
  const { doubt_id } = useParams();
  const { doubt, loading } = useDoubt({ doubt_id });
  const [read, setRead] = useState(false);
  const navigate = useNavigate();
  const [currentSolution, setCurrentSolution] = useState("");

  let studentDetails;
  let solutions;
  let formattedDate;

  if (!loading && doubt) {
    studentDetails = doubt.postedBy;
    solutions = doubt.solutions;
    solutions.sort((a, b) => b.upvotes - a.upvotes);
    formattedDate = new Date(doubt.postedOn).toLocaleDateString();
  }

  async function postSolution() {
    const res = await axios.post(
      `${BACKEND_URL}/api/v1/solution/postSolution/${doubt_id}`,
      {
        solution: currentSolution,
      },
      {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.data.status === 200) {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  if (loading) return <Loading />;

  return (
    <div className="flex bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <Toaster />
      <div className="mr-20">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="fixed top-0 left-20 right-0 z-10 bg-gray-800 bg-opacity-90 backdrop-blur-md p-4 shadow-lg">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
              {doubt.subject}
            </h1>
            <div className="flex flex-wrap justify-between items-center text-sm text-gray-300 mb-4">
              <div className="flex items-center mr-4">
                <Book size={16} className="mr-2" />
                <span>Doubt For: {doubt.doubtFor}</span>
              </div>
              <div className="flex items-center mr-4">
                <Calendar size={16} className="mr-2" />
                <span>Posted On: {formattedDate}</span>
              </div>
              <div
                className="flex items-center cursor-pointer text-blue-400 hover:text-blue-300"
                onClick={() => navigate(`/dashboard/${studentDetails.id}`)}
              >
                <User size={16} className="mr-2" />
                <span>Posted by: {studentDetails.name}</span>
              </div>
            </div>
            <div className="text-white bg-gray-700 p-4 rounded-lg">
              <p className="text-sm sm:text-base">
                {read ? doubt.doubt : `${doubt.doubt.substring(0, 200)}...`}
                <button
                  className="ml-2 text-blue-400 hover:text-blue-300"
                  onClick={() => setRead(!read)}
                >
                  {read ? "Read Less" : "Read More"}
                </button>
              </p>
            </div>
            <button
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition-colors flex items-center"
              onClick={() => navigate(`/chat/doubt_${doubt_id}`)}
            >
              <MessageCircle size={18} className="mr-2" />
              Go to Chatroom Discussion
            </button>
          </div>
        </div>

        <div className="flex-1 mt-64 mb-24 overflow-y-auto px-4 max-w-6xl mx-auto w-full">
          {loading ? (
            <div className="text-white text-center">Loading solutions...</div>
          ) : solutions.length > 0 ? (
            <div className="space-y-6 mt-24 sm:mt-0 mb-10">
              {solutions.map((solution, index) => (
                <SolutionBar solution={solution} key={index} />
              ))}
            </div>
          ) : (
            <div className="text-white text-center">No Solution Exists</div>
          )}
        </div>

        <div className="fixed bottom-0 left-20 right-0 bg-gray-800 bg-opacity-90 backdrop-blur-md p-4 shadow-lg ">
          <div className="max-w-6xl mx-auto flex items-center space-x-4">
            <textarea
              className="flex-1 p-3 rounded-lg bg-gray-700 text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your solution here..."
              rows="2"
              onChange={(e) => setCurrentSolution(e.target.value)}
            ></textarea>
            <button
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              onClick={postSolution}
            >
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoubtPage;
