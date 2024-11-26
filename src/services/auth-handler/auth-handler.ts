import { LocalStorageHelper, isNotNullish, isNullish, makeUnboundPromise } from 'src/helpers';
import { FIFOSynchronizer } from 'src/helpers/synchronizer';
import { JwtObtainError } from './auth-handler.error';
import type { TGetJwt } from './auth-handler.type';
import { signinWebappService } from '../api/auth';

export class AuthHandler {
  private static jwt: string | null = null;
  private static isLockedForObtain = false;

  private static async obtainJwt() {
    // only extract jwt from local storage if there is no valid jwt field i.e. this is initial load
    if (isNullish(this.jwt)) {
      const lsJwt = LocalStorageHelper.getPlainItem('jwt');
      if (isNotNullish(lsJwt)) {
        console.debug('jwt obtained from local storage');
        this.jwt = lsJwt;
        return;
      }
    }

    // fallback to tgWebappData initialization for both empty local storage and force jwt refresh calls
    const tgWebappData = LocalStorageHelper.getHashItem('tgWebAppData');
    if (isNotNullish(tgWebappData)) {
      console.debug('tgWebappData obtained from local storage');

      const query = new URLSearchParams();
      query.set('tgWebAppData', tgWebappData);
      const response = await signinWebappService({ query });

      const authHeader = response.headers.get('Authorization');
      if (isNotNullish(authHeader)) {
        console.debug('jwt obtained from tgWebappData auth request');

        const jwt = authHeader.replace('Bearer ', '');
        LocalStorageHelper.setPlainItem('jwt', jwt);
        this.jwt = jwt;

        return;
      }
    }

    throw new Error('Unable to obtain jwt neither from local storage nor tgWebappData');
  }

  /**
   * Only try to force obtain new jwt IF the jwt that caused this force call is the SAME as the current jwt.
   * If they are NOT the same, this means previous mutex entry already obtained a new one and it should be used instead.
   */
  public static async getJwt({ forceRefresh, forceReasonJwt }: TGetJwt = {}): Promise<string> {
    const { promise, resolve, reject } = makeUnboundPromise<string>();

    FIFOSynchronizer.runExclusive({
      callback: async () => {
        if (isNotNullish(this.jwt) && !forceRefresh) {
          console.debug('jwt obtained from cache');

          resolve(this.jwt as string);
          return;
        }

        if (
          !this.isLockedForObtain &&
          (!forceRefresh || (forceRefresh && forceReasonJwt === this.jwt))
        ) {
          try {
            this.isLockedForObtain = true;
            await this.obtainJwt();
          } catch (error) {
            reject(new JwtObtainError((error as Error).message));
            return;
          } finally {
            this.isLockedForObtain = false;
          }
        }

        if (isNotNullish(this.jwt)) {
          resolve(this.jwt as string);
        } else {
          /**
           * For this to happen we need to:
           * - have this.jwt = null (so initialization is failed)
           * - pass forceRefresh: true
           * - pass forceReasonJwt: null
           */
          reject(new JwtObtainError('Unexpected null jwt value'));
        }
      },
      tag: 'getJwt',
    });

    return promise;
  }
}
