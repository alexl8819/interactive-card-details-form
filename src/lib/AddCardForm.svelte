<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
  
  function handleCardNumber (e) { // e.key === ' ' ||
    if (e.keyCode !== 8 && e.key !== ' ' && (e.keyCode < 48 || e.keyCode > 57)) {
      e.preventDefault();
    }
  }

  function handleInput (field) {
    return function (e) {
      dispatch('update', {
        [field]: e.target.value
      })
    };
  }

  function handleSubmit (e) {
    dispatch('validate');
  }

  // $: cardNumberFormatted = cardNumber.replace(/(.{4})/g, '$1 ').trim();
</script>

<form class="card__form" on:submit|preventDefault={handleSubmit}>
  <div class="card__field">
    <label for="cardholder-name" class="card__label">Cardholder Name</label>
    <input type="text" id="cardholder-name" class="card__input" name="cardholder-name" placeholder="e.g. Jane Appleseed" min="3" max="64" on:input={handleInput('cardholderName')} required />
  </div>
  
  <div class="card__field">
    <label for="card-number" class="card__label">Card Number</label>
    <input type="text" id="card-number" class="card__input" name="card-number" min="20" max="20" placeholder="e.g. 1234 5678 9123 0000" on:keydown={handleCardNumber} on:input={handleInput('cardNumber')} required />
  </div>

  <div class="card__field card__field--display-row">
    <div class="card__field">
      <label for="card-expiration" class="card__label">Exp. Date (MM/YY)</label>
      <div class="card__field--display-row">
        <input type="text" id="card-expiration-mo" class="card__input card__input--size-sm" on:input={handleInput('cardExpMo')} placeholder="MM" required />
        <input type="text" id="card=expiration-yr" class="card__input card__input--size-sm" on:input={handleInput('cardExpYr')} placeholder="YY" required />
      </div>
    </div>
    
    <div class="card__field">
      <label for="card-cvc" class="card__label">CVC</label>
      <input type="number" id="card-cvc" class="card__input card__input--size-sm" name="card-cvc" placeholder="e.g. 123" min="100" max="1000" on:input={handleInput('cvc')} required />
    </div>
  </div>

  <button type="submit" class="card__submit">Confirm</button>
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
    margin-bottom: 5px;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: hsl(278, 68%, 11%); 
    text-transform: uppercase;
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
