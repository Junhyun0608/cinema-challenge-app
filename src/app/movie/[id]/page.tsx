import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/ReviewEditor";
import { MovieData, ReviewData } from "@/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  let movie: MovieData[] = [];
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`
    );

    if (!response.ok) {
      throw new Error("오류가 발생했습니다.");
    }

    movie = await response.json();
  } catch (err) {
    console.error(err);
    return [];
  }

  return movie.map((movie) => ({ id: movie.id.toString() }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`
  );

  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const movie = await response.json();

  const {
    id,
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movie;

  return (
    <div className="flex flex-col gap-[10px]">
      <div
        className="relative flex justify-center p-[20px] bg-center bg-no-repeat bg-cover cover_img_container"
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          aria-hidden="true"
        ></div>
        <img src={posterImgUrl} className="z-10 max-h-[350px] h-[100%]" />
      </div>

      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="m-0 text-[1.5rem]">{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className="font-bold">{subTitle}</div>
          <div className="leading-6">{description}</div>
        </div>
      </div>
    </div>
  );
}

async function ReviewList({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`
  );
  if (!response.ok) {
    throw new Error(`Review fetch failed :${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json();
  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="flex gap-[50px] flex-col">
      <MovieDetail movieId={params.id} />
      <ReviewEditor movieId={params.id} />
      <ReviewList movieId={params.id} />
    </div>
  );
}
