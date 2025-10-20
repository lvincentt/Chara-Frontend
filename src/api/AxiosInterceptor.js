import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
});

const refreshApi = axios.create({
  baseURL: `${API_BASE_URL}/api/`,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Kalau bukan error response dari server (misalnya server mati)
    if (!error.response) {
      console.error("Tidak ada respons dari server:", error);
      return Promise.reject(error);
    }

    const status = error.response.status;
    const isAuthError = status === 401 || status === 403;

    if (
      isAuthError &&
      !originalRequest._retry &&
      originalRequest.headers["Authorization"]
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refresh");

      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await refreshApi.post("users/refresh/", {
          refresh: refreshToken,
        });

        const { access: newAccess, refresh: newRefresh } = res.data;

        localStorage.setItem("access", newAccess);
        if (newRefresh) {
          localStorage.setItem("refresh", newRefresh);
        }

        processQueue(null, newAccess);
        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
