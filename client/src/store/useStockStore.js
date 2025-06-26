import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useStockStore = create((set, get) => ({
  stockLoading: false,
  storeData: [],

  getStockData: async () => {
    set({ stockLoading: true });
    try {
      const res = await axios.get("/admin/stock");
      set({ storeData: res.data.apiData });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load store data");
    } finally {
      set({ stockLoading: false });
    }
  },

  modifyAlert: async (storeId, newQty) => {
    try {
      await axios.patch(`/admin/stock/${storeId}`, {
        alertCount: newQty,
      });

      await get().getStockData();

      toast.success("Alert set successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update alert");
    }
  },
}));
