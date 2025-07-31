//used for routing 
import { Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import AddPoll from "./pages/AddPoll"
import Home from "./pages/Home"
import ViewPolls from "./pages/ViewPolls"
import ProtectedRoute from "./utils/protectedRoutes"


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-poll" element={<ProtectedRoute><AddPoll /></ProtectedRoute>} />
        <Route path="/polls" element={<ProtectedRoute><ViewPolls /></ProtectedRoute>} />

      </Routes>
    </>
  )
}
