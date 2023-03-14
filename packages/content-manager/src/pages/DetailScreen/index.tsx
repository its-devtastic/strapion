import React from "react";
import { Badge, Button, Card, Dropdown, Image, Input } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import * as R from "ramda";
import { useAsync } from "react-use";
import { Field, Formik } from "formik";
import Link from "next/link";

import {
  useStrapion,
  useStrapi,
  Spinner,
  CalendarTime,
  LanguageSelect,
  useTranslation,
} from "@strapion/core";

const DetailScreen: React.FC = ({ params }: any) => {
  const { t } = useTranslation();
  const apiID = params.apiID ?? "";
  const { contentTypes, sdk } = useStrapi();
  const contentType = contentTypes.find(R.whereEq({ apiID }));
  const config = useStrapion();
  const contentTypeConfig = config.contentTypes.find(R.whereEq({ apiID }));
  const hasDraftState = contentType?.options.draftAndPublish;

  const { value } = useAsync(async () => {
    return sdk.getOne(apiID, Number(params.id));
  }, []);

  return contentTypeConfig && contentType && value ? (
    <Formik initialValues={value} onSubmit={() => {}}>
      {({ values }) => {
        const { side, main, coverImage } = contentTypeConfig.fields ?? {};

        return (
          <div className="p-12 max-w-screen-xl">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <Link
                  href={`/content-manager/${apiID}`}
                  className="text-indigo-500 no-underline text-sm space-x-2"
                >
                  <FontAwesomeIcon icon={faArrowLeft} />
                  <span>{t("common.back")}</span>
                </Link>
                <h1>
                  {`${t("common.edit")} ${t(
                    contentTypeConfig.name ?? ""
                  ).toLowerCase()}`}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs">
                  <span>{t("phrases.last_updated_at")}</span>{" "}
                  <CalendarTime>{values.updatedAt}</CalendarTime>
                </span>
                <Button type="primary">{t("common.save")}</Button>
              </div>
            </div>
            <div className="flex gap-12">
              <Card
                className="flex-none w-[400px] border-slate-200"
                cover={
                  coverImage && (
                    <Image
                      fallback="/image_fallback.png"
                      src={values[coverImage.path]?.url}
                      height={200}
                      className="object-cover"
                      alt=""
                    />
                  )
                }
              >
                {contentTypeConfig.fields?.side?.map(({ path, label }: any) => {
                  return (
                    <div key={path}>
                      {label && (
                        <label className="font-semibold mb-1 block">
                          {t(label)}
                        </label>
                      )}
                      <Field name={path} as={Input} />
                    </div>
                  );
                })}
              </Card>
              <Card
                className="flex-1 border-slate-200"
                title={
                  <div className="flex items-center justify-between">
                    <div>
                      <LanguageSelect />
                    </div>
                    <div>
                      {hasDraftState && (
                        <div>
                          <Dropdown
                            menu={{
                              items: [
                                {
                                  key: 1,
                                  label: values.publishedAt
                                    ? t("common.unpublish")
                                    : t("common.publish"),
                                },
                              ],
                            }}
                            trigger={["click"]}
                          >
                            <Button type="text">
                              <Badge
                                color={values.publishedAt ? "green" : "yellow"}
                                text={
                                  values.publishedAt
                                    ? t("common.published")
                                    : t("common.draft")
                                }
                              />
                            </Button>
                          </Dropdown>
                        </div>
                      )}
                    </div>
                  </div>
                }
              >
                Fields
              </Card>
            </div>
          </div>
        );
      }}
    </Formik>
  ) : (
    <div className="flex items-center justify-center h-screen max-w-screen-xl">
      <Spinner />
    </div>
  );
};

export default DetailScreen;
