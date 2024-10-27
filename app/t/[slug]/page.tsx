import { GetPerspectives } from "@/components/GetPerspectives";
import { isLocked } from "@/actions";

export default async function Page({ params }) {
  const { slug } = params;
  const locked = await isLocked(slug);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen">
      <div className="flex flex-col w-full">
        {!locked ? (
          <GetPerspectives topicId={slug} />
        ) : (
          <div className="text-center text-2xl">🔒</div>
        )}
      </div>
    </main>
  );
}
