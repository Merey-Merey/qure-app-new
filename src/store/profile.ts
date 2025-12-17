import { create } from 'zustand';

type Profile = {
  name: string;
  city: string;
  phone: string;
  gender?: 'male' | 'female';
  birthDate?: Date | null;
  avatarFile?: File | null; 
  bonuses: number;
  favoritesCount: number;
  ordersCount: number;
};

type ProfileState = {
  profile: Profile | null;
  
  setFromPhone: (phone: string) => void;
  setFullProfile: (data: Partial<Profile>) => void;
  setFavoritesCount: (count: number) => void;
  incrementOrdersCount: () => void;
  logout: () => void;
};

const defaultProfile: Profile = {
  name: '',
  city: '',
  phone: '',
  bonuses: 0,
  favoritesCount: 0,
  ordersCount: 0,
};

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  
  setFromPhone: (phone: string) =>
    set({
      profile: { ...defaultProfile, phone },
    }),
    
  setFullProfile: (data: Partial<Profile>) =>
    set((state) => ({
      profile: state.profile 
        ? { ...state.profile, ...data }
        : { ...defaultProfile, ...data },
    })),
    
  setFavoritesCount: (count: number) =>
    set((state) => ({
      profile: state.profile 
        ? { ...state.profile, favoritesCount: count }
        : null,
    })),
    
  incrementOrdersCount: () =>
    set((state) => ({
      profile: state.profile 
        ? { ...state.profile, ordersCount: state.profile.ordersCount + 1 }
        : null,
    })),
    
  logout: () => set({ profile: null }),
}));
