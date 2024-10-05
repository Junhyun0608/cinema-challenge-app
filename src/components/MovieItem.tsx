import { MovieData } from "@/types";
import Image from "next/image";
import Link from "next/link";

type MovieItemProps = MovieData & { size: "recoMovie" | "allMovie" };

export default function MovieItem({
  id,
  posterImgUrl,
  size,
  title,
}: MovieItemProps) {
  const width = size === "recoMovie" ? 250 : 158;

  const height = size === "recoMovie" ? 375 : 222;

  return (
    <Link href={`/movie/${id}`}>
      <Image
        src={posterImgUrl}
        alt={`영화 ${title}의 표지 이미지`}
        width={width}
        height={height}
      />
    </Link>
  );
}
