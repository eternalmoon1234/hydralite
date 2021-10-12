<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Buttons from './c/Buttons.svelte';
	let tab: Writable<string> = getContext('Tabs');
	const Skip = () => {
		tab.set('details');
	};
	const Github = () => {
		tab.set('details');
	};
</script>

<div
	class="bg-lblack w-[80%] h-[40%] rounded-2xl shadow-lg mt-6 p-6 font-montserrat flex justify-between flex-col"
>
	<div>
		<h1 class="font-semibold text-black dark:text-white font-montserrat text-2xl">
			Import an existing repository
		</h1>
		<h6 class="font-normal text-black dark:text-white mt-1">
			Don’t have a repository? We’ll create one for you, so you can <span
				class="text-iris-400 cursor-pointer font-bold"
				on:click={() => {
					tab.set('details');
				}}>skip this step.</span
			>
		</h6>
	</div>
	<div class="flex items-center justify-between">
		<div class="flex gap-4">
			<Buttons provider="Github" hasImage={true} onClick={Github} />
			<Buttons provider="Gitlab" hasImage={true} />
			<Buttons provider="Bitbucket" hasImage={true} />
		</div>
		<Buttons provider="Skip" hasImage={false} onClick={Skip} />
	</div>
</div>
