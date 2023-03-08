import { create } from "zustand";
import * as R from "ramda";
import { useStrapi, api } from "@strapion/core";

interface ContentDetailManagerState {
  data: null | Record<string, any>;
  fetch(apiID: string, id: number): Promise<void>;
}

const initialState = {
  data: null,
};

const useContentDetailManager = create<ContentDetailManagerState>()(
  (set, get) => ({
    ...initialState,
    async fetch(apiID: string, id: number) {
      const { contentTypes } = useStrapi.getState();
      const contentType = contentTypes.find(R.whereEq({ apiID }));

      if (!contentType) {
        throw new Error(`No content type with apiID ${apiID}`);
      }

      const { data } = await api.get(
        `/content-manager/${
          contentType.kind === "singleType"
            ? "single-types"
            : "collection-types"
        }/${contentType.uid}/${id}`
      );

      set({ data });
    },
  })
);

export default useContentDetailManager;
