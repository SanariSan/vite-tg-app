import { useAtomValue, useSetAtom } from 'jotai';
import type { FC } from 'react';
import { memo, useEffect } from 'react';
import { HomeComponentMemo } from 'src/components/pages/home';
import { getMyProfileAtom, myProfileAtom } from 'src/store/atoms/users';

type THomeContainer = {
  [key: string]: unknown;
};

const HomeContainer: FC<THomeContainer> = () => {
  const myProfile = useAtomValue(myProfileAtom);
  const getMyProfile = useSetAtom(getMyProfileAtom);

  useEffect(() => {
    const abortController = new AbortController();

    getMyProfile({ signal: abortController.signal });

    return () => abortController.abort();
  }, [getMyProfile]);

  return <HomeComponentMemo myProfile={myProfile.data} />;
};

const HomeContainerMemo = memo(HomeContainer);

export default HomeContainerMemo;
