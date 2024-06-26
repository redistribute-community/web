"use client";
/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { addPerspective } from "@/actions";
import { Submit } from "@/components/submit";
import { Token } from "@/components/token";

export function AddPerspective({ topicId, locked, token }) {
  const btnText = !locked ? "🖋️" : "🔒";
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [color, setColor] = useState("#000000");
  const perspectiveRef = useRef<HTMLTextAreaElement | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  async function formAction(formData: FormData) {
    if (token) {
      formData.append("token", token);
    }
    if (perspectiveRef.current && fileRef.current) {
      await addPerspective(topicId, formData);
      perspectiveRef.current["value"] = "";
      fileRef.current["value"] = "";
    }
  }

  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

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
  }, [file, topicId]);

  return (
    <form
      action={formAction}
      className="flex flex-col items-center w-full mb-2"
      autoComplete="off"
    >
      <div className="fixed -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2">
        {!token ? (
          <div className="flex grow-0">
            <Token topicId={topicId} />
          </div>
        ) : (
          ""
        )}

        {file ? (
          <div className="grow mr-1">
            <label className="sr-only" htmlFor="description">
              description
            </label>
            <input
              data-testid="description"
              className="rounded border border-gray-700 dark:bg-slate-800 focus:ring-purple-700 text-xs w-full mb-1 ml-1"
              type="text"
              id="description"
              name="description"
              placeholder="🖼️ 🖌️"
            />
          </div>
        ) : (
          ""
        )}
      </div>
      {token ? (
        <>
          <div className="flex w-full h-full">
            <div className="flex grow-0 flex-col h-full">
              <img
                data-testid="preview"
                alt=""
                src={fileDataURL}
                className="text-[8px] w-2 h-auto"
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
                name="perspective"
                ref={perspectiveRef}
                style={{ color: `${color}` }}
                spellCheck="true"
                required
              />
            </div>
          </div>
          <Submit testid="submit" btnText={btnText} />
        </>
      ) : (
        ""
      )}
    </form>
  );
}
