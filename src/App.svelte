<script>
  import AddCardForm from './lib/AddCardForm.svelte';
  import CardAdded from './lib/CardAdded.svelte';
  import PreviewCard from './lib/PreviewCard.svelte';

  function updateField (value) {
  }

  function handleSubmit () {
    submitted = true;
  }

  let submitted = false;
</script>

<div class="app__container">
  <PreviewCard />
  {#if submitted}
    <CardAdded />
  {:else}
    <AddCardForm on:submitted={handleSubmit} />
  {/if}
</div>

<style>
  .app__container {
    display: flex;
    flex-direction: column;
  }
</style>
