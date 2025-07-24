import { browser } from "$app/environment";
import type { TokenPayload } from "$lib/api/auth/type";
import { jwt } from "./jwt";

function getUser(): TokenPayload | null {
	if (!browser) return null;

	const token = localStorage.getItem("access");

	if (!token) return null;

	const decodedToken = jwt.decode(token);
	const currentTime = Math.floor(Date.now() / 1000); 
	if (decodedToken?.payload?.exp && decodedToken.payload.exp < currentTime) {
		return null;
	}
	return decodedToken.payload as TokenPayload;
}

export const auth = {
  getUser
}