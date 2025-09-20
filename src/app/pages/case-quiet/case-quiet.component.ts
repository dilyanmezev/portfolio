import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DepthRevealDirective } from '../../directives/depth-reveal.directive';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-case-quiet',
  standalone: true,
  imports: [CommonModule, RouterLink, DepthRevealDirective, FooterComponent],
  templateUrl: './case-quiet.component.html',
  styleUrls: ['./case-quiet.component.css']
})
export class CaseQuietComponent implements AfterViewInit {
  @ViewChild('heroRef', { static: true }) heroRef!: ElementRef<HTMLElement>;

  // ---- Parallax (hero image)
  imgParallax = 0;
  private rafId = 0;

  // ---- Back-to-top
  showBackToTop = false;

  ngAfterViewInit() {
    this.updateParallax();
    this.updateBackToTop();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.queueParallax();
    this.updateBackToTop();
  }

  @HostListener('window:resize')
  onResize() {
    this.queueParallax();
  }

  private queueParallax() {
    cancelAnimationFrame(this.rafId);
    this.rafId = requestAnimationFrame(() => this.updateParallax());
  }

  private updateParallax() {
    const el = this.heroRef?.nativeElement;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    const progress = 1 - Math.min(Math.max(rect.top / vh, 0), 1);
    this.imgParallax = (progress - 0.5) * 30; // -15..+15px
  }

  private updateBackToTop() {
    this.showBackToTop = (window.scrollY || window.pageYOffset) > 120;
  }

  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---- Smooth scroll
  scrollTo(id: string, e?: Event) {
    e?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ---- Carousel (wide PNGs)
  carouselImages: string[] = [
    './/src/assets/Quiet/Project2Img.png',
    './/src/assets/Quiet/Onboarding.png',
    './/src/assets/Quiet/AI.png',
    './/src/assets/Quiet/Donate.png',
    './/src/assets/Quiet/Map.png',
  ];
  currentSlide = 0;

  // Keyboard navigation
  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') this.prevSlide();
    if (e.key === 'ArrowRight') this.nextSlide();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.carouselImages.length;
  }

  goToSlide(i: number) {
    this.currentSlide = i;
  }

  // Basic swipe support
  private swipeStartX = 0;

  onSwipeStart(ev: PointerEvent) {
    this.swipeStartX = ev.clientX;
  }

  onSwipeEnd(ev: PointerEvent) {
    const dx = ev.clientX - this.swipeStartX;
    const threshold = 40; // px
    if (dx > threshold) this.prevSlide();
    if (dx < -threshold) this.nextSlide();
  }
}
