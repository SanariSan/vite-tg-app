import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { constructLocalizedRoute } from 'src/helpers';
import { ScreenSwitcherControlsContainerMemo } from './controls.screen-switch';
import { SCREEN_IDS, type TScreenId } from './screen-switch.container.const';
import {
  calculateAllPositions,
  getInitialScreenState,
  getScreenById,
} from './screen-switch.container.helper';
import type { TScreenPositionClassesState, TScreenState } from './screen-switch.container.type';
import s from './screen-switch.module.scss';
import { ScreenWrapperMemo } from './screen-wrapper';

export const ScreenSwitchContainer = () => {
  const navigate = useNavigate();
  const { screenPath } = useParams();

  const [screenState, setScreenState] = useState<TScreenState>(() =>
    getInitialScreenState(screenPath),
  );
  const [screensPositionsClasses, setScreensPositionsClasses] =
    useState<TScreenPositionClassesState>(() =>
      calculateAllPositions({ activeScreenId: screenState.activeScreenId }),
    );
  const pendingTransitionsRef = useRef<Set<TScreenId>>(new Set());

  // Derive correct path from active screen when not provided in URL
  useEffect(() => {
    if (!screenPath) {
      // Allow all repainting to happen first, then apply route change
      requestAnimationFrame(() => {
        const activeScreen = getScreenById(screenState.activeScreenId);
        navigate(constructLocalizedRoute({ route: activeScreen.route }));
        return;
      });
    }
  }, [screenPath, screenState, navigate]);

  const handleTransitionComplete = useCallback(
    (screenId: TScreenId) => {
      console.debug(`Screen transition complete: ${screenId}`);
      pendingTransitionsRef.current.delete(screenId);

      if (pendingTransitionsRef.current.size === 0) {
        console.debug(`All transitions completed, unlocking screen switch`);
        setScreenState((prev) => ({ ...prev, isTransitioning: false }));
      }
    },
    [setScreenState],
  );

  const switchScreen = useCallback(
    (newActiveScreenId: TScreenId) => {
      /**
       * Firstly, change active screen but keep old css positions.
       * This allows new active screen to become visible at it's old, not updated position.
       */
      setScreenState((prev) => {
        if (prev.isTransitioning || prev.activeScreenId === newActiveScreenId) {
          return prev;
        }

        pendingTransitionsRef.current = new Set([prev.activeScreenId, newActiveScreenId]);
        console.debug(
          `Initializing screens transition: ${prev.activeScreenId} -> ${newActiveScreenId}`,
        );

        // Allow all repainting to happen first, then apply route change
        queueMicrotask(() => {
          const activeScreen = getScreenById(newActiveScreenId);
          navigate(constructLocalizedRoute({ route: activeScreen.route }));
        });

        return {
          activeScreenId: newActiveScreenId,
          prevScreenId: prev.activeScreenId,
          isTransitioning: true,
        };
      });

      /**
       * Secondly, calculate and apply new positions on one of the next frames to avoid batching.
       * This way, the new active screen will be already in DOM ready to be transitioned.
       */
      requestAnimationFrame(() => {
        setScreensPositionsClasses(calculateAllPositions({ activeScreenId: newActiveScreenId }));
      });
    },
    [navigate, setScreenState],
  );

  return (
    <div className={s.screenSwitcherContainer}>
      {SCREEN_IDS.map((screenId) => (
        <ScreenWrapperMemo
          key={`screen-${screenId}}`}
          thisScreenId={screenId}
          shouldRender={
            screenId === screenState.activeScreenId || screenId === screenState.prevScreenId
          }
          positionClass={screensPositionsClasses[screenId]}
          onTransitionComplete={handleTransitionComplete}
        />
      ))}

      <ScreenSwitcherControlsContainerMemo
        activeScreenId={screenState.activeScreenId}
        isTransitioning={screenState.isTransitioning}
        switchScreen={switchScreen}
      />
    </div>
  );
};

const ScreenSwitchContainerMemo = memo(ScreenSwitchContainer);

export { ScreenSwitchContainerMemo };
