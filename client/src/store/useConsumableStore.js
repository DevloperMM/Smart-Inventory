import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useConsumableStore = create((set, get) => ({
  fetchingConsumables: false,
  consumableCats: [],
  consumables: [],
  loading: false,

  getConsumablesCats: async () => {
    try {
      const res = await axios.get("/consumable/cats");
      set({ consumableCats: res.data });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to get consumable categories"
      );
    }
  },

  getConsumables: async () => {
    set({ fetchingConsumables: true });
    try {
      const res = await axios.get("/admin/consumables");
      set({ consumables: res.data.apiData });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load consumables");
    } finally {
      set({ fetchingConsumables: false });
    }
  },

  editConsumable: async (id, specs) => {
    set({ loading: true });
    try {
      await axios.patch(`/admin/consumables/${id}`, { specs });
      await get().getConsumables();
      toast.success("Specifications updated");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update specs");
    } finally {
      set({ loading: false });
    }
  },

  updateQuantity: async (id, qty, isUsed, category) => {
    set({ loading: true });
    try {
      await axios.post(`/admin/consumables/${id}`, {
        qty,
        isUsed: isUsed === "true",
      });

      await get().getConsumables();

      toast.success(`Stock updated in ${category}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update stock");
    } finally {
      set({ loading: false });
    }
  },

  createNewConsumable: async (details) => {
    set({ loading: true });
    try {
      await axios.post("/admin/consumables", details);
      toast.success("New Consumable added");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update stock");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));
