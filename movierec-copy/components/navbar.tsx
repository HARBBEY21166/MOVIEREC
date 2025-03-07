"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Menu, Moon, Search, Sun, User } from "lucide-react"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { useFavorites } from "@/context/favorites-context"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const pathname = usePathname()
  const { favorites } = useFavorites()

  useEffect(() => {
    // Check if user prefers dark mode
    const isDark =
      localStorage.getItem("darkMode") === "true" || window.matchMedia("(prefers-color-scheme: dark)").matches

    setIsDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
    localStorage.setItem("darkMode", (!isDarkMode).toString())
  }

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/movie", label: "Movies" },
    { href: "/trending", label: "Trending" },
    { href: "/recommended", label: "Recommended" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <Link href="/home" className="mr-6 flex items-center space-x-2">
          <span className="font-bold text-2xl">MovieRec</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button variant={pathname === link.href ? "secondary" : "ghost"} className="text-sm">
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href="/favorites">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>

          <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button variant={pathname === link.href ? "secondary" : "ghost"} className="w-full justify-start">
                      {link.label}
                    </Button>
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
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
        </div>
      </div>
    </header>
  )
}

