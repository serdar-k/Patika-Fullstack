/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { loadAuthState, storeAuthState } from "./localStore";
import { setToken } from "../lib/http";

export const AuthContext = createContext();

export const AuthDispatchContext = createContext();

export const SearchContext = createContext();

export function useAuthState() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

export function useSearchState() {
  return useContext(SearchContext);
}

const authReducer = (authState, action) => {
  switch (action.type) {
    case "login-success":
      storeAuthState(action.payload.userResponse);
      return { ...authState, login: action.payload.userResponse };
    case "logout-success":
      setToken(); // ! LOGOUT DURUMUNDA SETTOKEN FONKSIYONU PARAMETRESIZ CAGIRILARAK TOKEN TEMIZLENMIS OLUR
      storeAuthState();
      return { ...authState, login: {} };
    default:
      throw new Error("Unknown action!");
  }
};

const searchReducer = (searchState, action) => {
  switch (action.type) {
    case "search-success":
      return { ...searchState, searchResult: action.payload };
    default:
      throw new Error("Unknown action!");
  }
};

export function AuthenticationContext({ children }) {
  const [authState, dispatch] = useReducer(authReducer, loadAuthState());
  const [searchState, searchDispatch] = useReducer(searchReducer, {});

  useEffect(() => {
    storeAuthState(authState);
  }, [authState]);

  return (
    <AuthContext.Provider value={authState}>
      <AuthDispatchContext.Provider value={dispatch}>
        <SearchContext.Provider value={{ searchState, searchDispatch }}>
          {children}
        </SearchContext.Provider>
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
