import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { MusicService } from '../../../core/services/music.service';
import { Playlist } from '../../../core/models/playlist.model';

@Component({
  selector: 'app-playlist-manager',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatCardModule, MatButtonModule,
    MatIconModule, MatInputModule, MatFormFieldModule, MatSnackBarModule, MatListModule
  ],
  templateUrl: './playlist-manager.component.html',
  styleUrls: ['./playlist-manager.component.scss']
})
export class PlaylistManagerComponent implements OnInit {
  playlists: Playlist[] = [];
  playlistForm: FormGroup;
  editingId: string | null = null;

  constructor(
    private musicService: MusicService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
    this.playlistForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['']
    });
  }

  ngOnInit() {
    this.musicService.playlists$.subscribe(data => {
      this.playlists = data;
    });
  }

  onSubmit() {
    if (this.playlistForm.invalid) return;

    const formValue = this.playlistForm.value;

    if (this.editingId) {
      this.musicService.updatePlaylist({
        id: this.editingId,
        name: formValue.name,
        description: formValue.description,
        songIds: this.playlists.find(p => p.id === this.editingId)?.songIds || []
      });
      this.snackBar.open('Playlist updated successfully!', 'Close', { duration: 3000 });
      this.editingId = null;
    } else {
      this.musicService.addPlaylist({
        name: formValue.name,
        description: formValue.description,
        songIds: []
      });
      this.snackBar.open('Playlist created successfully!', 'Close', { duration: 3000 });
    }

    this.playlistForm.reset();
  }

  editPlaylist(playlist: Playlist) {
    this.editingId = playlist.id;
    this.playlistForm.patchValue({
      name: playlist.name,
      description: playlist.description
    });
  }

  deletePlaylist(id: string) {
    if (confirm('Are you sure you want to delete this playlist?')) {
      this.musicService.deletePlaylist(id);
      this.snackBar.open('Playlist deleted.', 'Close', { duration: 3000 });
      if (this.editingId === id) {
        this.editingId = null;
        this.playlistForm.reset();
      }
    }
  }

  cancelEdit() {
    this.editingId = null;
    this.playlistForm.reset();
  }
}
