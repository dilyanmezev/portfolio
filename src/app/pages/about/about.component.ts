import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepthRevealDirective } from '../../directives/depth-reveal.directive';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, DepthRevealDirective,FooterComponent],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  badges = ['Product Design', 'Front-end', 'UX Research', 'Prototyping', 'Usability'];
  stats = [
    { label: 'Years designing', value: '3+' },
    { label: 'Projects shipped', value: '10+' },
    { label: 'Countries studied', value: '3' },
    { label: 'Lines of TS', value: 'a lot' },
  ];

  tools = ['Angular', 'React (next to explore)', 'SwiftUI', 'TypeScript', 'Figma', 'VScode', 'Xcode'];

  timeline = [
    { year: '2022 - ongoing', title: 'Fontys ICT (NL)', desc: 'Product design + front-end track.' },
    { year: '2024', title: 'Lirex ST — Intern (BG)', desc: 'Front-end & UI/UX for enterprise admin tools.' },
    { year: '2025', title: 'Chung-Ang University (KR)', desc: 'Minor abroad. Focus on basic "C" language and data analysis.' },
  ];

  offDuty = [
    { src: 'assets/About/travel.jpeg', caption: 'Travelling' },
    { src: 'assets/About/football.jpeg', caption: 'Watching football' },
    { src: 'assets/About/bjj.jpeg', caption: 'On the mat (BJJ)' },
    { src: 'assets/About/animals.jpeg', caption: 'Around animals' },
    { src: 'assets/About/hiking.jpeg', caption: 'In the mountains' },
  ];

  scrollTo(id: string, e?: Event) {
    e?.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

}
