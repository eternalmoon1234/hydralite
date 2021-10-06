<script lang="ts">
	import Google from '../../../assets/Login/Google.svg';
	import Twitter from '../../../assets/Login/Twitter.svg';
	import Github from '../../../assets/Login/Github.svg';
	import Linkedin from '../../../assets/Login/Linkedin.svg';
	export let providerName: string;
	export let provider: string;
	let icon;
	if (provider == 'google') {
		icon = Google;
	} else if (provider == 'github') {
		icon = Github;
	} else if (provider == 'twitter') {
		icon = Twitter;
	} else {
		icon = Linkedin;
	}
</script>

<div
	class="w-full h-full bg-acrylic-100 px-4 py-3 flex items-center justify-center gap-3 rounded-lg cursor-pointer hover:bg-acrylic-200 duration-200 font-bold "
>
	<img src={icon} alt="" width="20em" />
	{providerName}
</div>
