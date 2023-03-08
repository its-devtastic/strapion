import React from "react";
import { Badge, Button, Dropdown, Image, Table, Tooltip } from "antd";
import * as R from "ramda";
import { useTranslation } from "react-i18next";
import { useEffectOnce } from "react-use";
import { useRouter } from "next/navigation";
import { useStrapion, useStrapi, Spinner, CalendarTime } from "@strapion/core";

import { SORTABLE_FIELD_TYPES } from "../../utils/constants";
import useContentListManager from "../../hooks/useContentListManager";

import FilterToolbar from "./FilterToolbar";

const ListScreen: React.FC<{ params: Record<string, string> }> = ({
  params,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const apiID = params.apiID;
  const { contentTypes } = useStrapi();
  const { items, pagination, fetch, sort, setSort, setPage } =
    useContentListManager();
  const contentType = contentTypes.find(R.whereEq({ apiID }));
  const contentTypeConfig = useStrapion((state) =>
    state.config.contentTypes.find(R.whereEq({ apiID }))
  );
  const hasDraftState = contentType?.options.draftAndPublish;
  const name = contentTypeConfig?.name ?? contentType?.info.displayName ?? "";

  useEffectOnce(() => {
    fetch(apiID);
  });

  return contentTypeConfig && contentType ? (
    <div className="p-12 max-w-screen-xl">
      <div className="flex items-center justify-between mb-24">
        <h1>{t(name, { count: 2 })}</h1>

        <Button type="primary">
          {`${t("phrases.create_new")} ${t(name).toLowerCase()}`}
        </Button>
      </div>

      <div className="mb-4">
        <FilterToolbar apiID={apiID} />
      </div>

      <Table
        className="border border-solid rounded-sm border-slate-200"
        dataSource={items}
        sortDirections={["ascend", "descend", "ascend"]}
        rowKey="id"
        showSorterTooltip={false}
        onRow={(record) => ({
          onClick: () => router.push(`/content-manager/article/${record.id}`),
        })}
        rowClassName="cursor-pointer"
        columns={[
          hasDraftState && {
            key: "draftStatus",
            dataIndex: "publishedAt",
            width: 40,
            render(value) {
              return (
                <Tooltip
                  placement="top"
                  title={value ? t("common.published") : t("common.draft")}
                >
                  <div className="flex">
                    <Dropdown
                      menu={{
                        items: [
                          {
                            key: 1,
                            label: value
                              ? t("common.unpublish")
                              : t("common.publish"),
                          },
                        ],
                      }}
                      trigger={["click"]}
                    >
                      <Button type="text">
                        <Badge color={value ? "green" : "yellow"} />
                      </Button>
                    </Dropdown>
                  </div>
                </Tooltip>
              );
            },
          },
          ...(contentTypeConfig.columns?.map((column) => {
            const config =
              column.dataIndex &&
              contentType.attributes[String(column.dataIndex)];
            const sortable = SORTABLE_FIELD_TYPES.includes(config?.type);
            const isSorted = sort?.split(":")[0] === column.dataIndex;

            return {
              onHeaderCell: (column) => ({
                onClick: () => {
                  if (sortable) {
                    setSort(
                      `${column.dataIndex}:${
                        isSorted
                          ? sort?.split(":")[1] === "DESC"
                            ? "ASC"
                            : "DESC"
                          : "ASC"
                      }`
                    );
                    fetch(apiID);
                  }
                },
              }),
              sorter: sortable,
              sortOrder: isSorted
                ? sort?.split(":")[1] === "ASC"
                  ? "ascend"
                  : "descend"
                : null,
              render(value) {
                switch (config?.type) {
                  case "datetime":
                    return <CalendarTime>{value}</CalendarTime>;
                  case "media":
                    return value.mime?.startsWith("image/") ? (
                      <Image
                        src={value.url}
                        alt=""
                        width={64}
                        height={64}
                        preview={false}
                        fallback="/image_fallback.png"
                        className="rounded-md"
                      />
                    ) : (
                      value
                    );
                  default:
                    return value;
                }
              },
              ...column,
            };
          }) ?? []),
        ].filter(Boolean)}
        pagination={
          !R.isNil(pagination) && {
            pageSize: pagination.pageSize,
            current: pagination.page,
            total: pagination.pageCount,
            onChange: (page) => setPage(page),
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} items`,
          }
        }
      />
    </div>
  ) : (
    <div className="flex items-center justify-center h-screen max-w-screen-xl">
      <Spinner />
    </div>
  );
};

export default ListScreen;
