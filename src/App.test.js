import { screen, render, fireEvent } from '@testing-library/svelte';
import App from './App';

describe('App', () => {
  test('Filling in card details correctly prompts a Thank You Screen indicating success', async () => {
    render(App);

    const cardNameInputField = screen.getByPlaceholderText('e.g. Jane Appleseed');
    
    await fireEvent.input(cardNameInputField, { target: { value: 'John Doe' }});

    const cardNumber = screen.getByPlaceholderText('e.g. 1234 5678 9123 0000');

    await fireEvent.input(cardNumber, { target: { value: '1234 5678 9123 1212' }});

    const cardMoExp = screen.getByPlaceholderText('MM');

    await fireEvent.input(cardMoExp, { target: { value: '08' }});

    const cardYrExp = screen.getByPlaceholderText('YY');

    await fireEvent.input(cardYrExp, { target: { value: '29' }});

    const cardCvv = screen.getByPlaceholderText('e.g. 123');

    await fireEvent.input(cardCvv, { target: { value: '1234' }});

    const submitBtn = screen.getByRole('button');

    await fireEvent.click(submitBtn);

    expect(screen.getByText('We\'ve added your card details')).toHaveTextContent('We\'ve added your card details');
  });
});
