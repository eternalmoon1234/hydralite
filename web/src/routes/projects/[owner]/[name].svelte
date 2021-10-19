<script lang="ts" context="module">
	export async function load({ page }) {
		const {
			params: { owner, name }
		} = page;
		let currentProj: Project;
		let redirect: boolean;
		projects.subscribe((val) => {
			if (val === null) {
				redirect = true;
			} else {
				for (let i = 0; i < val.Projects.length; i++) {
					if (val.Projects[i].url == `${owner}/${name}`) {
						currentProj = val.Projects[i];
					}
				}
			}
		});
		return { props: { pname: `${owner}/${name}`, currentProj, redirect } };
	}
</script>

<script lang="ts">
	import axios from 'axios';
	import { projects } from '$lib/Stores/stores';
	import { onMount } from 'svelte';
	import type { Project } from '$lib/types/Projects';
	import Loading from '$lib/Loading/Loading.svelte';
	import Skeleton from '$lib/Desktop/Skeleton.svelte';
	import { goto } from '$app/navigation';
	import { useEffect } from '$lib/utils/useEffect';
	export let currentProj: Project;
	export let pname: string;
	export let canUserView: boolean;

	let sidebarElements = [
		{
			name: 'Home',
			active: true,
			route: '/'
		},
		{
			name: 'Feed',
			active: false,
			route: '/feed'
		},
		{
			name: 'Roadmap',
			active: false,
			route: '/roadmap'
		}
	];
	useEffect(
		() => {
			projects.subscribe((val) => {
				if (val === null) {
					goto(`/redirect?url=/projects/${pname}`);
				}
			});
		},
		() => [projects]
	);

	onMount(() => {
		let accessToken = localStorage.getItem('accessToken');
		axios
			.post(
				`${import.meta.env.VITE_WEB_URL}project/userHasPerms`,
				{
					projectURL: pname
				},
				{
					headers: {
						Authorization: `bearer ${accessToken}`
					}
				}
			)
			.then((val) => {
				const { error } = val.data as any;
				if (error) {
					canUserView = false;
				} else {
					canUserView = val.data['val'];
					// canUserView = false
				}
			});
	});
</script>

<div class="text-white">
	<Loading>
		<Skeleton sidebar={true}>
			{#if canUserView && currentProj !== undefined}
				<div class="px-3 h-full w-[200px] flex flex-col">
					<div>
						<h1 class="text-xl font-extrabold w-[95%] truncate">
							{currentProj.name}
						</h1>
						<h5 class="text-xs font-bold">120 members</h5>
					</div>
					<div class="flex items-start justify-center flex-col gap-5 pt-4">
						{#each sidebarElements as ele}
							<div
							on:click={()=>goto(`${window.location.pathname}${ele.route}`)}
								class={`cursor-pointer w-[65%] hover:border-[#171c25] ${ele.active ? "border" : ""} h-full flex items-center justify-center ${ele.active ? "border-[#2B3343]" : "hover:border-[#2B3343]"} rounded-xl px-5 py-2 ${ele.active ? "bg-[#282E3B]" : "hover:bg-[#282E3b]"} bg-opacity-70 duration-150`}
							>
								{ele.name}
							</div>
						{/each}
								<!-- class="cursor-pointer w-[65%] hover:border-[#171c25] h-full border border-[#2B3343] rounded-xl flex items-center justify-center px-5 py-2 bg-[#282E3B] bg-opacity-80 duration-150" -->
					</div>
				</div>
			{:else}
				<div>Uh oh! Looks like you don't have access to this project</div>
			{/if}
		</Skeleton>
	</Loading>
</div>
