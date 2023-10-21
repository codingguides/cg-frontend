import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  url: string = `${environment.apiURL}/api/`;
  token = localStorage.getItem("accessToken");
  headerOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    })
  };
  private loginstatus = new BehaviorSubject<object>({ status: false, username: "" });
  // obj={
  //   status:false,
  //   uername :""
  // }
  castLogin = this.loginstatus.asObservable();

  constructor(private httpClient: HttpClient, private _router: Router) { }

  public get(endPoints: String) {
    return this.httpClient.get(this.url + endPoints, this.headerOptions)
  }

  public post(postData: Object, endPoints: String) {
    return this.httpClient.post(this.url + endPoints, postData, this.headerOptions)
  }

  public put(postData: Object, endPoints: String) {
    return this.httpClient.put(this.url + endPoints, postData, this.headerOptions)
  }

  public update(postData: Object, endPoints: String) {
    return this.httpClient.put(this.url + endPoints, postData, this.headerOptions)
  }

  public delete(endPoints: String) {
    return this.httpClient.delete(this.url + endPoints, this.headerOptions)
  }

  public login(postData: Object, endPoints: String) {
    return this.httpClient.post(this.url + endPoints, postData,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      })
  }

  public setLoggedIn(status: any, username: any) {
    console.log(">>>>>>>>>>>>>>>>>>>>>status>>>>>>>>>>>>>>>>>>>", status, username)
    this.loginstatus.next({ status, username });
  }
  public getLoggedIn() {
    console.log(">>>>>>>>>>>>>>>>>this.castLogin>>>>>>>>>>>>>>>>>>>>>>>", this.castLogin)
    return this.castLogin;
  }

  public getTokenDetails(param: string) {
    const gettoken: any = this.token;
    const decoded: any = jwt_decode(gettoken);
    return decoded[param];
  }

}
