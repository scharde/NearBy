import { toast } from "react-toastify";
import axios from "axios";

axios.interceptors.response.use(undefined, (error) => {
  const expectedError = error.response && error.response.status >= 400 && error.response.status < 500;

  if (error.response.status === 401) {
    toast.error("Your session ended. Please login again");
  }
  if (!expectedError) {
    toast.error("An unexpected error occurrred.");
  }
  return Promise.reject(error);
});

function setJwt(jwt: string) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
