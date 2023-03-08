import axios from "axios";
import * as R from "ramda";

import useSession from "../hooks/useSession";

const api = axios.create({ baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL });

api.interceptors.request.use((config) => {
  const token = useSession.getState().token;

  return R.unless(
    () => R.isNil(token),
    R.assocPath(["headers", "Authorization"], `Bearer ${token}`),
    config
  );
}, R.identity);

export default api;
