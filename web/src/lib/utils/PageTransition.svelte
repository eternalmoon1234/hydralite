<script>
	import { fade } from 'svelte/transition';
	import Loading from './Loading.svelte';
</script>

<Loading>
	<div in:fade>
		<slot />
	</div>
</Loading>
