<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Login from '$lib/Unauth/Login/Login.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main class="w-screen h-screen">
	<div class="font-montserrat w-full h-full bg-white">
		<Login />
	</div>
</main>
