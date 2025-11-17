// Importeer OpenAI
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Prompt voor toets genereren
export async function generateTest(prompt: string, isPDF: boolean = false) {
  const systemPrompt = isPDF 
    ? `Extraheer tekst uit deze PDF-inhoud en genereer een toets met 10 vragen (mix multiple choice en open). Output als JSON: {questions: [{question: string, type: string, correctAnswer: string}]}`
    : `Genereer een toets over dit onderwerp: ${prompt} met 10 vragen (mix multiple choice en open). Output als JSON: {questions: [{question: string, type: string, correctAnswer: string}]}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: prompt }],
  });

  return JSON.parse(response.choices[0].message.content);
}

// Prompt voor toets nakijken
export async function gradeAttempt(test: any, answers: any) {
  const systemPrompt = `Kijk deze antwoorden na voor de toets ${JSON.stringify(test)} met antwoorden ${JSON.stringify(answers)}. Geef score en feedback. Output als JSON: {score: number, feedback: string}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'system', content: systemPrompt }],
  });

  return JSON.parse(response.choices[0].message.content);
}
