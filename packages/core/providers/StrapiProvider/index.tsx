import React, { useState } from "react";
import { useAsync } from "react-use";

import useStrapi from "../../hooks/useStrapi";

const StrapiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [initialized, setInitialized] = useState(false);
  const { getContentTypes, getLocales } = useStrapi();

  useAsync(async () => {
    await getContentTypes();
    await getLocales();

    setInitialized(true);
  });

  return <>{initialized && children}</>;
};

export default StrapiProvider;
