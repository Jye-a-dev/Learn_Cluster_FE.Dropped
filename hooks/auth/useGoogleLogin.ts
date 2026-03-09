import api from "../api";

interface GoogleLoginInput {
	credential: string;
}

interface GoogleLoginResponse {
	message: string;
	user: {
		id: string;
		email: string;
		name?: string;
		avatar?: string;
	};
}

export function useGoogleLogin() {
	const googleLogin = async (data: GoogleLoginInput) => {
		const res = await api.post<GoogleLoginResponse>("/auth/google", data, {
			withCredentials: true,
		});

		return res.data;
	};

	return { googleLogin };
}
