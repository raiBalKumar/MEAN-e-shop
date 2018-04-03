import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {

  searchTerm = '';
  isCollapsed = true;

  constructor(private router: Router,
              private data: DataService){
                this.data.getProfile();
              }

  get token(){
    return localStorage.getItem('token');
  }

  collapse(){
    this.isCollapsed = true;
  }

  closeDropdown(dropdown){
    dropdown.close();
  }

  logout(){
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(['']);
  }

  search(){}
}