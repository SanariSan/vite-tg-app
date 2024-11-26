import type { TScreenId } from './screen-switch.container.const';

export type TScreenState = {
  activeScreenId: TScreenId;
  prevScreenId: TScreenId;
  isTransitioning: boolean;
};

export type TScreenPositionClassesState = Record<TScreenId, string>;
