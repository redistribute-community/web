import { cookies } from "next/headers";
import { AddPerspective } from "@/components/add-perspective";
import { GetPerspectives } from "@/components/get-perspectives";
import { GetLockedPerspectives } from "@/components/get-locked-perspectives";
import { isLocked } from "@/actions";

export default async function Page({ params }) {
  const { slug } = params;
  const locked = await isLocked(slug);
  const cookieStore = cookies();
  const token = cookieStore.get("t");
  return (
    <main className="relative flex flex-col items-center justify-between h-dvh overflow-y-hidden">
      <div className="flex flex-col items-center w-4/5 h-dvh">
        <div className="flex-1 w-full overflow-y-auto">
          {!locked ? (
            <GetPerspectives topicId={slug} mode={"e"} />
          ) : (
            <GetLockedPerspectives topicId={slug} token={token?.value} />
          )}
        </div>
        <div className="flex flex-col items-center w-4/5">
          <AddPerspective topicId={slug} locked={locked} token={token?.value} />
        </div>
      </div>
    </main>
  );
}
