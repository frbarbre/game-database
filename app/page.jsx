import Game from "@/components/Game";
import { fetchGameData } from "@/lib/fetchGameData";
import { Fragment } from "react";

export default async function Home({ searchParams }) {
  const searchLine = "Super Mario";

  const search = await fetchGameData(
    "games",
    `fields name, rating, aggregated_rating, genres, total_rating, first_release_date, keywords; where name ~ *"${searchLine}"* & version_parent = null & parent_game = null & first_release_date != null & keywords != (2004, 2555); limit 20; sort first_release_date desc;`
  );
  console.log(search);
  const gameid = searchParams.id;

  const game = await fetchGameData(
    "games",
    `fields name,aggregated_rating,rating, genres; where version_parent = null & rating_count > 50 & parent_game = null & aggregated_rating != null & aggregated_rating_count > 5; sort aggregated_rating desc; limit 10;`
  );
  // console.log(game);

  const time = new Date().getTime();

  const newGames = await fetchGameData(
    "release_dates",
    `fields *; where game.platforms = 48 & date > ${time}; sort date asc;`
  );

  // console.log(newGames);

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
      <Game gameId={gameid} />
    </main>
  );
}
