import React, { useCallback, useEffect } from "react";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  easeOut,
} from "framer-motion";

interface Props {
  open: boolean;
  images: string[];
  activeIndex: number;
  onClose: () => void;
  onChange: (index: number) => void;
  label: string;
}

const ImageGalleryModal: React.FC<Props> = ({
  open,
  images,
  activeIndex,
  onClose,
  onChange,
  label,
}) => {
  const reduceMotion = useReducedMotion();

  const prev = useCallback(() => {
    onChange((activeIndex - 1 + images.length) % images.length);
  }, [activeIndex, images.length, onChange]);

  const next = useCallback(() => {
    onChange((activeIndex + 1) % images.length);
  }, [activeIndex, images.length, onChange]);

  // Keyboard support
  useEffect(() => {
    if (!open) return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, prev, next, onClose]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {open && (
          <m.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            className="fixed inset-0 z-[999] bg-black/70 backdrop-blur-sm p-4"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <m.div
              className="
                relative mx-auto h-full max-w-5xl
                flex items-center justify-center
              "
              initial={reduceMotion ? false : { scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: easeOut }}
            >
              {/* Image */}
              <img
                src={images[activeIndex]}
                alt={label}
                className="
                  max-h-[85vh] w-auto max-w-full
                  rounded-2xl object-contain
                  shadow-2xl
                "
                draggable={false}
              />

              {/* Close */}
              <button
                onClick={onClose}
                aria-label="Close"
                className="
                  absolute top-4 right-4
                  h-10 w-10 rounded-xl
                  bg-black/60 text-white
                  grid place-items-center
                  hover:bg-black/80
                "
              >
                <FiX />
              </button>

              {/* Prev */}
              {images.length > 1 && (
                <button
                  onClick={prev}
                  aria-label="Previous image"
                  className="
                    absolute left-3 md:left-6
                    h-10 w-10 rounded-xl
                    bg-black/60 text-white
                    grid place-items-center
                    hover:bg-black/80
                  "
                >
                  <FiChevronLeft />
                </button>
              )}

              {/* Next */}
              {images.length > 1 && (
                <button
                  onClick={next}
                  aria-label="Next image"
                  className="
                    absolute right-3 md:right-6
                    h-10 w-10 rounded-xl
                    bg-black/60 text-white
                    grid place-items-center
                    hover:bg-black/80
                  "
                >
                  <FiChevronRight />
                </button>
              )}
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};

export default ImageGalleryModal;
