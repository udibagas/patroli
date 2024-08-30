<template>
  <el-dialog
    v-model="showForm"
    width="500px"
    :title="!!form.id ? 'EDIT USER' : 'TAMBAH USER'"
    :close-on-click-modal="false"
  >
    <el-form label-width="160px" label-position="left">
      <el-form-item label="Name" :error="errors.name">
        <el-input placeholder="Name" v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="Email" :error="errors.email">
        <el-input placeholder="Email" v-model="form.email"></el-input>
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
          <el-option
            v-for="(role, i) in ['user', 'admin']"
            :value="role"
            :label="role"
            :key="i"
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
        type="success"
        :icon="ElIconSuccessFilled"
        @click="
          form.id ? update(form.id, form, callback) : create(form, callback)
        "
      >
        SIMPAN
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { form, errors, showForm, closeForm } from "~/store/form.store";
const { create, update } = useApi("/api/users");
const { callback } = defineProps(["callback"]);
</script>
