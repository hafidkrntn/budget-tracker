type Header = { alg: string; typ: string };

const defaultHeader: Header = { alg: 'HS256', typ: 'JWT' };

// Base64URL encode
function base64Encode(str: string) {
	const bytes = new TextEncoder().encode(str);
	const base64 = btoa(String.fromCharCode(...bytes));
	return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Base64URL decode
function base64Decode(str: string) {
	str = str.replace(/-/g, '+').replace(/_/g, '/');
	const padLength = (4 - (str.length % 4)) % 4;
	str += '='.repeat(padLength);

	const binary = atob(str);
	const bytes = new Uint8Array([...binary].map(c => c.charCodeAt(0)));
	return new TextDecoder().decode(bytes);
}

function encode<T = object>(payload: T, header: Header = defaultHeader) {
	const encodedHeader = base64Encode(JSON.stringify(header));
	const encodedPayload = base64Encode(JSON.stringify(payload));
	const encodedSignature = base64Encode('3P120CV3ND01253CR3T');
	return `${encodedHeader}.${encodedPayload}.${encodedSignature}`;
}

function decode(token: string) {
	const parts = token.split('.');

	if (parts.length !== 3) {
		throw new Error('Invalid token format');
	}

	const decodedHeader = JSON.parse(base64Decode(parts[0]));
	const decodedPayload = JSON.parse(base64Decode(parts[1]));
	const decodedSignature = base64Decode(parts[2]);

	return {
		header: decodedHeader,
		payload: decodedPayload,
		signature: decodedSignature
	};
}

export const jwt = {
	encode,
	decode
};
