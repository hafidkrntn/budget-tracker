// import { goto } from '$app/navigation';
import { writable } from 'svelte/store';

type InformationModalStore = {
	message: string;
	opened: boolean;
	code: number;
	type: 'success' | 'error';
	onClick: (() => void) | null;
};

function initErrorHandlerModal() {
	const defaultValue: InformationModalStore = {
		message: '',
		opened: false,
		code: 0,
		type: 'error',
		onClick: null
	};
	const { set, update, subscribe } = writable<InformationModalStore>(defaultValue);

	function fetchErrorHandling(e: any) {
		const unexpectedError: Omit<InformationModalStore, 'opened'> = {
			type: 'error',
			code: 400,
			message: 'unexpected error happened please contact the administrator',
			onClick: null
		};

		// handle unexpected error
		if (!e) {
			update(() => ({ ...unexpectedError, opened: true }));
			return;
		}

		const response = e?.response?.data;
		//  take the response given by BE or fallback into axios response
		const data: InformationModalStore = {
			code: response?.code || e?.status,
			message: response?.message || e?.message,
			opened: true,
			type: 'error',
			onClick: null
		};

		// handling unauthorized case
		// if (response.code == 401) {
		// 	data.onClick = async () => {
		// 		try {
		// 			authApi.logout();
		// 		} catch (error) {
		// 			authApi.logout();
		// 		}
		// 		goto('/auth/login');
		// 		localStorage.removeItem('auth');
		// 	};
		// }

		update(() => data);
	}

	function createNotification(e: Omit<InformationModalStore, 'opened'>) {
		update(() => {
			return {
				...e,
				opened: true
			};
		});
	}

	function resetErrorModal() {
		update(() => defaultValue);
	}

	return { subscribe, set, resetErrorModal, fetchErrorHandling, createNotification };
}

export const handlers = initErrorHandlerModal();