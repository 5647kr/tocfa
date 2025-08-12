import { create } from "zustand";
import { ReadApi, DeleteApi } from "../api/PostApi";

const usePostStore = create((set, get) => ({
  typeSelect: "notice",
  notice: [],
  laws: [],
  category: [],

  setTypeSelect: (typeSelect) => set({ typeSelect: typeSelect }),

  // 조회
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

  deleteTable: async (id) => {
    const { typeSelect } = get();

    set((state) => {
      if (typeSelect === "notice") {
        return {
          notice: state.notice.filter((v) => v.id !== id),
        };
      } else if (typeSelect === "laws") {
        return {
          laws: state.laws.filter((v) => v.id !== id),
        };
      } else {
        return {
          category: state.category.filter((v) => v.id !== id),
        };
      }
    });
    await DeleteApi({ id, typeSelect });
  },
}));

export default usePostStore;
