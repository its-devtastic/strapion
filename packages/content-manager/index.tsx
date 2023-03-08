import React from "react";
import * as R from "ramda";

import {
  InjectionZone,
  InjectionZoneEntry,
  StrapionConfig,
} from "@strapion/core/types/config";

import MainMenuItem from "./ui/MainMenuItem";
import ListScreen from "./pages/ListScreen";
import DetailScreen from "./pages/DetailScreen";

export default function contentManagerPlugin(
  { groups }: PluginOptions = { groups: [] }
) {
  return (config: StrapionConfig): StrapionConfig => {
    return R.evolve({
      pages: R.mergeLeft({
        "/content-manager/:apiID": ListScreen,
        "/content-manager/:apiID/:id": DetailScreen,
      }),
      zones: R.append<InjectionZoneEntry>({
        zone: InjectionZone.MainMenuTop,
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
