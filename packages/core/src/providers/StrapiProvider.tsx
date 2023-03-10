import React, { createContext, useState } from "react";
import { useAsync } from "react-use";

import { ContentType } from "../types/contentType";
import { StrapiLocale } from "../types/locales";
import { StrapiSdk } from "../utils/sdk";

export const Context = createContext<{ sdk: StrapiSdk }>({} as any);

export const StrapiProvider: React.FC<{
  apiUrl: string;
  children: React.ReactNode;
}> = ({ apiUrl, children }) => {
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [locales, setLocales] = useState<StrapiLocale[]>([]);
  const sdk = new StrapiSdk(apiUrl);

  useAsync(async () => {
    // await getContentTypes();
    // await getLocales();
  }, []);

  return <Context.Provider value={{ sdk }}>{children}</Context.Provider>;
};

export default StrapiProvider;
