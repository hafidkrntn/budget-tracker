<script lang="ts">
	import Button from '../ui/Button.svelte';
	import Checkbox from '../ui/Checkbox.svelte';
	import TextInput from '../ui/TextInput.svelte';
	import Logo from '$lib/assets/logo.png';
	import type { LoginPayload } from '$lib/api/auth/type';
	import { authApi } from '$lib/api/auth/auth';
	import { handlers } from '$lib/store/alert';

	let email = '';
	let password = '';

	async function handleSubmit() {
		const payload: LoginPayload = {
			email: email,
			password: password,
		}
		try {
			const response = await authApi.login(payload)
			const access = response.result.data.token
			localStorage.setItem("access", access)
		} catch (error) {
			handlers.fetchErrorHandling(error)
		}
	}
</script>

<div class="flex w-full max-w-md flex-col justify-center p-2">
	<div class="flex flex-col items-center justify-center gap-8 pb-12">
		<img alt="Logo" src={Logo} width="98px" height="98px" />
		<p class="text-md font-bold">Get access to powerful tools budgeting,</p>
	</div>

	<form on:submit|preventDefault={handleSubmit} class="mx-auto w-full">
		<TextInput
			label="Email"
			type="text"
			bind:value={email}
			name="email"
			placeholder="email"
			required
		/>

		<TextInput
			label="Password"
			type="password"
			bind:value={password}
			name="password"
			placeholder="password"
			required
		/>

		<Checkbox label="By creating an account you agree to Terms of Service and Privacy Policy" />

		<div class="w-full pt-12 pb-6.5">
			<Button type="submit" bgColor="bg-[#FF8033]" textColor="text-white">Sign in</Button>
		</div>
		<div class="grid grid-cols-2 gap-3">
			<Button type="button" variant="secondary">Sign in with Google</Button>
			<Button type="button" variant="secondary">Sign in with Facebook</Button>
		</div>
	</form>
</div>
