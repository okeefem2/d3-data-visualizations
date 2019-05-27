<script>
  import { db } from "../firebase";
  import { fade } from "svelte/transition";
  import { createEventDispatcher } from "svelte";

  // { id: string, displayName: string, type: string, validators: () => string[], value: any } }
  export let formConfigs = [];
  export let submitText = "Submit";
  let formErrors = {};

  const dispatch = createEventDispatcher();

  function validateAndSubmit() {
    let formValid = true;
    let errors = {};
    for (let formConfig of formConfigs) {
      const validationErrors = validate(...formConfig.validators)(
        formConfig.value
      );
      formValid = !validationErrors.length && formValid;
      errors[formConfig.id] = validationErrors;
    }
    formErrors = errors;

    if (formValid) {
      const formValue = formConfigs.reduce((value, config) => {
        value[config.id] = config.value;
        return value;
      }, {});
      dispatch("submit", formValue);
    }
  }
  const validate = (...validationFns) => args =>
    validationFns
      .reduce(
        (acc, fn) => ({
          args: acc.args,
          errors: [...acc.errors, fn(acc.args)]
        }),
        { args, errors: [] }
      )
      .errors.filter(e => !!e);
</script>

<style>

</style>

{#each formConfigs as config}
  <div class="input-field">
    <!-- todo if else on different types -->
    {#if config.type === 'text'}
      <input type="text" id={config.id} bind:value={config.value} />
    {:else if config.type === 'number'}
      <input type="number" id={config.id} bind:value={config.value} />
    {:else if config.type === 'date'}
      <input type="date" class="datepicker" bind:value={config.value} />
    {/if}
    <label for={config}>{config.displayName}</label>
    {#if formErrors[config.id]}
      <ul>
        {#each formErrors[config.id] as error}
          <li class="red-text"> {error} </li>
        {/each}
      </ul>
    {/if}
  </div>
{/each}

<button
  class="waves-effect waves-light btn"
  type="button"
  on:click={validateAndSubmit}>
   {submitText}
</button>
