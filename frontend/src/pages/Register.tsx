// src/pages/Register.tsx
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useNavigate } from "react-router-dom";
import Navbar from "../components/ui/navbar"

export default function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("")
    setSuccess("")

    try {
      const res = await fetch("http://localhost:7778/userroutes/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || "Registration failed")
      } else {
        setSuccess("User registered successfully!")
        setEmail("")
        setPassword("")
        setName("")
        setTimeout(() => navigate("/login"), 1000)
      }
    } catch (err) {
      setError("An error occurred while registering")
    }
  }
  return (<>
  
    <Navbar />

    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm space-y-4">
      <h2 className="text-2xl font-semibold">Register</h2>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="xyz@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" type="string" placeholder="xyz" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-600 text-sm">{success}</p>}
      <Button className="w-full mt-4" onClick={handleRegister}>Register</Button>
    </div>
    </>
  )
}
