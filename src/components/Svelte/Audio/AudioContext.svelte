<script>
	import { setContext, onDestroy } from 'svelte';
	
	const AudioContext = window.AudioContext || window.webkitAudioContext;
  	const audioContext = new AudioContext();

	setContext('audio-context', audioContext);
	setContext('audio-node', audioContext.destination);
	
	onDestroy(() => {
		audioContext.close();
	});
</script>

<slot />