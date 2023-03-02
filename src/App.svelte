<script>
  import AddCardForm from './lib/AddCardForm.svelte';
  import CardAdded from './lib/CardAdded.svelte';

  let submitted = false;
</script>

<div>
  <div>
    {#if submitted}
      <CardAdded />
    {:else}
      <AddCardForm />
    {/if}
  </div>
</div>

<style>
</style>
