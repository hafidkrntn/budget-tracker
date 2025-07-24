<script lang="ts">
	import { onDestroy } from 'svelte';
	export let value: string = '';
	export let placeholder: string = 'Search...';
	export let debounce: number = 300;
	export let results: string[] = [];
	export let onSearch: (query: string) => void = () => {};

	let timeout: ReturnType<typeof setTimeout>;

	function handleInput(e: Event) {
		const target = e.target as HTMLInputElement;
		value = target.value;

		clearTimeout(timeout);
		timeout = setTimeout(() => {
			onSearch(value);
		}, debounce);
	}

	function highlightMatch(text: string, keyword: string): string {
		if (!keyword) return text;
		const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // Escape special chars
		const regex = new RegExp(`(${escapedKeyword})`, 'gi');
		return text.replace(regex, '<strong class="text-blue-600">$1</strong>');
	}

	onDestroy(() => {
		clearTimeout(timeout);
	});
</script>

<div class="relative w-full max-w-md">
	<input
		type="text"
		bind:value
		{placeholder}
		on:input={handleInput}
		class="focus:border-primary focus:ring-primary w-full rounded-full border border-gray-300 bg-white py-2 pr-4 pl-10 text-sm text-gray-700 placeholder-gray-400 shadow-sm focus:ring-1 focus:outline-none"
	/>

	<!-- Search icon -->
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="absolute top-2.5 left-3 h-5 w-5 text-gray-400"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
		/>
	</svg>

	<!-- Autocomplete list -->
	{#if results.length > 0 && value}
		<ul
			class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 shadow-lg"
		>
			{#each results as item}
				<li>
					<button
						type="button"
						class="w-full cursor-pointer px-4 py-2 text-left text-sm text-gray-700 hover:bg-blue-100"
						on:click={() => (value = item)}
					>
						{@html highlightMatch(item, value)}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>
