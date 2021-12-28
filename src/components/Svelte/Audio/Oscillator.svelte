<script>
	import { getContext, setContext } from 'svelte';
	
	export let frequency = 100;
	export let type = 'sine';
		
	const parentNode = getContext('audio-node');
	const audioContext = getContext('audio-context');
	
	const oscillator = audioContext.createOscillator();
	oscillator.type = type;
	oscillator.frequency.value = frequency;
	oscillator.connect(parentNode);
	oscillator.start(0);
	
	setContext('audio-node', parentNode);
</script>