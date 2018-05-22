import { Directive, HostListener, EventEmitter, Output, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appInfiniteScroller]'
})
export class InfiniteScrollerDirective {

  @Output() scrollPosition = new EventEmitter()
  @Input() loading = false
  
  constructor(public el: ElementRef) { }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    try {

      const top = event.target.scrollTop
      const height = this.el.nativeElement.scrollHeight
      const offset = this.el.nativeElement.offsetHeight

      // emit bottom event
      if (!this.loading && top > height - offset - 1) {
        this.scrollPosition.emit({position: 'bottom', el: this.el})
      }

      // emit top event
      if (!this.loading && top === 0) {
        this.scrollPosition.emit({position:'top', el: this.el})
      }

    } catch (err) {}
  }

}