<script lang="ts">
	import type { Project } from '$lib/types/Projects';
	export let proj: Project;
</script>

<a href={`/projects/${proj.url}`}>
	<div class="pl-5 px-2 py-2">
		<img
			src={proj.Image}
			width="50px"
			height="50px"
			class="rounded-full hover:rounded-xl cursor-pointer"
			alt={proj.name}
		/>
	</div>
</a>
