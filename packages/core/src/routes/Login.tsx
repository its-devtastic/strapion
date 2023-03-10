import React from "react";
import { Button, Input } from "antd";
import { useTranslation } from "react-i18next";

const Login: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white w-full max-w-sm rounded-sm border-2 border-solid shadow-lg shadow-gray-900/5 border-gray-400 p-4 space-y-3">
        <Input type="email" />
        <Input.Password />
        <Button type="primary">{t("login.button")}</Button>
      </div>
    </div>
  );
};

export default Login;
