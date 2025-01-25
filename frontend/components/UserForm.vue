<template>
  <el-dialog
    v-model="showForm"
    width="500px"
    :title="!!form.id ? 'EDIT USER' : 'TAMBAH USER'"
    :close-on-click-modal="false"
  >
    <el-form
      label-width="150px"
      label-position="left"
      @submit.native.prevent="form.id ? update(form.id, form) : create(form)"
    >
      <el-form-item label="Username" :error="errors.name">
        <el-input placeholder="Username" v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="Password" :error="errors.password">
        <el-input
          type="password"
          placeholder="Password"
          v-model="form.password"
        ></el-input>
      </el-form-item>

      <el-form-item label="Role" :error="errors.role">
        <el-select v-model="form.role" placeholder="Role">
          <el-option value="user" label="user"> </el-option>
          <el-option
            v-if="['admin', 'superadmin'].includes(user.role)"
            value="admin"
            label="admin"
          >
          </el-option>
          <el-option
            v-if="user.role == 'superadmin'"
            value="superadmin"
            label="superadmin"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="Site"
        :error="errors.SiteId"
        v-if="user.role === 'superadmin'"
      >
        <el-select v-model="form.SiteId" placeholder="Site">
          <el-option
            v-for="site in sites"
            :value="site.id"
            :label="site.name"
            :key="site.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button :icon="ElIconCircleCloseFilled" @click="closeForm">
        BATAL
      </el-button>
      <el-button
        type="primary"
        :icon="ElIconSuccessFilled"
        @click="form.id ? update(form.id, form) : create(form)"
      >
        SIMPAN
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { form, errors, showForm, closeForm } from "~/store/form.store";
import { user } from "~/store/auth.store";
const { create, update, request } = useApi("/api/users");
const sites = ref([]);

onMounted(() => {
  request("/api/sites").then((data) => {
    sites.value = data;
  });
});
</script>
