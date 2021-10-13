<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Buttons from './c/Buttons.svelte';
	import axios from 'axios';
    import {Github} from "$lib/git/Github"
	let tab: Writable<string> = getContext('Tabs');
	let config: Writable<any> = getContext('Config');
	const Skip = () => {
		tab.set('details');
	};
	onMount(() => {
		const encryptedKey: string = localStorage.getItem('encryptedKey');
		if (encryptedKey !== null) {
			axios.post(`${import.meta.env.VITE_WEB_URL}decrypt`, { code: encryptedKey }).then((val) => {
				const resp = val.data;
				const { AccessToken, RefreshToken } = JSON.parse(resp);
				let conf = {
					AccessToken: AccessToken,
					RefreshToken: RefreshToken
				};
				config.set(conf);
				localStorage.removeItem('encryptedKey');
				tab.set('repo');
			});
		}
	});
	const OnClick = (provider: string) => {
		axios
			.get(`${import.meta.env.VITE_WEB_URL}auth/import/login?provider=${provider}`)
			.then((val) => {
				const resp = val.data;
				const { url } = resp;
				window.location.replace(url);
			});
	};
</script>

<div
	class="bg-lblack w-[80%] h-[40%] rounded-2xl shadow-lg mt-6 p-6 font-montserrat flex justify-between flex-col"
>
	<div>
		<h1 class="font-semibold text-black dark:text-white font-montserrat text-2xl">
			Import an existing repository
		</h1>
		<h6 class="font-normal text-black dark:text-white mt-1">
			Don’t have a repository? We’ll create one for you, so you can <span
				class="text-iris-400 cursor-pointer font-bold"
				on:click={() => {
					tab.set('details');
				}}>skip this step.</span
			>
		</h6>
	</div>
	<div class="flex items-center justify-between">
		<div class="flex gap-4">
			<Buttons provider="Github" hasImage={true} onClick={OnClick} />
			<Buttons provider="GitLab" hasImage={true} onClick={OnClick} />
			<Buttons provider="BitBucket" hasImage={true} onClick={OnClick} />
		</div>
		<Buttons provider="Skip" hasImage={false} onClick={Skip} />
	</div>
</div>
