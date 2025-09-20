import { Component, ElementRef, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';             
import { DepthRevealDirective } from '../../directives/depth-reveal.directive';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-case-playdora',
  standalone: true,
  imports: [CommonModule, RouterLink, DepthRevealDirective, FooterComponent],  
  templateUrl: './case-playdora.component.html',
  styleUrls: ['./case-playdora.component.css']
})

export class PlaydoraComponent implements AfterViewInit {
  @ViewChild('heroRef', { static: true }) heroRef!: ElementRef<HTMLElement>;

  imgParallax = 0;
  showBackToTop = false;
  private rafId = 0;

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

  scrollTo(id: string, ev?: Event) {
    ev?.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  backToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private updateBackToTop() {
    this.showBackToTop = (window.scrollY || window.pageYOffset) > 120;
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
    this.imgParallax = (progress - 0.5) * 30;
  }
}
