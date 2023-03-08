import React from "react";
import { ThemeConfig } from "antd";

import { ContentTypeConfig } from "./contentTypeConfig";
import { StrapionPlugin } from "./plugin";

export interface StrapionConfig {
  icon?: string;
  zones: InjectionZoneEntry[];
  contentTypes: ContentTypeConfig[];
  pages: Record<string, React.FC<{ params: Record<string, string> }>>;
  theme: ThemeConfig;
  plugins: StrapionPlugin[];
}

export interface InjectionZoneEntry {
  zone: InjectionZone;
  // Determines the order in case of multiple components.
  weight: number;
  render(): React.ReactNode;
}

export enum InjectionZone {
  MainMenuTop = "mainMenu::top",
  MainMenuBottom = "mainMenu::bottom",
}
