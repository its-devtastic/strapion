import { StrapionConfig } from "~/types/config";

export interface StrapionPlugin {
  (config: StrapionConfig): StrapionConfig;
}
