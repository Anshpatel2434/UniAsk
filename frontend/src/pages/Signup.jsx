import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import image from "../assets/AuthImage.jpg";
import { LuEye, LuEyeOff, LuUser, LuLock } from "react-icons/lu";
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
	const [showOtpPopup, setShowOtpPopup] = useState(false);
	const [otp, setOtp] = useState(["", "", "", ""]);

	function handleChange(e, field) {
		setUserInput({
			...userInput,
			[field]: e.target.value,
		});
	}

	useEffect(() => {
		if (localStorage.getItem("loggedIn") === "true") navigate("/");
		const token = localStorage.getItem("token");
		if (token) {
			const payload = JSON.parse(atob(token.split(".")[1]));
			const expiration = new Date(payload.exp * 1000);
			const now = new Date();

			if (now >= expiration) {
				localStorage.removeItem("token");
				localStorage.setItem("loggedIn", "false");
				navigate("/signin");
				toast.error("Session expired, please log in again.");
			} else {
				// Set a timeout to remove the token just before it expires
				const timeout = expiration.getTime() - now.getTime();
				setTimeout(() => {
					localStorage.removeItem("token");
					localStorage.setItem("loggedIn", "false");
					navigate("/signin");
					toast.error("Session expired, please log in again.");
				}, timeout);
			}
		}
	}, [navigate]);

	async function handleSignup() {
		if (userInput.password !== userInput.confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}

		try {
			const res = await axios.post(`${BACKEND_URL}/api/v1/student/getOtp`, {
				email: `${userInput.enr_no}@ljku.edu.in`,
				enr_no: userInput.enr_no,
			});

			if (res.data.status === 200) {
				setShowOtpPopup(true);
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.error(error);
			toast.error("Failed to send OTP. Please try again.");
		}
	}

	async function handleOtpSubmit() {
		const otpString = otp.join("");
		try {
			const res = await axios.post(`${BACKEND_URL}/api/v1/student/signup`, {
				enr_no: userInput.enr_no,
				password: userInput.password,
				otp: otpString,
			});

			if (res.data.status === 200) {
				const jwt = res.data.jwt;
				toast.success("You have successfully signed up!");
				setTimeout(() => {
					localStorage.setItem("token", jwt);
					setLoggedIn(true);
					setUser({
						name: res.data.student,
						enr_no: res.data.enr_no,
						dep: res.data.dep,
						branch: res.data.branch,
						roll_no: res.data.roll_no,
						batch: res.data.batch,
					});
					localStorage.setItem("loggedIn", "true");
					navigate("/");
					window.location.reload();
				}, 2000);
			} else {
				toast.error(res.data.message);
			}
		} catch (error) {
			console.error(error);
			toast.error("Signup failed. Please try again.");
		}
	}

	function handleOtpChange(index, value) {
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);

		// Move focus to the next input
		if (value && index < 3) {
			document.getElementById(`otp-${index + 1}`).focus();
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0d0d2d] to-[#1a1a3a]">
			<Toaster />
			<div className="w-full max-w-4xl bg-[#1d1b31] rounded-2xl shadow-2xl overflow-hidden">
				<div className="flex flex-col md:flex-row">
					<div className="w-full md:w-1/2 p-12">
						<div className="text-center mb-10">
							<h2 className="text-4xl font-bold text-white mb-2">
								Create Account
							</h2>
							<p className="text-gray-400">Join us today!</p>
						</div>
						<form onSubmit={(e) => e.preventDefault()} className="space-y-6">
							<LabelledInput
								label="Enrollment Number"
								placeholder="Enter your enrollment number"
								value="enr_no"
								onChange={(e) => handleChange(e, "enr_no")}
								type="text"
								icon={<LuUser className="w-5 h-5 text-gray-400" />}
							/>
							<div className="relative">
								<LabelledInput
									label="Password"
									placeholder="Set your password"
									value="password"
									onChange={(e) => handleChange(e, "password")}
									type={show ? "text" : "password"}
									icon={<LuLock className="w-5 h-5 text-gray-400" />}
								/>
								{show ? (
									<LuEye
										className="absolute text-2xl top-9 right-3 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
										onClick={() => setShow(!show)}
									/>
								) : (
									<LuEyeOff
										className="absolute text-2xl top-9 right-3 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
										onClick={() => setShow(!show)}
									/>
								)}
							</div>
							<div className="relative">
								<LabelledInput
									label="Confirm Password"
									placeholder="Confirm your password"
									value="confirmPassword"
									onChange={(e) => handleChange(e, "confirmPassword")}
									type={showC ? "text" : "password"}
									icon={<LuLock className="w-5 h-5 text-gray-400" />}
								/>
								{showC ? (
									<LuEye
										className="absolute text-2xl top-9 right-3 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
										onClick={() => setShowC(!showC)}
									/>
								) : (
									<LuEyeOff
										className="absolute text-2xl top-9 right-3 text-gray-400 hover:text-white cursor-pointer transition-colors duration-200"
										onClick={() => setShowC(!showC)}
									/>
								)}
							</div>
							<button
								className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
								onClick={handleSignup}
							>
								Sign Up
							</button>
						</form>
						<p className="text-gray-400 text-center mt-8">
							Already have an account?{" "}
							<span
								onClick={() => navigate("/signin")}
								className="text-blue-400 hover:underline cursor-pointer"
							>
								Sign in here
							</span>
						</p>
					</div>
					<div className="hidden md:block w-1/2 relative">
						<img
							src={image}
							alt="Auth"
							className="absolute inset-0 w-full h-full object-cover"
						/>
						<div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
							<div className="text-center">
								<h3 className="text-white text-3xl font-bold mb-4">
									Welcome Back
								</h3>
								<p className="text-gray-200 mb-6">
									To keep connected with us please login with your personal info
								</p>
								<button
									onClick={() => navigate("/signin")}
									className="bg-transparent border-2 border-white text-white py-2 px-6 rounded-full font-semibold hover:bg-white hover:text-[#1d1b31] transition duration-300"
								>
									Sign In
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<RxCross2
				className="absolute top-5 right-5 text-white text-3xl hover:text-gray-300 cursor-pointer transition-colors duration-200"
				onClick={() => navigate("/")}
			/>

			{showOtpPopup && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
					<div className="bg-[#1d1b31] p-8 rounded-xl shadow-2xl w-96">
						<h3 className="text-2xl font-bold text-white mb-6 text-center">
							Check Your LJ Email For The OTP
						</h3>
						<div className="flex justify-between mb-6">
							{otp.map((digit, index) => (
								<input
									key={index}
									id={`otp-${index}`}
									type="text"
									maxLength="1"
									value={digit}
									onChange={(e) => handleOtpChange(index, e.target.value)}
									className="w-14 h-14 text-center text-2xl font-bold bg-[#2a2849] text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
								/>
							))}
						</div>
						<button
							onClick={handleOtpSubmit}
							className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
						>
							Confirm OTP
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

const LabelledInput = ({
	label,
	placeholder,
	onChange,
	value,
	type = "text",
	icon,
}) => {
	return (
		<div className="flex flex-col mb-4">
			<label className="mb-2 text-sm font-medium text-gray-300" htmlFor={value}>
				{label}
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					{icon}
				</div>
				<input
					placeholder={placeholder}
					type={type}
					id={value}
					onChange={onChange}
					className="w-full pl-10 pr-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#2a2849] text-white placeholder-gray-400 transition duration-200"
				/>
			</div>
		</div>
	);
};

export default Signup;
