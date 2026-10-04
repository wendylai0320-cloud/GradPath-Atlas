import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/tasks")({
  head: () => ({ meta: [{ title: "Tasks — GradPath Atlas" }] }),
  component: () => (
    <>
      <PageHeader title="Tasks" />
      <Empty>This page is not finished yet.</Empty>
    </>
  ),
});
