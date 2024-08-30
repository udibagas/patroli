const config = useRuntimeConfig();

export default () => {
  return $fetch.create({
    baseURL: config.public.apiBase,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    onRequest: ({ options }) => {
      options.headers.Authorization = "Bearer " + useCookie("token").value;
    },
    onResponseError: (error) => {
      ElMessage({
        message: error.response._data.message,
        type: "error",
        showClose: true,
      });
    },
  });
};
