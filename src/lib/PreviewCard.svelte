<script>
  export let cardholderName = 'Jane Appleseed';
  export let cardNumber = '0000 0000 0000 0000';
  export let cardExpMo = '00';
  export let cardExpYr = '00';
  export let cardCvv = '000';
</script>

<div class="card__preview">
  <div class="card__container card__container--shift-right">
    <div class="card__back">
      <p class="card__cvv">{cardCvv}</p>
    </div>
  </div>
  <div class="card__container card__container--shift-left">
    <div class="card__front">
      <img class="card__logo" src="./src/assets/images/card-logo.svg" alt="card logo" />
      <div>
        <p class="card__number">{cardNumber}</p>
        <div class="card__details">
          <p>{cardholderName}</p>
          <p>{cardExpMo}/{cardExpYr}</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .card__preview {
    background-image: url('../assets/images/bg-main-mobile.png');
    background-repeat: no-repeat;
    height: 300px;
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .card__container {
    display: flex;
  }

  .card__container--shift-left {
    justify-content: start;
  }

  .card__container--shift-right {
    justify-content: end;
  }

  .card__details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 0.65rem;
    color: hsl(270, 3%, 87%);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .card__front {
    background-image: url('../assets/images/bg-card-front.png');
    background-repeat: no-repeat;
    background-size: contain;
    height: 150px;
    width: 276px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-top: -64.5px;
    margin-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 20px;
    padding-right: 20px;
    color: hsl(0, 0%, 100%);
    letter-spacing: 0.15em;
  }

  .card__back {
    background-image: url('../assets/images/bg-card-back.png');
    background-repeat: no-repeat;
    background-size: contain;
    height: 150px;
    width: 276px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 25px;
    margin-right: 15px;
    padding-right: 35px;
    color: hsl(0, 0%, 100%);
  }

  .card__logo {
    width: 50px;
  }

  .card__number {
    font-size: 1.05rem;
    font-weight: 500;
  }

  .card__cvv {
    text-align: right;
    font-size: 0.6rem;
    margin-top: -5px;
  }

  @media screen and (min-width: 1023px) {
    .card__preview {
      background-image: url('../assets/images/bg-main-desktop.png');
      min-height: 100vh;
      width: 100%;
    }
  }
</style>
