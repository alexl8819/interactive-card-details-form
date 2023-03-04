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
  <div class="card__field">
    <label for="cardholder-name" class="card__label">Cardholder Name</label>
    <input type="text" id="cardholder-name" class="card__input" name="cardholder-name" placeholder="e.g. Jane Appleseed" min="3" max="64" bind:value={cardholderName} />
  </div>
  
  <div class="card__field">
    <label for="card-number" class="card__label">Card Number</label>
    <input type="text" id="card-number" class="card__input" name="card-number" pattern="/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/" placeholder="e.g. 1234 5678 9123 0000" bind:value={cardNumber} />
  </div>

  <div class="card__field card__field--display-row">
    <div class="card__field">
      <label for="card-expiration" class="card__label">Exp. Date (MM/YY)</label>
      <div class="card__field--display-row">
        <input type="number" id="card-expiration-mo" class="card__input card__input--size-sm" placeholder="MM" />
        <input type="number" id="card=expiration-yr" class="card__input card__input--size-sm" placeholder="YY" />
      </div>
    </div>
    
    <div class="card__field">
      <label for="card-cvc" class="card__label">CVC</label>
      <input type="number" id="card-cvc" class="card__input card__input--size-sm" name="card-cvc" placeholder="e.g. 123" />
    </div>
  </div>

  <button type="submit" class="card__submit" on:click={handleSubmit}>Confirm</button>
</form>

<style>
  .card__form {
    display: flex;
    flex-direction: column;
    width: 23.5rem;
    padding-top: 10px;
    padding-left: 20px;
    padding-right: 20px;  
  }

  .card__label {
    width: 100%;
    margin-bottom: 3px;
    color: hsl(278, 68%, 11%); 
  }

  .card__field {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
  }

  .card__field--display-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .card__input {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 8px;
    border: 1px solid hsl(270, 3%, 87%);
    min-height: 30px;
    max-width: 100%;
  }

  .card__input--size-sm {
    width: 100px;
  }

  .card__submit {
    background-color: hsl(278, 68%, 11%);
    color: hsl(270, 3%, 87%);
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 8px;
    border: none;
  }
</style>
