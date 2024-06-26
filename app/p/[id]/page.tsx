import { getPerspective } from "@/actions";
import { Perspectives } from "@/components/perspectives";

export default async function Page({ params }) {
  const { id } = params;
  const perspective = await getPerspective(id);
  return (
    <div className="flex flex-col w-4/5 my-0 mx-auto h-dvh">
      <Perspectives perspectives={perspective} />
    </div>
  );
}
