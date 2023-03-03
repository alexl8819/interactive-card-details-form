<script>
  
</script>

<div class="card__preview">
  <div class="card__container card__container--shift-right">
    <div class="card__back">
      <p class="card__cvc">000</p>
    </div>
  </div>
  <div class="card__container card__container--shift-left">
    <div class="card__front">
      <img src="../assets/images/card-logo.svg" alt="card logo" />
      <p>0000 0000 0000 0000</p>
      <p>Jane Appleseed</p>
      <p>00/00</p>
    </div>
  </div>
</div>

<style>
  .card__preview {
    background-image: url('../assets/images/bg-main-mobile.png');
    background-repeat: no-repeat;
    height: 400px;
    width: 23.5rem;
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

  .card__front {
    background-image: url('../assets/images/bg-card-front.png');
    background-repeat: no-repeat;
    background-size: contain;
    height: 150px;
    width: 276px;
    margin-top: -50px;
    margin-left: 15px;
    color: hsl(0, 0%, 100%);
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
    margin-top: -50px;
    margin-right: 15px;
    padding-right: 35px;
    color: hsl(0, 0%, 100%);
  }

  .card__cvc {
    text-align: right;
  }
</style>
