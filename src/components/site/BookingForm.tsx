import {
  Calendar,
  CheckCircle2,
  Clock,
  Home,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { AREAS, BOOKING_SERVICES, PROPERTY_TYPES, track, whatsappLink } from "@/lib/dirtquit";
import { Arrow, Container, SectionHeading, WhatsAppButton } from "./shared";

const TIME_SLOTS = [
  "Morning (08:00 AM - 12:00 PM)",
  "Afternoon (12:00 PM - 04:00 PM)",
  "Evening (04:00 PM - 07:00 PM)",
  "Flexible / Anytime",
];

type FormState = {
  name: string;
  phone: string;
  whatsapp: string;
  sameAsPhone: boolean;
  service: string;
  propertyType: string;
  location: string;
  date: string;
  time: string;
  details: string;
};

interface BookingFormProps {
  initialService?: string;
  initialCity?: string;
  pagePath?: string;
}

export function BookingForm({
  initialService,
  initialCity = "Bengaluru",
  pagePath,
}: BookingFormProps = {}) {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    phone: "",
    whatsapp: "",
    sameAsPhone: true,
    service: initialService || "Deep Cleaning",
    propertyType: "2 BHK",
    location: "",
    date: "",
    time: "Morning (08:00 AM - 12:00 PM)",
    details: "",
  });

  const [hasStarted, setHasStarted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);

  // Sync if initialService prop changes
  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service: initialService }));
    }
  }, [initialService]);

  // Listen for service selection from service cards or BHK chips
  useEffect(() => {
    const handleServiceSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ service: string }>;
      if (!customEvent.detail?.service) return;
      const match = BOOKING_SERVICES.find((s) =>
        customEvent.detail.service.toLowerCase().includes(s.toLowerCase()),
      );
      if (match) {
        setFormData((prev) => ({ ...prev, service: match }));
      }
    };

    const handleAreaSelect = (e: Event) => {
      const customEvent = e as CustomEvent<{ area: string }>;
      if (customEvent.detail?.area) {
        setFormData((prev) => ({ ...prev, location: customEvent.detail.area }));
      }
    };

    window.addEventListener("dirtquit:select-service", handleServiceSelect);
    window.addEventListener("dirtquit:select-area", handleAreaSelect);

    return () => {
      window.removeEventListener("dirtquit:select-service", handleServiceSelect);
      window.removeEventListener("dirtquit:select-area", handleAreaSelect);
    };
  }, []);

  const currentPath = pagePath || (typeof window !== "undefined" ? window.location.pathname : "/");

  const handleFieldChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    if (!hasStarted) {
      setHasStarted(true);
      track("booking_form_start", {
        service: formData.service,
        city: initialCity,
        page_path: currentPath,
      });
    }
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "phone" && prev.sameAsPhone && typeof value === "string") {
        next.whatsapp = value;
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    track("booking_form_submit", {
      service: formData.service,
      propertyType: formData.propertyType,
      location: formData.location,
      city: initialCity,
      page_path: currentPath,
    });
    track("quote_request", {
      service: formData.service,
      location: formData.location,
      city: initialCity,
      page_path: currentPath,
    });

    setSubmittedData(formData);
    setSubmitted(true);
  };

  const getWhatsAppMessage = (data: typeof formData) => {
    return `Hi Dirt Quit, I would like to request a cleaning quote for ${data.service} in ${initialCity}:
• Name: ${data.name || "Customer"}
• Phone: ${data.phone || "Not provided"}
• Service: ${data.service}
• Property: ${data.propertyType}
• Locality: ${data.location}, ${initialCity}
• Preferred Date: ${data.date || "Next available"}
• Time Slot: ${data.time}
${data.details ? `• Details: ${data.details}` : ""}

Please confirm availability and share the quote!`;
  };

  return (
    <section
      id="book"
      className="section-pad bg-gradient-to-b from-secondary/30 via-background to-secondary/20"
    >
      <Container>
        <SectionHeading
          eyebrow="Fast & Easy"
          title="Need a Cleaner Space?"
          subtitle="Tell us what needs cleaning. We'll take it from there."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {submitted && submittedData ? (
            <div className="rounded-3xl border border-primary/30 bg-card p-8 sm:p-10 shadow-lift text-center animate-in zoom-in-95">
              <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-whatsapp/10 text-whatsapp">
                <CheckCircle2 className="size-10" />
              </div>
              <h3 className="mt-5 text-2xl sm:text-3xl font-extrabold text-navy">
                Cleaning Quote Request Received!
              </h3>
              <p className="mt-3 text-base text-muted-foreground max-w-lg mx-auto">
                Thank you, <strong className="text-navy">{submittedData.name}</strong>. Our team in
                Bengaluru has received your request for{" "}
                <strong className="text-primary">{submittedData.service}</strong> (
                {submittedData.propertyType}) in{" "}
                <strong className="text-navy">{submittedData.location}</strong>.
              </p>

              <div className="mt-8 rounded-2xl border border-border bg-secondary/40 p-5 text-left text-sm space-y-2 max-w-md mx-auto">
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-bold text-navy">{submittedData.service}</span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-muted-foreground">Property:</span>
                  <span className="font-bold text-navy">{submittedData.propertyType}</span>
                </div>
                <div className="flex justify-between border-b border-border/60 pb-2">
                  <span className="text-muted-foreground">Area:</span>
                  <span className="font-bold text-navy">{submittedData.location}, Bengaluru</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span className="font-bold text-navy">
                    {submittedData.date || "Next Available"} ({submittedData.time.split(" ")[0]})
                  </span>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={whatsappLink(getWhatsAppMessage(submittedData))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 text-sm font-bold text-white shadow-soft hover:brightness-95 transition-all"
                  onClick={() =>
                    track("whatsapp_click", { source: "booking_confirmation_forward" })
                  }
                >
                  <MessageCircle className="size-4 fill-white" />
                  Forward to WhatsApp for Instant Confirmation
                </a>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="w-full sm:w-auto rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-foreground hover:bg-secondary transition-colors"
                >
                  Request Another Service
                </button>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-border bg-card p-6 sm:p-10 shadow-lift">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name & Phone */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                      Your Name *
                    </label>
                    <div className="relative mt-2">
                      <User className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={formData.name}
                        onChange={(e) => handleFieldChange("name", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                      Phone Number *
                    </label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => handleFieldChange("phone", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* WhatsApp Number & Same checkbox */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                      WhatsApp Number
                    </label>
                    <label className="flex items-center gap-2 text-xs font-semibold text-muted-foreground cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.sameAsPhone}
                        onChange={(e) => {
                          const checked = e.target.checked;
                          handleFieldChange("sameAsPhone", checked);
                          if (checked) {
                            handleFieldChange("whatsapp", formData.phone);
                          }
                        }}
                        className="size-3.5 rounded text-primary focus:ring-primary"
                      />
                      Same as phone number
                    </label>
                  </div>
                  {!formData.sameAsPhone ? (
                    <div className="relative mt-2">
                      <MessageCircle className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <input
                        type="tel"
                        placeholder="WhatsApp contact"
                        value={formData.whatsapp}
                        onChange={(e) => handleFieldChange("whatsapp", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Service Dropdown & Property Type */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                      Service Required *
                    </label>
                    <div className="relative mt-2">
                      <Sparkles className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <select
                        required
                        value={formData.service}
                        onChange={(e) => handleFieldChange("service", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {BOOKING_SERVICES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                      Property Type *
                    </label>
                    <div className="relative mt-2">
                      <Home className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <select
                        required
                        value={formData.propertyType}
                        onChange={(e) => handleFieldChange("propertyType", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {PROPERTY_TYPES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Bengaluru Locality */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                    Location / Locality in Bengaluru *
                  </label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                    <input
                      type="text"
                      list="bengaluru-areas"
                      required
                      placeholder="e.g. Whitefield, HSR Layout, Koramangala, Indiranagar"
                      value={formData.location}
                      onChange={(e) => handleFieldChange("location", e.target.value)}
                      className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <datalist id="bengaluru-areas">
                      {AREAS.map((a) => (
                        <option key={a} value={a} />
                      ))}
                    </datalist>
                  </div>
                </div>

                {/* Preferred Date & Preferred Time */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                      Preferred Date
                    </label>
                    <div className="relative mt-2">
                      <Calendar className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleFieldChange("date", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                      Preferred Time Slot
                    </label>
                    <div className="relative mt-2">
                      <Clock className="absolute left-3.5 top-3.5 size-4 text-muted-foreground" />
                      <select
                        value={formData.time}
                        onChange={(e) => handleFieldChange("time", e.target.value)}
                        className="w-full rounded-xl border border-border bg-background py-3 pl-10 pr-4 text-sm font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      >
                        {TIME_SLOTS.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Additional Details */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-navy">
                    Additional Details
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about specific stains, areas of concern, balcony cleaning, or pet care instructions..."
                    value={formData.details}
                    onChange={(e) => handleFieldChange("details", e.target.value)}
                    className="mt-2 w-full rounded-xl border border-border bg-background p-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-primary py-4 px-6 text-base font-extrabold text-white shadow-soft transition-all duration-300 hover:bg-brand-dark hover:shadow-lift flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>Get a Cleaning Quote</span>
                    <Arrow />
                  </button>
                </div>
              </form>

              {/* Below Form: Prefer WhatsApp prompt */}
              <div className="mt-8 border-t border-border pt-6 text-center">
                <p className="text-sm font-medium text-muted-foreground">Prefer WhatsApp?</p>
                <div className="mt-3 flex justify-center">
                  <WhatsAppButton
                    source="booking_form_footer"
                    variant="whatsapp"
                    size="md"
                    label="Chat with Dirt Quit"
                    message="Hi Dirt Quit, I would like to get a cleaning quote for my space in Bengaluru."
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
