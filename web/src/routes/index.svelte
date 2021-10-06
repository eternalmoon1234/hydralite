<script context="module" lang="ts">
	export const prerender = false;
</script>

<script lang="ts">
	import Loading from '$lib/Loading/Loading.svelte';

	// import Login from '$lib/Unauth/Login/Login.svelte';
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<main class="w-screen h-screen">
	<div class="font-montserrat w-full h-full">
		<Loading />
		<!-- <Login /> -->
	</div>
</main>
