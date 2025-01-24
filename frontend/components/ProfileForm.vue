<template>
  <el-dialog
    :model-value="show"
    width="350px"
    title="PROFIL"
    :close-on-click-modal="false"
    :before-close="() => emit('close')"
  >
    <el-form label-position="top" @submit.native.prevent="save">
      <el-form-item label="Name" :error="errors.name">
        <el-input placeholder="Name" v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="Password" :error="errors.password">
        <el-input
          type="password"
          placeholder="Password"
          v-model="form.password"
        ></el-input>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button :icon="ElIconCircleCloseFilled" @click="emit('close')">
        BATAL
      </el-button>
      <el-button type="primary" :icon="ElIconSuccessFilled" @click="save">
        SIMPAN
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { user, setUser } from "../store/auth.store";
const { request } = useApi();
const { show } = defineProps(["show"]);
const emit = defineEmits(["close"]);
const errors = {};
const form = ref(user);

function save() {
  request(`/api/users/${form.value.id}`, {
    method: "PUT",
    body: form.value,
  }).then((res) => {
    setUser(res);
    ElMessage({
      message: "Data telah diupdate",
      type: "success",
      showClose: true,
    });
  });
}
</script>
