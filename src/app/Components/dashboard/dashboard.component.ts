import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { FormService } from 'src/app/Services/form.service';
import { CreateBlDto } from 'src/app/models/CreateBlDto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  users: any;
  createBlDto: CreateBlDto = new CreateBlDto();
  successMessage: string = ''

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  constructor(private authService: AuthService, private router: Router, private formService: FormService) {}

  createBl() {
    this.formService.createBl(this.users.user.id, this.createBlDto).subscribe(
      (response) => {
        this.successMessage = 'bL created successfully!';
        console.log('BL created successfully', response);
        this.createBlDto = new CreateBlDto();
        if (response && response.blId) {
          this.downloadPdf(response.blId);
        } else {
          console.error('Error: BL ID not provided in the response.');
        }
      },
      (error) => {
        console.error('Error creating BL', error);
      }
    );
  }

  downloadPdf(blId: number) {
    this.formService.downloadPdf(blId).subscribe(
      (pdfBlob: Blob) => {
        const blobUrl = URL.createObjectURL(pdfBlob);
        window.open(blobUrl, '_blank');
      },
      (pdfError) => {
        console.error('Error downloading PDF', pdfError);
      }
    );
  }
 
}
