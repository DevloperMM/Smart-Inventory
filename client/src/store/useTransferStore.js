import { create } from "zustand";

export const useTransferStore = create((set, get) => ({
  loading: false,
}));
