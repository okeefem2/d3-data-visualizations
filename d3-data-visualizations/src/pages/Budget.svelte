<script>
  import BudgetPieChartView from "../views/BudgetPieChartView.svelte";
  import BudgetItemFormView from "../views/BudgetItemFormView.svelte";
</script>

<div class="row">
  <div class="col s12 m6">
    <BudgetItemFormView />
  </div>
  <div class="col s12 m5 push-m1">
    <!-- push-m1 gives a one column gap on medium and up-->
    <div class="canvas">
      <BudgetPieChartView />
    </div>
  </div>
</div>
