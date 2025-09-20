import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html'
})
export class FooterComponent {
  @Input() email = 'dilyanmezev@gmail.com';
  @Input() linkedIn = 'https://www.linkedin.com/in/dilyan-mezev-730536300/';
  @Input() instagram = 'https://www.instagram.com/dilyanmezev?igsh=MWtvbTF3dnZ5bDFuZg%3D%3D&utm_source=qr';
}
