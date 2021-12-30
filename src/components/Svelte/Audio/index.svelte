<script>
	import GainNode from './GainNode.svelte';
	import Oscillator from './Oscillator.svelte';
	import AudioContext from './AudioContext.svelte';
	
	let isPlaying = false;
	let frequency = 300;
</script>

<button on:click={() => isPlaying = !isPlaying}>
	{isPlaying ? 'Stop' : 'Play'} Audio
</button>

<input 
	type="range" min="100" max="1000" step="5"
	bind:value={frequency}
/>

{#if isPlaying}
	<AudioContext>
		<GainNode volume={.2}>
			<Oscillator {frequency} type="sine" />
		</GainNode>
	</AudioContext>
{/if}