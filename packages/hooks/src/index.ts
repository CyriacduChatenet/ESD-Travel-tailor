import { useFetchHook } from "./fetch";
import { useIsAuthenticatedHook } from "./auth";

export const useFetch = useFetchHook;
export const useIsAuthenticated = useIsAuthenticatedHook;