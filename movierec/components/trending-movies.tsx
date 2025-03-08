"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Movie } from "@/types"

/*interface MovieResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}*/

export function TrendingMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true)
        // Updated API endpoint
        const response = await fetch("/api/trending")

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || "Failed to fetch trending movies")
        }

        const data = await response.json()

        // Handle the paginated response format
        if (data.results && Array.isArray(data.results)) {
          setMovies(data.results.slice(0, 24)) // Limit to 6 movies for the homepage
        } else if (Array.isArray(data)) {
          setMovies(data.slice(0, 24))
        } else {
          console.error("Unexpected data format:", data)
          throw new Error("Received invalid data format from API")
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching trending movies:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrendingMovies()
  }, [])

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>Error: {error}</AlertDescription>
      </Alert>
    )
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Array(6)
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

  if (movies.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No trending movies available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}

