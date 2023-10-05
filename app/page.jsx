export default async function Home() {
  async function fetchGameData(
    params = 'games',
    body = 'fields name,total_rating,rating_count,screenshots,slug; where id = 7346;'
  ) {
    try {
      const response = await fetch(`https://api.igdb.com/v4/${params}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Client-ID': 'sqrrpikp954lcrzih7ld9g2ex4eb5h',
          Authorization: 'Bearer quvnddpc62z5nxinyzoh5o2wwt1qst',
        },
        body: body,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  const gameid = 148241;

  const game = await fetchGameData(
    'games',
    `fields name,total_rating,rating_count,screenshots,slug; where id = ${gameid};`
  );
  // console.log(game);

  const search = await fetchGameData(
    'search',
    `fields *; search "lies of p"; limit 100;`
  );
  console.log(search);

  const gameScreenshots = await fetchGameData(
    'screenshots',
    `fields *; where game = ${gameid};`
  );

  // console.log(gameScreenshots);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {gameScreenshots.map((screenshot) => (
        <img
          src={`https://images.igdb.com/igdb/image/upload/t_1080p/${screenshot.image_id}.jpg`}
          alt=""
          width={screenshot.width}
          height={screenshot.height}
          key={screenshot.id}
        />
      ))}
    </main>
  );
}
