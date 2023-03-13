import React from "react";
import { Button, Input, Card } from "antd";
import { useTranslation } from "react-i18next";
import { Formik, Field, Form } from "formik";

import useStrapi from "../hooks/useStrapi";
import useSession from "../hooks/useSession";

const Login: React.FC = () => {
  const { t } = useTranslation();
  const { sdk } = useStrapi();
  const { setSession } = useSession();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="max-w-sm">
        <Card>
          {
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (credentials) => {
                const data = await sdk.login(credentials);
                setSession(data);
              }}
            >
              {() => (
                <Form className="space-y-3">
                  <Field name="email" as={Input} type="email" />
                  <Field name="password" as={Input.Password} />
                  <Button type="primary" className="w-full" htmlType="submit">
                    {t("login.login_button")}
                  </Button>
                </Form>
              )}
            </Formik>
          }
        </Card>
      </div>
    </div>
  );
};

export default Login;
