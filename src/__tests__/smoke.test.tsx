import { render, screen } from '@testing-library/react-native';

import Index from '../app/index';

// Smoke test: the dev screen renders both the components and the theme tokens.
// Replaced by real tests once the Today screen exists.
describe('Index screen', () => {
  it('renders the component and theme previews', async () => {
    // RNTL v14: render is async (React 19 renders concurrently), so we await it.
    await render(<Index />);
    expect(screen.getByRole('header', { name: 'Components' })).toBeOnTheScreen();
    expect(screen.getByText('timer')).toBeOnTheScreen();
    expect(screen.getByText('surfaceRaised')).toBeOnTheScreen();
  });
});
