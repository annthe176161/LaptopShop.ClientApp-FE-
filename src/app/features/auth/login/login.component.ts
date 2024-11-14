import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  showPassword: boolean = false;

  constructor() {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (this.email === 'user@example.com' && this.password === 'password') {
      alert('Login successful');
    } else {
      alert('Invalid email or password');
    }

    if (this.rememberMe) {
      console.log('Remember me is checked');
      // Xử lý nhớ đăng nhập (có thể lưu email trong local storage)
    }
  }
}
