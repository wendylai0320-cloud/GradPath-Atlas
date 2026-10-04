import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({ meta: [{ title: "Settings — GradPath Atlas" }] }),
  component: () => (
    <>
      <PageHeader title="Settings" />
      <Empty>This page is not finished yet.</Empty>
    </>
  ),
});
