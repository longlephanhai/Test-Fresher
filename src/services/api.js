import axios from "../utils/axios.customize"

export const handleRegister = async (data) => {
  return axios.post('/api/v1/user/register', data)
}