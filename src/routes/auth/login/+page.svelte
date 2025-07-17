<script>
	import Login from '$lib/components/transactions/Login.svelte';
	import headers from '$lib/assets/headers.png';
</script>

<div class="grid min-h-screen auto-cols-auto grid-flow-col items-center">
	<div class="bg-#F6F6F6 hidden p-6 md:block">
		<div class="mx-auto flex items-center justify-center">
			<img
				alt="headers"
				src={headers}
				sizes="(min-width:1920px) 1280px, (min-width:1080px) 640px, (min-width:768px) 400px"
			/>
		</div>
	</div>
	<div class="flex min-h-screen justify-center">
		<Login />
	</div>
</div>
