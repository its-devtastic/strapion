import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import dayjs from "dayjs";

// Day.js plugins
import relativeTime from "dayjs/plugin/relativeTime";
import calendar from "dayjs/plugin/calendar";
import localeData from "dayjs/plugin/localeData";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { StrapionConfigWithOptionals } from "./types/config";

import StrapionProvider from "./providers/StrapionProvider";
import StrapiProvider from "./providers/StrapiProvider";

import useSession from "./hooks/useSession";

import Root from "./routes/Root";
import Login from "./routes/Login";

dayjs.extend(relativeTime);
dayjs.extend(calendar);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);

const Strapion: React.FC<StrapionConfigWithOptionals> = (props) => {
  const configWithDefaults = {
    zones: [],
    routes: [],
    plugins: [],
    contentTypes: [],
    theme: {},
    ...props,
  };
  const configAfterPlugins = configWithDefaults.plugins.reduce(
    (config, plugin) => plugin(config),
    configWithDefaults
  );
  const auth = useSession((state) => Boolean(state.token));
  const router = createBrowserRouter([
    {
      path: "/",
      loader: async () => {
        if (!auth) {
          return new Response("", {
            status: 302,
            headers: {
              Location: "/login",
            },
          });
        }
        return null;
      },
      element: <Root />,
      children: [...configAfterPlugins.routes],
    },
    { path: "/login", element: <Login /> },
  ]);

  return (
    <StrapionProvider config={configAfterPlugins}>
      <StrapiProvider apiUrl={props.strapiUrl}>
        <RouterProvider router={router} />
      </StrapiProvider>
    </StrapionProvider>
  );
};

export default Strapion;
