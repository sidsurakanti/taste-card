"use server";

import { CLIENT_ID } from "@/lib/spotify";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// redirect user to the spotify website to authorize this app
export async function authorizeSpotify(): Promise<void> {
  const REDIRECT_URI = "http://localhost:3000/callback";

  // this helps to prevent CSRF attacks
  // random string to check later after we recieve a callback from spotify
  // see: https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow
  const state = (Math.random() + 1).toString(36).substring(2);

  // we need the first two scopes to get the user profile
  // and the last one to get the user's top tracks
  const scopes = "user-read-private user-read-email user-top-read";

  const query = new URLSearchParams({
    response_type: "code",
    client_id: CLIENT_ID,
    scope: scopes,
    redirect_uri: REDIRECT_URI,
    state: state,
  });
  const url = "https://accounts.spotify.com/authorize?" + query.toString();

  redirect(url);
}

export const cookieStore = () => cookies();
