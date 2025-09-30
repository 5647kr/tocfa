import { create } from "zustand";
import Menu from "../api/Menu";

const useMenuStore = create((set) => ({
  menus: [],
  getMenu: async () => {
    const data = await Menu();
    // return data
    return set({ menus: data });
  },
}));

export default useMenuStore;
