import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { TaskManager } from "@/components/TaskManager";

const DESCRIPTION =
  "Capture, categorize and complete your workplace tasks in one focused workspace.";

export const Route = createFileRoute("/tasks")({
  head: () => ({
    meta: [
      { title: "My Tasks | AI Workplace Productivity Assistant" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "My Tasks | AI Workplace Productivity Assistant" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: TasksPage,
});

function TasksPage() {
  return (
    <AppLayout title="My Tasks" subtitle="Organize your daily workload">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">My Tasks</h2>
        <p className="mt-1 text-sm text-muted-foreground">{DESCRIPTION}</p>
      </div>
      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <TaskManager />
      </section>
    </AppLayout>
  );
}