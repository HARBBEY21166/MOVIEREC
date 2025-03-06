"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { type Movie, MovieCard } from "@/components/movie-card"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    const fetchFavorites = async () => {
      try {
        setLoading(true)
        const response = await fetch("/api/favorites")

        if (!response.ok) {
          throw new Error("Failed to fetch favorites")
        }

        const data = await response.json()
        setFavorites(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [isAuthenticated, router])

  const removeFavorite = async (id: number) => {
    try {
      const response = await fetch(`/api/favorites/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove from favorites")
      }

      // Update the UI by removing the movie from the list
      setFavorites(favorites.filter((movie) => movie.id !== id))
    } catch (err) {
      console.error("Error removing favorite:", err)
    }
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">MovieMagic</span>
          </Link>
          <nav className="ml-auto flex gap-4">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/trending" className="text-sm font-medium hover:underline">
              Trending
            </Link>
            <Link href="/recommended" className="text-sm font-medium hover:underline">
              Recommended
            </Link>
            <Link href="/favorites" className="text-sm font-medium hover:underline font-bold">
              Favorites
            </Link>
          </nav>
        </div>
      </header>

      <main className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Favorite Movies</h1>
          <Link href="/" className="text-sm font-medium hover:underline">
            Back to Home
          </Link>
        </div>

        {error && (
          <div className="text-center py-10">
            <p className="text-red-500">Error: {error}</p>
            <p className="text-muted-foreground">Please try again later</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="space-y-3">
                  <Skeleton className="h-[300px] w-full rounded-lg" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
          </div>
        ) : favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {favorites.map((movie) => (
              <div key={movie.id} className="relative group">
                <MovieCard movie={movie} />
                <Button
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFavorite(movie.id)}
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-xl">You haven't added any favorites yet.</p>
            <p className="text-muted-foreground mt-2">
              Browse movies and click the "Add to Favorites" button to add them here.
            </p>
            <Button className="mt-4" asChild>
              <Link href="/trending">Browse Trending Movies</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

