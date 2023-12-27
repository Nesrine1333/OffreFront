import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { Constant } from '../navbar/constant';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {


  menus:any=[]=Constant.menus;
  filteredMenus:any[]=[];
  roles: string='';
  
 
 

  constructor(private authService: AuthService, private router: Router) {

    const userData= localStorage.getItem('currentUser');
    console.log(userData)
    if(userData!=null){
      const parseObj= JSON.parse(userData);
      this.roles = parseObj.user.role;
       
    }
    this.menus.forEach((element: any) => {
      const isrole = element.roles.find((roles:any)=> roles==this.roles);
      if(isrole != undefined){
        this.filteredMenus.push(element);
      }
      console.log(this.filteredMenus)
      
    });


  }

  navigateTo(path: string) {
    this.router.navigate([path]);}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
