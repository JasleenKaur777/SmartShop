import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm!: FormGroup;

  constructor(private readonly fb: FormBuilder, private service:UserService,private route:Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

 onRegister(): void {
  if (this.registerForm.valid) {
    console.log('Register Data:', this.registerForm.value);
    this.service.userRegister(this.registerForm.value).subscribe({
      next: (res) => {
        alert('Registered Successfully!');
        this.route.navigate(["/login"]);

      },
      error: (err) => {
        alert('Something went wrong during registration.');
      }
    });
  } else {
    this.registerForm.markAllAsTouched();
  }
}


  // Easy access to form controls in template
  get f() {
    return this.registerForm.controls;
  }
}
