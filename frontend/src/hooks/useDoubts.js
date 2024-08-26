import axios from "axios";
import { useEffect, useState } from "react";

export const useDoubt = ({ doubt_id }) => {
	const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

	const [doubt, setDoubt] = useState({});

	const [loading, setLoading] = useState(true);

	async function sendRequest() {
		setLoading(true);
		try {
			const res = await axios.get(
				`${BACKEND_URL}/api/v1/doubt/getDoubt/${doubt_id}`,
				{
					headers: {
						Authorization: `${localStorage.getItem("token")}`,
					},
				}
			);
			if (res.status === 200) {
				console.log("in the get doubt hook");
				console.log(res.data.doubt);
				setDoubt(res.data.doubt);
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
		doubt,
		loading,
	};
};
