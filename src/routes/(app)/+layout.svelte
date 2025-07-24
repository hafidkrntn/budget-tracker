<script>
	import Navbar from '$lib/components/layout/Navbar.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
</script>

<div id="app" class="relative flex flex-col sm:flex-row">
	<Sidebar />
	<div class="flex flex-1 flex-col">
		<Navbar />
		<main class="flex-1 p-4">
			<slot />
		</main>
	</div>
</div>
