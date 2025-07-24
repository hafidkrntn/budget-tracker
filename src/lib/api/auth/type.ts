export type LoginPayload = {
	email: string;
	password: string;
};

export type TokenPayload = {
	email: string;
	exp: number;
};