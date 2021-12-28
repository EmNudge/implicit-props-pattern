<script>
	import { getContext, onDestroy } from 'svelte';
	import { key } from './TabContainer.svelte';
	
	export let label = '';
	const { addTab, removeTab, activeTab } = getContext(key);
	addTab(label)
	
	onDestroy(() => {
		removeTab(label);
	})
</script>

{#if $activeTab === label}
	<slot />
{/if}