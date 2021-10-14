<script lang="ts">
	import Loading from '$lib/Loading/Loading.svelte';
	import Skeleton from '$lib/Desktop/Skeleton.svelte';
	import Tabs from '$lib/Desktop/Projects/CreateProject/Tabs.svelte';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';
	import Provider from '$lib/Desktop/Projects/CreateProject/Provider.svelte';
	import Repo from '$lib/Desktop/Projects/CreateProject/Repo.svelte';
	import Details from '$lib/Desktop/Projects/CreateProject/Details.svelte';
	let tab = writable('provider');
	setContext('Tabs', tab);
	let config = writable(null);
	let gitinfo = writable(null);
	setContext('Config', config);
	setContext('GitInfo', gitinfo);
</script>

<Loading>
	<Skeleton sidebar={false}>
		<div class="w-full h-[calc(100vh-100px)] flex items-center mt-5 justify-start flex-col gap-8">
			<h1 class="text-3xl font-medium text-black dark:text-white">
				Create a new <span class="text-iris-400 font-extrabold">Project</span>
			</h1>
			<Tabs />
			{#if $tab == 'provider'}
				<Provider />
			{:else if $tab == 'repo'}
				<Repo />
			{:else if $tab == 'details'}
				<Details />
			{:else}
				<h1>An unexpected error occured</h1>
			{/if}
		</div>
	</Skeleton>
</Loading>
