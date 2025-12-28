import { useId, useMemo } from "react";
import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import MainCheckInput from "./MainCheckInput";

export type CheckboxOption = { value: string; label?: string };

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  options: CheckboxOption[];
  rules?: any;
  className?: string;
  itemClassName?: string;
  helpText?: string;
};

export default function MainCheckboxGroupController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  required = false,
  disabled = false,
  options,
  rules,
  className = "",
  itemClassName = "",
  helpText,
}: Props<TFieldValues, TName>) {
  const groupId = useId();

  const normalizedRules = useMemo(() => {
    if (!required) return rules;

    return {
      ...rules,
      validate: (v: unknown) => {
        const arr = Array.isArray(v) ? v : [];
        return arr.length > 0 || "Please choose at least one option";
      },
    };
  }, [required, rules]);

  return (
    <div
      className={`space-y-2 border border-[color:var(--field-border)] focus-within:ring-2 focus-within:ring-[color:var(--field-focus-ring)] focus-within:border-[color:var(--field-focus-border)] rounded-xl px-4 py-3
            bg-[var(--field-bg)] ${className}`}
    >
      {label && (
        <div
          id={`${groupId}-label`}
          className="mb-2 text-sm md:text-base font-medium"
          style={{ color: "var(--field-label)" }}
        >
          {label}
          {required && (
            <span className="ml-1" style={{ color: "var(--field-error-text)" }}>
              *
            </span>
          )}
        </div>
      )}

      <Controller
        name={name}
        control={control}
        rules={normalizedRules}
        render={({ field, fieldState }) => {
          const selected = Array.isArray(field.value)
            ? (field.value as string[])
            : [];

          const toggle = (val: string) => {
            const next = selected.includes(val)
              ? selected.filter((x) => x !== val)
              : [...selected, val];
            field.onChange(next);
          };

          return (
            <>
              <div
                role="group"
                aria-labelledby={label ? `${groupId}-label` : undefined}
                className="space-y-2"
              >
                {options.map((opt) => (
                  <MainCheckInput
                    key={opt.value}
                    id={`${groupId}-${opt.value}`}
                    label={opt.label ?? opt.value}
                    disabled={disabled}
                    className={itemClassName}
                    checked={selected.includes(opt.value)}
                    onCheckedChange={() => toggle(opt.value)}
                    error={undefined}
                  />
                ))}
              </div>

              {helpText && (
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--field-placeholder)" }}
                >
                  {helpText}
                </p>
              )}

              {fieldState.error?.message && (
                <p
                  className="mt-1 text-xs"
                  style={{ color: "var(--field-error-text)" }}
                  role="alert"
                >
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
