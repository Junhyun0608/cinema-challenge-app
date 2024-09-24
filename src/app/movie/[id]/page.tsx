import movies from "@/dummy.json";

export default function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
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
  } = movies[5];
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
