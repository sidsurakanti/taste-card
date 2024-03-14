import Link from "next/link";
import Image from "next/image";

export function Nav() {
  return (
    <header className="flex justify-around h-24 p-2 items-center">
      <Link href="/">
        <div className="flex items-center">
          <Image src="/logo.svg" alt="logo" width={64} height={64} />
        </div>
      </Link>

      <nav className="flex justify-center h-24 p-2">
        <ul className="p-1 px-3 h-fit my-auto rounded-3xl flex items-center bg-gradient-to-r from-secondary/70 to-secondary text-primary hover:from-primary/70 hover:to-primary hover:text-secondary">
          <li>
            <Link href="/">about</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
