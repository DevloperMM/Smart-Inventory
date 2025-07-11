import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useAssetStore = create((set, get) => ({
  fetchingAssets: false,
  assetCats: [],
  assets: [],

  isFetchingAsset: false,
  asset: {},

  loadUnissuedAssets: false,
  unissuedAssets: [],

  loading: false,

  allAssetIssuances: [],
  assetIssuances: [],
  issuanceAgainstMe: [],
  fetchingIssuances: false,

  getAssetsCats: async () => {
    try {
      const res = await axios.get("/asset/cats");
      set({ assetCats: res.data });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to get consumable categories"
      );
    }
  },

  getAssets: async () => {
    set({ fetchingAssets: true });
    try {
      const res = await axios.get("/admin/assets");
      set({ assets: res.data.apiData });
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load assets");
    } finally {
      set({ fetchingAssets: false });
    }
  },

  getAssetById: async (assetId) => {
    set({ isFetchingAsset: true });
    try {
      const res = await axios.get(`/admin/assets/${assetId}`);
      set({ asset: res.data.apiData });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch asset details"
      );
    } finally {
      set({ isFetchingAsset: false });
    }
  },

  createNewAsset: async (assetDetails) => {
    set({ loading: true });
    try {
      await axios.post("/admin/assets", assetDetails);
      toast.success("Asset added to stock");
      return { success: true };
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to add asset in store"
      );
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  updateAsset: async (assetId, updateDetails) => {
    set({ loading: true });
    try {
      await axios.put(`/admin/assets/${assetId}`, updateDetails);
      toast.success("Asset details updated");
      return { success: true };
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update asset details"
      );
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },

  toggleAMC: async (assetId) => {
    try {
      const res = await axios.patch(`/admin/assets/${assetId}`);

      const inAMC = res.data.apiData.flaggedAMC;
      toast.success(inAMC ? "Asset marked for AMC" : "Asset unmarked from AMC");

      set({ asset: { ...get().asset, status: inAMC ? "amc" : "available" } });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to mark/unmark asset for AMC",
        { id: "error" }
      );
    }
  },

  getAssetByEquipNo: async (equipNo) => {
    try {
      const res = await axios.get(`/admin/assets/filter/${equipNo}`);
      return res.data.apiData;
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch asset details"
      );
    }
  },

  getAssetIssuances: async () => {
    set({ fetchingIssuances: true });
    try {
      const res = await axios.get(`/admin/issuances/assets`);
      set({ allAssetIssuances: res.data.apiData });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch all asset issuances"
      );
    } finally {
      set({ fetchingIssuances: false });
    }
  },

  getIssuancesById: async (assetId) => {
    set({ fetchingIssuances: true });
    try {
      const res = await axios.get(`/admin/issuances/assets/a/${assetId}`);
      set({ assetIssuances: res.data.apiData });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch asset issuances"
      );
    } finally {
      set({ fetchingIssuances: false });
    }
  },

  getIssuancesAgainstMe: async () => {
    set({ fetchingIssuances: true });
    try {
      const res = await axios.get("/users/issuances/assets");
      set({ issuanceAgainstMe: res.data.apiData });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch asset issuances"
      );
    } finally {
      set({ fetchingIssuances: false });
    }
  },

  getUnissuedAssets: async (equipNo, category) => {
    set({ loadUnissuedAssets: true });
    try {
      const res = await axios.post(`admin/issuances/assets/filter/${equipNo}`, {
        category,
      });
      set({ unissuedAssets: res.data.apiData });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to get unissued assets"
      );
    } finally {
      set({ loadUnissuedAssets: false });
    }
  },

  issueAsset: async (requestId, assetId, equipNo) => {
    set({ loading: true });
    try {
      await axios.post("/admin/issuances/assets", {
        requestId,
        assetId,
        equipNo,
      });
      toast.success("Asset issued for request");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to issue asset");
    } finally {
      set({ loading: false });
    }
  },

  disposeAsset: async () => {},
}));
