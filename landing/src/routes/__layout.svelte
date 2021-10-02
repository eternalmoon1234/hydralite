<script lang="ts">
	import Logo from '$lib/Logo.svelte';
	import '../app.css';
	import '../fonts.css';
	let scrollYAxis;
</script>

<svelte:window bind:scrollY={scrollYAxis} />

<div class={`nav ${scrollYAxis > 500 ? 'nav-bg' : ''} z-[100]`}>
	<h1>
		<Logo height="50" />
	</h1>
	<button class="font-extrabold font-montserrat">Join Waitlist</button>
</div>

<main>
	<slot />
</main>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;

	.nav {
		@apply flex fixed p-12 inset-x-0 top-0 bg-transparent items-center justify-between w-screen h-[10px] duration-200 border-transparent border-b text-gray-600 backdrop-filter backdrop-blur-lg;
	}

	.nav-bg {
		@apply backdrop-filter backdrop-blur-lg bg-opacity-25 border-b border-gray-300 text-gray-400;
	}
</style>
