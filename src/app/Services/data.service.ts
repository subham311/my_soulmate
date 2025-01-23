import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpHeaders  } from '@angular/common/http';
import { environment } from 'src/environments/environment';
// import  { io, Socket }  from 'socket.io-client';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { BYPASS_LOG } from '../Interceptors/app-interceptor.interceptor';
import { SecrectDataService } from './SecrectData.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  // private socket!: Socket;
  showInfo=new Subject<any>()
  userName_PhoneSend = new BehaviorSubject('');
  searchPartner = new BehaviorSubject('');
  loginStatus: Boolean = false;
  loginData:any;

  afterLogShowBack = new BehaviorSubject('');

  
  sidebar_Check = new BehaviorSubject<boolean | undefined>(undefined);
  pageNameCheck =  new BehaviorSubject<String | undefined>(undefined);



  /***** SUMAN MITRA  */
  private profile_pic = new BehaviorSubject<string>(null);
  /*******END */  
  //  Use Subject Behaibair For load time Show User Detail On the Header Start____________
  // afterLoginUserDetSend = new BehaviorSubject('');
  afterLoginUserThumSend = new BehaviorSubject('');
  // subscriptionRespon = new BehaviorSubject('');
  // afterLoginUserMemberSend = new BehaviorSubject('');
  //  Use Subject Behaibair For load time Show User Detail On the Header End____________
  
  constructor(private http: HttpClient, private sds:SecrectDataService) { 


  }

  local_service(url:any){
    return this.http.get(url);  
  }


  getProfilePic(profile__pic) {
    this.afterLoginUserThumSend.next(profile__pic);
  }

  // getPaymentRes(profile__pic) {
  //   this.subscriptionRespon.next(profile__pic);
  // }
 
  global_service(flag:any, api_path:any, data:any,__bypass_log:any | undefined = false ){
    const header = new HttpHeaders().set('api_key', 'U3luZXJnaWNTb2xlTWF0ZQ==').set('api_secret', 'U3luZXJnaWNTb2xlTWF0ZTIwMjNA')
     // FLAG : 1 -> POST || 0 -> GET
    if(flag > 0){
    // EX: data = {id: this.id, dt: this.dt};
    return this.http.post(environment.api_url + api_path, data, {
      headers: header
    });
    }else{
      // EX: data = 'id=' + this.id + '&dt=' + this.dt
      var api_dt = data ? '?' + data : '';
      return this.http.get(environment.api_url + api_path + api_dt, {
        headers: header,
        context:new HttpContext().set(BYPASS_LOG,  __bypass_log) //SUMAN MITRA ADDED THIS
      });
    }
  }

 /*** FOR CONVERTING NORMAL MODEL INTO FORMDATA */
  convertFormData(obj) {
    const formData = new FormData();
    Object.keys(obj).forEach((key) => formData.append(key, (obj[key] ? obj[key] : '')));
    return formData;
  }

  login(){

    var urlComon = this.sds.getLocalSecrectData();

  this.loginData = {
  // id:localStorage.getItem("id"),
  // user_name:localStorage.getItem("​​​user_name")

  id: 'data' in this.sds.getLocalSecrectData() ? this.sds.getLocalSecrectData().data.id : '',
  user_name: 'data' in this.sds.getLocalSecrectData() ? this.sds.getLocalSecrectData().data.​user_name : ''
  }

  // console.log(this.sds.getLocalSecrectData().data.id, '=====', this.sds.getLocalSecrectData().data.​user_name);


  if(this.loginData.id && this.loginData.user_name){

  this.loginStatus = true;
  
  } else {
    this.loginStatus = false;
  }
  
  return this.loginStatus;
     
  }

}
