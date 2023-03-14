import React, { createContext, useMemo, useState } from "react";
import { useAsync } from "react-use";

import { ContentType } from "../types/contentType";
import { StrapiLocale } from "../types/locales";

import useSession from "../hooks/useSession";

import { StrapiSdk } from "../utils/sdk";

export const Context = createContext<{
  sdk: StrapiSdk;
  locales: StrapiLocale[];
  contentTypes: ContentType[];
}>({} as any);

export const StrapiProvider: React.FC<{
  apiUrl: string;
  children: React.ReactNode;
}> = ({ apiUrl, children }) => {
  const { token } = useSession();
  const [contentTypes, setContentTypes] = useState<ContentType[]>([]);
  const [locales, setLocales] = useState<StrapiLocale[]>([]);
  const sdk = useMemo(() => new StrapiSdk(apiUrl), []);

  useAsync(async () => {
    sdk.setAuthorization(token);

    if (token) {
      const contentTypes = await sdk.getContentTypes();
      const locales = await sdk.getLocales();
      setContentTypes(contentTypes);
      setLocales(locales);
    }
  }, [token]);

  return (
    <Context.Provider value={{ sdk, locales, contentTypes }}>
      {children}
    </Context.Provider>
  );
};

export default StrapiProvider;
