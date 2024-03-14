// ---- LAST.FM TYPES ----
interface LastFmTrack {
  name: string;
  playcount: string;
  mbid: string;
  url: string;
  artist: LastFmArtist;
  duration: string;
  image: LastFmImage[];
}

interface LastFmUser {
  name: string;
  age: string;
  subscriber: string;
  realname: string;
  bootstrap: string;
  playcount: string;
  artist_count: string;
  track_count: string;
  album_count: string;
  playlists: string;
  image: LastFmImage[];
  registered: { unixtime: string; "#text": number };
  country: string;
  gender: string;
  url: string;
  type: string;
}

interface LastFmTrackInfo {
  name: string;
  url: string;
  duration: string;
  streamable: {
    "#text": string;
    fulltrack: string;
  };
  listeners: string;
  playcount: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  album: {
    artist: string;
    title: string;
    url: string;
    image: LastFmImage[];
  };
  toptags: {
    tag: {
      name: string;
      url: string;
    }[];
  };
  wiki: {
    published: string;
    summary: string;
    content: string;
  };
}

interface LastFmImage {
  "#text": string;
  size: "small" | "medium" | "large" | "extralarge";
}

interface LastFmArtist {
  name: string;
  mbid: string;
  url: string;
}

// ---- SPOTIFY TYPES ----
interface SpotifyAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface SpotifyClientCredsToken {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface SpotifyUser {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  href: string;
  id: string;
  images: SpotifyImage[];
  product: string;
  type: string;
  uri: string;
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyTrack {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: SpotifyTrackItem[];
}

interface SpotifyTrackItem {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string; ean: string; upc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: any; // api doesn't specify type
  restrictions: "market" | "product" | "explicit";
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

interface SpotifyAlbum {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: "market" | "product" | "explicit";
  type: string;
  uri: string;
  artists: SpotifyArtist[];
}

interface SpotifyArtist {
  external_urls: { spotify: string };
  followers: { href: string; total: number };
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
}

export type {
  LastFmTrack,
  LastFmUser,
  LastFmTrackInfo,
  SpotifyAuthToken,
  SpotifyClientCredsToken,
  SpotifyUser,
  SpotifyTrack,
  SpotifyAlbum,
  SpotifyArtist,
  SpotifyTrackItem,
};
