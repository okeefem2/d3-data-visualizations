<script>

	import Budget from './pages/Budget.svelte';
	import Activity from './pages/Activity.svelte';
	import Tree from './pages/Tree.svelte';
	export let name; // Like Input in Angular

	let componentShown = Tree;

	function setComponentShown(component) {
		componentShown = component;
	}
</script>

<svelte:head>
	<!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

	<!-- Font stylesheet -->
	<link rel="stylesheet" href="https://use.typekit.net/fgz1lan.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
	<!-- <script src="https://d3js.org/d3.v5.min.js"></script> -->
</svelte:head>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family: circe, sans-serif !important;
	}

	.btn {
		margin-right: 10px;
	}
</style>
<nav>
	<div class="row nav-wrapper">
		<h4 class="left">
			D3 Visualizations With Firebase
		</h4>
		<ul id="nav-mobile" class="right hide-on-med-and-down">
			<li><button class="btn" on:click={() => setComponentShown(Budget)}>Budget Tracker</button></li>
			<li><button class="btn" on:click={() => setComponentShown(Activity)}>Activity Tracker</button></li>
			<li><button class="btn" on:click={() => setComponentShown(Tree)}>Hierarchy Tree</button></li>
		</ul>
	</div>
</nav>

<div class="container section">
    <svelte:component this="{componentShown}"/>
</div>


<!-- {#if componentShown === 'budget'}
      <Budget />
{:else if componentShown === 'Fitness'}
      <Fitness />
{/if} -->
