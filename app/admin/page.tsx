"use client"

import { useState } from "react"

export default function AdminPage() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")

  const handleLogin = async (e: any) => {
    e.preventDefault()

    try {

      const res = await fetch("https://portfolio-website-backend-lzk3.onrender.com/auth/login", {
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

        setMessage("Login Successful ✅")

        window.location.href = "/admin/dashboard"

      } else {
        setMessage(data.message)
      }

    } catch (error) {
      setMessage("Server Error")
    }
  }

  return (

    <div className="min-h-screen flex items-center justify-center bg-black text-white">

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