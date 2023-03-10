import React from "react";
import dayjs from "dayjs";
import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { useEffectOnce } from "react-use";

// Day.js plugins
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";

// i18n resources
import en from "./i18n/en.json";
import nl from "./i18n/nl.json";

import { StrapionConfigWithOptionals } from "./types/config";

import StrapionProvider from "./providers/StrapionProvider";
import StrapiProvider from "./providers/StrapiProvider";

import useSession from "./hooks/useSession";

import Root from "./routes/Root";
import Login from "./routes/Login";

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

const Strapion: React.FC<StrapionConfigWithOptionals> = (props) => {
  const configWithDefaults = {
    zones: [],
    routes: [],
    plugins: [],
    contentTypes: [],
    theme: {},
    i18n: {
      en: {
        translation: en,
      },
      nl: {
        translation: en,
      },
    },
    ...props,
  };
  const configAfterPlugins = configWithDefaults.plugins.reduce(
    (config, plugin) => plugin(config),
    configWithDefaults
  );
  const auth = useSession((state) => Boolean(state.token));

  useEffectOnce(() => {
    i18n.use(initReactI18next).init({
      fallbackLng: "en",
      defaultNS: "translation",
      interpolation: {
        escapeValue: false,
      },
      resources: configAfterPlugins.i18n,
    });
  });

  return (
    <I18nextProvider i18n={i18n}>
      <StrapionProvider config={configAfterPlugins}>
        <StrapiProvider apiUrl={props.strapiUrl}>Booja</StrapiProvider>
      </StrapionProvider>
    </I18nextProvider>
  );
};

export default Strapion;
