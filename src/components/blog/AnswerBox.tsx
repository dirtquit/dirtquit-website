import { CheckCircle2, Sparkles } from "lucide-react";

interface AnswerBoxProps {
  quickAnswer: string;
  keyTakeaways: string[];
}

export function AnswerBox({ quickAnswer, keyTakeaways }: AnswerBoxProps) {
  return (
    <section
      aria-label="Quick Answer and Key Takeaways"
      className="my-8 overflow-hidden rounded-2xl border-2 border-primary/25 bg-linear-to-br from-secondary/60 via-background to-secondary/30 p-6 shadow-sm md:p-8"
    >
      {/* Direct Answer Badge & Heading */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
        <Sparkles className="size-4 animate-pulse text-primary" />
        <span>Quick Answer (Above the Fold)</span>
      </div>

      <p className="mt-3 text-base font-medium leading-relaxed text-foreground md:text-lg">
        {quickAnswer}
      </p>

      {/* Key Takeaways Box */}
      {keyTakeaways && keyTakeaways.length > 0 && (
        <div className="mt-6 border-t border-border/80 pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
            Key Takeaways & Quick Highlights
          </h3>
          <ul className="mt-3.5 space-y-2.5">
            {keyTakeaways.map((takeaway, index) => (
              <li key={index} className="flex items-start gap-3 text-sm text-foreground/90">
                <CheckCircle2 className="mt-0.5 size-4.5 shrink-0 text-emerald-600" />
                <span className="leading-snug">{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
