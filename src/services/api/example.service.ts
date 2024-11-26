import { createService, request } from 'src/services/request-base';
import { API_ROUTES } from './api.const';
import { z } from 'zod';

export const fieldSchema = z.object({
  test: z.string(),
});

export const responseFieldSchema = z.object({
  test1: z.string(),
});

export const errorSchema = z.object({
  message: z.string(),
});

export const exampleSendFieldService = createService(
  {
    url: API_ROUTES.USERS.PROFILE.ME,
    method: 'POST',
    headers: { 'Custom-Header': 'value' },
    maxAttempts: 1,
    attemptDelayMS: 500,
    attemptDelayGrowthMS: 500,
    timeoutMS: 10_000,
    // fetchOptions: {}
  },
  {
    isPrivate: true,
    requestSchema: fieldSchema,
    responseSchema: responseFieldSchema,
    errorSchema,
  },
);
