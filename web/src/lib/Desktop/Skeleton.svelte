<script lang="ts">
	import Dropdown from '$lib/assets/Desktop/Dropdown.svelte';
	import ProjectIcons from './Projects/ProjectIcons.svelte';
	import { user, projects } from '../Stores/stores';
	export let sidebar: boolean = true;
</script>

<div class="font-montserrat">
	<div class="flex text-black dark:text-white items-center justify-between px-5 h-[60px] w-full">
		<h1 class="font-black text-xl">HYDRALITE</h1>
		<div class="flex items-center justify-center gap-5">
			<h3 class="text-lg font-semibold">Discover</h3>
			<h3 class="text-lg font-semibold text-iris-300">Projects</h3>
			<h3 class="text-lg font-semibold">Blog</h3>
			<h3 class="text-lg font-semibold">Project Ideas</h3>
		</div>
		<div class="flex items-center justify-between w-[185px] h-[43px] p-2 rounded-xl bg-lblack">
			<img src={$user.Profile.ProfilePic} class="rounded-full" width="23" height="23" alt="" />
			<h4 class="text-[17px] font-semibold">
				{$user.Profile.Name}
			</h4>
			<Dropdown />
		</div>
	</div>
	<div class="flex">
		{#if sidebar}
			<div class="h-[calc(100vh-60px)] w-[70px] flex-col items-center justify-center gap-3">
				{#each $projects.Projects as proj}
					<ProjectIcons {proj} />
				{/each}
			</div>
		{/if}
		<slot />
	</div>
</div>
