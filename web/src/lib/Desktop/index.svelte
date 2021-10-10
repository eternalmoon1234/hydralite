<script lang="ts">
	import Skeleton from './Skeleton.svelte';
	import Loading from '$lib/Loading/Loading.svelte';
	import { user } from '../Stores/stores';
</script>

<Loading>
	<Skeleton />
</Loading>
