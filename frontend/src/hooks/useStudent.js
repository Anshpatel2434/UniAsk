import axios from "axios";
import { useEffect, useState } from "react";

export const useStudent = ({ student_id }) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	const [student, setStudent] = useState({});

	const [loading, setLoading] = useState(true);

	async function sendRequest() {
		setLoading(true);
		try {
			const res = await axios.get(
				`${BACKEND_URL}/api/v1/student/getStudentById/${student_id}`,
				{
					headers: {
						Authorization: `${localStorage.getItem("token")}`,
					},
				}
			);
			if (res.status === 200) {
				setStudent(res.data.student);
				setLoading(false);
			} else {
				alert("Error while fetching student");
			}
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		sendRequest();
	}, []);

	return {
		student,
		loading,
	};
};
