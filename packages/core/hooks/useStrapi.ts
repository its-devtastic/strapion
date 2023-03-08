import { create } from "zustand";
import * as R from "ramda";

import { SessionUser } from "../types/session";
import { ContentType } from "../types/contentType";
import { StrapiLocale } from "../types/locales";

import api from "../utils/api";
import useSession from "./useSession";

interface StrapiState {
  contentTypes: ContentType[];
  locales: StrapiLocale[];
  getContentTypes(): Promise<void>;
  getLocales(): Promise<void>;
  login(credentials: { email: string; password: string }): Promise<void>;
}

const initialState = {
  contentTypes: [],
  locales: [],
};

const useStrapi = create<StrapiState>()((set, get) => ({
  ...initialState,
  async getContentTypes() {
    const {
      data: { data },
    } = await api.get<{
      data: ContentType[];
    }>("/content-manager/content-types");

    set({
      contentTypes: data,
    });
  },
  async getLocales() {
    const { data } = await api.get<StrapiLocale[]>("/i18n/locales");

    set({
      locales: R.sortBy(R.propEq("isDefault", false), data),
    });
  },
  async login(credentials) {
    const {
      data: { data },
    } = await api.post<{
      data: { token: string; user: SessionUser };
    }>("/admin/login", credentials);
    useSession.setState({ token: data.token, user: data.user });
  },
}));

export default useStrapi;
