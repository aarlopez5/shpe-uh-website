import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function loginUser(email, password) {
  const params = new URLSearchParams();
  params.append("username", email);
  params.append("password", password);
  return api.post("/login", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

export function signupUser(data) {
  return api.post("/signup", data);
}

export function getMe(token) {
  return api.get("/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
}

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function getUpcomingEvents(days = 7) {
  return api.get(`/events/upcoming?days=${days}`, { headers: authHeaders() });
}

export function getCommittees() {
  return api.get("/committees", { headers: authHeaders() });
}

export function joinCommittee(committeeId) {
  return api.post(`/committees/${committeeId}/join`, {}, { headers: authHeaders() });
}

export function leaveCommittee(committeeId) {
  return api.delete(`/committees/${committeeId}/leave`, { headers: authHeaders() });
}
