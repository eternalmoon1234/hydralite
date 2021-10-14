<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	let tab: Writable<string> = getContext('Tabs');
	let config: Writable<any> = getContext('Config');
</script>

<div class="w-[80%] h-[5px] flex gap-3 select-none">
	<div
		class="w-[33.33333%] h-full cursor-pointer transition-all duration-1000"
		on:click={() => tab.set('provider')}
	>
		<div
			class={`w-full h-full ${$tab === 'provider' ? 'bg-iris-400' : 'bg-acrylic-400'} rounded-md`}
		/>
		<h5 class="font-montserrat text-black dark:text-white font-semibold my-2">
			1. Choose a provider
		</h5>
	</div>
	<div
		class={`w-[33.33333%] h-full ${
			$config !== null ? 'cursor-pointer' : 'cursor-not-allowed'
		} transition-all duration-1000`}
		on:click={() => {
			$config !== null ? tab.set('repo') : '';
		}}
	>
		<div class={`w-full h-full ${$tab === 'repo' ? 'bg-iris-400' : 'bg-acrylic-400'} rounded-md`} />
		<h5 class="font-montserrat text-black dark:text-white font-semibold my-2">
			2. Pick a repository
		</h5>
	</div>
	<div
		class="w-[33.33333%] h-full cursor-pointer transition-all duration-1000"
		on:click={() => tab.set('details')}
	>
		<div
			class={`w-full h-full ${$tab === 'details' ? 'bg-iris-400' : 'bg-acrylic-400'} rounded-md`}
		/>
		<h5 class="font-montserrat text-black dark:text-white font-semibold my-2">
			3. Project Details
		</h5>
	</div>
</div>
