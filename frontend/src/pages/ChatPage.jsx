import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useChatGroup } from "../hooks/useChatGroup";
import { AppContext } from "../context/AppContext";
import Sidebar from "../components/Sidebar";
import { useCreateGroup } from "../hooks/useCreateGroup";

const ChatPage = () => {
	const { user } = useContext(AppContext);
	const { chat_name } = useParams();
	const navigate = useNavigate();
	const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [currentChats, setCurrentChats] = useState([]);
	const [message, setMessage] = useState("");
	const [ws, setWs] = useState(null);
	const messagesContainerRef = useRef(null);

	const { isCreated } = useCreateGroup({ chat_name });

	const { chats, loading } = useChatGroup({ chat_name });

	const scrollToBottom = () => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop =
				messagesContainerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		if (isCreated && !loading && chats.messages) {
			setCurrentChats(chats.messages);
			scrollToBottom();
		}
	}, [chats, loading, isCreated]);

	useEffect(() => {
		if (isCreated) {
			const websocket = new WebSocket(
				`wss://${WEBSOCKET_URL}/ws/chat/${chat_name}/`
			);

			websocket.onopen = () => {
				console.log("WebSocket connection established.");
			};

			websocket.onmessage = (event) => {
				const data = JSON.parse(event.data);
				setCurrentChats((prevChats) => [
					...prevChats,
					{
						sender: {
							id: data.sender_id,
							name: data.sender_name,
						},
						message: data.message,
					},
				]);
				scrollToBottom();
			};

			websocket.onclose = () => {
				console.log("WebSocket connection closed.");
			};

			setWs(websocket);

			return () => {
				websocket.close();
			};
		}
	}, [chat_name, isCreated]);

	const sendMessage = async (e) => {
		e.preventDefault();

		if (!message.trim() || !isCreated) return;

		try {
			if (ws) {
				ws.send(
					JSON.stringify({
						message: message,
						sender_id: user.id,
						sender_name: user.name,
					})
				);
			}

			await axios.post(
				`${BACKEND_URL}/api/v1/chat/${chat_name}/postMessage`,
				{
					message: message,
				},
				{
					headers: {
						Authorization: `${localStorage.getItem("token")}`,
					},
				}
			);

			setMessage("");
		} catch (error) {
			console.log(error);
		}
	};

	if (!isCreated) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-900 text-white">
				<p>This chat group does not exist or is still being created.</p>
			</div>
		);
	}

	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 flex flex-col bg-gray-900 text-white min-h-screen pl-[5rem] sm:pl-[5rem]">
				{/* Header Section */}
				<div className="fixed top-0 left-[5rem] sm:left-[5rem] right-0 z-10 bg-gray-800 p-[0.5rem] sm:p-[1rem] shadow-md flex items-center hover:cursor-pointer">
					<button
						onClick={() => navigate(-1)}
						className="mr-2 p-2 bg-blue-500 text-white rounded-md text-sm"
					>
						Go Back
					</button>
					<h1 className="text-[1rem] sm:text-[1.5rem] font-bold text-white truncate">
						{chat_name}
					</h1>
				</div>

				{/* Chat Messages Section */}
				<div
					ref={messagesContainerRef}
					className="flex-1 mt-[3rem] sm:mt-[4rem] mb-[4rem] sm:mb-[5rem] overflow-y-auto p-[0.5rem] sm:p-[1rem]"
				>
					{loading && !user ? (
						<div className="text-center">Loading...</div>
					) : (
						<div className="space-y-3 sm:space-y-4 flex flex-col">
							{currentChats.length > 0 ? (
								currentChats.map((chat, index) => (
									<div
										key={index}
										className={`flex ${
											chat.sender.id === user.id
												? "justify-end"
												: "justify-start"
										}`}
									>
										<div
											className={`flex items-start space-x-2 max-w-[75%] ${
												chat.sender.id === user.id ? "flex-row-reverse" : ""
											}`}
										>
											<div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
												{chat.sender.name[0].toUpperCase()}
											</div>
											<div
												className={`p-2 sm:p-3 rounded-lg ${
													chat.sender.id === user.id
														? "bg-green-600 text-white"
														: "bg-gray-700 text-white"
												}`}
											>
												<p className="text-sm break-words">{chat.message}</p>
											</div>
										</div>
									</div>
								))
							) : (
								<div className="text-center text-sm">No messages yet.</div>
							)}
						</div>
					)}
				</div>

				{/* Message Input Section */}
				<div className="fixed bottom-0 left-[5rem] sm:left-[5rem] right-0 bg-gray-800 p-[0.5rem] sm:p-[1rem] shadow-md">
					<form onSubmit={sendMessage} className="flex items-center space-x-2">
						<input
							type="text"
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							className="flex-1 p-2 rounded-md bg-gray-700 text-white text-sm"
							placeholder="Type your message..."
						/>
						<button
							type="submit"
							className="p-2 bg-green-500 text-white rounded-md text-sm"
						>
							Send
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default ChatPage;
