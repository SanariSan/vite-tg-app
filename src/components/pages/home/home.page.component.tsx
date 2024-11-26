import type { FC } from 'react';
import { memo } from 'react';
import type { TMyProfile } from 'src/services/api/users/profile';
import s from './home.page.component.module.scss';
import { getRandomId } from 'src/helpers';
import { useTrackFirstMount } from 'src/hooks';

type THomeComponent = {
  myProfile: TMyProfile | null;
};

const componentTag = getRandomId();
const HomeComponent: FC<THomeComponent> = ({ myProfile }) => {
  const { isMounted } = useTrackFirstMount(componentTag);

  return (
    <div className={s.home}>
      Home
      <br />
      My profile info:
      <textarea
        value={myProfile ? JSON.stringify(myProfile, null, 2) : 'no data'}
        style={{
          width: '350px',
          height: '350px',
          opacity: isMounted ? 1 : 0,
          transition: 'opacity 300ms',
        }}
        readOnly
      ></textarea>
    </div>
  );
};

const HomeComponentMemo = memo(HomeComponent);

export { HomeComponentMemo };
