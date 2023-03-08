import React from "react";
import { Select, SelectProps } from "antd";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import * as R from "ramda";

import "flag-icons/css/flag-icons.min.css";

import useStrapi from "../../hooks/useStrapi";

const LanguageSelect: React.FC<SelectProps> = ({
  className,
  value,
  ...props
}) => {
  const { locales } = useStrapi();
  const { t } = useTranslation();

  return (
    <Select
      {...props}
      value={value ?? locales.find(R.whereEq({ isDefault: true }))?.code}
      className={classNames("w-full", className)}
      options={locales.map(({ code }) => ({
        label: (
          <div className="flex items-center gap-3">
            <span
              className={`rounded-sm fi fi-${
                code.startsWith("en") ? "us" : code.split("-")[0]
              }`}
            />
            <span>{t(`locales.${code}`)}</span>
          </div>
        ),
        value: code,
      }))}
    />
  );
};

export default LanguageSelect;
