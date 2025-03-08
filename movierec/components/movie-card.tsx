import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { AddToFavoritesButton } from "./add-to-favorites-button"
import type { Movie } from "@/types"

/*export interface Movie {
  id: number
  title: string
  poster_path: string
  vote_average: number
  release_date: string
  overview: string
  genre_ids: number[]
}*/

interface MovieCardProps {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : `/placeholder.svg?height=450&width=300`

  const year = movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <Link href={`/movie/${movie.id}`}>
        <div className="aspect-[2/3] relative overflow-hidden">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={movie.title}
            fill
            className="object-cover transition-transform hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-1">{movie.title}</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm ml-1">{movie.vote_average.toFixed(1)}</span>
            </div>
            <span className="text-sm text-muted-foreground">{year}</span>
            <AddToFavoritesButton movie={movie} variant="ghost" size="icon" className="h-8 w-8 ml-9"/>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}

