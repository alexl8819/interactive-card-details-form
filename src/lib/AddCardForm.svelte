<script>
  let cardholderName = '';
  let cardNumber = ''; 
</script>

<form class="card__form">
  <label for="cardholder-name">Cardholder Name</label>
  <input type="text" id="cardholder-name" name="cardholder-name" placeholder="e.g. Jane Appleseed" min="3" max="64" bind:value={cardholderName} />

  <label for="card-number">Card Number</label>
  <input type="text" id="card-number" name="card-number" pattern="/^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/" placeholder="e.g. 1234 5678 9123 0000" bind:value={cardNumber} />

  <div class="card__field">
    <label for="">Exp. Date (MM/YY)</label>
    <input type="number" placeholder="MM" />
    YY

  CVC
  e.g. 123
  </div>

  <button type="submit">Confirm</button>
</form>

<style>
  .card__field {
    display: flex;
    flex-direction: row;
  }
</style>
