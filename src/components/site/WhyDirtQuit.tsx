import { Building2, Calendar, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { Container, SectionHeading } from "./shared";

const FEATURES = [
  {
    number: "01",
    title: "Trained Professionals",
    desc: "Team members who care about the details, systematically trained in fabric safety, deep scrubbing, descaling, and high-touch surface hygiene.",
    icon: ShieldCheck,
    points: [
      "Uniformed & punctual crews",
      "Systematic room-by-room checklists",
      "Quality inspection before handover",
    ],
  },
  {
    number: "02",
    title: "Safe & Effective Cleaning",
    desc: "Industry-grade machines and material-appropriate cleaning solutions selected specifically for your tile, granite, upholstery, or wooden surfaces.",
    icon: Sparkles,
    points: [
      "No harsh caustic chemicals",
      "Fabric-safe extraction techniques",
      "Food-safe kitchen sanitization",
    ],
  },
  {
    number: "03",
    title: "Flexible Scheduling",
    desc: "Book a convenient slot that fits your personal schedule or corporate operational hours without disruption or prolonged waiting.",
    icon: Calendar,
    points: [
      "Morning & afternoon slots",
      "Weekend & holiday availability",
      "Prompt booking confirmations",
    ],
  },
  {
    number: "04",
    title: "Residential & Commercial Expertise",
    desc: "From compact 1 BHK city apartments and sprawling villas to fast-paced corporate offices, tech park floors, and retail showrooms.",
    icon: Building2,
    points: [
      "Tailored equipment for large spaces",
      "Complete move-in / handover cleans",
      "Dedicated commercial cleaning protocols",
    ],
  },
];

export function WhyDirtQuit() {
  return (
    <section id="why" className="relative section-pad overflow-hidden bg-navy text-white">
      {/* Subtle abstract geometric texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 size-[38rem] rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 -bottom-20 size-[38rem] rounded-full bg-primary/10 blur-3xl"
      />

      {/* Decorative Grid Lines */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:4rem_4rem]"
      />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          eyebrow="Why Choose Us"
          title={
            <>
              Cleaning Done Right.
              <br />
              <span className="text-primary">Without the Runaround.</span>
            </>
          }
          subtitle="We eliminate the uncertainty of local cleaners with trained professionals, professional-grade tools, and guaranteed focus on details."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div
              key={f.number}
              className="relative flex flex-col justify-between rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-white/[0.07] hover:-translate-y-1"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-black text-primary/80">
                    {f.number}
                  </span>
                  <div className="grid size-10 place-items-center rounded-xl bg-white/10 text-primary">
                    <f.icon className="size-5" />
                  </div>
                </div>

                <h3 className="mt-6 text-xl font-bold text-white tracking-tight">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{f.desc}</p>
              </div>

              <ul className="mt-6 space-y-2 border-t border-white/10 pt-4 text-xs text-white/80">
                {f.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-primary shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
