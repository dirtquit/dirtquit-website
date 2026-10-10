import { createFileRoute } from "@tanstack/react-router";
import { EmbeddedStudio, studioHead } from "@/components/studio/EmbeddedStudio";

export const Route = createFileRoute("/studio/$")({
  head: studioHead,
  component: EmbeddedStudio,
});
