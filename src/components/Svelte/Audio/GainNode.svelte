<script>
	import { getContext, setContext, beforeUpdate } from 'svelte';
	import { key } from './AudioContext.svelte';

	export let volume = .2;
	
	const { audioContext, parentNode } = getContext(key);
	
	const gainNode = audioContext.createGain();
	gainNode.connect(parentNode);
	gainNode.gain.value = volume;
	
	beforeUpdate(() => {
		const endTime = audioContext.currentTime + .2;
		gainNode.gain.linearRampToValueAtTime(volume, endTime);
	});
	
	setContext(key, {
		audioContext,
		parentNode: gainNode,
	});
</script>

<slot />