import MovieItem from "@/components/MovieItem";
import movies from "@/dummy.json";

export default function Home() {
  return (
    <div className="flex flex-col gap-[50px]">
      <section>
        <p className="text-[1.3rem] font-bold">지금 가장 추천하는 영화</p>
        <div className="grid grid-cols-3 gap-[5px]">
          {movies.slice(0, 3).map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
      <section>
        <p className="text-[1.3rem] font-bold">등록된 모든 영화</p>
        <div className="grid grid-cols-5 gap-[5px]">
          {movies.map((movie) => (
            <MovieItem key={movie.id} {...movie} />
          ))}
        </div>
      </section>
    </div>
  );
}
