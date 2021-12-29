<script>
	import { getContext, setContext, beforeUpdate } from 'svelte';
	
	export let frequency = 100;
	export let type = 'sine';
		
	const parentNode = getContext('audio-node');
	const audioContext = getContext('audio-context');
	
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
	
	setContext('audio-node', parentNode);
</script>