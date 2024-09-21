import React, { useContext, useState, useEffect } from "react";
import { useAllDoubts } from "../hooks/useAllDoubts";
import Sidebar from "../components/Sidebar";
import { AppContext } from "../context/AppContext";
import DoubtBar from "../components/DoubtBar";
import { Search, Filter } from "lucide-react";

const AllDoubt = () => {
  const { doubts, loading } = useAllDoubts();
  const { user } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("None");
  const [doubtFor, setDoubtFor] = useState("None");
  const [doubtsArray, setDoubtsArray] = useState([]);

  useEffect(() => {
    if (doubts && doubts.length > 0) {
      setDoubtsArray(doubts);
      applyFilter();
    }
  }, [doubts, loading]);

  function applyFilter() {
    let filteredDoubts = doubts;

    if (search !== "None") {
      filteredDoubts = filteredDoubts.filter((doubt) => {
        const includesSearch = doubt.doubt
          .toLowerCase()
          .includes(search.toLowerCase());
        return includesSearch;
      });
    }

    if (subject !== "None") {
      filteredDoubts = filteredDoubts.filter(
        (doubt) => doubt.subject === subject
      );
    }

    if (doubtFor === "All") {
      filteredDoubts = filteredDoubts.filter(
        (doubt) => doubt.doubtFor === "All"
      );
    } else if (doubtFor === "Department") {
      filteredDoubts = filteredDoubts.filter(
        (doubt) => doubt.doubtFor === user.dep
      );
    } else if (doubtFor === "Batch") {
      filteredDoubts = filteredDoubts.filter(
        (doubt) => doubt.doubtFor === user.batch
      );
    }

    filteredDoubts = filteredDoubts.sort((a, b) => {
      const dateA = new Date(a.postedOn);
      const dateB = new Date(b.postedOn);
      return dateB - dateA;
    });

    setDoubtsArray(filteredDoubts);
  }

  return (
    <div className="flex bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col pl-[5rem] sm:pl-[5rem]">
        <div className="fixed top-0 left-[5rem] sm:left-[5rem] right-0 z-10 bg-gray-800 bg-opacity-90 backdrop-blur-md p-4 shadow-lg">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Doubts
            </h1>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex-grow relative">
                <input
                  type="text"
                  className="w-full px-4 py-2 pr-10 rounded-full bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Search doubts..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Search
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
              <select
                className="px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              >
                <option value="None">All Subjects</option>
                <option value="FSD">FSD</option>
                <option value="Python">Python</option>
                <option value="DM">DM</option>
                <option value="TOC">TOC</option>
                <option value="COA">COA</option>
              </select>
              <select
                className="px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={doubtFor}
                onChange={(e) => setDoubtFor(e.target.value)}
              >
                <option value="None">All Doubts</option>
                <option value="All">General</option>
                <option value="Department">My Department</option>
                <option value="Batch">My Batch</option>
              </select>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors flex items-center"
                onClick={applyFilter}
              >
                <Filter size={18} className="mr-2" />
                Apply Filter
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-80 sm:mt-56 md:mt-48 mb-8 overflow-y-auto px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          {loading ? (
            <div className="text-white text-center mt-8">Loading...</div>
          ) : doubtsArray.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {doubtsArray.map((doubt, index) => (
                <DoubtBar doubt={doubt} key={index} />
              ))}
            </div>
          ) : (
            <div className="text-white text-center mt-8">No doubts found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllDoubt;
