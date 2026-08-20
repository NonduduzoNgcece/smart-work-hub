import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { AiToolShell, Field, inputClass } from "@/components/AiToolShell";
import { generateEmail } from "@/lib/ai.functions";

const DESCRIPTION =
  "Generate polished workplace emails using structured AI prompts, then edit before sending.";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator | AI Workplace Assistant" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Smart Email Generator | AI Workplace Assistant" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  const run = useServerFn(generateEmail);
  const [purpose, setPurpose] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [keyPoints, setKeyPoints] = useState("");

  return (
    <AppLayout title="Smart Email" subtitle="Draft clear professional emails">
      <AiToolShell
        heading="Smart Email Generator"
        description={DESCRIPTION}
        actionLabel="Generate Email"
        outputTitle="Generated Email"
        outputSubtitle="Fully editable before use"
        placeholder="Your generated email will appear here. You can edit it before copying."
        promptPreview={`Role: Professional workplace email assistant\nGoal: Generate a clear and concise email\nTone: ${tone}\nOutput: Subject + email body`}
        fields={
          <>
            <Field label="Email purpose">
              <input
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Request a project deadline extension"
                className={inputClass}
              />
            </Field>
            <Field label="Recipient / audience">
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g. Operations manager"
                className={inputClass}
              />
            </Field>
            <Field label="Tone">
              <select value={tone} onChange={(e) => setTone(e.target.value)} className={inputClass}>
                {["Professional", "Friendly", "Concise", "Persuasive", "Formal"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <Field label="Key points">
              <textarea
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
                placeholder="Bullet the details the email must cover"
                className={`${inputClass} min-h-[110px] resize-y`}
              />
            </Field>
          </>
        }
        onGenerate={async () => {
          if (!purpose.trim()) throw new Error("Add an email purpose first");
          return run({ data: { purpose, audience, tone, keyPoints } });
        }}
      />
    </AppLayout>
  );
}