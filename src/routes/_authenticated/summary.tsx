import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/summary")({
  head: () => ({ meta: [{ title: "Shortlist & plan — GradPath Atlas" }] }),
  component: () => (
    <>
      <PageHeader title="Shortlist & plan" />
      <Empty>This page is not finished yet.</Empty>
    </>
  ),
});
