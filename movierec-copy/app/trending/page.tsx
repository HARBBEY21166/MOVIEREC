import { Suspense } from "react"
import Link from "next/link"
import { type Movie, MovieCard } from "@/components/movie-card"
import { TrendingMovies } from "@/components/trending-movies"
import { Skeleton } from "@/components/ui/skeleton"

interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

async function getTrendingMovies(): Promise<Movie[]> {
  // Updated API endpoint
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || ""}/api/trending`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  })

  if (!res.ok) {
    throw new Error("Failed to fetch trending movies")
  }

  const data = await res.json()

  // Handle the paginated response format
  if (data.results && Array.isArray(data.results)) {
    return data.results
  } else if (Array.isArray(data)) {
    return data
  }

  throw new Error("Unexpected data format")
}

function MovieGrid({ movies }: { movies: Movie[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

function MovieGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array(10)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="space-y-3">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-24" />
          </div>
        ))}
    </div>
  )
}

export default async function TrendingPage() {
  let movies: Movie[] = [];
  let errorMessage: string | null = null;

  try {
    movies = await getTrendingMovies();
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    errorMessage = "in later.";
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Trending Movies</h1>
          <Link href="/" className="text-sm font-medium hover:underline">
            Back to Home
          </Link>
        </div>
        <div>
        <p className="text-muted-foreground mt-1 mb-5">Discover what's popular right now</p>
         <TrendingMovies />
        </div>
        {/* Only show the error message if it exists */}
        {errorMessage ? (
          <div className="text-white-10"></div>
        ) : (
          <Suspense fallback={<MovieGridSkeleton />}>
            <MovieGrid movies={movies} />
          </Suspense>
        )}
      </main>
    </div>
  )
}