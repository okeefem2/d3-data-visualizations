<script>
  import { db } from "../firebase";
  import { fade } from "svelte/transition";
  import FormBuilder from "../components/FormBuilder.svelte";
  import { onMount } from "svelte";
  import "materialize-css";
  export let activity;
  let submitting = false;
  let formError;
  let employeesQuery;
  let modal;

  let formConfigs = [
    {
      id: "name",
      displayName: "Employee Name",
      type: "text",
      errors: [],
      validators: [
        v => {
          if (!v || v.trim() === "") return "Employee Name required";
        }
      ],
      value: "",
      default: ""
    },
    {
      id: "parent",
      displayName: "Reports to...",
      type: "text",
      errors: [],
      validators: [],
      value: "",
      default: ""
    },
    {
      id: "department",
      displayName: "Department",
      type: "text",
      errors: [],
      validators: [
        v => {
          if (!v || v.trim() === "") return "Department required";
        }
      ],
      value: "",
      default: ""
    }
  ];

  onMount(() => {
    employeesQuery = db.collection("employees");
    modal = document.querySelector(".modal");
    M.Modal.init(modal);
  });

  function saveItem(event) {
    submitting = true;
    employeesQuery.add({ ...event.detail }).then(d => {
      M.toast({ html: "Employee added!" });
      setTimeout(() => (submitting = false), 1000);

      formConfigs = formConfigs.map(c => ({ ...c, value: c.default }));
      const instance = M.Modal.getInstance(modal);
      instance.close();
    });
  }
</script>

<style>

</style>

<!-- Modal Trigger -->
<a class="btn modal-trigger" href="#employee-form">Add Employee</a>

<!-- Modal Structure -->
<div id="employee-form" class="modal">
  <div class="modal-content">
    <form>
      <h4>Employee Details</h4>
      <FormBuilder
        bind:formConfigs
        submitText={'Add Employee'}
        on:submit={saveItem} />
    </form>
  </div>
</div>
