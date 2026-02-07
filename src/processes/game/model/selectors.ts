import { useGameStore } from "./store";

export const useSession = () => useGameStore((state) => state.session);
export const useNotice = () => useGameStore((state) => state.notice);
export const useStoreOpen = () => useGameStore((state) => state.storeOpen);
