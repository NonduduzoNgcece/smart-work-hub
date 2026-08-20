import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { AiToolShell, Field, inputClass } from "@/components/AiToolShell";
import { createTaskPlan } from "@/lib/ai.functions";

const DESCRIPTION =
  "Transform a high-level goal into a practical sequence of actionable workplace tasks.";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner | AI Workplace Assistant" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "AI Task Planner | AI Workplace Assistant" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const run = useServerFn(createTaskPlan);
  const [goal, setGoal] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("High");
  const [context, setContext] = useState("");

  return (
    <AppLayout title="AI Task Planner" subtitle="Break large goals into tasks">
      <AiToolShell
        heading="AI Task Planner"
        description={DESCRIPTION}
        actionLabel="Create Task Plan"
        outputTitle="AI Task Plan"
        outputSubtitle="Edit or refine the plan before adopting it"
        placeholder="Your ordered task plan will appear here."
        promptPreview={`Role: Workplace project planning assistant\nGoal: Break objective into actionable tasks\nPriority: ${priority}\nPrioritize by urgency and dependency\nOutput: Ordered task plan with milestones`}
        fields={
          <>
            <Field label="Goal">
              <input
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                placeholder="e.g. Launch the new onboarding process"
                className={inputClass}
              />
            </Field>
            <Field label="Deadline">
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Priority">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={inputClass}
              >
                {["High", "Medium", "Low"].map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </Field>
            <Field label="Additional context">
              <textarea
                value={context}
                onChange={(e) => setContext(e.target.value)}
                placeholder="Team size, constraints, dependencies…"
                className={`${inputClass} min-h-[110px] resize-y`}
              />
            </Field>
          </>
        }
        onGenerate={async () => {
          if (!goal.trim()) throw new Error("Describe your goal first");
          return run({ data: { goal, deadline, priority, context } });
        }}
      />
    </AppLayout>
  );
}