import { screen, render, fireEvent, within } from '@testing-library/svelte';
import App from './App';

describe('App', () => {
  render(App);

  test('Should write a full name into Preview', async () => {
    const cardNameInputField = screen.getByPlaceholderText('e.g. Jane Appleseed');
    
    await fireEvent.input(cardNameInputField, { target: { value: 'John Doe' }});

    expect(screen.getByText('John Doe')).toHaveTextContent('John Doe');
  });
})
