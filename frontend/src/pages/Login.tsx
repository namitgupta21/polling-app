// src/pages/Login.tsx
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Navbar from "../components/ui/navbar"

export default function Login() {
  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    setError("")

    try {
      const res = await fetch("http://localhost:7778/userroutes/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Login failed")
      } else {
        // Save login state (basic)
        localStorage.setItem("user", JSON.stringify({ token: data.token, email: data.email  }))
        navigate("/polls") // or wherever your viewpolls page is
      }
    } catch (err) {
      setError("An error occurred during login")
    }
  }

  return (
    <>
    <Navbar />
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm space-y-4">
      <h2 className="text-2xl font-semibold">Login</h2>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="you@example.com" onChange={(e) => setEmail(e.target.value)}/>
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" onChange={(e) => setPassword(e.target.value)}/>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}


      <Button className="w-full mt-4" onClick={handleLogin}>Log In</Button>
    </div>
    </>
  )
}
