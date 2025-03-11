/*"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SuccessAlert, SuccessAlertDescription, SuccessAlertTitle } from "@/components/ui/success-alert"
import { Film, Ticket } from "lucide-react"

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  // Redirect to login page after successful signup
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/")
      }, 3000) // Redirect after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [success, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
  
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
  
    setIsLoading(true)
  
    try {
      // Use the signup function from the auth context
      const isSuccessful = await signup(firstName, lastName, email, password)
  
      if (!isSuccessful) {
        setError("Failed to create account")
        return
      }
  
      // Show success message
      setSuccess(true)
      // Clear form
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (err) {
      console.error("Signup error:", err)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0F172A] p-4">
      {/* Background elements - ticket stubs pattern */}
      /*<div className="absolute inset-0 opacity-10 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute transform rotate-12"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <Ticket size={64} className="text-yellow-400" />
          </div>
        ))}
      </div>
      
      <Card className="w-full max-w-md border-4 border-yellow-400 shadow-2xl bg-white">
        <div className="bg-[#0F172A] py-6 px-4 text-center rounded-t-sm">
          <div className="w-16 h-16 mx-auto mb-2 bg-yellow-400 rounded-full flex items-center justify-center">
            <Film size={32} className="text-bg-[#0F172A]" />
          </div>
          <h1 className="text-3xl font-black text-yellow-400 tracking-wide uppercase">MovieRec</h1>
          <p className="text-yellow-200 text-sm font-medium mt-1">Your personal movie recommendation system</p>
        </div>
        
        <CardHeader className="pt-6">
          <CardTitle className="text-2xl text-[#0F172A] font-bold">Create an account</CardTitle>
          <CardDescription className="text-[#0F172A]">Enter your details to start your movie journey</CardDescription>
        </CardHeader>
        
        <CardContent>
          {success ? (
            <SuccessAlert className="mb-4 bg-[#0F172A] border-[#0F172A] text-[#0F172A]">
              <SuccessAlertTitle>Account created successfully!</SuccessAlertTitle>
              <SuccessAlertDescription>
                Your MovieRec account has been created. You will be redirected to the login page in a few seconds.
              </SuccessAlertDescription>
            </SuccessAlert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-400 text-red-800">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#0F172A]">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                    className="border-[#0F172A] focus:border-[#0F172A] focus:ring-[#0F172A]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#0F172A]">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required 
                    className="border-[#0F172A] focus:border-[#0F172A] focus:ring-[#0F172A]"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0F172A]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#0F172A] focus:border-[#0F172A] focus:ring-[#0F172A]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#0F172A]">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#0F172A] focus:border-[#0F172A] focus:ring-[#0F172A]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#0F172A]-800">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-[#0F172A] focus:border-[#0F172A] focus:ring-[#0F172A]"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-[#0F172A] font-bold py-2 px-4" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Become a Member"}
              </Button>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center border-t border-[#0F172A] pt-4">
          <p className="text-sm text-[#0F172A]">
            Already a member?{" "}
            <Link href="/" className="text-[#0F172A] font-bold hover:text-yellow-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}*/


    "use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { SuccessAlert, SuccessAlertDescription, SuccessAlertTitle } from "@/components/ui/success-alert"
import { Film, Ticket } from "lucide-react"

export default function SignupPage() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)
  const { signup } = useAuth()
  const router = useRouter()

  // Redirect to login page after successful signup
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push("/")
      }, 3000) // Redirect after 3 seconds

      return () => clearTimeout(timer)
    }
  }, [success, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
  
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }
  
    setIsLoading(true)
  
    try {
      // Use the signup function from the auth context
      const isSuccessful = await signup(firstName, lastName, email, password)
  
      if (!isSuccessful) {
        setError("Failed to create account")
        return
      }
  
      // Show success message
      setSuccess(true)
      // Clear form
      setFirstName("")
      setLastName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
    } catch (err) {
      console.error("Signup error:", err)
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
      
      <Card className="w-full max-w-md border-4 border-[#facc15] shadow-2xl bg-white">
        <div className="bg-[#0F172A] py-6 px-4 text-center rounded-t-sm">
          <div className="w-16 h-16 mx-auto mb-2 bg-[#facc15] rounded-full flex items-center justify-center">
            <Film size={32} className="text-[#0F172A]" />
          </div>
          <h1 className="text-3xl font-black text-[#facc15] tracking-wide uppercase">MovieRec</h1>
          <p className="text-[#facc15] text-sm font-medium mt-1">Your personal movie recommendation system</p>
        </div>
        
        <CardHeader className="pt-6">
          <CardTitle className="text-2xl text-[#0F172A] font-bold">Create an account</CardTitle>
                    <CardDescription className="text-[#0F172A]">Enter your details to start your movie journey</CardDescription>
        </CardHeader>
        
        <CardContent>
          {success ? (
            <SuccessAlert className="mb-4 bg-[#0F172A] border-[#0F172A] text-[#facc15]">
              <SuccessAlertTitle>Account created successfully!</SuccessAlertTitle>
              <SuccessAlertDescription>
                Your MovieRec account has been created. You will be redirected to the login page in a few seconds.
              </SuccessAlertDescription>
            </SuccessAlert>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive" className="bg-red-50 border-red-400 text-red-800">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-[#0F172A]">First Name</Label>
                  <Input 
                    id="firstName" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    required 
                    className="border-gray-700 focus:border-gray-700 focus:ring-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-[#0F172A]">Last Name</Label>
                  <Input 
                    id="lastName" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    required 
                    className="border-gray-700 focus:border-gray-700 focus:ring-gray-700"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#0F172A]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-gray-700 focus:border-gray-700 focus:ring-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[#0F172A]">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-gray-700 focus:border-gray-700 focus:ring-gray-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-[#0F172A]">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="border-gray-700 focus:border-gray-700 focus:ring-gray-700"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#facc15] hover:bg-yellow-500 text-[#0F172A] font-bold py-2 px-4" 
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Become a Member"}
              </Button>
            </form>
          )}
        </CardContent>
        
        <CardFooter className="flex justify-center border-t border-gray-700 pt-4">
          <p className="text-sm text-[#0F172A]">
            Already a member?{" "}
            <Link href="/" className="text-[#0F172A] font-bold hover:text-yellow-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
