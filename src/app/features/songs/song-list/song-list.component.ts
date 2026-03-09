import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MusicService } from '../../../core/services/music.service';
import { AudioService } from '../../../core/services/audio.service';
import { UserService } from '../../../core/services/user.service';
import { Song } from '../../../core/models/song.model';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-song-list',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatCardModule, MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule,
    FilterPipe, HighlightDirective
  ],
  templateUrl: './song-list.component.html',
  styleUrls: ['./song-list.component.scss']
})
export class SongListComponent implements OnInit {
  songs: Song[] = [];
  searchText = '';
  currentSongId: string | undefined;

  constructor(
    private musicService: MusicService,
    private audioService: AudioService,
    public userService: UserService
  ) {}

  ngOnInit() {
    this.musicService.getSongs().subscribe(data => {
      this.songs = data;
    });

    this.audioService.currentSong$.subscribe(song => {
      this.currentSongId = song?.id;
    });
  }

  playSong(song: Song) {
    this.audioService.playSong(song);
  }

  toggleFavorite(song: Song, event: Event) {
    event.stopPropagation();
    this.userService.toggleFavorite(song.id);
  }
}
