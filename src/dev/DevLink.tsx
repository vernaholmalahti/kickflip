// DEV ONLY — opens the component/theme test screen. Renders nothing in release
// builds (__DEV__ is false there). Label is hard-coded: never user-facing.
import { router } from 'expo-router';

import { Button } from '@/components/Button';

export function DevLink() {
  if (!__DEV__) return null;
  return <Button label="Dev preview" variant="ghost" onPress={() => router.push('/dev')} />;
}
