import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { HomeComponent } from './core/components/home/home.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { UserListComponent } from './features/user/user-list/user-list.component';
import { ProductDetailComponent } from './features/product/product-detail/product-detail.component';

export const routes: Routes = [
  // Đường dẫn mặc định cho web app
  { path: '', component: HomeComponent },
  // Đường dẫn đến trang đăng nhập
  { path: 'login', component: LoginComponent },
  // Đường dẫn đến trang đăng ký
  { path: 'register', component: RegisterComponent },
  // Đường dẫn đến trang quản lý người dùng
  { path: 'user-list', component: UserListComponent },
  // Đường dẫn đến trang chi tiết sản phẩm
  { path: 'product-detail', component: ProductDetailComponent },
  // Route 404 cho các đường dẫn không tồn tại
  { path: '**', redirectTo: '' },
];
