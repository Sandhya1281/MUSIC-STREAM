import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin, map } from 'rxjs';
import { Song } from '../models/song.model';
import { Artist } from '../models/artist.model';
import { Playlist } from '../models/playlist.model';

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private playlistsSubject = new BehaviorSubject<Playlist[]>([]);
  public playlists$ = this.playlistsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialPlaylists();
  }

  getSongs(): Observable<Song[]> {
    return forkJoin({
      songs: this.http.get<Song[]>('/assets/data/songs.json'),
      artists: this.getArtists()
    }).pipe(
      map(({ songs, artists }) => {
        return songs.map(song => ({
          ...song,
          artistName: artists.find(a => a.id === song.artistId)?.name || 'Unknown Artist'
        }));
      })
    );
  }

  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>('/assets/data/artists.json');
  }

  getArtistById(id: string): Observable<Artist | undefined> {
    return this.getArtists().pipe(
      map(artists => artists.find(a => a.id === id))
    );
  }

  // Playlists
  private loadInitialPlaylists() {
    const saved = localStorage.getItem('playlists');
    if (saved) {
      this.playlistsSubject.next(JSON.parse(saved));
    } else {
      const initial: Playlist[] = [{ id: 'p1', name: 'My Favorites', description: 'Favorite tracks', songIds: ['s1'] }];
      this.playlistsSubject.next(initial);
      this.savePlaylists(initial);
    }
  }

  private savePlaylists(playlists: Playlist[]) {
    localStorage.setItem('playlists', JSON.stringify(playlists));
    this.playlistsSubject.next(playlists);
  }

  addPlaylist(playlist: Omit<Playlist, 'id'>) {
    const current = this.playlistsSubject.getValue();
    const newPlaylist: Playlist = {
      ...playlist,
      id: Date.now().toString()
    };
    this.savePlaylists([...current, newPlaylist]);
  }

  updatePlaylist(updated: Playlist) {
    const current = this.playlistsSubject.getValue();
    const index = current.findIndex(p => p.id === updated.id);
    if (index > -1) {
      current[index] = updated;
      this.savePlaylists([...current]);
    }
  }

  deletePlaylist(id: string) {
    const current = this.playlistsSubject.getValue();
    this.savePlaylists(current.filter(p => p.id !== id));
  }
}
