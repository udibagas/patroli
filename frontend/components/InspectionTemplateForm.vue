<template>
  <el-dialog
    v-model="showForm"
    width="500px"
    :title="!!form.id ? 'EDIT TEMPLATE INSPEKSI' : 'TAMBAH TEMPLATE INSPEKSI'"
    :close-on-click-modal="false"
  >
    <el-form
      label-width="100px"
      label-position="left"
      @submit.native.prevent="form.id ? update(form.id, form) : create(form)"
    >
      <el-form-item label="Hasil" :error="errors.result">
        <el-input placeholder="Hasil" v-model="form.result"></el-input>
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
const { create, update } = useApi("/api/inspection-templates");
</script>
