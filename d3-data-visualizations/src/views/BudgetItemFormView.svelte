<script>
  import { db } from "../firebase";
  import { fade } from "svelte/transition";
  import FormBuilder from "../components/FormBuilder.svelte";

  let name = "";
  let cost = "";
  let submitting = false;
  let formError;

  let formConfigs = [
    {
      id: "name",
      displayName: "Item Name",
      type: "text",
      errors: [],
      validators: [
        v => {
          if (!v || v === "") return "Item Name required";
        }
      ],
      value: "",
      default: ""
    },
    {
      id: "cost",
      displayName: "Item Cost",
      type: "number",
      errors: [],
      validators: [
        v => {
          if (!v) return "Item Cost required";
        },
        v => {
          if (v < 0) return "Item Cost must be a positive number";
        }
      ],
      value: 0.0,
      default: 0.0
    }
  ];

  function saveItem(event) {
    submitting = true;
    db.collection("expenses")
      .add(event.detail)
      .then(d => {
        M.toast({ html: "Item added!" });
        setTimeout(() => (submitting = false), 1000);

        formConfigs = formConfigs.map(c => ({ ...c, value: c.default }));
      });
  }
</script>

<style>

</style>

<form class="card z-depth-0">
  <FormBuilder bind:formConfigs on:submit={saveItem} />
</form>
