"use client";

import { Download } from "lucide-react";

type ResumeDownloadButtonProps = {
  /** Path to the resume file inside /public, e.g. "/resume/Satish_Singh_Resume.pdf" */
  href: string;
  /** Optional custom label. Defaults to "Resume" */
  label?: string;
  className?: string;
};

export function ResumeDownloadButton({
  href,
  label = "Resume",
  className = "",
}: ResumeDownloadButtonProps) {
  return (
    <a
      href={href}
      download
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 rounded-full border border-neutral-300 dark:border-neutral-700 px-4 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-100 transition-colors hover:border-neutral-900 hover:bg-neutral-900 hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-neutral-900 ${className}`}
    >
      <Download className="h-4 w-4" strokeWidth={2} />
      {label}
    </a>
  );
}