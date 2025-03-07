/*app/api/auth/refresh/route.ts*/
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { token } = body

    // Note the trailing slash which is required by the Django URL pattern
    const response = await fetch(
      "https://alxprodev-movie-recommendation-backend.onrender.com/api/users/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: token }),
      },
    )

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to refresh token" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Token refresh error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

