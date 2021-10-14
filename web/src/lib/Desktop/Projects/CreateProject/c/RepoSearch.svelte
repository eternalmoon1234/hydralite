<!-- Code from https://codechips.me/tailwind-ui-react-vs-svelte/ -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	export let getRepo;
	export let setCurrentRepo;
	export let currentOrg;
	export let currentRepo;
	let show = false; // menu state
	let menu = null; // menu wrapper DOM reference
	let allRepos = [];

	const SearchItems = async (term: string) => {
		let repos = getRepo();
		let res: number = 0;
		allRepos = [];
		for (let index = 0; index < repos.length; index++) {
			const element = repos[index];
			if (res > 3) {
				break;
			} else {
				if (element.org === currentOrg()) {
					if (element.name.startsWith(term)) {
						allRepos.push(element);
						show = true;
						res += 1;
						console.log(element.name);
					}
				}
			}
		}
	};
	onMount(() => {
		const handleOutsideClick = (event) => {
			if (show && !menu.contains(event.target)) {
				show = false;
			}
		};

		const handleEscape = (event) => {
			if (show && event.key === 'Escape') {
				show = false;
			}
		};

		// add events when element is added to the DOM
		document.addEventListener('click', handleOutsideClick, false);
		document.addEventListener('keyup', handleEscape, false);

		// remove events when element is removed from the DOM
		return () => {
			document.removeEventListener('click', handleOutsideClick, false);
			document.removeEventListener('keyup', handleEscape, false);
		};
	});
</script>

<div class="w-full h-full rounded-xl border-2 border-[#2E374A]">
	<input
		value={currentRepo === undefined ? '' : currentRepo}
		type="text"
		class="w-full h-full rounded-xl bg-transparent focus:outline-none px-4 text-black dark:text-white font-extrabold"
		placeholder="Search"
		on:input={(a) => SearchItems(a.currentTarget.value)}
	/>
</div>

<div class="relative font-montserrat" bind:this={menu}>
	<div>
		{#if show}
			<div
				in:scale={{ duration: 100, start: 0.95 }}
				out:scale={{ duration: 75, start: 0.95 }}
				class="origin-top-right h-auto absolute right-0 w-full mt-1 bg-[#2A303F]
            rounded-xl shadow-md"
			>
				{#each allRepos as repos}
					<button
						on:click={() => {
							setCurrentRepo(repos.name);
							show = false;
						}}
						class="flex items-center  py-4 w-full px-5 hover:bg-iris-400 hover:text-green-100 text-black dark:text-white"
					>
						<h5 class="px-5">{repos.name}</h5>
					</button>
				{/each}
			</div>
		{/if}
	</div>
</div>
