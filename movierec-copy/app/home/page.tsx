/*app/page.tsx*/
import Link from "next/link"
import { TrendingMovies } from "@/components/trending-movies"
import { RecommendedMovies } from "@/components/recommended-movies"

export default async function Home() {
  return (
    <div className="min-h-screen bg-[#0D253F] text-[#F5F5F5]">

      <main className="container py-6 md:py-12">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-16">
          <div className="flex max-w-[980px] flex-col items-start gap-4">
            <span className="rounded-full bg-[#E50914] px-3 py-1 text-xs font-medium uppercase text-white">Premium</span>
            <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl">
              Discover your next <span className="text-[#FFD700]">favorite</span> movie
            </h1>
            <p className="max-w-[700px] text-lg text-[#C0C0C0]">
              Personalized movie recommendations based on your taste. Explore trending and popular movies across all
              genres.
            </p>
            <div className="mt-4 flex gap-4">
              <button className="rounded bg-[#E50914] px-6 py-3 font-medium text-white hover:bg-opacity-90">
                Get Started
              </button>
              <button className="rounded border border-[#708090] px-6 py-3 font-medium text-[#F5F5F5] hover:border-[#FFD700] hover:text-[#FFD700]">
                Browse Movies
              </button>
            </div>
          </div>
        </section>

        <section className="space-y-6 rounded-lg bg-[#2C3E50] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-1 bg-[#E50914]"></div>
              <h2 className="text-2xl font-bold tracking-tight">Trending Movies</h2>
            </div>
            <Link href="/trending" className="text-sm font-medium text-[#708090] hover:text-[#FFD700] hover:underline">
              View all
            </Link>
          </div>
          <TrendingMovies />
        </section>

        <section className="space-y-6 rounded-lg bg-[#2C3E50] mt-8 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-4 w-1 bg-[#FFD700]"></div>
              <h2 className="text-2xl font-bold tracking-tight">Recommended For You</h2>
            </div>
            <Link href="/recommended" className="text-sm font-medium text-[#708090] hover:text-[#FFD700] hover:underline">
              View all
            </Link>
          </div>
          <RecommendedMovies />
        </section>

        <section className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-[#2C3E50] bg-gradient-to-b from-[#0D253F] to-[#2C3E50] p-6">
            <div className="mb-4 rounded-full bg-[#0D253F] p-3 w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#FFD700]">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Top Rated</h3>
            <p className="text-[#C0C0C0]">Explore the highest-rated movies of all time, curated by critics and fans alike.</p>
          </div>
          <div className="rounded-lg border border-[#2C3E50] bg-gradient-to-b from-[#0D253F] to-[#2C3E50] p-6">
            <div className="mb-4 rounded-full bg-[#0D253F] p-3 w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#E50914]">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">Premium Access</h3>
            <p className="text-[#C0C0C0]">Get early access to upcoming releases and exclusive behind-the-scenes content.</p>
          </div>
          <div className="rounded-lg border border-[#2C3E50] bg-gradient-to-b from-[#0D253F] to-[#2C3E50] p-6">
            <div className="mb-4 rounded-full bg-[#0D253F] p-3 w-12 h-12 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-[#C0C0C0]">
                <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z" />
              </svg>
            </div>
            <h3 className="mb-2 text-xl font-bold">New Releases</h3>
            <p className="text-[#C0C0C0]">Stay updated with the latest movies hitting theaters and streaming platforms.</p>
          </div>
        </section>
      </main>
    </div>
  )
}