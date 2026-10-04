import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/documents")({
  head: () => ({ meta: [{ title: "Documents — GradPath Atlas" }] }),
  component: () => (
    <>
      <PageHeader title="Documents" />
      <Empty>This page is not finished yet.</Empty>
    </>
  ),
});
