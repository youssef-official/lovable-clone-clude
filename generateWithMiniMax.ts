import OpenAI from "openai";

// Initialize the OpenAI client.
// The baseURL is set to the MiniMax OpenAI-compatible endpoint.
// The API key will be read from the MINIMAX_API_KEY environment variable.
const openai = new OpenAI({
  baseURL: process.env.MINIMAX_BASE_URL || "https://api.minimax.io/v1",
  apiKey: process.env.MINIMAX_API_KEY,
});

interface CodeGenerationResult {
  success: boolean;
  code?: string;
  error?: string;
}

export async function generateCodeWithMiniMax(prompt: string): Promise<CodeGenerationResult> {
  if (!process.env.MINIMAX_API_KEY) {
    return {
      success: false,
      error: "MINIMAX_API_KEY environment variable is not set."
    };
  }

  try {
    // System prompt to guide the model to act as an expert software engineer
    const systemPrompt = "You are an expert software engineer. Your task is to generate a complete, self-contained code file based on the user's request. Only output the code, nothing else. Use the MiniMax-M2 model for best results.";

    const completion = await openai.chat.completions.create({
      model: "MiniMax-M2", // The model name for MiniMax M2
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.1,
      max_tokens: 4096,
    });

    const generatedCode = completion.choices[0].message.content;

    return {
      success: true,
      code: generatedCode,
    };

  } catch (error: any) {
    console.error("Error generating code with MiniMax:", error);
    return {
      success: false,
      error: error.message,
    };
  }
}
