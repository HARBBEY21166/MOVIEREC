"use client"

import type React from "react"

import type { Movie } from "@/types"
import { createContext, useEffect, useState } from "react"
import { useToast } from "@/components/ui/use-toast"

interface FavoritesContextType {
  favorites: Movie[]
  addFavorite: (movie: Movie) => void
  removeFavorite: (id: number) => void
  clearFavorites: () => void
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<Movie[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites))
      } catch (error) {
        console.error("Failed to parse favorites from localStorage", error)
      }
    }
  }, [])

  const addFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, movie]
      localStorage.setItem("favorites", JSON.stringify(newFavorites))
      return newFavorites
    })

    toast({
      title: "Added to favorites",
      description: `${movie.title} has been added to your favorites.`,
    })
  }

  const removeFavorite = (id: number) => {
    setFavorites((prev) => {
      const movie = prev.find((m) => m.id === id)
      const newFavorites = prev.filter((movie) => movie.id !== id)
      localStorage.setItem("favorites", JSON.stringify(newFavorites))

      if (movie) {
        toast({
          title: "Removed from favorites",
          description: `${movie.title} has been removed from your favorites.`,
        })
      }

      return newFavorites
    })
  }

  const clearFavorites = () => {
    setFavorites([])
    localStorage.removeItem("favorites")

    toast({
      title: "Favorites cleared",
      description: "All movies have been removed from your favorites.",
    })
  }

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  )
}



