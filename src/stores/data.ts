import create from "zustand";

interface ProfileStore {
  name: string;
  birthday: string;
  height: number;
  weight: number;
  gender: string;
  image: string | null;
  horoscope: string;
  zodiac: string;
  interests: string[];
  setGender: (gender: string) => void;
  setName: (name: string) => void;
  setBirthday: (birthday: string) => void;
  setHeight: (height: number) => void;
  setWeight: (weight: number) => void;
  setImage: (image: string | null) => void;
  setHoroscope: (horoscope: string) => void;
  setZodiac: (zodiac: string) => void;
  setInterests: (interests: string[]) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  name: "",
  birthday: "",
  height: 0,
  weight: 0,
  gender: "",
  image: null,
  horoscope: "--",
  zodiac: "--",
  interests: [],
  setGender: (gender) => set({ gender }),
  setName: (name: any) => set({ name }),
  setBirthday: (birthday: any) => set({ birthday }),
  setHeight: (height: any) => set({ height }),
  setWeight: (weight: any) => set({ weight }),
  setImage: (image) => set({ image }),
  setHoroscope: (horoscope) => set({ horoscope }),
  setZodiac: (zodiac) => set({ zodiac }),
  setInterests: (interests) => set({ interests }),
}));
