import Link from "next/link";
import { AddToken } from "@/components/add-token";

export default function Page({ params }) {
  const { slug } = params;

  return (
    <main className="relative flex flex-col items-center h-full justify-center">
      <div className="flex flex-col items-center md:w-3/4">
        <div className="flex flex-col items-center w-4/5">
          <Link
            href={process.env.NEXT_PUBLIC_FUNDING_URL}
            className="text-xs font-mono font-semibold"
          ></Link>
          <AddToken topicId={slug} />
        </div>
        <Link className="text-lg" href={`/t/${slug}/w`}>
          ⇚
        </Link>
      </div>
    </main>
  );
}
