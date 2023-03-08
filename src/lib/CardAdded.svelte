<script>
  const completeImg = new URL('../assets/images/icon-complete.svg', import.meta.url).href
</script>

<section class="card__complete">
  <img src={completeImg} alt="completed" />
  <h2 class="card__heading">Thank you!</h2>
  <p class="card__message">We've added your card details</p>
  <button type="button" class="card__finish">Continue</button>
</section>

<style>
  .card__complete {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    padding-left: 25px;
    padding-right: 25px;
    width: 100%;
  }

  .card__heading {
    margin-top: 15px;
    margin-bottom: 10px;
    text-transform: uppercase;
    font-size: 1.75rem;
    color: hsl(278, 68%, 11%);
    font-weight: 500;
    letter-spacing: 0.125em;
  }

  .card__message {
    font-size: 1.15rem;
    color: hsl(279, 6%, 55%);
    font-weight: 500;
    margin-bottom: 25px;
  }

  .card__finish {
    cursor: pointer;
    background-color: hsl(278, 68%, 11%);
    color: hsl(270, 3%, 87%);
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 8px;
    border: none;
    width: 100%;
  }

  @media screen and (min-width: 767px) {
    .card__complete {
      width: 23.5rem;
    }

    .card__message {
      margin-bottom: 50px;
    }
  }
</style>
