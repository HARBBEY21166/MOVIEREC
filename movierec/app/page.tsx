/*app/page.tsx*/
import Link from "next/link"
import { TrendingMovies } from "@/components/trending-movies"
import { RecommendedMovies } from "@/components/recommended-movies"
import { NavBar } from "@/components/nav-bar"

export default async function Home() {
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <main className="container py-6 md:py-12">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
          <div className="flex max-w-[980px] flex-col items-start gap-2">
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Discover your next favorite movie
            </h1>
            <p className="max-w-[700px] text-lg text-muted-foreground">
              Personalized movie recommendations based on your taste. Explore trending and popular movies across all
              genres.
            </p>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Trending Movies</h2>
            <Link href="/trending" className="text-sm font-medium hover:underline">
              View all
            </Link>
          </div>
          <TrendingMovies />
        </section>

        <section className="space-y-6 pt-12">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight">Recommended For You</h2>
            <Link href="/recommended" className="text-sm font-medium hover:underline">
              View all
            </Link>
          </div>
          <RecommendedMovies />
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 MovieMagic. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}