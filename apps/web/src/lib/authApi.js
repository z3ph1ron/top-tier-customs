import { api, setAccessToken } from "./http";

export async function signup({ email, password, firstName, lastName }) {
  const { data } = await api.post("/auth/signup", {
    email,
    password,
    firstName,
    lastName,
  });

  return data;
}

export async function login({ email, password }) {
  const { data } = await api.post("/auth/login", { email, password });

  setAccessToken(data.accessToken);

  return data;
}

export async function fetchMe() {
  const { data } = await api.get("/auth/me");

  return data;
}

export async function refresh() {
  const { data } = await api.post("/auth/refresh");

  setAccessToken(data.accessToken);

  return data;
}

export async function logout() {
  await api.post("/auth/logout");

  setAccessToken(null);
}
