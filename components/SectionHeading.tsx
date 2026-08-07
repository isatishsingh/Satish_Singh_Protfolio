type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  className?: string;
  categoryTag?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  title,
  subtitle,
  className,
  categoryTag,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={`mb-10 ${className?.length ? className : ""} ${align === "center" ? "text-center" : ""}`}>
      {categoryTag && (
        <p className="font-mono text-xs font-semibold uppercase tracking-[0.25em] text-accent">
          {categoryTag}
        </p>
      )}
      <div className={`flex flex-col ${align === "center" ? "items-center" : "items-start"}`}>
        <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <span className="mt-2.5 h-1 w-12 rounded-full bg-gradient-to-r from-accent to-accent-secondary" />
      </div>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-sm leading-relaxed text-muted md:text-base ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
