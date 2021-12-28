<script context="module">
	export const key = {};
</script>

<script>
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	
	const tabs = writable([]);
	const activeTab = writable('');

	const addTab = (label) => tabs.update(prev => {
		if (!prev.length) activeTab.set(label)
		return [...prev, label]
	});
	const removeTab = label => tabs.update(prev => {
    const { [label]: x, ...rem } = tabs;
    return rem;
  });
	
	setContext(key, { addTab, removeTab, activeTab });
</script>

<div class="tabs-container">
	<div class="tabs">
		{#each $tabs as label}
			<span
						key={label}
						class={label === $activeTab ? 'selected' : undefined}
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