import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AudioService } from '../../../core/services/audio.service';
import { Song } from '../../../core/models/song.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-song-player',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, MatCardModule, MatButtonModule, MatIconModule, MatSliderModule],
  templateUrl: './song-player.component.html',
  styleUrls: ['./song-player.component.scss']
})
export class SongPlayerComponent implements OnInit, OnDestroy {
  currentSong: Song | null = null;
  isPlaying = false;
  progress = 0;
  private subs: Subscription = new Subscription();

  constructor(public audioService: AudioService) {}

  ngOnInit() {
    this.subs.add(this.audioService.currentSong$.subscribe(song => this.currentSong = song));
    this.subs.add(this.audioService.playing$.subscribe(playing => this.isPlaying = playing));
    this.subs.add(this.audioService.progress$.subscribe(prog => this.progress = prog));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.audioService.pause();
    } else {
      this.audioService.resume();
    }
  }

  onSliderChange(event: any) {
    if (event.value !== null) {
      this.audioService.seek(event.value);
    }
  }

  formatTime(seconds: number): string {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }
}
