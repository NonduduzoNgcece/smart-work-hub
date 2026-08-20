import { useState, type ReactNode } from "react";
import { Copy, Loader2, RefreshCw, Sparkles } from "lucide-react";
import { toast } from "sonner";

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="mb-4">
      <label className="mb-2 block text-[11px] font-bold tracking-wide text-foreground uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}

export const inputClass =
  "w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground outline-none transition focus:border-primary focus:ring-3 focus:ring-primary/15";

export function AiToolShell({
  heading,
  description,
  fields,
  promptPreview,
  actionLabel,
  outputTitle,
  outputSubtitle,
  placeholder,
  onGenerate,
}: {
  heading: string;
  description: string;
  fields: ReactNode;
  promptPreview: string;
  actionLabel: string;
  outputTitle: string;
  outputSubtitle: string;
  placeholder: string;
  onGenerate: () => Promise<string>;
}) {
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    setLoading(true);
    try {
      const text = await onGenerate();
      setOutput(text);
      toast.success("AI draft ready — review before use");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Generation failed");
    } finally {
      setLoading(false);
    }
  };

  const copy = async () => {
    if (!output) return;
    await navigator.clipboard.writeText(output);
    toast.success("Copied to clipboard");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground">{heading}</h2>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{description}</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          {fields}

          <div className="rounded-xl border border-border bg-surface-2 p-3">
            <strong className="mb-1.5 block text-[10px] tracking-[0.08em] text-muted-foreground uppercase">
              Structured AI prompt
            </strong>
            <code className="block text-[11px] leading-relaxed whitespace-pre-wrap text-foreground">
              {promptPreview}
            </code>
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
          >
            {loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
            {loading ? "Generating…" : actionLabel}
          </button>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-foreground">{outputTitle}</h3>
            <p className="text-[11px] text-muted-foreground">{outputSubtitle}</p>
          </div>

          {output ? (
            <span className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-bold text-success">
              <span className="size-1.5 rounded-full bg-success" /> AI generated draft
            </span>
          ) : null}

          <textarea
            value={output}
            onChange={(e) => setOutput(e.target.value)}
            placeholder={placeholder}
            className={`${inputClass} min-h-[380px] resize-y leading-relaxed`}
          />

          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={copy}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface-2 px-3 py-2 text-xs font-bold text-foreground transition hover:bg-accent"
            >
              <Copy className="size-3.5" /> Copy
            </button>
            <button
              onClick={generate}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-bold text-primary-foreground transition hover:opacity-90 disabled:opacity-60"
            >
              <RefreshCw className="size-3.5" /> Regenerate
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}