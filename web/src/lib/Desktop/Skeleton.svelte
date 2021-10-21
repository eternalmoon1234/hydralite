<script lang="ts">
	import Dropdown from '$lib/assets/Desktop/Dropdown.svelte';
	import ProjectIcons from './Projects/ProjectIcons.svelte';
	import { user, projects } from '../Stores/stores';
	import Plus from '$lib/assets/Desktop/Plus.svelte';
	import Button from '$lib/Unauth/Login/components/Button.svelte';
	import Loading from '$lib/Loading/Loading.svelte';
	export let sidebar: boolean = true;
</script>

<Loading>
	<div class="font-montserrat">
		<div class="flex text-black dark:text-white items-center justify-between px-5 h-[60px] w-full">
			<a class="font-black text-xl cursor-pointer " href="/">HYDRALITE</a>
			<div class="flex items-center justify-center gap-9">
				<h3 class="text-lg font-semibold">Discover</h3>
				<h3 class="text-lg font-semibold text-iris-300">Projects</h3>
				<h3 class="text-lg font-semibold">Blog</h3>
				<h3 class="text-lg font-semibold">Project Ideas</h3>
			</div>
			<div class="flex items-center justify-between w-auto h-[43px] p-2 rounded-xl bg-lblack">
				<img src={$user.Profile.ProfilePic} class="rounded-full" width="23" height="23" alt="" />
				<!-- <h4 class="text-[17px] px-2 font-semibold w-[185px-23px] truncate">
				{$user.Profile.Name}
			</h4> -->
				<Dropdown />
			</div>
		</div>
		<div class="flex">
			{#if sidebar}
				<div class="h-[calc(100vh-60px)] w-[70px] flex-col items-center justify-center gap-3">
					{#if $projects.Projects === null}
						<div />
					{:else}
						{#each $projects.Projects as proj}
							<ProjectIcons {proj} />
						{/each}
					{/if}
					<a href="/projects/create">
						<div
							class="w-[50px] h-[50px] ml-4 mt-2 rounded-full hover:rounded-xl cursor-pointer bg-lblack flex items-center justify-center"
						>
							<Plus />
						</div></a
					>
				</div>
			{/if}
			<div class="w-full">
				<slot />
			</div>
		</div>
	</div>
</Loading>
