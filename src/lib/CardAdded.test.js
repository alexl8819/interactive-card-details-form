import { screen, render } from '@testing-library/svelte';
import CardAdded from './CardAdded';

describe('CardAdded', () => {
  test('Should display a simple Thank You message', () => {
    render(CardAdded);
    
    expect(screen.getByText('Thank you!')).toBeTruthy();
  });
});
