import { Component } from '@angular/core';
import { adminOffre } from '../Services/admin.service';
import { CreateBlDto } from '../models/CreateBlDto';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/user';

@Component({
  selector: 'app-admin-list-user',
  templateUrl: './admin-list-user.component.html',
  styleUrls: ['./admin-list-user.component.css']
})
export class AdminListUserComponent {

  page = 1;
  limit = 10;
  totalItems = 0;
  users: any;
  blList: User[] = [];
  filterForm!: FormGroup;
  filteredUserList: any[] = [];
  pagedUserList: User[] | null = [];
  totalPages = 0;

constructor(private service:  adminOffre ,  private formBuilder: FormBuilder ){
  this.filterForm=this.formBuilder.group({
    matriculeFiscale:[''],
    email:[''],
    name:['']
  })

}

ngOnInit(): void {
  this.users = JSON.parse(localStorage.getItem('currentUser') as string);
  this.GetAll();
}

GetAll(): void {
  this.service.getUserAndFiltrage<User>(1,
      this.totalItems,this.filterForm.value.name,this.filterForm.value.matriculeFiscale,
      this.filterForm.value.email
    )
    .subscribe((paginatedResponse) => {
      this.blList = paginatedResponse.items;
      this.applyFilter();
    });
}

applyFilter(): void {  
  const nameFilter = this.filterForm.value.name.toLowerCase();
  const matriculeFiscaleFilter = this.filterForm.value.matriculeFiscale.toLowerCase();
  const emailFilter = this.filterForm.value.email.toLowerCase();

  this.filteredUserList = this.blList.filter((user) => {
    const emailMatches = !emailFilter || user.email.toLowerCase() === new Date(nameFilter).toDateString();
    const matriculeFiscaleMatches = !matriculeFiscaleFilter || user.matriculeFiscale.toLowerCase().includes(matriculeFiscaleFilter);
    return emailMatches && matriculeFiscaleMatches ;
  });

  this.totalItems = this.filteredUserList.length;
  this.totalPages = Math.ceil(this.totalItems / this.limit);

  if (this.page > this.totalPages) {
    this.changePage(this.totalPages);
  } else {
    this.changePage(1);
  }

  if (this.totalItems === 0) {
    this.pagedUserList = null;
  }
}

changePage(newPage: number): void {
  if (newPage >= 1 && newPage <= this.totalPages) {
    this.page = newPage;
    this.pagedUserList = this.filteredUserList.slice(
      (this.page - 1) * this.limit,
      this.page * this.limit
    );
  }
}

getPagesArray(): number[] {
  return new Array(this.totalPages).fill(0).map((_, index) => index + 1);
}

}
