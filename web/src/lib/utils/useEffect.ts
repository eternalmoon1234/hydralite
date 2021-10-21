// https://svelte.dev/repl/300c16ee38af49e98261eef02a9b04a8?version=3.44.0
import { afterUpdate, onDestroy } from 'svelte';

export function useEffect(cb, deps) {
	let cleanup;
	
	function apply() {
		if (cleanup) cleanup();
		cleanup = cb();
	}
	
	if (deps) {
		let values = [];
		afterUpdate(() => {
			const new_values = deps();
			if (new_values.some((value, i) => value !== values[i])) {
				apply();
				values = new_values;
			}
		});
	} else {
		// no deps = always run
		afterUpdate(apply);
	}
	
	onDestroy(() => {
		if (cleanup) cleanup();
	});
}