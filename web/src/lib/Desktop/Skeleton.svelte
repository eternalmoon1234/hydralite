<script lang="ts">
	import Dropdown from '$lib/assets/Desktop/Dropdown.svelte';
	import { user } from '../Stores/stores';
</script>

<div class="font-montserrat">
	<div class="flex text-black dark:text-white items-center justify-between px-2 h-[60px] w-full">
		<h1 class="font-black text-xl">HYDRALITE</h1>
		<div />
		<div class="flex items-center justify-between w-[185px] h-[43px] p-2 rounded-xl bg-lblack">
			<img src={$user.Profile.ProfilePic} class="rounded-full" width="23" height="23" alt="" />
			<h4 class="text-[17px] font-semibold">
				{$user.Profile.Name}
			</h4>
			<Dropdown />
		</div>
	</div>
</div>
