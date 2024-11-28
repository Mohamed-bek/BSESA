import { create } from "zustand";

// Store for user authentication
export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  login: (userData) => {
    set({ user: userData });
    localStorage.setItem("user", JSON.stringify(userData));
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}));

export const useMessageData = create((set) => ({
  message: "",
  icon: "",
  err: false,
  show: false,

  setMessage: (newMessage) => set(() => ({ message: newMessage })),
  setIcon: (newIcon) => set(() => ({ icon: newIcon })),
  setErr: (newErr) => set(() => ({ err: newErr })),
  setShow: (newShow) => set(() => ({ show: newShow })),
  setMessageData: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),
}));
