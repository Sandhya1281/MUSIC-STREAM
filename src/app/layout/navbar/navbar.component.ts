import { Component, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  isDarkMode = true;

  constructor(@Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode if no theme is saved or if it is explicitly set to dark
    if (savedTheme === 'dark' || !savedTheme) {
      this.isDarkMode = true;
      this.renderer.addClass(this.document.body, 'dark-theme');
    } else {
      this.isDarkMode = false;
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.renderer.addClass(this.document.body, 'dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      this.renderer.removeClass(this.document.body, 'dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }
}
