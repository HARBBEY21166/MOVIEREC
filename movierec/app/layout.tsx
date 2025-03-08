import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { FavoritesProvider } from "@/context/favorites-context"
import { AuthProvider } from "@/contexts/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieRec - Find Your Next Favorite Film",
  description: "Discover trending and personalized movie recommendations",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <FavoritesProvider>
            <div className="flex min-h-screen flex-col">
              {children}
            </div>
            <Toaster />
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
