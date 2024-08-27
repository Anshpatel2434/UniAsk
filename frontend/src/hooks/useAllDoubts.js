import axios from "axios";
import { useEffect, useState } from "react";

export const useAllDoubts = () => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	const [doubts, setDoubts] = useState({});

	const [loading, setLoading] = useState(true);

	async function sendRequest() {
		setLoading(true);
		try {
			const res = await axios.get(`${BACKEND_URL}/api/v1/doubt/allDoubt`, {
				headers: {
					Authorization: `${localStorage.getItem("token")}`,
				},
			});
			if (res.status === 200) {
				setDoubts(res.data.doubts);
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
		doubts,
		loading,
	};
};
