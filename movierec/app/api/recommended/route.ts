import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch trending movies to get a valid movie ID
    const trendingResponse = await fetch(
      "https://alxprodev-movie-recommendation-backend.onrender.com/api/movies/trending/",
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!trendingResponse.ok) {
      console.error(`Trending API responded with status: ${trendingResponse.status}`);
      return NextResponse.json(
        { error: `Failed to fetch trending movies: ${trendingResponse.statusText}` },
        { status: trendingResponse.status }
      );
    }

    const trendingData = await trendingResponse.json();
    const trendingMovieId = trendingData.results[0]?.id; // Use the first trending movie ID

    if (!trendingMovieId) {
      return NextResponse.json(
        { error: "No trending movies found" },
        { status: 404 }
      );
    }

    // Fetch recommendations based on the trending movie ID
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await fetch(
      `https://alxprodev-movie-recommendation-backend.onrender.com/api/movies/recommend/${trendingMovieId}/`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Include the token in the headers
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      return NextResponse.json(
        { error: `Failed to fetch recommended movies: ${response.statusText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    // Just pass through the data as is, let the component handle the format
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching recommended movies:", error);
    return NextResponse.json({ error: "Failed to fetch recommended movies" }, { status: 500 });
  }
}
