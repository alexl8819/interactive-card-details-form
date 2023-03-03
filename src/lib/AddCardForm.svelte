<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

  let cardholderName = '';
  let cardNumber = '';
  let cardExpirationMo = '';
  let cardExpirationYr = '';

  function handleSubmit (e) {
    e.preventDefault();
    dispatch('submitted');
  }
</script>

<form class="card__form">
  <label for="cardholder-name">Cardholder Name</label>
  <input type="text" id="cardholder-name" name="cardholder-name" placeholder="e.g. Jane Appleseed" min="3" max="64" bind:value={cardholderName} />

  <label for="card-number">Card Number</label>
  <input type="text" id="card-number" name="card-number" pattern="/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/" placeholder="e.g. 1234 5678 9123 0000" bind:value={cardNumber} />

  <div class="card__field">
    <label for="card-expiration">Exp. Date (MM/YY)</label>
    <input type="number" id="card-expiration-mo" placeholder="MM" />
    <input type="number" id="card=expiration-yr" placeholder="YY" />

    <label for="card-cvc">CVC</label>
    <input type="number" id="card-cvc" name="card-cvc" placeholder="e.g. 123" />
  </div>

  <button type="submit" on:click={handleSubmit}>Confirm</button>
</form>

<style>
  .card__form {
    display: flex;
    flex-direction: column;
    width: 23.5rem;
  }
</style>
