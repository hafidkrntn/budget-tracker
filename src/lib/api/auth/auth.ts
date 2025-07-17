import { api } from "../api";
import type { LoginPayload } from "./type";

async function login(payload: LoginPayload) {
  const resp = await api.post('auth/login', payload)
  return resp
}

export const authApi = {
  login
}