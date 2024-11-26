import type { FC } from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { isMaintenance } from 'src/helpers';
import { MaintenanceRouter } from './maintenance';
import { StableRouter } from './stable';

type TRouter = {
  [key: string]: unknown;
};

const router = createBrowserRouter(
  createRoutesFromElements(isMaintenance() ? MaintenanceRouter : StableRouter),
);

export const Router: FC<TRouter> = () => <RouterProvider router={router} />;
