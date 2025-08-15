import express from 'express'
const router = express.Router()
import Poll from '../models/poll-model.js'
import verifyToken from "../middleware/verifyToken.js"

// GET all polls
router.get('/',verifyToken, async (req, res) => {
  try {
    const polls = await Poll.find()
    res.json(polls)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch polls' })
  }
})

// POST create a new poll
router.post('/',verifyToken, async (req, res) => {
  try {
    const { question, options } = req.body

    if (!question || !Array.isArray(options) || options.length < 2) {
      return res.status(400).json({ error: 'Invalid poll data' })
    }

    const newPoll = new Poll({ question, options })
    const savedPoll = await newPoll.save()

    res.status(201).json(savedPoll)
  } catch (err) {
    res.status(500).json({ error: 'Failed to create poll' })
  }
})

// POST vote for an option in a poll
router.post('/:id/vote', verifyToken, async (req, res) => {
  try {
    const { optionIndex } = req.body;
    const userEmail = req.user.email; // from verifyToken middleware

    const poll = await Poll.findById(req.params.id);

    if (!poll || !poll.options[optionIndex]) {
      return res.status(404).json({ error: 'Poll or option not found' });
    }

    // Check if user already voted
    if (poll.votedUsers.includes(userEmail)) {
      return res.status(400).json({ error: 'You have already voted' });
    }

    // Record vote
    poll.options[optionIndex].votes += 1;
    poll.votedUsers.push(userEmail);

    const updatedPoll = await poll.save();
    res.json(updatedPoll);

  } catch (err) {
    res.status(500).json({ error: 'Failed to cast vote' });
  }
});


export default router