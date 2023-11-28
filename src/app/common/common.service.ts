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
  token = localStorage.getItem('accessToken')
  headerOptions: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `${this.token}`
    })
  };

  private loginstatus = new BehaviorSubject<object>({
    status: false,
    username: "",
    user_id: "",
    token: ""
  });
  castLogin = this.loginstatus.asObservable();



  constructor(private httpClient: HttpClient, private _router: Router) { }

  public selectedTopicID: any;

  public get(endPoints: String) {
    return this.httpClient.get(this.url + endPoints, this.headerOptions)
  }

  public post(postData: Object, endPoints: String) {
    console.log("this.headerOptions>>>>>>>>>>", this.headerOptions)
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

  public setLoggedIn(status: any, username: any, user_id: any, token: any) {
    this.loginstatus.next({ status, username, user_id, token });
  }
  public getLoggedIn() {
    return this.loginstatus.value;
  }

  public getTokenDetails(param: string) {
    const gettoken: any = this.token;
    const decoded: any = jwt_decode(gettoken);
    return decoded[param];
  }

  private quizStatus = new BehaviorSubject<object>({ status: false, currentUrl: "", userId: "" });

  castQuizStatus = this.quizStatus.asObservable();

  public setQuizStatus(status: any, currentUrl: any, userId: any) {
    console.log(">>>>>>>>>>>>>>>>>>>>>status>>>>>>>>>>>>>>>>>>>", status, currentUrl, userId)
    this.quizStatus.next({ status, currentUrl, userId });
  }
  public getQuizStatus() {
    console.log(">>>>>>>>>>>>>>>>>this.castLogin>>>>>>>>>>>>>>>>>>>>>>>", this.castQuizStatus)
    return this.castQuizStatus;
  }

  // private listingData = new BehaviorSubject<object>({ data: "" });
  // castListingData = this.listingData.asObservable();

  // public setListingData(data: any) {
  //   console.log(">>>>>>>>>In SET", data)
  //   this.listingData.next({ data })
  // }
  // public getListingData() {
  //   console.log(">>>>>>>>>>In GET", this.castListingData)
  //   return this.castListingData;
  // }

}
