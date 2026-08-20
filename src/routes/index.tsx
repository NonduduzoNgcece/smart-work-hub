import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckSquare, Mail, NotebookPen, Sparkles } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { TaskManager } from "@/components/TaskManager";
import { useTasks } from "@/lib/tasks";

const DESCRIPTION =
  "Dashboard for your AI workplace assistant: tasks, smart emails, meeting summaries and AI task plans.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard | AI Workplace Productivity Assistant" },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: "Dashboard | AI Workplace Productivity Assistant" },
      { property: "og:description", content: DESCRIPTION },
    ],
  }),
  component: Dashboard,
});

const QUICK = [
  { to: "/email", icon: Mail, title: "Smart Email", copy: "Draft clear professional emails." },
  { to: "/meetings", icon: NotebookPen, title: "Meeting Notes", copy: "Turn notes into concise summaries." },
  { to: "/planner", icon: Sparkles, title: "Task Planner", copy: "Break large goals into tasks." },
  { to: "/tasks", icon: CheckSquare, title: "Task Manager", copy: "Organize your daily workload." },
] as const;

function Dashboard() {
  const { tasks } = useTasks();
  const completed = tasks.filter((t) => t.completed).length;

  const stats = [
    { label: "Total Tasks", value: tasks.length },
    { label: "Completed", value: completed },
    { label: "In Progress", value: tasks.length - completed },
    { label: "AI Tools", value: 3 },
  ];

  return (
    <AppLayout title="Good day 👋" subtitle="Here's what's happening with your work today.">
      <section className="bg-hero mb-6 flex flex-col gap-5 rounded-2xl p-7 text-primary-foreground shadow-card md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Work smarter with AI.</h2>
          <p className="mt-2 max-w-xl text-sm opacity-90">
            Plan tasks, create professional emails, summarize meetings, and turn ideas into
            actionable workflows from one intelligent workspace.
          </p>
        </div>
        <div className="rounded-2xl border border-primary-foreground/20 bg-primary-foreground/15 p-4 text-center md:min-w-[140px]">
          <strong className="block text-3xl">{completed}</strong>
          <span className="text-[11px] opacity-90">Tasks completed</span>
        </div>
      </section>

      <section className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-card p-4 shadow-card">
            <small className="text-[11px] text-muted-foreground">{s.label}</small>
            <strong className="mt-2 block text-2xl text-foreground">{s.value}</strong>
          </div>
        ))}
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">Today's Tasks</h3>
            <p className="text-[11px] text-muted-foreground">Your most important work</p>
          </div>
          <TaskManager limit={5} />
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-foreground">AI Productivity Tools</h3>
            <p className="text-[11px] text-muted-foreground">Automate repetitive work</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {QUICK.map(({ to, icon: Icon, title, copy }) => (
              <Link
                key={to}
                to={to}
                className="rounded-xl border border-border bg-surface-2 p-4 transition hover:-translate-y-0.5 hover:border-primary/50"
              >
                <span className="mb-2 grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-4" />
                </span>
                <strong className="block text-xs text-foreground">{title}</strong>
                <span className="mt-1 block text-[10px] leading-snug text-muted-foreground">
                  {copy}
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
