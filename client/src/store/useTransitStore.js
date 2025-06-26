import { create } from "zustand";

export const useTransitStore = create((set, get) => ({
  fetchingTransits: false,
  transits: [],

  getTransits: async () => {},

  createTransit: async () => {},

  decideTransit: async () => {},
}));
