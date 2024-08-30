<template>
  <h1 class="text-2xl">USG PATROLI</h1>
  <el-form @submit.native.prevent="login" style="width: 300px">
    <el-divider>
      <h3>LOGIN</h3>
    </el-divider>

    <el-form-item>
      <el-input
        v-model="email"
        placeholder="Email/Username"
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
</template>

<script setup>
import { setUser } from "../store/auth.store";
definePageMeta({ layout: "login" });
const email = ref();
const password = ref();
const year = new Date().getFullYear();
const { request } = useApi();

const login = async () => {
  if (!email.value || !password.value) return;

  request("/api/login", {
    method: "POST",
    body: { email: email.value, password: password.value },
  }).then((res) => {
    setUser(res.user);
    return navigateTo("/");
  });
};
</script>
