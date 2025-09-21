import axios from "axios";

// Support either env name; use whichever you set in .env.local
const token =
  import.meta.env.VITE_APP_GITHUB_API_KEY ||
  import.meta.env.VITE_GITHUB_TOKEN ||
  "";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

/**
 * Fetch a single GitHub user's profile by username.
 * @param {string} username
 * @returns {Promise<Object>} GitHub user object
 */
export async function fetchUserData(username) {
  if (!username) throw new Error("Username is required");
  const { data } = await api.get(`/users/${encodeURIComponent(username)}`); // https://api.github.com/users/{username}
  return data;
}
