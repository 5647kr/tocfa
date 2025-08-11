import { create } from "zustand";
import { ReadApi } from "../api/PostApi";


const usePostStore = create((set, get) => ({
  typeSelect: "notice",
  notice: [],
  laws: [],
  category: [],
  
  setTypeSelect: (typeSelect) => set({ typeSelect: typeSelect }),
  
  
  readTable: async () => {
    const { typeSelect } = get();

    const data = await ReadApi(typeSelect);

    if (typeSelect === "notice") {
      set({ notice: data });
    } else if (typeSelect === "laws") {
      set({ laws: data });
    } else {
      set({ category: data });
    }
  },
}));

export default usePostStore;
