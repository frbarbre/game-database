import { fetchGameData } from "../lib/fetchGameData";

export default async function Game({ gameId, isSpecificGame }) {
  const collectionItem = await fetchGameData(
    "games",
    `fields *; where id = ${gameId};`
  );

  if (!collectionItem) return null;

  const collectionRelease = await fetchGameData(
    "release_dates",
    `fields *; where game = ${collectionItem[0]?.id};`
  );

  const collectionCover = await fetchGameData(
    "covers",
    `fields *; where game = ${collectionItem[0]?.id};`
  );

  const genres = await fetchGameData(
    "genres",
    `fields *; where id = (${collectionItem[0]?.genres});`
  );

  const similarGames = await fetchGameData(
    "games",
    `fields *; where id = (${collectionItem[0]?.similar_games}); sort aggregated_rating desc;`
  );

  const similarGamesCovers = await fetchGameData(
    "covers",
    `fields *; where game = (${collectionItem[0]?.similar_games});`
  );
  const similarGamesRelease = await fetchGameData(
    "release_dates",
    `fields *; where game = (${collectionItem[0]?.similar_games}); limit 50;`
  );

  return (
    <>
      {collectionCover && collectionItem && collectionRelease && (
        <div>
          <h1>{collectionItem[0]?.name}</h1>
          <h2>{collectionRelease[0]?.human}</h2>
          <h3>{collectionItem[0]?.total_rating.toFixed(0) / 10}</h3>
          {genres?.map((genre) => {
            return (
              <h4 className="text-purple-800 text-sm" key={genre.id}>
                {genre.name}
              </h4>
            );
          })}
          <img
            src={`https://images.igdb.com/igdb/image/upload/t_720p/${collectionCover[0]?.image_id}.png`}
            alt=""
            width={collectionCover[0]?.width}
            height={collectionCover[0]?.height}
            className="max-w-[300px]"
          />
          {isSpecificGame && (
            <>
              <h2 className="pt-10">RECOMMENDED</h2>
              <div className="flex flex-wrap pt-4">
                {similarGames && (
                  <>
                    {similarGames.map((game) => {
                      const cover = similarGamesCovers.find(
                        (cover) => cover.game === game.id
                      );

                      const release = similarGamesRelease.find(
                        (release) => release.game === game.id
                      );

                      return (
                        <div key={game?.id}>
                          <h2>{game?.name}</h2>
                          <h3>{release?.human}</h3>
                          <h4>{game?.aggregated_rating}</h4>
                          <img
                            src={`https://images.igdb.com/igdb/image/upload/t_1080p/${cover?.image_id}.png`}
                            alt=""
                            width={collectionCover[0]?.width}
                            height={collectionCover[0]?.height}
                            className="max-w-[300px]"
                          />
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
