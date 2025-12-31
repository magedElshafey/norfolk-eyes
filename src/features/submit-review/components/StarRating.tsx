import React from "react";
import { Star } from "lucide-react";

type Props = {
  value: number; // 0..5
  onChange: (v: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: { box: "h-10 w-10", icon: 18 },
  md: { box: "h-12 w-12", icon: 20 },
  lg: { box: "h-14 w-14", icon: 22 },
};

const StarRating: React.FC<Props> = ({
  value,
  onChange,
  disabled,
  size = "md",
  className,
}) => {
  const [hover, setHover] = React.useState<number>(0);
  const { box, icon } = sizeMap[size];
  const active = hover || value;

  return (
    <div
      role="radiogroup"
      aria-label="rating"
      className={`flex items-center gap-2 ${className ?? ""}`}
      onMouseLeave={() => setHover(0)}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const v = i + 1;
        const isOn = v <= active;

        return (
          <button
            key={v}
            type="button"
            role="radio"
            aria-checked={value === v}
            disabled={disabled}
            onMouseEnter={() => setHover(v)}
            onFocus={() => setHover(v)}
            onBlur={() => setHover(0)}
            onClick={() => onChange(v)}
            className={`
              ${box}
              rounded-md
              border
              transition
              flex items-center justify-center
              ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
              ${
                isOn
                  ? "border-transparent"
                  : "border-[color:var(--field-border)]"
              }
            `}
            style={{
              background: isOn
                ? "var(--field-focus-border)" // نفس لون الفوكس/الأكسنت في مشروعك
                : "var(--bg-surface)",
            }}
            title={`${v} / 5`}
          >
            <Star
              size={icon}
              className="transition"
              style={{
                fill: isOn ? "#fff" : "transparent",
                color: isOn ? "#fff" : "var(--text-soft)",
              }}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
