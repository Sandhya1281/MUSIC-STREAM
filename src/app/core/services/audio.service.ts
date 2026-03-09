import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Song } from '../models/song.model';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  private audioObj = new Audio();
  private currentSongSubject = new BehaviorSubject<Song | null>(null);
  private playingSubject = new BehaviorSubject<boolean>(false);
  private progressSubject = new BehaviorSubject<number>(0);

  public currentSong$ = this.currentSongSubject.asObservable();
  public playing$ = this.playingSubject.asObservable();
  public progress$ = this.progressSubject.asObservable();

  constructor() {
    this.audioObj.addEventListener('timeupdate', () => {
      this.progressSubject.next(this.audioObj.currentTime);
    });
    this.audioObj.addEventListener('ended', () => {
      this.playingSubject.next(false);
      this.progressSubject.next(0);
    });
  }

  playSong(song: Song) {
    if (this.currentSongSubject.getValue()?.id === song.id) {
      this.resume();
      return;
    }
    this.currentSongSubject.next(song);
    this.audioObj.src = song.audioUrl;
    this.audioObj.load();
    this.play();
  }

  play() {
    this.audioObj.play();
    this.playingSubject.next(true);
  }

  pause() {
    this.audioObj.pause();
    this.playingSubject.next(false);
  }

  resume() {
    if(this.audioObj.src) {
      this.play();
    }
  }

  seek(time: number) {
    this.audioObj.currentTime = time;
  }
}
