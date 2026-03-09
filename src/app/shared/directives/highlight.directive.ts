import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {
  @Input() appHighlight: boolean = false;

  constructor(private el: ElementRef) {}

  ngOnChanges() {
    if (this.appHighlight) {
      this.el.nativeElement.style.backgroundColor = 'var(--highlight-bg, rgba(255, 64, 129, 0.1))';
      this.el.nativeElement.style.borderLeft = '4px solid var(--primary-color, #ff4081)';
    } else {
      this.el.nativeElement.style.backgroundColor = 'transparent';
      this.el.nativeElement.style.borderLeft = '4px solid transparent';
    }
  }
}
