import { createService } from 'src/services/request-base';
import { API_ROUTES } from '../api.const';

export const authStatusService = createService(
  { url: API_ROUTES.AUTH.PING, method: 'GET' },
  { isPrivate: true },
);
