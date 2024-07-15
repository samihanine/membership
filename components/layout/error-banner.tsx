"use client";

import clsx from "clsx";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
export default function ErrorBanner() {
  const params = useSearchParams();

  const error = params.get("error");
  const closeBanner = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("error");
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div
      className={clsx(
        "w-full py-4 fixed bottom-0 flex items-center justify-center bg-red-400 text-white text-base font-medium px-20",
        {
          hidden: !error,
        },
      )}
    >
      <div className="flex-1">{error}</div>
      <div>
        <button onClick={closeBanner} className="p-2">
          <XMarkIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
