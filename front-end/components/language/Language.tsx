import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Language: React.FC = () => {
  const router = useRouter();
  const { locale, pathname, asPath, query } = router;
  const { t } = useTranslation("common");

  const handleLanguageChange = (event: { target: { value: string } }) => {
    const newLocale = event.target.value;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <div className="text-white flex items-center space-x-2">
      <label htmlFor="language" className="text-sm font-medium">
        {t("language.selector.label")}:
      </label>
      <select
        id="language"
        className="bg-gray-800 text-white border border-gray-600 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={locale}
        onChange={handleLanguageChange}
      >
        <option value="en">{t("language.options.en")}</option>
        <option value="es">{t("language.options.es")}</option>
      </select>
    </div>
  );
};

export default Language;
