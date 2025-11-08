"use client";

import { Provider } from "react-redux";

import { store } from "./store";

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
