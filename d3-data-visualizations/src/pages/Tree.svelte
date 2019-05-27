<script>
  import TreeChartView from "../views/TreeChartView.svelte";
  import TreeFormView from "../views/TreeFormView.svelte";
</script>

<div class="row">
  <div class="col s12 m6">
    <TreeFormView />
  </div>
  <div class="col s12 m5 push-m1">
    <!-- push-m1 gives a one column gap on medium and up-->
    <div class="canvas">
      <TreeChartView />
    </div>
  </div>
</div>
