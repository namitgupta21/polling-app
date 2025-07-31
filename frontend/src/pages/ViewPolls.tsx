import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Navbar from "../components/ui/navbar"

interface Option {
  text: string
  votes: number
}

interface Poll {
  _id: string
  question: string
  options: Option[]
}

export default function ViewPolls() {
  const [polls, setPolls] = useState<Poll[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPolls = async () => {
  const token = JSON.parse(localStorage.getItem("user") || "{}").token

  try {
    const res = await fetch("http://localhost:7778/pollroutes", {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })

    if (!res.ok) throw new Error("Failed to fetch polls")

    const data = await res.json()
    setPolls(data)
  } catch (err) {
    console.error("Failed to fetch polls", err)
  } finally {
    setLoading(false)
  }
}

  const handleVote = async (pollId: string, optionIndex: number) => {
  const token = JSON.parse(localStorage.getItem("user") || "{}").token

  try {
    const res = await fetch(`http://localhost:7778/pollroutes/${pollId}/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ optionIndex }),
    })

    if (!res.ok) throw new Error("Vote failed")

    fetchPolls()
  } catch (err) {
    console.error("Failed to vote", err)
  }
}

  useEffect(() => {
    fetchPolls()
  }, [])

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-10 space-y-6 p-4">
        <h2 className="text-2xl font-bold">Live Polls</h2>

        {loading ? (
          <p>Loading polls...</p>
        ) : polls.length === 0 ? (
          <p>No polls available.</p>
        ) : (
          polls.map((poll) => (
            <div key={poll._id} className="border p-4 rounded-lg shadow space-y-3">
              <h3 className="text-lg font-semibold">{poll.question}</h3>
              <div className="space-y-2">
                {poll.options.map((option, index) => (
                  <div key={index} className="flex items-center justify-between gap-2">
                    <span>{option.text}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">{option.votes} votes</span>
                      <Button size="sm" onClick={() => handleVote(poll._id, index)}>
                        Vote
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  )
}
