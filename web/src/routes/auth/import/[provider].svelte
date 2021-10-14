<script lang="ts" context="module">
	export async function load({ page }) {
		const {
			params: { provider }
		} = page;

		return { props: { provider } };
	}
</script>

<script lang="ts">
	import axios from 'axios';
	import { onMount } from 'svelte';
	export let provider: string;
	let errorMSG: string = '';
	onMount(() => {
		axios
			.get(`${import.meta.env.VITE_WEB_URL}auth/${provider}/import${window.location.search}`)
			.then((val) => {
				const resp = val.data;
				let { error } = resp;
				if (error === undefined) {
					localStorage.setItem('encryptedKey', resp);
					window.location.replace('/projects/create');
				} else {
					errorMSG = 'An unexpected error occured redirecting you to home page in 5 seconds';
					setTimeout(function () {
						window.location.replace('/');
					}, 5000);
				}
			});
	});
</script>

<div
	class="bg-white h-screen w-screen dark:bg-acrylic-700 flex items-center justify-center absolute flex-col dark:text-white text-black select-none"
>
	<img src="/logo/logo.svg" alt="Hydralite logo" width="8%" class="motion-safe:animate-pulse" />
	<h1 class="duration-500 text-lg font-bold w-[50%] text-center mt-4">{errorMSG}</h1>
</div>
