import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Since the API requires a movie_id for recommendations, we'll default to a popular movie ID
    const defaultMovieId = 550 // Fight Club as an example

    // Note the trailing slash which is required by the Django URL pattern
    const response = await fetch(
      `https://alxprodev-movie-recommendation-backend.onrender.com/api/movies/recommend/${defaultMovieId}/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      return NextResponse.json(
        { error: `Failed to fetch recommended movies: ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    // Just pass through the data as is, let the component handle the format
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching recommended movies:", error)
    return NextResponse.json({ error: "Failed to fetch recommended movies" }, { status: 500 })
  }
}

