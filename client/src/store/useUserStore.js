import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios.js";

export const useUserStore = create((set) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/users/auth/login", { email, password });
      set({ user: res.data.apiData });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message || "Failed to login");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      const res = await axios.post("/users/auth/logout");
      set({ user: null });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message || "Failed logging out");
    }
  },

  changePass: async (oldPassword, newPassword) => {
    try {
      const res = await axios.patch("/users/auth/change-password", {
        oldPassword,
        newPassword,
      });
      toast.success(res.data.message);
    } catch (err) {
      toast.error(err.response.data.message || "Failed logging out");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const res = await axios.get("/users/auth/profile");
      set({ user: res.data.apiData });
    } catch (err) {
      set({ user: null });
    } finally {
      set({ checkingAuth: false });
    }
  },
}));
