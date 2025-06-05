"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useUser } from "@/store/zustStore";
import axios from "axios";
import { Calendar, Heart, Star } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { format } from "date-fns";
import {
  IconBulb,
  IconMoodAngry,
  IconMoodHappy,
  IconMoodNeutral,
  IconMoodSad,
} from "@tabler/icons-react";
import { toast } from "sonner";

export default function Page() {
  const { email, mood, setMood } = useUser();
  console.log(mood);

  const[articleRed, setArticleRed] = useState(0);
  const [healthTips, sethealthTips] = useState([]);
  const date = new Date();
  const fDate = format(date, "EEE MMM dd yyyy");


  useEffect(() => {
    const len = Number(localStorage.getItem("articles"))
    if(len>0){
        setArticleRed(len);
    }
  }, [])

  const getTips = async (mood: string) => {
    console.log(mood);

    try {
      const res = await axios.post("/api/health-tips", { mood });
      console.log(res.data.tips);
      sethealthTips(res.data.tips);
    } catch (error) {
      console.log(error);
    }
  };

  const moods = [
    { mood: "neutral", icon: IconMoodNeutral },
    { mood: "happy", icon: IconMoodHappy },
    { mood: "sad", icon: IconMoodSad },
    { mood: "angry", icon: IconMoodAngry },
  ];

  useEffect(() => {
    getTips(mood);

    console.log(healthTips);
  }, [mood]);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-[#007EFF]/5">
        <SiteHeader />

        <div className="md:p-8 p-4 flex  flex-col gap-3">
          <div className="border-2 gap-1 p-2 pl-4 pr-4 flex items-center justify-between border-[#007EFF] bg-white rounded-md  shadow-2xs">
            <div className="flex flex-col gap-1 text-xl  md:text-xl font-bold">
              Good to see you again, {email}.
              <p className="md:text-sm   text-xs font-normal flex items-center text-black/80">
                <Calendar className="p-1" /> {fDate}
              </p>
            </div>

            <div className="bg-[#007EFF]/5 hidden   rounded-md p-4 md:flex justify-center items-center md:p-6 h-full border-[#007EFF] border-2">
              <Heart className="text-black scale-150" />
            </div>
          </div>

          <div className="h-[12vh]  flex gap-2">
            <div className="h-full flex flex-col justify-center items-center  border-[#007EFF] border-2   rounded-md bg-white w-[33%]">
              <p className="text-xl font-bold text-[#007EFF]">7</p>
              <p className="md:text-sm text-xs font-normal text-black/80">
                Days Active
              </p>
            </div>

            <div className="h-full flex flex-col justify-center items-center border-[#007EFF] border-2   rounded-md bg-white w-[33%]">
              <p className="text-xl font-semibold text-black">
                {mood.toUpperCase()}
              </p>
              <p className="md:text-sm text-xs font-normal text-black/80">
                Current Mood
              </p>
            </div>

            <div className="h-full flex flex-col justify-center items-center  border-[#007EFF] border-2   rounded-md bg-white w-[33%]">
              <p className="text-xl font-bold text-[#007EFF]">{articleRed}</p>
              <p className="md:text-sm text-xs font-normal text-black/80">
                News Viewed
              </p>
            </div>
          </div>

          <div className="flex md:flex-row flex-col w-full h-[50vh] gap-2">
            <div className="border-2 w-full p-4 flex flex-col gap-4  border-[#007EFF] bg-white rounded-md ">
              <h1 className="text-xl flex gap-2 items-center font-semibold">
                <IconBulb className="text-[#007EFF]" /> Health Tips
              </h1>
              <Suspense fallback={<p>Loading...</p>}>
                <div className="flex flex-col gap-2">
                  {healthTips.map((tip, index) => (
                    <p
                      className="md:text-sm text-xs flex  items-center gap-2 font-medium p-4 rounded-md border-[#007EFF]/50 border-2 bg-[#007EFF]/5"
                      key={tip}
                    >
                      <span className="p-2 flex justify-center items-center w-[10%] md:w-[7%] rounded-md bg-[#007EFF] text-white">
                        {index + 1}
                      </span>
                      <span className="md:text-sm text-xs font-normal">
                        {tip}
                      </span>
                    </p>
                  ))}
                </div>
              </Suspense>
            </div>

            <div className="flex w-full h-[50vh] gap-2">
              <div className="border- w-full  p-4 flex flex-col gap-4  border-[#007EFF] bg-[#007EFF] rounded-md ">
                <h1 className="text-xl flex gap-2 items-center text-white font-semibold">
                  <Star className="text-white" /> Select Your Mood
                </h1>
                <div className="flex flex-col gap-2">
                  {moods.map((moodx) => (
                    <div
                      onClick={() => {
                        setMood(moodx.mood);
                        toast(`Mood Updated to ${moodx.mood}`, {
                          description: "Check out some tips buddy!",
                        });
                      }}
                      key={moodx.mood}
                      className="md:text-sm text-xs cursor-pointer flex justify-between items-center gap-2 font-medium p-4 rounded-md border-[#007EFF]/50 border-2 bg-white"
                    >
                      <div className="flex items-center gap-2">
                        <p className="   text-[#007EFF]">
                          <moodx.icon />
                        </p>
                        <p className="md:text-sm text-xs font-semibold">
                          {moodx.mood.charAt(0).toUpperCase() +
                            moodx.mood.slice(1)}
                        </p>
                      </div>

                      <p
                        className={`${
                          moodx.mood === mood ? "bg-[#007EFF]" : "bg-white"
                        }  border-2 border-[#007EFF] p-2 rounded-full`}
                      ></p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
