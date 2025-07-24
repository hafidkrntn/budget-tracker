<script lang="ts">
	import AlertModal from '$lib/components/ui/modal/AlertModal.svelte';
	import '../app.css';
</script>

<svelte:head>
	<title>My Svelte App</title>
	<meta name="description" content="A simple Svelte application">
	<link rel="icon" href="/favicon.ico" />
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
</svelte:head>

<div class="bg-[#F4F7FE] overflow-scroll">
	<main class="min-h-screen w-full">
		<slot />
	</main>
	<AlertModal />
</div>



