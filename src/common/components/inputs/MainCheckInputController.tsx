import { Controller, Control, FieldPath, FieldValues } from "react-hook-form";
import MainCheckInput from "./MainCheckInput";

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
  labelPosition?: "inline" | "above";
  rules?: any;
};

const MainCheckInputController = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  control,
  label,
  required = false,
  disabled = false,
  className = "",
  labelPosition = "inline",
  rules,
}: Props<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        ...(required ? { required: "This field is required" } : {}),
        ...rules,
      }}
      render={({ field, fieldState }) => (
        <MainCheckInput
          ref={field.ref}
          id={field.name} // ✅ stable id for a11y + scroll
          label={label}
          required={required}
          disabled={disabled}
          className={className}
          labelPosition={labelPosition}
          error={fieldState.error?.message}
          checked={Boolean(field.value)}
          onCheckedChange={(next) => field.onChange(next)}
          onBlur={field.onBlur}
        />
      )}
    />
  );
};

MainCheckInputController.displayName = "MainCheckInputController";

export default MainCheckInputController;
