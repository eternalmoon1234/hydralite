<script lang="ts">
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import VisibilityDropDown from './c/VisibilityDropDown.svelte';
	import axios from 'axios';
	import { notifications } from '$lib/Toast/notifs';
	import Toast from '$lib/Toast/Toast.svelte';
	let tab: Writable<string> = getContext('Tabs');
	let isPublic: boolean = true;
	const setISPublic = (val: boolean) => {
		isPublic = val;
	};
	const getISPublic = (): boolean => {
		return isPublic;
	};
	let name: string;
	let description;
	let gitInfo: Writable<any> = getContext('GitInfo');
	const submit = () => {
		let accessToken = localStorage.getItem('accessToken');
		axios
			.post(
				`${import.meta.env.VITE_WEB_URL}project/createProject`,
				{
					name: name,
					description: description,
					private: isPublic ? 'false' : 'true',
					git_repo: $gitInfo !== null ? `${$gitInfo.org}/${$gitInfo.repo}` : ''
				},
				{
					headers: {
						Authorization: `bearer ${accessToken}`
					}
				}
			)
			.then((val) => {
				const resp = val.data as any;
				let { error } = resp;
				if (error === undefined) {
					window.location.replace('/');
				} else {
					notifications.danger(error, 3000);
				}
			});
	};
</script>

<Toast />

<div
	class="bg-lblack w-[80%] h-auto flex justify-center flex-col rounded-2xl shadow-lg mt-6 p-6 font-montserrat text-black dark:text-white"
>
	<h1 class="font-semibold text-black dark:text-white font-montserrat text-2xl">Project details</h1>
	<h6 class="font-normal mt-2 text-black dark:text-white">
		Already have a repository? <span
			class="text-iris-300 cursor-pointer font-extrabold"
			on:click={() => {
				tab.set('details');
			}}
		>
			Import it</span
		>
	</h6>
	<div class="flex items-center justify-center flex-col">
		<div class="gap-3 w-full h-[50px] mt-3 grid grid-cols-3">
			<div class="w-full h-full col-span-2">
				<label for="name">Name</label>
				<input
					bind:value={name}
					type="text"
					id="name"
					placeholder="Name"
					class="w-full h-full bg-[#2F3541] focus:outline-none px-3 rounded-lg"
				/>
			</div>
			<div class="w-full h-full">
				<label for="name" class="mb-2">Visibility</label>
				<VisibilityDropDown getisPublic={getISPublic} setisPublic={setISPublic} />
			</div>
		</div>
		<div class="w-full h-[12vh] flex mt-10 flex-col">
			<label class="mb-2" for="description">Description</label>
			<textarea
				bind:value={description}
				type="text"
				id="description"
				placeholder="Description"
				maxlength="190"
				rows="6"
				spellcheck="false"
				style="padding-right: 31.69px;"
				class="rounded-xl w-full h-full focus:outline-none text-black bg-[#2F3541] px-3 py-2 resize-none dark:text-white"
			/>
		</div>
	</div>
	<div class="flex items-center w-full justify-end mt-5">
		<button
			on:click={() => submit()}
			class="bg-iris-500 border-2 border-[#596FE7] px-7 py-2 rounded-lg shadow-md font-montserrat hover:shadow-none duration-75 flex items-center justify-center gap-3"
		>
			<h1 class="text-white font-medium">Continue</h1>
		</button>
	</div>
</div>
