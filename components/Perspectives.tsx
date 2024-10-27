"use client";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Perspectives({ perspectives }) {
  return (
    <div className="flex-1 w-full">
      <ul className="flex">
        {perspectives.map(
          (perspective: {
            id: string;
            perspective: string;
            topic?: string;
            description?: string;
            color: string;
            objective_key?: string;
          }) => (
            <li
              key={perspective.id}
              data-id={perspective.id}
              className="rounded text-sm text-emerald-500 md:w-3/4 p-1"
              style={{ color: `${perspective.color}` }}
            >
              {perspective.objective_key ? (
                /* eslint-disable @next/next/no-img-element */
                <img
                  src={`${process.env.NEXT_PUBLIC_CDN_URL}/${perspective.objective_key}`}
                  alt={perspective?.description}
                  loading="lazy"
                />
              ) : (
                ""
              )}
              <Markdown
                remarkPlugins={[remarkGfm]}
                className="whitespace-pre-line has-[blockquote]:border-l-2 has-[blockquote]:border-purple-700 has-[blockquote]:pl-2"
              >
                {perspective.perspective}
              </Markdown>
            </li>
          )
        )}
      </ul>
    </div>
  );
}
