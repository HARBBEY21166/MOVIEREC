import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Note the trailing slash which is required by the Django URL pattern
    const response = await fetch("https://alxprodev-movie-recommendation-backend.onrender.com/api/favorites/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching favorites:", error)
    return NextResponse.json({ error: "Failed to fetch favorites" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { movie_id } = body

    const cookieStore = cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Note the trailing slash which is required by the Django URL pattern
    const response = await fetch("https://alxprodev-movie-recommendation-backend.onrender.com/api/favorites/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ movie_id }),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData.detail || "Failed to add favorite" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error adding favorite:", error)
    return NextResponse.json({ error: "Failed to add favorite" }, { status: 500 })
  }
}

