import type { ChangeEvent, FC } from 'react';
import { memo } from 'react';
import { LangSwitchComponentMemo } from 'src/components/lang';
import { useTranslate } from 'src/hooks';
import type { TLanguage } from 'src/i18n';

type TLangContainer = {
  [key: string]: unknown;
};

const LangSwitchContainer: FC<TLangContainer> = () => {
  const { i18n } = useTranslate();
  const currentLanguage = i18n.resolvedLanguage as TLanguage;

  const handleSwitchLanguage = (event: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(event.target.value as TLanguage);
  };

  return (
    <LangSwitchComponentMemo
      currentLanguage={currentLanguage}
      handleSwitchLanguage={handleSwitchLanguage}
    />
  );
};

const LangSwitchContainerMemo = memo(LangSwitchContainer);

export { LangSwitchContainerMemo };
