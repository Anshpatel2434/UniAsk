import { React, useContext, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import images from "../assets";
import "boxicons";
const AboutUs = () => {
	const [curImageIndex, setImageIndex] = useState(0);
	useEffect(() => {
		window.location.reload();
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
							{[
								{
									title: "Post a New Doubt",
									msg:
										"Share your academic questions and challenges. Get expert answers and peer insights to overcome obstacles in your learning journey.",
									hashMsg1: "#DoubtClearing",
									hashMsg2: "#AskExperts",
								},
								{
									title: "Chat Rooms",
									msg:
										"Join topic-specific chat rooms to discuss ideas, share knowledge, and connect with peers and professionals in your field of interest.",
									hashMsg1: "#LiveDiscussions",
									hashMsg2: "#KnowledgeExchange",
								},
								{
									title: "Collaborative Learning",
									msg:
										"Engage in peer-to-peer learning communities. Share knowledge, solve problems together, and build a network of like-minded learners.",
									hashMsg1: "#TeamLearning",
									hashMsg2: "#PeerSupport",
								},
								{
									title: "LeaderBoard",
									msg:
										"Climb the ranks and showcase your expertise. Compete with peers, earn recognition, and track your progress in various subject areas.",
									hashMsg1: "#AcademyAchievement",
									hashMsg2: "#SkillShowcase",
								},
								{
									title: "Track Your Progress",
									msg:
										"Monitor your learning journey with detailed analytics. Set goals, visualize improvements, and celebrate milestones as you advance your skills.",
									hashMsg1: "#LearningAnalytics",
									hashMsg2: "#GrowthTracker",
								},
								{
									title: "Specialized Solutions",
									msg:
										"Access tailored solutions, specialized to your specific questions. Interactive comment Section where you may be indulge in intelluctual talks",
									hashMsg1: "#CustomLearning",
									hashMsg2: "#Interactive",
								},
							].map((cards, index) => {
								return (
									<div
										key={index}
										className="bg-white h-auto rounded-xl text-[#11101d] overflow-hidden shadow-lg"
									>
										<div className="p-6">
											<h3 className="font-bold text-xl mb-2">{cards.title}</h3>
											<p className="text-gray-700 text-base">{cards.msg}</p>
										</div>
										<div className="px-6 pt-4 pb-2">
											<span className="inline-block bg-[#11101d] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
												{cards.hashMsg1}
											</span>
											<span className="inline-block bg-[#11101d] rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">
												{cards.hashMsg2}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
				<div className="flex flex-col lg:flex-row items-center relative w-full">
					<div className="bg-[#11101d] w-full h-auto lg:h-auto px-4 lg:px-20 py-16"></div>
				</div>
			</div>
		</>
	);
};
export default AboutUs;
