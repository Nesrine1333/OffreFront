import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SaveAllService } from 'src/app/Services/save-all.service';
import { CreateBlDto } from 'src/app/models/CreateBlDto';
import {  PaginationControlsDirective } from 'ngx-pagination';
import 'ngx-pagination';
@Component({
  selector: 'app-const-offre',
  templateUrl: './const-offre.component.html',
  styleUrls: ['./const-offre.component.css']
})
export class ConstOffreComponent implements OnInit {
  @ViewChild(PaginationControlsDirective) paginationControls!: PaginationControlsDirective;

  page = 1;
  limit = 10;
  totalItems = 0;
  users: any;
  blList: CreateBlDto[] = [];
  filterForm!: FormGroup;
  filteredBlList: any[] = [];
  pagedBlList: CreateBlDto[] | null = [];
  totalPages = 0;
  constructor(private service: SaveAllService, private formBuilder: FormBuilder) {
    this.filterForm = this.formBuilder.group({
      dateBl: [''],
      matriculeFiscale: [''],
      reference: [''],
    });
  }

  ngOnInit(): void {
    this.users = JSON.parse(localStorage.getItem('currentUser') as string);
    this.GetAll();
  }

  GetAll(): void {
    this.service.getBlByUserIdAndFiltrage<CreateBlDto>(this.users.user.id,1,
        this.totalItems,this.filterForm.value.dateBl,this.filterForm.value.matriculeFiscale,
        this.filterForm.value.reference
      )
      .subscribe((paginatedResponse) => {
        this.blList = paginatedResponse.items;
        this.applyFilter();
      });
  }

  applyFilter(): void {  
    const dateBlFilter = this.filterForm.value.dateBl;
    const matriculeFiscaleFilter = this.filterForm.value.matriculeFiscale.toLowerCase();
    const referenceFilter = this.filterForm.value.reference.toLowerCase();
  
    this.filteredBlList = this.blList.filter((bl) => {
      const dateBlMatches = !dateBlFilter || new Date(bl.dateBl).toDateString() === new Date(dateBlFilter).toDateString();
      const matriculeFiscaleMatches = !matriculeFiscaleFilter || bl.matriculeFiscale?.toLowerCase().includes(matriculeFiscaleFilter);
      const referenceMatches = !referenceFilter || bl.reference.toLowerCase().includes(referenceFilter);
  
      return dateBlMatches && matriculeFiscaleMatches && referenceMatches;
    });
  
    this.totalItems = this.filteredBlList.length;
    this.totalPages = Math.ceil(this.totalItems / this.limit);
  
    if (this.page > this.totalPages) {
      this.changePage(this.totalPages);
    } else {
      this.changePage(1);
    }
  
    if (this.totalItems === 0) {
      this.pagedBlList = null;
    }
  }
  
  

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
      this.pagedBlList = this.filteredBlList.slice(
        (this.page - 1) * this.limit,
        this.page * this.limit
      );
    }
  }

  getPagesArray(): number[] {
    return new Array(this.totalPages).fill(0).map((_, index) => index + 1);
  }
  generatePdf(idBl: number) {
    this.service.downloadPdf(idBl).subscribe(
      (data) => {
        this.downloadPdf(data);
      },
      (error) => {
        console.error('Error generating PDF:', error);
      }
    );
  }

  private downloadPdf(data: any) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated-pdf.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  

}