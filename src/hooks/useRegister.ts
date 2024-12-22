import { create } from "zustand";

type RegisterFormStore = {
  username: string;
  email: string;
  password: string;
  setUsername: (value: string) => void;
  setEmail: (value: string) => void;
  setPassword: (value: string) => void;
  resetForm: () => void;
};

const useRegisterFormStore = create<RegisterFormStore>((set) => ({
  username: "",
  email: "",
  password: "",

  setUsername: (value: string) => set({ username: value }),
  setEmail: (value: string) => set({ email: value }),
  setPassword: (value: string) => set({ password: value }),

  resetForm: () =>
    set({
      username: "",
      email: "",
      password: "",
    }),
}));

export default useRegisterFormStore;
