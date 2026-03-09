import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MusicService } from '../../../core/services/music.service';
import { AudioService } from '../../../core/services/audio.service';
import { Artist } from '../../../core/models/artist.model';
import { Song } from '../../../core/models/song.model';

@Component({
  selector: 'app-artist-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatListModule],
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.scss']
})
export class ArtistDetailComponent implements OnInit {
  artist: Artist | undefined;
  artistSongs: Song[] = [];

  constructor(
    private route: ActivatedRoute,
    private musicService: MusicService,
    private audioService: AudioService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.musicService.getArtistById(id).subscribe(artist => this.artist = artist);
        this.musicService.getSongs().subscribe(songs => {
          this.artistSongs = songs.filter(s => s.artistId === id);
        });
      }
    });
  }

  playSong(song: Song) {
    this.audioService.playSong(song);
  }
}
