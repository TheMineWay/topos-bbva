import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const NotFound: FC = () => {
	const navigate = useNavigate();

	useEffect(() => {
		navigate({ to: "/" });
	}, [navigate]);

	return null;
};
