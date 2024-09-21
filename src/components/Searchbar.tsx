"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Searchbar() {
  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  const router = useRouter();

  const [search, setSearch] = useState<string>("");

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (!search || q === search) {
      return;
    }
    router.push(`/search?q=${search}`);
  };

  useEffect(() => {
    setSearch(q || "");
  }, [q]);
  return (
    <div>
      <form onSubmit={submitHandler} className="flex gap-2 mb-5">
        <input
          value={search}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요..."
          className="flex-1 p-4 rounded-md border border-gray-500 bg-transparent"
        />
        <button className="w-20 rounded-md bg-gray-700 text-white cursor-pointer">
          검색
        </button>
      </form>
    </div>
  );
}
