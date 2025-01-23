import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class MessageService {

constructor(private http:HttpClient,public snackBar: MatSnackBar) { }
status:any
successMsg(flag:any){
  this.status='Success'
  if(flag=='SS'){
    this.snackBar.open('Saved successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='SU'){
    this.snackBar.open('Updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='VS'){
    this.snackBar.open('Verified successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='SD'){
    this.snackBar.open('Deleted successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='GEN_OTP'){
    this.snackBar.open('Generate OTP', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }

  if(flag=='TYP_OTP'){
    this.snackBar.open('Type OTP', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }

  if(flag=='EMAIL_ACCEPT'){
    this.snackBar.open('Email Accepted', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='ADD_WISHLIST'){
    this.snackBar.open('Added to wishlist', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='PHOTO_UP_CORECT'){
    this.snackBar.open('Upload Successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  }

}
errorMsg(flag:any){
  if(flag=='ES'){
    this.snackBar.open('Save Failed!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  
  }
  if(flag=='EU'){
    this.snackBar.open('Update Failed!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

  }
  if(flag=='ED'){
    this.snackBar.open("Can't Be Deleted!", '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='ND'){
    this.snackBar.open('No Data Found!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

  }
  if(flag=='PH_EX'){
    this.snackBar.open('Phone Number is Already Exists', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }

  if(flag=='MOB_10'){
    this.snackBar.open('Mobile Number Should Be 10 Digit & Number', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }

  if(flag=='MWRNG_MOB'){
    this.snackBar.open('Your Mobile Number Is Wrong', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='INV_AADHAAR'){
    this.snackBar.open('Invalid Aadhaar number', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }

  if(flag=='OTP_NOT_MAT'){
    this.snackBar.open('Invalid OTP', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }

  if(flag=='EMAIL_EXIT'){
    this.snackBar.open('Already Exists', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='DLT_WISHLIST'){
    this.snackBar.open('Removed from wishlist', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }
  if(flag=='PHOTO_NOTUP_CORECT'){
    this.snackBar.open('Please Upload Correct Format', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
  }
}
globalError(msg:any){
  this.snackBar.open(msg, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

}
globalInfo(msg:any){
  this.snackBar.open(msg, '×', { panelClass: 'info', verticalPosition: 'top', duration: 8000 });

}
globalWarning(msg:any){
  this.snackBar.open(msg, '×', { panelClass: 'warning', verticalPosition: 'top', duration: 3000 });

}
globalSuccess(msg:any){
  this.snackBar.open(msg, '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

}
}
