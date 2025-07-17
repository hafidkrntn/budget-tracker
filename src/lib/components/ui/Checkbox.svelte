<script lang="ts">
	export let id: string = '';
	export let label: string = '';
	export let checked: boolean = false;
	export let name: string = '';
	export let disabled: boolean = false;
	export let size: 'md' | 'sm' | 'xl' = 'md';

  $: sizeClass = size === 'sm'
    ? 'w-4 h-4'
    : size === 'xl'
    ? 'w-8 h-8'
    : 'w-6 h-6'; // default 'md'
</script>

<label for={id} class="flex cursor-pointer items-center gap-2 text-sm select-none">
	<input
		{id}
		type="checkbox"
		{name}
		bind:checked
		{disabled}
		 class={`text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 disabled:opacity-50 ${sizeClass}`}
	/>
	<span class={disabled ? 'text-gray-400' : 'text-gray-700'}>{label}</span>
</label>
