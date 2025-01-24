<template>
  <el-dialog
    v-model="showForm"
    width="400px"
    title="GENERATE REPORT"
    :close-on-click-modal="true"
  >
    <el-form
      label-width="100px"
      label-position="left"
      @submit.native.prevent="generateReport(form)"
    >
      <el-form-item label="Tanggal" :error="errors.date">
        <el-date-picker
          v-model="form.date"
          type="date"
          placeholder="Tanggal"
          format="DD-MMM-YYYY"
          value-format="YYYY-MM-DD"
          style="width: 100%"
        ></el-date-picker>
      </el-form-item>

      <el-form-item label="Shift" :error="errors.shift">
        <el-select v-model="form.shift" placeholder="Shift">
          <el-option
            v-for="(shift, i) in [...new Set(shifts.map((x) => x.name))].sort()"
            :value="shift"
            :label="shift"
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
        type="primary"
        :icon="ElIconSuccessFilled"
        @click="generateReport(form)"
      >
        GENERATE
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { form, errors, showForm, closeForm } from "~/store/form.store";
const { data: shifts, getAll } = useApi("/api/shifts");

onMounted(() => {
  getAll();
});

const generateReport = (data) => {
  closeForm();
  window.open(
    `/api/inspections/generatePdf?date=${data.date}&shift=${data.shift}&UserId=${data.UserId}`,
    "_blank"
  );
};
</script>
