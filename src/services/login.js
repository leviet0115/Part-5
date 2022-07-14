import axios from "axios";
const baseUrl = "/api/login";

const getToken = async (credential) => {
  const response = await axios.post(baseUrl, credential);
  return response.data;
};

export default { getToken };
