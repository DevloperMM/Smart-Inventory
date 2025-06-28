import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useTransitStore = create((set, get) => ({
  fetchingTransits: false,
  transits: [],

  loading: false,

  getTransits: async () => {
    set({ fetchingTransits: false });
    try {
      const res = await axios.get("/admin/transits");
      set({ transits: res.data.apiData });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load transits");
    } finally {
      set({ fetchingTransits: false });
    }
  },

  createTransit: async (transitData) => {
    set({ loading: true });
    try {
      await axios.post("/admin/transits", transitData);
      toast.success("Transit request created");
      get().getTransits();
      return { success: true };
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to create transit request"
      );
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  decideTransit: async (transitId, status, decisionReason) => {
    set({ loading: true });
    try {
      await axios.patch(`/admin/transits/decide/${transitId}`, {
        status,
        decisionReason,
      });
      toast.success("Transit decided");
      get().getTransits();
      return { success: true };
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to decide transit request"
      );
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  validateTransit: async (transitId, status, validateInfo) => {
    set({ loading: true });
    try {
      await axios.patch(`/admin/transits/validate/${transitId}`, {
        status,
        validateInfo,
      });
      toast.success("Transit validated");
      get().getTransits();
      return { success: true };
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to validate transit request"
      );
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));
