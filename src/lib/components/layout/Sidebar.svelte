<script lang="ts">
	import { page } from '$app/stores';
	import { derived } from 'svelte/store';

	import DashboardImg from '$lib/assets/dashboard.svg';
	import BudgetImg from '$lib/assets/budget.svg';
	import SavingImg from '$lib/assets/saving.svg';
	import TransactionImg from '$lib/assets/transaction.svg';
	import ReportImg from '$lib/assets/timer.svg';

	const menuItems = [
		{ name: 'Dashboard', href: '/dashboard', icon: DashboardImg },
		{ name: 'Transaction', href: '/transaction', icon: TransactionImg },
		{ name: 'Budget', href: '/budget', icon: BudgetImg },
		{ name: 'Savings', href: '/saving', icon: SavingImg },
		{ name: 'Report & Analytics', href: '/report', icon: ReportImg }
	];

	const currentPath = derived(page, ($page) => $page.url.pathname);
</script>


<aside
	class="fixed top-0 left-0 z-40 h-screen w-58 -translate-x-full overflow-hidden transition-transform sm:sticky sm:translate-x-0"
>
	<div class="h-full overflow-y-auto bg-white px-3 py-4">
		<div class="flex items-center justify-center gap-4 px-11 pb-8">
			<div class="bg-primary h-4 w-4 rounded-full"></div>
			<h1>Codarium</h1>
		</div>
		<ul class="flex flex-col gap-2">
			{#each menuItems as item}
				{#await currentPath}
					<li>Loading...</li>
				{:then path}
					<li>
						<a
							href={item.href}
							class="flex items-center gap-2 h-10 w-full rounded-lg pl-3 pr-2 transition-colors duration-200
								{$currentPath.startsWith(item.href)
									? 'bg-primary text-white'
									: 'text-gray-500 hover:bg-primary hover:text-white'}"
						>
							<img src={item.icon} alt={item.name + ' icon'} class="w-5 h-5" />
							<span>{item.name}</span>
						</a>
					</li>
				{/await}
			{/each}
		</ul>
	</div>
</aside>

