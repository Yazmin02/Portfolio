import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  contactForm: FormGroup;

  email = 'yazmingonzalezmeneses@outlook.com';
  phone = '5565439086';
  github = 'https://github.com/Yazmin02';
  linkedin = 'https://www.linkedin.com/in/yazmin-gm';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  sendEmail() {
    if (this.contactForm.invalid) return;
    console.log(this.contactForm.value);
    alert('Formulario listo para enviar (backend pendiente)');
  }
}
