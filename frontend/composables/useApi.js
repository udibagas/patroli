const config = useRuntimeConfig();
import { errors, closeForm } from "~/store/form.store";

export default (url) => {
  const request = $fetch.create({
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

  function getAll(params = {}) {
    return request(url, { params });
  }

  function getOne(id) {
    return request(`${url}/${id}`);
  }

  function create(body, callback) {
    request(url, { method: "POST", body })
      .then(() => {
        closeForm();
        if (typeof callback == "function") {
          callback();
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
          errors.value = error.response._data.errors;
        }
      });
  }

  function update(id, body, callback) {
    request(`${url}/${id}`, { method: "PUT", body })
      .then(() => {
        closeForm();
        if (typeof callback == "function") {
          callback();
        }
      })
      .catch((error) => {
        if (error.response.status == 400) {
          errors.value = error.response._data.errors;
        }
      });
  }

  async function remove(id, callback) {
    try {
      await ElMessageBox.confirm(
        "Anda yakin akan menghapus data ini?",
        "Perhatian",
        { cancelButtonText: "BATAL", center: true }
      );

      request(`${url}/${id}`, { method: "DELETE" }).then(() => {
        if (typeof callback == "function") {
          callback();
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return { request, getAll, getOne, create, update, remove };
};
