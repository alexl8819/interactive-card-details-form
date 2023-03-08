<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  
  const FullNameRegex = /^[A-Za-z]{2,}\s{1}([A-Za-z]{1,}\s{1})*[A-Za-z]{2,}$/;
  const NaiveCCRegex = /^[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
  const ExpDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  const CVVRegex = /^[0-9]{3,4}$/;

  function handleCardInput (e) {
    if (e.target.value.length === 4 || e.target.value.length === 9 || e.target.value.length === 14) {
      e.target.value = e.target.value + ' ';
    } else if (e.target.value.length >= 19) {
      e.preventDefault();
    }
  }

  function handleCardNumberField (limit = 4) {
    return (e) => {
      if (e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 8 && e.keyCode !== ' ' && e.code.includes('Key')) {
        e.preventDefault();
      } else if (e.target.value.length >= limit && e.keyCode !== 37 && e.keyCode !== 39 && e.keyCode !== 8 && e.keyCode !== ' ') {
        e.preventDefault();
      }
    }
  }

  function handleInput (field) {
    return function ({ target }) {
      switch (field) {
        case 'cardholderName':
          cardholderNameActivated = true;
          break;
        case 'cardNumber':
          cardNumberActivated = true;
          break;
        case 'cardExpMo':
          cardExpMoActivated = true;
          break;
        case 'cardExpYr':
          cardExpYrActivated = true;
          break;
        case 'cvv':
          cardCvvActivated = true;
          break;
      }
      dispatch('update', {
        [field]: target.value
      })
    };
  }

  let cardholderNameActivated = false;
  let cardholderName = '';

  $: isValidCardholderName = !cardholderNameActivated || cardholderNameActivated && cardholderName.length;
  $: isValidCardholderNameFormat = !cardholderNameActivated || cardholderNameActivated && cardholderName.length >= 3 && FullNameRegex.test(cardholderName);

  let cardNumberActivated = false;
  let cardNumber = '';

  $: isValidCardNumber = !cardNumberActivated || cardNumberActivated && cardNumber.length;
  $: isValidCardNumberFormat = !cardNumberActivated || cardNumberActivated && cardNumber.length === 19 && NaiveCCRegex.test(cardNumber);

  let cardExpMoActivated = false;
  let cardExpMo = '';
  let cardExpYrActivated = false;
  let cardExpYr = '';

  $: isValidExpMo = !cardExpMoActivated || cardExpMoActivated && cardExpMo.length;
  $: isValidExpYr = !cardExpYrActivated || cardExpYrActivated && cardExpYr.length;
  $: isValidExpDate = !cardExpMoActivated && !cardExpYrActivated || cardExpMoActivated && cardExpYrActivated && ExpDateRegex.test(`${cardExpMo}/${cardExpYr}`);

  let cardCvvActivated = false;
  let cardCvv = '';

  $: isValidCardCvv = !cardCvvActivated || cardCvvActivated && cardCvv.length;
  $: isValidCardCvvFormat = !cardCvvActivated || cardCvvActivated && CVVRegex.test(cardCvv);

  $: isValidCardEntry = cardholderNameActivated && isValidCardholderName && cardNumberActivated && isValidCardholderNameFormat && isValidCardNumber && isValidCardNumberFormat && cardExpMoActivated && cardExpYrActivated && isValidExpMo && isValidExpYr && isValidExpDate && cardCvvActivated && isValidCardCvv && isValidCardCvvFormat;
</script>

<div class="card__form">
  <h1 class="sr-only">Add your card</h1>
  <form on:submit|preventDefault={(e) => dispatch('confirm')}>
    <div class="card__field">
      <label for="cardholder-name" class="card__label">Cardholder Name</label>
      <input type="text" id="cardholder-name" class={!isValidCardholderName || !isValidCardholderNameFormat ? "card__input card__input--state-error" : "card__input"} name="cardholder-name" placeholder="e.g. Jane Appleseed" minlength="3" maxlength="32" on:input={handleInput('cardholderName')} bind:value={cardholderName} aria-labelledby="cardholder-name" required />
      <p class={ !isValidCardholderName || !isValidCardholderNameFormat ? "field__feedback--state-error" : "field__feedback"}>{ !isValidCardholderName ? 'Can\'t be blank' : 'You must enter your full name' }</p>
    </div>

    <div class="card__field">
      <label for="card-number" class="card__label">Card Number</label>
      <input type="text" id="card-number" name="card-number" class={!isValidCardNumber || !isValidCardNumberFormat ? "card__input card__input--state-error" : "card__input"} placeholder="e.g. 1234 5678 9123 0000" minlength="19" on:keypress={handleCardInput} on:input={handleInput('cardNumber')} bind:value={cardNumber} aria-labelledby="card-number" required />
      <p class={ !isValidCardNumber || !isValidCardNumberFormat ? "field__feedback field__feedback--state-error" : "field__feedback" }>
        { !isValidCardNumber ? 'Can\'t be blank' : 'Wrong format, numbers only' }
      </p>
    </div>

    <div class="card__field card__field--display-row">
      <div class="card__field">
        <label for="card-expiration-mo" class="card__label">Exp. Date (MM/YY)</label>
        <div class="card__field--display-row">
          <div class="card__field">
            <input type="text" id="card-expiration-mo" name="card-expiration-mo" class={!isValidExpMo || !isValidExpDate ? "card__input card__input--size-sm card__input--state-error" : "card__input card__input--size-sm"} on:keydown={handleCardNumberField(2)} on:input={handleInput('cardExpMo')} minlength="2" placeholder="MM" bind:value={cardExpMo} aria-labelledby="card-expiration-mo" required />
          </div>
          <div class="card__field">
            <label for="card-expiration-yr" class="card__label--state-hidden">Exp. Date (MM/YY)</label>
            <input type="text" id="card-expiration-yr" name="card-expiration-yr" class={!isValidExpYr || !isValidExpDate ? "card__input card__input--size-sm card__input--state-error" : "card__input card__input--size-sm"} on:keydown={handleCardNumberField(2)} on:input={handleInput('cardExpYr')} minlength="2" placeholder="YY" bind:value={cardExpYr} aria-labelledby="card-expiration-yr" required />
          </div>
        </div>
        <p class={ (!isValidExpMo || !isValidExpYr || !isValidExpDate) ? "field__feedback field__feedback--state-error" : "field__feedback"}>{ !isValidExpMo || !isValidExpYr ? 'Can\'t be blank' : 'Invalid expiration date' }</p>
      </div>
    
      <div class="card__field">
        <label for="card-cvv" class="card__label">CVV</label>
        <input type="text" id="card-cvv" class={!isValidCardCvv || !isValidCardCvvFormat ? "card__input card__input--size-md card__input--state-error" : "card__input card__input--size-md"} name="card-cvv" placeholder="e.g. 123" minlength="3" maxlength="4" on:keydown={handleCardNumberField(4)} on:input={handleInput('cvv')} bind:value={cardCvv} aria-labelledby="card-cvv" required />
        <p class={ !isValidCardCvv || !isValidCardCvvFormat ? "field__feedback field__feedback--state-error" : "field__feedback" }>{ !isValidCardCvv ? 'Can\'t be blank' : 'Invalid CVV format'}</p>
      </div>
    </div>

    <button type="submit" class="card__submit" disabled={!isValidCardEntry}>Confirm</button>
  </form>
</div>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }

  .card__form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: auto;
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

  .card__label--state-hidden {
    display: none;
  }

  .card__field {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
  }

  .card__field input[type=number]::-webkit-inner-spin-button, 
  .card__field input[type=number]::-webkit-outer-spin-button,
  .card__field input[type=number] { 
    -webkit-appearance: none;
    -moz-appearance: textfield; 
    margin: 0;
  }

  .card__field--display-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .card__field--display-row > .card__field {
    margin-bottom: 0;
  }

  .card__input {
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    padding-right: 15px;
    border-radius: 8px;
    border: 1px solid hsl(270, 3%, 87%);
    min-height: 30px;
  }

  .card__input:active, .card__input:focus {
    outline: none;
  }

  .card__input::placeholder {
    color:hsl(279, 6%, 55%);
  }

  .card__input--size-md {
    width: 150px;
  }

  .card__input--size-sm {
    width: 85px;
  }

  .card__input--size-sm:last-child {
    margin-right: 8px;
  }

  .card__input--state-error {
    border: 1px solid hsl(0, 100%, 66%);
  }

  .card__submit {
    cursor: pointer;
    background-color: hsl(278, 68%, 11%);
    color: hsl(270, 3%, 87%);
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 8px;
    border: none;
    width: 100%;
  }

  .card__submit:disabled {
    cursor: not-allowed;
  }

  .field__feedback {
    margin-top: 2px;
    visibility: hidden;
  }

  .field__feedback--state-error {
    color: hsl(0, 100%, 66%);
    visibility: visible;
  }

  .field__feedback--state-warning {
    color: #AC4FC6;
    visibility: visible;
  }
</style>
