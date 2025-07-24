<script>
	import Button from '../ui/Button.svelte';
	import SearchInput from '../ui/SearchInput.svelte';
  import AiImg from '$lib/assets/ai.svg'
  import BellImg from '$lib/assets/bells.svg'
</script>

<nav class="flex h-22 w-full items-center justify-between bg-white px-4">
	<div>
		<SearchInput />
	</div>
	<div class="flex gap-6">
    <div>
      <Button>
        <div class="flex gap-2">
          <img src={AiImg} alt="ai img" />
          <h1>Try AI</h1>
        </div>
      </Button>
    </div>
    <img src={BellImg} alt="bell img" />
	</div>
</nav>
