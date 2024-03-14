import { NextRequest, NextResponse } from "next/server";
import { cookieStore } from "@lib/actions";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import {
  SpotifyOAuth,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
} from "@lib/spotify";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { SpotifyAuthToken } from "@lib/defintions";

export async function GET(req: NextRequest) {
  const searchParams: URLSearchParams = req.nextUrl.searchParams;

  // if spotify user authorization failed
  const error: string | null = searchParams.get("error");
  const state: string | null = searchParams.get("state");
  const refresh: string | null = searchParams.get("refresh");

  const spotifyOAuth: SpotifyOAuth = new SpotifyOAuth(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
  );

  // user authorization code given once user authorizes our app
  // we can use this to get the access and refresh tokens
  const code: string = searchParams.get("code")!;

  // check if tokens already exist in cookies
  const cookies: ReadonlyRequestCookies = cookieStore();
  const access_token: RequestCookie | undefined = cookies.get("access_token");
  const refresh_token: RequestCookie | undefined = cookies.get("refresh_token");

  // TODO: clean this up
  if (refresh === "true" && refresh_token) {
    console.log("REFRESHING TOKENS");
    const tokens: SpotifyAuthToken = await spotifyOAuth.refreshAccessToken(
      refresh_token.value,
    );
    SpotifyOAuth.addTokensToCookies(cookies, tokens);

    return NextResponse.redirect("http://localhost:3000/spotify");
  }

  // TODO: handle state checking more gracefully
  if (error || !state)
    return NextResponse.redirect("http://localhost:3000/#error");
  // both access token already exist, redirect to results page
  else if (access_token) {
    console.log("ACCESS TOKEN ALREADY SET");
    return NextResponse.redirect("http://localhost:3000/spotify");
  }

  // refresh token flow
  else if (!access_token && refresh_token) {
    console.log("ACCESS TOKEN EXPIRED, REFRESHING TOKENS");
    try {
      const tokens: SpotifyAuthToken = await spotifyOAuth.refreshAccessToken(
        refresh_token.value,
      );
      SpotifyOAuth.addTokensToCookies(cookies, tokens);
    } catch (e) {
      console.error(e);
      return NextResponse.redirect("http://localhost:3000/#error");
    }
  } else {
    console.log("NO TOKENS FOUND, SETTING NEW TOKENS");

    // request a completely new token
    try {
      const token = await spotifyOAuth.exchangeAuthCodeForToken(code);
      SpotifyOAuth.addTokensToCookies(cookies, token);
    } catch (e) {
      console.error(e);
      return NextResponse.redirect("http://localhost:3000/#error");
    }
  }

  console.log("SET ACCESS TOKEN AND REFRESH TOKEN COOKIES");
  // redirect response to results page
  return NextResponse.redirect("http://localhost:3000/spotify");
}
