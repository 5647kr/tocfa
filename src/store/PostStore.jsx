import { create } from "zustand";
import { CreateApi, ReadApi, UpdateApi, DeleteApi } from "../api/PostApi";
import CategoryApi from "../api/CategoryApi";

const usePostStore = create((set, get) => ({
  typeSelect: "notice",
  notice: [],
  laws: [],
  category: [],

  setTypeSelect: (typeSelect) => set({ typeSelect: typeSelect }),

  // 카테고리
  categoryTable: async () => {
    const data = await CategoryApi("user");
    set({ category: data });
  },

  // 작성
  createTable: async (data) => {
    const { typeSelect } = get();

    const newPost = await CreateApi({ data, typeSelect });

    set((state) => {
      switch (typeSelect) {
        case "notice":
          return { notice: [newPost, ...state.notice] };
        case "laws":
          return { laws: [newPost, ...state.laws] };
        case "category":
          return { category: [newPost, ...state.category] };
        default:
          return;
      }
    });
  },

  // 조회
  readTable: async () => {
    const { typeSelect } = get();

    const data = await ReadApi(typeSelect);

    switch (typeSelect) {
      case "notice":
        return set({ notice: [...data] });
      case "laws":
        return set({ laws: [...data] });
      case "category":
        return set({ category: [...data] });
      default:
        return;
    }
  },

  // 수정
  updateTable: async (data) => {
    const { typeSelect } = get();

    const updateTable = await UpdateApi({ data, typeSelect });
    set((state) => {
      switch (typeSelect) {
        case "notice":
          return {
            ...state,
            notice: state.notice.map((table) =>
              table.id === data.id ? updateTable : table
            ),
          };
        case "laws":
          return {
            ...state,
            laws: state.laws.map((table) =>
              table.id === data.id ? updateTable : table
            ),
          };
        case "category":
          return {
            ...state,
            category: state.category.map((table) =>
              table.id === data.id ? updateTable : table
            ),
          };
        default:
          return;
      }
    });
  },

  // 삭제
  deleteTable: async (id) => {
    const { typeSelect } = get();

    set((state) => {
      switch (typeSelect) {
        case "notice":
          return {
            notice: state.notice.filter((v) => v.id !== id),
          };
        case "laws":
          return {
            laws: state.laws.filter((v) => v.id !== id),
          };
        case "category":
          return {
            category: state.category.filter((v) => v.id !== id),
          };
        default:
          return;
      }
    });
    await DeleteApi({ id, typeSelect });
  },
}));

export default usePostStore;
