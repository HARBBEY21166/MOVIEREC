"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Film, Ticket } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // First try direct API call to see response
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const data = await response.json()
        setError(data.error || "Invalid email or password")
        setIsLoading(false)
        return
      }

      // If direct API call succeeded, use the auth context
      const success = await login(email, password)
      if (success) {
        router.push("/home")
      } else {
        setError("Invalid email or password")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-4">
      {/* Background elements - ticket stubs pattern */}
      <div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute transform rotate-12"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Ticket size={64} className="text-[#facc15]" />
          </div>
        ))}
      </div>
      
      <Card className="w-full max-w-md border-4 bg-[#facc15] shadow-2xl bg-white">
        <div className="bg-blue-800 py-6 px-4 text-center rounded-t-sm">
          <div className="w-16 h-16 mx-auto mb-2 bg-yellow-400 rounded-full flex items-center justify-center">
            <Film size={32} className="text-blue-800" />
          </div>
          <h1 className="text-3xl font-black text-[#facc15] tracking-wide uppercase">MovieRec</h1>
          <p className="text-yellow-200 text-sm font-medium mt-1">Your personal movie recommendation system</p>
        </div>
        
        <CardHeader className="pt-6">
          <CardTitle className="text-2xl text-[#0F172A] font-bold">Welcome Back</CardTitle>
          <CardDescription className="text-[#0F172A]">Sign in to discover your next favorite movie</CardDescription>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="bg-red-50 border-red-400 text-red-800">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#0F172A]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-800">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border-blue-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#0F172A] font-bold py-2 px-4" 
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Access My Account"}
            </Button>
          </form>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t border-blue-100 pt-4">
          <p className="text-sm text-[#0F172A]">
            Dont have an account?{" "}
            <Link href="/signup" className="text-[#facc15] font-bold hover:text-yellow-600 hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
