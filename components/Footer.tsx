import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="py-10">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 px-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
