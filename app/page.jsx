export default async function Home() {
  async function fetchGameData(
    params = "games",
    body = "fields name,total_rating,rating_count,screenshots,slug; where id = 7346;"
  ) {
    try {
      const response = await fetch(`https://api.igdb.com/v4/${params}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_TOKEN}`,
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error + " " + params);
    }
  }
  const searchParams = "Phasmophobia";

  const search = await fetchGameData(
    "games",
    `fields *; search "${searchParams}"; limit 100; where version_parent = null;`
  );
  // console.log(search);
  const gameid = "20196"

  const game = await fetchGameData(
    "games",
    `fields name,aggregated_rating,rating, version_parent; where version_parent = null & rating_count > 50 & parent_game = null & aggregated_rating != null & aggregated_rating_count > 5; sort aggregated_rating desc; limit 20;`
  );
  console.log(game);

  const gameScreenshots = await fetchGameData(
    "covers",
    `fields *; where game = ${gameid};`
  );

  // console.log(gameScreenshots);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {gameScreenshots.map((screenshot) => (
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_1080p/${screenshot.image_id}.png`}
          alt=""
          width={screenshot.width}
          height={screenshot.height}
          key={screenshot.id}
        />
      ))}
    </main>
  );
}
