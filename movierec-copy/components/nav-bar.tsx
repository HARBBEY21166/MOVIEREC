"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

export function NavBar() {
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/home" className="flex items-center space-x-2">
          <span className="text-2xl font-bold">MovieRec</span>
        </Link>
        <nav className="ml-auto flex gap-4 items-center">
          <Link href="/home" className="text-sm font-medium hover:underline">
            Home
          </Link>
          <Link href="/trending" className="text-sm font-medium hover:underline">
            Trending
          </Link>
          <Link href="/recommended" className="text-sm font-medium hover:underline">
            Recommended
          </Link>
          <Link href="/favorites" className="text-sm font-medium hover:underline">
            Favorites
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User  className="h-5 w-5" />
                <span className="sr-only">User  menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem disabled>
                <span>Guest</span> {/* You can change this to show user email if needed */}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/">
                  Sign Out
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  )
}