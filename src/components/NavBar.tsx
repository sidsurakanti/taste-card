import Link from 'next/link';

export default function NavBar(){
    return (
        <nav className="flex bg-transparent text-lg text-white space-x-10 p-4 font-medium">
            <Link href="/">
                home
            </Link>
            <a href="https://github.com/sidsurakanti" target="_blank" rel="noopener noreferrer" className="">
                github
            </a>
            <a href="https://discord.com/users/521872289231273994" target="_blank" rel="noopener noreferrer" className="">
                discord
            </a>
        </nav>
    );
};
