import React, { createContext } from "react";

import { StrapionConfig } from "../types/config";

export const Context = createContext<StrapionConfig>({} as StrapionConfig);

const StrapionProvider: React.FC<{
  config: StrapionConfig;
  children: React.ReactNode;
}> = ({ children, config }) => {
  return <Context.Provider value={config}>{children}</Context.Provider>;
};

export default StrapionProvider;
