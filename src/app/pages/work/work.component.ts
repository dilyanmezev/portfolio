import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';            
import { RevealDirective } from '../../directives/reveal.directive';
import { DepthRevealDirective } from '../../directives/depth-reveal.directive';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-work',
  standalone: true,
  imports: [CommonModule, RouterModule, RevealDirective, DepthRevealDirective, FooterComponent], 
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css'],
})
export class WorkComponent {}
