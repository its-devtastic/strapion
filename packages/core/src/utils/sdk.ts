import axios, { AxiosInstance } from "axios";
import * as R from "ramda";

import { ContentType } from "../types/contentType";
import { StrapiLocale } from "../types/locales";
import { SessionUser } from "../types/session";

export class StrapiSdk {
  public apiUrl: string;
  public http: AxiosInstance;
  public contentTypes: ContentType[] = [];
  public authenticated: boolean = false;
  constructor(apiUrl: string) {
    this.apiUrl = apiUrl;
    this.http = axios.create({ baseURL: apiUrl });
  }
  public setAuthorization(token: string | null) {
    if (token) {
      this.http.defaults.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete this.http.defaults.headers["Authorization"];
    }
    this.authenticated = Boolean(token);
  }
  public async getContentTypes() {
    const {
      data: { data },
    } = await this.http.get<{
      data: ContentType[];
    }>("/content-manager/content-types");

    this.contentTypes = data;

    return data;
  }
  public async getLocales() {
    const { data } = await this.http.get<StrapiLocale[]>("/i18n/locales");

    return data;
  }
  public async login(credentials: any) {
    const {
      data: { data },
    } = await this.http.post<{
      data: { token: string; user: SessionUser };
    }>("/admin/login", credentials);

    return data;
  }

  public async getOne<T>(apiID: string, id: number) {
    const contentType = this.contentTypes.find(R.whereEq({ apiID }));

    if (!contentType) {
      throw new Error(`No content type with apiID ${apiID}`);
    }

    const { data } = await this.http.get<T>(
      `/content-manager/${
        contentType.kind === "singleType" ? "single-types" : "collection-types"
      }/${contentType.uid}/${id}`
    );

    return data;
  }

  public async getMany<T>(apiID: string, params?: GetManyParams) {
    const contentType = this.contentTypes.find(R.whereEq({ apiID }));

    if (!contentType) {
      throw new Error(`No content type with apiID ${apiID}`);
    }

    const { data } = await this.http.get(
      `/content-manager/${
        contentType.kind === "singleType" ? "single-types" : "collection-types"
      }/${contentType.uid}`,
      { params }
    );

    return data;
  }
}

interface GetManyParams {
  page?: number;
  pageSize?: number;
  sort?: `${string}:ASC` | `${string}:DESC`;
  _q?: string;
  locale?: string;
}
