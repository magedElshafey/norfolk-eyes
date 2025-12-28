import React from "react";
import { toast } from "sonner";

type Options = {
  title: string;
  description: string;
  closeLabel?: string;
  duration?: number; // ms
};

export function showSubmissionToast({
  title,
  description,
  closeLabel = "Close",
  duration = 5000,
}: Options) {
  toast.custom(
    (t) => (
      // Overlay in the exact center (x,y)
      <div className="fixed w-screen h-screen flex items-center justify-center inset-0 z-[9999] pointer-events-none">
        <div className="containerr">
          <div
            className="
            pointer-events-auto
            w-full max-w-lg
            rounded-2xl border
            bg-[#111827] border-[#374151]
            text-white
            shadow-2xl
            px-5 py-4
          "
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-lg md:text-xl font-semibold leading-snug">
                  {title}
                </p>
                <p className="mt-2 text-sm md:text-base text-[#D1D5DB] leading-relaxed">
                  {description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => toast.dismiss(t)}
                className="
                shrink-0
                rounded-xl
                border border-[#4B5563]
                bg-[#1F2937]
                px-3 py-1.5
                text-sm
                hover:bg-[#374151]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#9CA3AF]
              "
                aria-label={closeLabel}
              >
                {closeLabel}
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
    { duration }
  );
}
