import { ComingSoon } from '@/components/ComingSoon';
import { DevLink } from '@/dev/DevLink';
import { t } from '@/i18n/t';

export default function MeScreen() {
  return (
    <ComingSoon title={t('tabs.me')}>
      <DevLink />
    </ComingSoon>
  );
}
