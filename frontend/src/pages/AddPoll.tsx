import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import Navbar from "../components/ui/navbar"
import axios from 'axios'
import BASE_URL from '../utils/api'

export default function AddPoll() {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState(["", ""]) // Start with 2 empty options

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...options]
    updatedOptions[index] = value
    setOptions(updatedOptions)
  }

  const addOption = () => {
    if (options.length < 5) setOptions([...options, ""]) // Max 5 options
  }

  const removeOption = (index: number) => {
    if (options.length > 2) {
      const updatedOptions = options.filter((_, i) => i !== index)
      setOptions(updatedOptions)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const filteredOptions = options.filter((opt) => opt.trim() !== '')
  if (!question.trim() || filteredOptions.length < 2) {
    alert('Please enter a question and at least 2 options.')
    return
  }

  const payload = {
    question,
    options: filteredOptions.map((text) => ({ text, votes: 0 })),
  }

  try {
    const token = JSON.parse(localStorage.getItem("user") || "{}").token

const res = await axios.post(BASE_URL, payload, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
    console.log('Poll created:', res.data)

    // Reset form
    setQuestion('')
    setOptions(['', ''])
    alert('✅ Poll created successfully!')
  } catch (err) {
    console.error('Failed to create poll:', err)
    alert('❌ Failed to create poll.')
  }
}

  return (
    <>
    <Navbar />
    
    <div className="max-w-xl mx-auto mt-10 p-6 space-y-4 border rounded-xl shadow">
      <h2 className="text-2xl font-semibold">Create a New Poll</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="question">Question</Label>
          <Input
            id="question"
            placeholder="Enter your poll question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          {options.map((option, index) => (
            <div key={index} className="flex gap-2 items-center">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              {options.length > 2 && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeOption(index)}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}
          {options.length < 5 && (
            <Button type="button" size="sm" onClick={addOption}>
              + Add Option
            </Button>
          )}
        </div>

        <Button type="submit" className="w-full mt-4">
          Create Poll
        </Button>
      </form>
    </div>
    </>
  )
}
