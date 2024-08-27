import { cookies } from "next/headers";
import { getPerspectives, isLocked } from "@/actions";
import { WritePerspective } from "@/components/WritePerspective";
import { Token } from "@/components/Token";

export default async function Page({ params }) {
  const { slug } = params;
  const cookieStore = cookies();
  const token = cookieStore.get("t");
  const locked = await isLocked(slug);
  const perspectives = (await getPerspectives(slug, locked, token?.value)) || [];

  return (
    <main className="relative flex flex-col items-center justify-between h-dvh overflow-y-hidden">
      <div className="flex flex-col items-center w-4/5 h-dvh">
        {!token ? (
          <div className="flex grow-0">
            <Token topicId={slug} perspectiveId={null} />
          </div>
        ) : (
          <WritePerspective
            topicId={slug}
            perspectives={perspectives}
            locked={locked}
            token={token?.value}
          />
        )}
      </div>
    </main>
  );
}
