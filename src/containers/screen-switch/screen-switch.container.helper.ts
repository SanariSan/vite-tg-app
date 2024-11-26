import { ROUTES } from 'src/router';
import { SCREENS, SCREEN_IDS, type TScreen, type TScreenId } from './screen-switch.container.const';
import type { TScreenState } from './screen-switch.container.type';
import s from './screen-wrapper/screen-wrapper.screen-switch.module.scss';

export const getScreenById = (id: TScreenId): TScreen => SCREENS[id];
export const getScreenByParam = (
  param: string,
): { screen: TScreen; screenId: TScreenId } | null => {
  const route = `${ROUTES.SCREENS_ROUTE}/${param}`;
  const screenIdx = SCREENS.findIndex((screen) => screen.route === route);

  return screenIdx === -1
    ? null
    : {
        screen: SCREENS[screenIdx],
        screenId: screenIdx as TScreenId,
      };
};

export const getInitialScreenState = (screenPath: string | undefined): TScreenState => {
  const defaultState: TScreenState = {
    activeScreenId: 0,
    prevScreenId: 0,
    isTransitioning: false,
  };

  if (!screenPath) return defaultState;
  const screenFromPath = getScreenByParam(screenPath);
  if (!screenFromPath) return defaultState;

  return {
    activeScreenId: screenFromPath.screenId,
    prevScreenId: screenFromPath.screenId,
    isTransitioning: false,
  };
};

const getPositionClass = ({
  thisScreenId,
  activeScreenId,
}: {
  thisScreenId: TScreenId;
  activeScreenId: TScreenId;
}) =>
  activeScreenId > thisScreenId
    ? s.screenLeft
    : activeScreenId < thisScreenId
    ? s.screenRight
    : s.screenCenter;

export const calculateAllPositions = ({ activeScreenId }: { activeScreenId: TScreenId }) =>
  SCREEN_IDS.reduce(
    (acc, curr) => ((acc[curr] = getPositionClass({ thisScreenId: curr, activeScreenId })), acc),
    {} as Record<TScreenId, string>,
  );
