import toast from "react-hot-toast";
import { create } from "zustand";
import axios from "../lib/axios";

export const useRequestStore = create((set, get) => ({
  fetchingRequests: false,
  requests: [],
  myRequests: [],

  loading: false,
  request: null,

  setRequest: async (request) => set({ request }),

  getAllRequests: async () => {
    set({ fetchingRequests: true });
    try {
      const res = await axios.get("/admin/requests");
      set({ requests: res.data.apiData });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch all requests"
      );
    } finally {
      set({ fetchingRequests: false });
    }
  },

  getMyRequests: async () => {
    set({ fetchingRequests: true });
    try {
      const res = await axios.get("/users/requests");
      set({ myRequests: res.data.apiData });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch your requests"
      );
    } finally {
      set({ fetchingRequests: false });
    }
  },

  createNewRequest: async (requestDetails) => {
    set({ loading: true });
    try {
      await axios.post("/users/requests", requestDetails);
      toast.success("Request forwarded to store");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create request");
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  decideAssetRequest: async (requestId, status, comments) => {
    set({ loading: true });
    try {
      await axios.patch(`/admin/requests/a/${requestId}`, {
        status,
        decisionInfo: comments,
      });
      get().getAllRequests();
      toast.success(`Request ${status.toLowerCase()}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to decide request");
    } finally {
      set({ loading: false });
    }
  },

  decideConsumableRequest: async (requestId, status, comments) => {
    set({ loading: true });
    try {
      await axios.patch(`/admin/requests/c/${requestId}`, {
        status,
        decisionInfo: comments,
      });
      get().getAllRequests();
      toast.success(`Request ${status.toLowerCase()}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to decide request");
    } finally {
      set({ loading: false });
    }
  },

  cancelRequest: async (requestId) => {
    set({ loading: true });
    try {
      await axios.patch(`/users/requests/${requestId}`);
      toast.success(`Request cancelled`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel request");
    } finally {
      set({ loading: false });
    }
  },
}));
