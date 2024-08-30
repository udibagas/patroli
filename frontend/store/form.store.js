export const form = ref({});
export const showForm = ref(false);
export const errors = ref({});

export function openForm(data = {}) {
  form.value = JSON.parse(JSON.stringify(data));
  showForm.value = true;
}

export function closeForm() {
  showForm.value = false;
  form.value = {};
  errors.value = {};
}
