import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import PreVisitFormSection from "./PreVisitFormSection";
import SectionEnding from "@/common/components/sections/SectionEnding";
import MainBtn from "@/common/components/buttons/MainBtn";

import useGetFormFields from "../api/useGetFormFields";
import useSubmitForm from "../api/useSubmitForm";

import type { ApiSection, DynamicFormValues } from "../types/form.types";
import {
  sortActiveSections,
  buildDefaultValues,
  scrollToFirstError,
  OTHER_VALUE,
  otherTextFieldName,
  isOtherTextKey,
} from "../utils/form.builder";

import DynamicField from "./DynamicField";
import Loader from "@/common/components/loader/spinner/Loader";
import handlePromisError from "@/utils/handlePromiseError";
import { showSubmissionToast } from "@/common/components/toast/showSubmissionToast";
import { useTranslation } from "react-i18next";

function isTranslationKey(s?: string) {
  return Boolean(s && s.includes("."));
}

function useTMaybe() {
  return (txt?: string, fallback?: string) => {
    if (!txt) return fallback ?? "";
    return isTranslationKey(txt) ? "" : txt;
  };
}

/** include only if has actual value */
function shouldIncludeFieldValue(fieldType: string, v: unknown) {
  if (v === undefined || v === null) return false;

  if (fieldType === "file") return Array.isArray(v) && v.length > 0;
  if (fieldType === "checkbox") return Array.isArray(v) && v.length > 0;
  if (fieldType === "true_false") return v === true;

  if (typeof v === "string") return v.trim().length > 0;
  return true;
}

export default function DynamicPreVisitForm() {
  const { t } = useTranslation();
  const tMaybe = useTMaybe();

  const schemaQuery = useGetFormFields();
  const submitMutation = useSubmitForm();

  const sections = useMemo(
    () => sortActiveSections((schemaQuery.data as ApiSection[]) ?? []),
    [schemaQuery.data]
  );

  const defaultValues = useMemo(() => buildDefaultValues(sections), [sections]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<DynamicFormValues>({
    defaultValues,
    mode: "onSubmit",
    reValidateMode: "onChange",
    shouldUnregister: true,
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  const onSubmit = async (formValues: DynamicFormValues) => {
    const valuesPayload: Record<string, unknown> = {};
    const filesByName: Record<string, File[]> = {};

    for (const section of sections) {
      for (const f of section.fields) {
        const v = formValues[f.name];

        // files
        if (f.type === "file") {
          const files = Array.isArray(v) ? (v as File[]) : [];
          if (files.length > 0) filesByName[f.name] = files;
          continue;
        }

        // ✅ never send *_text keys by themselves in loop (هنضيفهم بشكل controlled تحت)
        if (isOtherTextKey(f.name)) continue;

        // ✅ select: لو Other => ابعت field="other" و field_text="..."
        if (f.type === "select" && v === OTHER_VALUE) {
          const textKey = otherTextFieldName(f.name);
          const txt = formValues[textKey];

          valuesPayload[f.name] = "other";

          if (typeof txt === "string" && txt.trim()) {
            valuesPayload[textKey] = txt.trim();
          } else {
            // حتى لو فاضي validation هيمنع submit غالبًا،
            // لكن خليها safe
            valuesPayload[textKey] = "";
          }

          continue;
        }

        if (!shouldIncludeFieldValue(f.type, v)) continue;
        valuesPayload[f.name] = v;
      }
    }

    // base fields
    valuesPayload.full_name = formValues.full_name ?? "";
    valuesPayload.email = formValues.email ?? "";
    valuesPayload.phone = formValues.phone ?? "";
    valuesPayload.date_of_birth = formValues.date_of_birth ?? "";

    try {
      const response = await submitMutation.mutateAsync({
        values: valuesPayload,
        filesByName,
      });

      if (response?.status) {
        showSubmissionToast({
          title: t("submissionToast.title"),
          description: t("submissionToast.description"),
          closeLabel: t("submissionToast.close"),
          duration: 5000,
        });

        reset(defaultValues);
      }
    } catch (error) {
      handlePromisError(error);
    }
  };

  const onInvalid = (errs: any) => scrollToFirstError(errs);

  if (schemaQuery.isLoading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (schemaQuery.isError) {
    return (
      <div
        className="py-10 text-sm"
        style={{ color: "var(--field-error-text)" }}
      >
        Failed to load form fields.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      noValidate
      aria-label="Patient pre-visit form"
    >
      {sections.map((section) => (
        <PreVisitFormSection
          key={section.id}
          id={`previsit-section-${section.id}`}
          title={tMaybe(section.title, section.title)}
          description={tMaybe(section.description, section.description)}
        >
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <legend className="sr-only">
              {tMaybe(section.title, section.title) || `Section ${section.id}`}
            </legend>

            {section.fields.map((field) => (
              <div key={field.id}>
                <DynamicField
                  field={field}
                  control={control}
                  register={register}
                  errors={errors}
                  tMaybe={tMaybe}
                  getValues={getValues}
                  setValue={setValue}
                />
              </div>
            ))}
          </fieldset>
        </PreVisitFormSection>
      ))}

      <div className="flex justify-center pt-2 md:col-span-2">
        <div className="w-full md:w-[220px]">
          <MainBtn
            type="submit"
            text={submitMutation.isPending || isSubmitting ? "loading" : "send"}
            className="w-full flex justify-center"
            isPending={submitMutation.isPending || isSubmitting}
          />
        </div>
      </div>

      <div className="md:col-span-2">
        <SectionEnding text="This form is for preparation only and does not replace a full medical assessment in clinic." />
      </div>
    </form>
  );
}
