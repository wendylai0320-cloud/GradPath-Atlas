import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, Empty } from "@/components/ui-kit";

export const Route = createFileRoute("/_authenticated/programmes/$id")({
  head: () => ({ meta: [{ title: "Programme detail — GradPath Atlas" }] }),
  component: () => (
    <>
      <PageHeader title="Programme detail" />
      <Empty>This page is not finished yet.</Empty>
    </>
  ),
});
