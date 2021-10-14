<!-- Code from https://codechips.me/tailwind-ui-react-vs-svelte/ -->
<script lang="ts">
	import Dropdown from '$lib/assets/Desktop/Dropdown.svelte';
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';

	export let user;
	export let currentUser = user[0];
	let show = false; // menu state
	let menu = null; // menu wrapper DOM reference
	export let setCurrentOrg;
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
	const setCurrentUser = (user) => {
		let u = {
			avatar_url: user.avatar_url,
			login: user.login
		};
		setCurrentOrg(user.login);
		currentUser = u;
		show = false;
	};
</script>

<div class="relative font-montserrat w-full h-full" bind:this={menu}>
	<div>
		<button
			on:click={() => (show = !show)}
			class="focus:outline-none focus:shadow-solid w-full h-full flex items-center px-5 text-black dark:text-white justify-between"
		>
			<div class="flex items-center">
				<img class="w-10 my-2 rounded-full" src={currentUser.avatar_url} alt={currentUser.login} />
				<h5 class="px-5">{currentUser.login}</h5>
			</div>
			<Dropdown />
		</button>

		{#if show}
			<div
				in:scale={{ duration: 100, start: 0.95 }}
				out:scale={{ duration: 75, start: 0.95 }}
				class="origin-top-right absolute right-0 w-full mt-1 bg-[#2A303F]
            rounded shadow-md"
			>
				{#each user as u}
					{#if u !== null}
						<button
							on:click={() => setCurrentUser(u)}
							class="flex items-center  w-full px-5 hover:bg-iris-400 hover:text-green-100 text-black dark:text-white"
						>
							<img class="w-[5%] my-2 rounded-full" src={u.avatar_url} alt={u.login} />
							<h5 class="px-5">{u.login}</h5>
						</button>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>
