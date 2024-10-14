import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext(null);

const AppContextProvider = ({ children }) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;
	const [isOpen, setIsOpen] = useState(false);
	const [user, setUser] = useState({
		id: "",
		name: "",
		enr_no: "",
		dep: "",
		branch: "",
		roll_no: "",
		batch: "",
		noOfDoubts: "",
		noOfSolutions: "",
		noOfUpvotes: "",
		gender: "",
	});
	const [loggedIn, setLoggedIn] = useState(false);

	async function sendRequest() {
		try {
			const res = await axios.get(`${BACKEND_URL}/api/v1/student/getStudent`, {
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
				},
			});
			if (res.data) {
				setLoggedIn(true);
				const temp = res.data.student;
				console.log("Fetched user:", temp); // Logging fetched data
				setUser(temp); // Update the state
				user.id = temp.id;
				user.name = temp.name;
				user.enr_no = temp.enr_no;
				user.dep = temp.dep;
				user.branch = temp.branch;
				user.roll_no = temp.roll_no;
				user.batch = temp.batch;
				user.noOfDoubts = temp.noOfDoubts;
				user.noOfSolutions = temp.noOfSolutions;
				user.noOfUpvotes = temp.noOfUpvotes;
				user.gender = temp.gender;
				setUser(user);
			}
		} catch (error) {
			console.error("Error fetching user data:", error);
		}
	}

	async function wakeUpCall() {
		try {
			await axios.get(`${BACKEND_URL}/api/v1/wakeUp`);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			sendRequest();
		}
		wakeUpCall();
	}, []);

	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				loggedIn,
				setLoggedIn,
				isOpen,
				setIsOpen,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContextProvider;
