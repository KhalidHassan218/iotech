import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export default function RootLayout({ children }: Props) {
  return children;
}
