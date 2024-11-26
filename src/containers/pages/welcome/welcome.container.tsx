import type { FC } from 'react';
import { memo, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { WelcomeComponentMemo } from 'src/components/pages/welcome';
import { LocalStorageHelper } from 'src/helpers';
import { useLocalizedRoutes } from 'src/hooks';

type TWelcomeContainer = {
  [key: string]: unknown;
};

const WelcomeContainer: FC<TWelcomeContainer> = () => {
  const navigate = useNavigate();
  const { SCREEN_HOME } = useLocalizedRoutes();
  const [isWelcomeAcknowledged, setIsWelcomeAcknowledged] = useState<boolean>(
    () => LocalStorageHelper.getPlainItem('isWelcomeAcknowledged') === 'true',
  );

  useLayoutEffect(() => {
    if (isWelcomeAcknowledged) navigate(SCREEN_HOME);
  }, [isWelcomeAcknowledged, navigate]);

  const onAcknowledge = () => {
    LocalStorageHelper.setPlainItem('isWelcomeAcknowledged', 'true');
    setIsWelcomeAcknowledged(true);
  };

  return !isWelcomeAcknowledged ? <WelcomeComponentMemo onAcknowledge={onAcknowledge} /> : null;
};

const WelcomeContainerMemo = memo(WelcomeContainer);

export { WelcomeContainerMemo };
