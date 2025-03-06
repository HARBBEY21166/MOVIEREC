import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  try {
    // For movie details, we'll use the recommend endpoint since there's no specific movie details endpoint
    // This will give us the movie details along with recommendations
    const response = await fetch(
      `https://alxprodev-movie-recommendation-backend.onrender.com/api/movies/recommend/${id}/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      },
    )

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    // Extract the first movie as the details (assuming the API returns the requested movie first)
    return NextResponse.json(data[0] || {})
  } catch (error) {
    console.error(`Error fetching movie with ID ${id}:`, error)
    return NextResponse.json({ error: `Failed to fetch movie with ID ${id}` }, { status: 500 })
  }
}

