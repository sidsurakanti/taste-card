import Image from "next/image";
import 'public/styles.css'


interface userProfile {
    username: string | undefined;
    realname: string | undefined;
    profile_url: string | undefined;
}

export default function CreateProfile ({ username, realname, profile_url }: userProfile) {
    return (
        <div className="w-2/6 min-w-max">
            <span className="profile text-white rounded-3xl flex flex-row justify-center gap-4 my-3 mx-3 p-4">
                <Image 
                    src={profile_url}
                    alt="User profile picture"
                    width={80}
                    height={80}
                    className="rounded-full"
                    priority={true}
                    unoptimized={true}
                />

                <div className="p-4 space-y-0.25">
                    <p className="text-2xl">{realname}</p>
                    <p className="font-light text-gray-200">/{username}</p>
                </div>
            </span>
        </div>
    )
}