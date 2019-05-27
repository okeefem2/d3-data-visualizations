<script>
  import ActivityFormView from "../views/ActivityFormView.svelte";
  import ActivityLineChartView from "../views/ActivityLineChartView.svelte";
  import { onMount } from "svelte";
  import { activity } from "../store/activity.js";
  let activitiesQuery;
  let activities$;

  // onMount(() => {
  //   activitiesQuery = db.collection("activities");
  //   activities$ = collectionData(activitiesQuery, "id").pipe(startWith([]));
  // });
  function switchActivity(a) {
    activity.update(() => a);
  }
</script>

<style>
  button.btn {
    min-width: 150px;
  }
</style>

<div class="row">
  <div class="col s12 l5">
    <div class="row">
      <button class="btn fix-w" on:click={() => switchActivity('Learning')}>
        Learning
      </button>
    </div>
    <div class="row">
      <button class="btn fix-w" on:click={() => switchActivity('Music')}>
        Music
      </button>
    </div>
    <div class="row">
      <button class="btn fix-w" on:click={() => switchActivity('Cooking')}>
        Cooking
      </button>
    </div>
    <div class="row">
      <button class="btn fix-w" on:click={() => switchActivity('Games')}>
        Gaming
      </button>
    </div>
    <div class="row">
      <button class="btn fix-w" on:click={() => switchActivity('Fitness')}>
        Fitness
      </button>
    </div>
    <div class="row">
      <button class="btn fix-w" on:click={() => switchActivity('Socializing')}>
        Socializing
      </button>
    </div>
  </div>
  <div class="col s12 l6 push-l1">
    <div class="canvas">
      <ActivityLineChartView />
      <div />
    </div>
  </div>
  <div class="row">
    <div class="col m6 offset-m3 push m-3 center">
      <ActivityFormView bind:activity={$activity} />
    </div>
  </div>
</div>
