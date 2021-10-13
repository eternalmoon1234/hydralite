<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { Github } from '$lib/git/Github';
import OrgDropdown from './c/OrgDropdown.svelte';
	interface Repository {
		full_name: string;
		org: string;
		name: string;
	}
	interface Organizations{
		avatar_url: string;
		id: number;
		login: string
	}
	let tab: Writable<string> = getContext('Tabs');
	let allRepos = [];
	let allOrgs = [];
	let User;
	let config: Writable<any> = getContext('Config');

	if ($config !== null) {
		// @ts-ignore
		let github = new Github($config.AccessToken, $config.RefreshToken);
		github.User.then((val)=>{
			User = val
		})
		github.GetOrgs().then((val)=>{
			for (let index = 0; index < val.length; index++) {
				const element: Organizations = val[index];
				const felement: Organizations = {
					avatar_url: element.avatar_url,
					id: element.id,
					login: element.login,
				}
				allOrgs.push(felement);
			}
			allOrgs = val
		})
		github.GetRepos().then((val)=>{
			for (let index = 0; index < val.length; index++) {
				const element: Repository = val[index];
				let felement: Repository = {
					full_name: "",
					name: "",
					org: ""
				};
				felement.full_name = element.full_name
				const ele = element.full_name.split("/")
				if (ele[0] !== User.login){
					felement.org = ele[0]
				}
				felement.name = ele[1]
				allRepos.push(felement)
			}
		})
		console.log(allRepos)
		console.log(allOrgs)
	} else {
		tab.set('provider');
	}
	let user = {
		picture: "https://codechips.me/assets/images/ism.webp",

		name: "Cool"
	}
</script>

<div
	class="bg-lblack w-[80%] h-[40%] rounded-2xl shadow-lg mt-6 p-6 font-montserrat flex justify-between flex-col"
>
	<h1 class="font-semibold text-black dark:text-white font-montserrat text-2xl">
		Import an existing repository
	</h1>
	<h6 class="font-normal mt-2 text-black dark:text-white">
		Don’t have a repository? We’ll create one for you, so you can <span
			class="text-iris-400 cursor-pointer"
			on:click={() => {
				tab.set('details');
			}}>skip this step.</span
		>
	</h6>
	<div class="w-[50%] bg-[#2A303F] ">
		{#if allOrgs.length !== 0}
			<OrgDropdown user={allOrgs} currentUser={User}/>
		{/if}
	</div>
</div>

