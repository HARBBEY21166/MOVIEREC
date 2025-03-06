"use client"

import Image from "next/image"
import Link from "next/link"
import { Star, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface MovieDetailsProps {
  params: {
    id: string
  }
}

export default function MovieDetails({ params }: MovieDetailsProps) {
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isAddingFavorite, setIsAddingFavorite] = useState(false)
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        // Updated API endpoint
        const res = await fetch(`/api/movie/${params.id}`)

        if (!res.ok) {
          throw new Error("Failed to fetch movie details")
        }

        const data = await res.json()
        setMovie(data)

        // Check if movie is in favorites
        if (isAuthenticated) {
          const favRes = await fetch("/api/favorites")
          if (favRes.ok) {
            const favorites = await favRes.json()
            setIsFavorite(favorites.some((fav) => fav.id === Number.parseInt(params.id)))
          }
        }
      } catch (err) {
        setError(err.message || "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchMovie()
  }, [params.id, isAuthenticated])

  const handleAddToFavorites = async () => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    try {
      setIsAddingFavorite(true)
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie_id: params.id }),
      })

      if (response.ok) {
        setIsFavorite(true)
      }
    } catch (err) {
      console.error("Error adding to favorites:", err)
    } finally {
      setIsAddingFavorite(false)
    }
  }

  const handleRemoveFromFavorites = async () => {
    try {
      setIsAddingFavorite(true)
      const response = await fetch(`/api/favorites/${params.id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setIsFavorite(false)
      }
    } catch (err) {
      console.error("Error removing from favorites:", err)
    } finally {
      setIsAddingFavorite(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg">Loading movie details...</p>
        </div>
      </div>
    )
  }

  if (error || !movie) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500">Error loading movie details</p>
          <Button className="mt-4" asChild>
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    )
  }

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `/placeholder.svg?height=450&width=300`

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : `/placeholder.svg?height=1080&width=1920`

  const releaseDate = movie.release_date
    ? new Date(movie.release_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown"

  const genres = movie.genres || []

  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-[50vh] w-full">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <Image src={backdropUrl || "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-6 container">
          <Link href="/" className="text-white hover:underline mb-4 inline-block">
            ← Back to home
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{movie.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-1" />
              <span>{releaseDate}</span>
            </div>
            {movie.runtime && (
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                <span>{movie.runtime} min</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <main className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={movie.title}
                width={300}
                height={450}
                className="w-full h-auto"
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overview</h2>
              <p className="text-muted-foreground">{movie.overview || "No overview available."}</p>
            </div>

            {genres.length > 0 && (
              <div>
                <h2 className="text-xl font-bold mb-2">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre: { id: number; name: string }) => (
                    <Badge key={genre.id} variant="secondary">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {movie.tagline && (
              <div>
                <h2 className="text-xl font-bold mb-2">Tagline</h2>
                <p className="text-muted-foreground italic">"{movie.tagline}"</p>
              </div>
            )}

            <div className="pt-4">
              <Button
                size="lg"
                onClick={isFavorite ? handleRemoveFromFavorites : handleAddToFavorites}
                disabled={isAddingFavorite}
              >
                {isAddingFavorite ? "Processing..." : isFavorite ? "Remove from Favorites" : "Add to Favorites"}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

