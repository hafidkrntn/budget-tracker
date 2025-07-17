<script lang="ts">
	import { handlers } from '$lib/store/alert';
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';

	let modal: HTMLElement | null = null;

	// Auto-close modal jika onClick tidak diset
	const autoClose = () => {
		setTimeout(() => {
			handlers.resetErrorModal();
		}, 3000);
	};
</script>

<style>
	.modal-bg {
		background-color: rgba(0, 0, 0, 0.4);
	}
</style>

{#if $handlers.opened}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center modal-bg"
		transition:fade>
		<div
			class="bg-white rounded-xl p-6 max-w-md w-full shadow-xl border-l-8"
			class:border-l-red-500={$handlers.type === 'error'}
			class:border-l-green-500={$handlers.type === 'success'}
			in:fly={{ y: -20, duration: 200 }}
			bind:this={modal}>

			<h2 class="text-lg font-bold mb-2">
				{#if $handlers.type === 'error'}
					❌ Error
				{:else}
					✅ Success
				{/if}
			</h2>

			<p class="text-sm mb-4">{$handlers.message}</p>

			{#if $handlers.onClick}
				<button
					class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
					on:click={$handlers.onClick}>
					OK
				</button>
			{:else}
				<button
					class="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
					on:click={() => handlers.resetErrorModal()}>
					Close
				</button>
				{@html autoClose()}
			{/if}
		</div>
	</div>
{/if}
