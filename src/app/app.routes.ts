import { Routes } from '@angular/router';
import { SongListComponent } from './features/songs/song-list/song-list.component';
import { ArtistDetailComponent } from './features/artists/artist-detail/artist-detail.component';
import { PlaylistManagerComponent } from './features/playlists/playlist-manager/playlist-manager.component';
import { SongPlayerComponent } from './features/player/song-player/song-player.component';
import { LoginComponent } from './features/feedback/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: '/songs', pathMatch: 'full' },
  { path: 'songs', component: SongListComponent },
  { path: 'artists/:id', component: ArtistDetailComponent },
  { path: 'playlists', component: PlaylistManagerComponent },
  { path: 'now-playing', component: SongPlayerComponent },
  { path: 'feedback', component: LoginComponent },
];
