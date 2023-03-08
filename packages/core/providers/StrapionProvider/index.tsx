import React, { useEffect } from "react";
import dayjs from "dayjs";
import { ConfigProvider } from "antd";
import * as R from "ramda";

// Day.js plugins
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";

import useStrapion from "../../hooks/useStrapion";
import { StrapionConfig } from "../../types/config";

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

const StrapionProvider: React.FC<{
  strapionConfig: StrapionConfig;
  children: React.ReactNode;
}> = ({ children, strapionConfig }) => {
  const { config, setStrapionConfig } = useStrapion();

  useEffect(
    () =>
      setStrapionConfig(
        strapionConfig.plugins.reduce(
          (config, plugin) => plugin(config),
          strapionConfig
        )
      ),
    [strapionConfig]
  );

  return (
    <>
      {!R.isEmpty(config) ? (
        <ConfigProvider theme={config.theme}>{children}</ConfigProvider>
      ) : null}
    </>
  );
};

export default StrapionProvider;
