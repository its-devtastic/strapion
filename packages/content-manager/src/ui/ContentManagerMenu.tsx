import React from "react";
import { useAsync } from "react-use";
import * as R from "ramda";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { api, Spinner, useStrapion } from "@strapion/core";
import { ContentType } from "@strapion/core/types/contentType";

const ContentManagerMenu: React.FC<{
  groups: { label: string; items: string[] }[];
}> = ({ groups }) => {
  const { t } = useTranslation();
  const {
    config: { contentTypes },
  } = useStrapion();
  const { value, loading } = useAsync(async () => {
    const {
      data: { data },
    } = await api.get<{ data: ContentType[] }>(
      "/content-manager/content-types"
    );

    return data;
  }, []);

  return (
    <div className="w-[600px] max-w-full">
      {loading || !value ? (
        <div className="py-12 text-center">
          <Spinner />
        </div>
      ) : (
        <div className="space-y-6 py-3">
          {groups.map(({ label, items }, idx) => (
            <div key={idx}>
              {label && (
                <h4 className="pl-3 mb-3 mt-0 uppercase text-xs text-slate-500">
                  {t(label)}
                </h4>
              )}
              <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                {items
                  .map((apiID) => value.find(R.whereEq({ apiID })))
                  .filter((i): i is ContentType => Boolean(i))
                  .map(({ apiID, info }) => {
                    const config = contentTypes.find(R.whereEq({ apiID }));

                    return (
                      <Link
                        key={apiID}
                        to={`/content-manager/${apiID}`}
                        className="group flex gap-2 hover:bg-slate-100 rounded-lg p-3"
                      >
                        {config?.icon && (
                          <div className="flex-none text-slate-500">
                            {config.icon}
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-semibold text-slate-600 group-hover:text-slate-600">
                            {t(config?.name || info.displayName)}
                          </div>
                          {config?.description && (
                            <div className="text-xs text-slate-500">
                              {t(config.description)}
                            </div>
                          )}
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContentManagerMenu;
