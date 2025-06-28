import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useTransferStore = create((set, get) => ({
  loading: false,
  transfers: [],
  fetchingTransfers: false,

  getTransfers: async () => {
    set({ fetchingTransfers: false });
    try {
      const res = await axios.get("/admin/transfers");
      set({ transfers: res.data.apiData });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load transfers");
    } finally {
      set({ fetchingTransfers: false });
    }
  },

  createTransfer: async (transitId, assets, consumables) => {
    set({ loading: true });
    try {
      await axios.post("/admin/transfers", { transitId, assets, consumables });
      toast.success("Transfer created");
      get().getTransfers();
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create transfer");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  receiveTransfer: async (transitId, transferId) => {
    set({ loading: true });
    try {
      await axios.patch(
        `/admin/transfers/receive/${transferId}?transitId=${transitId}`
      );
      toast.success("Transfer received");
      get().getTransfers();
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create transfer");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));
