import { create } from "zustand";

import { StrapionConfig } from "../types/config";

interface StrapionState {
  config: StrapionConfig;
  setStrapionConfig(config: StrapionConfig): void;
}

const useStrapion = create<StrapionState>()((set) => ({
  config: {} as StrapionConfig,
  setStrapionConfig(config: StrapionConfig) {
    set({ config });
  },
}));

export default useStrapion;
