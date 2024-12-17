import { cookies } from "next/headers";
import { getPerspectives, isLocked } from "@/actions";
import { WritePerspective } from "@/components/WritePerspective";
import { Token } from "@/components/Token";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  return {
    title: `\/t\/${slug}`,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(`t_${slug}`)?.value;
  const hasLocked = await isLocked(slug);
  const forward = false;
  const perspectives =
    (await getPerspectives({ topicId: slug, isLocked: hasLocked, token })) ||
    [];

  return (
    <main className="flex flex-col items-center h-full">
      <div
        className={`flex flex-col ${token ? "w-full justify-between" : "justify-center"} h-full`}
      >
        {!token ? (
          <Token topicId={slug} perspectiveId={null} />
        ) : (
          <WritePerspective
            topicId={slug}
            perspectives={perspectives}
            locked={hasLocked}
            token={token}
            forward={forward}
          />
        )}
      </div>
    </main>
  );
}
