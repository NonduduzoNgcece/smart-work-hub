import { useState } from "react";
import { Trash2 } from "lucide-react";
import { CATEGORIES, useTasks } from "@/lib/tasks";
import { inputClass } from "./AiToolShell";

export function TaskManager({ limit }: { limit?: number }) {
  const { tasks, addTask, toggleTask, deleteTask } = useTasks();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);

  const visible = limit ? tasks.slice(0, limit) : tasks;

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTask(title, category);
          setTitle("");
        }}
        className="mb-4 grid gap-2 sm:grid-cols-[1fr_150px_auto]"
      >
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What needs to get done?"
          className={inputClass}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputClass}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90"
        >
          Add Task
        </button>
      </form>

      {visible.length === 0 ? (
        <p className="py-8 text-center text-xs text-muted-foreground">
          No tasks yet. Add your first task above.
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {visible.map((task) => (
            <li
              key={task.id}
              className="flex items-center gap-3 rounded-xl border border-border p-3 transition hover:border-primary/40"
            >
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="size-4 accent-primary"
                aria-label={`Complete ${task.title}`}
              />
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate text-sm font-medium ${
                    task.completed ? "text-muted-foreground line-through" : "text-foreground"
                  }`}
                >
                  {task.title}
                </p>
                <span className="mt-1 inline-block rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                  {task.category}
                </span>
              </div>
              <button
                onClick={() => deleteTask(task.id)}
                aria-label={`Delete ${task.title}`}
                className="text-muted-foreground transition hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}