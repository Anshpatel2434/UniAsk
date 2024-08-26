import axios from "axios";
import { useEffect, useState } from "react";

export const useSolution = ({ solution_id }) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	const [solution, setSolution] = useState({});

	const [loading, setLoading] = useState(true);

	async function sendRequest() {
		setLoading(true);
		try {
			const res = await axios.get(
				`${BACKEND_URL}/api/v1/solution/getSolution/${solution_id}`,
				{
					headers: {
						Authorization: `${localStorage.getItem("token")}`,
					},
				}
			);
			if (res.status === 200) {
				setSolution(res.data.solution);
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
		solution,
		loading,
	};
};
