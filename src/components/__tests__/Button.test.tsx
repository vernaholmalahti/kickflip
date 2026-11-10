import { render, screen, userEvent } from '@testing-library/react-native';

import { Button } from '../Button';

describe('Button', () => {
  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(<Button label="Drop in" onPress={onPress} />);

    // Find it the way a screen reader would: by role + accessible name.
    await user.press(screen.getByRole('button', { name: 'Drop in' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(<Button label="Drop in" onPress={onPress} disabled />);

    const button = screen.getByRole('button', { name: 'Drop in' });
    await user.press(button);

    expect(onPress).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  it('uses a custom accessibilityLabel when given', async () => {
    await render(
      <Button label="Go" accessibilityLabel="Start 10 minute session" onPress={jest.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'Start 10 minute session' })).toBeOnTheScreen();
  });
});
