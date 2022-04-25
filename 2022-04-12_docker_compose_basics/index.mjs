import { request, createServer } from "http";
import { writeFile } from "fs/promises";
import { Stream } from "stream";

const server = createServer();

server.on("request", (request, response) => {
  fetch("https://api.thecatapi.com/v1/images/search", {
    headers: { "X-API-KEY": process.env.CAT_API_KEY },
  })
    .then((catResponse) => catResponse.json())
    .then((catResponse) => {
      // Get a random cat picture by choosing the first value in the response
      // See "quickstart" https://docs.thecatapi.com/
      const randomCat = catResponse[0];
      downloadImage(randomCat.url, `${process.env.ASSET_LOCATION}/cat.jpg`);
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(`Downloaded cat image from ${randomCat.url}`);
    })
    .catch((err) => {
      console.error(err);
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("Failed to download cat picture.");
    });
});

server.listen(3000);

async function downloadImage(url, path) {
  const imageResponse = await fetch(url);
  const blob = await imageResponse.blob();
  const buffer = Buffer.from(await blob.arrayBuffer());
  await writeFile(path, buffer);
}
