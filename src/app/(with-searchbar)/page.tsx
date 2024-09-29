import MovieItem from "@/components/MovieItem";
import MovieItemSkeleton from "@/components/skeleton/movie-item-skeleton";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

// export const dynamic = "auto";
// 특정 페이지의 유형을 강제로 static ,dynamic 페이지로 설정
// 1. auto : 기본값, 아무것도 강제하지 않음
// 2. force-dynamic :
// 3. force-static :
// 4.error

async function AllMovies() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  const allBook: MovieData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <div className="grid grid-cols-5 gap-[5px]">
      {allBook.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

async function RecoMovie() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } }
  );
  const recoMovies: MovieData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-[5px]">
      {recoMovies.map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className="flex flex-col gap-[50px]">
      <section>
        <p className="text-[1.3rem] font-bold mb-3">지금 가장 추천하는 영화</p>
        <Suspense
          fallback={
            <div className="grid grid-cols-3 gap-[5px]">
              <MovieListSkeleton count={3} size="recoMovie" />
            </div>
          }
        >
          <RecoMovie />
        </Suspense>
      </section>
      <section>
        <p className="text-[1.3rem] font-bold mb-3">등록된 모든 영화</p>
        <Suspense
          fallback={
            <div className="grid grid-cols-5 gap-[5px]">
              <MovieListSkeleton count={18} size="allMovie" />
            </div>
          }
        >
          <AllMovies />
        </Suspense>
      </section>
    </div>
  );
}
