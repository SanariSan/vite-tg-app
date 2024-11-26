import type { FC } from 'react';
import { memo } from 'react';

type TMaintenanceComponent = {
  [key: string]: unknown;
};

const MaintenanceComponent: FC<TMaintenanceComponent> = () => {
  return <>Maintenance ongoing, hold tight...</>;
};

const MaintenanceComponentMemo = memo(MaintenanceComponent);

export { MaintenanceComponentMemo };
