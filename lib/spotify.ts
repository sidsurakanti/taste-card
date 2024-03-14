import type {
  SpotifyAuthToken,
  SpotifyClientCredsToken,
  SpotifyUser,
  SpotifyArtist,
  SpotifyTrack,
} from "@lib/defintions";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import type { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies";

class SpotifyOAuth {
  private readonly client_id: string;
  private readonly client_secret: string;
  private readonly callbackUrl: string;
  private readonly endpoint: string;

  /**
   * @property {string} client_id -  The client id for your spotify app
   * @property {string} client_secret -  The client secret for your spotify app
   * @property {string} callbackUrl
   *    This parameter is used for validation only (there is no actual redirection).
   *    The value of this parameter must exactly match the value of redirect_uri
   *    supplied when requesting the authorization code.
   * @property {string} endpoint - The endpoint for the spotify API
   */
  constructor(client_id: string, client_secret: string, callbackUrl: string) {
    this.client_id = client_id;
    this.client_secret = client_secret;
    this.callbackUrl = callbackUrl;
    this.endpoint = "https://accounts.spotify.com/api/token";
  }

  /**
   * @param {string} code - The authorization code returned after user authorization
   * @returns {Promise<SpotifyAuthToken>} - Can be used to access the Spotify API (including user specific data)
   *
   * @see https://developer.spotify.com/documentation/web-api/tutorials/code-flow
   */
  public async exchangeAuthCodeForToken(
    code: string,
  ): Promise<SpotifyAuthToken> {
    const params: URLSearchParams = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: this.callbackUrl,
    });

    const res: Response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + this.getBase64EncodedClientCredentials(),
      },
      body: params.toString(),
    });

    const token: SpotifyAuthToken = await res.json();
    // console.log(token)

    console.log("FETCHED ACCESS TOKEN FROM SPOTIFY");
    return token;
  }

  /**
   * @returns {Promise<SpotifyClientCredsToken>} - Can be used to access the Spotify API
   * @see https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
   */
  public async exchangeClientCredsForToken(): Promise<SpotifyClientCredsToken> {
    const params = new URLSearchParams({
      grant_type: "client_credentials",
    });

    const res: Response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + this.getBase64EncodedClientCredentials(),
      },
      body: params.toString(),
      next: {
        revalidate: 3600,
      },
    });

    const token: SpotifyClientCredsToken = await res.json();

    console.log("FETCHED ACCESS TOKEN FROM SPOTIFY USING CLIENT CREDENTIALS");
    return token;
  }

  public async refreshAccessToken(
    refresh_token: string,
  ): Promise<SpotifyAuthToken> {
    const params: URLSearchParams = new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    });

    // post request to get access token from spotify using our refresh token
    const res: Response = await fetch(this.endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic " + this.getBase64EncodedClientCredentials(),
      },
      body: params.toString(),
      next: {
        revalidate: 0, // because the access token expires every hour
      },
    });

    // with authorization code flow, spotify doesn't return a new refresh token
    // so we have to add the old refresh token back to the response
    const newToken: SpotifyAuthToken = {
      ...(await res.json()),
      refresh_token: refresh_token,
    };

    // console.log(token);

    if (!res.ok)
      console.error(
        "ERROR REFRESHING ACCESS TOKEN",
        res.status,
        res.statusText,
      );

    console.log("REFRESHED ACCESS TOKEN");

    return newToken;
  }

  private getBase64EncodedClientCredentials(): string {
    return Buffer.from(
      `${this.client_id}:${this.client_secret}`,
      "utf-8",
    ).toString("base64");
  }

  static addTokensToCookies(
    cookies: RequestCookies | ReadonlyRequestCookies,
    tokens: SpotifyAuthToken,
  ): void {
    // set access token cookie
    cookies.set("access_token", tokens.access_token, {
      httpOnly: true,
      maxAge: 3600, // 1 hour (the time it takes for the spotify access token to expire)
    });

    // set refresh token cookie
    cookies.set("refresh_token", tokens.refresh_token, {
      httpOnly: true, // make sure cookie is only accessible server side
    });
  }
}

class SpotifyAPI {
  static endpoint = "https://api.spotify.com/v1";
  private token: Partial<SpotifyAuthToken>;

  constructor(token: Partial<SpotifyAuthToken>) {
    this.token = token;
  }

  public async getUserDetails(): Promise<SpotifyUser> {
    // check if token is of type SpotifyAuthToken
    // because you can only get user data with a user auth token
    // throw error if not
    if (!this.isSpotifyAuthToken()) {
      throw new Error("INVALID TOKEN TYPE");
    }

    const res: Response = await fetch(`${SpotifyAPI.endpoint}/me`, {
      headers: {
        Authorization: "Bearer " + this.token.access_token,
      },
    });
    const user: SpotifyUser = await res.json();

    if (!res.ok) {
      console.error(
        "ERROR FETCHING USER DETAILS",
        res.status,
        res.statusText,
        user,
      );
      throw new Error("ERROR FETCHING USER DETAILS");
    }

    return user;
  }

  public async getUserTopTracks({
    limit,
    time_range,
  }: {
    limit: number;
    time_range: "short_term" | "medium_term" | "long_term";
  }): Promise<SpotifyTrack> {
    const res: Response = await fetch(
      `${SpotifyAPI.endpoint}/me/top/tracks?limit=${limit}&time_range=${time_range}`,
      {
        headers: {
          Authorization: "Bearer " + this.token.access_token,
        },
      },
    );

    if (!res.ok) {
      console.error(
        "ERROR FETCHING USER TOP TRACKS",
        res.status,
        res.statusText,
      );
      throw new Error("ERROR FETCHING USER TOP TRACKS");
    }

    const tracks: SpotifyTrack = await res.json();
    return tracks;
  }

  public async getArtistWithUrl(
    url: string,
    // token: Partial<SpotifyClientCredsToken> | Partial<SpotifyAuthToken>
  ): Promise<SpotifyArtist> {
    const res: Response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + this.token.access_token,
      },
    });

    if (!res.ok) {
      console.error(
        "ERROR FETCHING SPOTIFY ARTIST BY URL",
        res.status,
        res.statusText,
      );
      throw new Error("ERROR FETCHING SPOTIFY ARTIST BY URL");
    }

    const artist: SpotifyArtist = await res.json();

    console.log("FETCHED ARTIST FROM SPOTIFY");
    return artist;
  }

  public async getArtistWithName(name: string): Promise<SpotifyArtist> {
    const queries = new URLSearchParams({
      q: name,
      type: "artist",
      limit: "1",
    });

    const res = await fetch(
      `${SpotifyAPI.endpoint}/search?${queries.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${this.token.access_token}`,
        },
      },
    );

    if (!res.ok) {
      console.error(
        "ERROR FETCHING SPOTIFY ARTIST BY NAME",
        res.status,
        res.statusText,
      );
      throw new Error("ERROR FETCHING SPOTIFY ARTIST BY NAME");
    }

    const data = await res.json();
    const artist: SpotifyArtist = data.artists.items[0];

    console.log("FETCHED ARTIST FROM SPOTIFY");
    return artist;
  }

  private isSpotifyAuthToken(): boolean {
    return "refresh_token" in this.token;
  }

  // public set setToken(newToken: Partial<SpotifyAuthToken>) {
  // 	this.token = newToken;
  // }
}

export { SpotifyOAuth, SpotifyAPI };
export const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
export const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;
export const REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI as string;
export const spotifyOAuth = new SpotifyOAuth(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI,
);
