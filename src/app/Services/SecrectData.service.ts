import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class SecrectDataService {
private varName = 'Secret';

// private secretKey = 'your-secret-key';
private secretKey = 'S#O!*U8L0M3A9T7e!2&0#2$3S9Y4N3E$R7g8i2C';



constructor() { }
dataFrmLocal:any;

private encrypt(text: string): string {
  // console.log(text, 'texttexttext');
    const encrypted = CryptoJS.AES.encrypt(text, this.secretKey).toString();
    return encrypted;
  }

public decrypt(text: string): string {
  // console.log(text, 'decrypt');
    const decrypted = CryptoJS.AES.decrypt(text, this.secretKey).toString(CryptoJS.enc.Utf8);
    return decrypted;
  }  

setLocalSecrectData(obj:any){

  
  
 const localData = {
    data:obj,
    timeStamp:new Date().getTime()
 }

this.dataFrmLocal = this.getLocalSecrectData();

if(Object.keys(this.dataFrmLocal).length > 0){
  if('data' in this.dataFrmLocal)
    if(Object.keys(obj).length > 0){
      for(let dt of Object.keys(obj)){
        this.dataFrmLocal.data[dt] = obj[dt]
      }
      this.dataFrmLocal['timeStamp'] = new Date().getTime()
    }
}else{
  this.dataFrmLocal = localData
}
// console.log(this.dataFrmLocal, 'this.dataFrmLocal');


const encryptedText = this.encrypt(JSON.stringify(this.dataFrmLocal));

localStorage.setItem(this.varName,encryptedText);


// console.log(this.getLocalSecrectData().data, 'objjjjjjjjjj');

// const encryptedText = this.encrypt(JSON.stringify(localData));

// window.localStorage.setItem(this.varName,encryptedText);
 
}

getLocalSecrectData(){
    const rawText =  localStorage.getItem(this.varName);
    
    
    if(rawText){
      const decryptedText = this.decrypt(rawText);
      return JSON.parse(decryptedText);
    }
    
    return {};
}

dataDecrypt(data){
  // const rawText =  localStorage.getItem(this.varName);
  
  
  if(data){
    const decryptedText = this.decrypt(data);
    return JSON.parse(decryptedText);
  }
  
  return {};
}

// setLocalSecrectData(obj:any){

  
  
//   const localData = {
//      data:obj,
//      timeStamp:new Date().getTime()
//   }
 
 
//  console.log(this.getLocalSecrectData().data, 'objjjjjjjjjj');
 
//  const encryptedText = this.encrypt(JSON.stringify(localData));
 
//  window.localStorage.setItem(this.varName,encryptedText);
  
//  }
 
//  getLocalSecrectData(){
//      const rawText =  window.localStorage.getItem(this.varName);
     
     
//      if(rawText){
//        const decryptedText = this.decrypt(rawText);
//        return JSON.parse(decryptedText);
//      }
     
//      return {};
//  }

}
