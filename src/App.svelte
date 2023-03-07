<script>
  import AddCardForm from './lib/AddCardForm.svelte';
  import CardAdded from './lib/CardAdded.svelte';
  import PreviewCard from './lib/PreviewCard.svelte';

  function handleUpdate ({ detail }) {
    const field = Object.keys(detail)[0];
    switch (field) {
      case 'cvv':
        cardCvv = detail.cvv;
        break;
      case 'cardNumber':
        cardNumber = detail.cardNumber;
        break;
      case 'cardholderName':
        cardholderName = detail.cardholderName;
        break;
      case 'cardExpMo':
        cardExpMo = detail.cardExpMo;
        break;
      case 'cardExpYr':
        cardExpYr = detail.cardExpYr;
        break;
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
