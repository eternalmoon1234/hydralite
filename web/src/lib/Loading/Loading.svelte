<script lang="ts">
	import { onMount } from 'svelte';
	import Login from '../Unauth/Login/Login.svelte';
	import { user, projects } from '../Stores/stores';
	import axios from 'axios';
	let err = false;
	let isUserPopulated: boolean = false;
	let isProjectPopulated: boolean = false;
	onMount(() => {
		let accessToken = localStorage.getItem('accessToken');
		if (accessToken == null) {
			err = true;
		} else {
			if ($user === null && $projects === null) {
				axios
					.all([
						axios.get(`${import.meta.env.VITE_WEB_URL}auth/getUser`, {
							headers: {
								Authorization: `bearer ${accessToken}`
							}
						}),
						axios.get(`${import.meta.env.VITE_WEB_URL}project/getProjects`, {
							headers: {
								Authorization: `bearer ${accessToken}`
							}
						})
					])
					.then(
						axios.spread((data1, data2) => {
							let { error } = data1.data;
							console.log(data1.data);
							if (error === undefined) {
								user.set(data1.data);
								isUserPopulated = true;
							} else {
								err = true;
							}
							let { error2 } = data2.data;
							console.log(data2.data);
							if (error2 === undefined) {
								projects.set(data2.data);
								isProjectPopulated = true;
							} else {
								err = true;
							}
						})
					);
			} else {
				isUserPopulated = true;
				isProjectPopulated = true;
			}
		}
	});
</script>

{#if err}
	<Login />
{/if}
{#if !isUserPopulated && !isProjectPopulated}
	<div
		class="bg-white h-screen w-screen dark:bg-acrylic-700 flex items-center justify-center absolute flex-col dark:text-white text-black select-none"
	>
		<img src="/logo/logo.svg" alt="Hydralite logo" width="20%" class="motion-safe:animate-pulse" />
	</div>
{:else}
	<slot />
{/if}
