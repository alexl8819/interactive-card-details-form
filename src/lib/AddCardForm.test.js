import { screen, render, fireEvent } from '@testing-library/svelte';
import AddCardForm from './AddCardForm';

describe('AddCardForm', () => {
  test('Should display an error if name is incorrectly typed in', async () => {
    render(AddCardForm);

    const cardNameInputField = screen.getByPlaceholderText('e.g. Jane Appleseed');
    
    await fireEvent.input(cardNameInputField, { target: { value: 'JohnDoe' }});

    expect(screen.getByText('You must enter your full name')).toHaveTextContent('You must enter your full name');
  });

  test('Should display an error if name has less than three characters', async () => {
    render(AddCardForm);

    const cardNameInputField = screen.getByPlaceholderText('e.g. Jane Appleseed');

    await fireEvent.input(cardNameInputField, { target: { value: 'Ka' }});

    expect(screen.getByText('You must enter your full name')).toHaveTextContent('You must enter your full name');
  });

  test('Should display an error if card number is incorrect', async () => {
    render(AddCardForm);

    const cardNumber = screen.getByPlaceholderText('e.g. 1234 5678 9123 0000');
    
    await fireEvent.input(cardNumber, { target: { value: '1s34 6d78 891s 0001' }});

    expect(screen.getByText('Wrong format, numbers only')).toHaveTextContent('Wrong format, numbers only');
  });

  test('Should display an error if card expiration date is invalid', async () => {
    render(AddCardForm);

    const cardExpMo = screen.getByPlaceholderText('MM');

    await fireEvent.input(cardExpMo, { target: { value: '13' }});

    const cardExpYr = screen.getByPlaceholderText('YY');

    await fireEvent.input(cardExpYr, { target: { value: '20' }});

    expect(screen.getByText('Invalid expiration date')).toHaveTextContent('Invalid expiration date');
  });

  test('Should display an error if CVV code is invalid', async () => {
    render(AddCardForm);

    const cardCvv = screen.getByPlaceholderText('e.g. 123');

    await fireEvent.input(cardCvv, { target: { value: '344k' }});

    expect(screen.getByText('Invalid CVV format')).toHaveTextContent('Invalid CVV format');
  });
});
