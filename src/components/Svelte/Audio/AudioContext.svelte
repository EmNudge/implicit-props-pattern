<script context="module">
	export const key = {};
</script>

<script>
	import { setContext, onDestroy } from 'svelte';

  	const audioContext = new AudioContext();

	setContext(key, {
		audioContext,
		parentNode: audioContext.destination
	});
	
	onDestroy(() => audioContext.close());
</script>

<slot />