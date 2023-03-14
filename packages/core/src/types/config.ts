import React from "react";
import { ThemeConfig } from "antd";
import { RouteObject } from "react-router-dom";

import { ContentTypeConfig } from "./contentTypeConfig";
import { StrapionPlugin } from "./plugin";

export interface StrapionConfig {
  strapiUrl: string;
  icon?: string;
  zones: InjectionZoneEntry[];
  contentTypes: ContentTypeConfig[];
  routes: RouteObject[];
  theme: Partial<ThemeConfig>;
  i18n: Record<string, Record<"translation", Record<string, string>>>;
  plugins: StrapionPlugin[];
}

export type StrapionConfigWithOptionals = Pick<StrapionConfig, "strapiUrl"> &
  Partial<Omit<StrapionConfig, "strapiUrl">>;

export interface InjectionZoneEntry {
  zone: InjectionZone;
  // Determines the order in case of multiple components.
  weight: number;
  render(): React.ReactNode;
}

export enum InjectionZone {
  MainMenuTop = "mainMenu::top",
  MainMenuBottom = "mainMenu::bottom",
  AppHeaderLeft = "appHeadeer::left",
  AppHeaderRight = "appHeadeer::center",
  AppHeaderCenter = "appHeadeer::right",
}
