import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import MainToggle from "./MainToggle";

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  name: TName;
  control: Control<TFieldValues>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  rules?: any;
  helpText?: string;
};

export default function MainToggleController<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  required = false,
  disabled = false,
  className = "",
  rules,
  helpText,
}: Props<TFieldValues, TName>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...(required
          ? { validate: (v: unknown) => v === true || "This field is required" }
          : {}),
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <MainToggle
          id={field.name} // stable for a11y + scroll
          ref={field.ref}
          label={label}
          required={required}
          disabled={disabled}
          className={className}
          helpText={helpText}
          error={fieldState.error?.message}
          checked={Boolean(field.value)}
          onCheckedChange={(next) => field.onChange(next)}
          trueLabel="Yes"
          falseLabel="No"
        />
      )}
    />
  );
}
