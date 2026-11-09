import { render, screen } from '@testing-library/react-native';

import Index from '../app/index';

// Smoke test: the first screen renders with the theme tokens.
// Replaced by real tests once the Today screen exists.
describe('Index screen', () => {
  it('renders every text style from the theme', async () => {
    // RNTL v14: render is async (React 19 renders concurrently), so we await it.
    await render(<Index />);
    expect(screen.getByText('display')).toBeOnTheScreen();
    expect(screen.getByText('timer')).toBeOnTheScreen();
    expect(screen.getByText('primary')).toBeOnTheScreen();
  });
});
