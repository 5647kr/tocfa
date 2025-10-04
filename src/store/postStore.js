import { create } from "zustand";
import { CreatePost, DeletePost, ReadPost, UpdatePost } from "../api/Post";

const usePostStore = create((set) => ({
  commu_faq: [],

  createPost: async (data, tableName) => {
    const newPost = await CreatePost({ data, tableName });

    set((state) => {
      switch (tableName) {
        case "commu_faq":
          return { commu_faq: [newPost, ...state.commu_faq] };
        default:
          return state;
      }
    });
  },

  readPost: async (tableName) => {
    const data = await ReadPost(tableName);

    set((state) => {
      switch (tableName) {
        case "commu_faq":
          return { commu_faq: [...data] };
        default:
          return state;
      }
    });
  },

  updatePost: async (id, data, tableName) => {
    console.log(id, data, tableName);
    const updateData = await UpdatePost({ id, data, tableName });

    set((state) => {
      switch (tableName) {
        case "commu_faq":
          return {
            commu_faq: state.commu_faq.map((data) =>
              data.id === id ? updateData : data
            ),
          };
        default:
          return state;
      }
    });
  },

  deletePost: async (id, tableName) => {
    await DeletePost({ id, tableName });

    set((state) => {
      switch (tableName) {
        case "commu_faq":
          return {
            commu_faq: state.commu_faq.filter((post) => post.id !== id),
          };
        default:
          return state;
      }
    });
  },
}));

export default usePostStore;
