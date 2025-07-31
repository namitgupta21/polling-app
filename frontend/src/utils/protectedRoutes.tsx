import React from "react"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const token = JSON.parse(localStorage.getItem("user") || "{}").token

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
