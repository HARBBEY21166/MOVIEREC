"use client"

import { useState, useEffect } from "react"
import { MovieCard } from "@/components/movie-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Movie } from "@/types"

// Function to fetch trending movies
const getTrendingMovies = async () => {
  const response = await fetch("/api/trending")
  if (!response.ok) {
    throw new Error("Failed to fetch trending movies")
  }
  const data = await response.json()
  return data.results // Return the array of movie objects
}

export function RecommendedMovies() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setLoading(true)
        const trendingMovies = await getTrendingMovies()
        // Slice the trending movies to get a subset for recommendations
        setMovies(trendingMovies.slice(7, 20)) // Display movies from index 5 to 15
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
        console.error("Error fetching recommended movies:", err)
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

  if (movies.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No recommended movies available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}