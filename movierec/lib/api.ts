import type { Movie, MovieDetails } from "@/types"

// In a real app, you would use environment variables for the API key
const API_KEY = "1b2e5afc5260339a0ff4b141cb2643f7"
const BASE_URL = "https://api.themoviedb.org/3"

export async function getTrendingMovies(): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch trending movies: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error fetching trending movies:", error)
    return []
  }
}

export async function getMovieDetails(id: string): Promise<MovieDetails> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`,
      { next: { revalidate: 86400 } }, // Cache for 24 hours
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Error fetching movie details for ID ${id}:`, error)
    return {
      id: Number.parseInt(id),
      title: "Movie Not Found",
      overview: "Details for this movie could not be loaded.",
      poster_path: null,
      backdrop_path: null,
      release_date: "",
      vote_average: 0,
      runtime: 0,
      budget: 0,
      revenue: 0,
      genres: [],
      production_companies: [],
    }
  }
}

export async function getSimilarMovies(id: string): Promise<Movie[]> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`,
      { next: { revalidate: 86400 } }, // Cache for 24 hours
    )

    if (!response.ok) {
      throw new Error(`Failed to fetch similar movies: ${response.status}`)
    }

    const data = await response.json()
    return data.results.slice(0, 10) // Limit to 10 similar movies
  } catch (error) {
    console.error(`Error fetching similar movies for ID ${id}:`, error)
    return []
  }
}

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query || query.trim() === "") {
    return []
  }

  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(query)}&page=1&include_adult=false`,
      { next: { revalidate: 3600 } }, // Cache for 1 hour
    )

    if (!response.ok) {
      throw new Error(`Failed to search movies: ${response.status}`)
    }

    const data = await response.json()
    return data.results
  } catch (error) {
    console.error("Error searching movies:", error)
    return []
  }
}

