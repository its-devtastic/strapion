import axios from "axios";
import * as R from "ramda";

import useSession from "../hooks/useSession";
import useStrapion from "../hooks/useStrapion";

const api = axios.create();

api.interceptors.request.use((config) => {
  const token = useSession.getState().token;

  config.baseURL = useStrapion.getState().config.strapiUrl;

  return R.unless(
    () => R.isNil(token),
    R.assocPath(["headers", "Authorization"], `Bearer ${token}`),
    config
  );
}, R.identity);

export default api;
