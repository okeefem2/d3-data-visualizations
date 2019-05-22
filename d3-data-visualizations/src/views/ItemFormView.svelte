<script>
    import { db } from '../firebase';
    import { fade } from 'svelte/transition';
    import FormBuilder from '../components/FormBuilder.svelte';

    let name = '';
    let cost = '';
    let submitting = false;
    let formError;

    let formConfigs = [
        { 
            id: 'name',
            displayName: 'Item Name',
            type: 'text',
            errors: [],
            validators: [
                v => {if (!v) return 'Item Name Required';}
            ],
            value: '',
        },
        { 
            id: 'cost',
            displayName: 'Item Cost',
            type: 'text',
            errors: [],
            validators: [
                v => {if (!v) return 'Item Cost Required';}
            ],
            value: '',
        },
    ];

    // function submitForm() {
        
    //     console.log('Form submitted');
    //     submitting = true;
    //     db.collection('expenses').add({ name, cost }).then(d => {
    //         console.log(d);
    //         M.toast({html: 'Item added!'});
    //         setTimeout(() => submitting = false, 1000);
            
    //         name = '';
    //         cost = '';
    //     });
    // }
</script>

<style>
</style>

<form class="card z-depth-0">

    <FormBuilder bind:formConfigs/>
    <!-- <span class="card-title">
        Add Item
    </span> -->
    <!-- <div class="input-field">
        <input type="text" id="name" bind:value={name}>
        <label for="name">Item Name</label>
    </div>
    <div class="input-field">
        <input type="text" id="cost" placeholder="$0.00" bind:value={cost}>
        <label for="cost">Item Cost</label>
    </div>
    {#if formError}
        <div class="input-field">
            <span class="red-text">{formError}</span>
        </div>
    {/if} -->
    
    <!-- <button class="waves-effect waves-light btn" type="button" on:click={submitForm}>
        Add Item
        <!-- {#if !submitting}
            <span transition:fade="{{ duration: 1000}}">Add Item</span>
        {:else}
            <span transition:fade="{{ duration: 1000}}">Adding...</span>
        {/if}  </button> -->
</form>



