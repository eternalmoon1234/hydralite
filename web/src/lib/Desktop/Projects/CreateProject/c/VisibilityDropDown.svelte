<script lang="ts">
	import Dropdown from '$lib/assets/Desktop/Dropdown.svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	export let getisPublic;
	export let setisPublic;
	let isPublic = getisPublic();
	let show = false; // menu state
	let menu = null; // menu wrapper DOM reference

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

<div class="relative w-full h-full" bind:this={menu}>
	<div class="w-full h-full">
		<button
			on:click={() => (show = !show)}
			class="menu focus:outline-none focus:shadow-solid w-full h-full rounded-xl bg-[#2F3541] flex items-center justify-between px-4"
		>
			{isPublic ? 'Public' : 'Private'}
			<Dropdown />
		</button>

		{#if show}
			<div
				in:scale={{ duration: 100, start: 0.95 }}
				out:scale={{ duration: 75, start: 0.95 }}
				class="origin-top-right absolute right-0 w-full py-2 mt-1 bg-gray-800
            rounded shadow-md"
			>
				<button
					on:click={() => {
						setisPublic(true);
						show = false;
						isPublic = true;
					}}
					class="flex items-center justify-between w-full h-full px-4 py-2 hover:bg-iris-400 hover:text-green-100"
					>Public
				</button>
				<button
					on:click={() => {
						setisPublic(false);
						(show = false), (isPublic = false);
					}}
					class="flex items-center justify-between w-full h-full px-4 py-2 hover:bg-iris-400 hover:text-green-100"
					>Private
				</button>
			</div>
		{/if}
	</div>
</div>
