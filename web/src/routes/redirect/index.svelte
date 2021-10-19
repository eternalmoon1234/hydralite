<script lang="ts" context="module">
	export async function load({ page }) {
		let url = page.query.get('url');
		return { props: { url } };
	}
</script>

<script>
	import { goto } from '$app/navigation';
	import Skeleton from '$lib/Desktop/Skeleton.svelte';
	import Loading from '$lib/Loading/Loading.svelte';
	import { projects } from '$lib/Stores/stores';
import { useEffect } from '$lib/utils/useEffect';
	export let url;
	projects.subscribe((val) => {
		if (val !== null) {
			goto(url);
		}
	});
	useEffect(()=>{
		if (projects !== null){
			goto(url);
		}
	}, ()=>[projects])
</script>

<Loading>
	<Skeleton />
</Loading>
