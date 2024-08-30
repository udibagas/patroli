<template>
  <el-dialog
    v-model="showForm"
    width="500px"
    :title="!!form.id ? 'EDIT SHIFT' : 'TAMBAH SHIFT'"
    :close-on-click-modal="false"
  >
    <el-form
      label-width="100px"
      label-position="left"
      @submit.native.prevent="form.id ? update(form.id, form) : create(form)"
    >
      <el-form-item label="Nama" :error="errors.name">
        <el-input placeholder="Nama" v-model="form.name"></el-input>
      </el-form-item>

      <el-form-item label="Mulai" :error="errors.start">
        <el-time-select
          v-model="form.start"
          start="00:00"
          step="01:00"
          end="24:00"
          placeholder="Mulai"
        />
      </el-form-item>

      <el-form-item label="Selesai" :error="errors.end">
        <el-time-select
          v-model="form.end"
          start="00:00"
          step="00:01"
          end="23:59"
          placeholder="Selesai"
        />
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
const { create, update } = useApi("/api/shifts");
</script>
