import { ReviewData } from "@/types";
import ReviewItemDeleteButton from "./ReviewItemDeleteButton";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId,
}: ReviewData) {
  return (
    <div className="flex flex-col mb-4 gap-[5px] p-[1rem] rounded-lg bg-gray-800 py-[15px]">
      <div className="font-semibold text-lg">{author}</div>
      <div className="text-gray-300">{content}</div>
      <div className="flex justify-between">
        <div>{new Date(createdAt).toLocaleString()}</div>
        <div className="text-red-400 hover:text-red-500 transition duration-150 cursor-pointer">
          <ReviewItemDeleteButton reviewId={id} movieId={movieId} />
        </div>
      </div>
    </div>
  );
}
