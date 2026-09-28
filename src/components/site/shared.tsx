import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight, MessageCircle } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { selectBookingService, track, whatsappLink } from "@/lib/dirtquit";

export const actionVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 group cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-soft hover:bg-brand-dark hover:shadow-lift",
        outline:
          "border border-border bg-card text-foreground hover:border-primary hover:text-primary",
        whatsapp:
          "bg-[#25D366] text-white shadow-soft hover:bg-[#20bd5a] hover:shadow-lift hover:scale-[1.02] active:scale-[0.98]",
        "whatsapp-outline":
          "border border-[#25D366]/60 bg-card text-[#075E54] dark:text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] shadow-sm hover:shadow-soft hover:scale-[1.02] active:scale-[0.98]",
        navy: "bg-navy text-white hover:bg-navy-soft shadow-soft",
        ghost: "text-foreground hover:text-primary",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-13 sm:h-14 px-7 text-base font-bold",
        sm: "h-9 px-4 text-xs sm:text-sm",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function Action({
  className,
  variant,
  size,
  asChild,
  ...props
}: React.ComponentProps<"a"> & VariantProps<typeof actionVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "a";
  return <Comp className={cn(actionVariants({ variant, size }), className)} {...props} />;
}

export function Arrow() {
  return (
    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1 shrink-0" />
  );
}

export function BookButton({
  label = "Book a Cleaning",
  source,
  service,
  onClick,
  ...rest
}: {
  label?: string;
  source: string;
  service?: string;
} & React.ComponentProps<typeof Action>) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    track("book_cleaning_click", { source, service });
    if (service) {
      e.preventDefault();
      selectBookingService(service);
    }
    onClick?.(e);
  };

  return (
    <Action href="#book" onClick={handleClick} {...rest}>
      {label}
      <Arrow />
    </Action>
  );
}

export function WhatsAppButton({
  label = "WhatsApp Us",
  message,
  source,
  variant = "whatsapp",
  onClick,
  children,
  ...rest
}: {
  label?: string;
  message?: string;
  source: string;
} & React.ComponentProps<typeof Action>) {
  return (
    <Action
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      onClick={(e) => {
        track("whatsapp_click", { source });
        onClick?.(e);
      }}
      {...rest}
    >
      <WhatsAppIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:scale-110" />
      {children || (label ? <span>{label}</span> : null)}
    </Action>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  tone?: "light" | "dark";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-bold uppercase tracking-[0.22em]",
            tone === "dark" ? "text-primary" : "text-primary",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 text-3xl font-extrabold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-white/75" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

export function Container({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)} {...props} />
  );
}
