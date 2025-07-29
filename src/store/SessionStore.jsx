import { create } from "zustand";

const sessionStore = create(() => ({
  session: JSON.parse(
    localStorage.getItem("sb-gbsjttwoeqeidstgcgcv-auth-token")
  ),
}));

export default sessionStore;