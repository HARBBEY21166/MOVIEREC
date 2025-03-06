import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, first_name, last_name, password } = body

    console.log("Signup request:", { email, first_name, last_name, password: "***" })

    // Note the trailing slash which is required by the Django URL pattern
    const response = await fetch("https://alxprodev-movie-recommendation-backend.onrender.com/api/users/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, first_name, last_name, password }),
    })

    console.log("Signup response status:", response.status)

    if (!response.ok) {
      let errorData
      try {
        errorData = await response.json()
      } catch (e) {
        errorData = { detail: "Signup failed" }
      }
      console.error("Signup error response:", errorData)
      return NextResponse.json({ error: errorData.detail || "Signup failed" }, { status: response.status })
    }

    const data = await response.json()
    console.log("Signup success:", data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 })
  }
}

