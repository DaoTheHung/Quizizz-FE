import { create } from 'zustand'
import CallApi from './slices/CallApi'
export const useStore = create((set, get) => ({
    isText: 0,
    changeText: () => set((state) => ({ isText: !state.isText })),
   ...CallApi(set, get),
}))