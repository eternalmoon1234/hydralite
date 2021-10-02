<script context="module" lang="ts">
	export const prerender = true;
	import Collaborate from '$lib/Collaborate.svelte';
	import Community from '$lib/Community.svelte';
	import Discover from '$lib/Discover.svelte';
	import Git from '$lib/Git.svelte';
	import Integrations from '$lib/Integrations.svelte';
	import Project from '$lib/Project.svelte';
	import Release from '$lib/Release.svelte';
	import { onMount } from 'svelte';
	import Typewriter from 'svelte-typewriter';
</script>

<script>
	var isLg = false;
	onMount(() => {
		isLg = window.innerWidth < 800;
	});
</script>

<div class="w-full h-screen flex items-center justify-center flex-col gap-3">
	<h1
		class="font-bold text-center text-4xl leading-[1.40] font-montserrat text-[#414141] tracking-normal"
	>
		The place for Developers to {isLg}
		<br />
		<Typewriter loop interval={80} cursor={false}>
			<span class="text-accent font-extrabold">Discover</span>
			<span class="text-accent font-extrabold">Develop</span>
			<span class="text-accent font-extrabold">Deploy</span>{' '}Software
		</Typewriter>
	</h1>
	<h5 class="text-center font-extrabold text-[#414141]">
		Connect with like-minded developers, onboard investors <br /> and seamlessly manage your codebase.
	</h5>
</div>
<div
	class="bg-[#2A3753] w-full h-[600px] lg:h-[400px] flex items-center justify-around relative z-50"
>
	<div class="flex gap-3 flex-col font-montserrat w-[50%] lg:w-[25%] lg:ml-28">
		<h1 class="font-extrabold tracking-wider text-xs text-white">FAST, INTUITIVE, POWERFUL</h1>
		<h4 class="font-extrabold text-xl tracking-wider text-accent">PROJECT MANAGEMENT</h4>
		<h6 class="font-bold text-white tracking-normal">
			Hydralite allows easy, intuitive project management, create brainstorming sessions, audio
			rooms, inbuilt source control, project insights, task management, project roadmaps and much
			more!
		</h6>
	</div>
	<div class="hidden lg:flex">
		<Project />
	</div>
	<div
		class="hidden xl:flex absolute w-full bottom-[-10vh] lg:bottom-[-20vh] items-center justify-center"
	>
		<div class="rounded-3xl shadow-2xl w-[80%] h-[225px] bg-white grid grid-cols-4 px-5">
			<div class="w-full h-full flex items-center justify-around flex-col">
				<Integrations height="70px" />
				<h6 class="text-center font-montserrat text-sm font-semibold">
					Hydralite’s tightly integrated with your favourite providers! You can do it all through
					Hydralite.
				</h6>
			</div>
			<div class="w-full h-full flex items-center justify-around flex-col">
				<Git height="70px" />
				<h6 class="text-center font-montserrat text-sm font-semibold">
					Integrated with Github, Bitbucket and Gitlab for seamless codebase management.
				</h6>
			</div>
			<div class="w-full h-full flex items-center justify-around flex-col">
				<Release height="70px" />
				<h6 class="text-center font-montserrat text-sm font-semibold">
					Hydralite allows you to handle releases easily using our integrations.
				</h6>
			</div>
			<div class="w-full h-full flex items-center justify-around flex-col">
				<Community height="70px" />
				<h6 class="text-center font-montserrat text-sm font-semibold">
					Hydralite allows you to handle releases easily using our integrations.
				</h6>
			</div>
		</div>
	</div>
</div>

<div
	class="bg-white w-full h-[600px] lg:h-[400px] lg:mt-40 flex items-center justify-around relative mt-7"
>
	<div class="hidden lg:flex">
		<Discover />
	</div>
	<div class="flex gap-3 flex-col font-montserrat w-[50%] lg:w-[25%] lg:mr-36">
		<h1 class="font-extrabold tracking-wider text-xs text-black">EXPLORE. CONNECT. BUILD.</h1>
		<h4 class="font-extrabold text-xl tracking-wider text-accent">DISCOVER</h4>
		<h6 class="font-bold text-black tracking-normal">
			Connect with like-minded developers and build a followership. Find your next project idea with
			Hydralite’s built in project idea explorer. Discover other incredible projects, big or small!
		</h6>
	</div>
</div>

<div
	class="bg-[#2A3753] w-full h-[600px] lg:h-[400px] flex items-center justify-around relative mt-7"
>
	<div class="flex gap-3 flex-col font-montserrat w-[50%] lg:w-[25%] lg:ml-28">
		<h1 class="font-extrabold tracking-wider text-xs text-white">COLLABORATE. INNOVATE. SHIP.</h1>
		<h4 class="font-extrabold text-xl tracking-wider text-accent">COLLABORATE</h4>
		<h6 class="font-bold text-white tracking-normal">
			Build your dream development team. Work with pioneers in the industry. Sign sponsorships and
			onboard investors.
		</h6>
	</div>
	<div class="hidden lg:flex">
		<Collaborate />
	</div>
</div>

<div class="w-full h-[600px] flex items-center justify-center">
	<div class="bg-[#EAEAEA] w-[60%] h-[80%] rounded-lg grid grid-cols-4 grid-rows-2 ">
		<div class="w-full h-full col-span-3 flex items-center justify-center p-2 ">
			<div class="bg-white w-full h-full rounded-lg shadow-2xl" />
		</div>
		<div class="w-full h-full flex items-center justify-center p-2 ">
			<div class="bg-white w-full h-full rounded-lg shadow-2xl" />
		</div>
		<div class="w-full h-full col-span-3 flex items-center justify-center p-2">
			<div class="bg-white w-full h-full rounded-lg shadow-2xl" />
		</div>
		<div class="w-full h-full flex items-center justify-center p-2">
			<div class="bg-white w-full h-full rounded-lg shadow-2xl" />
		</div>
	</div>
</div>
