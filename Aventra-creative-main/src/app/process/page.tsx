import type { Metadata } from "next";
import { PageHeader } from "@/components/marketing/page-header";
import { PageCta } from "@/components/marketing/page-cta";
import { ProcessTimeline } from "@/components/marketing/process-timeline";
import { MiniStatsBar } from "@/components/marketing/mini-stats-bar";

export const metadata: Metadata = {
  title: "Our Process",
  description: "A proven delivery process that keeps projects on track from discovery through launch and beyond.",
  alternates: { canonical: "/process" },
};

export default function ProcessPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Process"
        title="Our Proven Process For Delivering Success."
        description="A simple, transparent process that ensures your project is delivered on time and exceeds expectations."
        crumbs={[{ name: "Home", href: "/" }, { name: "Process" }]}
      />
      <ProcessTimeline />
      <div className="mx-auto -mt-12 max-w-3xl px-6 pb-24 lg:px-8">
        <MiniStatsBar />
      </div>
      <PageCta title="Ready to move forward with your project?" description="We’ll help you turn your brief into a polished digital experience that delivers results." />
    </>
  );
}
