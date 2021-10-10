<script lang="ts">
	import type { Project } from '$lib/types/Projects';
	export let proj: Project;
</script>

<div class="pl-5 px-2">
	<img src={proj.Image} width="50px" height="50px" class="rounded-full" alt={proj.name} />
</div>
