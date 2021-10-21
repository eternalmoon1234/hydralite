<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import '../fonts.css';
	onMount(() => {
		let theme = localStorage.getItem('theme');
		if (theme === null) {
			let darkMode: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

			if (darkMode) {
				localStorage.setItem('theme', 'dark');
				theme = 'dark';
			} else {
				localStorage.setItem('theme', 'light');
				theme = 'light';
			}
		}
		document.body.classList.add(theme);
	});
</script>

<main class="w-screen h-screen bg-white dark:bg-acrylic-700">
	<slot />
</main>

<style>
	@tailwind base;
	@tailwind components;
	@tailwind utilities;
</style>
