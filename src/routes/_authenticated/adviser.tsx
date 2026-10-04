import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/adviser")({
  head: () => ({ meta: [{ title: "Adviser review — GradPath Atlas" }] }),
  component: () => (
    <>
      <PageHeader title="Adviser review" />
      <Empty>This page is not finished yet.</Empty>
    </>
  ),
});
