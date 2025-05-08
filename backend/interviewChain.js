const { ChatOpenAI } = require('@langchain/openai');
const { ChatPromptTemplate } = require('@langchain/core/prompts');
require('dotenv').config();

const model = new ChatOpenAI({
  temperature: 0.7,
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: 'gpt-3.5-turbo',
});

const questionPrompt = ChatPromptTemplate.fromTemplate(`
You're a professional job interviewer. 
Ask one relevant behavioral or technical interview question for a role as a {jobRole}.
Make it concise and clear.
`);

const feedbackPrompt = ChatPromptTemplate.fromTemplate(`
You are a professional career advisor and plagiarism checker. Evaluate the candidate's answer below:

Question: {question}

Candidate's Answer: {answer}

Your job is to:
1. Analyze the overall quality, clarity, and relevance of the answer.
2. Determine whether the answer appears to be original (human-written) or potentially copied or generated using AI or from the internet.
3. Justify your assessment in the feedback if the answer shows signs of being copied or generic.

Then follow this exact format:

Feedback: [Brief summary of strengths and weaknesses. Clearly state whether the answer appears to be original or copied — and explain why.]
Grade: [Numeric grade from 0 (very bad) to 10 (excellent)]
Improvement Points:
- [Improvement 1]
- [Improvement 2]
- [Improvement 3] (add more based on the rules below)

Rules:
- If the grade is between 5 and 9, give at least 2–3 improvement points.
- If the grade is less than 5, give at least 4–5 improvement points.
- If the grade is 10, write "Improvement Points: None".
`);

const questionChain = questionPrompt.pipe(model);
const feedbackChain = feedbackPrompt.pipe(model);

module.exports = { questionChain, feedbackChain };