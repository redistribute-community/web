import { getLockedPerspectives } from "@/actions";
import { Perspectives } from "@/components/perspectives";

export async function GetLockedPerspectives({ topicId, token }) {
  const perspectives = (await getLockedPerspectives(topicId, token)) || [];
  return (
    <>
      {perspectives.length > 0 ? (
        <Perspectives perspectives={perspectives} />
      ) : (
        ""
      )}
    </>
  );
}
