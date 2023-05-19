export default function SearchBar ( { username, handleChange } : {username: string, handleChange: any} ) {
    return (
        <div>
            <form onSubmit={(e) => {e.preventDefault()}}>
                <input
                    type="text"
                    value={username}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    className="outline-none border-pink-200 border-l-4 p-3 p text-lg text-white bg-transparent"
                />
            </form>
        </div>
    )
}