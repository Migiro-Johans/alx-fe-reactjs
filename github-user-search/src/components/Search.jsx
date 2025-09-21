import { useEffect, useMemo, useState } from "react";
import { searchUsers } from "../services/githubService";

export default function Search() {
  // form state
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");

  // results state
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  // ui state
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // pagination state
  const [page, setPage] = useState(1);
  const perPage = 10;

  const hasMore = useMemo(() => users.length < totalCount, [users.length, totalCount]);

  const doSearch = async ({ reset = true } = {}) => {
    setLoading(true);
    setErrorMsg("");

    try {
      const { users: found, totalCount: total } = await searchUsers({
        username,
        location,
        minRepos,
        page: reset ? 1 : page,
        perPage,
      });

      if (reset) {
        setUsers(found);
        setPage(1);
      } else {
        setUsers((prev) => [...prev, ...found]);
      }
      setTotalCount(total);

      if (found.length === 0 && (reset || users.length === 0)) {
        setErrorMsg("Looks like we cant find the user");
      }
    } catch (e) {
      setErrorMsg("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // Start fresh on new query
    setPage(1);
    doSearch({ reset: true });
  };

  const loadMore = async () => {
    if (!hasMore || loading) return;
    const next = page + 1;
    setPage(next);
    setLoading(true);
    try {
      const { users: more } = await searchUsers({
        username,
        location,
        minRepos,
        page: next,
        perPage,
      });
      setUsers((prev) => [...prev, ...more]);
    } catch {
      setErrorMsg("Looks like we cant find the user");
    } finally {
      setLoading(false);
    }
  };

  // Optional: perform an initial search (e.g., show popular qualifiers)
  useEffect(() => {
    // no auto-search by default; uncomment to demo:
    // doSearch({ reset: true });
  }, []);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Form */}
      <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-end bg-white/70 dark:bg-gray-900/30 p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800">
        <div className="sm:col-span-2">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Username (in login)
          </label>
          <input
            id="username"
            className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. torvalds"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Location
          </label>
          <input
            id="location"
            className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. Nairobi"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Min Repos
          </label>
          <input
            id="minRepos"
            type="number"
            min={0}
            className="mt-1 w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="e.g. 10"
            value={minRepos}
            onChange={(e) => setMinRepos(e.target.value)}
          />
        </div>

        <div className="sm:col-span-2 lg:col-span-4 flex gap-2">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setUsername("");
              setLocation("");
              setMinRepos("");
              setUsers([]);
              setTotalCount(0);
              setErrorMsg("");
              setPage(1);
            }}
            className="rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            Reset
          </button>
          {loading && <span className="text-sm text-gray-500 self-center">Loading...</span>}
        </div>
      </form>

      {/* Feedback */}
      {!loading && errorMsg && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">{errorMsg}</p>
      )}

      {/* Results */}
      {!loading && users.length > 0 && (
        <div className="mt-6">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold">Results</h2>
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{users.length}</span> of{" "}
              <span className="font-medium">{totalCount}</span>
            </p>
          </div>

          <ul className="mt-3 grid gap-3">
            {users.map((u) => (
              <li
                key={u.id}
                className="flex items-center gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/40"
              >
                <img
                  src={u.avatar_url}
                  alt={u.login}
                  width={64}
                  height={64}
                  className="rounded-full shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <a
                      href={u.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-indigo-600 hover:underline truncate"
                      title={u.name}
                    >
                      {u.name}
                    </a>
                    <span className="text-gray-500">@{u.login}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    <span className="mr-3">📍 {u.location || "—"}</span>
                    <span className="mr-3">📦 Repos: {u.public_repos}</span>
                    <span>👥 Followers: {u.followers}</span>
                  </div>
                  {u.bio && (
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">{u.bio}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {hasMore && (
            <div className="mt-4">
              <button
                onClick={loadMore}
                disabled={loading}
                className="w-full rounded-xl border border-gray-300 dark:border-gray-700 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-60"
              >
                {loading ? "Loading..." : "Load more"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
