<template>
  <el-page-header @back="goBack" content="Station & Area">
    <template #extra>
      <el-button
        size="small"
        :icon="ElIconPlus"
        type="primary"
        @click="openForm({ Areas: [] })"
      >
        TAMBAH STATION
      </el-button>
    </template>
  </el-page-header>

  <br />

  <el-table stripe v-loading="loading" :data="data" class="border-t">
    <el-table-column
      label="Kode"
      prop="code"
      width="80"
      align="center"
      header-align="center"
    />
    <el-table-column label="Nama" prop="name" />
    <el-table-column label="Area">
      <template #default="{ row }">
        <ul>
          <li v-for="(area, i) in row.Areas" :key="area.id">
            {{ ++i }}. {{ area.name }}
          </li>
        </ul>
      </template>
    </el-table-column>

    <el-table-column
      width="60px"
      align="center"
      header-align="center"
      fixed="right"
    >
      <template #header>
        <el-button link @click="getAll()" :icon="ElIconRefresh"> </el-button>
      </template>
      <template #default="{ row }">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon>
              <ElIconMoreFilled />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :icon="ElIconEdit"
                @click.native.prevent="openForm(row)"
              >
                Edit
              </el-dropdown-item>
              <el-dropdown-item
                :icon="ElIconDelete"
                @click.native.prevent="remove(row.id)"
              >
                Delete
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
    </el-table-column>
  </el-table>

  <StationForm />
</template>

<script setup>
import { openForm } from "~/store/form.store";
const { getAll, remove, data, loading } = useApi("/api/stations");

onMounted(() => {
  getAll();
});
</script>
