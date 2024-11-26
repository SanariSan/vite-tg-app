import { memo, useEffect } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { LocalStorageHelper, isTruthy } from 'src/helpers';

/**
 * This component is used to parse query and hash from url and store them in localStorage.
 */
export const QueryParser = () => {
  const location = useLocation();
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const hash: string = location.hash;

    if (isTruthy(hash)) {
      const hashParams = new URLSearchParams(hash.slice(1));
      hashParams.forEach((v, k) => {
        if (isTruthy(v) && LocalStorageHelper.isHashKey(k)) {
          LocalStorageHelper.setHashItem(k, v);
        }
      });
    }

    if (params.size > 0) {
      params.forEach((v, k) => {
        if (isTruthy(v) && LocalStorageHelper.isQueryKey(k)) {
          LocalStorageHelper.setQueryItem(k, v);
        }
      });
    }

    if (isTruthy(hash) || params.size > 0) {
      navigate(location.pathname, { replace: true, state: location.state });
    }
  }, [params, location, navigate]);

  return null;
};

const QueryParserMemo = memo(QueryParser);

export { QueryParserMemo };
