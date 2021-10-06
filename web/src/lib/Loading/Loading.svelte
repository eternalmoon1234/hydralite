<script lang="ts">
	import { user } from '../Stores/stores';
	let isUserPopulated: boolean = false;
	if (user === null) {
		// Send request to API
		isUserPopulated = false;
	} else {
		isUserPopulated = true;
	}
</script>

{#if isUserPopulated}
	<div
		class="bg-white h-screen w-screen dark:bg-acrylic-700 flex items-center justify-center absolute flex-col dark:text-white text-black select-none"
	>
		<img src="/logo/logo.svg" alt="Hydralite logo" width="20%" class="motion-safe:animate-pulse" />
	</div>
{:else}
	<slot />
{/if}
