<script>
	import GainNode from './GainNode.svelte';
	import Oscillator from './Oscillator.svelte';
	import AudioContext from './AudioContext.svelte';
	
	let showAudio = false; 
</script>

<button on:click={() => showAudio = !showAudio}>
	{showAudio ? 'Stop' : 'Play'} Audio
</button>

{#if showAudio}
	<AudioContext>
		<GainNode volume={.2}>
			<Oscillator frequency={300} type="sine" />
		</GainNode>
	</AudioContext>
{/if}