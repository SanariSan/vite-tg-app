import { createService } from 'src/services/request-base';
import { API_ROUTES } from '../api.const';

export const signinWebappService = createService({
  url: API_ROUTES.AUTH.WEBAPP,
  method: 'GET',
});
