import { Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';

type Dir = 'left' | 'right' | 'up' | 'down';

@Directive({
  selector: '[revealOnScroll]',
  standalone: true
})
export class RevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;                 // ms
  @Input() revealDirection: Dir = 'up';     // 'left' | 'right' | 'up' | 'down'

  private observer?: IntersectionObserver;
  private visible = false;
  private initTranslate = '';               // e.g., 'translate-x-16' or '-translate-x-16'
  private translateZero = '';               // 'translate-x-0' or 'translate-y-0'
  private onScrollTopReset = this.handleScrollTopReset.bind(this);

  constructor(private el: ElementRef, private r: Renderer2) { }

  ngOnInit() {
    this.setupClasses();
    this.observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting && !this.visible) {
          setTimeout(() => this.reveal(), this.revealDelay);
        }
      }
    }, { threshold: 0.15 });
    this.observer.observe(this.el.nativeElement);

    // reset animation whenever user returns to top and scrolls down again
    window.addEventListener('scroll', this.onScrollTopReset, { passive: true });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    window.removeEventListener('scroll', this.onScrollTopReset);
  }

  private setupClasses() {
    // stronger motion: 4rem offset + longer duration
    const base = ['opacity-0', 'transition', 'duration-1000', 'ease-in-out', 'transform-gpu', 'will-change-transform'];
    base.forEach(c => this.r.addClass(this.el.nativeElement, c));

    switch (this.revealDirection) {
      case 'left': this.initTranslate = '-translate-x-16'; this.translateZero = 'translate-x-0'; break;
      case 'right': this.initTranslate = 'translate-x-16'; this.translateZero = 'translate-x-0'; break;
      case 'down': this.initTranslate = '-translate-y-12'; this.translateZero = 'translate-y-0'; break;
      default: this.initTranslate = 'translate-y-12'; this.translateZero = 'translate-y-0';
    }
    this.r.addClass(this.el.nativeElement, this.initTranslate);
  }

  private reveal() {
    this.visible = true;
    this.r.removeClass(this.el.nativeElement, 'opacity-0');
    this.r.removeClass(this.el.nativeElement, this.initTranslate);
    this.r.addClass(this.el.nativeElement, 'opacity-100');
    this.r.addClass(this.el.nativeElement, this.translateZero);
  }

  private reset() {
    if (!this.visible) return;
    this.visible = false;
    this.r.removeClass(this.el.nativeElement, 'opacity-100');
    this.r.removeClass(this.el.nativeElement, this.translateZero);
    this.r.addClass(this.el.nativeElement, 'opacity-0');
    this.r.addClass(this.el.nativeElement, this.initTranslate);
  }

  private handleScrollTopReset() {
    if (window.scrollY <= 8) this.reset();   // when user returns to top, arm it again
  }
}
