<template>
  <el-container>
    <el-header class="bg-[#07395A] flex items-center justify-between h-[60px]">
      <div class="text-white text-xl">
        Sistem Patroli PT. Ungaran Sari Garments
      </div>

      <div class="flex items-center gap-3">
        <el-dropdown>
          <el-avatar :size="30">{{ user?.name[0] }}</el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                :icon="ElIconUser"
                @click.native.prevent="showProfileForm = true"
              >
                Profil
              </el-dropdown-item>
              <el-dropdown-item
                :icon="ElIconArrowRight"
                @click.native.prevent="logout"
              >
                Logout
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <div class="text-white">
          {{ user?.name }}
        </div>
      </div>
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

  <ProfileForm :show="showProfileForm" @close="showProfileForm = false" />
</template>

<script setup>
import { user, getProfile } from "~/store/auth.store";
const { request } = useApi();
const showProfileForm = ref(false);

await getProfile();

const navigationList = [
  {
    path: "/",
    label: "Laporan",
    icon: ElIconDocumentCopy,
    visible: ["user", "admin", "superadmin"],
  },
  {
    path: "/sites",
    label: "Sites",
    icon: ElIconOfficeBuilding,
    visible: ["superadmin"],
  },
  {
    path: "/stations",
    label: "Station & Area",
    icon: ElIconLocation,
    visible: ["admin", "superadmin"],
  },
  {
    path: "/shifts",
    label: "Shift",
    icon: ElIconClock,
    visible: ["superadmin"],
  },
  {
    path: "/inspection-templates",
    label: "Template Inspeksi",
    icon: ElIconDocument,
    visible: ["admin", "superadmin"],
  },
  {
    path: "/users",
    label: "User",
    icon: ElIconUser,
    visible: ["admin", "superadmin"],
  },
  {
    path: "/captures",
    label: "Captures",
    icon: ElIconCamera,
    visible: ["superadmin"],
  },
].filter((n) => n.visible.includes(user.value.role));

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
