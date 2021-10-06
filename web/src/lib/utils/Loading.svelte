<script context="module" lang="ts">
	import axios from 'axios';

	axios
		.get('http://localhost:8000/api/v1/auth/login?provider=github')
		.then((resp) => console.log(resp.data))
		.catch((err) => console.log(err));
</script>

<div>
	<slot />
</div>
