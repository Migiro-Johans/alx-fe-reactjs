import axios from "axios";

const token =
  import.meta.env.VITE_APP_GITHUB_API_KEY ||
  import.meta.env.VITE_GITHUB_TOKEN ||
  "";

const api = axios.create({
  baseURL: "https://api.github.com",
  headers: token ? { Authorization: `Bearer ${token}` } : {},
});

// === Existing: single user fetch (keep if you already have it) ===
export async function fetchUserData(username) {
  if (!username) throw new Error("Username is required");
  const { data } = await api.get(`/users/${encodeURIComponent(username)}`);
  return data;
}

/**
 * Advanced user search using GitHub Search API.
 * Accepts username (matches login), location, minRepos, pagination.
 * Returns { users: Array<EnrichedUser>, totalCount: number }
 * Note: search/users doesn't include location or repo count, so we enrich by fetching each user's details.
 */
export async function searchUsers({
  username = "",
  location = "",
  minRepos = "",
  page = 1,
  perPage = 10,
}) {
  // Build GitHub search query
  const parts = [];
  if (username.trim()) parts.push(`${username.trim()} in:login`);
  if (location.trim()) parts.push(`location:${location.trim()}`);
  if (minRepos) parts.push(`repos:>=${Number(minRepos) || 0}`);
  const q = parts.join(" ").trim() || "type:user"; // fallback

  const { data } = await api.get("/search/users", {
    params: {
      q,
      page,
      per_page: perPage,
    },
  });

  const logins = (data.items || []).map((u) => u.login);

  // Enrich with detail fetches to get location, public_repos, etc.
  const detailPromises = logins.map((login) => api.get(`/users/${login}`).then((r) => r.data).catch(() => null));
  const details = await Promise.all(detailPromises);

  const users = details
    .filter(Boolean)
    .map((d) => ({
      id: d.id,
      login: d.login,
      name: d.name || d.login,
      avatar_url: d.avatar_url,
      html_url: d.html_url,
      location: d.location || "—",
      public_repos: d.public_repos ?? 0,
      followers: d.followers ?? 0,
      bio: d.bio || "",
    }));

  return {
    users,
    totalCount: data.total_count ?? 0,
  };
}
