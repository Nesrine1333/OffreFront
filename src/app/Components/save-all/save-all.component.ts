import { Component } from '@angular/core';
import { SaveAllService } from 'src/app/Services/save-all.service';

@Component({
  selector: 'app-save-all',
  templateUrl: './save-all.component.html',
  styleUrls: ['./save-all.component.css']
})
export class SaveAllComponent {
  selectedFile: File | null = null;  
  users: any;
  successMessage: string = '';

  constructor(private uploadService: SaveAllService) {}

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('currentUser') as string);
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  importExcel(): void {
    if (!this.selectedFile) {
      alert('Please select a file.');
      return;
    }

    const userId = this.users.user.id;
    this.uploadService.uploadExcelFile(userId, this.selectedFile).subscribe(
      response => {
        console.log(response);
        this.successMessage = 'File uploaded successfully.';
        this.clearFileInput();
        this.selectedFile = null; // Set selectedFile to null after success
      },
      error => {
        console.error(error);
        alert('Error uploading file.');
      }
    );
  }

  clearFileInput(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
}
