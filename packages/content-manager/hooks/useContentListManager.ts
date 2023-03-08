import { create } from "zustand";
import * as R from "ramda";
import { PaginatedResponse, Pagination } from "@strapion/core/types/response";
import { api, useStrapi } from "@strapion/core";

interface ContentListManagerState {
  items: any[];
  pagination: null | Pagination;
  filters: Record<string, unknown>;
  sort: `${string}:ASC` | `${string}:DESC` | null;
  fetch(apiID: string): Promise<void>;
  setFilters(filters: ContentListManagerState["filters"]): void;
  setSort(sort: ContentListManagerState["sort"]): void;
  setPage(page: number): void;
}

const initialState = {
  items: [],
  pagination: null,
  filters: {},
  sort: null,
};

const useContentListManager = create<ContentListManagerState>()((set, get) => ({
  ...initialState,
  async fetch(apiID: string) {
    const { contentTypes } = useStrapi.getState();
    const contentType = contentTypes.find(R.whereEq({ apiID }));

    if (!contentType) {
      throw new Error(`No content type with apiID ${apiID}`);
    }
    const { filters, pagination, sort } = get();

    const { data } = await api.get<PaginatedResponse<any>>(
      `/content-manager/${
        contentType.kind === "singleType" ? "single-types" : "collection-types"
      }/${contentType.uid}`,
      {
        params: {
          ...filters,
          pageSize: 10,
          page: pagination?.page,
          sort,
        },
      }
    );

    set({
      items: data.results,
      pagination: data.pagination,
    });
  },
  setFilters(filters) {
    set({ filters });
  },
  setSort(sort) {
    set({ sort });
  },
  setPage(page) {
    R.assocPath(["pagination", "page"], page);
  },
}));

export default useContentListManager;
