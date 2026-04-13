"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import api from "@/hooks/api";

type GoogleAuthConfig = {
	clientId: string | null;
	loading: boolean;
	error: string | null;
};

const GoogleAuthConfigContext = createContext<GoogleAuthConfig>({
	clientId: null,
	loading: true,
	error: null,
});

export function useGoogleAuthConfig() {
	return useContext(GoogleAuthConfigContext);
}

export default function AuthGoogleProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const envClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim() || null;
	const [config, setConfig] = useState<GoogleAuthConfig>({
		clientId: envClientId,
		loading: !envClientId,
		error: null,
	});

	useEffect(() => {
		if (envClientId) return;

		let active = true;

		api
			.get<{ googleClientId?: string | null }>("/config/public")
			.then((res) => {
				if (!active) return;

				const clientId = res.data?.googleClientId?.trim() || null;
				setConfig({
					clientId,
					loading: false,
					error: clientId
						? null
						: "Google login chưa được cấu hình. Hãy thêm GOOGLE_CLIENT_ID vào server/.env hoặc NEXT_PUBLIC_GOOGLE_CLIENT_ID vào client.",
				});
			})
			.catch((error: unknown) => {
				if (!active) return;

				const message =
					typeof error === "object" &&
					error !== null &&
					"response" in error &&
					typeof (error as { response?: { data?: { message?: string } } }).response?.data?.message === "string"
						? (error as { response?: { data?: { message?: string } } }).response!.data!.message!
						: "Không tải được cấu hình Google login từ server.";

				setConfig({
					clientId: null,
					loading: false,
					error: message,
				});
			});

		return () => {
			active = false;
		};
	}, [envClientId]);

	const content = useMemo(() => {
		if (!config.clientId) {
			return children;
		}

		return (
			<GoogleOAuthProvider clientId={config.clientId}>
				{children}
			</GoogleOAuthProvider>
		);
	}, [children, config.clientId]);

	return (
		<GoogleAuthConfigContext.Provider value={config}>
			{content}
		</GoogleAuthConfigContext.Provider>
	);
}
