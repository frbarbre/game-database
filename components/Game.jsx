import { fetchGameData } from "@/lib/fetchGameData";

export default async function Game({ gameId }) {
  const collectionItem = await fetchGameData(
    "games",
    `fields name; where id = ${gameId} & version_parent = null;`
  );

  console.log(collectionItem);

  if (!collectionItem[0]?.id) return null;

  const collectionCover = await fetchGameData(
    "covers",
    `fields *; where game = ${collectionItem[0]?.id};`
  );

  console.log(collectionCover);

  return (
    <div>
      <h1>{collectionItem[0]?.name}</h1>
      <img
        src={`https://images.igdb.com/igdb/image/upload/t_1080p/${collectionCover[0].image_id}.png`}
        alt=""
        width={collectionCover[0].width}
        height={collectionCover[0].height}
      />
    </div>
  );
}
