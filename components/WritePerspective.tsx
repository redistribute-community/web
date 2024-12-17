"use client";
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import { useEffect, useOptimistic, useRef, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { addPerspective, editPerspective } from "@/actions";
import { Submit } from "@/components/Submit";

export function WritePerspective({
  topicId,
  perspectives,
  locked,
  token,
  forward,
}) {
  const MAX_LENGTH = 300;
  const MAX_ROWS = 5;
  const btnText = !locked ? "🖋️" : "🔒";
  const [focus, setFocus] = useState(false);
  const [file, setFile] = useState(null);
  const [perspectiveId, setPerspectiveId] = useState("");
  const [characters, setCharacters] = useState(0);
  const [perspective, setPerspective] = useState("");
  const [objectiveKey, setObjectiveKey] = useState("");
  const [fileDataURL, setFileDataURL] = useState(null);
  const [color, setColor] = useState("#000000");
  const formRef = useRef<HTMLFormElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const perspectivesEndRef = useRef<HTMLDivElement | null>(null);
  const perspectivesForwardEndRef = useRef<HTMLDivElement | null>(null);
  const perspectiveRef = useRef<HTMLTextAreaElement | null>(null);

  const scrollPerspectivesIntoView = () => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        if (perspectivesEndRef.current || perspectivesForwardEndRef.current) {
          !forward
            ? (perspectivesEndRef.current.scrollLeft = 0)
            : perspectivesForwardEndRef.current.scrollIntoView({
                block: "end",
              });
        }
      });
    }, 500);
  };

  async function formAction(formData: FormData) {
    if (token) {
      formData.append("token", token);
    }
    if (perspective && fileRef.current) {
      if (perspectiveId) {
        addOptimisticPerspective(perspective);
        await editPerspective(topicId, perspectiveId, objectiveKey, formData);
        setObjectiveKey("");
        setPerspectiveId("");
      } else {
        const formDataPerspective = formData.get("perspective");
        addOptimisticPerspectives(formDataPerspective);
        await addPerspective(topicId, formData);
        perspectiveRef.current["value"] = "";
        scrollPerspectivesIntoView();
      }
      fileRef.current["value"] = "";
      setPerspective("");
      setFileDataURL(null);
      setFile(null);
    }
  }

  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  const changeTextareaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFocus(true);
    setCharacters(e.target.value.length);
    setPerspective(e.target.value);
  };

  const [optimisiticPerspective, addOptimisticPerspective] =
    useOptimistic(perspective);
  const [optimisiticPerspectives, addOptimisticPerspectives] = useOptimistic(
    perspectives,
    (state, newPerspective) => [...state, { perspective: newPerspective }]
  );

  useEffect(() => {
    let fileReader: FileReader;
    let isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e: { target: { result: any } }) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }

    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file, fileDataURL, topicId]);

  return (
    <>
      <div
        ref={perspectivesEndRef}
        className="flex w-screen overflow-x-auto overflow-y-hidden snap-x snap-mandatory grow"
      >
        {optimisiticPerspectives.map(
          (
            p: {
              id: string;
              perspective: string;
              objective_key: string;
              color: string;
              description: string;
            },
            index: number
          ) => (
            <div
              key={`${index}_${p.id}`}
              id={p.id}
              ref={
                index === optimisiticPerspectives.length - 1
                  ? perspectivesForwardEndRef
                  : null
              }
              className="flex justify-center min-w-[80vw] snap-center p-4"
            >
              <div className="flex flex-col justify-center w-full">
                {p.objective_key && (
                  <div className="relative w-3/4 h-1/2 mx-auto">
                    <Image
                      unoptimized={true}
                      src={`${process.env.NEXT_PUBLIC_CDN_URL}/${p.objective_key}`}
                      alt={p?.description || ""}
                      fill
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}
                <button
                  onClick={() => {
                    setPerspectiveId(p.id);
                    setPerspective(p.perspective);
                    setObjectiveKey(p.objective_key);
                  }}
                  onKeyDown={() => {
                    setPerspectiveId(p.id);
                    setPerspective(p.perspective);
                    setObjectiveKey(p.objective_key);
                  }}
                  data-id={p.id}
                  className={`flex flex-col ${p.objective_key ? "items-center" : ""} w-full text-left`}
                  style={{ color: `${p.color}` }}
                >
                  {perspectiveId === p.id ? (
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      className={`flex flex-col justify-center ${p.objective_key ? "text-center" : ""} whitespace-pre-line has-[blockquote]:border-l-2 has-[blockquote]:border-purple-700 has-[blockquote]:pl-2`}
                    >
                      {optimisiticPerspective}
                    </Markdown>
                  ) : (
                    <Markdown
                      remarkPlugins={[remarkGfm]}
                      className={`flex flex-col justify-center ${p.objective_key ? "text-center" : ""} whitespace-pre-line has-[blockquote]:border-l-2 has-[blockquote]:border-purple-700 has-[blockquote]:pl-2`}
                    >
                      {p.perspective}
                    </Markdown>
                  )}
                </button>
              </div>
            </div>
          )
        )}
      </div>
      <div className="flex flex-col items-center w-4/5 mx-auto mt-1">
        <form
          action={formAction}
          ref={formRef}
          className="flex flex-col items-center w-full mb-2"
          autoComplete="off"
        >
          <div className="fixed -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2">
            {file ? (
              <div className="grow mr-1">
                <label className="sr-only" htmlFor="description">
                  description
                </label>
                <input
                  data-testid="description"
                  className="rounded border border-gray-700 dark:bg-slate-800/20 focus:ring-purple-700 text-xs w-full mb-1 ml-1"
                  type="text"
                  id="description"
                  name="description"
                  placeholder="🖼️ 🖌️"
                />
                <label className="sr-only" htmlFor="pixelat_ing">
                 pixelat_ing
                </label>
                <input
                  data-testid="pixelat_ing"
                  className="rounded border border-gray-700 dark:bg-slate-800 focus:ring-purple-700 text-xs w-full mb-1 ml-1 accent-purple-500"
                  type="range"
                  min={parseInt(process.env.NEXT_PUBLIC_PIXEL_SIZE) - 10}
                  max={parseInt(process.env.NEXT_PUBLIC_PIXEL_SIZE) + 10}
                  id="pixelat_ing"
                  name="pixelat_ing"
                  step="1"
                />
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="flex w-full h-full">
            <div className="flex grow-0 flex-col h-full">
              <img
                data-testid="preview"
                alt=""
                src={fileDataURL}
                className="text-[8px] w-4 h-auto"
              />
              <label htmlFor="file" className="cursor-pointer">
                🖼️
              </label>
              <input
                data-testid="file"
                ref={fileRef}
                className="hidden mb-1"
                type="file"
                id="file"
                name="file"
                placeholder="capture"
                onChange={(e) => changeFileHandler(e)}
              />
              <label
                style={{ color: `${color}` }}
                htmlFor="color"
                className="cursor-pointer"
              >
                🎨
              </label>
              <div className="h-full w-full cursor-pointer">
                <input
                  data-testid="color"
                  className="opacity-0"
                  type="color"
                  id="color"
                  name="color"
                  placeholder="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
              </div>
            </div>
            <div className="flex h-full flex-grow w-full ml-1 md:w-10/12">
              <label className="align-middle sr-only" htmlFor="perspective">
                perspective
              </label>
              <textarea
                data-testid="perspective"
                id="perspective"
                placeholder="🤔"
                className="text-black rounded border border-gray-700 dark:bg-slate-800/20 focus:ring-purple-700 text-xs w-full"
                maxLength={MAX_LENGTH}
                rows={MAX_ROWS}
                name="perspective"
                onChange={(e) => changeTextareaHandler(e)}
                onClick={() => {
                  setCharacters(perspective.length);
                  setFocus(true);
                }}
                onBlur={() => setFocus(false)}
                ref={perspectiveRef}
                value={perspective}
                style={{ color: `${color}` }}
                spellCheck="true"
                required
              />
              <div className="ml-2 w-4 h-4">
                {focus && characters > MAX_LENGTH / 4 && (
                  <span>
                    {characters}/{MAX_LENGTH}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Submit testid="submit" btnText={btnText} />
        </form>
      </div>
    </>
  );
}
