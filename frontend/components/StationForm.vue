<template>
  <el-dialog
    v-model="showForm"
    width="500px"
    :title="!!form.id ? 'EDIT STATION' : 'TAMBAH STATION'"
    :close-on-click-modal="false"
  >
    <el-form
      label-width="100px"
      label-position="left"
      @submit.native.prevent="form.id ? update(form.id, form) : create(form)"
    >
      <el-form-item label="Site" :error="errors.role">
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

      <el-form-item label="Kode" :error="errors.code">
        <el-input placeholder="Kode" v-model="form.code"></el-input>
      </el-form-item>

      <el-form-item label="Nama" :error="errors.name">
        <el-input placeholder="Nama" v-model="form.name"></el-input>
      </el-form-item>
    </el-form>

    <el-table :data="form.Areas" class="border-t">
      <el-table-column label="#" type="index" />
      <el-table-column label="Area">
        <template #default="{ row }">
          <el-input v-model="row.name" placeholder="Area"></el-input>
        </template>
      </el-table-column>
      <el-table-column width="60px" align="center" header-align="center">
        <template #header>
          <el-button
            link
            type="primary"
            :icon="ElIconPlus"
            @click="form.Areas.push({ name: '' })"
          ></el-button>
        </template>

        <template #default="{ row, $index }">
          <el-button
            link
            type="danger"
            :icon="ElIconDelete"
            @click="removeArea(row.id, $index)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

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
const { create, update, request } = useApi("/api/stations");
const sites = ref([]);

onMounted(() => {
  request("/api/sites").then((data) => {
    sites.value = data;
  });
});

async function removeArea(id, index) {
  if (id) {
    try {
      await ElMessageBox.confirm(
        "Anda yakin akan menghapus area ini?",
        "Perhatian",
        {
          type: "warning",
          cancelButtonText: "BATAL",
          center: true,
        }
      );
      await request(`/api/areas/${id}`, { method: "DELETE" });
    } catch (error) {
      console.log(error);
    }
  }

  form.value.Areas.splice(index, 1);
}
</script>
