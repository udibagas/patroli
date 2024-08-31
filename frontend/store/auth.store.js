const { request } = useApi();

export const user = ref();

export function setUser(value) {
  user.value = value;
}

export function getProfile() {
  request("/api/me").then((res) => setUser(res));
}
