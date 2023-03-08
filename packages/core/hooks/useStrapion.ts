import { create } from "zustand";

import { StrapionConfig } from "../types/config";

interface StrapionState {
  config: StrapionConfig | null;
  setStrapionConfig(config: StrapionConfig): void;
}

const useStrapion = create<StrapionState>()((set) => ({
  config: null,
  setStrapionConfig(config: StrapionConfig) {
    set({ config });
  },
}));

export default useStrapion;
