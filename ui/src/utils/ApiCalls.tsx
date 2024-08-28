import axios from "axios";

const DEFAULT_URL = "http://localhost:8000/api/";

export async function get(url: string, token: string) {
  if (token) {
    return await axios.get(DEFAULT_URL + url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return await axios.get(DEFAULT_URL + url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function post(url: string, data: string, token?: string) {
  if (token) {
    return await axios.post(DEFAULT_URL + url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } else {
    return await axios.post(DEFAULT_URL + url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function getSelfInfo(token: string, id: string | undefined) {
  return await axios.get(DEFAULT_URL + `users/${id}/`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
