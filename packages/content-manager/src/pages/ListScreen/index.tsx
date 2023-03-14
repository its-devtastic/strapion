import React from "react";
import { Badge, Button, Dropdown, Image, Table, Tooltip } from "antd";
import * as R from "ramda";
import { useTranslation } from "react-i18next";
import { useAsync } from "react-use";
import { useNavigate, useParams } from "react-router-dom";
import { useStrapion, useStrapi, Spinner, CalendarTime } from "@strapion/core";

import { SORTABLE_FIELD_TYPES } from "../../utils/constants";

import FilterToolbar from "./FilterToolbar";
import { Formik } from "formik";

const ListScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams<"apiID">();
  const apiID = params.apiID ?? "";
  const { contentTypes, sdk } = useStrapi();
  const contentType = contentTypes.find(R.whereEq({ apiID }));
  const config = useStrapion();
  const contentTypeConfig = config.contentTypes.find(R.whereEq({ apiID }));
  const hasDraftState = contentType?.options.draftAndPublish;
  const name = contentTypeConfig?.name ?? contentType?.info.displayName ?? "";

  const { value: manager } = useAsync(async () => {
    return await sdk.getMany(apiID);
  }, [sdk]);

  return contentTypeConfig && contentType ? (
    <Formik
      initialValues={{
        page: 1,
        pageSize: 10,
        pageCount: 0,
        _q: "",
        sort: "",
      }}
      onSubmit={() => {}}
    >
      {({ values, setFieldValue }) => (
        <div className="p-12 max-w-screen-xl">
          <div className="flex items-center justify-between mb-24">
            <h1>{t(name, { count: 2 })}</h1>

            <Button type="primary">
              {`${t("phrases.create_new")} ${t(name).toLowerCase()}`}
            </Button>
          </div>

          <div className="mb-4">
            <FilterToolbar />
          </div>

          <Table
            className="border border-solid rounded-sm border-slate-200"
            dataSource={manager.items}
            sortDirections={["ascend", "descend", "ascend"]}
            rowKey="id"
            showSorterTooltip={false}
            onRow={(record) => ({
              onClick: () => navigate(`/content-manager/article/${record.id}`),
            })}
            rowClassName="cursor-pointer"
            columns={[
              hasDraftState && {
                key: "draftStatus",
                dataIndex: "publishedAt",
                width: 40,
                render(value: any) {
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
              ...(contentTypeConfig.columns?.map((column: any) => {
                const config =
                  column.dataIndex &&
                  contentType.attributes[String(column.dataIndex)];
                const sortable = SORTABLE_FIELD_TYPES.includes(config?.type);
                const isSorted = values.sort.split(":")[0] === column.dataIndex;

                return {
                  onHeaderCell: (column: any) => ({
                    onClick: () => {
                      if (sortable) {
                        setFieldValue(
                          "sort",
                          `${column.dataIndex}:${
                            isSorted
                              ? values.sort.split(":")[1] === "DESC"
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
                    ? values.sort.split(":")[1] === "ASC"
                      ? "ascend"
                      : "descend"
                    : null,
                  render(value: any) {
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
            pagination={{
              pageSize: values.pageSize,
              current: values.page,
              total: values.pageCount,
              onChange: (page) => setFieldValue("page", page),
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} of ${total} items`,
            }}
          />
        </div>
      )}
    </Formik>
  ) : (
    <div className="flex items-center justify-center h-screen max-w-screen-xl">
      <Spinner />
    </div>
  );
};

export default ListScreen;
