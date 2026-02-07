import { loadSession } from "./load-session";

export const hasSession = (): boolean => Boolean(loadSession());
