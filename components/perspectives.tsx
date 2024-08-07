"use client";
/* eslint-disable @next/next/no-img-element */
import { useRef, useEffect } from "react";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Perspectives({ perspectives, mode = undefined }) {
  const perspectivesEndRef = useRef(null);

  const scrollPerspectivesIntoView = () => {
    perspectivesEndRef.current.scrollIntoView({
      block: "end",
      inline: "nearest",
    });
  };

  useEffect(() => {
    if (mode === "e") {
      scrollPerspectivesIntoView();
    }
  }, [perspectives, mode]);

  return (
    <div className={"flex-1 w-full" + (mode !== "r" ? "" : " overflow-y-auto")}>
      <ul
        ref={perspectivesEndRef}
        className={"flex flex-col" + (mode !== "r" ? "" : " overflow-y-auto")}
      >
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
              {mode === "e" ? (
                <Link
                  href={`/p/${perspective.id}/e`}
                  className="text-[8px] text-green-500"
                >
                  ✏️ ⇛
                </Link>
              ) : (
                ""
              )}
            </li>
          )
        )}
      </ul>
    </div>
  );
}
