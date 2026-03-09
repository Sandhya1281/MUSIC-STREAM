export interface Song {
  id: string;
  title: string;
  artistId: string;
  artistName?: string; // resolved mapped artist name
  album: string;
  genre: string;
  duration: number; // in seconds
  coverUrl: string;
  audioUrl: string;
}
