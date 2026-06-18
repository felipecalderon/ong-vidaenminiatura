import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GPT_KEY,
});

export default openai;
