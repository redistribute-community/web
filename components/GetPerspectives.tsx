import { getPerspectives } from "@/actions";
import { Perspectives } from "@/components/Perspectives";
import { EmptyState } from "@/components/EmptyState";

export async function GetPerspectives({ topicId }) {
  const perspectives = (await getPerspectives(topicId)) || [];
  return (
    <>
      {perspectives.length > 0 ? (
        <Perspectives perspectives={perspectives} />
      ) : (
        <EmptyState />
      )}
    </>
  );
}
