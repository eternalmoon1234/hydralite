<script lang="ts" context="module">
	export async function load({ page }) {
		const {
			params: { provider }
		} = page;

		return { props: { provider } };
	}
</script>

<script>
	import axios from 'axios';
	import { onMount } from 'svelte';
	export let provider;
	onMount(() => {
		axios
			.get(`http://localhost:8000/api/v1/auth/${provider}${window.location.search}`)
			.then((val) => console.log(val.data));
	});
</script>

<div
	class="bg-white h-screen w-screen dark:bg-acrylic-700 flex items-center justify-center absolute flex-col dark:text-white text-black select-none"
>
	<img src="/logo/logo.svg" alt="Hydralite logo" width="8%" class="motion-safe:animate-pulse" />
</div>
