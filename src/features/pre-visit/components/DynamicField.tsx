import React, { memo } from "react";
import {
  Controller,
  type Control,
  type UseFormRegister,
  type FieldErrors,
  type UseFormGetValues,
  type UseFormSetValue,
} from "react-hook-form";

import MainInput from "@/common/components/inputs/MainInput";
import MainTextArea from "@/common/components/inputs/MainTextArea";
import MainSelect from "@/common/components/inputs/MainSelect";
import FileInput from "@/common/components/inputs/FileInput";
import RadioInput from "@/common/components/inputs/RadioInput";
import MainDate from "@/common/components/inputs/MainDateInput";

import type { ApiField, DynamicFormValues } from "../types/form.types";
import {
  buildRules,
  normalizeOptionValues,
  toSelectOptions,
  selectedIdFromStoredValue,
  storedValueFromSelectedId,
  OTHER_VALUE,
  otherTextFieldName,
} from "../utils/form.builder";

import MainCheckboxGroupController from "@/common/components/inputs/MainCheckboxGroupController";
import MainToggleController from "@/common/components/inputs/MainToggleController";

type Props = {
  field: ApiField;
  control: Control<DynamicFormValues>;
  register: UseFormRegister<DynamicFormValues>;
  errors: FieldErrors<DynamicFormValues>;
  tMaybe: (txt?: string, fallback?: string) => string;

  getValues: UseFormGetValues<DynamicFormValues>;
  setValue: UseFormSetValue<DynamicFormValues>;
};

function getErrorMsg(errors: FieldErrors<DynamicFormValues>, name: string) {
  const msg = (errors as any)?.[name]?.message;
  return typeof msg === "string" ? msg : undefined;
}

const DynamicField: React.FC<Props> = ({
  field,
  control,
  register,
  errors,
  tMaybe,
  getValues,
  setValue,
}) => {
  const errorMsg = getErrorMsg(errors, field.name);

  const label = tMaybe(field.label, field.label);
  const placeholder = tMaybe(field.placeholder, field.placeholder);
  const helpText = tMaybe(field.help_text, field.help_text);

  const baseRules = buildRules(field);

  const commonHelp = helpText ? (
    <p className="mt-1 text-xs" style={{ color: "var(--field-placeholder)" }}>
      {helpText}
    </p>
  ) : null;

  if (field.type === "textarea") {
    return (
      <div>
        <MainTextArea
          label={label}
          placeholder={placeholder}
          rows={4}
          {...register(field.name, baseRules)}
          error={errorMsg}
          required={field?.is_required}
        />
        {commonHelp}
      </div>
    );
  }

  if (field.type === "date") {
    return (
      <div>
        <MainDate
          label={label}
          placeholder={placeholder}
          {...register(field.name, baseRules)}
          error={errorMsg}
          required={field.is_required}
        />
        {commonHelp}
      </div>
    );
  }

  /** ✅ select + Other */
  if (field.type === "select") {
    const valuesList = normalizeOptionValues(field.options);

    // add OTHER_VALUE as last option
    const withOther = [...valuesList, OTHER_VALUE];
    const opts = toSelectOptions(withOther);

    const otherTextName = otherTextFieldName(field.name);
    const otherTextError = getErrorMsg(errors, otherTextName);

    const rulesForSelect = {
      ...baseRules,
      validate: (v: unknown) => {
        const prevValidate = (baseRules as any)?.validate;
        if (typeof prevValidate === "function") {
          const res = prevValidate(v);
          if (res !== true) return res;
        }

        if (v === OTHER_VALUE) {
          const txt = getValues(otherTextName as any);
          return (
            (typeof txt === "string" && txt.trim().length > 0) ||
            "Please specify"
          );
        }

        return true;
      },
    };

    return (
      <div>
        <Controller
          control={control}
          name={field.name}
          rules={rulesForSelect}
          render={({ field: rhf }) => {
            const selectedId = selectedIdFromStoredValue(rhf.value, opts);
            const isOtherSelected = rhf.value === OTHER_VALUE;

            const uiOptions = opts.map((o) => ({
              ...o,
              name: o.name === OTHER_VALUE ? "Other" : o.name,
            }));

            return (
              <>
                <MainSelect
                  label={label}
                  placeholder={placeholder}
                  options={uiOptions}
                  value={selectedId}
                  onChange={(id) => {
                    const stored = storedValueFromSelectedId(id, opts);
                    rhf.onChange(stored);

                    // لو خرج من other => امسح textarea
                    if (stored !== OTHER_VALUE) {
                      setValue(otherTextName as any, "");
                    }
                  }}
                  onBlur={rhf.onBlur}
                  error={errorMsg ?? null}
                  required={field.is_required}
                  ariaLabel={label}
                />

                {isOtherSelected && (
                  <div className="mt-3">
                    <Controller
                      control={control}
                      name={otherTextName as any}
                      rules={{
                        validate: (v: unknown) =>
                          (typeof v === "string" && v.trim().length > 0) ||
                          "Please specify",
                      }}
                      render={({ field: otherRHF }) => (
                        <MainTextArea
                          label="Please specify"
                          placeholder="Type your answer..."
                          rows={4}
                          value={(otherRHF.value as string) ?? ""}
                          onChange={(e) => otherRHF.onChange(e.target.value)}
                          onBlur={otherRHF.onBlur}
                          error={otherTextError}
                          required={true}
                        />
                      )}
                    />
                  </div>
                )}
              </>
            );
          }}
        />
        {commonHelp}
      </div>
    );
  }

  if (field.type === "file") {
    return (
      <div>
        <Controller
          control={control}
          name={field.name}
          rules={baseRules}
          render={({ field: rhf }) => (
            <FileInput
              label={label}
              placeholder={placeholder || label}
              multiple
              maxFiles={3}
              maxTotalSizeMB={10}
              onChange={(files) => rhf.onChange(files)}
              required={field?.is_required}
            />
          )}
        />
        {commonHelp}
        {errorMsg && (
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--field-error-text)" }}
            role="alert"
          >
            {errorMsg}
          </p>
        )}
      </div>
    );
  }

  if (field.type === "radio") {
    const valuesList = normalizeOptionValues(field.options);
    const radioOptions = valuesList.map((v) => ({ value: v, label: v }));

    return (
      <div>
        <Controller
          control={control}
          name={field.name}
          rules={baseRules}
          render={({ field: rhf }) => (
            <RadioInput
              label={label}
              value={(rhf.value as string) || ""}
              options={radioOptions}
              onChange={(v) => rhf.onChange(v)}
              required={field.is_required}
              error={errorMsg ?? null}
              helpText={helpText}
            />
          )}
        />
      </div>
    );
  }

  if (field.type === "checkbox") {
    const valuesList = normalizeOptionValues(field.options);
    const checkboxOptions = valuesList.map((v) => ({ value: v, label: v }));

    return (
      <MainCheckboxGroupController
        name={field.name as any}
        control={control}
        label={label}
        required={field.is_required}
        options={checkboxOptions}
        helpText={helpText}
      />
    );
  }

  if (field.type === "true_false") {
    return (
      <MainToggleController
        name={field.name as any}
        control={control}
        label={label}
        required={field.is_required}
        helpText={helpText}
      />
    );
  }

  return (
    <div>
      <MainInput
        label={label}
        placeholder={placeholder}
        type={field.type === "phone" ? "tel" : field.type}
        required={field.is_required}
        {...register(field.name, baseRules)}
        error={errorMsg}
      />
      {commonHelp}
    </div>
  );
};

export default memo(DynamicField);
