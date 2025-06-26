import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios.js";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  users: [],
  loadingUsers: false,

  login: async (email, password) => {
    set({ loading: true });
    try {
      const res = await axios.post("/users/auth/login", { email, password });
      set({ user: res.data.apiData });
    } catch (err) {
      toast.error(err.response.data.message || "Failed to login");
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("/users/auth/logout");
      set({ user: null });
      toast.success("You logged out");
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

  getAllUsers: async () => {
    set({ loadingUsers: true });
    try {
      const res = await axios.get("/admin/users");
      set({ users: res.data.apiData });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
      set({ loadingUsers: false });
    }
  },

  updateUser: async (userId, updateDetails) => {
    set({ loading: true });
    try {
      await axios.patch(`/admin/users/${userId}`, updateDetails);
      toast.success("User details updated");
      await get().getAllUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
      set({ loading: false });
    }
  },

  createUser: async (userDetails) => {
    set({ loading: true });
    try {
      await axios.post(`/admin/users`, userDetails);
      toast.success("New User registered");
      await get().getAllUsers();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load users");
    } finally {
      set({ loading: false });
    }
  },
}));
