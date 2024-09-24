import MovieItem from "@/components/MovieItem";
import movies from "@/dummy.json";
export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <div className="grid grid-cols-3 gap-[5px]">
      {movies.slice(0, 3).map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
