<script>
	import GainNode from './GainNode.svelte';
	import Oscillator from './Oscillator.svelte';
	import AudioContext from './AudioContext.svelte';
	
	let showAudio = false; 

	let frequency = 300;
	const changeFrequency = (e) => 
		frequency = Number(e.currentTarget.value);
</script>

<button on:click={() => showAudio = !showAudio}>
	{showAudio ? 'Stop' : 'Play'} Audio
</button>

<input 
	type="range" min="100" max="1000" step="5"
	value={frequency}
	on:input={changeFrequency}
/>

{#if showAudio}
	<AudioContext>
		<GainNode volume={.2}>
			<Oscillator bind:frequency type="sine" />
		</GainNode>
	</AudioContext>
{/if}