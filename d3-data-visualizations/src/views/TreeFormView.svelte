<script>
  import { db } from "../firebase";
  import { fade } from "svelte/transition";
  import FormBuilder from "../components/FormBuilder.svelte";
  import { onMount } from "svelte";

  export let activity;
  let submitting = false;
  let formError;
  let activitiesQuery;

  let formConfigs = [
    {
      id: "time",
      displayName: "Time Spent (minutes)",
      type: "number",
      errors: [],
      validators: [
        v => {
          if (!v || v === 0) return "Time spent required";
        }
      ],
      value: 0,
      default: 0
    },
    {
      id: "date",
      displayName: "Date",
      type: "date",
      errors: [],
      validators: [
        v => {
          if (!v) return "Date required";
        }
      ],
      value: new Date(),
      default: new Date()
    }
  ];

  onMount(() => {
    activitiesQuery = db.collection("activities");
  });

  function saveItem(event) {
    submitting = true;
    activitiesQuery.add({ ...event.detail, activity }).then(d => {
      M.toast({ html: "Activity added!" });
      setTimeout(() => (submitting = false), 1000);

      formConfigs = formConfigs.map(c => ({ ...c, value: c.default }));
    });
  }
</script>

<style>

</style>

<form>
  <p class="flow-text center">
    How much
    <span class="teal-text">{activity}</span>
    have you done today
  </p>
  <FormBuilder
    bind:formConfigs
    submitText={'Add Activity'}
    on:submit={saveItem} />
</form>
