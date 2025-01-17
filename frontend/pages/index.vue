<template>
  <el-page-header @back="goBack" content="Laporan">
    <template #extra>
      <el-button
        size="small"
        :icon="ElIconDocument"
        type="primary"
        @click="openForm()"
      >
        GENERATE REPORT
      </el-button>

      <el-button
        size="small"
        :icon="ElIconRefresh"
        type="primary"
        @click="refresh"
      >
        REFRESH
      </el-button>
    </template>
  </el-page-header>

  <br />

  <el-table
    stripe
    v-loading="loading"
    :data="objData.rows"
    class="border-t"
    v-on:row-click="handleRowClick"
  >
    <el-table-column
      type="index"
      label="#"
      :index="objData.from"
    ></el-table-column>

    <el-table-column label="Tanggal" width="120px">
      <template #default="{ row }">
        {{ moment(row.reportDate).format("DD-MMM-YYYY") }}
      </template>
    </el-table-column>

    <el-table-column label="Shift" prop="shift" width="120px" />

    <el-table-column label="Waktu" width="170px">
      <template #default="{ row }">
        {{ moment(row.createdAt).format("DD-MMM-YYYY HH:mm") }}
      </template>
    </el-table-column>

    <el-table-column label="Petugas" prop="User.name" width="120px" />

    <el-table-column label="Station" prop="Station.name" />
  </el-table>

  <br />

  <el-pagination
    v-if="objData.total"
    @size-change="handleSizeChange"
    background
    size="small"
    @current-change="handleCurrentChange"
    :current-page="currentPage"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next"
    :total="objData.total"
  />

  <el-dialog v-model="dialogVisible" title="Record Details">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="Tanggal">
        {{ moment(selectedRecord.createdAt).format("DD-MMM-YYYY") }}
      </el-descriptions-item>

      <el-descriptions-item label="Shift">
        {{ selectedRecord.shift }}
      </el-descriptions-item>

      <el-descriptions-item label="Jam">
        {{ moment(selectedRecord.createdAt).format("HH:mm") }}
      </el-descriptions-item>

      <el-descriptions-item label="Station">
        {{ selectedRecord.Station.name }}
      </el-descriptions-item>

      <el-descriptions-item label="Area">
        <ul>
          <li
            v-for="(r, i) in selectedRecord.Station.Areas.map((x) => x.name)"
            :key="i"
          >
            {{ i + 1 }}. {{ r }}
          </li>
        </ul>
      </el-descriptions-item>

      <el-descriptions-item label="Petugas">
        {{ selectedRecord.User.name }}
      </el-descriptions-item>

      <el-descriptions-item label="Keterangan">
        <ul>
          <li v-for="(r, i) in selectedRecord.result.split(',')" :key="i">
            - {{ r }}
          </li>
        </ul>
      </el-descriptions-item>

      <el-descriptions-item label="Foto Lokasi">
        <el-image
          v-if="selectedRecord.InspectionImages.length"
          style="width: 100px; height: 100px"
          :src="`/${selectedRecord.InspectionImages[0].path}`"
          :zoom-rate="1.2"
          :max-scale="7"
          :min-scale="0.2"
          :preview-src-list="
            selectedRecord.InspectionImages.map((x) => `/${x.path}`)
          "
          :initial-index="0"
          fit="cover"
        />
      </el-descriptions-item>
    </el-descriptions>
  </el-dialog>

  <ReportForm />
</template>

<script setup>
import moment from "moment";
import { openForm } from "~/store/form.store";
const { getAll, objData, loading } = useApi("/api/inspections");

const dialogVisible = ref(false);
const selectedRecord = ref({});
const pageSize = ref(10);
const currentPage = ref(1);

onMounted(() => {
  getAll({ page: 1, limit: pageSize.value });
});

function handleRowClick(row) {
  console.log(row);
  selectedRecord.value = row;
  dialogVisible.value = true;
}

function handleSizeChange(size) {
  pageSize.value = size;
  getAll({ page: 1, limit: size });
}

function handleCurrentChange(page) {
  currentPage.value = page;
  getAll({ page, limit: pageSize.value });
}

function refresh() {
  currentPage.value = 1;
  getAll({ page: 1, limit: pageSize.value });
}
</script>
