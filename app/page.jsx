import Search from "../components/Search";
import Game from "../components/Game";
import { fetchGameData } from "../lib/fetchGameData";

export default async function Home({ searchParams }) {
  const searchLine = searchParams.search;

  const search = await fetchGameData(
    "games",
    `fields name, rating, aggregated_rating, genres, total_rating, first_release_date, keywords; where name ~ *"${searchLine}"* & version_parent = null & first_release_date != null & keywords != (2004, 2555) & category = (0, 10); limit 20; sort first_release_date desc;`
  );
  console.log(search);

  const gameid = searchParams.id;

  const game = await fetchGameData(
    "games",
    `fields name,aggregated_rating,rating, genres; where version_parent = null & rating_count > 50 & parent_game = null & aggregated_rating != null & aggregated_rating_count > 5; sort aggregated_rating desc; limit 10;`
  );

  const time = new Date().getTime();

  const newGames = await fetchGameData(
    "release_dates",
    `fields *; where game.platforms = 48 & date > ${time}; sort date asc;`
  );

  const gameCollections = await fetchGameData(
    "collections",
    `fields *; where id = 70;`
  );

  const gameData = await fetchGameData(
    "games",
    `fields *; where id = ${gameid};`
  );

  return (
    <div>
      <Search />
      <main className="flex min-h-screen items-center justify-between p-24 flex-wrap">
        {gameid && <Game gameId={gameid} isSpecificGame={true} />}
        {searchLine && (
          <>
            <h1 className="text-lg font-bold">SEARCH RESULTS</h1>
            <article className="flex flex-wrap gap-10">
              {search.map((game) => (
                <Game gameId={game?.id} key={game?.id} />
              ))}
            </article>
          </>
        )}
      </main>
    </div>
  );
}
