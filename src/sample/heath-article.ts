import axios from "axios";
import { unstable_cache } from "next/cache";

export const getArticles = unstable_cache(
  async () => {
    const url =
      "https://newsapi.org/v2/everything?" +
      `q=health&` +
      "from=2025-06-03&" +
      "sortBy=popularity&" +
      "apiKey=db681973c78c43399e5c60239faf24de";


    try {
      const res = await axios.get(url);
      console.log(res.data.articles.slice(0, 5));

      return res.data.articles.slice(0, 5);
    } catch (error) {
      console.log(error);
    }
  },
  ["articles-cache-key"], // cache key prefix
  { revalidate: 3600  },
 // revalidate after 1 hour (3600 seconds)
);
