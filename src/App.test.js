import { screen, render, fireEvent, within } from '@testing-library/svelte';
import App from './App';

describe('App', () => {
  test('Should write a full name into Preview', async () => {
    render(App);

    const cardNameInputField = screen.getByPlaceholderText('e.g. Jane Appleseed');
    
    await fireEvent.input(cardNameInputField, { target: { value: 'John Doe' }});

    expect(screen.getByText('John Doe')).toHaveTextContent('John Doe');
  });

  test('Should display an error if CC is entered in wrong format', async () => {
    render(App);

    const cardNumberInputField = screen.getByPlaceholderText('e.g. 1234 5678 9123 0000');

    await fireEvent.input(cardNumberInputField, { target: { value: 'ii12adui8s' } });

    expect(screen.getByText('Wrong format, numbers only')).toHaveTextContent('Wrong format, numbers only');
  });
})
