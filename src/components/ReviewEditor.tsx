import { createReviewAction } from "@/actions/create-review-action";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section className="">
      <form action={createReviewAction} className="flex flex-col gap-4">
        <input name="movieId" value={movieId} hidden />
        <textarea
          required
          name="content"
          placeholder="리뷰 내용을 입력하세요"
          className="bg-gray-800 text-gray-100 border border-gray-600 w-full h-[8rem] p-[1rem] rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-y"
        />
        <div className="flex justify-between items-center">
          <input
            required
            name="author"
            placeholder="작성자"
            className="bg-gray-800 text-gray-100 border border-gray-600 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 w-1/2"
          />
          <button
            type="submit"
            className="bg-indigo-500 text-white px-[1.5rem] py-[1rem] rounded-lg hover:bg-indigo-600 transition duration-200"
          >
            작성하기
          </button>
        </div>
      </form>
    </section>
  );
}
