"use client";

import { createReviewAction } from "@/actions/create-review-action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <section className="">
      <form action={formAction} className="flex flex-col gap-4">
        <input name="movieId" value={movieId} hidden />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용을 입력하세요"
          className="bg-gray-800 text-gray-100 border border-gray-600 w-full h-[8rem] p-[1rem] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
        />
        <div className="flex justify-between items-center">
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
            className="bg-gray-800 text-gray-100 border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-1/2"
          />
          <button
            disabled={isPending}
            type="submit"
            className="bg-indigo-500 text-white px-[1.5rem] py-[1rem] rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
