import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const EmailInput = z.object({
  purpose: z.string().min(1),
  audience: z.string().default(""),
  tone: z.string().default("Professional"),
  keyPoints: z.string().default(""),
});

const MeetingInput = z.object({
  title: z.string().default(""),
  notes: z.string().min(1),
});

const PlanInput = z.object({
  goal: z.string().min(1),
  deadline: z.string().default(""),
  priority: z.string().default("Medium"),
  context: z.string().default(""),
});

async function run(system: string, prompt: string) {
  const { generateAiText } = await import("./ai.server");
  return generateAiText(system, prompt);
}

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => EmailInput.parse(input))
  .handler(async ({ data }) =>
    run(
      "Role: Professional workplace email assistant. Goal: generate a clear, concise email. Output: a Subject line followed by the email body. Plain text only, no markdown fences.",
      `Purpose: ${data.purpose}\nRecipient/Audience: ${data.audience}\nTone: ${data.tone}\nKey points:\n${data.keyPoints}`,
    ),
  );

export const summarizeMeeting = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => MeetingInput.parse(input))
  .handler(async ({ data }) =>
    run(
      "Role: Meeting intelligence assistant. Analyze raw meeting notes and return, as plain text sections: 1. Executive summary 2. Key decisions 3. Action items 4. Owners 5. Follow-up questions.",
      `Meeting title: ${data.title}\nRaw notes:\n${data.notes}`,
    ),
  );

export const createTaskPlan = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => PlanInput.parse(input))
  .handler(async ({ data }) =>
    run(
      "Role: Workplace project planning assistant. Break the objective into an ordered, actionable task plan with milestones, prioritized by urgency and dependency. Plain text, numbered tasks with suggested owner and timing.",
      `Goal: ${data.goal}\nDeadline: ${data.deadline}\nPriority: ${data.priority}\nAdditional context: ${data.context}`,
    ),
  );