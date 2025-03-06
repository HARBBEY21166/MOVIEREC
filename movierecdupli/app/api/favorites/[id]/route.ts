import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const cookieStore = cookies()
    const token = cookieStore.get("token")?.value

    if (!token) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Note the trailing slash which is required by the Django URL pattern
    const response = await fetch(`https://alxprodev-movie-recommendation-backend.onrender.com/api/favorites/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json({ error: errorData.detail || "Failed to remove favorite" }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing favorite:", error)
    return NextResponse.json({ error: "Failed to remove favorite" }, { status: 500 })
  }
}

