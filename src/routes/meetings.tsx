import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { AiToolShell, Field, inputClass } from "@/components/AiToolShell";
import { summarizeMeeting } from "@/lib/ai.functions";

const DESCRIPTION =
  "Convert raw meeting notes into structured summaries, decisions, action items and follow-ups.";

export const Route = createFileRoute("/meetings")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer | AI Workplace Assistant" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Meeting Notes Summarizer | AI Workplace Assistant" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: MeetingsPage,
});

function MeetingsPage() {
  const run = useServerFn(summarizeMeeting);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  return (
    <AppLayout title="Meeting Notes" subtitle="Turn notes into concise summaries">
      <AiToolShell
        heading="Meeting Notes Summarizer"
        description={DESCRIPTION}
        actionLabel="Summarize Meeting"
        outputTitle="Meeting Summary"
        outputSubtitle="Edit the result as needed"
        placeholder="Your structured meeting summary will appear here."
        promptPreview={
          "Role: Meeting intelligence assistant\nTask: Analyze raw notes\nReturn:\n1. Executive summary\n2. Key decisions\n3. Action items\n4. Owners\n5. Follow-up questions"
        }
        fields={
          <>
            <Field label="Meeting title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Q3 planning sync"
                className={inputClass}
              />
            </Field>
            <Field label="Raw notes">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Paste your unstructured meeting notes here"
                className={`${inputClass} min-h-[220px] resize-y`}
              />
            </Field>
          </>
        }
        onGenerate={async () => {
          if (!notes.trim()) throw new Error("Paste some meeting notes first");
          return run({ data: { title, notes } });
        }}
      />
    </AppLayout>
  );
}