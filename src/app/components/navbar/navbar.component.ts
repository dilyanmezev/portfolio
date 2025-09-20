import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  links = [
    { label: 'Work',   href: '/',        router: true },
    { label: 'About',  href: '/about',   router: true },
    { label: 'Resume', href: '/resume.pdf', router: false }
  ];

  activeIndex = 0;
  hoveredIndex: number | null = null;

  mobileOpen = false;
  loaded = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const setFromUrl = (url: string) => { this.activeIndex = url.startsWith('/about') ? 1 : 0; };
    setFromUrl(this.router.url);
    this.router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe((e: any) => { setFromUrl(e.urlAfterRedirects); this.closeMobile(); });
  }

  ngAfterViewInit() { requestAnimationFrame(() => this.loaded = true); }

  ngOnDestroy() { this.setScrollLock(false); }

  onEnter(i: number) { this.hoveredIndex = i; }
  onLeave()          { this.hoveredIndex = null; }
  isMarked(i: number) {
    return this.hoveredIndex !== null ? this.hoveredIndex === i : this.activeIndex === i;
  }

  toggleMobile() { this.mobileOpen = !this.mobileOpen; this.setScrollLock(this.mobileOpen); }
  closeMobile()  { this.mobileOpen = false; this.setScrollLock(false); }

  private setScrollLock(lock: boolean) {
    document.documentElement.style.overflow = lock ? 'hidden' : '';
    document.body.style.overflow = lock ? 'hidden' : '';
  }
}
