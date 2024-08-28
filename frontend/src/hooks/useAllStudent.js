import axios from "axios";
import { useEffect, useState } from "react";

export const useAllStudents = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	const [students, setStudents] = useState({});

	const [loading, setLoading] = useState(true);

	async function sendRequest() {
		setLoading(true);
		try {
			const res = await axios.get(`${BACKEND_URL}/api/v1/student/students`);
			if (res) {
				setStudents(res.data);
				setLoading(false);
			} else {
				alert("Error while fetching doubt");
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		sendRequest();
	}, []);

	return {
		students,
		loading,
	};
};
