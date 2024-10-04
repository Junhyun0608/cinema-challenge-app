"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, []);

  return createPortal(
    <>
      <div
        className=" fixed inset-0 bg-black bg-opacity-70 transition-opacity"
        onClick={() => router.back()}
      />
      <dialog
        ref={dialogRef}
        onClose={() => router.back()}
        onClick={(e) => {
          if ((e.target as any).nodeName === "DIALOG") {
            router.back();
          }
        }}
        className="w-[80%] max-w-[700px] bg-gray-900 mt-5 rounded border-none text-white"
      >
        <div className="p-6 z-">{children}</div>
      </dialog>
    </>,
    document.getElementById("modal-root") as HTMLElement
  );
}
