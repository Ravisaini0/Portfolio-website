"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { API_BASE_URL } from "@/lib/api"

export default function AdminPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          password
        })
      })

      const data = await res.json()

      if (res.ok) {

        localStorage.setItem("token", data.token)

        setMessage("Login successful")

        window.location.href = "/admin/dashboard"

      } else {
        setMessage(data.message ?? "Login failed")
      }

    } catch (error) {
      setMessage("Server error. Please check backend is running.")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-black px-4 text-white">
      <a
        href="/"
        className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-purple-500/50 px-4 py-2 text-sm text-purple-100 transition hover:bg-purple-500/10"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to website
      </a>

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-2xl w-[350px] space-y-4 border border-purple-500"
      >

        <h1 className="text-3xl font-bold text-center text-purple-400">
          Admin Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 rounded bg-zinc-800 outline-none"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded bg-zinc-800 outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded font-bold"
        >
          Login
        </button>

        <p className="text-center text-sm text-red-400">
          {message}
        </p>

      </form>

    </div>
  )
}
