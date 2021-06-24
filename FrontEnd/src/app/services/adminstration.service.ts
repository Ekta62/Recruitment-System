import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { config } from '../config/config';
import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class AdminstrationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  constructor(private http:HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

staffSave(data) {
    return this.http.post<any>(config.LEARNERS+`/staff/staff-save`,data)
}
getAllStaff():Observable<any>{
    return this.http.get<any>(config.LEARNERS+`/staff/getStaff`)
}




getByIdStaff(id):Observable<any>{
    return this.http.get<any>(config.LEARNERS+`/staff/getByIdStaff/${id}`)
}

updateSatff(obj):Observable<any> {   //patch danne update ekak wena nisa hode
    return this.http.patch<any>(config.LEARNERS+`/staff/updateSatff/`,obj)
}
studentSave(url , data) {
    return this.http.post<any>(config.LEARNERS+url,data)
}

logout() {
    this.currentUserSubject.next(null);
}



}
