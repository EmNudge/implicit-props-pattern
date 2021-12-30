<script>
	import { getContext, setContext, beforeUpdate } from 'svelte';
	import { key } from './AudioContext.svelte';

	export let frequency = 100;
	export let type = 'sine';
		
	const { audioContext, parentNode } = getContext(key);
	
	const oscillator = audioContext.createOscillator();
	oscillator.type = type;
	oscillator.frequency.value = frequency;
	oscillator.connect(parentNode);
	oscillator.start(0);

	beforeUpdate(() => {
		oscillator.type = type;

		const endTime = audioContext.currentTime + .2;
		oscillator.frequency.linearRampToValueAtTime(frequency, endTime);
	});
	
	setContext(key, {
		audioContext,
		parentNode: oscillator
	});
</script>