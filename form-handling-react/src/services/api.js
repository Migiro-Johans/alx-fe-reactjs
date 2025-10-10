// src/services/api.js
export async function registerUser(payload) {
  // Using a mock endpoint from ReqRes for demo:
  const res = await fetch("https://reqres.in/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    // ReqRes returns errors like: { error: "Missing password" }
    const message = data?.error || "Registration failed";
    throw new Error(message);
  }
  return data; // { id, token } on success
}
