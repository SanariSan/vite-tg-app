import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { isValidLanguage } from 'src/helpers';
import { useTranslate } from 'src/hooks';

/**
 * This component handles both lang inference from url to i18n and reflecting i18n to url.
 * Solution might look cryptic but I had no better ideas.
 */
export const LocaleRouteManager = () => {
  const { urlLang } = useParams<{ urlLang: string }>();
  const { t, i18n } = useTranslate();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Language inferred from url. If it's valid, then reflect to i18n.
   * Otherwise, if it's invalid or non-existent, redirect to i18n language.
   *
   * Effect only triggered by url path change.
   */
  useEffect(() => {
    // if there is valid lang in url, then update i18n to use it
    if (isValidLanguage(urlLang)) {
      i18n.changeLanguage(urlLang);
      return;
    }

    // if there's no lang in url or it's invalid, redirect to i18n lang
    navigate(`/${i18n.resolvedLanguage}${location.pathname}${location.search}`, {
      replace: true,
    });
  }, [urlLang, navigate, location, i18n]);

  /**
   * Language manually switched by calling i18n.changeLanguage (either by user or from prev effect).
   * Handle ONLY url update to match i18n lang if it's not the same yet.
   * i18n switch detection is possible due to translate cb in deps.
   *
   * Effect triggered by i18n lang change and by path change.
   * Latter is avoided by precise if checks.
   */
  useEffect(() => {
    /**
     * If there is valid lang in url AND it's not the same as i18n one (which change is handled by first useEffect),
     * then redirect to i18n lang.
     */
    if (isValidLanguage(urlLang) && urlLang !== i18n.resolvedLanguage) {
      const [, ...restPathname] = location.pathname.split('/').slice(1);

      navigate(`/${i18n.resolvedLanguage}/${restPathname.join('/')}${location.search}`, {
        replace: true,
      });
    }
  }, [
    // intentional usage of translate in deps to trigger re-render when i18n lang changes
    t,
    urlLang,
    navigate,
    location,
    i18n,
  ]);

  return <Outlet />;
};
