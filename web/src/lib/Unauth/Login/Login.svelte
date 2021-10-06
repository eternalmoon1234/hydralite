<script lang="ts">
	import Button from './components/Button.svelte';
</script>

<div
	class="fixed z-10 inset-0 overflow-y-auto"
	aria-labelledby="modal-title"
	role="dialog"
	aria-modal="true"
>
	<div
		class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
	>
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" />

		<span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
			>&#8203;</span
		>

		<div
			class="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
		>
			<div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div class="sm:flex sm:items-start flex-col items-center justify-center gap-5">
					<h1 class="font-montserrat font-bold text-acrylic-700 text-center text-2xl w-full">
						Join <span class="font-extrabold text-iris-400">Hydralite</span>
					</h1>
					<div class="grid w-full h-full grid-cols-2 grid-rows-2 gap-3">
						<Button providerName="Google" provider="google" />
						<Button providerName="Twitter" provider="twitter" />
						<Button providerName="GitHub" provider="github" />
						<Button providerName="Linkedin" provider="linkedin" />
					</div>
					<h4 class="text-center text-acrylic-500 font-semibold">
						By creating an account, you agree to our
						<a href="/terms" class="text-iris-400">Terms & Conditions</a> and
						<a href="/privacy" class="text-iris-400">Privacy Policy.</a>
					</h4>
				</div>
			</div>
		</div>
	</div>
</div>
