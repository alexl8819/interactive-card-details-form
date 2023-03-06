<script>
  import AddCardForm from './lib/AddCardForm.svelte';
  import CardAdded from './lib/CardAdded.svelte';
  import PreviewCard from './lib/PreviewCard.svelte';

  function handleUpdate ({ detail }) {
    if (detail.cvv) {
      cardCvv = detail.cvv;
    } else if (detail.cardNumber) {
      cardNumber = detail.cardNumber;
    } else if (detail.cardholderName) {
      cardholderName = detail.cardholderName;
    } else if (detail.cardExpMo) {
      cardExpMo = detail.cardExpMo;
    } else if (detail.cardExpYr) {
      cardExpYr = detail.cardExpYr;
    }
  }

  function handleSubmit () {
    submitted = true;
  }
  
  let cardholderName;
  let cardNumber;
  let cardCvv;
  let cardExpMo;
  let cardExpYr;
  let submitted = false;
</script>

<div class="app__container">
  <PreviewCard cardholderName={cardholderName} cardNumber={cardNumber} cardExpMo={cardExpMo} cardExpYr={cardExpYr} cardCvv={cardCvv} />
  {#if submitted}
    <CardAdded />
  {:else}
    <AddCardForm on:update={handleUpdate} on:confirm={handleSubmit} />
  {/if}
</div>

<style>
  .app__container {
    display: flex;
    flex-direction: column;
    width: 23.5rem;
  }

  @media screen and (min-width: 1023px) {
    .app__container {
      flex-direction: row;
      width: 64rem;
    }
  }
</style>
