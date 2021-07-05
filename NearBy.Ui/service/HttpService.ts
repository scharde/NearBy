import axios from "axios";

axios.interceptors.response.use(undefined, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (error.response.status === 401) {
    // toast.error("Your session ended. Please login again");
    console.log("Your session ended. Please login again");
  }
  if (!expectedError) {
    // toast.error("An unexpected error occurred.");
    console.log("An unexpected error occurred.");
  }
  return Promise.reject(error.response);
});

function setJwt(jwt: string | null) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
