import { create } from "zustand";
import { CreateApi, ReadApi, UpdateApi, DeleteApi } from "../api/PostApi";

const usePostStore = create((set, get) => ({
  typeSelected: "notice",
  notice: [],
  laws: [],

  // typeSelected 변경 함수
  setType: (type) => set({ typeSelected: type }),

  // 글 작성
  createPost: async (data) => {
    const { typeSelected } = get();

    const newPost = await CreateApi({ data, typeSelected });

    set((state) =>
      typeSelected === "notice"
        ? { notice: [newPost, ...state.notice] }
        : { laws: [newPost, ...state.laws] }
    );
  },

  // 글 조회
  readPost: async () => {
    const { typeSelected } = get();

    const data = await ReadApi(typeSelected);

    typeSelected === "notice" ? set({ notice: data }) : set({ laws: data });
  },

  // 글 수정
  updatePost: async (id, data) => {
    const { typeSelected } = get();

    const updatePost = await UpdateApi({ id, data, typeSelected });

    set((state) =>
      typeSelected === "notice"
        ? {
          ...state,
            notice: state.notice.map((post) =>
              post.id === id ? updatePost : post
            ),
          }
        : {
            ...state,
            laws: state.laws.map((post) =>
              post.id === id ? updatePost : post
            ),
          }
    );
  },

  // 글 삭제
  deletePost: async (id) => {
    const { typeSelected } = get();

    set((state) =>
      typeSelected === "notice"
        ? { notice: state.notice.filter((v) => v.id !== id) }
        : { laws: state.laws.filter((v) => v.id !== id) }
    );

    await DeleteApi({ id, typeSelected });
  },
}));

export default usePostStore;
