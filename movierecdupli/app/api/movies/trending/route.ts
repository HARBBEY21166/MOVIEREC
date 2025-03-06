import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Note the trailing slash which is required by the Django URL pattern
    const response = await fetch("https://alxprodev-movie-recommendation-backend.onrender.com/api/movies/trending/", {
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`)
      return NextResponse.json(
        { error: `Failed to fetch trending movies: ${response.statusText}` },
        { status: response.status },
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching trending movies:", error)
    return NextResponse.json({ error: "Failed to fetch trending movies" }, { status: 500 })
  }
}

