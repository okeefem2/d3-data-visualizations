<script>

	import ChartView from './views/ChartView.svelte';
	import ItemFormView from './views/ItemFormView.svelte';
	export let name; // Like Input in Angular

	function someFunction () {
		console.log('hey!');
	}
</script>

<svelte:head>
	<!-- Compiled and minified CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">

	<!-- Font stylesheet -->
	<link rel="stylesheet" href="https://use.typekit.net/fgz1lan.css">

    <!-- Compiled and minified JavaScript -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
	<script src="https://d3js.org/d3.v5.min.js"></script>
</svelte:head>

<style>
	:global(body) {
		margin: 0;
		font-family: circe, sans-serif !important;
	}
</style>
<div class="row">
	<h4 class="left">
		D3 Visualizations With Firebase
	</h4>
</div>
	

<div class="container section">
	<div class="row">
		<div class="col s12 m6">
			<ItemFormView/>
		</div>
		<div class="col s12 m5 push-m1"> <!-- push-m1 gives a one column gap on medium and up-->
			<div class="canvas">
				<ChartView/>
			</div>
		</div>
	</div>
</div>
<!-- <h1>Hello {name}!</h1>

<button on:click={someFunction}>Button</button> -->


