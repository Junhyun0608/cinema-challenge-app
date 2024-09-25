import MovieItem from "@/components/MovieItem";
import { MovieData } from "@/types";

async function AllMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "no-store" }
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
        <p className="text-[1.3rem] font-bold">지금 가장 추천하는 영화</p>
        <RecoMovie />
      </section>
      <section>
        <p className="text-[1.3rem] font-bold">등록된 모든 영화</p>
        <AllMovies />
      </section>
    </div>
  );
}
