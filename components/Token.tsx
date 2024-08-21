"use client";

import { useState } from "react";
import { setCookie } from "@/actions";

export function Token({ topicId, perspectiveId }) {
  const [inputToken, setInputToken] = useState(null);

  return (
    <div className="fixed -translate-x-2/4 -translate-y-2/4 top-1/2 left-1/2">
      <div className="flex grow-0">
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
              setCookie(inputToken, topicId, perspectiveId);
            }}
          >
            💾
          </button>
        </div>
      </div>
    </div>
  );
}
