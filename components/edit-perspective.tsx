"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { editPerspective } from "@/actions";
import { Submit } from "@/components/submit";

export function EditPerspective({ perspective }) {
  async function formAction(formData: FormData) {
    await editPerspective(
      perspective.topic_id,
      perspective.id,
      perspective.objective_key,
      formData,
    );
  }

  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);
  const [editColor, setEditColor] = useState(perspective.color);
  const [editDescription, setEditDescription] = useState(
    perspective.description,
  );
  const [editTextPerspective, setEditTextPerspective] = useState(
    perspective.perspective,
  );

  const changeFileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files[0]);
  };

  const changeDescriptionHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDescription(e.target.value);
  };

  const changePerspectiveHandler = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setEditTextPerspective(e.target.value);
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
  }, [file]);

  return (
    <div className="flex flex-col p-8">
      <div
        key={perspective.id}
        data-id={perspective.id}
        className="rounded text-sm text-emerald-500 md:w-3/4"
        style={{ color: `${editColor}` }}
      >
        <div className="flex flex-col items-center">
          {perspective.objective_key && !fileDataURL ? (
            <img
              src={`${process.env.NEXT_PUBLIC_CDN_URL}/${perspective.objective_key}`}
              alt={editDescription}
              loading="lazy"
              className="justify-center"
            />
          ) : (
            <img src={fileDataURL} alt="" />
          )}
        </div>

        <Markdown
          remarkPlugins={[remarkGfm]}
          className="whitespace-pre-line has-[blockquote]:border-l-2 has-[blockquote]:border-purple-700 has-[blockquote]:pl-2"
        >
          {editTextPerspective}
        </Markdown>
      </div>

      <form
        action={formAction}
        className="flex flex-col items-center w-full mb-2"
      >
        <div className="flex w-full">
          <div className="grow-0">
            <label className="sr-only" htmlFor="token">
              token
            </label>
            <input
              data-testid="token"
              className="rounded border border-gray-700 dark:bg-slate-800 focus:ring-purple-700 text-xs w-full mb-1"
              type="text"
              id="token"
              name="token"
              placeholder=""
              required
            />
          </div>
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
                value={editDescription || ""}
                onChange={(e) => changeDescriptionHandler(e)}
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
              src={fileDataURL}
              alt="preview"
              className="text-[8px] w-2 h-auto"
            />
            <label htmlFor="file" className="cursor-pointer">
              🖼️
            </label>
            <input
              data-testid="file"
              className="hidden mb-1"
              type="file"
              id="file"
              name="file"
              placeholder="capture"
              onChange={(e) => changeFileHandler(e)}
            />
            <label style={{ color: `${editColor}` }} htmlFor="color">
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
                value={editColor}
                onChange={(e) => setEditColor(e.target.value)}
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
              placeholder="a/ /w .md(optional)"
              className="text-black rounded border border-gray-700 dark:bg-slate-800/20 focus:ring-purple-700 text-xs w-full"
              name="perspective"
              value={editTextPerspective || ""}
              onChange={(e) => changePerspectiveHandler(e)}
              style={{ color: `${editColor}` }}
            />
          </div>
        </div>
        <Submit testid="submit" btnText="✒️" />
      </form>
      <Link
        data-testid="write-link"
        href={`/t/${perspective.topic_id}/w`}
        className="text-[8px] text-green-500"
      >
        📝 ⇚
      </Link>
    </div>
  );
}
