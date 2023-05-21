import Image from "next/image"
import Link from "next/link"

interface userProfile {
    username: string | undefined;
    realname: string | undefined;
    profile_url: string | undefined;
}

export default function CreateProfile ({ username, realname, profile_url }: userProfile) {
    return (
        <div className="w-2/6 min-w-max">
            <span 
                className="bg-transparent
                           border-2 border-[rgba(0,0,0,0.2)]
                           text-black 
                           rounded-3xl 
                           flex flex-row 
                           justify-center 
                           gap-4 
                           my-3 
                           mx-3 
                           p-4"
            >
                <Image 
                    src={profile_url || ''}
                    alt="User profile picture"
                    width={80}
                    height={80}
                    className="rounded-full"
                    priority={true}
                    unoptimized={true}
                />

                <div className="p-4 space-y-0.25">
                    <p className="text-2xl">{realname}</p>
                    <p className="font-normal text-gray-800">/
                        <Link href={`https://last.fm/user/${username}`} prefetch={true}>
                            {username}
                        </Link>
                    </p>
                </div>
            </span>
        </div>
    )
}