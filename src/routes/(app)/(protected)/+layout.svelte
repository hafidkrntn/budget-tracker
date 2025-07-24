<script>
	import { auth } from '$lib/utils/auth';
	import { onMount } from 'svelte';

	onMount(() => {
		const user = auth.getUser();
		
		if (user == null) window.location.replace('/auth/login');
	});
</script>

<slot />