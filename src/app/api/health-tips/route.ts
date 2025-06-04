import { health_tips } from "@/sample/health-tips";
import { NextRequest, NextResponse } from "next/server";

type Mood = keyof typeof health_tips

export async function POST(req: NextRequest){
    const {mood} = await req.json()

    console.log(mood)

    const tips = health_tips[mood as Mood]



    console.log(tips)

    return NextResponse.json({tips})
}