import Search from '../../public/assets/Search.svg'
import Image from 'next/image'
export default function SearchBar ( { username, handleChange } : { username: string, handleChange: any } ) {
    return (
        <div>
            <form onSubmit={(e) => {e.preventDefault()}}>
               <div className="flex flex-row space-x-5 px-5 text-white bg-[rgba(217,217,217,0.1)] border border-[rgba(255,255,255,0.2)] rounded-xl">
                <Image src={Search} alt={''} className='py-5'/>
                <input
                    type="text"
                    value={username}
                    onChange={handleChange}
                    placeholder="Enter Username"
                    className="outline-none border-l border-[rgba(255,255,255,0.2)] py-5 pl-5 bg-transparent "
                />
                </div>
            </form>
        </div>
    )
}