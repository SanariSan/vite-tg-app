import type { FC } from 'react';
import { memo } from 'react';
import { useTranslate } from 'src/hooks';
import s from './welcome.module.scss';

type TWelcomeComponent = {
  onAcknowledge: () => void;
};

const WelcomeComponent: FC<TWelcomeComponent> = ({ onAcknowledge }) => {
  const { t } = useTranslate('welcome');

  return (
    <div className={s.home}>
      Welcome screen
      <br />
      <button onClick={onAcknowledge} style={{ padding: '10px', background: 'purple' }}>
        {t('acknowledge')}
      </button>
    </div>
  );
};

const WelcomeComponentMemo = memo(WelcomeComponent);

export { WelcomeComponentMemo };
