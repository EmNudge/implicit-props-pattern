<script>
	import { getContext, setContext } from 'svelte';
	
	export let volume = .2;
	
	const parentNode = getContext('audio-node');
	const audioContext = getContext('audio-context');
	
	const gainNode = audioContext.createGain();
	gainNode.connect(parentNode);
	gainNode.gain.value = volume;
	
	setContext('audio-node', gainNode);
</script>

<slot />