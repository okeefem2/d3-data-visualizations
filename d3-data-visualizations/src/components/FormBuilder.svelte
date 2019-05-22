<script>
    import { db } from '../firebase';
    import { fade } from 'svelte/transition';

    // { id: string, displayName: string, type: string, validators: () => string[], value: any } }
    export let formConfigs = [];
    let formErrors = {};

    function validateAndSubmit() {
        
        console.log('Form submitted');
        // submitting = true;
        let formValid = false;
        let errors = {};
        for (let formConfig of formConfigs) {
            errors = validate(...formConfig.validators)(formConfig.value);
            formValid = !errors.length;
            errors[formConfig.id] = errors;
        }
        formErrors = errors;

// TODO emit event
        if (formValid) {
            console.log('Form is valid!');
            // db.collection('expenses').add({ name, cost }).then(d => {
            //     console.log(d);
            //     M.toast({html: 'Item added!'});
            //     setTimeout(() => submitting = false, 1000);
                
            //     name = '';
            //     cost = '';
            // });
        }
    }
    const validate = (...validationFns) => args => validationFns.reduce((acc, fn) => ({args: acc.args, errors: [...acc.errors, fn(acc.args)]}), { args, errors: [] }).errors.filter(e => !!e);
</script>

<style>
</style>


{#each formConfigs as config }
    <div class="input-field">
        <!-- todo if else on different types -->
        <input type="text" id={config.id} bind:value={config.value}>
        <label for={config}>{config.displayName}</label>
        {#if formErrors[config.id]}
            {#each formErrors[config.id] as error }
                <span class="red-text">
                    { error }
                </span>
            {/each}
        {/if}
    </div>
{/each}

<button class="waves-effect waves-light btn" type="button" on:click={validateAndSubmit}>
        Add Item
</button>




