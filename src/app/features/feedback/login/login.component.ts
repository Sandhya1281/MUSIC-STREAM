import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatSnackBarModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  feedbackData = {
    name: '',
    email: '',
    message: ''
  };

  constructor(private snackBar: MatSnackBar) {}

  onSubmit(form: any) {
    if (form.valid) {
      this.snackBar.open('Thank you for your feedback!', 'Close', { duration: 3000 });
      form.resetForm();
    }
  }
}
