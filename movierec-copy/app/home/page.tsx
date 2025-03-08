import { MovieGrid } from "@/components/movie-grid"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getTrendingMovies } from "@/lib/api"
import { Search } from "lucide-react"
import MovieHeroSlider from '@/components/MovieHeroSlider';
import PageWrapper from "@/components/page-wrapper"

export default async function MoviesPage() {
  const movies = await getTrendingMovies()

  return (
    <PageWrapper>
    <div className="container py-6 space-y-6">
         <MovieHeroSlider />
      <h1 className="text-3xl font-bold tracking-tight">Browse Movies</h1>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search movies..." className="pl-8" />
        </div>
        <Select defaultValue="popularity">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="release">Release Date</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="action">Action</SelectItem>
            <SelectItem value="comedy">Comedy</SelectItem>
            <SelectItem value="drama">Drama</SelectItem>
            <SelectItem value="horror">Horror</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <MovieGrid movies={movies} />

      <div className="flex justify-center">
        <Button variant="outline">Load More</Button>
      </div>
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
    </div>
    </PageWrapper>
   )
}

