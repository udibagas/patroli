<template>
  <el-container>
    <el-header class="bg-[#07395A] flex items-center justify-between h-[60px]">
      <div class="text-white text-xl">
        Sistem Patroli PT. Ungaran Sari Garment
      </div>

      <el-dropdown>
        <el-avatar :icon="ElIconUser"></el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item :icon="ElIconUser">Profil</el-dropdown-item>
            <el-dropdown-item
              :icon="ElIconArrowRight"
              @click.native.prevent="logout"
            >
              Logout
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-header>

    <el-container>
      <el-aside style="width: 200px">
        <el-menu
          style="height: calc(100vh - 60px)"
          router
          :default-active="$route.path"
          background-color="transparent"
          active-text-color="#07395A"
        >
          <el-menu-item
            v-for="(m, i) in navigationList"
            :index="m.path"
            :key="i"
          >
            <el-icon>
              <component :is="m.icon"></component>
            </el-icon>
            <span slot="title">{{ m.label }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main><slot /></el-main>
    </el-container>
  </el-container>
</template>

<script setup>
const { request } = useApi();

const navigationList = [
  {
    path: "/",
    label: "Laporan",
    icon: ElIconDocumentCopy,
  },
  {
    path: "/stations",
    label: "Station",
    icon: ElIconLocation,
  },
  {
    path: "/areas",
    label: "Area",
    icon: ElIconMenu,
  },
  {
    path: "/shifts",
    label: "Shift",
    icon: ElIconClock,
  },
  {
    path: "/inspection-templates",
    label: "Template Inspeksi",
    icon: ElIconDocument,
  },
  {
    path: "/users",
    label: "User",
    icon: ElIconUser,
  },
];

async function logout() {
  try {
    await ElMessageBox.confirm("Anda yakin akan keluar?", "Peringatan", {
      center: true,
      cancelButtonText: "BATAL",
      type: "warning",
    });

    await request("/api/logout", { method: "post" });
    await navigateTo("/login");
  } catch (error) {
    console.log(error);
  }
}
</script>
