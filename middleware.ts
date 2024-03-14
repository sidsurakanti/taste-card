import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("middleware");

  // if user is directly trying to access /spotify
  // check if they have required tokens first
  if (request.nextUrl.pathname === "/spotify") {
    const cookies = request.cookies;
    const access_token = cookies.has("access_token");
    const refresh_token = cookies.get("refresh_token");

    if (access_token && refresh_token) {
      console.log(
        "ACCESS TOKEN AND REFRESH TOKEN EXIST, REDIRECTING TO SPOTIFY PAGE",
      );
      return NextResponse.next();
    } else if (!access_token && refresh_token) {
      console.log("ACCESS TOKEN EXPIRED, REFRESHING TOKENS");
      return NextResponse.redirect(
        "http://localhost:3000/callback?refresh=true",
      );
    }

    console.log("NO TOKENS FOUND, REDIRECTING BACK TO HOME PAGE");
    return NextResponse.redirect("http://localhost:3000/#error");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/spotify"],
};
