import { Suspense, memo, useEffect, useRef } from 'react';
import { getScreenById } from '../screen-switch.container.helper';
import type { TScreenWrapperProps } from './screen-wrapper.screen-switch.container.type';
import s from './screen-wrapper.screen-switch.module.scss';

const ScreenWrapper: React.FC<TScreenWrapperProps> = ({
  thisScreenId,
  shouldRender,
  positionClass,
  onTransitionComplete,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!wrapperRef.current) return;

    const cleanupAbortController = new AbortController();
    wrapperRef.current.addEventListener(
      'transitionend',
      (e: TransitionEvent) => {
        if (e.propertyName !== 'transform') return;
        onTransitionComplete(thisScreenId);
      },
      {
        signal: cleanupAbortController.signal,
      },
    );

    return () => cleanupAbortController.abort();
  }, [
    /**
     * Intentionally using positionClass in dependency list to trigger effect twice:
     * - On active screen change, when wrapper is placed in DOM and gets ref assigned.
     * - On position class change, when rendered wrapper starts transitioning and needs to be tracked.
     */
    thisScreenId,
    positionClass,
    onTransitionComplete,
  ]);

  if (!shouldRender) return null;
  const ScreenComponent = getScreenById(thisScreenId).lazyComponent;

  return (
    <div ref={wrapperRef} className={`${s.screenWrapperContainer} ${positionClass}`}>
      <Suspense
        fallback={
          <div className={s.loader}>
            <div className={s.spinner} />
          </div>
        }
      >
        <ScreenComponent />
      </Suspense>
    </div>
  );
};

export const ScreenWrapperMemo = memo(ScreenWrapper);
