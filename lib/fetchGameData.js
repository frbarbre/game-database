export async function fetchGameData(params, body) {
  try {
    const response = await fetch(
      `https://api.igdb.com/v4/${params}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": process.env.IGDB_CLIENT_ID,
          Authorization: `Bearer ${process.env.IGDB_TOKEN}`,
        },
        body: body,
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error + " " + params);
  }
}
