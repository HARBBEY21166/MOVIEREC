"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Film, Heart, Menu, Moon, Search, Sun, User, Ticket } from "lucide-react"
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
    { href: "/home", label: "Home", icon: <Film className="h-4 w-4 mr-2" /> },
    { href: "/trending", label: "Trending", icon: <Ticket className="h-4 w-4 mr-2" /> },
    { href: "/recommended", label: "Recommended", icon: <Heart className="h-4 w-4 mr-2" /> },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-blue-700 bg-blue-800 text-white backdrop-blur supports-[backdrop-filter]:bg-blue-800/95">
      <div className="container flex h-16 items-center">
        <Link href="/home" className="mr-6 flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
            <Film className="h-5 w-5 text-blue-800" />
          </div>
          <span className="font-black text-2xl uppercase tracking-wide text-yellow-400">MovieRec</span>
        </Link>

        <div className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button 
                variant={pathname === link.href ? "secondary" : "ghost"} 
                className={`text-sm flex items-center ${
                  pathname === link.href 
                    ? "bg-yellow-400 text-blue-900 hover:bg-yellow-500 hover:text-blue-900" 
                    : "text-white hover:bg-blue-700 hover:text-yellow-400"
                }`}
              >
                {link.icon}
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <Link href="/favorites">
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative text-white hover:bg-blue-700 hover:text-yellow-400"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-400 text-[10px] text-blue-900 font-bold">
                  {favorites.length}
                </span>
              )}
            </Button>
          </Link>

          <Link href="/search">
            <Button 
              variant="ghost" 
              size="icon"
              className="text-white hover:bg-blue-700 hover:text-yellow-400"
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleDarkMode}
            className="text-white hover:bg-blue-700 hover:text-yellow-400"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="md:hidden text-white hover:bg-blue-700 hover:text-yellow-400"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="border-l-4 border-yellow-400 bg-blue-800 text-white">
              <div className="flex items-center space-x-2 mb-8 mt-4">
                <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
                  <Film className="h-5 w-5 text-blue-800" />
                </div>
                <span className="font-black text-xl uppercase tracking-wide text-yellow-400">MovieRec</span>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href}>
                    <Button 
                      variant={pathname === link.href ? "secondary" : "ghost"} 
                      className={`w-full justify-start ${
                        pathname === link.href 
                          ? "bg-yellow-400 text-blue-900 hover:bg-yellow-500" 
                          : "text-white hover:bg-blue-700 hover:text-yellow-400"
                      }`}
                    >
                      {link.icon}
                      {link.label}
                    </Button>
                  </Link>
                ))}
                <hr className="border-blue-700 my-2" />
                <Link href="/">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-white hover:bg-blue-700 hover:text-yellow-400"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full text-white hover:bg-blue-700 hover:text-yellow-400"
              >
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="border-2 border-yellow-400 bg-blue-800 text-white">
              <DropdownMenuItem disabled className="text-gray-300">
                <span>Guest</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-blue-700 hover:text-yellow-400 cursor-pointer">
                <Link href="/" className="flex w-full">
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
