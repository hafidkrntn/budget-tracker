<script>
	import { auth } from '$lib/utils/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		const user = auth.getUser();

		if (user != null) window.location.replace('/dashboard');
	});
</script>

<svelte:head>
	<title>Login</title>
	<meta name="description" content="A simple Svelte application" />
	<link rel="icon" href="/favicon.ico" />
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<main class="w-full">
	<slot />
</main>
