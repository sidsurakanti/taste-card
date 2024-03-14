import Link from "next/link";

export function Footer() {
  return (
    <footer className="flex justify-center h-30 p-2">
      <ul className="w-full flex items-center justify-around md:justify-center md:gap-10 text-primary font-medium text-sm md:text-md flex-wrap p-2">
        <li className="hover:-translate-y-1 hover:underline hover:underline-offset-4 transition-transform">
          <Link href="https://discord.com/users/521872289231273994">
            reach out
          </Link>
        </li>

        <li className="hover:-translate-y-1 hover:underline hover:underline-offset-4 transition-transform">
          code
        </li>

        <li>powered by spotify & last.fm</li>
      </ul>
    </footer>
  );
}
