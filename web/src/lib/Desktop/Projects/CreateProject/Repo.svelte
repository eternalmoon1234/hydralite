<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { Github } from '$lib/git/Github';
	import OrgDropdown from './c/OrgDropdown.svelte';
	import RepoSearch from './c/RepoSearch.svelte';
	import Tabs from './Tabs.svelte';

	interface Repository {
		full_name: string;
		org: string;
		name: string;
	}

	interface Organizations {
		avatar_url: string;
		id: number;
		login: string;
	}

	let tab: Writable<string> = getContext('Tabs');
	let allRepos = [];
	let allOrgs = [];
	let User;
	let config: Writable<any> = getContext('Config');
	let gitInfo: Writable<any> = getContext('GitInfo');
	let currentOrg: string;
	let currentRepo: string;
	let github = new Github($config.AccessToken, $config.RefreshToken);
	const submit = () => {
		let Info = {
			repo: currentRepo,
			org: currentOrg
		};
		gitInfo.set(Info);
		tab.set('details');
	};
	const getRepo = (): [Repository] => {
		return allRepos as any as [Repository];
	};
	const setCurrentRepo = (name: string) => {
		currentRepo = name;
	};
	const setCurrentOrg = (name: string) => {
		currentOrg = name;
		github.getReposFromOrg(name).then((val) => {
			allRepos = [];
			for (let index = 0; index < val.length; index++) {
				const element: Repository = val[index];
				let felement: Repository = {
					full_name: '',
					name: '',
					org: ''
				};
				felement.full_name = element.full_name;
				const ele = element.full_name.split('/');
				felement.org = ele[0];
				felement.name = ele[1];
				allRepos.push(felement);
			}
		});
	};
	const getCurrentOrg = (): string => {
		return currentOrg;
	};
	if ($config !== null) {
		// @ts-ignore
		github.User.then((val) => {
			User = val;
			github.GetOrgs().then((val) => {
				for (let index = 0; index < val.length; index++) {
					const element: Organizations = val[index];
					const felement: Organizations = {
						avatar_url: element.avatar_url,
						id: element.id,
						login: element.login
					};
					allOrgs.push(felement);
				}
				allOrgs = val;
				allOrgs.push(User);
			});
			setCurrentOrg(User.login);
		});
	} else {
		tab.set('provider');
	}
</script>

<div
	class="bg-lblack w-[80%] h-auto rounded-2xl shadow-lg mt-6 p-6 font-montserrat flex justify-between flex-col"
>
	<div>
		<h1 class="font-semibold text-black dark:text-white font-montserrat text-2xl">
			Import an existing repository
		</h1>
		<h6 class="font-normal mt-2 text-black dark:text-white">
			Don’t have a repository? We’ll create one for you, so you can <span
				class="text-iris-300 cursor-pointer font-extrabold"
				on:click={() => {
					tab.set('details');
				}}>skip this step.</span
			>
		</h6>
	</div>
	<div class="flex w-[100%] gap-3 mt-5">
		<div class="w-[100%] bg-[#2A303F]">
			{#if allOrgs.length !== 0}
				<OrgDropdown user={allOrgs} currentUser={User} {setCurrentOrg} />
			{/if}
		</div>
		<div class="w-[100%]">
			<RepoSearch {getRepo} currentOrg={getCurrentOrg} {setCurrentRepo} {currentRepo} />
		</div>
	</div>
	<div class="flex items-center w-full justify-end mt-11">
		<button
			on:click={() => submit()}
			class="bg-[#2E374A] border-2 border-acrylic-600 px-7 py-2 rounded-lg shadow-md font-montserrat hover:shadow-none duration-75 flex items-center justify-center gap-3"
		>
			<h1 class="text-white font-medium">Continue</h1>
		</button>
	</div>
</div>
