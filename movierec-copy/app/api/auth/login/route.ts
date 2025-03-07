/*app/api/auth/login/route.ts*/
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // Note the trailing slash which is required by the Django URL pattern
    const response = await fetch("https://alxprodev-movie-recommendation-backend.onrender.com/api/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: "Login failed" }))
      console.error("Login error response:", errorData)
      return NextResponse.json({ error: errorData.detail || "Login failed" }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

