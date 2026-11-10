import { render, screen, userEvent } from '@testing-library/react-native';

import { Chip } from '../Chip';

describe('Chip', () => {
  it('exposes its selected state to screen readers', async () => {
    await render(
      <>
        <Chip label="5" accessibilityLabel="5 minutes" selected onPress={jest.fn()} />
        <Chip label="10" accessibilityLabel="10 minutes" selected={false} onPress={jest.fn()} />
      </>,
    );

    expect(screen.getByRole('button', { name: '5 minutes' })).toBeSelected();
    expect(screen.getByRole('button', { name: '10 minutes' })).not.toBeSelected();
  });

  it('calls onPress when pressed', async () => {
    const onPress = jest.fn();
    const user = userEvent.setup();
    await render(<Chip label="M" selected={false} onPress={onPress} />);

    await user.press(screen.getByRole('button', { name: 'M' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
