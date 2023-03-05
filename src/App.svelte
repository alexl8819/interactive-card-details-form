<script>
  import AddCardForm from './lib/AddCardForm.svelte';
  import CardAdded from './lib/CardAdded.svelte';
  import PreviewCard from './lib/PreviewCard.svelte';

  function handleUpdate ({ detail }) {
    if (detail.cvc) {
      cardCvc = detail.cvc;
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

  $: isValidCard = submitted && cardHolderName.length >= 4 && cardNumber.length === 20 && cardCvc.length === 3 && cardExpMo.length === 2 && cardExpYr.length === 2;
  
  let cardholderName;
  let cardNumber;
  let cardCvc;
  let cardExpMo;
  let cardExpYr;
  let submitted = false;
</script>

<div class="app__container">
  <PreviewCard cardholderName={cardholderName} cardNumber={cardNumber} cardExpMo={cardExpMo} cardExpYr={cardExpYr} cardCvc={cardCvc} />
  {#if isValidCard}
    <CardAdded />
  {:else}
    <AddCardForm on:update={handleUpdate} on:validate={handleSubmit} />
  {/if}
</div>

<style>
  .app__container {
    display: flex;
    flex-direction: column;
  }
</style>
