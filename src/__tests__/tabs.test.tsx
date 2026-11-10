import { userEvent } from '@testing-library/react-native';
import { renderRouter, screen } from 'expo-router/testing-library';

import TabLayout from '../app/(tabs)/_layout';
import GarageScreen from '../app/(tabs)/garage';
import TodayScreen from '../app/(tabs)/index';
import MeScreen from '../app/(tabs)/me';
import TrickBookScreen from '../app/(tabs)/tricks';

// A fake app folder: keys are route file paths, values are the screen components.
// The root layout is left out because it loads fonts (not needed for navigation).
const routes = {
  '(tabs)/_layout': TabLayout,
  '(tabs)/index': TodayScreen,
  '(tabs)/garage': GarageScreen,
  '(tabs)/tricks': TrickBookScreen,
  '(tabs)/me': MeScreen,
};

describe('Tab navigation', () => {
  it('starts on Today', async () => {
    await renderRouter(routes);

    expect(screen).toHavePathname('/');
    expect(screen.getByRole('header', { name: 'Today' })).toBeOnTheScreen();
  });

  it.each([
    ['Garage', '/garage'],
    ['Trick Book', '/tricks'],
    ['Me', '/me'],
    ['Today', '/'],
  ])('switches to %s when its tab is pressed', async (tabName, pathname) => {
    const user = userEvent.setup();
    await renderRouter(routes, { initialUrl: '/me' });

    // React Navigation labels tab buttons like "Garage, tab, 2 of 4".
    await user.press(screen.getByRole('button', { name: new RegExp(`^${tabName}, tab`) }));

    expect(screen).toHavePathname(pathname);
    expect(screen.getByRole('header', { name: tabName })).toBeOnTheScreen();
  });
});
