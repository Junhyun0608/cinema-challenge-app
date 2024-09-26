import Searchbar from "@/components/Searchbar";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>로딩중...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
