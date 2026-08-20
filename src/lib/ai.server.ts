import { streamText } from "ai";
import { createLovableAiGatewayProvider } from "./ai-gateway.server";

export async function generateAiText(system: string, prompt: string): Promise<string> {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("Missing LOVABLE_API_KEY");

  const gateway = createLovableAiGatewayProvider(key);
  const result = streamText({
    model: gateway("google/gemini-3.7-flash"),
    system,
    prompt,
  });

  try {
    return await result.text;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (message.includes("429")) throw new Error("Rate limit reached. Please try again shortly.");
    if (message.includes("402")) throw new Error("AI credits exhausted. Add credits in Lovable to continue.");
    throw new Error(`AI request failed: ${message}`);
  }
}