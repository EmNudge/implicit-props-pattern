<script>
	import { getContext, setContext, beforeUpdate } from 'svelte';
	
	export let volume = .2;
	
	const parentNode = getContext('audio-node');
	const audioContext = getContext('audio-context');
	
	const gainNode = audioContext.createGain();
	gainNode.connect(parentNode);
	gainNode.gain.value = volume;
	
	beforeUpdate(() => {
		const endTime = audioContext.currentTime + .2;
		gainNode.gain.linearRampToValueAtTime(volume, endTime);
	});
	
	setContext('audio-node', gainNode);
</script>

<slot />