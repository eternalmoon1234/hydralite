<script lang="ts">
	export let provider: string;
	export let hasImage: boolean;
	export let onClick;
</script>

<button
	class="bg-acrylic-700 px-7 py-2 rounded-lg shadow-md font-montserrat hover:shadow-none duration-75 flex items-center justify-center gap-3"
	on:click={onClick}
>
	{#if hasImage}
		<img width="20%" src={`/assets/createProject/${provider.toLowerCase()}.svg`} alt="ads" />
	{/if}
	<h1 class="text-white font-medium">
		{provider}
	</h1>
</button>
