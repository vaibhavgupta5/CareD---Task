// For App Router
import { getArticles } from '@/sample/heath-article'
import { NextResponse } from 'next/server'

export async function GET() {
  const articles = await getArticles()
  return NextResponse.json(articles)
}