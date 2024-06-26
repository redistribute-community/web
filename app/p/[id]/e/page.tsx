import { getPerspective } from "@//actions";
import { EditPerspective } from "@/components/edit-perspective";

export default async function Page({ params }) {
  const { id } = params;
  const perspective = await getPerspective(id);
  return <EditPerspective perspective={perspective[0]} />;
}
