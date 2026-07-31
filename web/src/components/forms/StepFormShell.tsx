"use client";

type Props = {
  step: number;
  total: number;
  title: string;
  percentLabel: string;
  stepLabel: string;
  children: React.ReactNode;
};

export function StepFormShell({ step, total, title, percentLabel, stepLabel, children }: Props) {
  const percent = Math.round((step / total) * 100);

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-display mb-2 text-[clamp(1.75rem,4vw,2.5rem)] font-light text-ink">
        {title}
      </h1>
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between text-sm text-[var(--text-soft)]">
          <span>{stepLabel}</span>
          <span>{percentLabel.replace("{n}", String(percent))}</span>
        </div>
        <div className="h-px overflow-hidden bg-[var(--border-soft)]">
          <div
            className="h-full bg-olive transition-[width] duration-300 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
      {/* No Framer AnimatePresence — keeps medical forms snappy on low-end phones */}
      <div key={step} className="form-step-enter">
        {children}
      </div>
    </div>
  );
}
