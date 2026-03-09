import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private favoritesSubject = new BehaviorSubject<string[]>([]);
  public favorites$ = this.favoritesSubject.asObservable();

  constructor() {
    const saved = localStorage.getItem('favoriteSongs');
    if (saved) {
      this.favoritesSubject.next(JSON.parse(saved));
    }
  }

  toggleFavorite(songId: string) {
    const current = this.favoritesSubject.getValue();
    let updated: string[];
    if (current.includes(songId)) {
      updated = current.filter(id => id !== songId);
    } else {
      updated = [...current, songId];
    }
    this.favoritesSubject.next(updated);
    localStorage.setItem('favoriteSongs', JSON.stringify(updated));
  }

  isFavorite(songId: string): boolean {
    return this.favoritesSubject.getValue().includes(songId);
  }
}
