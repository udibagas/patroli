import { errors, closeForm } from "~/store/form.store";
const config = useRuntimeConfig();
const loading = ref(false);
const data = ref([]);
const objData = ref({});

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
    loading.value = true;
    request(url, { params })
      .then((res) => {
        if (Array.isArray(res)) {
          data.value = res;
        } else {
          objData.value = res;
        }
      })
      .finally(() => {
        loading.value = false;
      });
  }

  function getOne(id) {
    return request(`${url}/${id}`);
  }

  function create(body) {
    request(url, { method: "POST", body })
      .then(() => {
        closeForm();
        getAll();
      })
      .catch((error) => {
        if (error.response.status == 400) {
          errors.value = error.response._data.errors;
        }
      });
  }

  function update(id, body) {
    request(`${url}/${id}`, { method: "PUT", body })
      .then(() => {
        closeForm();
        getAll();
      })
      .catch((error) => {
        if (error.response.status == 400) {
          errors.value = error.response._data.errors;
        }
      });
  }

  async function remove(id) {
    try {
      await ElMessageBox.confirm(
        "Anda yakin akan menghapus data ini?",
        "Perhatian",
        {
          cancelButtonText: "BATAL",
          center: true,
          type: "warning",
        }
      );

      request(`${url}/${id}`, { method: "DELETE" }).then(() => {
        getAll();
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    getAll,
    getOne,
    create,
    update,
    remove,
    request,
    loading,
    data,
    objData,
  };
};
