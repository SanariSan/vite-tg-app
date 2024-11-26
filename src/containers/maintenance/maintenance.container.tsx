import type { FC } from 'react';
import { memo } from 'react';
import { MaintenanceComponentMemo } from 'src/components/maintenance';

type TMaintenanceContainer = {
  [key: string]: unknown;
};

const MaintenanceContainer: FC<TMaintenanceContainer> = () => {
  return <MaintenanceComponentMemo />;
};

const MaintenanceContainerMemo = memo(MaintenanceContainer);

export { MaintenanceContainerMemo };
