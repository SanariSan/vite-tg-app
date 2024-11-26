import type { ChangeEvent, FC } from 'react';
import { memo } from 'react';
import { LANGUAGES, type TLanguage } from 'src/i18n';

type TLangSwitchComponent = {
  currentLanguage: TLanguage;
  handleSwitchLanguage: (event: ChangeEvent<HTMLSelectElement>) => void;
};

const LangSwitchComponent: FC<TLangSwitchComponent> = ({
  currentLanguage,
  handleSwitchLanguage,
}) => {
  return (
    <div>
      <select
        value={currentLanguage}
        onChange={handleSwitchLanguage}
        className="px-2 py-1 border rounded-md"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang} value={lang}>
            {lang.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

const LangSwitchComponentMemo = memo(LangSwitchComponent);

export { LangSwitchComponentMemo };
