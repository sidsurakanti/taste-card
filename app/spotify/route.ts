import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;

export async function GET(request: NextRequest, response: NextResponse) {
	const cookiesList = cookies();
	const token = cookiesList.has("token");

	// if token already exists in cookies, return
	if (token) {
		console.log("token already exists in cookies");
		return new NextResponse("Success");
	}

	// set new params for getting access token from spotify endpoints
	const params = new URLSearchParams({
		grant_type: "client_credentials",
		client_id: CLIENT_ID,
		client_secret: CLIENT_SECRET,
	});

	// fetch access token from spotify
	const res = await fetch("https://accounts.spotify.com/api/token", {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: params.toString(),
	});
	const data = await res.json();

	// set access token in cookies
	// response.cookies.set("access_token", data.access_token);
	console.log("set cookie");

	// set access token in cookies
	return new NextResponse("Hello world,", {
    status: 200,
    headers: {
      "Set-Cookie": `token=${data.access_token}`
    }
  });
}
