const express = require('express');
const cors = require('cors');
const fs = require('fs');
const { questionChain, feedbackChain } = require('./interviewChain');

const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

// Generate interview question
app.post('/api/question', async (req, res) => {
  const { jobRole } = req.body;
  if (!jobRole) return res.status(400).json({ error: "jobRole is required." });

  try {
    const result = await questionChain.invoke({ jobRole });
    res.json({ question: result.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating question." });
  }
});

// Get feedback for the answer
app.post('/api/feedback', async (req, res) => {
  const { question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: "Question and answer are required." });
  }

  try {
    const result = await feedbackChain.invoke({ question, answer });
    res.json({ feedback: result.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error generating feedback." });
  }
});

app.post('/api/log-paste', (req, res) => {
  const { pastedText, question } = req.body;
  const logLine =
    `[${new Date().toISOString()}] Question: ${question || '[N/A]'}\nAnswer: ${pastedText}\n\n`;
  fs.appendFile('pasted_logs.txt', logLine, (err) => {
    if (err) return res.status(500).send('Failed to log paste');
    res.send('Logged');
  });
});

app.listen(port, () => {
  console.log(`Interview Assistant running at http://localhost:${port}`);
});