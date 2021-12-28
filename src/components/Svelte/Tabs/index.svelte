<script>
	import TabContainer from './TabContainer.svelte';
	import Tab from './Tab.svelte';
</script>

<TabContainer>
	<Tab label="tab 1">
		<h1>Hello tab 1</h1>
		<p>This is the first tab</p>
	</Tab>
	<Tab label="tab 2">
		<h1>Hello tab 2</h1>
		<p>This is the second tab</p>
	</Tab>
</TabContainer>