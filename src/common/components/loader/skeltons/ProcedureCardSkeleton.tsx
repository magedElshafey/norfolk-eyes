const ProcedureCardSkeleton = () => {
  return (
    <div
      className="
        grid gap-4 md:gap-5
        sm:grid-cols-2
        xl:grid-cols-4
      "
      role="list"
      aria-hidden="true"
    >
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="
            h-40
            bg-[var(--skeleton)]
            rounded-xl
          "
        />
      ))}
    </div>
  );
};

export default ProcedureCardSkeleton;
