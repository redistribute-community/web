import { cookies } from "next/headers";
import { getPerspectives, isLocked } from "@/actions";
import { WritePerspective } from "@/components/WritePerspective";
import { Token } from "@/components/Token";

export default async function Page({ params }) {
  const { slug } = params;
  const cookieStore = cookies();
  const token = cookieStore.get(`t_${slug}`);
  const locked = await isLocked(slug);
  const perspectives =
    (await getPerspectives(slug, locked, token?.value)) || [];

  return (
    <main className="flex flex-col items-center min-h-screen h-full">
      <div className="flex flex-col justify-between w-full h-full overflow-hidden relative">
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
