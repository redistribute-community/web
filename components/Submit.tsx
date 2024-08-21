"use client";

import { useFormStatus } from "react-dom";

export function Submit({ testid, btnText }) {
  const { pending } = useFormStatus();

  return (
    <button
      data-testid={testid}
      className="text-sm font-mono border border-gray-700 rounded-lg mt-1 p-1"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? "🛸" : btnText}
    </button>
  );
}
