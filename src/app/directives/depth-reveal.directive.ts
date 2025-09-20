import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[revealDepth]',
  standalone: true
})
export class DepthRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0; // ms
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef, private r: Renderer2) {}

  ngOnInit() {
    const base = ['opacity-0','scale-[0.92]','blur-sm','transition','duration-[1100ms]','ease-in-out','transform-gpu','will-change-transform'];
    base.forEach(c => this.r.addClass(this.el.nativeElement, c));

    this.observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          this.r.removeClass(this.el.nativeElement, 'opacity-0');
          this.r.removeClass(this.el.nativeElement, 'scale-[0.92]');
          this.r.removeClass(this.el.nativeElement, 'blur-sm');
          this.r.addClass(this.el.nativeElement, 'opacity-100');
          this.r.addClass(this.el.nativeElement, 'scale-100');
          this.r.addClass(this.el.nativeElement, 'blur-0');
        }, this.revealDelay);
        this.observer?.disconnect();
      }
    }, { threshold: 0.15 });

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() { this.observer?.disconnect(); }
}
