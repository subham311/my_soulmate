import { DOCUMENT } from '@angular/common';
import { Directive, EventEmitter, HostListener, Inject, Output } from '@angular/core';

@Directive({
  selector: '[Scroll]'
})
export class ScrollDirective {
  
  @Output() reachEnd = new EventEmitter<boolean>(false);
  constructor(
   @Inject(DOCUMENT) document:any
  ) { }

  @HostListener('window:scroll', ['$event'])
  onScroll(event) {
    // do tracking
    // Listen to click events in the component
    // let tracker = event.target;
    // let limit = tracker.scrollHeight - tracker.clientHeight;
    // if (event.target.scrollTop === limit) {
    //   this.reachEnd.emit(event);
    // }
    
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // you're at the bottom of the page
      this.reachEnd.emit(true);
      }
      else{
      this.reachEnd.emit(false);
      }
  }


}
