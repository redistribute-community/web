"use client";

import { useState } from "react";
import { setCookie } from "@/actions";

export function Token({ topicId }) {
  const [inputToken, setInputToken] = useState(null);

  return (
    <>
      <div className="flex flex-row items-center">
        <label className="sr-only" htmlFor="token">
          token
        </label>
        <input
          onChange={(e) => {
            setInputToken(e.target.value);
          }}
          data-testid="token"
          className="rounded border border-gray-700 dark:bg-slate-800/20 focus:ring-purple-700 text-xs w-full mb-1"
          type="text"
          id="token"
          name="token"
          placeholder="🔑"
          autoComplete="off"
          required
        />

        <button
          data-testid="save"
          className="rounded border border-gray-700 dark:bg-slate-800/20 focus:ring-purple-700 text-xs ml-1 p-1"
          id="save"
          name="save"
          type="button"
          onClick={() => {
            setCookie(inputToken, topicId);
          }}
        >
          💾
        </button>
      </div>
    </>
  );
}
