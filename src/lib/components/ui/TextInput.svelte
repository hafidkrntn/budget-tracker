<script lang="ts">
	export let label: string = '';
	export let type: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' = 'text';
	export let value: string = '';
	export let name: string = '';
	export let placeholder: string = '';
	export let required: boolean = false;
	export let onInput: (e: Event) => void = () => {};

	let showPassword = false;
	$: inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;

	$: isFilled = value.trim().length > 0;
	let touched = false;
	$: isInvalid = required && touched && value.trim().length === 0;
</script>

<div class="relative mb-4 flex flex-col gap-3">
	{#if label}
		<label for={name} class="text-xl font-semibold text-[#242424]">{label}</label>
	{/if}
	<input
		id={name}
		type={inputType}
		bind:value
		{name}
		{placeholder}
		{required}
		on:input={onInput}
		on:blur={() => (touched = true)}
		class={`w-full rounded-md border px-3 py-2 pr-10 focus:ring-2 focus:outline-none 
        ${isInvalid ? 'border-danger focus:ring-danger' : isFilled ? 'border-primary focus:ring-primary' : 'border-gray-300'}
    `}
	/>

	{#if type === 'password'}
		<button
			type="button"
			class="absolute top-15 right-3 -translate-y-1/2 text-gray-500 hover:text-gray-800 focus:outline-none"
			on:click={() => (showPassword = !showPassword)}
		>
			{#if showPassword}
				👁️‍🗨️
			{:else}
				🙈
			{/if}
		</button>
	{/if}
</div>
