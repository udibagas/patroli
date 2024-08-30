export default defineNuxtRouteMiddleware((to, from) => {
  const token = useCookie("token").value;
  if (to.path == "/login" && !token) return true;
  if (to.path == "/login" && token) return navigateTo("/");
  if (token) return true; // authenticated
  return navigateTo("/login"); // unauthenticated
});
