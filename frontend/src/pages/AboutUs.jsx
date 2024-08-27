import { React, useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import images from "../assets";
import "boxicons";
const AboutUs = () => {
  const [curImageIndex, setImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Sidebar />
      <div className="bg-gray-800 min-h-screen py-16 space-y-32 flex flex-col overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center relative mr-4  w-screen">
          <div className="bg-[#11101d]  w-screen h-auto p-8 flex flex-col items-start space-y-4">
            <h1 className="text-4xl ml-20 lg:text-5xl font-bold text-white lg:w-6/12 mb-4">
              Instant Answers, Tailored Your Curiosity
            </h1>
            <p className="text-gray-300 ml-20 font-light mb-6 w-7/12 lg:w-6/12">
              Get personalized solutions to your academic questions, connect
              with peers and mentors, and boost your learning journey at LJ
              University.
            </p>
            <div className=" items-center justify-center pl-12 lg:px-20 grid grid-cols-2 md:flex md:flex-row my-16">
              {[
                { icon: "bx bxs-book-alt", label: "Books" },
                { icon: "bx bxl-github", label: "GitHub" },
                { icon: "bx bx-code-alt", label: "Code" },
                { icon: "bx bx-user", label: "User" },
              ].map((item, index) => {
                return (
                  <div key={index} className="flex flex-col p-4 items-center">
                    <div className="bg-white rounded-md p-1 lg:p-2 border-white border ">
                      <i className={`${item.icon} text-xl lg:text-3xl`}></i>
                    </div>
                    <p className="text-white font-semibold text-xl mt-2">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="h-72 w-72 lg:w-6/12 hidden lg:block lg:z-10 ml-20 lg:h-96 lg:absolute relative lg:right-0  overflow-hidden">
            {images.map((image, index) => (
              <img
                src={image}
                alt={`studentDoubt${index + 1}`}
                className={`absolute inset-0 w-9/12 h-full lg:translate-x-32 object-contain object-center transition-opacity ease-in-out duration-700 ${
                  index === curImageIndex ? "opacity-100" : "opacity-0"
                }`}
                key={index}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center relative w-full">
          <div className="bg-[#11101d] w-full h-auto lg:h-auto px-4 lg:px-20 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-20">
              <div className="bg-white h-auto rounded-xl text-[#11101d] overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Post a New Doubt</h3>
                  <p className="text-gray-700 text-base">
                    Tailored educational experiences to match your unique
                    learning style and pace. Our AI-driven platform adapts to
                    your needs, ensuring efficient and effective learning.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #DoubtPosting
                  </span>
                </div>
              </div>

              <div className="bg-white h-auto rounded-xl text-[#11101d] overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">Chat Group</h3>
                  <p className="text-gray-700 text-base">
                    Connect with industry professionals and academic experts.
                    Gain insights, advice, and guidance to propel your academic
                    and career growth.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #ChatWith
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #Networking
                  </span>
                </div>
              </div>

              <div className="bg-white h-auto rounded-xl text-[#11101d] overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-2">
                    Collaborative Learning
                  </h3>
                  <p className="text-gray-700 text-base">
                    Engage in peer-to-peer learning communities. Share
                    knowledge, solve problems together, and build a network of
                    like-minded learners.
                  </p>
                </div>
                <div className="px-6 pt-4 pb-2">
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #Community
                  </span>
                  <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                    #TeamWork
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUs;
