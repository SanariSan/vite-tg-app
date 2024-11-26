import type { FC } from 'react';
import { memo } from 'react';
import { SCREENS, SCREEN_IDS, type TScreenId } from './screen-switch.container.const';
import s from './screen-switch.module.scss';

/**
 * (!) todo:
 * Temporary container for screen switcher controls.
 * Visuals will be moved, core switch will be done through atoms.
 */

type TScreenSwitcherControlsContainer = {
  activeScreenId: TScreenId;
  isTransitioning: boolean;
  switchScreen: (newActiveScreenId: TScreenId) => void;
};

const ScreenSwitcherControlsContainer: FC<TScreenSwitcherControlsContainer> = ({
  activeScreenId,
  isTransitioning,
  switchScreen,
}) => {
  return (
    <div className={s.controls}>
      {SCREENS.map(({ route }, idx) => (
        <button
          key={`switcher-button-${route}}`}
          onClick={() => switchScreen(SCREEN_IDS[idx])}
          disabled={activeScreenId === SCREEN_IDS[idx] || isTransitioning}
          className={s.button}
        >
          {route}
        </button>
      ))}
    </div>
  );
};

const ScreenSwitcherControlsContainerMemo = memo(ScreenSwitcherControlsContainer);

export { ScreenSwitcherControlsContainerMemo };
