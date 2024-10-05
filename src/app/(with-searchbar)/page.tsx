import MovieItem from "@/components/MovieItem";
import { MovieData } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "한입 시네마",
  description: "한입 시네마에서 최신 영화와 리뷰를 확인하세요 ",
  metadataBase: new URL("https://onebite-cinema-app-xi.vercel.app"),
  openGraph: {
    title: "한입 시네마",
    description: "한입 시네마에서 최신 영화와 리뷰를 확인하세요 ",
    images: ["/thumbnail.png"],
  },
};

async function AllMovies() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  const allMovie: MovieData[] = await response.json();

  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  return (
    <div className="grid grid-cols-5 gap-[5px]">
      {allMovie.map((movie) => (
        <MovieItem key={`all-${movie.id}`} size="allMovie" {...movie} />
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
        <MovieItem key={`reco-${movie.id}`} size="recoMovie" {...movie} />
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <div className="flex flex-col gap-[50px]">
      <section>
        <p className="text-[1.3rem] font-bold mb-3">지금 가장 추천하는 영화</p>
        <RecoMovie />
      </section>
      <section>
        <p className="text-[1.3rem] font-bold mb-3">등록된 모든 영화</p>
        <AllMovies />
      </section>
    </div>
  );
}
