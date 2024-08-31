<template>
  <el-page-header @back="goBack" content="Laporan">
    <template #extra>
      <el-button
        size="small"
        :icon="ElIconDownload"
        type="primary"
        @click="openForm()"
      >
        DOWNLOAD
      </el-button>
    </template>
  </el-page-header>

  <br />

  <el-table stripe v-loading="loading" :data="data" class="border-t">
    <el-table-column type="index" label="#"></el-table-column>
    <el-table-column label="Tanggal" prop="createdAt" />
    <el-table-column label="Shift" prop="shift" />
    <el-table-column label="Jam" prop="createdAt" />
    <el-table-column label="Station" prop="Station.name" />
    <el-table-column label="Petugas" prop="User.name" />
  </el-table>
</template>

<script setup>
import { openForm } from "~/store/form.store";
const { getAll, data, loading } = useApi("/api/inspections");

onMounted(() => {
  getAll();
});
</script>
