import { createService } from 'src/services/request-base';
import { API_ROUTES } from '../../api.const';
import { z } from 'zod';

export const myProfileResponseSchema = z.object({
  first_name: z.string().max(64),
  last_name: z.string().max(64).nullable(),
  tg_username: z.string().max(32).nullable(),
  tg_pic: z.string().max(128).nullable(),
  is_premium: z.boolean(),
});

export type TMyProfile = z.infer<typeof myProfileResponseSchema>;

export const myProfileService = createService(
  { url: API_ROUTES.USERS.PROFILE.ME, method: 'GET' },
  {
    isPrivate: true,
    responseSchema: myProfileResponseSchema,
  },
);
