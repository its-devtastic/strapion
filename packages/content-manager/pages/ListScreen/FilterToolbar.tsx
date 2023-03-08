import React, { useState } from "react";
import { Button, Input } from "antd";
import { useTranslation } from "react-i18next";
import { ReloadOutlined } from "@ant-design/icons";
import { LanguageSelect } from "@strapion/core";

import useContentListManager from "../../hooks/useContentListManager";

const FilterToolbar: React.FC<{ apiID: string }> = ({ apiID }) => {
  const { t } = useTranslation();
  const { filters, setFilters, fetch } = useContentListManager();
  const [loading, setLoading] = useState<false | "button" | "search">(false);

  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Input.Search
          loading={loading === "search"}
          onSearch={async (_q) => {
            setFilters({ _q });
            setLoading("search");
            await fetch(apiID);
            setLoading(false);
          }}
          placeholder={t("common.search")}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-48">
          <LanguageSelect
            value={filters.locale}
            onChange={async (locale) => {
              setFilters({ locale });
              await fetch(apiID);
            }}
          />
        </div>
        <Button
          loading={loading === "button"}
          type="text"
          icon={<ReloadOutlined />}
          onClick={async () => {
            setLoading("button");
            await fetch(apiID);
            setLoading(false);
          }}
        />
      </div>
    </div>
  );
};

export default FilterToolbar;
