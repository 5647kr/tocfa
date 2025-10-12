import { create } from "zustand";
import { CreatePost, DeletePost, ReadPost, UpdatePost } from "../api/Post";

const usePostStore = create((set, get) => ({
  product_product: [],
  store_store: [],
  commu_faq: [],

  // ================== CREATE ==================
  createPost: async (data, tableName) => {
    const tempId = Date.now();
    const optimisticPost = { id: tempId, ...data };

    set((state) => {
      switch (tableName) {
        case "product_product":
          return {
            product_product: [optimisticPost, ...state.product_product],
          };
        case "commu_faq":
          return { commu_faq: [optimisticPost, ...state.commu_faq] };
        case "store_store":
          return { store_store: [optimisticPost, ...state.store_store] };
        default:
          return state;
      }
    });

    try {
      const newPost = await CreatePost({ data, tableName });

      set((state) => {
        switch (tableName) {
          case "product_product":
            return {
              product_product: state.product_product.map((p) =>
                p.id === tempId ? newPost : p
              ),
            };
          case "commu_faq":
            return {
              commu_faq: state.commu_faq.map((p) =>
                p.id === tempId ? newPost : p
              ),
            };
          case "store_store":
            return {
              store_store: state.store_store.map((p) =>
                p.id === tempId ? newPost : p
              ),
            };
          default:
            return state;
        }
      });
    } catch (err) {
      set((state) => {
        switch (tableName) {
          case "product_product":
            return {
              product_product: state.product_product.filter(
                (p) => p.id !== tempId
              ),
            };
          case "commu_faq":
            return {
              commu_faq: state.commu_faq.filter((p) => p.id !== tempId),
            };
          case "store_store":
            return {
              store_store: state.store_store.filter((p) => p.id !== tempId),
            };
          default:
            return state;
        }
      });
      console.error("생성 실패:", err);
    }
  },

  updatePost: async (id, data, tableName) => {
    const prevState = get()[tableName];
    set((state) => {
      switch (tableName) {
        case "product_product":
          return {
            product_product: state.product_product.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
          };
        case "commu_faq":
          return {
            commu_faq: state.commu_faq.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
          };
        case "store_store":
          return {
            store_store: state.store_store.map((p) =>
              p.id === id ? { ...p, ...data } : p
            ),
          };
        default:
          return state;
      }
    });

    try {
      await UpdatePost({ id, data, tableName });
    } catch (err) {
      set({ [tableName]: prevState });
      console.error("업데이트 실패:", err);
    }
  },

  deletePost: async (id, tableName) => {
    const prevState = get()[tableName];
    set((state) => {
      switch (tableName) {
        case "product_product":
          return {
            product_product: state.product_product.filter((p) => p.id !== id),
          };
        case "commu_faq":
          return { commu_faq: state.commu_faq.filter((p) => p.id !== id) };
        case "store_store":
          return { store_store: state.store_store.filter((p) => p.id !== id) };
        default:
          return state;
      }
    });

    try {
      await DeletePost({ id, tableName });
    } catch (err) {
      // 실패 시 롤백
      set({ [tableName]: prevState });
      console.error("삭제 실패:", err);
    }
  },

  readPost: async (tableName) => {
    try {
      const data = await ReadPost(tableName);
      set({ [tableName]: data });
    } catch (err) {
      console.error("조회 실패:", err);
    }
  },
}));

export default usePostStore;
