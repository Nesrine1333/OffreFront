import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';
import { User } from 'src/app/models/user';
import { CookieService } from 'ngx-cookie-service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  submitted = false;
  error: boolean=false;
  formUser!: FormGroup
  formReg!: FormGroup;
  user!: User;
  affichageErreu: boolean = false;
  affichageErreu1: boolean = false;
  returnUrl!: string;

  successMessage: string = ''
  errorMessage: string = ''

  cdr: any;

  constructor(private authService: AuthService,private cookieService: CookieService, private formBuilder: FormBuilder,private fb:FormBuilder, private activatedRoute: ActivatedRoute, private router: Router) {
  
    if (this.authService.currentUserValue ) {
      this.router.navigate(['/Accueil']);
    }


  }

  ngOnInit(): void {

    this.formUser = this.formBuilder.group({

      email:'',

      password: '',
    });

    this.formReg = this.fb.group({
      matriculeFiscale: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required],
    });
  }
  userauth() {
    this.loading = true;
    this.authService.login(this.formUser.value.email, this.formUser.value.password)
      .pipe(first())
      .subscribe(
        data => {
          if (data != null ){
            this.user = data;
            console.log("data", data);

            this.cookieService.set('jwt', data.token as string);
            
            this.router.navigate(['/Accueil']);
          }
          if (data != null && data.role=="Admin"){
            this.user = data;
            console.log("data", data);

            this.cookieService.set('jwt', data.token as string);
            
            this.router.navigate(['/Admin']);
          }
          else {
            this.errorMessage =  'Email or password incorrect';
          }
        },
        error => {
          console.log('Error:', error);
          this.affichageErreu = true;
          this.errorMessage = error.message || 'An error occurred during login.';
          this.error = error;
          this.loading = false;
        }        
      );
  }
  
  registerUser() {
    this.authService.registerUser(this.formReg.value).subscribe(
      (response) => {
        this.successMessage = 'User registered successfully!';
        console.log('User registered successfully:', response);
        this.formReg.reset({})

      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
