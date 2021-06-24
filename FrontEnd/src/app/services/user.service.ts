import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 import {config} from '../config/config';
@Injectable({
  providedIn: 'root'
})
export class UserService {
    private currentUserSubject: BehaviorSubject<any>;
    private currentUser: Observable<any>;
  constructor(private http:HttpClient) {

    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();


  }

    public get currentUserValue(){
        return this.currentUserSubject.value
    }

  register(data):Observable<any>{
    return this.http.post<any>(config.LEARNERS+`/users/register/`,data)
  }

  companyRegister(data , userDara):Observable<any>{
    return this.http.post<any>(config.LEARNERS+`/users/company-register/`,{data , userDara})
  }


  login(url ,email:string , password:string):Observable<any>{


    return this.http.post<any>(config.LEARNERS+`/users/authenticate/`,{email , password})
    .pipe(map(user=>{
        if(user && user.token){
            localStorage.setItem('currentUser' ,JSON.stringify(user));
            this.currentUserSubject.next(user);
        };
        return user;
    }))


  }

  creatjob(objjob , fileobj):Observable<any>{
    return this.http.post<any>(config.LEARNERS+`/users/create-job/`, {objjob  ,fileobj})

  }

  fileUpload(file ,id): Observable<any> {
    return this.http.post(`http://localhost:3000/projectupload/${id}`, file);

  }

  loadData(id):Observable<any>{
    return this.http.get(`http://localhost:3000/users/load-job/${id}`);
  }

  getByIdJob(id):Observable<any>{
    return this.http.get(`http://localhost:3000/users/get-by-id-job/${id}`);
  }

  downloadFile(data): Observable<any>{

    return this.http.post('http://localhost:3000/users/download',data ,{responseType:'blob'});

}

downloadCVFile(data): Observable<any>{

    return this.http.post('http://localhost:3000/users/downloadfile',data ,{responseType:'blob'});

}

fileCVUpload(file ,id): Observable<any> {
    return this.http.post(`http://localhost:3000/projectfileupload/${id}`, file);

  }


  saveJobApplied(objjob , fileobj):Observable<any>{
    return this.http.post<any>(config.LEARNERS+`/users/create-apply-job/`, {objjob  ,fileobj})

  }

  getByIdJobApplied(id) {
    return this.http.get(`http://localhost:3000/users/get-apply-job/${id}`);
  }

  getByIdstudent(id) {
    return this.http.get(`http://localhost:3000/users/get-student/${id}`);
  }

  getProfileData(id) {
    return this.http.get(`http://localhost:3000/users/get-profile/${id}`);
  }


  updateJob(id) {
    return this.http.patch(`http://localhost:3000/users/update-job/${id}`,'');
  }

  myAppliedJobs(id){
    return this.http.get(`http://localhost:3000/users/my-job/${id}`)
  }

  deleteJob(id) {
    return this.http.delete(`http://localhost:3000/users/delete-job/${id}`)
  }

  logout(): void {

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }


}
