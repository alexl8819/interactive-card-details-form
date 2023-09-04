import { screen, render } from '@testing-library/svelte';
import PreviewCard from './PreviewCard';

describe('PreviewCard', () => {
  test('Should display a cardholder name', () => {
    render(PreviewCard, {
      cardholderName: 'Jane Appleseed'
    });

    expect(screen.getByText('Jane Appleseed')).toHaveTextContent('Jane Appleseed');
  });

  test('Should display a cardholder number', () => {
    render(PreviewCard, {
      cardNumber: '1234 5678 9101 1121'
    });

    expect(screen.getByText('1234 5678 9101 1121')).toHaveTextContent('1234 5678 9101 1121');
  });

  test('Should display an expiration date', () => {
    render(PreviewCard, {
      cardExpMo: '10',
      cardExpYr: '11'
    });
    
    expect(screen.getByText('10/11')).toHaveTextContent('10/11');
  });

  test('Should display a CVV code', () => {
    render(PreviewCard, {
      cardCvv: '282'
    });

    expect(screen.getByText('282')).toHaveTextContent('282');
  });
});
