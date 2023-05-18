import Link from "next/link";


export default function SearchBar ( { username, handleChange } : {username: string, handleChange: any} ) {
    return (
        <div>
            <form onSubmit={(e) => {e.preventDefault()}}>
                <input
                    type="text"
                    value={username}
                    onChange={handleChange}
                    placeholder="Enter username..."
                    className="outline-none p-4 text-xl bg-transparent text-white"
                />
                <Link href={`/results?username=${username}`}>
                    <button type="submit"></button>
                </Link>
        </form>
      </div>
    )
}