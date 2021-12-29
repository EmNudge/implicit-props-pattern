<script context="module">
	export const key = {};
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	
	let tabs = [];
	const activeTab = writable('');

	setContext(key, {
		addTab(label) {
			if (!tabs.length) activeTab.set(label);
			tabs = [...tabs, label];
		},
		removeTab(label) {
			tabs = tabs.filter(name => name !== label);
		},
		activeTab,
	});
</script>

<div class="tabs-container">
	<div class="tabs">
		{#each tabs as label}
			<span
				key={label}
				class:selected={label === $activeTab}
				on:click={() => $activeTab = label}
			>
				{label}
			</span>
		{/each}
	</div>
	<div class="content">
		<slot />
	</div>
</div>