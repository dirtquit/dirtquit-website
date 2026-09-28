import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "light" | "dark";
}

export function Logo({ className, variant = "light" }: LogoProps) {
  return (
    <div className={cn("inline-flex items-center select-none", className)}>
      <img
        src="/logo.png"
        alt="Dirt Quit - Cleaner Spaces. Brighter Lives."
        className={cn(
          "h-full w-auto object-contain transition-all",
          variant === "dark" && "brightness-0 invert",
        )}
      />
    </div>
  );
}
