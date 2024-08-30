<template>
  <el-dialog
    v-model="showForm"
    width="500px"
    :title="!!form.id ? 'EDIT AREA' : 'TAMBAH AREA'"
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

      <el-form-item label="Station" :error="errors.StationId">
        <el-select v-model="form.StationId" placeholder="Station">
          <el-option
            v-for="station in stations"
            :value="station.id"
            :label="`${station.code} - ${station.name}`"
            :key="station.id"
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
const { request, create, update } = useApi("/api/areas");

const { data: stations } = useQuery({
  queryKey: ["stations"],
  queryFn: () => request("/api/stations"),
});
</script>
