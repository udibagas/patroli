<template>
  <div class="login-container">
    <el-card class="login-card">
      <h1 class="text-2xl">USG PATROLI</h1>
      <el-form @submit.native.prevent="login" style="width: 300px">
        <el-divider>
          <h3>LOGIN</h3>
        </el-divider>

        <el-form-item>
          <el-input
            v-model="name"
            placeholder="Username"
            :prefix-icon="ElIconUser"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="password"
            placeholder="Password"
            :prefix-icon="ElIconLock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" style="width: 100%">
            LOGIN
          </el-button>
        </el-form-item>

        <el-divider>&copy; {{ year }}</el-divider>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { setUser } from "../store/auth.store";
definePageMeta({ layout: "login" });
const name = ref();
const password = ref();
const year = new Date().getFullYear();
const { request } = useApi();

const login = async () => {
  if (!name.value || !password.value) return;

  request("/api/login", {
    method: "POST",
    body: { name: name.value, password: password.value },
  }).then((res) => {
    setUser(res.user);
    return navigateTo("/");
  });
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  padding: 20px;
  width: 400px;
}
</style>
