import axios, { AxiosInstance } from "axios";

import { ContentType } from "../types/contentType";
import { StrapiLocale } from "../types/locales";
import { SessionUser } from "../types/session";

export class StrapiSdk {
  public apiUrl: string;
  public http: AxiosInstance;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.http = axios.create({ baseURL: apiUrl });
  }
  public setAuthorization(token: string) {
    this.http.defaults.headers["Authorization"] = `Bearer ${token}`;
  }
  async getContentTypes() {
    const {
      data: { data },
    } = await this.http.get<{
      data: ContentType[];
    }>("/content-manager/content-types");

    return data;
  }
  async getLocales() {
    const { data } = await this.http.get<StrapiLocale[]>("/i18n/locales");

    return data;
  }
  async login(credentials: any) {
    const {
      data: { data },
    } = await this.http.post<{
      data: { token: string; user: SessionUser };
    }>("/admin/login", credentials);

    return data;
  }
}
