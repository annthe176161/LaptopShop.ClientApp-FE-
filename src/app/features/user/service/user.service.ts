import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'https://localhost:7204/api/User';

  constructor(private http: HttpClient) {}

  // Lấy danh sách khách hàng có phân trang và tìm kiếm
  getCustomers(
    page: number,
    pageSize: number,
    search: string = ''
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get<any>(`${this.baseUrl}/customers`, { params }).pipe(
      catchError((error) => {
        console.error('Error fetching customers:', error);
        return throwError(error);
      })
    );
  }

  // Thay đổi quyền truy cập của người dùng
  toggleUserAccess(userId: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/toggle-access/${userId}`, {})
      .pipe(
        catchError((error) => {
          console.error('Error toggling user access:', error);
          return throwError(error);
        })
      );
  }

  // Lọc người dùng không hoạt động
  getInactiveUsers(daysInactive: number): Observable<any> {
    const params = new HttpParams().set(
      'daysInactive',
      daysInactive.toString()
    );

    return this.http
      .get<any>(`${this.baseUrl}/inactive-users`, { params })
      .pipe(
        catchError((error) => {
          console.error('Error fetching inactive users:', error);
          return throwError(error);
        })
      );
  }

  // Gửi lời mời cho người dùng
  inviteUser(userId: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/invite-user/${userId}`, {})
      .pipe(
        catchError((error) => {
          console.error('Error inviting user:', error);
          return throwError(error);
        })
      );
  }
}
