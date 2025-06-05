"use client";

import { ArrowRightFromLineIcon, CalendarIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

type Article = {
  title: string;
  author: string | null;
  description: string | null;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
  url: string;
};

export default function HealthArticle() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filterdArticles, setFilteredArticles] = useState<Article[]>([]);

  const handleSearch = () => {
    console.log(searchInput);

    const filtered = articles.filter((article) =>
      article.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredArticles(filtered);

    console.log(filtered);
  };

  useEffect(() => {

    const timeout = setTimeout(() => {
          handleSearch();
    }, 1000);

    return () => clearTimeout(timeout)
  }, [searchInput, handleSearch]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/articles");
        const data = await res.json();
        setArticles(data);
        setFilteredArticles(data)
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex-col gap-4 flex">
      <div className="bg-white flex border-[#007EFF]/30  border-2 flex-col gap-2 rounded-md h-[15vh] p-4">
        <Input
          onChange={(e) => setSearchInput(e.target.value)}
          className=" w-full p-6 active:shadow-xs border-[#007EFF]/30 rounded-md border-2"
          placeholder="🔎 Search Article..."
        />
        <p className="text-xs font-normal text-black/50">
            Showing {filterdArticles.length} of {articles.length} articles
        </p>
      </div>

      <div className=" gap-2 flex flex-wrap w-full">
        {filterdArticles.length > 0  ? filterdArticles.map((article) => (
          <div
            key={article.url}
            className="border-2 w-[31%] p-2 flex-col gap-1 flex shadow-2xs bg-white border-[#007EFF]/30 rounded-md"
          >
            {article.urlToImage && (
              <Image
                src={article.urlToImage?.toString()}
                height={100}
                width={600}
                alt="img"
                loader={({ src }) => src}
                unoptimized
                className="rounded-md"
              ></Image>
            )}
            <div className="p-2 flex flex-col gap-1">
              <p className="flex text-xs border-1 bg-[#007EFF] p-2 text-white rounded-md  mt-2 font-normal gap-1 items-center">
                <CalendarIcon className="p-1" />
                {article.publishedAt}
              </p>
              <h2 className="text-xl font-semibold">{article.title}</h2>
              {article.description && (
                <p className="text-black/60 text-sm font-normal ">
                  {article.description}
                </p>
              )}
              <button
                onClick={() => {
                  window.location.href = article.url;
                }}
                className="flex text-md cursor-pointer   rounded-md  mt-4 font-bold hover:translate-y-[-3px]  transition-all duration-300 gap-2 items-center text-[#007EFF]"
              >
                Read Full Article
                <ArrowRightFromLineIcon className="p-1 bg-[#007EFF] rounded-full text-white" />
              </button>
            </div>
          </div>
        )) : 
        
        <div className="p-2">No Article Found</div>

        }
      </div>
    </div>
  );
}
