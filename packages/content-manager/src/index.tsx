import React from "react";
import * as R from "ramda";

import type { InjectionZoneEntry, StrapionConfig } from "@strapion/core";

import MainMenuItem from "./ui/MainMenuItem";
import ListScreen from "./pages/ListScreen";
import DetailScreen from "./pages/DetailScreen";

export default function contentManagerPlugin(
  { groups }: PluginOptions = { groups: [] }
) {
  return (config: StrapionConfig): StrapionConfig => {
    return R.evolve({
      routes: R.concat([
        { path: "/content-manager/:apiID", element: <ListScreen /> },
        { path: "/content-manager/:apiID/:id", element: <DetailScreen /> },
      ]),
      zones: R.append<InjectionZoneEntry>({
        zone: "mainMenu::top",
        weight: 0,
        render() {
          return <MainMenuItem groups={groups} />;
        },
      }),
    })(config);
  };
}

interface PluginOptions {
  groups: { label: string; items: string[] }[];
}
