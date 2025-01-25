<template>
  <el-page-header @back="goBack" content="User">
    <template #extra>
      <el-button
        size="small"
        :icon="ElIconPlus"
        type="primary"
        @click="openForm()"
      >
        TAMBAH USER
      </el-button>
    </template>
  </el-page-header>

  <br />

  <el-table stripe v-loading="loading" :data="data" class="border-t">
    <el-table-column type="index" label="#"></el-table-column>
    <el-table-column label="Username" prop="name" />
    <el-table-column
      label="Site"
      prop="Site.name"
      v-if="user.role === 'superadmin'"
    />
    <el-table-column label="Role" prop="role" />

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

  <UserForm />
</template>

<script setup>
import { openForm } from "~/store/form.store";
import { user } from "~/store/auth.store";
const { getAll, remove, data, loading } = useApi("/api/users");

onMounted(() => {
  getAll();
});
</script>
