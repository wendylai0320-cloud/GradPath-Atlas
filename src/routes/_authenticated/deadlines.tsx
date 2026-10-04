import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/deadlines")({
  head: () => ({ meta: [{ title: "Deadlines — GradPath Atlas" }] }),
  component: () => (
    <>
      <PageHeader title="Deadlines" />
      <Empty>This page is not finished yet.</Empty>
    </>
  ),
});
