import type { TScreenId } from '../screen-switch.container.const';

export type TScreenWrapperProps = {
  thisScreenId: TScreenId;
  shouldRender: boolean;
  positionClass: string;
  onTransitionComplete: (screenId: TScreenId) => void;
};
