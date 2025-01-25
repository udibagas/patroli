<template>
  <el-page-header @back="goBack" content="Captures">
    <template #extra>
      <el-button
        size="small"
        type="danger"
        :icon="Delete"
        @click="deleteSnapshot"
        :disabled="checkedNodes.length == 0"
        >HAPUS SNAPSHOT</el-button
      >
      <el-button :icon="Refresh" type="primary" size="small" @click="refresh">
        REFRESH
      </el-button>
    </template>
  </el-page-header>

  <div style="display: flex" class="mt-6">
    <div class="file-browser">
      <el-tree
        v-if="show"
        :props="props"
        :load="loadNode"
        ref="treeRef"
        lazy
        show-checkbox
        highlight-current
        node-key="path"
        @node-click="onNodeClick"
        @check="(node, tree) => (checkedNodes = tree.checkedNodes)"
      >
      </el-tree>
    </div>

    <div class="img-container">
      <img :src="imageURL" alt="" style="width: 500px" />
    </div>
  </div>
</template>

<script setup>
import { Delete, Refresh } from "@element-plus/icons-vue";

const { request } = useApi();
const imageURL = ref("");
const show = ref(true);
const checkedNodes = ref([]);
const props = ref({ label: "label", isLeaf: "isLeaf" });
const treeRef = ref("");

const loadNode = (node, resolve) => {
  const params = {
    directory: node.data == false ? "uploads" : node.data.path,
  };

  request("/api/captures", { params }).then((response) => {
    console.log(response);
    resolve(response);
  });
};

const deleteSnapshot = () => {
  ElMessageBox.confirm("Anda yakin?", "Konfirmasi", { type: "warning" })
    .then(() => {
      return request("/api/captures/delete", {
        method: "POST",
        body: {
          checkedNodes: checkedNodes.value,
        },
      });
    })
    .then((r) => {
      imageURL.value = "";
      ElMessage({ message: r.message, type: "success" });
      checkedNodes.value.forEach((node) => treeRef.value.remove(node));
      checkedNodes.value = [];
    })
    .catch((e) => console.log(e));
};

const onNodeClick = ({ isFile, url }) => {
  if (isFile) {
    imageURL.value = url;
  }
};

const refresh = () => {
  show.value = false;
  nextTick(() => (show.value = true));
};
</script>

<style scoped>
.file-browser {
  padding: 15px;
  border: 1px solid #ddd;
  width: 400px;
  height: calc(100vh - 150px);
  overflow: auto;
  flex-shrink: 0;
}

.img-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
