<script lang="ts">
	import { page } from '$app/stores';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	import AlertModal from '$lib/components/ui/modal/AlertModal.svelte';
	import '../app.css';

	$: isAuthPage = $page.url.pathname.startsWith('/auth');
</script>

<svelte:head>
	<title>My Svelte App</title>
	<meta name="description" content="A simple Svelte application">
	<link rel="icon" href="/favicon.ico" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="bg-[#F4F7FE] overflow-scroll">
{#if !isAuthPage}
	<div class="flex flex-col sm:flex-row relative">
		<Sidebar />
		<div class="flex-1 flex flex-col">
			<main class="p-4 flex-1">
				<slot />
			</main>
		</div>
	</div>
	{:else}
	<!-- Untuk halaman login/auth -->
	<main class="min-h-screen w-full">
		<slot />
	</main>
	{/if}
	<AlertModal />
</div>



