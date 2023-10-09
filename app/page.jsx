import Game from "@/components/Game";
import { fetchGameData } from "@/lib/fetchGameData";
import { Fragment } from "react";

export default async function Home() {
  const searchParams = "Elden Ring";

  const search = await fetchGameData(
    "games",
    `fields *; search "${searchParams}"; limit 100; where version_parent = null;`
  );
  // console.log(search);
  const gameid = "19560";

  const game = await fetchGameData(
    "games",
    `fields name,aggregated_rating,rating,version_parent; where version_parent = null & rating_count > 50 & parent_game = null & aggregated_rating != null & aggregated_rating_count > 5; sort aggregated_rating desc; limit 20;`
  );
  // console.log(game);

  const gameCollections = await fetchGameData(
    "collections",
    `fields *; where id = 70;`
  );

  // console.log(gameScreenshots);

  const gameData = await fetchGameData(
    "games",
    `fields *; where id = ${gameid};`
  );

  // console.log(gameData);

  return (
    <main className="flex min-h-screen items-center justify-between p-24">
      {gameCollections[0].games.map((collection) => (
        <Fragment key={collection}>
          {/* <img
              src={`https://images.igdb.com/igdb/image/upload/t_1080p/${screenshot.image_id}.png`}
              alt=""
              width={screenshot.width}
              height={screenshot.height}
            /> */}
          {/* <iframe
            width="462"
            height="260"
            src={`https://www.youtube.com/embed/${screenshot.video_id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          ></iframe> */}
          {collection == gameid && <Game gameId={collection} />}
        </Fragment>
      ))}
    </main>
  );
}
("");
