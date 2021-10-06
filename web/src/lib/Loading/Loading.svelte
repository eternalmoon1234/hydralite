<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '../Stores/stores';
	import axios from 'axios';
	let isUserPopulated: boolean = false;
	onMount(() => {
		if ($user === null) {
			axios
				.get(`${import.meta.env.VITE_WEB_URL}auth/getUser`, {
					headers: {
						Authorization: `bearer ${localStorage.getItem('accessToken')}`
					}
				})
				.then((val) => {
					let { error } = val.data;

					if (error === undefined) {
						user.set(val.data);
					}
				});
			// Send request to API
			isUserPopulated = false;
		} else {
			isUserPopulated = true;
		}
	});
</script>

{#if isUserPopulated}
	<div
		class="bg-white h-screen w-screen dark:bg-acrylic-700 flex items-center justify-center absolute flex-col dark:text-white text-black select-none"
	>
		<img src="/logo/logo.svg" alt="Hydralite logo" width="20%" class="motion-safe:animate-pulse" />
	</div>
{:else}
	{JSON.stringify($user)}
	<slot />
{/if}
