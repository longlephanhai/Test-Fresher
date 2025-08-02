import axios from "../utils/axios.customize"

export const handleRegister = async (data) => {
  return axios.post('/api/v1/user/register', data)
}
export const handleLogin = async (data) => {
  return axios.post('/api/v1/auth/login', data)
}

export const handleFetchAccount = async () => {
  return axios.get("/api/v1/auth/account")
}