import { render, screen } from '@testing-library/react-native';

import Index from '../app/index';

// Smoke test: proves Jest + React Native Testing Library are wired up.
// Replaced by real tests once the Today screen exists.
describe('Index screen', () => {
  it('renders', async () => {
    // RNTL v14: render is async (React 19 renders concurrently), so we await it.
    await render(<Index />);
    expect(screen.getByText(/Edit src\/app\/index.tsx/)).toBeOnTheScreen();
  });
});
