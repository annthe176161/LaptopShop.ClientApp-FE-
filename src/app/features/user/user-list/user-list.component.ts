import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { FormsModule } from '@angular/forms';
import * as XLSX from 'xlsx';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  customers: any[] = [];
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;
  searchTerm: string = '';
  inactivePeriod: number = -1;
  isLoading: boolean = false;
  searchSubject: Subject<string> = new Subject<string>();
  Math: any = Math;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadCustomers();

    // Lắng nghe sự thay đổi từ input search
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((term) => {
        this.searchTerm = term;
        this.page = 1;
        this.loadCustomers();
      });
  }

  // Tải danh sách khách hàng
  loadCustomers(): void {
    this.isLoading = true;
    this.userService
      .getCustomers(this.page, this.pageSize, this.searchTerm)
      .subscribe(
        (data: any) => {
          this.customers = Array.isArray(data) ? data : data.items || [];
          this.totalItems = data.totalItems || this.customers.length;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching customers:', error);
          this.customers = [];
          this.isLoading = false;
        }
      );
  }

  // Tìm kiếm khách hàng
  onSearch(term: string): void {
    this.searchSubject.next(term);
  }

  // Chuyển trang
  onPageChange(newPage: number): void {
    if (newPage > 0 && newPage <= Math.ceil(this.totalItems / this.pageSize)) {
      this.page = newPage;
      this.loadCustomers();
    }
  }

  // Thay đổi quyền truy cập
  toggleAccess(userId: string): void {
    this.userService.toggleUserAccess(userId).subscribe(
      () => {
        this.loadCustomers();
      },
      (error: any) => {
        console.error('Error updating user access:', error);
      }
    );
  }

  // Gửi lời mời cho người dùng
  inviteUser(userId: string): void {
    this.userService.inviteUser(userId).subscribe(
      () => {
        alert('Lời mời đã được gửi thành công!');
      },
      (error) => {
        console.error('Error inviting user:', error);
        alert('Không thể gửi lời mời. Vui lòng thử lại.');
      }
    );
  }

  // Lọc người dùng không hoạt động
  onFilterInactive(): void {
    this.loadCustomers();
  }

  // Xuất danh sách người dùng ra file Excel
  exportUserList(): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.customers.map((user) => ({
        'User ID': user.id,
        Name: user.name,
        Email: user.email,
        'Is Active': user.isActive ? 'Yes' : 'No',
        'Last Login Date': user.lastLoginDate,
      }))
    );

    const workbook: XLSX.WorkBook = {
      Sheets: { Users: worksheet },
      SheetNames: ['Users'],
    };

    XLSX.writeFile(workbook, `UserList-${new Date().toISOString()}.xlsx`);
  }
}
