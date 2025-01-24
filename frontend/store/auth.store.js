const { request } = useApi();

export const user = ref();

export function setUser(value) {
  user.value = value;
}

export async function getProfile() {
  const res = await request("/api/me");
  return setUser(res);
}
