import React, {
  useRef,
  useState,
  KeyboardEvent,
  ChangeEvent,
  useId,
} from "react";

interface FileInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  accept?: string;
  onChange?: (files: File[]) => void;
  multiple?: boolean;
  maxFiles?: number; // default: 3
  maxTotalSizeMB?: number; // default: 10
  required?: boolean;
}

const FileInput: React.FC<FileInputProps> = ({
  id,
  label = "Attach the transfer receipt",
  placeholder = "Attach the transfer receipt",
  accept = "*",
  multiple = true,
  maxFiles = 3,
  maxTotalSizeMB = 10,
  onChange,
  required = false,
}) => {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);

  const hasError = Boolean(error);
  const maxTotalSizeBytes = maxTotalSizeMB * 1024 * 1024;

  const handleOpen = () => {
    fileInputRef.current?.click();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleOpen();
    }
  };

  const notifyChange = (nextFiles: File[]) => {
    onChange?.(nextFiles);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []);
    if (!selected.length) return;

    // ندمج الملفات الجديدة مع القديمة
    let nextFiles = [...files, ...selected];

    // لو عدد الملفات أكبر من المسموح
    if (nextFiles.length > maxFiles) {
      setError(`You can attach up to ${maxFiles} files only.`);
      nextFiles = nextFiles.slice(0, maxFiles);
    } else {
      setError(null);
    }

    // نحسب الحجم الكلي
    const totalSize = nextFiles.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > maxTotalSizeBytes) {
      setError(`Total size of all files must not exceed ${maxTotalSizeMB} MB.`);
      // UX: منحدّثش الـ state ونسيب الملفات القديمة
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      return;
    }

    setFiles(nextFiles);
    notifyChange(nextFiles);

    // reset عشان لو اختار نفس الملف تاني يشتغل onChange
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRemoveFile = (index: number) => {
    const nextFiles = files.filter((_, i) => i !== index);
    setFiles(nextFiles);
    setError(null);
    notifyChange(nextFiles);
  };

  const hasFiles = files.length > 0;
  const textColorClass = hasFiles
    ? "text-[color:var(--field-text)]"
    : "text-[color:var(--field-placeholder)]";

  const totalSizeMB =
    files.reduce((sum, file) => sum + file.size, 0) / (1024 * 1024);

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm md:text-base block mb-2 font-medium"
          style={{ color: "var(--field-label)" }}
        >
          {label}
          {required && (
            <span className="ml-1" style={{ color: "var(--field-error-text)" }}>
              *
            </span>
          )}
        </label>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={handleKeyDown}
        aria-describedby={error ? `${helperId} ${errorId}` : helperId}
        aria-invalid={hasError}
        className={`
          flex items-center justify-between gap-3
          cursor-pointer rounded-xl
          px-4 py-3 w-full
          bg-[var(--field-bg)]
          border
          ${
            hasError
              ? "border-[color:var(--field-error-text)]"
              : "border-[color:var(--field-border)]"
          }
          focus-visible:outline-none
          focus-visible:ring-2
          ${
            hasError
              ? "focus-visible:ring-[color:var(--field-error-text)]"
              : "focus-visible:ring-[color:var(--field-focus-ring)]"
          }
          focus-visible:ring-offset-2
          focus-visible:ring-offset-[color:var(--bg-subtle)]
          transition-colors duration-150
        `}
      >
        <span className={`text-sm truncate flex-1 ${textColorClass}`}>
          {hasFiles ? `${files.length} file(s) selected` : placeholder}
        </span>

        {/* أيقونة بسيطة (تقدر تبدلها بـ image أو SVG بتاعك) */}
        <span
          aria-hidden="true"
          className="w-5 h-5 flex-shrink-0 inline-flex items-center justify-center rounded bg-[color:var(--field-border)] text-[10px]"
        >
          📄
        </span>

        <input
          id={inputId}
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
          multiple={multiple}
        />
      </div>

      {/* Helper text (يوضح limit) */}
      {!error && (
        <p
          id={helperId}
          className="mt-1 text-xs"
          style={{
            color: hasError
              ? "var(--field-error-text)"
              : "var(--field-placeholder)",
          }}
        >
          You can attach up to {maxFiles} files. Total size must not exceed{" "}
          {maxTotalSizeMB} MB.
          {hasFiles && (
            <>
              {" "}
              Currently: {files.length}/{maxFiles} file(s),{" "}
              {totalSizeMB.toFixed(1)} MB.
            </>
          )}
        </p>
      )}

      {/* Error message (accessible) */}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="mt-1 text-xs"
          style={{ color: "var(--field-error-text)" }}
        >
          {error}
        </p>
      )}

      {hasFiles && (
        <ul className="mt-3 space-y-1" aria-label="Selected files">
          {files.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center justify-between text-sm"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span
                  aria-hidden="true"
                  className="w-5 h-5 flex items-center justify-center rounded bg-[color:var(--field-border)] text-[10px] flex-shrink-0"
                >
                  📎
                </span>
                <span className="truncate">{file.name}</span>
                <span
                  className="ml-2 text-[11px]"
                  style={{ color: "var(--field-placeholder)" }}
                >
                  ({(file.size / (1024 * 1024)).toFixed(1)} MB)
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="ml-3 text-xs underline-offset-2 hover:underline"
                style={{ color: "var(--field-error-text)" }}
                aria-label={`Remove ${file.name}`}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileInput;
