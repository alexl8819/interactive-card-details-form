<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  
  const FullNameRegex = /^[A-Za-z]{2,}\s{1}[A-Za-z]{2,}$/;
  const NaiveCCRegex = /^[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}\s{1}[0-9]{4}$/;
  const RealCCRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/;
  const ExpDateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/;
  const CVVRegex = /^[0-9]{3,4}$/;

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
    return function (e) {
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
        [field]: e.target.value
      })
    };
  }

  function handleSubmit (e) {
    dispatch('confirm');
  }

  let cardholderNameActivated = false;
  let cardholderName = '';

  $: isValidCardholderName = !cardholderNameActivated || cardholderNameActivated && cardholderName.length;
  $: isValidCardholderNameFormat = !cardholderNameActivated || cardholderNameActivated && cardholderName.length >= 3 && FullNameRegex.test(cardholderName);

  let cardNumberActivated = false;
  let cardNumber = '';

  $: isValidCardNumber = !cardNumberActivated || cardNumberActivated && cardNumber.length;
  $: isValidCardNumberFormat = !cardNumberActivated || cardNumberActivated && cardNumber.length === 19 && NaiveCCRegex.test(cardNumber);
  $: isRealCardNumberFormat = !cardNumberActivated || cardNumberActivated && RealCCRegex.test(cardNumber.replace(/\s/g, ''));

  let cardExpMoActivated = false;
  let cardExpMo = '';
  let cardExpYrActivated = false;
  let cardExpYr = '';

  $: isValidExpMo = !cardExpMoActivated || cardExpMoActivated && cardExpMo.length;
  $: isValidExpYr = !cardExpYrActivated || cardExpYrActivated && cardExpYr.length;
  $: isValidExpDate = !cardExpMoActivated && !cardExpYrActivated || cardExpMoActivated && cardExpYrActivated && ExpDateRegex.test(`${cardExpMo}/${cardExpYr}`);

  let cardCvvActivated = false;
  let cardCvv;

  $: isValidCardCvv = !cardCvvActivated || cardCvvActivated && cardCvv > 0;
  $: isValidCardCvvFormat = !cardCvvActivated || cardCvvActivated && CVVRegex.test(cardCvv);

  $: isValidCardEntry = cardholderNameActivated && isValidCardholderName && cardNumberActivated && isValidCardholderNameFormat && isValidCardNumber && isValidCardNumberFormat && cardExpMoActivated && cardExpYrActivated && isValidExpMo && isValidExpYr && isValidExpDate && cardCvvActivated && isValidCardCvv && isValidCardCvvFormat;
</script>

<form class="card__form" on:submit|preventDefault={handleSubmit}>
  <div class="card__field">
    <label for="cardholder-name" class="card__label">Cardholder Name</label>
    <input type="text" id="cardholder-name" class={!isValidCardholderName || !isValidCardholderNameFormat ? "card__input card__input--state-error" : "card__input"} name="cardholder-name" placeholder="e.g. Jane Appleseed" min="3" max="64" on:input={handleInput('cardholderName')} bind:value={cardholderName} required />
    {#if !isValidCardholderName}
      <p class="field__feedback field__feedback--state-error">Can't be blank</p>
    {:else if !isValidCardholderNameFormat}
      <p class="field__feedback field__feedback--state-error">Error: You must enter your full name</p>
    {/if}
  </div>

  <div class="card__field">
    <label for="card-number" class="card__label">Card Number</label>
    <input type="text" id="card-number" class={!isValidCardNumber || !isValidCardNumberFormat ? "card__input card__input--state-error" : "card__input"} name="card-number" min="19" max="19" placeholder="e.g. 1234 5678 9123 0000" on:input={handleInput('cardNumber')} bind:value={cardNumber} required />
    {#if !isValidCardNumber}
      <p class="field__feedback field__feedback--state-error">Can't be blank</p> 
    {:else if !isValidCardNumberFormat}
      <p class="field__feedback field__feedback--state-error">Wrong format, numbers only</p>
    {:else if !isRealCardNumberFormat}
      <p class="field__feedback field__feedback--state-warning">Warning: Not a real card number</p>
    {/if}
  </div>

  <div class="card__field card__field--display-row">
    <div class="card__field">
      <label for="card-expiration" class="card__label">Exp. Date (MM/YY)</label>
      <div class="card__field--display-row">
        <input type="text" id="card-expiration-mo" class={!isValidExpMo || !isValidExpDate ? "card__input card__input--size-sm card__input--state-error" : "card__input card__input--size-sm"} on:keydown={handleCardNumberField(2)} on:input={handleInput('cardExpMo')} placeholder="MM" bind:value={cardExpMo} required />
        <input type="text" id="card=expiration-yr" class={!isValidExpYr || !isValidExpDate ? "card__input card__input--size-sm card__input--state-error" : "card__input card__input--size-sm"} on:keydown={handleCardNumberField(2)} on:input={handleInput('cardExpYr')} placeholder="YY" bind:value={cardExpYr} required />
      </div>
      {#if !isValidExpMo}
        <p class="field__feedback field__feedback--state-error">Can't be blank</p>
      {:else if !isValidExpYr}
        <p class="field__feedback field__feedback--state-error">Can't be blank</p>
      {:else if !isValidExpDate}
        <p class="field__feedback field__feedback--state-error">Invalid expiration date</p>
      {/if}
    </div>
    
    <div class="card__field">
      <label for="card-cvv" class="card__label">CVV</label>
      <input type="number" id="card-cvv" class={!isValidCardCvv || !isValidCardCvvFormat ? "card__input card__input--size-md card__input--state-error" : "card__input card__input--size-md"} name="card-cvv" placeholder="e.g. 123" on:keydown={handleCardNumberField(4)} on:input={handleInput('cvv')} bind:value={cardCvv} required />
      {#if !isValidCardCvv}
        <p class="field__feedback field__feedback--state-error">Can't be blank</p>
      {:else if !isValidCardCvvFormat}
        <p class="field__feedback field__feedback--state-error">Invalid CVV format</p>
      {/if}
    </div>
  </div>

  <button type="submit" class="card__submit" disabled={!isValidCardEntry}>Confirm</button>
</form>

<style>
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

  .card__field {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
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
    margin-left: 8px;
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
  }

  .card__submit:disabled {
    cursor: not-allowed;
  }

  .field__feedback {
    margin-top: 1px;
  }

  .field__feedback--state-error {
    color: hsl(0, 100%, 66%);
  }

  .field__feedback--state-warning {
    color: #AC4FC6;
  }
</style>
