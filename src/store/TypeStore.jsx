import { create } from "zustand";
import CategoryApi from "../api/CategoryApi";

const useTypeStore = create((set, get) => ({
  userType: "admin",
  menuList: [],

  setUserType: (userType) => set({ userType: userType }),

  getMenu: async () => {
    const { userType } = get();

    const data = await CategoryApi(userType);
    set({ menuList: data });
  },
}));

export default useTypeStore;
