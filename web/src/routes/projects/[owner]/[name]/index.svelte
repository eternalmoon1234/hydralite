<script lang="ts" context="module">
	export async function load({ page }) {
		const {
			params: { owner, name }
		} = page;
		console.log(page.params);
		return { props: { owner, name } };
	}
</script>

<script lang="ts">
	export let owner: string;
	export let name: string;
</script>

{owner}/{name}
