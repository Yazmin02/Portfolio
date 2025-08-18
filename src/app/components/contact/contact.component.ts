import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  email = 'yazmingonzalezmeneses@outlook.com';
  phone = '5565439086';
  github = 'https://github.com/Yazmin02';
}
