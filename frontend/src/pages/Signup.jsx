import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import image from "../assets/AuthImage.jpg";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { AppContext } from "../context/AppContext";

const Signup = () => {
	const { setUser, setLoggedIn } = useContext(AppContext);
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [showC, setShowC] = useState(false);
	const [userInput, setUserInput] = useState({
		enr_no: "",
		password: "",
		confirmPassword: "",
	});

	function handleChange(e, field) {
		setUserInput({
			...userInput,
			[field]: e.target.value,
		});
	}

	useEffect(() => {
		if (localStorage.getItem("loggedIn") === "true") navigate("/");
	}, [navigate]);

	function checkPasswords() {
		if (userInput.password === userInput.confirmPassword) {
			sendRequest();
		} else {
			toast((t) => (
				<div className="flex justify-between bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3">
					<span className="font-bold">{"Passwords do not match"}</span>
					<button
						className="ml-2 text-red-500"
						onClick={() => {
							toast.dismiss(t.id);
						}}
					>
						❌
					</button>
				</div>
			));
		}
	}

	async function sendRequest() {
		console.log(userInput);
		try {
			const res = await axios.post(`${BACKEND_URL}/api/v1/student/signup`, {
				enr_no: userInput.enr_no || "1", // Ensure correct type
				password: userInput.password,
			});
			if (!res.jwt) {
				toast((t) => (
					<div className="flex justify-between bg-red-700 text-white p-4 rounded-md shadow-lg -mx-5 -my-3">
						<span className="font-bold">{res.data.message}</span>
						<button
							className="ml-2 text-red-500"
							onClick={() => {
								toast.dismiss(t.id);
							}}
						>
							❌
						</button>
					</div>
				));
			} else if (res) {
				const jwt = res.data.jwt;
				localStorage.setItem("token", jwt);
				toast("YOU HAVE SUCCESSFULLY LOGGED IN!", {
					icon: "✅",
					style: {
						borderRadius: "10px",
						background: "#333",
						color: "#fff",
					},
				});
				setTimeout(() => {
					setLoggedIn(true);
					setUser({
						name: res.data.name,
						enr_no: res.data.enr_no,
						dep: res.data.dep,
						branch: res.data.branch,
						roll_no: res.data.roll_no,
						batch: res.data.batch,
					});
					localStorage.setItem("loggedIn", "true");
					window.location.reload();
					navigate("/");
				}, 1000);
			} else {
				alert(res.data.message);
			}
		} catch (error) {
			console.log(error);
			alert(error);
		}
	}

	return (
		<div className="min-w-screen min-h-screen flex items-center justify-center bg-gray-800">
			<Toaster />
			<div className="relative w-full max-w-6xl h-auto max-h-[40rem] bg-gray-900 shadow-2xl flex flex-col md:flex-row rounded-lg overflow-hidden">
				<RxCross2
					className="absolute top-5 left-5 text-white text-3xl hover:cursor-pointer"
					onClick={() => navigate("/")}
				/>
				<div className="w-full flex flex-col justify-evenly items-center md:w-1/2 bg-gray-800 p-8">
					<h2 className="text-4xl font-semibold text-white mb-6">Sign Up</h2>
					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex flex-col justify-center items-center gap-6 w-[60%]"
					>
						<div className="w-full flex flex-col gap-4">
							<LablledInput
								lable="Enter Your Enrollment Number:"
								placeholder="220002316832481"
								value="enr_no"
								onchange={(e) => handleChange(e, "enr_no")}
								type="text"
							/>
							<div className="relative">
								<LablledInput
									lable="Set Your Password:"
									placeholder="Password must contains 8 characters"
									value="password"
									onchange={(e) => handleChange(e, "password")}
									type={`${show ? "text" : "password"}`}
								/>
								{show ? (
									<LuEye
										className="absolute text-2xl top-10 right-3 text-white hover:cursor-pointer"
										onClick={() => setShow(!show)}
									/>
								) : (
									<LuEyeOff
										className="absolute text-2xl top-10 right-3 text-white hover:cursor-pointer"
										onClick={() => setShow(!show)}
									/>
								)}
							</div>
							<div className="relative">
								<LablledInput
									lable="Confirm Your Password:"
									placeholder="Password must contains 8 characters"
									value="confirmPassword"
									onchange={(e) => handleChange(e, "confirmPassword")}
									type={`${showC ? "text" : "password"}`}
								/>
								{showC ? (
									<LuEye
										className="absolute text-2xl top-10 right-3 text-white hover:cursor-pointer"
										onClick={() => setShowC(!showC)}
									/>
								) : (
									<LuEyeOff
										className="absolute text-2xl top-10 right-3 text-white hover:cursor-pointer"
										onClick={() => setShowC(!showC)}
									/>
								)}
							</div>
							<button
								className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-full shadow-md transform transition duration-200 hover:scale-105"
								onClick={checkPasswords}
							>
								Sign Up
							</button>
						</div>
						<p className="text-gray-300 text-center mt-4">
							Already signed in?{" "}
							<div
								onClick={() => navigate("/signin")}
								className="text-blue-400 hover:underline hover:cursor-pointer"
							>
								Sign in here
							</div>
						</p>
					</form>
				</div>
				<div
					className="w-full md:w-1/2 md:h-auto md:max-h-full bg-cover bg-center hidden md:block"
					style={{ backgroundImage: `url(${image})` }}
				></div>
			</div>
		</div>
	);
};

const LablledInput = ({
	lable,
	placeholder,
	onchange,
	value,
	type = "text",
}) => {
	return (
		<div className="flex flex-col mb-1">
			<label className="mb-1 text-sm font-medium text-gray-300" htmlFor={value}>
				{lable}
			</label>
			<input
				placeholder={placeholder}
				type={type}
				id={value}
				onChange={onchange}
				className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-500"
			/>
		</div>
	);
};

export default Signup;
