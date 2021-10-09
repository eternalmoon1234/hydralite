<script context="module" lang="ts">
	export const prerender = true;
	import Collaborate from '$lib/Collaborate.svelte';
	import Community from '$lib/Community.svelte';
	import Discover from '$lib/Discover.svelte';
	import Git from '$lib/Git.svelte';
	import Integrations from '$lib/Integrations.svelte';
	import Project from '$lib/Project.svelte';
	import FireStore from '../firebase';
	import Release from '$lib/Release.svelte';
	import Typewriter from 'svelte-typewriter';
	import Toast from '$lib/Toast/Toast.svelte';
	let email = '';
	const firestoreManager = new FireStore();
	import { notifications } from '$lib/Toast/notifs';
	const WaitlistEmail = () => {
		firestoreManager.validateEmail(email).then((status) => {
			console.log(status);
			if (status == 'Success') {
				firestoreManager.setEmail(email);
				notifications.success(status, 3000);
			} else {
				notifications.danger(status, 3000);
			}
		});
		console.log(email);
	};
</script>

<Toast />
<div class="w-full h-screen flex items-center justify-center flex-col gap-3">
	<h1
		class="font-bold text-center text-4xl leading-[1.40] font-montserrat text-[#414141] tracking-normal"
	>
		The place for Developers to
		<br />
		<Typewriter loop interval={80} cursor={false}>
			<span class="text-accent font-extrabold">Discover</span>
			<span class="text-accent font-extrabold">Develop</span>
			<span class="text-accent font-extrabold">Deploy</span>{' '}Software
		</Typewriter>
	</h1>
	<h4 class="text-center font-montserrat font-extrabold text-[#414141]">
		Connect with like-minded developers, onboard investors <br /> and seamlessly manage your codebase.
	</h4>
</div>
<div
	class="bg-[#2A3753] w-full h-[600px] lg:h-[400px] flex items-center justify-around relative z-50"
>
	<div class="flex gap-3 flex-col font-montserrat w-[50%] lg:w-[25%] lg:ml-28">
		<h4 class="font-extrabold tracking-wider text-xs text-white">FAST, INTUITIVE, POWERFUL</h4>
		<h2 class="font-extrabold text-xl tracking-wider text-accent">PROJECT MANAGEMENT</h2>
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
		class="hidden xl:flex absolute w-full bottom-[-10vh] lg:bottom-[-25vh] xl:bottom-[-20vh] items-center justify-center"
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
	class="bg-white w-full h-[600px] lg:h-[400px] lg:mt-[20vh] flex items-center justify-around relative mt-7"
>
	<div class="hidden lg:flex">
		<Discover />
	</div>
	<div class="flex gap-3 flex-col font-montserrat w-[50%] lg:w-[25%] lg:mr-36">
		<h4 class="font-extrabold tracking-wider text-xs text-black">EXPLORE. CONNECT. BUILD.</h4>
		<h2 class="font-extrabold text-xl tracking-wider text-accent">DISCOVER</h2>
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
		<h4 class="font-extrabold tracking-wider text-xs text-white">COLLABORATE. INNOVATE. SHIP.</h4>
		<h2 class="font-extrabold text-xl tracking-wider text-accent">COLLABORATE</h2>
		<h6 class="font-bold text-white tracking-normal">
			Build your dream development team. Work with pioneers in the industry. Sign sponsorships and
			onboard investors.
		</h6>
	</div>
	<div class="hidden lg:flex">
		<Collaborate />
	</div>
</div>

<div class="w-full h-[800px] md:h-[500px]  flex items-center justify-center" id="waitlist">
	<div
		class="bg-[#EAEAEA] w-[100%] h-[100%] md:w-[80%] md:h-[80%] rounded-lg grid grid-cols-1 md:grid-cols-4"
	>
		<div class="w-full h-full col-span-3 flex items-center justify-center p-2">
			<div
				class="bg-white w-full h-full rounded-lg shadow-2xl flex flex-col items-center justify-around"
			>
				<div class="font-montserrat flex items-center justify-center flex-col gap-3">
					<h1 class="text-2xl font-bold">Join the waitlist!</h1>
					<h4 class="font-semibold">Get notified when hydralite releases!</h4>
				</div>
				<div class="w-[80%] bg-[#F9F9F9] rounded-full h-[60px] grid grid-cols-4 p-3">
					<input
						type="text"
						class="bg-transparent w-full h-full col-span-3 pl-4 focus:outline-none"
						placeholder="Email.."
						bind:value={email}
						name=""
						id=""
					/>
					<button class="w-full h-full bg-accent rounded-full text-white" on:click={WaitlistEmail}
						>Submit!</button
					>
				</div>
			</div>
		</div>
		<div class="w-full h-full flex items-center justify-center p-2">
			<div
				class="bg-white w-full h-full rounded-lg shadow-2xl flex items-center flex-col justify-around font-montserrat font-semibold"
			>
				<h1>Join our discord!</h1>
				<a
					class="w-[80%] h-[30px] bg-accent rounded-full text-white font-bold flex items-center justify-center"
					href="https://discord.gg/pRuPhftzbw"
					target="_blank">Take me there!</a
				>
			</div>
		</div>
		<div class="w-full h-full col-span-3 flex items-center justify-center p-2">
			<div
				class="bg-white w-full h-full rounded-lg shadow-2xl flex flex-col items-center justify-around"
			>
				<div class="font-montserrat flex items-center justify-center flex-col gap-3">
					<h1 class="text-2xl font-bold">Have queries?</h1>
					<div class="font-semibold flex">
						Email us at <span
							class="ml-1 text-accent cursor-pointer hover:text-black duration-700"
							on:click={() => window.location.replace('mailto:team@hydralite.io')}
							>team@hydralite.io</span
						>
					</div>
				</div>
			</div>
		</div>
		<div class="w-full h-full flex items-center justify-center p-2">
			<div
				class="bg-white w-full h-full rounded-lg shadow-2xl flex items-center flex-col justify-around font-montserrat font-semibold"
			>
				<h1>Checkout our github!</h1>
				<a
					class="w-[80%] h-[30px] bg-accent rounded-full text-white font-bold flex items-center justify-center"
					href="https://github.com/hydralite/"
					target="_blank">Take me there!</a
				>
			</div>
		</div>
	</div>
</div>
<div class="w-full h-[250px] bg-[#2A3753] flex items-center justify-around">
	<img src="/favicon.png" alt="Hydralite logo" width="100px" />
</div>
