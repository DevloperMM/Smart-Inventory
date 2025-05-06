import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,
  isUserLoading: false,

  login: async (data) => {
    try {
      const res = await axios.post();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
}));
